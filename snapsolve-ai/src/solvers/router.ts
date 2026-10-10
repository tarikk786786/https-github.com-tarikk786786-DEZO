import type {
  ProviderId,
  QuestionType,
  Settings,
  SolveRequest,
  SolveResponse,
  TaskCategory,
  VerificationResult,
} from "@/shared/types";
import { solveWithDemo } from "./adapters/demo";
import { solveWithOpenAICompatible } from "./adapters/openai-compatible";
import { solveWithGemini } from "./adapters/gemini";
import { solveWithAnthropic } from "./adapters/anthropic";
import { getCatalogCache } from "@/storage/settings";
import { bumpRequestCount } from "@/storage/settings";

const OPENAI_COMPATIBLE: ProviderId[] = [
  "openai",
  "openrouter",
  "groq",
  "mistral",
  "deepseek",
  "together",
  "fireworks",
  "cerebras",
  "huggingface",
  "ollama",
  "lmstudio",
  "custom",
];

export function questionToTask(type: QuestionType, hasImage: boolean): TaskCategory {
  if (hasImage || type === "diagram") return "vision";
  switch (type) {
    case "mcq-single":
    case "mcq-multi":
    case "true-false":
    case "fill-blank":
      return "mcq";
    case "math":
      return "math";
    case "science":
      return "science";
    case "code":
      return "coding";
    case "reasoning":
      return "reasoning";
    case "language":
      return "translation";
    case "long-answer":
      return "document";
    default:
      return "general";
  }
}

export function selectProvider(settings: Settings, request: SolveRequest): ProviderId {
  if (request.forceProvider) return request.forceProvider;

  const enabled = settings.providers.filter((p) => p.enabled);
  const task = questionToTask(request.question.type, Boolean(request.imageDataUrl));
  const taskOverride = settings.taskModels[task];
  if (taskOverride && enabled.some((p) => p.id === taskOverride.provider)) {
    return taskOverride.provider;
  }

  if (settings.demoMode) {
    if (enabled.some((p) => p.id === "demo")) return "demo";
  }

  if (settings.freeOnlyMode || settings.routingMode === "free-only" || !settings.allowPaidModels) {
    const local = enabled.find((p) => ["ollama", "lmstudio", "custom"].includes(p.id));
    if (local) return local.id;
    const openrouter = enabled.find((p) => p.id === "openrouter" && p.apiKey);
    if (openrouter) return "openrouter";
    if (enabled.some((p) => p.id === "demo")) return "demo";
  }

  if (settings.routingMode === "manual" || settings.routingMode === "quality") {
    const preferred = enabled.find((p) => p.id === settings.defaultProvider);
    if (preferred) return preferred.id;
  }

  if (settings.routingMode === "cheapest") {
    const cheap = enabled.find((p) =>
      ["ollama", "lmstudio", "openrouter", "groq", "gemini", "demo"].includes(p.id)
    );
    if (cheap) return cheap.id;
  }

  if (settings.routingMode === "fastest") {
    const ranked = [...enabled]
      .filter((p) => p.id !== "demo")
      .sort((a, b) => (a.lastLatencyMs ?? 99999) - (b.lastLatencyMs ?? 99999));
    if (ranked[0]) return ranked[0].id;
  }

  const needsVision = Boolean(request.imageDataUrl) || request.question.type === "diagram";
  if (needsVision) {
    const vision = enabled.find((p) =>
      ["openai", "gemini", "anthropic", "openrouter"].includes(p.id)
    );
    if (vision) return vision.id;
  }

  const preferred = enabled.find((p) => p.id === settings.defaultProvider);
  if (preferred && preferred.id !== "demo") return preferred.id;

  const nonDemo = enabled.find(
    (p) => p.id !== "demo" && (p.apiKey || ["ollama", "lmstudio", "custom"].includes(p.id))
  );
  if (nonDemo) return nonDemo.id;
  return "demo";
}

async function pickModel(
  settings: Settings,
  providerId: ProviderId,
  request: SolveRequest
): Promise<string> {
  if (request.forceModel) return request.forceModel;
  const provider = settings.providers.find((p) => p.id === providerId);
  const task = questionToTask(request.question.type, Boolean(request.imageDataUrl));
  const taskOverride = settings.taskModels[task];
  if (taskOverride?.provider === providerId && taskOverride.model) return taskOverride.model;

  if (
    (settings.freeOnlyMode || settings.routingMode === "free-only") &&
    providerId === "openrouter"
  ) {
    const cache = await getCatalogCache();
    const free = cache?.models.find(
      (m) =>
        m.provider === "openrouter" &&
        m.pricing?.isFree &&
        (!request.imageDataUrl || m.capabilities.vision)
    );
    if (free) return free.id;
  }

  return provider?.model ?? "demo-solver";
}

async function dispatch(
  settings: Settings,
  providerId: ProviderId,
  request: SolveRequest
): Promise<SolveResponse> {
  const provider = settings.providers.find((p) => p.id === providerId);
  if (!provider || providerId === "demo") return solveWithDemo(settings, request);

  const model = await pickModel(settings, providerId, request);
  const cfg = { ...provider, model };

  if (providerId === "gemini") return solveWithGemini(settings, cfg, request);
  if (providerId === "anthropic") return solveWithAnthropic(settings, cfg, request);
  if (providerId === "cohere") {
    // Cohere chat via OpenAI-compatible path is not universal; use custom message adapter fallback.
    return solveWithOpenAICompatible(
      settings,
      { ...cfg, baseUrl: cfg.baseUrl || "https://api.cohere.com/compatibility/v1" },
      request
    );
  }
  if (OPENAI_COMPATIBLE.includes(providerId)) {
    return solveWithOpenAICompatible(settings, cfg, request);
  }
  return solveWithDemo(settings, request);
}

export async function solveQuestion(
  settings: Settings,
  request: SolveRequest
): Promise<SolveResponse> {
  if (
    settings.dailyRequestBudget != null &&
    settings.requestsDayKey === new Date().toISOString().slice(0, 10) &&
    settings.requestsToday >= settings.dailyRequestBudget
  ) {
    throw new Error("Daily request budget reached. Adjust the limit in Settings.");
  }

  const providerId = selectProvider(settings, request);
  const isExternal = !["demo", "ollama", "lmstudio"].includes(providerId);
  if (
    isExternal &&
    settings.requireConsentBeforeExternal &&
    !settings.consentedExternalTransfer
  ) {
    throw new Error(
      "External AI transfer is blocked until you consent in Settings → Privacy."
    );
  }

  let lastError: unknown;
  const attempts = Math.max(1, settings.retryCount + 1);
  for (let i = 0; i < attempts; i += 1) {
    try {
      const result = await dispatch(settings, providerId, request);
      await bumpRequestCount();
      return result;
    } catch (error) {
      lastError = error;
    }
  }

  if (settings.fallbackProvider && settings.fallbackProvider !== providerId) {
    try {
      const result = await dispatch(settings, settings.fallbackProvider, request);
      result.warnings = [
        ...result.warnings,
        `Primary provider failed; used fallback ${settings.fallbackProvider}.`,
      ];
      await bumpRequestCount();
      return result;
    } catch {
      /* fall through */
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

export async function verifyAnswer(
  settings: Settings,
  request: SolveRequest,
  primary: SolveResponse
): Promise<VerificationResult> {
  const secondaryProvider =
    settings.verifyProvider ||
    settings.providers.find(
      (p) => p.enabled && p.id !== primary.provider && p.id !== "demo" && (p.apiKey || p.id === "ollama")
    )?.id ||
    "demo";

  const secondary = await dispatch(settings, secondaryProvider, {
    ...request,
    forceProvider: secondaryProvider,
    followUp: `Independently solve and verify. Primary answer was: ${primary.answer}`,
  });

  const a = primary.answer.trim().toLowerCase();
  const b = secondary.answer.trim().toLowerCase();
  const optsA = (primary.selectedOptions ?? []).join(",").toLowerCase();
  const optsB = (secondary.selectedOptions ?? []).join(",").toLowerCase();

  let agreement: VerificationResult["agreement"] = "unknown";
  if (a === b || (optsA && optsA === optsB)) agreement = "agree";
  else if (a.includes(b) || b.includes(a) || (optsA && optsB && optsA.split(",").some((x) => optsB.includes(x)))) {
    agreement = "partial";
  } else {
    agreement = "disagree";
  }

  const differences: string[] = [];
  if (agreement !== "agree") {
    differences.push(`Primary: ${primary.answer}`);
    differences.push(`Secondary (${secondary.provider}/${secondary.model}): ${secondary.answer}`);
  }

  return {
    primary,
    secondary,
    agreement,
    assessment:
      agreement === "agree"
        ? "Both models produced a matching answer. Agreement is not a guarantee of correctness."
        : agreement === "partial"
          ? "Models partially agree. Review both explanations before relying on the result."
          : "Models disagree. Treat the answer as uncertain and check the reasoning carefully.",
    differences,
  };
}

import type { CatalogModel, ProviderConfig, ProviderId, Settings } from "@/shared/types";
import { getCatalogCache, setCatalogCache } from "@/storage/settings";
import { assertSafeProviderUrl } from "@/security/endpoints";
import { assertCatalogRateLimit } from "@/security/rate-limit";

function baseCapabilities(partial?: Partial<CatalogModel["capabilities"]>): CatalogModel["capabilities"] {
  return {
    text: true,
    vision: false,
    tools: false,
    structured: false,
    coding: false,
    reasoning: false,
    math: false,
    longContext: false,
    ...partial,
  };
}

function inferCapabilities(id: string, name: string, context?: number): CatalogModel["capabilities"] {
  const hay = `${id} ${name}`.toLowerCase();
  const vision = /vision|gpt-4o|gemini|claude-3|llava|qwen2-vl|pixtral/.test(hay);
  const coding = /code|codex|coder|deepseek-coder|starcoder|devstral/.test(hay);
  const reasoning = /o1|o3|reason|r1|thinking|opus/.test(hay);
  const math = reasoning || /math|qwen.*math|deepseek-r1/.test(hay);
  const longContext = (context ?? 0) >= 100000 || /long|128k|200k|1m/.test(hay);
  return baseCapabilities({
    vision,
    coding,
    reasoning,
    math,
    longContext,
    tools: /tool|function|gpt-4|claude|gemini|command/.test(hay),
    structured: /gpt-4|claude|gemini|json/.test(hay),
    contextLength: context,
  });
}

function isZeroPrice(prompt?: number | null, completion?: number | null): boolean {
  return (prompt == null || prompt === 0) && (completion == null || completion === 0);
}

async function fetchOpenRouterModels(provider: ProviderConfig): Promise<CatalogModel[]> {
  const base = (provider.baseUrl || "https://openrouter.ai/api/v1").replace(/\/$/, "");
  const modelsUrl = assertSafeProviderUrl("openrouter", `${base}/models`);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (provider.apiKey) headers.Authorization = `Bearer ${provider.apiKey}`;
  const res = await fetch(modelsUrl.toString(), { headers });
  if (!res.ok) throw new Error(`OpenRouter catalog failed (${res.status})`);
  const data = (await res.json()) as {
    data?: Array<{
      id: string;
      name?: string;
      description?: string;
      context_length?: number;
      architecture?: { modality?: string; input_modalities?: string[] };
      pricing?: { prompt?: string; completion?: string };
    }>;
  };

  return (data.data ?? []).map((m) => {
    const prompt = m.pricing?.prompt != null ? Number(m.pricing.prompt) : null;
    const completion = m.pricing?.completion != null ? Number(m.pricing.completion) : null;
    const free = isZeroPrice(prompt, completion) || /:free$/i.test(m.id);
    const modalities = m.architecture?.input_modalities ?? [];
    const caps = inferCapabilities(m.id, m.name || m.id, m.context_length);
    if (modalities.includes("image") || m.architecture?.modality?.includes("image")) {
      caps.vision = true;
    }
    return {
      id: m.id,
      name: m.name || m.id,
      provider: "openrouter" as ProviderId,
      description: m.description,
      pricing: {
        prompt,
        completion,
        currency: "USD",
        isFree: free,
        pricingNote: free
          ? "Listed as $0 on OpenRouter at catalog fetch time — not a permanent free guarantee."
          : "Per-token pricing from OpenRouter catalog; subject to change.",
      },
      capabilities: caps,
      modality: modalities.length ? modalities : ["text"],
      updatedAt: Date.now(),
    };
  });
}

async function fetchOpenAICompatibleModels(
  provider: ProviderConfig
): Promise<CatalogModel[]> {
  if (!provider.baseUrl) return [];
  const base = provider.baseUrl.replace(/\/$/, "");
  const raw = provider.id === "ollama" ? `${base}/api/tags` : `${base}/models`;
  const url = assertSafeProviderUrl(provider.id, raw).toString();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (provider.apiKey) headers.Authorization = `Bearer ${provider.apiKey}`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${provider.id} catalog failed (${res.status})`);
  const data = await res.json();

  if (provider.id === "ollama") {
    const models = (data as { models?: Array<{ name: string }> }).models ?? [];
    return models.map((m) => ({
      id: m.name,
      name: m.name,
      provider: provider.id,
      pricing: {
        isFree: true,
        pricingNote: "Local Ollama inference — no hosted API fee from this catalog.",
      },
      capabilities: inferCapabilities(m.name, m.name),
      modality: ["text"],
      updatedAt: Date.now(),
    }));
  }

  const list = (data as { data?: Array<{ id: string }> }).data ?? [];
  return list.map((m) => ({
    id: m.id,
    name: m.id,
    provider: provider.id,
    pricing: {
      isFree: ["ollama", "lmstudio", "custom"].includes(provider.id),
      pricingNote: ["ollama", "lmstudio", "custom"].includes(provider.id)
        ? "Local/custom endpoint — host cost depends on your setup."
        : "Pricing not included in this catalog response.",
    },
    capabilities: inferCapabilities(m.id, m.id),
    modality: ["text"],
    updatedAt: Date.now(),
  }));
}

async function fetchGeminiModels(provider: ProviderConfig): Promise<CatalogModel[]> {
  if (!provider.apiKey) return [];
  const base = (provider.baseUrl || "https://generativelanguage.googleapis.com/v1beta").replace(
    /\/$/,
    ""
  );
  const modelsUrl = assertSafeProviderUrl("gemini", `${base}/models`);
  const res = await fetch(
    `${modelsUrl.toString()}?key=${encodeURIComponent(provider.apiKey)}`
  );
  if (!res.ok) throw new Error(`Gemini catalog failed (${res.status})`);
  const data = (await res.json()) as {
    models?: Array<{ name: string; displayName?: string; inputTokenLimit?: number; supportedGenerationMethods?: string[] }>;
  };
  return (data.models ?? [])
    .filter((m) => (m.supportedGenerationMethods ?? []).includes("generateContent"))
    .map((m) => {
      const id = m.name.replace(/^models\//, "");
      return {
        id,
        name: m.displayName || id,
        provider: "gemini" as ProviderId,
        pricing: {
          pricingNote: "Gemini API pricing depends on Google AI Studio / Cloud plan — check current docs.",
        },
        capabilities: inferCapabilities(id, m.displayName || id, m.inputTokenLimit),
        modality: /vision|image|flash|pro/i.test(id) ? ["text", "image"] : ["text"],
        updatedAt: Date.now(),
      };
    });
}

export async function refreshModelCatalog(
  settings: Settings,
  opts?: { force?: boolean }
): Promise<{ models: CatalogModel[]; errors: string[] }> {
  const cache = await getCatalogCache();
  const maxAge = settings.catalogCacheMinutes * 60 * 1000;
  if (!opts?.force && cache && Date.now() - cache.updatedAt < maxAge) {
    return { models: cache.models, errors: [] };
  }
  if (opts?.force) assertCatalogRateLimit();

  const errors: string[] = [];
  const models: CatalogModel[] = [
    {
      id: "demo-solver",
      name: "Demo Solver",
      provider: "demo",
      description: "Built-in simulated responses for onboarding. Not a live model.",
      pricing: { isFree: true, pricingNote: "Local demo — no network." },
      capabilities: baseCapabilities({ structured: true }),
      modality: ["text"],
      updatedAt: Date.now(),
    },
  ];

  for (const provider of settings.providers.filter((p) => p.enabled && p.id !== "demo")) {
    try {
      if (provider.id === "openrouter") {
        models.push(...(await fetchOpenRouterModels(provider)));
      } else if (provider.id === "gemini") {
        models.push(...(await fetchGeminiModels(provider)));
      } else if (provider.supportsCatalog) {
        models.push(...(await fetchOpenAICompatibleModels(provider)));
      }
    } catch (error) {
      errors.push(
        `${provider.id}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  await setCatalogCache(models);
  return { models, errors };
}

export type FreeModelFilter =
  | "free"
  | "text"
  | "vision"
  | "coding"
  | "reasoning"
  | "math"
  | "long-context"
  | "structured"
  | "tools"
  | "local";

export function filterCatalogModels(
  models: CatalogModel[],
  opts: { query?: string; filters?: FreeModelFilter[] }
): CatalogModel[] {
  const q = (opts.query ?? "").trim().toLowerCase();
  const filters = opts.filters ?? [];
  return models.filter((m) => {
    if (q && !`${m.id} ${m.name} ${m.provider}`.toLowerCase().includes(q)) return false;
    for (const f of filters) {
      if (f === "free" && !m.pricing?.isFree) return false;
      if (f === "text" && !m.capabilities.text) return false;
      if (f === "vision" && !m.capabilities.vision) return false;
      if (f === "coding" && !m.capabilities.coding) return false;
      if (f === "reasoning" && !m.capabilities.reasoning) return false;
      if (f === "math" && !m.capabilities.math) return false;
      if (f === "long-context" && !m.capabilities.longContext) return false;
      if (f === "structured" && !m.capabilities.structured) return false;
      if (f === "tools" && !m.capabilities.tools) return false;
      if (f === "local" && !["ollama", "lmstudio", "custom", "demo"].includes(m.provider)) {
        return false;
      }
    }
    return true;
  });
}

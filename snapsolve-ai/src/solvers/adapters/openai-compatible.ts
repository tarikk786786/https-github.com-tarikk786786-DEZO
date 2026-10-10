import type { ProviderConfig, Settings, SolveRequest, SolveResponse } from "@/shared/types";
import { SolveResponseSchema } from "@/shared/types";
import { buildSystemPrompt, buildUserPrompt } from "../prompt";

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(candidate.slice(start, end + 1));
    }
    throw new Error("Model response was not valid JSON.");
  }
}

export async function solveWithOpenAICompatible(
  settings: Settings,
  provider: ProviderConfig,
  request: SolveRequest
): Promise<SolveResponse> {
  const started = performance.now();
  if (!provider.apiKey && provider.id !== "ollama") {
    throw new Error(`Add an API key for ${provider.id} in Settings.`);
  }

  const baseUrl = (provider.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
  const url = `${baseUrl}/chat/completions`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), settings.requestTimeoutMs);

  const userContent: Array<Record<string, unknown>> = [
    { type: "text", text: buildUserPrompt(request) },
  ];
  if (request.imageDataUrl) {
    userContent.push({
      type: "image_url",
      image_url: { url: request.imageDataUrl },
    });
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (provider.apiKey) headers.Authorization = `Bearer ${provider.apiKey}`;
    if (provider.id === "openrouter") {
      headers["HTTP-Referer"] = "https://snapsolve.local";
      headers["X-Title"] = "SnapSolve AI";
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: provider.model,
        temperature: provider.temperature ?? 0.2,
        max_tokens: provider.maxTokens ?? 2048,
        messages: [
          { role: "system", content: buildSystemPrompt(settings) },
          { role: "user", content: userContent },
        ],
        response_format: provider.id === "ollama" ? undefined : { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`${provider.id} error (${response.status}): ${errText.slice(0, 300)}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from provider.");

    const parsed = SolveResponseSchema.parse(extractJson(content));
    return {
      answer: parsed.answer,
      selectedOptions: parsed.selectedOptions,
      explanation: parsed.explanation,
      steps: parsed.steps,
      alternatives: parsed.alternatives,
      incorrectOptions: parsed.incorrectOptions,
      confidence: parsed.confidence,
      sources: parsed.sources,
      provider: provider.id,
      model: provider.model,
      isDemo: false,
      warnings: parsed.warnings ?? [],
      latencyMs: Math.round(performance.now() - started),
    };
  } finally {
    clearTimeout(timeout);
  }
}

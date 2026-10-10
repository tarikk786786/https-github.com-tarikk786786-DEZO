import type { ProviderConfig, Settings, SolveRequest, SolveResponse } from "@/shared/types";
import { SolveResponseSchema } from "@/shared/types";
import { buildSystemPrompt, buildUserPrompt } from "../prompt";

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  return JSON.parse(candidate.slice(start, end + 1));
}

export async function solveWithAnthropic(
  settings: Settings,
  provider: ProviderConfig,
  request: SolveRequest
): Promise<SolveResponse> {
  const started = performance.now();
  if (!provider.apiKey) throw new Error("Add an Anthropic API key in Settings.");

  const base = (provider.baseUrl || "https://api.anthropic.com").replace(/\/$/, "");
  const content: Array<Record<string, unknown>> = [
    { type: "text", text: buildUserPrompt(request) },
  ];

  if (request.imageDataUrl?.startsWith("data:")) {
    const match = request.imageDataUrl.match(/^data:(.+);base64,(.+)$/);
    if (match) {
      content.unshift({
        type: "image",
        source: {
          type: "base64",
          media_type: match[1],
          data: match[2],
        },
      });
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), settings.requestTimeoutMs);

  try {
    const response = await fetch(`${base}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": provider.apiKey,
        "anthropic-version": "2023-06-01",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: provider.model,
        max_tokens: provider.maxTokens ?? 2048,
        temperature: provider.temperature ?? 0.2,
        system: buildSystemPrompt(settings),
        messages: [{ role: "user", content }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Anthropic error (${response.status}): ${errText.slice(0, 300)}`);
    }

    const data = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.filter((c) => c.type === "text").map((c) => c.text || "").join("\n");
    if (!text) throw new Error("Empty response from Anthropic.");

    const parsed = SolveResponseSchema.parse(extractJson(text));
    return {
      answer: parsed.answer,
      selectedOptions: parsed.selectedOptions,
      explanation: parsed.explanation,
      steps: parsed.steps,
      alternatives: parsed.alternatives,
      incorrectOptions: parsed.incorrectOptions,
      confidence: parsed.confidence,
      sources: parsed.sources,
      provider: "anthropic",
      model: provider.model,
      isDemo: false,
      warnings: parsed.warnings ?? [],
      latencyMs: Math.round(performance.now() - started),
    };
  } finally {
    clearTimeout(timeout);
  }
}

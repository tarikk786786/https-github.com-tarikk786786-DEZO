import type { ProviderConfig, Settings, SolveRequest, SolveResponse } from "@/shared/types";
import { SolveResponseSchema } from "@/shared/types";
import { buildSystemPrompt, buildUserPrompt } from "../prompt";

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(candidate.includes("{") ? candidate.slice(candidate.indexOf("{"), candidate.lastIndexOf("}") + 1) : candidate);
}

export async function solveWithGemini(
  settings: Settings,
  provider: ProviderConfig,
  request: SolveRequest
): Promise<SolveResponse> {
  const started = performance.now();
  if (!provider.apiKey) throw new Error("Add a Gemini API key in Settings.");

  const base = (provider.baseUrl || "https://generativelanguage.googleapis.com/v1beta").replace(/\/$/, "");
  const url = `${base}/models/${provider.model}:generateContent?key=${encodeURIComponent(provider.apiKey)}`;
  const parts: Array<Record<string, unknown>> = [
    { text: `${buildSystemPrompt(settings)}\n\n${buildUserPrompt(request)}` },
  ];

  if (request.imageDataUrl?.startsWith("data:")) {
    const match = request.imageDataUrl.match(/^data:(.+);base64,(.+)$/);
    if (match) {
      parts.push({
        inline_data: { mime_type: match[1], data: match[2] },
      });
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), settings.requestTimeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: provider.temperature ?? 0.2,
          maxOutputTokens: provider.maxTokens ?? 2048,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini error (${response.status}): ${errText.slice(0, 300)}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("\n");
    if (!text) throw new Error("Empty response from Gemini.");

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
      provider: "gemini",
      model: provider.model,
      isDemo: false,
      warnings: parsed.warnings ?? [],
      latencyMs: Math.round(performance.now() - started),
    };
  } finally {
    clearTimeout(timeout);
  }
}

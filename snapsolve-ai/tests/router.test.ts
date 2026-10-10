import { describe, expect, it } from "vitest";
import { questionToTask, selectProvider } from "../src/solvers/router";
import { DEFAULT_SETTINGS } from "../src/storage/defaults";
import type { SolveRequest } from "../src/shared/types";
import { parseQuestion } from "../src/capture/question-parser";

function req(text: string, image?: string): SolveRequest {
  return {
    question: parseQuestion(text),
    mode: "learn",
    imageDataUrl: image,
  };
}

describe("selectProvider", () => {
  it("falls back to demo on free-only when no free LLM key is set", () => {
    const id = selectProvider(DEFAULT_SETTINGS, req("What is 2+2?"));
    expect(id).toBe("demo");
  });

  it("uses openrouter free LLM when a key is present", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      providers: DEFAULT_SETTINGS.providers.map((p) =>
        p.id === "openrouter" ? { ...p, enabled: true, apiKey: "or-test" } : p
      ),
    };
    expect(selectProvider(settings, req("What is 2+2?"))).toBe("openrouter");
  });

  it("uses demo when demoMode is on", () => {
    const id = selectProvider(
      { ...DEFAULT_SETTINGS, demoMode: true, defaultProvider: "demo" },
      req("What is 2+2?")
    );
    expect(id).toBe("demo");
  });

  it("prefers vision-capable hosted provider when image present", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      demoMode: false,
      freeOnlyMode: false,
      allowPaidModels: true,
      routingMode: "automatic" as const,
      defaultProvider: "groq" as const,
      consentedExternalTransfer: true,
      providers: DEFAULT_SETTINGS.providers.map((p) =>
        p.id === "openai" || p.id === "groq"
          ? { ...p, enabled: true, apiKey: "sk-test" }
          : p
      ),
    };
    const id = selectProvider(settings, req("Read the diagram", "data:image/png;base64,xx"));
    expect(["openai", "gemini", "anthropic", "openrouter"]).toContain(id);
  });

  it("free-only prefers local endpoints", () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      demoMode: false,
      freeOnlyMode: true,
      routingMode: "free-only" as const,
      providers: DEFAULT_SETTINGS.providers.map((p) =>
        p.id === "ollama" || p.id === "openai"
          ? { ...p, enabled: true, apiKey: p.id === "openai" ? "sk-x" : undefined }
          : { ...p, enabled: p.id === "demo" }
      ),
    };
    expect(selectProvider(settings, req("Explain gravity"))).toBe("ollama");
  });
});

describe("questionToTask", () => {
  it("maps code and vision tasks", () => {
    expect(questionToTask("code", false)).toBe("coding");
    expect(questionToTask("short-answer", true)).toBe("vision");
  });
});

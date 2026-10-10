import { describe, expect, it } from "vitest";
import { filterCatalogModels } from "../src/solvers/catalog";
import type { CatalogModel } from "../src/shared/types";

const models: CatalogModel[] = [
  {
    id: "meta/llama-free",
    name: "Llama Free",
    provider: "openrouter",
    pricing: { isFree: true, pricingNote: "listed free" },
    capabilities: {
      text: true,
      vision: false,
      tools: false,
      structured: true,
      coding: true,
      reasoning: false,
      math: false,
      longContext: false,
    },
    updatedAt: Date.now(),
  },
  {
    id: "openai/gpt-paid",
    name: "GPT Paid",
    provider: "openrouter",
    pricing: { isFree: false, prompt: 0.01, completion: 0.02 },
    capabilities: {
      text: true,
      vision: true,
      tools: true,
      structured: true,
      coding: true,
      reasoning: true,
      math: true,
      longContext: true,
      contextLength: 128000,
    },
    updatedAt: Date.now(),
  },
  {
    id: "llama3.2",
    name: "llama3.2",
    provider: "ollama",
    pricing: { isFree: true },
    capabilities: {
      text: true,
      vision: false,
      tools: false,
      structured: false,
      coding: false,
      reasoning: false,
      math: false,
      longContext: false,
    },
    updatedAt: Date.now(),
  },
];

describe("filterCatalogModels", () => {
  it("filters free models", () => {
    expect(filterCatalogModels(models, { filters: ["free"] })).toHaveLength(2);
  });

  it("filters local models", () => {
    expect(filterCatalogModels(models, { filters: ["local"] }).map((m) => m.id)).toEqual([
      "llama3.2",
    ]);
  });

  it("searches by query", () => {
    expect(filterCatalogModels(models, { query: "gpt" })).toHaveLength(1);
  });
});

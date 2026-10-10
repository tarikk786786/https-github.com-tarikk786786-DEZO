import { describe, expect, it } from "vitest";
import { solveWithDemo } from "../src/solvers/adapters/demo";
import { DEFAULT_SETTINGS } from "../src/storage/defaults";
import { parseQuestion } from "../src/capture/question-parser";

describe("demo solver", () => {
  it("answers the evaporation sample without pretending to be a live model", async () => {
    const response = await solveWithDemo(DEFAULT_SETTINGS, {
      question: parseQuestion("Which process converts a liquid into a gas?"),
      mode: "learn",
    });
    expect(response.isDemo).toBe(true);
    expect(response.answer.toLowerCase()).toContain("evaporation");
    expect(response.warnings.some((w) => /sample|provider/i.test(w))).toBe(true);
  });
});

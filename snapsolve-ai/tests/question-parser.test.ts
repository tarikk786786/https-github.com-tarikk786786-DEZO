import { describe, expect, it } from "vitest";
import { normalizeOcrText, parseQuestion, parseQuestions } from "../src/capture/question-parser";

describe("parseQuestion", () => {
  it("parses single-select MCQ options", () => {
    const q = parseQuestion(`Which process converts a liquid into a gas?
A) Melting
B) Evaporation
C) Freezing
D) Condensation`);
    expect(q.type).toBe("mcq-single");
    expect(q.options).toHaveLength(4);
    expect(q.options[1]).toEqual({ label: "B", text: "Evaporation" });
    expect(q.confidence).toBeGreaterThan(0.5);
  });

  it("detects multi-select questions", () => {
    const q = parseQuestion(`Select all that apply.
A) One
B) Two`);
    expect(q.type).toBe("mcq-multi");
  });

  it("detects true/false", () => {
    const q = parseQuestion(`True or False: Water boils at 100C at sea level.
A) True
B) False`);
    expect(q.type).toBe("true-false");
  });

  it("warns on incomplete captures", () => {
    const q = parseQuestion("Hi?");
    expect(q.warnings.length).toBeGreaterThan(0);
  });

  it("splits multiple numbered questions", () => {
    const many = parseQuestions(`1) First question?
A) a
B) b

2) Second question?
A) x
B) y`);
    expect(many.length).toBe(2);
  });
});

describe("normalizeOcrText", () => {
  it("normalizes quotes and whitespace", () => {
    expect(normalizeOcrText("  “hello” \n\n\n world  ")).toBe('"hello"\n\nworld');
  });
});

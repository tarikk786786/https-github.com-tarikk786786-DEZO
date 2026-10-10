import type { McqOption, ParsedQuestion, QuestionType } from "@/shared/types";
import { createId } from "@/utils/id";

const OPTION_LINE =
  /^(?:(?:\(|\[)?([A-Da-d]|[1-4]|[iI]{1,3}|IV|iv)(?:\)|\]|\.)\s+|(?:Option\s+)?([A-Da-d])[:.)]\s+)(.+)$/;

const TRUE_FALSE = /\b(true\s*\/\s*false|true or false|t\/f)\b/i;
const FILL_BLANK = /(\b_{3,}\b|\(\s*\)|\[\s*\]|fill[- ]in[- ]the[- ]blank)/i;
const CODE_HINT = /\b(function|class|def |public |console\.|import |#include|SELECT |WHERE )\b/;
const MATH_HINT = /[=∫∑√π∞]|\\frac|\bsolve\b|\bequation\b|\bderivative\b|\bintegral\b/i;
const MULTI_HINT = /\b(select all|choose all|more than one|multiple answers)\b/i;

function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function detectType(text: string, options: McqOption[]): QuestionType {
  if (TRUE_FALSE.test(text) || optionsMatchTrueFalse(options)) return "true-false";
  if (options.length >= 2) {
    return MULTI_HINT.test(text) ? "mcq-multi" : "mcq-single";
  }
  if (FILL_BLANK.test(text)) return "fill-blank";
  if (CODE_HINT.test(text)) return "code";
  if (MATH_HINT.test(text)) return "math";
  if (text.length > 280) return "long-answer";
  if (text.includes("?")) return "short-answer";
  return "unknown";
}

function optionsMatchTrueFalse(options: McqOption[]): boolean {
  if (options.length !== 2) return false;
  const joined = options.map((o) => o.text.toLowerCase()).sort().join("|");
  return joined === "false|true";
}

function extractOptions(lines: string[]): { options: McqOption[]; questionLines: string[] } {
  const options: McqOption[] = [];
  const questionLines: string[] = [];
  let inOptions = false;

  for (const line of lines) {
    const match = line.match(OPTION_LINE);
    if (match) {
      inOptions = true;
      const label = (match[1] || match[2] || "").toUpperCase();
      const text = (match[3] || "").trim();
      if (label && text) options.push({ label, text });
      continue;
    }
    if (!inOptions) questionLines.push(line);
  }

  return { options, questionLines };
}

function splitMultipleQuestions(text: string): string[] {
  const normalized = normalizeWhitespace(text);
  const blocks = normalized.split(/\n(?=(?:\d{1,3}[\).]\s+|[Qq](?:uestion)?\s*\d+\s*[:.)]))/);
  if (blocks.length > 1) return blocks.map((b) => b.trim()).filter(Boolean);
  return [normalized];
}

export function parseQuestion(rawText: string): ParsedQuestion {
  const cleaned = normalizeWhitespace(rawText);
  const warnings: string[] = [];
  if (!cleaned) {
    return {
      id: createId("q"),
      rawText: "",
      questionText: "",
      options: [],
      type: "unknown",
      confidence: 0,
      warnings: ["No question text provided."],
    };
  }

  const lines = cleaned.split("\n").map((l) => l.trim()).filter(Boolean);
  const numberingMatch = lines[0]?.match(/^((?:\d{1,3}[\).]|[Qq]\s*\d+[:.)]?))\s*(.*)$/);
  let numbering: string | undefined;
  let workingLines = lines;
  if (numberingMatch) {
    numbering = numberingMatch[1];
    workingLines = [numberingMatch[2], ...lines.slice(1)].filter(Boolean);
  }

  const { options, questionLines } = extractOptions(workingLines);
  const questionText = questionLines.join(" ").trim() || cleaned;
  const type = detectType(cleaned, options);

  let confidence = 0.55;
  if (options.length >= 2) confidence += 0.25;
  if (questionText.includes("?")) confidence += 0.1;
  if (cleaned.length < 12) {
    confidence = Math.min(confidence, 0.35);
    warnings.push("Capture looks incomplete. Consider recapturing a clearer region.");
  }
  if (options.length === 1) {
    warnings.push("Only one option was detected. Verify the capture includes all choices.");
    confidence -= 0.1;
  }

  return {
    id: createId("q"),
    rawText: cleaned,
    questionText,
    options,
    type,
    numbering,
    confidence: Math.max(0, Math.min(1, confidence)),
    warnings,
  };
}

export function parseQuestions(rawText: string): ParsedQuestion[] {
  return splitMultipleQuestions(rawText).map(parseQuestion);
}

export function normalizeOcrText(text: string): string {
  return normalizeWhitespace(
    text
      .replace(/[|]/g, "I")
      .replace(/\bO\b(?=\s*[).])/g, "0")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
  );
}

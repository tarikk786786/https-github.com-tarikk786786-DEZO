import type { Settings, SolveRequest } from "@/shared/types";
import { wrapUntrustedForModel } from "@/security/prompt-guard";
import { LIMITS, truncate } from "@/security/limits";

export function buildSystemPrompt(settings: Settings): string {
  const modeHints: Record<string, string> = {
    quick: "Give a concise direct answer with a short explanation.",
    learn: "Provide a clear answer plus a step-by-step explanation suitable for studying.",
    practice: "First encourage the learner, then reveal the solution with reasoning.",
    tutor: "Teach the underlying concept, offer a hint-style path, then the solution.",
    revision: "Produce revision-ready notes and a flashcard-style Q/A pair.",
    research: "Answer carefully and only include sources if genuinely known; never invent citations.",
    coding: "Explain code behavior, diagnose likely bugs, and provide testable examples.",
    "assessment-review":
      "Help the user review and learn. Prefer conceptual guidance. Do not automate exam submission.",
  };

  return [
    truncate(settings.systemInstructions, LIMITS.maxSystemInstructionsChars),
    modeHints[settings.answerMode] ?? modeHints.learn,
    `Explanation depth: ${settings.explanationDepth}.`,
    `Expertise level: ${settings.expertiseLevel}.`,
    `Preferred response language: ${settings.preferredLanguage}.`,
    settings.answerFirst ? "Lead with the answer, then explain." : "Explain first, then state the answer.",
    settings.showFormulas ? "Include formulas and working when relevant." : "Keep formulas minimal.",
    settings.showAlternatives ? "Mention alternative methods when useful." : "",
    settings.explainIncorrectOptions
      ? "For MCQs, briefly explain why non-selected options are incorrect when options are present."
      : "",
    "Return JSON only with keys: answer, selectedOptions (array of option labels when MCQ), explanation, steps (array), alternatives (array), incorrectOptions (object), confidence (0-1), sources (array), warnings (array).",
    "Never fabricate citations or claim verification that did not occur.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildUserPrompt(request: SolveRequest): string {
  const q = request.question;
  const optionBlock =
    q.options.length > 0
      ? q.options.map((o) => `${o.label}. ${o.text}`).join("\n")
      : "(no options detected)";

  const body = [
    `Detected type: ${q.type}`,
    `Parsing confidence (not answer confidence): ${q.confidence.toFixed(2)}`,
    `Question text:\n${q.questionText}`,
    `Options:\n${optionBlock}`,
    `Raw capture:\n${q.rawText}`,
    request.followUp ? `Follow-up from user:\n${request.followUp}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return wrapUntrustedForModel(body);
}

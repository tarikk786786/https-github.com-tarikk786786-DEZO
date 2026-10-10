import type { Settings, SolveRequest, SolveResponse } from "@/shared/types";
import { parseQuestion } from "@/capture/question-parser";

function pickDemoAnswer(request: SolveRequest): SolveResponse {
  const q = request.question;
  const lower = `${q.questionText}\n${q.rawText}`.toLowerCase();

  if (q.type === "mcq-single" || q.type === "mcq-multi" || q.options.length >= 2) {
    const evaporation = q.options.find((o) => /evaporat/i.test(o.text));
    const picked = evaporation ?? q.options[0];
    const selected = q.type === "mcq-multi" && q.options.length > 1
      ? q.options.slice(0, 2).map((o) => o.label)
      : picked
        ? [picked.label]
        : [];

    return {
      answer: picked
        ? `Option ${picked.label} — ${picked.text}`
        : "Unable to determine a clear option from the capture.",
      selectedOptions: selected,
      explanation:
        picked && /evaporat/i.test(picked.text)
          ? "Evaporation is the process in which molecules at the surface of a liquid gain enough energy to enter the gaseous state."
          : `Based on the captured options, ${picked?.label ?? "the first option"} is the best match for a demo response. Configure a real AI provider for production answers.`,
      steps: [
        "Identify the question stem and listed options.",
        "Match key terms in the stem to option wording.",
        "Select the option that best fits the concept being tested.",
      ],
      incorrectOptions:
        q.options.length > 1
          ? Object.fromEntries(
              q.options
                .filter((o) => !selected.includes(o.label))
                .slice(0, 3)
                .map((o) => [o.label, `${o.text} does not best match the question stem in this demo.`])
            )
          : undefined,
      confidence: 0.42,
      provider: "demo",
      model: "demo-solver",
      isDemo: true,
      warnings: [
        "Demo mode is active. This is a simulated study-aid response, not a live model answer.",
      ],
      latencyMs: 0,
    };
  }

  if (/evaporat|liquid into a gas|liquid to gas/.test(lower)) {
    return {
      answer: "Evaporation",
      explanation:
        "The liquid's molecules gain sufficient energy to escape from its surface into the gaseous state.",
      steps: [
        "Recognize the phase-change vocabulary (liquid → gas).",
        "Recall that evaporation occurs at the surface when molecules escape.",
        "State the answer and a concise physical explanation.",
      ],
      confidence: 0.5,
      provider: "demo",
      model: "demo-solver",
      isDemo: true,
      warnings: [
        "Demo mode is active. This is a simulated study-aid response, not a live model answer.",
      ],
      latencyMs: 0,
    };
  }

  if (q.type === "code" || /bug|error|debug|function/.test(lower)) {
    return {
      answer: "Review the failing path, isolate the incorrect assumption, then add a focused test.",
      explanation:
        "In demo coding mode, SnapSolve outlines a debugging workflow instead of inventing project-specific fixes.",
      steps: [
        "Reproduce the issue with the smallest input.",
        "Read the error message and stack carefully.",
        "Check types, bounds, and side effects near the failure.",
        "Write a regression test before applying the fix.",
      ],
      provider: "demo",
      model: "demo-solver",
      isDemo: true,
      warnings: ["Demo mode is active."],
      latencyMs: 0,
    };
  }

  return {
    answer: "Configure an AI provider in Settings for live answers, or refine the question text.",
    explanation:
      "Demo mode can parse your capture and illustrate the answer layout. It only ships a few canned examples so simulated answers are never mistaken for real model output.",
    steps: [
      "Edit the recognized question if needed.",
      "Open Settings and add an API key for OpenAI, Gemini, Anthropic, OpenRouter, or Ollama.",
      "Disable Demo Mode, then solve again.",
    ],
    provider: "demo",
    model: "demo-solver",
    isDemo: true,
    warnings: [
      "Demo mode is active. This is a simulated study-aid response, not a live model answer.",
    ],
    latencyMs: 0,
  };
}

export async function solveWithDemo(
  settings: Settings,
  request: SolveRequest
): Promise<SolveResponse> {
  const started = performance.now();
  // Tiny delay so loading UI is visible during demos.
  await new Promise((r) => setTimeout(r, 350));
  const parsed =
    request.question.questionText || request.question.options.length
      ? request.question
      : parseQuestion(request.question.rawText);
  const response = pickDemoAnswer({ ...request, question: parsed });
  response.latencyMs = Math.round(performance.now() - started);

  if (settings.answerMode === "practice") {
    response.warnings = [
      ...response.warnings,
      "Practice Mode: try answering yourself before reading the explanation.",
    ];
  }
  if (settings.answerMode === "assessment-review") {
    response.warnings = [
      ...response.warnings,
      "Assessment Review Mode prioritizes conceptual guidance for learning — not automated submission.",
    ];
  }
  return response;
}

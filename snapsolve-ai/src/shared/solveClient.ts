import { parseQuestion } from "@/capture/question-parser";
import { recognizeImage } from "@/ocr/ocr";
import { createId } from "@/utils/id";
import {
  clearPendingQuestion,
  getPendingQuestion,
  getSettings,
  saveHistoryItem,
} from "@/storage/settings";
import type {
  AnswerMode,
  CaptureMethod,
  HistoryItem,
  ParsedQuestion,
  SolveResponse,
  VerificationResult,
} from "@/shared/types";

export async function loadPendingIntoEditor(): Promise<{
  text: string;
  imageDataUrl?: string;
  source: CaptureMethod;
}> {
  const pending = await getPendingQuestion();
  if (!pending) return { text: "", source: "manual" };
  await clearPendingQuestion();

  if (pending.imageDataUrl && !pending.text) {
    const settings = await getSettings();
    const ocr = await recognizeImage(pending.imageDataUrl, settings.ocrLanguage);
    return {
      text: ocr.text,
      imageDataUrl: pending.imageDataUrl,
      source: (pending.source as CaptureMethod) || "region",
    };
  }

  return {
    text: pending.text || "",
    imageDataUrl: pending.imageDataUrl,
    source: (pending.source as CaptureMethod) || "manual",
  };
}

export async function runSolve(opts: {
  text: string;
  mode: AnswerMode;
  imageDataUrl?: string;
  source?: CaptureMethod;
  followUp?: string;
  save?: boolean;
}): Promise<{
  question: ParsedQuestion;
  response: SolveResponse;
  verification?: VerificationResult;
}> {
  const question = parseQuestion(opts.text);
  const result = await chrome.runtime.sendMessage({
    type: "SOLVE_QUESTION",
    payload: {
      question,
      mode: opts.mode,
      imageDataUrl: opts.imageDataUrl,
      followUp: opts.followUp,
    },
  });

  if (result?.type === "SOLVE_ERROR") {
    throw new Error(result.error || "Solve failed");
  }
  if (result?.type !== "SOLVE_RESULT" || !result.payload) {
    throw new Error("Unexpected response from background worker.");
  }

  const response = result.payload as SolveResponse;
  const verification = result.verification as VerificationResult | undefined;

  if (opts.save !== false) {
    const item: HistoryItem = {
      id: createId("h"),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      source: opts.source ?? "manual",
      question,
      response,
      verification,
      tags: [question.type],
      favorite: false,
    };
    await saveHistoryItem(item);
  }

  return { question, response, verification };
}

export async function requestRegionCapture(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error("No active tab.");
  await chrome.runtime.sendMessage({ type: "START_REGION_CAPTURE", tabId: tab.id });
}

export async function analyzeVisiblePage(): Promise<{
  text: string;
  limited?: boolean;
  reason?: string;
}> {
  const result = await chrome.runtime.sendMessage({ type: "ANALYZE_VISIBLE_PAGE" });
  return {
    text: result?.text ?? "",
    limited: result?.limited,
    reason: result?.reason,
  };
}

export async function getSelectedTextFromPage(): Promise<string> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return "";
  try {
    const result = await chrome.tabs.sendMessage(tab.id, { type: "GET_SELECTED_TEXT" });
    return result?.text ?? "";
  } catch {
    return "";
  }
}

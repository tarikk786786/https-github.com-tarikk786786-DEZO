import type { CaptureMethod, ExtensionMessage } from "@/shared/types";
import { LIMITS, truncate } from "./limits";
import { isAllowedDataImageUrl } from "./endpoints";

const ALLOWED_TYPES = new Set<ExtensionMessage["type"]>([
  "OPEN_SIDE_PANEL",
  "START_REGION_CAPTURE",
  "REGION_CAPTURED",
  "CAPTURE_CANCELLED",
  "GET_SELECTED_TEXT",
  "SELECTED_TEXT",
  "ANALYZE_VISIBLE_PAGE",
  "VISIBLE_PAGE_TEXT",
  "SOLVE_QUESTION",
  "SOLVE_RESULT",
  "SOLVE_ERROR",
  "SET_PENDING_QUESTION",
  "GET_PENDING_QUESTION",
  "PENDING_QUESTION",
  "PING",
  "PONG",
  "CAPTURE_TAB_SCREENSHOT",
]);

/** Message types a content script is allowed to send. */
const CONTENT_SCRIPT_TYPES = new Set<ExtensionMessage["type"]>([
  "PING",
  "PONG",
  "OPEN_SIDE_PANEL",
  "REGION_CAPTURED",
  "CAPTURE_CANCELLED",
  "SELECTED_TEXT",
  "VISIBLE_PAGE_TEXT",
  "SET_PENDING_QUESTION",
  "GET_SELECTED_TEXT",
  "ANALYZE_VISIBLE_PAGE",
  "START_REGION_CAPTURE",
  // Needed for user-started region capture; page JS cannot forge content-script messages.
  "CAPTURE_TAB_SCREENSHOT",
]);

/** Sensitive ops must originate from extension pages / SW, not web pages. */
const EXTENSION_ONLY_TYPES = new Set<ExtensionMessage["type"]>([
  "SOLVE_QUESTION",
  "GET_PENDING_QUESTION",
]);

export type SenderKind = "extension" | "content" | "unknown";

export function classifySender(sender: chrome.runtime.MessageSender): SenderKind {
  if (sender.id && sender.id === chrome.runtime.id) {
    // Content scripts also have sender.id === runtime.id but include tab/frame.
    if (sender.tab?.id != null && sender.url && !sender.url.startsWith(`chrome-extension://${chrome.runtime.id}`)) {
      return "content";
    }
    if (sender.url?.startsWith(`chrome-extension://${chrome.runtime.id}`)) {
      return "extension";
    }
    // Service worker / extension page without tab
    if (sender.tab == null) return "extension";
    return "content";
  }
  return "unknown";
}

export function assertTrustedSender(
  sender: chrome.runtime.MessageSender,
  type: ExtensionMessage["type"]
): void {
  const kind = classifySender(sender);
  if (kind === "unknown") {
    throw new Error("Rejected message from untrusted sender.");
  }
  if (EXTENSION_ONLY_TYPES.has(type) && kind !== "extension") {
    throw new Error("This action is restricted to SnapSolve extension pages.");
  }
  if (kind === "content" && !CONTENT_SCRIPT_TYPES.has(type)) {
    throw new Error("Content script is not allowed to send this message type.");
  }
}

export function parseExtensionMessage(raw: unknown): ExtensionMessage {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid message.");
  }
  const msg = raw as { type?: unknown };
  if (typeof msg.type !== "string" || !ALLOWED_TYPES.has(msg.type as ExtensionMessage["type"])) {
    throw new Error("Unknown or disallowed message type.");
  }

  const serialized = JSON.stringify(raw);
  if (serialized.length > LIMITS.maxMessageJsonChars) {
    throw new Error("Message exceeds size limit.");
  }

  const type = msg.type as ExtensionMessage["type"];

  if (type === "REGION_CAPTURED" || type === "SET_PENDING_QUESTION") {
    const image = (raw as { imageDataUrl?: unknown; dataUrl?: unknown }).imageDataUrl
      ?? (raw as { dataUrl?: unknown }).dataUrl;
    if (typeof image === "string") {
      if (!isAllowedDataImageUrl(image)) {
        throw new Error("Unsupported or unsafe image payload.");
      }
      if (image.length > LIMITS.maxImageDataUrlChars) {
        throw new Error("Image capture exceeds size limit.");
      }
    }
  }

  if (type === "SET_PENDING_QUESTION") {
    const text = (raw as { text?: unknown }).text;
    if (typeof text !== "string") throw new Error("Pending question text required.");
    (raw as { text: string }).text = truncate(text, LIMITS.maxPendingTextChars);
    const source = (raw as { source?: unknown }).source;
    const allowedSources: CaptureMethod[] = [
      "manual",
      "selection",
      "region",
      "visible-page",
      "image",
      "pdf",
      "clipboard",
      "context-menu",
    ];
    if (typeof source !== "string" || !allowedSources.includes(source as CaptureMethod)) {
      throw new Error("Invalid capture source.");
    }
  }

  if (type === "SOLVE_QUESTION") {
    const payload = (raw as { payload?: unknown }).payload;
    if (!payload || typeof payload !== "object") throw new Error("Solve payload required.");
    const question = (payload as { question?: { rawText?: string; questionText?: string } }).question;
    const rawText = question?.rawText ?? question?.questionText ?? "";
    if (typeof rawText !== "string" || !rawText.trim()) {
      // allow image-only later; still require object
    }
    if (typeof rawText === "string" && rawText.length > LIMITS.maxQuestionChars) {
      throw new Error("Question exceeds size limit.");
    }
    const image = (payload as { imageDataUrl?: string }).imageDataUrl;
    if (image) {
      if (!isAllowedDataImageUrl(image)) throw new Error("Unsupported image in solve request.");
      if (image.length > LIMITS.maxImageDataUrlChars) {
        throw new Error("Solve image exceeds size limit.");
      }
    }
  }

  return raw as ExtensionMessage;
}

import {
  getPendingQuestion,
  getSettings,
  setPendingQuestion,
} from "@/storage/settings";
import { solveQuestion, verifyAnswer } from "@/solvers/router";
import { parseQuestion } from "@/capture/question-parser";
import { isRestrictedUrl } from "@/utils/messaging";
import {
  assertTrustedSender,
  parseExtensionMessage,
} from "@/security/messages";
import { assertSolveRateLimit } from "@/security/rate-limit";
import { hardenUntrustedText } from "@/security/prompt-guard";
import { LIMITS, truncate } from "@/security/limits";
import { redactSecrets } from "@/privacy/sanitize";
import type { SolveRequest } from "@/shared/types";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "snapsolve-selection",
      title: "Solve with SnapSolve",
      contexts: ["selection"],
    });
  });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => undefined);
});

async function ensureContentScript(tabId: number): Promise<void> {
  const tab = await chrome.tabs.get(tabId);
  if (isRestrictedUrl(tab.url)) {
    throw new Error("This page is restricted by the browser.");
  }
  try {
    await chrome.tabs.sendMessage(tabId, { type: "PING" });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
  }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "snapsolve-selection" || !info.selectionText) return;
  await setPendingQuestion({
    text: hardenUntrustedText(info.selectionText),
    source: "context-menu",
    updatedAt: Date.now(),
  });
  if (tab?.windowId != null) {
    await chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || tab.windowId == null) return;

  if (command === "open-side-panel") {
    await chrome.sidePanel.open({ windowId: tab.windowId });
    return;
  }

  if (command === "capture-question") {
    await chrome.sidePanel.open({ windowId: tab.windowId });
    if (isRestrictedUrl(tab.url)) return;
    try {
      await ensureContentScript(tab.id);
      await chrome.tabs.sendMessage(tab.id, { type: "START_REGION_CAPTURE" });
    } catch {
      /* side panel still opens for manual entry */
    }
  }
});

chrome.runtime.onMessage.addListener((raw, sender, sendResponse) => {
  (async () => {
    const message = parseExtensionMessage(raw);
    assertTrustedSender(sender, message.type);

    switch (message.type) {
      case "PING":
        sendResponse({ type: "PONG" });
        break;

      case "OPEN_SIDE_PANEL": {
        const windowId = sender.tab?.windowId ?? (await chrome.windows.getCurrent()).id;
        if (windowId != null) await chrome.sidePanel.open({ windowId });
        sendResponse({ ok: true });
        break;
      }

      case "START_REGION_CAPTURE": {
        const tabId = message.tabId ?? sender.tab?.id;
        if (tabId == null) throw new Error("No tab for region capture.");
        await ensureContentScript(tabId);
        await chrome.tabs.sendMessage(tabId, { type: "START_REGION_CAPTURE" });
        sendResponse({ ok: true });
        break;
      }

      case "REGION_CAPTURED": {
        await setPendingQuestion({
          text: "",
          source: "region",
          imageDataUrl: message.dataUrl,
          updatedAt: Date.now(),
        });
        sendResponse({ ok: true });
        break;
      }

      case "CAPTURE_CANCELLED":
        sendResponse({ ok: true });
        break;

      case "SET_PENDING_QUESTION": {
        await setPendingQuestion({
          text: hardenUntrustedText(message.text),
          source: message.source,
          imageDataUrl: message.imageDataUrl,
          updatedAt: Date.now(),
        });
        sendResponse({ ok: true });
        break;
      }

      case "GET_PENDING_QUESTION": {
        const pending = await getPendingQuestion();
        sendResponse({
          type: "PENDING_QUESTION",
          text: pending?.text,
          source: pending?.source,
          imageDataUrl: pending?.imageDataUrl,
        });
        break;
      }

      case "SOLVE_QUESTION": {
        assertSolveRateLimit();
        const settings = await getSettings();
        const payload = message.payload as SolveRequest;
        const rawText = hardenUntrustedText(
          truncate(payload.question.rawText || payload.question.questionText || "", LIMITS.maxQuestionChars)
        );
        const question = payload.question.questionText
          ? {
              ...payload.question,
              rawText,
              questionText: hardenUntrustedText(payload.question.questionText),
            }
          : parseQuestion(rawText);
        const result = await solveQuestion(settings, { ...payload, question });
        if (settings.verifyAnswers) {
          const verification = await verifyAnswer(
            settings,
            { ...payload, question },
            result
          );
          sendResponse({ type: "SOLVE_RESULT", payload: result, verification });
        } else {
          sendResponse({ type: "SOLVE_RESULT", payload: result });
        }
        break;
      }

      case "ANALYZE_VISIBLE_PAGE": {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id || isRestrictedUrl(tab.url)) {
          sendResponse({
            type: "VISIBLE_PAGE_TEXT",
            text: "",
            limited: true,
            reason:
              "This page is restricted by the browser and cannot be read.",
          });
          break;
        }
        try {
          await ensureContentScript(tab.id);
          const result = await chrome.tabs.sendMessage(tab.id, {
            type: "ANALYZE_VISIBLE_PAGE",
          });
          if (result?.text) {
            result.text = hardenUntrustedText(String(result.text));
          }
          sendResponse(result);
        } catch {
          sendResponse({
            type: "VISIBLE_PAGE_TEXT",
            text: "",
            limited: true,
            reason: "Could not access page content. Try Capture area instead.",
          });
        }
        break;
      }

      case "CAPTURE_TAB_SCREENSHOT": {
        // Only extension pages may request screenshots (enforced in assertTrustedSender).
        const dataUrl = await chrome.tabs.captureVisibleTab({ format: "png" });
        sendResponse({ dataUrl });
        break;
      }

      default:
        sendResponse({ ok: false, error: "unsupported" });
    }
  })().catch((error: unknown) => {
    const msg = redactSecrets(error instanceof Error ? error.message : String(error));
    sendResponse({
      type: "SOLVE_ERROR",
      error: truncate(msg, LIMITS.maxProviderErrorChars),
    });
  });

  return true;
});

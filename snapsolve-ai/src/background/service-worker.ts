import {
  getPendingQuestion,
  getSettings,
  setPendingQuestion,
} from "@/storage/settings";
import { solveQuestion, verifyAnswer } from "@/solvers/router";
import { parseQuestion } from "@/capture/question-parser";
import { isRestrictedUrl } from "@/utils/messaging";
import type { ExtensionMessage, SolveRequest } from "@/shared/types";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "snapsolve-selection",
      title: "Solve with SnapSolve AI",
      contexts: ["selection"],
    });
  });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => undefined);
});

async function ensureContentScript(tabId: number): Promise<void> {
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
    text: info.selectionText,
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
      /* restricted or unavailable — side panel still opens for manual entry */
    }
  }
});

chrome.runtime.onMessage.addListener((message: ExtensionMessage, sender, sendResponse) => {
  (async () => {
    if (!message || typeof message !== "object" || !("type" in message)) {
      sendResponse({ ok: false, error: "invalid_message" });
      return;
    }

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
        const tab = await chrome.tabs.get(tabId);
        if (isRestrictedUrl(tab.url)) {
          throw new Error(
            "This page is restricted by the browser. Use manual entry or image upload instead."
          );
        }
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
          text: message.text,
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
        const settings = await getSettings();
        const payload = message.payload as SolveRequest;
        const question = payload.question.questionText
          ? payload.question
          : parseQuestion(payload.question.rawText);
        const result = await solveQuestion(settings, { ...payload, question });
        if (settings.verifyAnswers) {
          const verification = await verifyAnswer(settings, { ...payload, question }, result);
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
              "This page is restricted by the browser. SnapSolve cannot analyze chrome://, Web Store, or other protected pages.",
          });
          break;
        }
        try {
          await ensureContentScript(tab.id);
          const result = await chrome.tabs.sendMessage(tab.id, { type: "ANALYZE_VISIBLE_PAGE" });
          sendResponse(result);
        } catch {
          sendResponse({
            type: "VISIBLE_PAGE_TEXT",
            text: "",
            limited: true,
            reason:
              "Could not access page content. Grant host access when prompted, or use region / image capture.",
          });
        }
        break;
      }

      case "CAPTURE_TAB_SCREENSHOT": {
        const dataUrl = await chrome.tabs.captureVisibleTab({ format: "png" });
        sendResponse({ dataUrl });
        break;
      }

      default:
        sendResponse({ ok: false });
    }
  })().catch((error: unknown) => {
    sendResponse({
      type: "SOLVE_ERROR",
      error: error instanceof Error ? error.message : String(error),
    });
  });

  return true;
});

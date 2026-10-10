import type { ExtensionMessage } from "@/shared/types";

export function sendMessage<T = unknown>(message: ExtensionMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve(response as T);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function sendToActiveTab<T = unknown>(
  message: ExtensionMessage
): Promise<T> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error("No active tab available.");
  if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("chrome-extension://") || tab.url.startsWith("https://chrome.google.com/webstore")) {
    throw new Error(
      "This page is restricted by the browser. SnapSolve cannot read chrome:// pages, the Web Store, or other protected surfaces."
    );
  }
  return chrome.tabs.sendMessage(tab.id, message) as Promise<T>;
}

export function isRestrictedUrl(url?: string | null): boolean {
  if (!url) return true;
  return (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:") ||
    url.startsWith("https://chrome.google.com/webstore") ||
    url.startsWith("https://chromewebstore.google.com")
  );
}

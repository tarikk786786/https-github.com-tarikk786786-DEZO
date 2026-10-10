/**
 * SnapSolve content script — host-page isolation rules:
 * - No global CSS / prototype overrides
 * - Injected UI uses closed Shadow DOM only when user enables floating toolbar
 * - Region overlay only on explicit user capture action
 * - Never alert() into the host page; report errors via extension messaging
 * - Failures are swallowed so the host site is never broken
 */

import type { ExtensionMessage } from "@/shared/types";

const HOST_ID = "snapsolve-ai-root";
const MSG_PREFIX = "SNAPSOLVE_AI";

type CaptureRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  devicePixelRatio: number;
};

function safeSend(message: ExtensionMessage): void {
  try {
    chrome.runtime.sendMessage(message).catch(() => undefined);
  } catch {
    /* extension context may be invalidated — never affect the page */
  }
}

function isSensitiveElement(el: Element | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  if (el instanceof HTMLInputElement) {
    const type = (el.type || "").toLowerCase();
    const autocomplete = (el.autocomplete || "").toLowerCase();
    if (type === "password" || type === "email" || type === "tel") return true;
    if (autocomplete.includes("cc-") || autocomplete.includes("password")) return true;
    if (el.name?.toLowerCase().includes("password")) return true;
  }
  return el.getAttribute("aria-sensitive") === "true";
}

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hostExcluded(excluded: string[]): boolean {
  const host = location.hostname;
  return excluded.some((entry) => host === entry || host.endsWith(`.${entry}`));
}

function getSelectedText(): string {
  try {
    if (isSensitiveElement(document.activeElement)) return "";
    return (window.getSelection()?.toString() ?? "").trim();
  } catch {
    return "";
  }
}

function extractVisibleText(): { text: string; limited?: boolean; reason?: string } {
  try {
    const clone = document.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("script, style, noscript, iframe").forEach((n) => n.remove());
    clone
      .querySelectorAll("input[type=password], [autocomplete*=password], [autocomplete*=cc-]")
      .forEach((n) => n.remove());
    const text = stripHtml(clone.innerText || clone.textContent || "").slice(0, 20000);
    if (!text) {
      return { text: "", limited: true, reason: "No accessible text found on this page." };
    }
    return { text };
  } catch {
    return {
      text: "",
      limited: true,
      reason: "Page content could not be read due to browser or site restrictions.",
    };
  }
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load captured screenshot."));
    img.src = dataUrl;
  });
}

async function cropDataUrl(dataUrl: string, rect: CaptureRect): Promise<string> {
  const image = await loadImage(dataUrl);
  const scale = rect.devicePixelRatio || window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(rect.width * scale));
  canvas.height = Math.max(1, Math.round(rect.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context for crop.");
  ctx.drawImage(
    image,
    Math.round(rect.x * scale),
    Math.round(rect.y * scale),
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  return canvas.toDataURL("image/png");
}

let closedShadow: ShadowRoot | null = null;

function getOrCreateHost(): { host: HTMLElement; shadow: ShadowRoot } | null {
  try {
    let host = document.getElementById(HOST_ID) as HTMLElement | null;
    if (!host) {
      host = document.createElement("div");
      host.id = HOST_ID;
      host.setAttribute("data-snapsolve", "1");
      // Do not inherit host page styles; keep out of layout flow.
      Object.assign(host.style, {
        all: "initial",
        position: "fixed",
        zIndex: "2147483646",
        inset: "0",
        width: "0",
        height: "0",
        overflow: "visible",
        pointerEvents: "none",
      } as CSSStyleDeclaration);
      (document.documentElement || document.body).appendChild(host);
      closedShadow = null;
    }
    if (!closedShadow) {
      try {
        closedShadow = host.attachShadow({ mode: "closed" });
      } catch {
        // Prior injection left a host node; recreate cleanly.
        host.remove();
        return getOrCreateHost();
      }
    }
    return { host, shadow: closedShadow };
  } catch {
    return null;
  }
}

function removeToolbar() {
  try {
    const pack = getOrCreateHost();
    pack?.shadow.getElementById("ss-toolbar")?.remove();
  } catch {
    /* ignore */
  }
}

function removeOverlay() {
  try {
    const pack = getOrCreateHost();
    pack?.shadow.getElementById("ss-overlay")?.remove();
    if (pack) {
      pack.host.style.width = "0";
      pack.host.style.height = "0";
      pack.host.style.pointerEvents = "none";
    }
  } catch {
    /* ignore */
  }
}

async function ensureToolbar() {
  try {
    const settings = await chrome.storage.local.get("snapsolve_settings");
    const cfg = settings.snapsolve_settings as
      | { floatingToolbar?: boolean; floatingToolbarExcludedHosts?: string[] }
      | undefined;
    // Opt-in only — default false so browsing is unaffected.
    if (!cfg?.floatingToolbar) {
      removeToolbar();
      return;
    }
    if (hostExcluded(cfg.floatingToolbarExcludedHosts ?? [])) {
      removeToolbar();
      return;
    }

    const pack = getOrCreateHost();
    if (!pack) return;
    if (pack.shadow.getElementById("ss-toolbar")) return;

    const style = document.createElement("style");
    style.textContent = `
      #ss-toolbar {
        position: fixed; right: 16px; bottom: 16px; display: flex; gap: 6px;
        padding: 8px; border-radius: 14px; pointer-events: auto;
        background: rgba(11, 18, 36, 0.94); border: 1px solid rgba(34, 211, 238, 0.35);
        box-shadow: 0 8px 28px rgba(7,11,22,0.35); font-family: system-ui, sans-serif;
        color: #e8eefc; z-index: 2147483646;
      }
      #ss-toolbar button {
        border: 0; border-radius: 10px; padding: 6px 10px; cursor: pointer;
        background: rgba(36, 49, 86, 0.95); color: #e8eefc; font-size: 12px; font-weight: 600;
      }
      #ss-toolbar button:focus-visible { outline: 2px solid #22d3ee; outline-offset: 2px; }
    `;
    if (!pack.shadow.querySelector("style[data-ss]")) {
      style.setAttribute("data-ss", "1");
      pack.shadow.appendChild(style);
    }

    const bar = document.createElement("div");
    bar.id = "ss-toolbar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "SnapSolve AI quick actions");

    const mk = (label: string, title: string, onClick: () => void) => {
      const el = document.createElement("button");
      el.type = "button";
      el.textContent = label;
      el.title = title;
      el.setAttribute("aria-label", title);
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          onClick();
        } catch {
          /* never break host page */
        }
      });
      return el;
    };

    bar.append(
      mk("Capture", "Capture region", () => void startRegionCapture()),
      mk("Solve", "Solve selected text", () => void solveSelection()),
      mk("Panel", "Open side panel", () => safeSend({ type: "OPEN_SIDE_PANEL" })),
      mk("×", "Hide toolbar for this page", () => removeToolbar())
    );
    pack.shadow.appendChild(bar);
  } catch {
    /* toolbar is optional — failure must not affect browsing */
  }
}

async function solveSelection() {
  const text = getSelectedText();
  if (!text) {
    safeSend({
      type: "SET_PENDING_QUESTION",
      text: "",
      source: "selection",
    });
    safeSend({ type: "OPEN_SIDE_PANEL" });
    return;
  }
  safeSend({ type: "SET_PENDING_QUESTION", text, source: "selection" });
  safeSend({ type: "OPEN_SIDE_PANEL" });
}

async function startRegionCapture() {
  try {
    removeOverlay();
    const pack = getOrCreateHost();
    if (!pack) {
      safeSend({ type: "CAPTURE_CANCELLED" });
      return;
    }

    pack.host.style.width = "100vw";
    pack.host.style.height = "100vh";
    pack.host.style.pointerEvents = "auto";

    const overlay = document.createElement("div");
    overlay.id = "ss-overlay";
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      cursor: "crosshair",
      background: "rgba(7, 11, 22, 0.28)",
      pointerEvents: "auto",
      zIndex: "2147483647",
    } as CSSStyleDeclaration);

    const box = document.createElement("div");
    Object.assign(box.style, {
      position: "absolute",
      border: "2px solid #22d3ee",
      background: "rgba(34, 211, 238, 0.12)",
      display: "none",
      pointerEvents: "none",
    } as CSSStyleDeclaration);
    overlay.appendChild(box);

    const hint = document.createElement("div");
    hint.textContent = "Drag to select a question · Esc to cancel";
    Object.assign(hint.style, {
      position: "fixed",
      top: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(11,18,36,0.95)",
      color: "#e8eefc",
      padding: "8px 14px",
      borderRadius: "999px",
      fontFamily: "system-ui, sans-serif",
      fontSize: "13px",
      border: "1px solid rgba(34,211,238,0.35)",
      pointerEvents: "none",
    } as CSSStyleDeclaration);
    overlay.appendChild(hint);

    let startX = 0;
    let startY = 0;
    let drawing = false;

    const cleanup = () => {
      drawing = false;
      window.removeEventListener("keydown", onKey, true);
      removeOverlay();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        cleanup();
        safeSend({ type: "CAPTURE_CANCELLED" });
      }
    };

    overlay.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      drawing = true;
      startX = e.clientX;
      startY = e.clientY;
      box.style.display = "block";
      box.style.left = `${startX}px`;
      box.style.top = `${startY}px`;
      box.style.width = "0px";
      box.style.height = "0px";
    });

    overlay.addEventListener("mousemove", (e) => {
      if (!drawing) return;
      e.preventDefault();
      e.stopPropagation();
      const x = Math.min(startX, e.clientX);
      const y = Math.min(startY, e.clientY);
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
      box.style.width = `${Math.abs(e.clientX - startX)}px`;
      box.style.height = `${Math.abs(e.clientY - startY)}px`;
    });

    overlay.addEventListener("mouseup", async (e) => {
      if (!drawing) return;
      e.preventDefault();
      e.stopPropagation();
      drawing = false;
      const rect: CaptureRect = {
        x: Math.min(startX, e.clientX),
        y: Math.min(startY, e.clientY),
        width: Math.abs(e.clientX - startX),
        height: Math.abs(e.clientY - startY),
        devicePixelRatio: window.devicePixelRatio || 1,
      };
      cleanup();
      if (rect.width < 8 || rect.height < 8) return;

      try {
        const shot = await chrome.runtime.sendMessage({
          type: "CAPTURE_TAB_SCREENSHOT",
        } as ExtensionMessage);
        const dataUrl = (shot as { dataUrl?: string })?.dataUrl;
        if (!dataUrl) throw new Error("Screenshot unavailable.");
        const cropped = await cropDataUrl(dataUrl, rect);
        safeSend({ type: "REGION_CAPTURED", dataUrl: cropped });
        safeSend({ type: "OPEN_SIDE_PANEL" });
      } catch {
        safeSend({ type: "CAPTURE_CANCELLED" });
      }
    });

    window.addEventListener("keydown", onKey, true);
    pack.shadow.appendChild(overlay);
  } catch {
    safeSend({ type: "CAPTURE_CANCELLED" });
  }
}

function isSnapSolveMessage(message: unknown): message is ExtensionMessage {
  return (
    !!message &&
    typeof message === "object" &&
    "type" in message &&
    typeof (message as { type: unknown }).type === "string"
  );
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!isSnapSolveMessage(message)) {
    sendResponse({ ok: false, error: "invalid_message" });
    return false;
  }

  (async () => {
    try {
      switch (message.type) {
        case "START_REGION_CAPTURE":
          await startRegionCapture();
          sendResponse({ ok: true, channel: MSG_PREFIX });
          break;
        case "GET_SELECTED_TEXT":
          sendResponse({ type: "SELECTED_TEXT", text: getSelectedText() });
          break;
        case "ANALYZE_VISIBLE_PAGE": {
          const result = extractVisibleText();
          sendResponse({ type: "VISIBLE_PAGE_TEXT", ...result });
          break;
        }
        case "PING":
          sendResponse({ type: "PONG" });
          break;
        default:
          sendResponse({ ok: false });
      }
    } catch {
      sendResponse({ ok: false, error: "content_script_fault_isolated" });
    }
  })();

  return true;
});

// Toolbar is opt-in via settings; never auto-inject on install.
void ensureToolbar();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || !changes.snapsolve_settings) return;
  void ensureToolbar();
});

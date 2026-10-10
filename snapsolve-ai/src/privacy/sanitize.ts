const SENSITIVE_INPUT_TYPES = new Set([
  "password",
  "email",
  "tel",
  "credit-card",
  "cc-number",
  "cc-csc",
  "cc-exp",
]);

export function isSensitiveElement(el: Element | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  if (el instanceof HTMLInputElement) {
    const type = (el.type || "").toLowerCase();
    const autocomplete = (el.autocomplete || "").toLowerCase();
    if (SENSITIVE_INPUT_TYPES.has(type)) return true;
    if (autocomplete.includes("cc-") || autocomplete.includes("password")) return true;
    if (el.name?.toLowerCase().includes("password")) return true;
  }
  if (el.getAttribute("aria-sensitive") === "true") return true;
  return false;
}

export function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function wrapUntrustedContent(text: string): string {
  // Back-compat helper — prefer security/prompt-guard in solvers.
  return [
    "UNTRUSTED_DATA_START",
    text,
    "UNTRUSTED_DATA_END",
  ].join("\n");
}

export function redactSecrets(text: string): string {
  return text
    .replace(/sk-[a-zA-Z0-9]{10,}/g, "[redacted-key]")
    .replace(/sk-proj-[a-zA-Z0-9\-_]{10,}/g, "[redacted-key]")
    .replace(/AIza[0-9A-Za-z\-_]{20,}/g, "[redacted-key]")
    .replace(/Bearer\s+[A-Za-z0-9\-._~+/]+=*/g, "Bearer [redacted]")
    .replace(/ssenc1:[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]+/g, "[redacted-encrypted-secret]")
    .replace(/xox[baprs]-[A-Za-z0-9-]{10,}/g, "[redacted-token]");
}

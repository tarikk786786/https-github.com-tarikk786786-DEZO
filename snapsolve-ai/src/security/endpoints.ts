/**
 * Outbound network allowlist for provider calls.
 * Blocks SSRF to localhost metadata, file:, chrome:, and unexpected hosts
 * unless the provider is explicitly local (ollama/lmstudio/custom).
 */

const BLOCKED_HOSTS = new Set([
  "metadata.google.internal",
  "metadata",
  "169.254.169.254",
]);

const LOCAL_LOOPBACK = new Set(["127.0.0.1", "localhost", "[::1]", "::1"]);

const HOSTED_ALLOWLIST: Record<string, string[]> = {
  openai: ["api.openai.com"],
  gemini: ["generativelanguage.googleapis.com"],
  anthropic: ["api.anthropic.com"],
  openrouter: ["openrouter.ai"],
  groq: ["api.groq.com"],
  mistral: ["api.mistral.ai"],
  deepseek: ["api.deepseek.com"],
  together: ["api.together.xyz"],
  fireworks: ["api.fireworks.ai"],
  cerebras: ["api.cerebras.ai"],
  cohere: ["api.cohere.com", "api.cohere.ai"],
  huggingface: ["router.huggingface.co", "api-inference.huggingface.co", "huggingface.co"],
};

export type NetworkScope = "hosted" | "local" | "custom";

export function classifyProviderNetwork(providerId: string): NetworkScope {
  if (providerId === "ollama" || providerId === "lmstudio") return "local";
  if (providerId === "custom") return "custom";
  return "hosted";
}

export function assertSafeProviderUrl(
  providerId: string,
  rawUrl: string
): URL {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("Invalid provider URL.");
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Only http(s) provider endpoints are allowed.");
  }

  const host = url.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host)) {
    throw new Error("Blocked destination host.");
  }

  // Credential embedding in URL is unsafe.
  if (url.username || url.password) {
    throw new Error("Credentials in URLs are not allowed.");
  }

  const scope = classifyProviderNetwork(providerId);

  if (scope === "hosted") {
    if (url.protocol !== "https:") {
      throw new Error("Hosted providers must use HTTPS.");
    }
    const allowed = HOSTED_ALLOWLIST[providerId] ?? [];
    const ok = allowed.some((a) => host === a || host.endsWith(`.${a}`));
    if (!ok) {
      throw new Error(`Host ${host} is not on the allowlist for ${providerId}.`);
    }
  }

  if (scope === "local") {
    if (!LOCAL_LOOPBACK.has(host) && !host.endsWith(".local")) {
      throw new Error("Local providers may only target loopback or *.local hosts.");
    }
  }

  if (scope === "custom") {
    // Custom endpoints are user-controlled; still block cloud metadata and non-http(s).
    if (host.endsWith(".internal") || host.startsWith("169.254.")) {
      throw new Error("Custom endpoint host is not allowed.");
    }
  }

  return url;
}

export function isAllowedDataImageUrl(dataUrl: string): boolean {
  if (!dataUrl.startsWith("data:image/")) return false;
  if (dataUrl.startsWith("data:image/svg+xml")) return false; // avoid scriptable SVG
  return /^data:image\/(png|jpe?g|webp);base64,/i.test(dataUrl);
}

import { LICENSE_PUBLIC_JWK, PRICING } from "./public-key";

export type LicenseTier = "free" | "pro";

export interface LicensePayload {
  v: 1;
  tier: "pro";
  /** Optional expiry as unix ms. Omit for non-expiring keys. */
  exp?: number;
  /** Optional customer label (email or name) — display only. */
  name?: string;
  /** Issued-at unix ms */
  iat: number;
}

export interface LicenseState {
  tier: LicenseTier;
  key?: string;
  payload?: LicensePayload;
  activatedAt?: number;
  lastCheckedAt?: number;
  error?: string;
}

/** Providers Free plan may call (free / local LLMs). Paid cloud APIs need Pro. */
export const FREE_PLAN_PROVIDERS = [
  "demo",
  "ollama",
  "lmstudio",
  "openrouter",
  "huggingface",
  "groq",
] as const;

export const FREE_LIMITS = {
  solvesPerDay: 8,
  batchLimit: 2,
  historyItems: 25,
  /** Free may use free-tier LLM hosts; paid cloud APIs still need Pro. */
  allowHostedProviders: false,
  allowFreeHostedProviders: true,
  allowVerification: false,
  allowFloatingToolbar: false,
  allowCatalogRefresh: true,
  allowCustomEndpoints: false,
} as const;

export const PRO_LIMITS = {
  solvesPerDay: 10_000,
  batchLimit: 50,
  historyItems: 200,
  allowHostedProviders: true,
  allowFreeHostedProviders: true,
  allowVerification: true,
  allowFloatingToolbar: true,
  allowCatalogRefresh: true,
  allowCustomEndpoints: true,
} as const;

function b64urlToBytes(b64url: string): Uint8Array {
  const padded = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (padded.length % 4)) % 4);
  const bin = atob(padded + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToB64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < arr.length; i += 1) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function importVerifyKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "jwk",
    LICENSE_PUBLIC_JWK,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["verify"]
  );
}

export function parseLicenseKeyFormat(key: string): { payloadB64: string; sigB64: string } | null {
  const trimmed = key.trim().replace(/\s+/g, "");
  const parts = trimmed.split(".");
  if (parts.length !== 3) return null;
  if (parts[0] !== "SS1") return null;
  if (!parts[1] || !parts[2]) return null;
  return { payloadB64: parts[1], sigB64: parts[2] };
}

export async function verifyLicenseKey(key: string): Promise<LicensePayload> {
  const parsed = parseLicenseKeyFormat(key);
  if (!parsed) throw new Error("That doesn’t look like a SnapSolve license key.");

  const payloadBytes = b64urlToBytes(parsed.payloadB64);
  const sigBytes = b64urlToBytes(parsed.sigB64);
  const cryptoKey = await importVerifyKey();
  const ok = await crypto.subtle.verify(
    { name: "ECDSA", hash: "SHA-256" },
    cryptoKey,
    sigBytes,
    payloadBytes
  );
  if (!ok) throw new Error("License signature is invalid.");

  let payload: LicensePayload;
  try {
    payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as LicensePayload;
  } catch {
    throw new Error("License payload is corrupt.");
  }

  if (payload.v !== 1 || payload.tier !== "pro" || typeof payload.iat !== "number") {
    throw new Error("Unsupported license format.");
  }
  if (payload.exp != null && Date.now() > payload.exp) {
    throw new Error("This license has expired. Renew at tarikislam.in.");
  }
  return payload;
}

export function getEntitlements(state: LicenseState | undefined) {
  const active =
    state?.tier === "pro" &&
    state.payload &&
    (state.payload.exp == null || state.payload.exp > Date.now());
  return active ? { tier: "pro" as const, ...PRO_LIMITS } : { tier: "free" as const, ...FREE_LIMITS };
}

export function purchaseUrl(): string {
  return PRICING.purchaseUrl;
}

export { PRICING, bytesToB64url, b64urlToBytes };

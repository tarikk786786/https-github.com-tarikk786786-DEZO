/**
 * At-rest protection for API keys in chrome.storage.local.
 * Keys are AES-GCM encrypted with a key derived from a per-install salt
 * and the extension ID. Content scripts never receive decrypted secrets.
 *
 * Note: Any extension page with storage access can still decrypt after load.
 * This stops casual leakage via exports, screenshots of storage dumps, and
 * accidental logging — it is not a substitute for OS account security.
 */

const SALT_KEY = "snapsolve_crypto_salt_v1";
const ENC_PREFIX = "ssenc1:";

function toB64(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < arr.length; i += 1) s += String.fromCharCode(arr[i]);
  return btoa(s);
}

function fromB64(b64: string): Uint8Array {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i += 1) out[i] = s.charCodeAt(i);
  return out;
}

async function getSalt(): Promise<Uint8Array> {
  const existing = await chrome.storage.local.get(SALT_KEY);
  if (typeof existing[SALT_KEY] === "string" && existing[SALT_KEY]) {
    return fromB64(existing[SALT_KEY] as string);
  }
  const salt = crypto.getRandomValues(new Uint8Array(16));
  await chrome.storage.local.set({ [SALT_KEY]: toB64(salt) });
  return salt;
}

async function deriveKey(): Promise<CryptoKey> {
  const salt = await getSalt();
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(`snapsolve:${chrome.runtime.id}`),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 120_000,
      hash: "SHA-256",
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export function isEncryptedSecret(value: string | undefined | null): boolean {
  return typeof value === "string" && value.startsWith(ENC_PREFIX);
}

export async function encryptSecret(plaintext: string): Promise<string> {
  if (!plaintext) return "";
  if (isEncryptedSecret(plaintext)) return plaintext;
  const key = await deriveKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  return `${ENC_PREFIX}${toB64(iv)}.${toB64(cipher)}`;
}

export async function decryptSecret(value: string | undefined | null): Promise<string> {
  if (!value) return "";
  if (!isEncryptedSecret(value)) return value;
  const payload = value.slice(ENC_PREFIX.length);
  const [ivB64, dataB64] = payload.split(".");
  if (!ivB64 || !dataB64) throw new Error("Corrupt encrypted secret.");
  const key = await deriveKey();
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromB64(ivB64) },
    key,
    fromB64(dataB64)
  );
  return new TextDecoder().decode(plain);
}

export async function encryptProviderSecrets<
  T extends { apiKey?: string }
>(providers: T[]): Promise<T[]> {
  return Promise.all(
    providers.map(async (p) => {
      if (!p.apiKey || isEncryptedSecret(p.apiKey)) return p;
      return { ...p, apiKey: await encryptSecret(p.apiKey) };
    })
  );
}

export async function decryptProviderSecrets<
  T extends { apiKey?: string }
>(providers: T[]): Promise<T[]> {
  return Promise.all(
    providers.map(async (p) => {
      if (!p.apiKey) return p;
      try {
        return { ...p, apiKey: await decryptSecret(p.apiKey) };
      } catch {
        return { ...p, apiKey: "" };
      }
    })
  );
}

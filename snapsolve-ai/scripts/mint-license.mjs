#!/usr/bin/env node
/**
 * Mint a SnapSolve Pro license key (SS1.<payload>.<sig>).
 *
 * Requires the private JWK at keys/license-private.jwk.json (gitignored).
 *
 * Usage:
 *   node scripts/mint-license.mjs [--name "Ada"] [--days 365] [--exp <unix-ms>]
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { webcrypto } from "node:crypto";

const crypto = webcrypto;
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const privatePath = join(root, "keys", "license-private.jwk.json");

function parseArgs(argv) {
  const out = { name: undefined, days: undefined, exp: undefined };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--name") out.name = argv[++i];
    else if (a === "--days") out.days = Number(argv[++i]);
    else if (a === "--exp") out.exp = Number(argv[++i]);
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/mint-license.mjs [--name "Ada"] [--days 365]`);
      process.exit(0);
    }
  }
  return out;
}

function bytesToB64url(bytes) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < arr.length; i += 1) s += String.fromCharCode(arr[i]);
  return Buffer.from(s, "binary").toString("base64url");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let jwk;
  try {
    jwk = JSON.parse(readFileSync(privatePath, "utf8"));
  } catch {
    console.error(`Missing private key at ${privatePath}`);
    console.error("Generate with: node -e \"...\" (see README Pro licensing)");
    process.exit(1);
  }

  if (!jwk.d) {
    console.error("Private JWK is missing the 'd' field.");
    process.exit(1);
  }

  const iat = Date.now();
  const payload = {
    v: 1,
    tier: "pro",
    iat,
  };
  if (args.name) payload.name = String(args.name);
  if (args.exp != null && Number.isFinite(args.exp)) payload.exp = args.exp;
  else if (args.days != null && Number.isFinite(args.days)) {
    payload.exp = iat + Math.round(args.days * 24 * 60 * 60 * 1000);
  }

  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, payloadBytes);
  const keyStr = `SS1.${bytesToB64url(payloadBytes)}.${bytesToB64url(sig)}`;
  console.log(keyStr);
  console.error(JSON.stringify({ payload, length: keyStr.length }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

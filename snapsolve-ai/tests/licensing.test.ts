import { describe, expect, it } from "vitest";
import {
  FREE_LIMITS,
  FREE_PLAN_PROVIDERS,
  PRO_LIMITS,
  getEntitlements,
  parseLicenseKeyFormat,
  purchaseUrl,
} from "../src/licensing/license";
import {
  assertCanRefreshCatalog,
  assertCanSolve,
  assertCanUseHostedProvider,
  assertCanVerify,
  clampBatchLimit,
  entitlementsFor,
  freeSolvesRemaining,
  isPro,
} from "../src/licensing/gate";
import { DEFAULT_SETTINGS } from "../src/storage/defaults";
import { PRICING } from "../src/licensing/public-key";

describe("license format", () => {
  it("accepts SS1.payload.sig shape", () => {
    expect(parseLicenseKeyFormat("SS1.abc.def")).toEqual({
      payloadB64: "abc",
      sigB64: "def",
    });
  });

  it("rejects junk keys", () => {
    expect(parseLicenseKeyFormat("not-a-key")).toBeNull();
    expect(parseLicenseKeyFormat("SS2.a.b")).toBeNull();
    expect(parseLicenseKeyFormat("SS1.onlyone")).toBeNull();
  });
});

describe("entitlements", () => {
  it("defaults to free limits with free LLM hosts", () => {
    const ent = getEntitlements({ tier: "free" });
    expect(ent.tier).toBe("free");
    expect(ent.solvesPerDay).toBe(FREE_LIMITS.solvesPerDay);
    expect(ent.allowHostedProviders).toBe(false);
    expect(ent.allowFreeHostedProviders).toBe(true);
    expect(FREE_PLAN_PROVIDERS).toContain("openrouter");
  });

  it("activates pro when payload is valid and unexpired", () => {
    const ent = getEntitlements({
      tier: "pro",
      payload: { v: 1, tier: "pro", iat: Date.now() },
    });
    expect(ent.tier).toBe("pro");
    expect(ent.solvesPerDay).toBe(PRO_LIMITS.solvesPerDay);
    expect(ent.allowHostedProviders).toBe(true);
  });

  it("falls back to free when pro payload expired", () => {
    const ent = getEntitlements({
      tier: "pro",
      payload: { v: 1, tier: "pro", iat: 1, exp: 1 },
    });
    expect(ent.tier).toBe("free");
  });
});

describe("gates", () => {
  it("allows free LLM hosts on Free; blocks paid cloud", () => {
    expect(() => assertCanUseHostedProvider(DEFAULT_SETTINGS, "openrouter")).not.toThrow();
    expect(() => assertCanUseHostedProvider(DEFAULT_SETTINGS, "groq")).not.toThrow();
    expect(() => assertCanUseHostedProvider(DEFAULT_SETTINGS, "demo")).not.toThrow();
    expect(() => assertCanUseHostedProvider(DEFAULT_SETTINGS, "ollama")).not.toThrow();
    expect(() => assertCanUseHostedProvider(DEFAULT_SETTINGS, "openai")).toThrow(/Pro/);
    expect(() => assertCanUseHostedProvider(DEFAULT_SETTINGS, "anthropic")).toThrow(/Pro/);
    expect(() => assertCanUseHostedProvider(DEFAULT_SETTINGS, "custom")).toThrow(/Pro/);
  });

  it("blocks verification on free; allows catalog refresh for free models", () => {
    expect(() => assertCanVerify(DEFAULT_SETTINGS)).toThrow(/Pro/);
    expect(() => assertCanRefreshCatalog(DEFAULT_SETTINGS)).not.toThrow();
  });

  it("enforces free daily solve cap", () => {
    const dayKey = new Date().toISOString().slice(0, 10);
    const settings = {
      ...DEFAULT_SETTINGS,
      requestsToday: FREE_LIMITS.solvesPerDay,
      requestsDayKey: dayKey,
    };
    expect(() => assertCanSolve(settings)).toThrow(/Free plan limit/);
    expect(freeSolvesRemaining(settings)).toBe(0);
  });

  it("clamps batch limit for free", () => {
    expect(clampBatchLimit(DEFAULT_SETTINGS, 50)).toBe(FREE_LIMITS.batchLimit);
  });

  it("reports free tier helpers and default free LLM settings", () => {
    expect(isPro(DEFAULT_SETTINGS)).toBe(false);
    expect(entitlementsFor(DEFAULT_SETTINGS).tier).toBe("free");
    expect(purchaseUrl()).toBe(PRICING.purchaseUrl);
    expect(DEFAULT_SETTINGS.defaultProvider).toBe("openrouter");
    expect(DEFAULT_SETTINGS.freeOnlyMode).toBe(true);
    expect(DEFAULT_SETTINGS.routingMode).toBe("free-only");
  });
});

import {
  FREE_PLAN_PROVIDERS,
  getEntitlements,
  type LicenseState,
} from "./license";
import type { Settings } from "@/shared/types";

export function entitlementsFor(settings: Settings) {
  return getEntitlements(settings.license);
}

export function assertCanSolve(settings: Settings): void {
  const ent = entitlementsFor(settings);
  const dayKey = new Date().toISOString().slice(0, 10);
  const used = settings.requestsDayKey === dayKey ? settings.requestsToday : 0;
  if (used >= ent.solvesPerDay) {
    if (ent.tier === "free") {
      throw new Error(
        `Free plan limit reached (${ent.solvesPerDay}/day). Upgrade to SnapSolve Pro for more — tarikislam.in`
      );
    }
    throw new Error("Daily solve limit reached. Try again tomorrow or raise your budget in Settings.");
  }
}

export function isFreePlanProvider(providerId: string): boolean {
  return (FREE_PLAN_PROVIDERS as readonly string[]).includes(providerId);
}

export function assertCanUseHostedProvider(settings: Settings, providerId: string): void {
  const ent = entitlementsFor(settings);

  if (providerId === "custom" && !ent.allowCustomEndpoints) {
    throw new Error("Custom endpoints require SnapSolve Pro.");
  }

  if (ent.allowHostedProviders) return;

  if (isFreePlanProvider(providerId) && ent.allowFreeHostedProviders) return;

  throw new Error(
    "That AI provider is part of SnapSolve Pro. On Free, connect OpenRouter / Groq / Hugging Face free models, or run Ollama locally — upgrade at tarikislam.in"
  );
}

export function assertCanVerify(settings: Settings): void {
  if (!entitlementsFor(settings).allowVerification) {
    throw new Error("Second-model verification is a Pro feature.");
  }
}

export function assertCanRefreshCatalog(settings: Settings): void {
  if (!entitlementsFor(settings).allowCatalogRefresh) {
    throw new Error("Model catalog refresh is included with SnapSolve Pro.");
  }
}

export function clampBatchLimit(settings: Settings, requested: number): number {
  return Math.min(requested, entitlementsFor(settings).batchLimit);
}

export function freeSolvesRemaining(settings: Settings): number {
  const ent = entitlementsFor(settings);
  const dayKey = new Date().toISOString().slice(0, 10);
  const used = settings.requestsDayKey === dayKey ? settings.requestsToday : 0;
  return Math.max(0, ent.solvesPerDay - used);
}

export function isPro(settings: Settings): boolean {
  return entitlementsFor(settings).tier === "pro";
}

export function emptyLicense(): LicenseState {
  return { tier: "free" };
}

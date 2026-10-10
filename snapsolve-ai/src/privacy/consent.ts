import type { ProviderId, Settings } from "@/shared/types";

/** Stable message used by the router and UI (detect with isConsentRequiredError). */
export const CONSENT_REQUIRED_MESSAGE =
  "Allow sending this question to your AI provider to continue. You can revoke this anytime in Settings → Privacy.";

const LOCAL_PROVIDERS: ProviderId[] = ["demo", "ollama", "lmstudio"];

export function isLocalProvider(providerId: string): boolean {
  return (LOCAL_PROVIDERS as string[]).includes(providerId);
}

export function isConsentRequiredError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    message.includes(CONSENT_REQUIRED_MESSAGE) ||
    (m.includes("external ai transfer is blocked") && m.includes("consent")) ||
    (m.includes("allow sending this question") && m.includes("provider"))
  );
}

/**
 * True when solving with the current default would need hosted AI consent.
 * Shown proactively in popup/workspace so users never hit a dead-end error.
 */
export function needsExternalConsent(
  settings: Settings,
  providerId?: string
): boolean {
  if (!settings.requireConsentBeforeExternal) return false;
  if (settings.consentedExternalTransfer) return false;
  if (settings.demoMode) return false;
  const id = providerId ?? settings.defaultProvider;
  if (isLocalProvider(id)) return false;
  return true;
}

export function consentPatch(): Pick<Settings, "consentedExternalTransfer"> {
  return { consentedExternalTransfer: true };
}

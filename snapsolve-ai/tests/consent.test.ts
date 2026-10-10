import { describe, expect, it } from "vitest";
import {
  CONSENT_REQUIRED_MESSAGE,
  isConsentRequiredError,
  isLocalProvider,
  needsExternalConsent,
} from "../src/privacy/consent";
import { DEFAULT_SETTINGS } from "../src/storage/defaults";

describe("external AI consent", () => {
  it("requires consent for default free LLM (OpenRouter)", () => {
    expect(needsExternalConsent(DEFAULT_SETTINGS)).toBe(true);
  });

  it("does not require consent after user allows", () => {
    expect(
      needsExternalConsent({
        ...DEFAULT_SETTINGS,
        consentedExternalTransfer: true,
      })
    ).toBe(false);
  });

  it("does not require consent in demo / local modes", () => {
    expect(
      needsExternalConsent({
        ...DEFAULT_SETTINGS,
        demoMode: true,
        defaultProvider: "demo",
      })
    ).toBe(false);
    expect(
      needsExternalConsent({
        ...DEFAULT_SETTINGS,
        defaultProvider: "ollama",
      })
    ).toBe(false);
  });

  it("detects consent errors including legacy wording", () => {
    expect(isConsentRequiredError(CONSENT_REQUIRED_MESSAGE)).toBe(true);
    expect(
      isConsentRequiredError(
        "External AI transfer is blocked until you consent in Settings → Privacy."
      )
    ).toBe(true);
    expect(isConsentRequiredError("Daily solve limit reached")).toBe(false);
  });

  it("classifies local providers", () => {
    expect(isLocalProvider("demo")).toBe(true);
    expect(isLocalProvider("openrouter")).toBe(false);
  });
});

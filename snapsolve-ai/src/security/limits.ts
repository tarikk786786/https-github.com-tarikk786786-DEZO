/** Hard limits to reduce abuse, DoS, and accidental data exfiltration. */

export const LIMITS = {
  maxQuestionChars: 40_000,
  maxImageDataUrlChars: 6_000_000, // ~4.5MB base64 budget
  maxPendingTextChars: 40_000,
  maxHistoryItems: 200,
  maxHistoryNotesChars: 8_000,
  maxSystemInstructionsChars: 8_000,
  maxFollowUpChars: 8_000,
  maxMessageJsonChars: 8_000_000,
  maxSolvePerMinute: 20,
  maxCatalogRefreshPerHour: 30,
  maxProviderErrorChars: 500,
  maxDataUrlPrefix: "data:image/",
} as const;

export function truncate(input: string, max: number): string {
  if (input.length <= max) return input;
  return input.slice(0, max);
}

export function assertWithinLimit(label: string, value: string, max: number): void {
  if (value.length > max) {
    throw new Error(`${label} exceeds the ${max} character safety limit.`);
  }
}

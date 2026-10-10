import { DEFAULT_PROVIDERS, DEFAULT_SETTINGS } from "./defaults";
import type { CatalogModel, HistoryItem, Settings } from "@/shared/types";

const SETTINGS_KEY = "snapsolve_settings";
const HISTORY_KEY = "snapsolve_history";
const PENDING_KEY = "snapsolve_pending";
const CATALOG_KEY = "snapsolve_model_catalog";

function mergeSettings(stored: Partial<Settings> | undefined): Settings {
  const base = { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
  const providers = DEFAULT_PROVIDERS.map((defaultProvider) => {
    const override = stored?.providers?.find((p) => p.id === defaultProvider.id);
    return override ? { ...defaultProvider, ...override } : defaultProvider;
  });
  return { ...base, providers };
}

export async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get(SETTINGS_KEY);
  return mergeSettings(result[SETTINGS_KEY] as Partial<Settings> | undefined);
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const next = mergeSettings({ ...current, ...patch });
  if (patch.providers) {
    next.providers = DEFAULT_PROVIDERS.map((defaultProvider) => {
      const override = patch.providers?.find((p) => p.id === defaultProvider.id);
      const existing = current.providers.find((p) => p.id === defaultProvider.id);
      return { ...defaultProvider, ...existing, ...override };
    });
  }
  await chrome.storage.local.set({ [SETTINGS_KEY]: next });
  return next;
}

export async function bumpRequestCount(): Promise<void> {
  const settings = await getSettings();
  const dayKey = new Date().toISOString().slice(0, 10);
  const requestsToday = settings.requestsDayKey === dayKey ? settings.requestsToday + 1 : 1;
  await saveSettings({ requestsToday, requestsDayKey: dayKey });
}

export async function getHistory(): Promise<HistoryItem[]> {
  const result = await chrome.storage.local.get(HISTORY_KEY);
  const items = (result[HISTORY_KEY] as HistoryItem[] | undefined) ?? [];
  const settings = await getSettings();
  if (!settings.historyEnabled) return [];
  const cutoff = Date.now() - settings.historyRetentionDays * 24 * 60 * 60 * 1000;
  return items.filter((item) => item.createdAt >= cutoff);
}

export async function saveHistoryItem(item: HistoryItem): Promise<void> {
  const settings = await getSettings();
  if (!settings.historyEnabled) return;
  const result = await chrome.storage.local.get(HISTORY_KEY);
  const items = (result[HISTORY_KEY] as HistoryItem[] | undefined) ?? [];
  const next = [item, ...items.filter((x) => x.id !== item.id)].slice(0, 200);
  await chrome.storage.local.set({ [HISTORY_KEY]: next });
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const result = await chrome.storage.local.get(HISTORY_KEY);
  const items = (result[HISTORY_KEY] as HistoryItem[] | undefined) ?? [];
  await chrome.storage.local.set({
    [HISTORY_KEY]: items.filter((item) => item.id !== id),
  });
}

export async function clearHistory(): Promise<void> {
  await chrome.storage.local.set({ [HISTORY_KEY]: [] });
}

export interface PendingQuestion {
  text: string;
  source: string;
  imageDataUrl?: string;
  updatedAt: number;
}

export async function setPendingQuestion(pending: PendingQuestion): Promise<void> {
  await chrome.storage.session.set({ [PENDING_KEY]: pending });
}

export async function getPendingQuestion(): Promise<PendingQuestion | null> {
  const result = await chrome.storage.session.get(PENDING_KEY);
  return (result[PENDING_KEY] as PendingQuestion | undefined) ?? null;
}

export async function clearPendingQuestion(): Promise<void> {
  await chrome.storage.session.remove(PENDING_KEY);
}

export interface CatalogCache {
  updatedAt: number;
  models: CatalogModel[];
}

export async function getCatalogCache(): Promise<CatalogCache | null> {
  const result = await chrome.storage.local.get(CATALOG_KEY);
  return (result[CATALOG_KEY] as CatalogCache | undefined) ?? null;
}

export async function setCatalogCache(models: CatalogModel[]): Promise<void> {
  await chrome.storage.local.set({
    [CATALOG_KEY]: { updatedAt: Date.now(), models } satisfies CatalogCache,
  });
}

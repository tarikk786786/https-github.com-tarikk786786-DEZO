import { useEffect, useMemo, useState } from "react";
import { BrandFooter } from "@/components/BrandFooter";
import { Logo } from "@/components/Logo";
import { applyTheme, useSettings } from "@/hooks/useSettings";
import { filterCatalogModels, refreshModelCatalog, type FreeModelFilter } from "@/solvers/catalog";
import { BRAND, DEFAULT_PROVIDERS } from "@/storage/defaults";
import { getCatalogCache, saveSettings } from "@/storage/settings";
import type { CatalogModel, ProviderConfig, ProviderId, RoutingMode } from "@/shared/types";
import { redactSecrets } from "@/privacy/sanitize";

type Nav =
  | "providers"
  | "free-models"
  | "routing"
  | "capture"
  | "appearance"
  | "privacy"
  | "about";

const HELP_LINKS: Partial<Record<ProviderId, string>> = {
  openai: "https://platform.openai.com/api-keys",
  gemini: "https://aistudio.google.com/apikey",
  anthropic: "https://console.anthropic.com/",
  openrouter: "https://openrouter.ai/keys",
  groq: "https://console.groq.com/keys",
  mistral: "https://console.mistral.ai/",
  deepseek: "https://platform.deepseek.com/",
  together: "https://api.together.xyz/",
  fireworks: "https://fireworks.ai/",
  cerebras: "https://cloud.cerebras.ai/",
  cohere: "https://dashboard.cohere.com/",
  huggingface: "https://huggingface.co/settings/tokens",
  ollama: "https://ollama.com/",
  lmstudio: "https://lmstudio.ai/",
};

export function SettingsApp() {
  const { settings, ready, update } = useSettings();
  const [nav, setNav] = useState<Nav>("providers");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<CatalogModel[]>([]);
  const [catalogErrors, setCatalogErrors] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FreeModelFilter[]>(["free"]);
  const [testingId, setTestingId] = useState<ProviderId | null>(null);

  useEffect(() => {
    if (ready) applyTheme(settings.theme);
  }, [ready, settings.theme]);

  useEffect(() => {
    void getCatalogCache().then((c) => {
      if (c) setModels(c.models);
    });
  }, []);

  const filtered = useMemo(
    () => filterCatalogModels(models, { query, filters }),
    [models, query, filters]
  );

  const patchProvider = async (id: ProviderId, patch: Partial<ProviderConfig>) => {
    const providers = settings.providers.map((p) => (p.id === id ? { ...p, ...patch } : p));
    await update({ providers });
  };

  const testConnection = async (provider: ProviderConfig) => {
    setTestingId(provider.id);
    setError(null);
    setStatus(null);
    const started = performance.now();
    try {
      if (provider.id === "demo") {
        await patchProvider(provider.id, {
          connectionStatus: "ok",
          lastLatencyMs: 1,
          lastTestedAt: Date.now(),
          lastError: undefined,
        });
        setStatus("Demo provider ready (local simulation).");
        return;
      }

      const model = provider.model || "test";
      let ok = false;
      let detail = "";

      if (provider.id === "ollama") {
        const base = (provider.baseUrl || "http://127.0.0.1:11434").replace(/\/$/, "");
        const res = await fetch(`${base}/api/tags`);
        ok = res.ok;
        detail = ok ? "Ollama tags endpoint reachable." : `HTTP ${res.status}`;
      } else if (provider.id === "gemini") {
        if (!provider.apiKey) throw new Error("Add a Gemini API key first.");
        const base = (provider.baseUrl || "https://generativelanguage.googleapis.com/v1beta").replace(
          /\/$/,
          ""
        );
        const res = await fetch(`${base}/models?key=${encodeURIComponent(provider.apiKey)}`);
        ok = res.ok;
        detail = ok ? "Gemini models list OK." : `HTTP ${res.status}`;
      } else if (provider.id === "anthropic") {
        if (!provider.apiKey) throw new Error("Add an Anthropic API key first.");
        // Lightweight auth check — Anthropic has no public models list without billing; send a tiny messages call is costly.
        // We validate key format + endpoint reachability via a deliberately invalid tiny request and accept 400/401 distinction.
        const base = (provider.baseUrl || "https://api.anthropic.com").replace(/\/$/, "");
        const res = await fetch(`${base}/v1/messages`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": provider.apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model,
            max_tokens: 1,
            messages: [{ role: "user", content: "ping" }],
          }),
        });
        ok = res.ok || res.status === 400;
        detail = res.ok
          ? "Anthropic accepted a test message."
          : res.status === 401
            ? "Invalid API key"
            : `HTTP ${res.status} (endpoint reachable)`;
        if (res.status === 401) ok = false;
      } else {
        if (!provider.apiKey && !["lmstudio", "custom"].includes(provider.id)) {
          throw new Error("Add an API key first.");
        }
        const base = (provider.baseUrl || "").replace(/\/$/, "");
        if (!base) throw new Error("Set a base URL.");
        const headers: Record<string, string> = { Accept: "application/json" };
        if (provider.apiKey) headers.Authorization = `Bearer ${provider.apiKey}`;
        const res = await fetch(`${base}/models`, { headers });
        ok = res.ok;
        detail = ok ? "Models endpoint OK." : `HTTP ${res.status}`;
      }

      const latency = Math.round(performance.now() - started);
      await patchProvider(provider.id, {
        connectionStatus: ok ? "ok" : "error",
        lastLatencyMs: latency,
        lastTestedAt: Date.now(),
        lastError: ok ? undefined : detail,
      });
      setStatus(ok ? `${provider.label || provider.id}: ${detail} (${latency}ms)` : null);
      if (!ok) setError(redactSecrets(`${provider.id}: ${detail}`));
    } catch (e) {
      const msg = redactSecrets(e instanceof Error ? e.message : String(e));
      await patchProvider(provider.id, {
        connectionStatus: "error",
        lastError: msg,
        lastTestedAt: Date.now(),
      });
      setError(msg);
    } finally {
      setTestingId(null);
    }
  };

  const refreshCatalog = async (force = true) => {
    setStatus("Refreshing model catalogs…");
    setError(null);
    try {
      const result = await refreshModelCatalog(settings, { force });
      setModels(result.models);
      setCatalogErrors(result.errors);
      setStatus(`Catalog updated · ${result.models.length} models`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const exportConfig = async () => {
    const safe = {
      ...settings,
      providers: settings.providers.map(({ apiKey: _k, ...rest }) => rest),
    };
    const blob = new Blob([JSON.stringify(safe, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snapsolve-settings.nosecrets.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetProviders = async () => {
    await update({ providers: DEFAULT_PROVIDERS, defaultProvider: "demo", demoMode: true });
    setStatus("Providers reset to defaults.");
  };

  if (!ready) {
    return <div className="p-6 ss-muted">Loading settings…</div>;
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl gap-4 p-4 md:grid-cols-[220px_1fr]">
      <aside className="ss-panel h-fit p-3 md:sticky md:top-4">
        <div className="mb-3 flex items-center gap-2">
          <Logo size={28} />
          <div>
            <p className="font-display text-sm font-semibold">{BRAND.product}</p>
            <p className="ss-muted text-[11px]">Settings</p>
          </div>
        </div>
        {(
          [
            ["providers", "Providers"],
            ["free-models", "Free Models"],
            ["routing", "Routing & Cost"],
            ["capture", "Capture & OCR"],
            ["appearance", "Appearance"],
            ["privacy", "Privacy"],
            ["about", "About"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`ss-btn mb-1 w-full justify-start text-left text-sm ${nav === id ? "ss-btn-primary" : ""}`}
            onClick={() => setNav(id)}
          >
            {label}
          </button>
        ))}
      </aside>

      <main className="space-y-4">
        {(status || error) && (
          <div
            className={`rounded-xl px-3 py-2 text-sm ${
              error
                ? "ss-alert"
                : "ss-panel text-[var(--ss-accent)]"
            }`}
            role="status"
          >
            {error || status}
          </div>
        )}

        {nav === "providers" && (
          <section className="space-y-3">
            <header>
              <h1 className="font-display text-2xl font-semibold tracking-tight">Providers</h1>
              <p className="ss-muted mt-1 text-sm">
                Connect an API key or a local server. App subscriptions (ChatGPT Plus, Claude Pro, Gemini) are not the same as API access.
              </p>
            </header>
            <div className="flex flex-wrap gap-2">
              <button className="ss-btn text-xs" type="button" onClick={() => void exportConfig()}>
                Export config (no secrets)
              </button>
              <button className="ss-btn text-xs" type="button" onClick={() => void resetProviders()}>
                Reset providers
              </button>
            </div>
            {settings.providers.map((p) => (
              <article key={p.id} className="ss-panel p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-semibold">{p.label || p.id}</h2>
                    <p className="ss-muted text-xs">
                      Status: {p.connectionStatus ?? "unknown"}
                      {p.lastLatencyMs != null ? ` · ${p.lastLatencyMs}ms` : ""}
                      {p.lastError ? ` · ${p.lastError}` : ""}
                    </p>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.enabled}
                      onChange={(e) => void patchProvider(p.id, { enabled: e.target.checked })}
                    />
                    Enabled
                  </label>
                </div>
                {p.id !== "demo" && (
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <label className="text-xs ss-muted">
                      API key
                      <input
                        className="ss-input mt-1"
                        type="password"
                        autoComplete="off"
                        placeholder="Stored locally in extension storage"
                        value={p.apiKey ?? ""}
                        onChange={(e) => void patchProvider(p.id, { apiKey: e.target.value })}
                      />
                    </label>
                    <label className="text-xs ss-muted">
                      Base URL
                      <input
                        className="ss-input mt-1"
                        value={p.baseUrl ?? ""}
                        onChange={(e) => void patchProvider(p.id, { baseUrl: e.target.value })}
                      />
                    </label>
                    <label className="text-xs ss-muted">
                      Model
                      <input
                        className="ss-input mt-1"
                        value={p.model}
                        onChange={(e) => void patchProvider(p.id, { model: e.target.value })}
                      />
                    </label>
                    <label className="text-xs ss-muted">
                      Temperature
                      <input
                        className="ss-input mt-1"
                        type="number"
                        step="0.1"
                        min={0}
                        max={2}
                        value={p.temperature ?? 0.2}
                        onChange={(e) =>
                          void patchProvider(p.id, { temperature: Number(e.target.value) })
                        }
                      />
                    </label>
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className="ss-btn text-xs"
                    type="button"
                    disabled={testingId === p.id}
                    onClick={() => void testConnection(p)}
                  >
                    {testingId === p.id ? "Testing…" : "Test connection"}
                  </button>
                  {HELP_LINKS[p.id] && (
                    <a
                      className="ss-btn text-xs"
                      href={HELP_LINKS[p.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Official setup docs
                    </a>
                  )}
                  <button
                    className="ss-btn text-xs"
                    type="button"
                    onClick={() =>
                      void update({
                        defaultProvider: p.id,
                        demoMode: p.id === "demo",
                      })
                    }
                  >
                    Set default
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        {nav === "free-models" && (
          <section className="space-y-3">
            <header>
              <h1 className="font-display text-2xl font-semibold tracking-tight">Free models</h1>
              <p className="ss-muted mt-1 text-sm">
                Pulled from provider catalogs when available. “Free” means free at fetch time — it can change.
              </p>
            </header>
            <div className="flex flex-wrap gap-2">
              <button className="ss-btn-primary ss-btn text-xs" type="button" onClick={() => void refreshCatalog(true)}>
                Refresh catalogs
              </button>
              <input
                className="ss-input max-w-xs"
                placeholder="Search models…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "free",
                  "vision",
                  "coding",
                  "reasoning",
                  "math",
                  "long-context",
                  "structured",
                  "tools",
                  "local",
                ] as FreeModelFilter[]
              ).map((f) => {
                const on = filters.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    className={`ss-btn text-xs ${on ? "ss-btn-primary" : ""}`}
                    onClick={() =>
                      setFilters((prev) => (on ? prev.filter((x) => x !== f) : [...prev, f]))
                    }
                  >
                    {f}
                  </button>
                );
              })}
            </div>
            {catalogErrors.length > 0 && (
              <ul className="text-xs text-amber-200">
                {catalogErrors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
            <div className="space-y-2">
              {filtered.length === 0 && (
                <p className="ss-muted text-sm">
                  No models match. Enable OpenRouter (or a local catalog) and refresh.
                </p>
              )}
              {filtered.slice(0, 80).map((m) => (
                <article key={`${m.provider}:${m.id}`} className="ss-panel p-3 text-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="ss-muted text-xs">
                        {m.provider} · {m.id}
                        {m.pricing?.isFree ? " · free-listed" : ""}
                        {m.capabilities.vision ? " · vision" : ""}
                        {m.capabilities.contextLength
                          ? ` · ctx ${m.capabilities.contextLength}`
                          : ""}
                      </p>
                      {m.pricing?.pricingNote && (
                        <p className="ss-muted mt-1 text-[11px]">{m.pricing.pricingNote}</p>
                      )}
                    </div>
                    <button
                      className="ss-btn text-xs"
                      type="button"
                      onClick={() =>
                        void update({
                          defaultProvider: m.provider,
                          demoMode: m.provider === "demo",
                          providers: settings.providers.map((p) =>
                            p.id === m.provider ? { ...p, enabled: true, model: m.id } : p
                          ),
                        }).then(() => setStatus(`Selected ${m.id}`))
                      }
                    >
                      Use model
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {nav === "routing" && (
          <section className="ss-panel space-y-3 p-4">
            <h1 className="font-display text-2xl font-semibold tracking-tight">Routing & cost</h1>
            <label className="block text-sm">
              Routing mode
              <select
                className="ss-input mt-1"
                value={settings.routingMode}
                onChange={(e) => void update({ routingMode: e.target.value as RoutingMode })}
              >
                <option value="automatic">Automatic</option>
                <option value="cheapest">Cheapest eligible</option>
                <option value="fastest">Fastest (measured latency)</option>
                <option value="quality">Preferred quality / default</option>
                <option value="manual">Manual default only</option>
                <option value="free-only">Free / local only</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.allowPaidModels}
                onChange={(e) => void update({ allowPaidModels: e.target.checked })}
              />
              Allow paid models
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.freeOnlyMode}
                onChange={(e) => void update({ freeOnlyMode: e.target.checked })}
              />
              Prefer free/local routing
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.verifyAnswers}
                onChange={(e) => void update({ verifyAnswers: e.target.checked })}
              />
              Multi-model verification (uses a second provider when available)
            </label>
            <label className="block text-sm">
              Fallback provider
              <select
                className="ss-input mt-1"
                value={settings.fallbackProvider ?? ""}
                onChange={(e) =>
                  void update({
                    fallbackProvider: (e.target.value || undefined) as ProviderId | undefined,
                  })
                }
              >
                <option value="">None</option>
                {settings.providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label || p.id}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Daily request budget (optional)
              <input
                className="ss-input mt-1"
                type="number"
                min={0}
                value={settings.dailyRequestBudget ?? ""}
                onChange={(e) =>
                  void update({
                    dailyRequestBudget: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </label>
            <p className="ss-muted text-xs">
              Requests today: {settings.requestsToday}
              {settings.dailyRequestBudget != null ? ` / ${settings.dailyRequestBudget}` : ""}
            </p>
            <label className="block text-sm">
              Retry count
              <input
                className="ss-input mt-1"
                type="number"
                min={0}
                max={5}
                value={settings.retryCount}
                onChange={(e) => void update({ retryCount: Number(e.target.value) })}
              />
            </label>
          </section>
        )}

        {nav === "capture" && (
          <section className="ss-panel space-y-3 p-4">
            <h1 className="font-display text-2xl font-semibold tracking-tight">Capture & OCR</h1>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.floatingToolbar}
                onChange={(e) => void update({ floatingToolbar: e.target.checked })}
              />
              Show a small toolbar on websites (off by default)
            </label>
            <label className="block text-sm">
              Excluded hosts (comma-separated)
              <input
                className="ss-input mt-1"
                value={settings.floatingToolbarExcludedHosts.join(", ")}
                onChange={(e) =>
                  void update({
                    floatingToolbarExcludedHosts: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
            <label className="block text-sm">
              OCR language (Tesseract code)
              <input
                className="ss-input mt-1"
                value={settings.ocrLanguage}
                onChange={(e) => void update({ ocrLanguage: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              Batch question limit
              <input
                className="ss-input mt-1"
                type="number"
                min={1}
                max={50}
                value={settings.batchLimit}
                onChange={(e) => void update({ batchLimit: Number(e.target.value) })}
              />
            </label>
            <p className="ss-muted text-xs">
              Nothing is captured until you click Capture.
            </p>
          </section>
        )}

        {nav === "appearance" && (
          <section className="ss-panel space-y-3 p-4">
            <h1 className="font-display text-2xl font-semibold tracking-tight">Appearance</h1>
            <label className="block text-sm">
              Theme
              <select
                className="ss-input mt-1"
                value={settings.theme}
                onChange={(e) => void update({ theme: e.target.value as typeof settings.theme })}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </label>
            <label className="block text-sm">
              Font size
              <select
                className="ss-input mt-1"
                value={settings.fontSize}
                onChange={(e) => void update({ fontSize: e.target.value as typeof settings.fontSize })}
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.animations}
                onChange={(e) => void update({ animations: e.target.checked })}
              />
              Animations
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.exportIncludeBranding}
                onChange={(e) => void update({ exportIncludeBranding: e.target.checked })}
              />
              Include “{BRAND.attribution}” in copied/exported notes
            </label>
          </section>
        )}

        {nav === "privacy" && (
          <section className="ss-panel space-y-3 p-4">
            <h1 className="font-display text-2xl font-semibold tracking-tight">Privacy</h1>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.requireConsentBeforeExternal}
                onChange={(e) => void update({ requireConsentBeforeExternal: e.target.checked })}
              />
              Require consent before sending content to external AI providers
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.consentedExternalTransfer}
                onChange={(e) => void update({ consentedExternalTransfer: e.target.checked })}
              />
              I understand captured questions may be sent to my configured provider
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.historyEnabled}
                onChange={(e) => void update({ historyEnabled: e.target.checked })}
              />
              Save history locally
            </label>
            <label className="block text-sm">
              History retention (days)
              <input
                className="ss-input mt-1"
                type="number"
                min={1}
                max={365}
                value={settings.historyRetentionDays}
                onChange={(e) => void update({ historyRetentionDays: Number(e.target.value) })}
              />
            </label>
            <label className="block text-sm">
              Custom system instructions
              <textarea
                className="ss-input mt-1 min-h-[100px]"
                value={settings.systemInstructions}
                onChange={(e) => void update({ systemInstructions: e.target.value })}
              />
            </label>
            <button
              className="ss-btn text-xs"
              type="button"
              onClick={() =>
                void saveSettings({ demoMode: true, defaultProvider: "demo" }).then(() =>
                  setStatus("Switched to demo mode (local only).")
                )
              }
            >
              Use demo mode only
            </button>
          </section>
        )}

        {nav === "about" && (
          <section className="ss-panel space-y-3 p-4 leading-relaxed">
            <h1 className="font-display text-2xl font-semibold tracking-tight">About</h1>
            <p>
              {BRAND.product} is made by {BRAND.creator}.{" "}
              <a className="ss-brand-link" href={BRAND.website} target="_blank" rel="noopener noreferrer">
                {BRAND.attribution}
              </a>
            </p>
            <p className="ss-muted text-sm">
              Chrome extension (Manifest V3). Heavy UI stays in the popup and side panel. Keys stay in extension storage and are never injected into websites.
            </p>
            <ul className="ss-muted list-disc space-y-1 pl-5 text-sm">
              <li>Shortcuts: Alt+Shift+S capture · Alt+Shift+A side panel</li>
              <li>Permissions: storage, sidePanel, activeTab, scripting, contextMenus</li>
              <li>Optional host access only when interacting with a page</li>
            </ul>
          </section>
        )}

        <BrandFooter className="py-4" />
      </main>
    </div>
  );
}

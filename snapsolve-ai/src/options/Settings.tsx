import { useEffect, useMemo, useState } from "react";
import { BrandFooter } from "@/components/BrandFooter";
import { Logo } from "@/components/Logo";
import { applyTheme, useSettings } from "@/hooks/useSettings";
import { filterCatalogModels, refreshModelCatalog, type FreeModelFilter } from "@/solvers/catalog";
import { BRAND, DEFAULT_PROVIDERS } from "@/storage/defaults";
import { getCatalogCache, saveSettings } from "@/storage/settings";
import type { CatalogModel, ProviderConfig, ProviderId, RoutingMode } from "@/shared/types";
import { redactSecrets } from "@/privacy/sanitize";
import { FREE_PLAN_PROVIDERS, purchaseUrl, verifyLicenseKey, PRICING } from "@/licensing/license";
import { emptyLicense, freeSolvesRemaining, isPro } from "@/licensing/gate";

type Nav =
  | "providers"
  | "license"
  | "free-models"
  | "routing"
  | "capture"
  | "appearance"
  | "privacy"
  | "about";

const HELP_LINKS: Partial<Record<ProviderId, string>> = {
  openai: "https://platform.openai.com/api-keys",
  gemini: "https://aistudio.google.com/apikey",
  anthropic: "https://console.anthropic.com/settings/keys",
  openrouter: "https://openrouter.ai/keys",
  groq: "https://console.groq.com/keys",
  mistral: "https://console.mistral.ai/api-keys",
  deepseek: "https://platform.deepseek.com/api_keys",
  together: "https://api.together.xyz/settings/api-keys",
  fireworks: "https://fireworks.ai/account/api-keys",
  cerebras: "https://cloud.cerebras.ai/",
  cohere: "https://dashboard.cohere.com/api-keys",
  huggingface: "https://huggingface.co/settings/tokens",
  ollama: "https://ollama.com/download",
  lmstudio: "https://lmstudio.ai/",
  custom: "https://tarikislam.in",
};

const PROVIDER_GROUPS: { title: string; blurb: string; ids: ProviderId[] }[] = [
  {
    title: "Free LLMs (default)",
    blurb: "No paid API required. Connect a free key or run models on your machine.",
    ids: ["openrouter", "groq", "huggingface", "ollama", "lmstudio", "demo"],
  },
  {
    title: "Cloud AI — connect any provider",
    blurb: "Sign in at the provider site, create an API key, paste it here. Pro unlocks paid cloud solves.",
    ids: [
      "openai",
      "gemini",
      "anthropic",
      "mistral",
      "deepseek",
      "together",
      "fireworks",
      "cerebras",
      "cohere",
      "custom",
    ],
  },
];

function providerConnected(p: ProviderConfig): boolean {
  if (p.id === "demo") return true;
  if (["ollama", "lmstudio"].includes(p.id)) return Boolean(p.baseUrl);
  return Boolean(p.apiKey?.trim());
}

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
  const [licenseDraft, setLicenseDraft] = useState("");
  const [licenseBusy, setLicenseBusy] = useState(false);

  useEffect(() => {
    if (ready) applyTheme(settings.theme);
  }, [ready, settings.theme]);

  useEffect(() => {
    if (ready) setLicenseDraft(settings.license?.key ?? "");
  }, [ready, settings.license?.key]);

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
    await update({
      providers: DEFAULT_PROVIDERS,
      defaultProvider: "openrouter",
      demoMode: false,
      freeOnlyMode: true,
      allowPaidModels: false,
      routingMode: "free-only",
    });
    setStatus("Providers reset — default free LLM (OpenRouter) restored.");
  };

  const connectProvider = async (id: ProviderId) => {
    const providers = settings.providers.map((p) =>
      p.id === id ? { ...p, enabled: true } : p
    );
    await update({
      providers,
      defaultProvider: id,
      demoMode: id === "demo",
      freeOnlyMode: (FREE_PLAN_PROVIDERS as readonly string[]).includes(id),
      allowPaidModels: !(FREE_PLAN_PROVIDERS as readonly string[]).includes(id),
    });
    setStatus(
      id === "demo"
        ? "Sample answers selected (works offline)."
        : `Connected ${id}. Paste your API key below if needed, then Test connection.`
    );
  };

  const activateLicense = async () => {
    setLicenseBusy(true);
    setError(null);
    setStatus(null);
    try {
      const payload = await verifyLicenseKey(licenseDraft);
      await update({
        license: {
          tier: "pro",
          key: licenseDraft.trim().replace(/\s+/g, ""),
          payload,
          activatedAt: Date.now(),
          lastCheckedAt: Date.now(),
        },
        allowPaidModels: true,
        freeOnlyMode: false,
      });
      setStatus("SnapSolve Pro activated. All connected AI providers are unlocked.");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLicenseBusy(false);
    }
  };

  const deactivateLicense = async () => {
    await update({
      license: emptyLicense(),
      allowPaidModels: false,
      freeOnlyMode: true,
      routingMode: "free-only",
      defaultProvider: "openrouter",
      demoMode: false,
    });
    setLicenseDraft("");
    setStatus("Back on Free plan — default free LLM routing restored.");
  };

  if (!ready) {
    return <div className="p-6 ss-muted">Loading settings…</div>;
  }

  const pro = isPro(settings);
  const solvesLeft = freeSolvesRemaining(settings);

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
            ["providers", "Connect AI"],
            ["license", pro ? "Pro license" : "Free / Pro"],
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
          <section className="space-y-4">
            <header>
              <h1 className="font-display text-2xl font-semibold tracking-tight">Connect AI</h1>
              <p className="ss-muted mt-1 text-sm">
                Sign in at any provider below, create an API key, and paste it here. Default routing uses a{" "}
                <strong className="font-medium text-[var(--ss-fg)]">free LLM</strong> (OpenRouter). ChatGPT
                Plus / Claude Pro / Gemini app subscriptions are not API keys.
              </p>
              <p className="ss-muted mt-2 text-xs">
                Active default:{" "}
                <span className="font-medium text-[var(--ss-fg)]">
                  {settings.providers.find((p) => p.id === settings.defaultProvider)?.label ||
                    settings.defaultProvider}
                </span>
                {settings.freeOnlyMode || settings.routingMode === "free-only"
                  ? " · free-LLM mode on"
                  : ""}
                {pro ? " · Pro" : ` · Free · ${solvesLeft} solves left today`}
              </p>
            </header>
            <div className="flex flex-wrap gap-2">
              <button
                className="ss-btn-primary ss-btn text-xs"
                type="button"
                onClick={() => void connectProvider("openrouter")}
              >
                Use default free LLM
              </button>
              <button className="ss-btn text-xs" type="button" onClick={() => void exportConfig()}>
                Export config (no secrets)
              </button>
              <button className="ss-btn text-xs" type="button" onClick={() => void resetProviders()}>
                Reset providers
              </button>
            </div>

            {PROVIDER_GROUPS.map((group) => (
              <div key={group.title} className="space-y-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">{group.title}</h2>
                  <p className="ss-muted text-xs">{group.blurb}</p>
                </div>
                {group.ids.map((id) => {
                  const p = settings.providers.find((x) => x.id === id);
                  if (!p) return null;
                  const connected = providerConnected(p);
                  const isDefault = settings.defaultProvider === p.id;
                  const freeOk = (FREE_PLAN_PROVIDERS as readonly string[]).includes(p.id);
                  return (
                    <article key={p.id} className="ss-panel p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">
                            {p.label || p.id}
                            {isDefault ? (
                              <span className="ss-muted ml-2 text-xs font-normal">default</span>
                            ) : null}
                          </h3>
                          <p className="ss-muted text-xs">
                            {connected ? "Key / endpoint saved" : "Not connected"}
                            {" · "}
                            {p.enabled ? "enabled" : "disabled"}
                            {p.connectionStatus ? ` · ${p.connectionStatus}` : ""}
                            {p.lastLatencyMs != null ? ` · ${p.lastLatencyMs}ms` : ""}
                            {!freeOk && !pro ? " · Pro to solve" : ""}
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
                          {!["ollama", "lmstudio"].includes(p.id) && (
                            <label className="text-xs ss-muted md:col-span-2">
                              API key (sign in at the provider → create key → paste)
                              <input
                                className="ss-input mt-1"
                                type="password"
                                autoComplete="off"
                                placeholder="Stored only in this extension"
                                value={p.apiKey ?? ""}
                                onChange={(e) => void patchProvider(p.id, { apiKey: e.target.value })}
                              />
                            </label>
                          )}
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
                        </div>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          className="ss-btn-primary ss-btn text-xs"
                          type="button"
                          onClick={() => void connectProvider(p.id)}
                        >
                          {connected ? "Use this AI" : "Connect & use"}
                        </button>
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
                            Sign in / get key
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </section>
        )}

        {nav === "license" && (
          <section className="ss-panel space-y-4 p-4">
            <header>
              <h1 className="font-display text-2xl font-semibold tracking-tight">
                {pro ? "SnapSolve Pro" : "Free plan & Pro"}
              </h1>
              <p className="ss-muted mt-1 text-sm">
                Free includes free LLMs (OpenRouter, Groq, Hugging Face, Ollama) and sample answers. Pro unlocks
                every connected cloud AI, higher daily limits, verification, and custom endpoints.
              </p>
            </header>
            <div className="rounded-[6px] border border-[var(--ss-border)] p-3 text-sm">
              <p className="font-semibold">{pro ? "Pro active" : "Free plan"}</p>
              <p className="ss-muted mt-1 text-xs">
                {pro
                  ? settings.license.payload?.name
                    ? `Licensed to ${settings.license.payload.name}`
                    : "All AI providers unlocked for solving."
                  : `${solvesLeft} solves left today · default free LLM routing`}
              </p>
              <p className="mt-2 text-xs">
                {PRICING.product} · {PRICING.priceLabel}
                <span className="ss-muted"> — {PRICING.priceNote}</span>
              </p>
              <a
                className="ss-btn-primary ss-btn mt-3 inline-flex text-xs"
                href={purchaseUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get SnapSolve Pro
              </a>
            </div>
            <label className="block text-sm">
              License key
              <textarea
                className="ss-input mt-1 min-h-[88px] font-mono text-xs"
                placeholder="SS1.… paste your Pro key"
                value={licenseDraft}
                onChange={(e) => setLicenseDraft(e.target.value)}
                spellCheck={false}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                className="ss-btn-primary ss-btn text-xs"
                type="button"
                disabled={licenseBusy || !licenseDraft.trim()}
                onClick={() => void activateLicense()}
              >
                {licenseBusy ? "Checking…" : "Activate Pro"}
              </button>
              {pro && (
                <button className="ss-btn text-xs" type="button" onClick={() => void deactivateLicense()}>
                  Remove license
                </button>
              )}
            </div>
            <p className="ss-muted text-xs">
              Keys are verified with a public signature on your device. Client licenses are not DRM — see
              SECURITY.md.
            </p>
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
                disabled={!pro}
                onChange={(e) => void update({ verifyAnswers: e.target.checked })}
              />
              Multi-model verification {pro ? "(second provider)" : "(Pro)"}
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
                disabled={!pro}
                onChange={(e) => void update({ floatingToolbar: e.target.checked })}
              />
              Show a small toolbar on websites {pro ? "(off by default)" : "(Pro)"}
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
              Batch question limit {pro ? "(up to 50)" : "(Free max 2)"}
              <input
                className="ss-input mt-1"
                type="number"
                min={1}
                max={pro ? 50 : 2}
                value={settings.batchLimit}
                onChange={(e) =>
                  void update({
                    batchLimit: Math.min(Number(e.target.value) || 1, pro ? 50 : 2),
                  })
                }
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
              <li>Default free LLM: OpenRouter (`meta-llama/llama-3.2-3b-instruct:free`)</li>
              <li>Connect any AI under Settings → Connect AI</li>
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

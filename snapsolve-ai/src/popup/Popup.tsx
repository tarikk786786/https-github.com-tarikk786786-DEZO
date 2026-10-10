import { useEffect, useState } from "react";
import { BrandFooter } from "@/components/BrandFooter";
import { Logo } from "@/components/Logo";
import { ExternalConsentCard } from "@/components/ExternalConsentCard";
import { applyTheme, useSettings } from "@/hooks/useSettings";
import {
  analyzeVisiblePage,
  getSelectedTextFromPage,
  requestRegionCapture,
  runSolve,
} from "@/shared/solveClient";
import { BRAND } from "@/storage/defaults";
import { purchaseUrl } from "@/licensing/license";
import { freeSolvesRemaining, isPro } from "@/licensing/gate";
import {
  CONSENT_REQUIRED_MESSAGE,
  isConsentRequiredError,
  needsExternalConsent,
} from "@/privacy/consent";

export function Popup() {
  const { settings, ready, update } = useSettings();
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answerPreview, setAnswerPreview] = useState<string | null>(null);
  const [forceConsent, setForceConsent] = useState(false);

  useEffect(() => {
    if (ready) applyTheme(settings.theme);
  }, [ready, settings.theme]);

  useEffect(() => {
    if (settings.consentedExternalTransfer) setForceConsent(false);
  }, [settings.consentedExternalTransfer]);

  const openSidePanel = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.windowId != null) await chrome.sidePanel.open({ windowId: tab.windowId });
  };

  const pushToPanel = async (text: string, source: string, imageDataUrl?: string) => {
    await chrome.runtime.sendMessage({
      type: "SET_PENDING_QUESTION",
      text,
      source,
      imageDataUrl,
    });
    await openSidePanel();
    window.close();
  };

  const onCapture = async () => {
    setError(null);
    try {
      await requestRegionCapture();
      window.close();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const onAnalyze = async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await analyzeVisiblePage();
      if (result.limited && !result.text) throw new Error(result.reason || "This page can’t be read.");
      await pushToPanel(result.text, "visible-page");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const onPasteSelection = async () => {
    const text = await getSelectedTextFromPage();
    if (text) setQuestion(text);
    else {
      try {
        const clip = await navigator.clipboard.readText();
        if (clip) setQuestion(clip);
      } catch {
        setError("Select text on the page first, or paste it here.");
      }
    }
  };

  const onSolve = async (opts?: { afterConsent?: boolean }) => {
    if (!question.trim()) {
      setError("Add a question first.");
      return;
    }
    if (!opts?.afterConsent && needsExternalConsent(settings)) {
      setForceConsent(true);
      setError(CONSENT_REQUIRED_MESSAGE);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { response } = await runSolve({
        text: question,
        mode: settings.answerMode,
        source: "manual",
      });
      setAnswerPreview(response.answer);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (isConsentRequiredError(msg)) setForceConsent(true);
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  const provider = settings.providers.find((p) => p.id === settings.defaultProvider);
  const pro = ready && isPro(settings);
  const solvesLeft = ready ? freeSolvesRemaining(settings) : 0;
  const needsKey =
    ready &&
    !settings.demoMode &&
    provider &&
    !["demo", "ollama", "lmstudio"].includes(provider.id) &&
    !provider.apiKey;

  return (
    <div className="w-[360px] p-4">
      <header className="mb-4 flex items-start gap-2.5">
        <Logo />
        <div className="min-w-0 flex-1 pt-0.5">
          <h1 className="font-display text-[1.15rem] font-semibold leading-none tracking-tight">
            {BRAND.product}
          </h1>
          <p className="ss-muted mt-1 text-[11px] leading-snug">{BRAND.tagline}</p>
        </div>
        <button
          className="ss-btn px-2 py-1 text-xs"
          type="button"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          Settings
        </button>
      </header>

      {!pro && (
        <div className="ss-panel mb-3 flex items-center justify-between gap-2 p-2.5 text-xs">
          <span className="ss-muted">
            Free · {solvesLeft} left today · free LLM default
          </span>
          <a
            className="ss-brand-link shrink-0 font-medium"
            href={purchaseUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Pro
          </a>
        </div>
      )}

      {ready && (
        <ExternalConsentCard
          settings={settings}
          busy={busy}
          force={forceConsent}
          update={update}
          onAllowed={() => {
            setError(null);
            setForceConsent(false);
            if (question.trim()) void onSolve({ afterConsent: true });
          }}
        />
      )}

      {needsKey && (
        <p className="ss-note mb-3 text-xs">
          Add a free API key for {provider.label || provider.id} in Settings → Connect AI. Without a
          key, SnapSolve falls back to sample answers.
        </p>
      )}

      <label className="ss-label" htmlFor="q">
        Question
      </label>
      <textarea
        id="q"
        className="ss-input mb-3 min-h-[92px] resize-y"
        placeholder="Type or paste a question…"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="mb-3 grid grid-cols-2 gap-2">
        <button className="ss-btn-primary ss-btn" type="button" onClick={onCapture} disabled={busy}>
          Capture area
        </button>
        <button className="ss-btn" type="button" onClick={onAnalyze} disabled={busy}>
          Read this page
        </button>
        <button className="ss-btn" type="button" onClick={onPasteSelection} disabled={busy}>
          Use selection
        </button>
        <button className="ss-btn" type="button" onClick={() => void openSidePanel()}>
          Open workspace
        </button>
      </div>

      <div className="ss-panel mb-3 p-3">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
          <span className="ss-muted">Using</span>
          <span className="font-medium">
            {provider?.label || settings.defaultProvider}
            {settings.demoMode
              ? " (sample)"
              : settings.freeOnlyMode || settings.routingMode === "free-only"
                ? " (free LLM)"
                : ""}
          </span>
        </div>
        <div className="flex gap-2">
          <select
            className="ss-input"
            aria-label="Answer style"
            value={settings.answerMode}
            onChange={(e) => void update({ answerMode: e.target.value as typeof settings.answerMode })}
          >
            <option value="quick">Short answer</option>
            <option value="learn">Step by step</option>
            <option value="practice">Practice first</option>
            <option value="tutor">Tutor</option>
            <option value="coding">Code help</option>
            <option value="assessment-review">Review mode</option>
          </select>
          <button
            className="ss-btn-primary ss-btn shrink-0"
            type="button"
            onClick={() => void onSolve()}
            disabled={busy}
          >
            {busy ? "Working…" : "Solve"}
          </button>
        </div>
      </div>

      {error && (
        <p className="ss-alert mb-2" role="alert">
          {error}
        </p>
      )}

      {answerPreview && (
        <div className="ss-panel mb-3 p-3 text-sm">
          <p className="ss-label mb-1">Answer</p>
          <p className="leading-relaxed">{answerPreview}</p>
          <button className="ss-btn mt-2 text-xs" type="button" onClick={() => void openSidePanel()}>
            Continue in workspace
          </button>
        </div>
      )}

      <BrandFooter className="pt-1" />
    </div>
  );
}

import { useEffect, useState } from "react";
import { BrandFooter } from "@/components/BrandFooter";
import { Logo } from "@/components/Logo";
import { applyTheme, useSettings } from "@/hooks/useSettings";
import {
  analyzeVisiblePage,
  getSelectedTextFromPage,
  requestRegionCapture,
  runSolve,
} from "@/shared/solveClient";
import { BRAND } from "@/storage/defaults";

export function Popup() {
  const { settings, ready, update } = useSettings();
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answerPreview, setAnswerPreview] = useState<string | null>(null);

  useEffect(() => {
    if (ready) applyTheme(settings.theme);
  }, [ready, settings.theme]);

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
      if (result.limited && !result.text) throw new Error(result.reason || "Page limited");
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
        setError("No selection found. Highlight text on the page or paste manually.");
      }
    }
  };

  const onSolve = async () => {
    if (!question.trim()) {
      setError("Enter or capture a question first.");
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
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const provider = settings.providers.find((p) => p.id === settings.defaultProvider);

  return (
    <div className="w-[360px] p-4 animate-fade-up">
      <header className="mb-3 flex items-center gap-2">
        <Logo />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-base font-semibold tracking-tight">
            {BRAND.product}
          </h1>
          <p className="ss-muted text-xs">Your study companion</p>
        </div>
        <button
          className="ss-btn px-2 py-1 text-xs"
          type="button"
          onClick={() => chrome.runtime.openOptionsPage()}
          aria-label="Open settings"
        >
          Settings
        </button>
      </header>

      <label className="ss-muted mb-1 block text-xs font-medium" htmlFor="q">
        What would you like to solve?
      </label>
      <textarea
        id="q"
        className="ss-input mb-3 min-h-[88px] resize-y"
        placeholder="Type, paste, or capture a question…"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="mb-3 grid grid-cols-2 gap-2">
        <button className="ss-btn-primary ss-btn" type="button" onClick={onCapture} disabled={busy}>
          Capture question
        </button>
        <button className="ss-btn" type="button" onClick={onAnalyze} disabled={busy}>
          Analyze visible page
        </button>
        <button className="ss-btn" type="button" onClick={onPasteSelection} disabled={busy}>
          Paste / selection
        </button>
        <button className="ss-btn" type="button" onClick={() => void openSidePanel()}>
          Open workspace
        </button>
      </div>

      <div className="ss-glass mb-3 rounded-2xl p-3">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
          <span className="ss-muted">Provider</span>
          <span className="font-medium">
            {provider?.label || settings.defaultProvider}
            {settings.demoMode ? " · Demo" : ""}
          </span>
        </div>
        <div className="flex gap-2">
          <select
            className="ss-input"
            aria-label="Answer mode"
            value={settings.answerMode}
            onChange={(e) => void update({ answerMode: e.target.value as typeof settings.answerMode })}
          >
            <option value="quick">Quick Answer</option>
            <option value="learn">Learn Mode</option>
            <option value="practice">Practice</option>
            <option value="tutor">Tutor</option>
            <option value="coding">Coding</option>
            <option value="assessment-review">Assessment Review</option>
          </select>
          <button className="ss-btn-primary ss-btn shrink-0" type="button" onClick={onSolve} disabled={busy}>
            {busy ? "Solving…" : "Solve"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-2 rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200" role="alert">
          {error}
        </p>
      )}

      {answerPreview && (
        <div className="ss-glass mb-3 rounded-2xl p-3 text-sm">
          <p className="ss-muted mb-1 text-[11px] uppercase tracking-wide">Answer</p>
          <p>{answerPreview}</p>
          <button className="ss-btn mt-2 text-xs" type="button" onClick={() => void openSidePanel()}>
            Open full workspace
          </button>
        </div>
      )}

      <p className="ss-muted mb-2 text-[11px]">
        Capture runs only when you start it. Floating toolbar is off by default and uses Shadow DOM when enabled.
      </p>
      <BrandFooter />
    </div>
  );
}

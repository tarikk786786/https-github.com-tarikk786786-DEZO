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

  const onSolve = async () => {
    if (!question.trim()) {
      setError("Add a question first.");
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
            {settings.demoMode ? " (sample mode)" : ""}
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
          <button className="ss-btn-primary ss-btn shrink-0" type="button" onClick={onSolve} disabled={busy}>
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

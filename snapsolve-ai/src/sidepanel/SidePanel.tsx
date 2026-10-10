import { useCallback, useEffect, useRef, useState } from "react";
import { BrandFooter } from "@/components/BrandFooter";
import { Logo } from "@/components/Logo";
import { applyTheme, useSettings } from "@/hooks/useSettings";
import { parseQuestion, parseQuestions } from "@/capture/question-parser";
import { extractPdfText } from "@/capture/pdf";
import { recognizeImage } from "@/ocr/ocr";
import {
  analyzeVisiblePage,
  loadPendingIntoEditor,
  requestRegionCapture,
  runSolve,
} from "@/shared/solveClient";
import { clearHistory, getHistory } from "@/storage/settings";
import { BRAND } from "@/storage/defaults";
import type {
  CaptureMethod,
  HistoryItem,
  ParsedQuestion,
  SolveResponse,
  VerificationResult,
} from "@/shared/types";

type TabId = "solve" | "history" | "about";

export function SidePanel() {
  const { settings, ready, update } = useSettings();
  const [tab, setTab] = useState<TabId>("solve");
  const [text, setText] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const [source, setSource] = useState<CaptureMethod>("manual");
  const [parsed, setParsed] = useState<ParsedQuestion | null>(null);
  const [response, setResponse] = useState<SolveResponse | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [followUp, setFollowUp] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const solvingRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ready) applyTheme(settings.theme);
  }, [ready, settings.theme]);

  const refreshHistory = useCallback(async () => {
    setHistory(await getHistory());
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        setProgress("Loading capture…");
        const pending = await loadPendingIntoEditor();
        if (pending.text || pending.imageDataUrl) {
          setText(pending.text);
          setImageDataUrl(pending.imageDataUrl);
          setSource(pending.source);
          if (pending.text) setParsed(parseQuestion(pending.text));
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setProgress(null);
      }
      await refreshHistory();
    })();
  }, [refreshHistory]);

  useEffect(() => {
    if (text.trim()) setParsed(parseQuestion(text));
    else setParsed(null);
  }, [text]);

  const onSolve = async (follow?: string) => {
    if (solvingRef.current) return;
    if (!text.trim() && !imageDataUrl) {
      setError("Add a question via capture, upload, or typing.");
      return;
    }
    solvingRef.current = true;
    setBusy(true);
    setError(null);
    setProgress("Contacting configured provider…");
    try {
      let solveText = text;
      if (!solveText && imageDataUrl) {
        setProgress("Running OCR…");
        const ocr = await recognizeImage(imageDataUrl, settings.ocrLanguage);
        solveText = ocr.text;
        setText(solveText);
        if (ocr.warnings.length) setError(ocr.warnings.join(" "));
      }
      const result = await runSolve({
        text: solveText,
        mode: settings.answerMode,
        imageDataUrl,
        source,
        followUp: follow,
      });
      setParsed(result.question);
      setResponse(result.response);
      setVerification(result.verification ?? null);
      await refreshHistory();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      solvingRef.current = false;
      setBusy(false);
      setProgress(null);
    }
  };

  const onUpload = async (file: File) => {
    setError(null);
    setBusy(true);
    try {
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        setProgress("Extracting PDF text…");
        const pdf = await extractPdfText(file, settings.batchLimit);
        setText(pdf.text);
        setSource("pdf");
        setImageDataUrl(undefined);
        if (pdf.warnings.length) setError(pdf.warnings.join(" "));
      } else {
        setProgress("Running OCR…");
        const dataUrl = await fileToDataUrl(file);
        const ocr = await recognizeImage(file, settings.ocrLanguage);
        setImageDataUrl(dataUrl);
        setText(ocr.text);
        setSource("image");
        if (ocr.warnings.length) setError(ocr.warnings.join(" "));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const onBatchSolve = async () => {
    const questions = parseQuestions(text);
    if (questions.length > 1 && settings.confirmBatchSolve) {
      const ok = window.confirm(`Solve ${questions.length} detected questions?`);
      if (!ok) return;
    }
    await onSolve();
  };

  const copyAnswer = async () => {
    if (!response) return;
    const blob = [
      `Question: ${parsed?.questionText ?? text}`,
      `Answer: ${response.answer}`,
      `Explanation: ${response.explanation}`,
      settings.exportIncludeBranding ? `\n— ${BRAND.attribution} (${BRAND.website})` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
    await navigator.clipboard.writeText(blob);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-3 p-4">
      <header className="flex items-start gap-3">
        <Logo size={36} />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-lg font-semibold">{BRAND.product}</h1>
          <p className="ss-muted text-xs">Solution workspace · learning-focused study aid</p>
        </div>
        <button className="ss-btn text-xs" type="button" onClick={() => chrome.runtime.openOptionsPage()}>
          Settings
        </button>
      </header>

      <nav className="flex gap-1" aria-label="Workspace sections">
        {([
          ["solve", "Solve"],
          ["history", "History"],
          ["about", "About"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`ss-btn text-xs ${tab === id ? "ss-btn-primary" : ""}`}
            aria-current={tab === id}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "solve" && (
        <>
          <div className="flex flex-wrap gap-2">
            <button className="ss-btn text-xs" type="button" disabled={busy} onClick={() => void requestRegionCapture()}>
              Capture region
            </button>
            <button
              className="ss-btn text-xs"
              type="button"
              disabled={busy}
              onClick={() =>
                void analyzeVisiblePage().then((r) => {
                  if (r.text) {
                    setText(r.text);
                    setSource("visible-page");
                  }
                  if (r.reason) setError(r.reason);
                })
              }
            >
              Analyze page
            </button>
            <button className="ss-btn text-xs" type="button" disabled={busy} onClick={() => fileRef.current?.click()}>
              Upload image/PDF
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void onUpload(f);
              }}
            />
          </div>

          <section className="ss-glass rounded-2xl p-3">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide ss-muted">Recognized question</h2>
              {parsed && (
                <span className="text-[11px] ss-muted">
                  {parsed.type} · parse {(parsed.confidence * 100).toFixed(0)}%
                </span>
              )}
            </div>
            <textarea
              className="ss-input min-h-[140px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Editable question text appears here after capture or OCR…"
              aria-label="Editable question text"
            />
            {imageDataUrl && (
              <img
                src={imageDataUrl}
                alt="Captured question region"
                className="mt-2 max-h-40 rounded-xl border border-[var(--ss-border)] object-contain"
              />
            )}
            {parsed?.options && parsed.options.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm">
                {parsed.options.map((o) => (
                  <li key={o.label}>
                    <strong>{o.label}.</strong> {o.text}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="flex flex-wrap items-center gap-2">
            <select
              className="ss-input max-w-[180px]"
              aria-label="Answer mode"
              value={settings.answerMode}
              onChange={(e) => void update({ answerMode: e.target.value as typeof settings.answerMode })}
            >
              <option value="quick">Quick Answer</option>
              <option value="learn">Learn Mode</option>
              <option value="practice">Practice</option>
              <option value="tutor">Tutor</option>
              <option value="revision">Revision</option>
              <option value="research">Research</option>
              <option value="coding">Coding</option>
              <option value="assessment-review">Assessment Review</option>
            </select>
            <select
              className="ss-input max-w-[160px]"
              aria-label="Default provider"
              value={settings.defaultProvider}
              onChange={(e) =>
                void update({
                  defaultProvider: e.target.value as typeof settings.defaultProvider,
                  demoMode: e.target.value === "demo",
                })
              }
            >
              {settings.providers
                .filter((p) => p.enabled)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label || p.id}
                  </option>
                ))}
            </select>
            <button className="ss-btn-primary ss-btn" type="button" disabled={busy} onClick={() => void onBatchSolve()}>
              {busy ? "Working…" : "Solve"}
            </button>
            <button
              className="ss-btn text-xs"
              type="button"
              disabled={busy}
              onClick={() => void update({ verifyAnswers: !settings.verifyAnswers })}
            >
              Verify: {settings.verifyAnswers ? "On" : "Off"}
            </button>
          </div>

          {progress && <p className="ss-muted animate-pulse-soft text-xs">{progress}</p>}
          {error && (
            <p className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200" role="alert">
              {error}
            </p>
          )}

          {response && (
            <section className="ss-glass animate-fade-up rounded-2xl p-4">
              <p className="ss-muted mb-1 text-[11px] uppercase tracking-wide">Answer</p>
              <p className="font-display text-xl font-semibold">{response.answer}</p>
              <p className="mt-3 text-sm leading-relaxed">{response.explanation}</p>
              {response.steps && response.steps.length > 0 && (
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
                  {response.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              )}
              {response.incorrectOptions && (
                <div className="mt-3 text-sm">
                  <p className="ss-muted text-xs uppercase">Why other options are weaker</p>
                  <ul className="mt-1 space-y-1">
                    {Object.entries(response.incorrectOptions).map(([k, v]) => (
                      <li key={k}>
                        <strong>{k}:</strong> {v}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="ss-muted mt-3 text-[11px]">
                {response.isDemo ? "Demo mode · " : ""}
                {response.provider}/{response.model} · {response.latencyMs}ms
                {response.confidence != null ? ` · model confidence ${(response.confidence * 100).toFixed(0)}%` : ""}
              </p>
              {response.warnings?.map((w) => (
                <p key={w} className="mt-1 text-[11px] text-amber-200">
                  {w}
                </p>
              ))}
              {verification && (
                <div className="mt-3 rounded-xl border border-[var(--ss-border)] p-3 text-sm">
                  <p className="font-semibold">Verification · {verification.agreement}</p>
                  <p className="mt-1">{verification.assessment}</p>
                  <p className="ss-muted mt-2 text-xs">
                    Secondary: {verification.secondary.provider}/{verification.secondary.model} —{" "}
                    {verification.secondary.answer}
                  </p>
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="ss-btn text-xs" type="button" onClick={() => void copyAnswer()}>
                  Copy
                </button>
                <button className="ss-btn text-xs" type="button" disabled={busy} onClick={() => void onSolve()}>
                  Regenerate
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  className="ss-input"
                  placeholder="Ask a follow-up…"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  aria-label="Follow-up question"
                />
                <button
                  className="ss-btn text-xs"
                  type="button"
                  disabled={busy || !followUp.trim()}
                  onClick={() => {
                    const q = followUp;
                    setFollowUp("");
                    void onSolve(q);
                  }}
                >
                  Send
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {tab === "history" && (
        <section className="ss-glass rounded-2xl p-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">History</h2>
            <button
              className="ss-btn text-xs"
              type="button"
              onClick={() => void clearHistory().then(refreshHistory)}
            >
              Clear all
            </button>
          </div>
          {history.length === 0 && <p className="ss-muted text-sm">No saved questions yet.</p>}
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  className="w-full rounded-xl border border-[var(--ss-border)] p-2 text-left text-sm hover:bg-white/5"
                  onClick={() => {
                    setText(h.question.rawText);
                    setResponse(h.response ?? null);
                    setVerification(h.verification ?? null);
                    setTab("solve");
                  }}
                >
                  <p className="line-clamp-2">{h.question.questionText}</p>
                  <p className="ss-muted mt-1 text-[11px]">
                    {new Date(h.createdAt).toLocaleString()} · {h.response?.answer ?? "No answer"}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === "about" && (
        <section className="ss-glass rounded-2xl p-4 text-sm leading-relaxed">
          <h2 className="font-display text-lg font-semibold">{BRAND.product}</h2>
          <p className="mt-2">
            Created by {BRAND.creator}. Official site:{" "}
            <a className="ss-brand-link" href={BRAND.website} target="_blank" rel="noopener noreferrer">
              {BRAND.website}
            </a>
          </p>
          <p className="mt-3 ss-muted">
            SnapSolve is a learning aid. It does not automate graded exam submission, bypass
            proctoring, or continuously capture your screen. Floating page toolbar is optional and
            isolated in Shadow DOM.
          </p>
        </section>
      )}

      <div className="mt-auto pt-2">
        <BrandFooter />
      </div>
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

import { useCallback, useEffect, useRef, useState } from "react";
import { BrandFooter } from "@/components/BrandFooter";
import { Logo } from "@/components/Logo";
import { ExternalConsentCard } from "@/components/ExternalConsentCard";
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
import { purchaseUrl } from "@/licensing/license";
import { clampBatchLimit, freeSolvesRemaining, isPro } from "@/licensing/gate";
import {
  CONSENT_REQUIRED_MESSAGE,
  isConsentRequiredError,
  needsExternalConsent,
} from "@/privacy/consent";
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
  const [forceConsent, setForceConsent] = useState(false);
  const solvingRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ready) applyTheme(settings.theme);
  }, [ready, settings.theme]);

  useEffect(() => {
    if (settings.consentedExternalTransfer) setForceConsent(false);
  }, [settings.consentedExternalTransfer]);

  const refreshHistory = useCallback(async () => {
    setHistory(await getHistory());
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        setProgress("Checking for a pending capture…");
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

  const onSolve = async (follow?: string, opts?: { afterConsent?: boolean }) => {
    if (solvingRef.current) return;
    if (!text.trim() && !imageDataUrl) {
      setError("Add a question first — type it, capture it, or upload a file.");
      return;
    }
    if (!opts?.afterConsent && needsExternalConsent(settings)) {
      setForceConsent(true);
      setError(CONSENT_REQUIRED_MESSAGE);
      return;
    }
    solvingRef.current = true;
    setBusy(true);
    setError(null);
    setProgress("Sending to your configured model…");
    try {
      let solveText = text;
      if (!solveText && imageDataUrl) {
        setProgress("Reading text from the image…");
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
      const msg = e instanceof Error ? e.message : String(e);
      if (isConsentRequiredError(msg)) setForceConsent(true);
      setError(msg);
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
        setProgress("Extracting text from the PDF…");
        const pdf = await extractPdfText(file, clampBatchLimit(settings, settings.batchLimit));
        setText(pdf.text);
        setSource("pdf");
        setImageDataUrl(undefined);
        if (pdf.warnings.length) setError(pdf.warnings.join(" "));
      } else {
        setProgress("Reading text from the image…");
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
      const ok = window.confirm(`Solve all ${questions.length} questions found in this text?`);
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
        <Logo size={34} />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-xl font-semibold tracking-tight">{BRAND.product}</h1>
          <p className="ss-muted text-xs">Workspace</p>
        </div>
        <button className="ss-btn text-xs" type="button" onClick={() => chrome.runtime.openOptionsPage()}>
          Settings
        </button>
      </header>

      {ready && !isPro(settings) && (
        <div className="ss-panel flex items-center justify-between gap-2 p-2.5 text-xs">
          <span className="ss-muted">
            Free · {freeSolvesRemaining(settings)} solves left · default free LLM
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
            if (text.trim() || imageDataUrl) {
              void onSolve(undefined, { afterConsent: true });
            }
          }}
        />
      )}

      <nav className="flex flex-wrap gap-1.5" aria-label="Sections">
        {([
          ["solve", "Solve"],
          ["history", "History"],
          ["about", "About"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`ss-btn ss-nav-btn text-xs ${tab === id ? "ss-btn-primary" : ""}`}
            aria-current={tab === id ? "page" : undefined}
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
              Capture area
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
              Read page
            </button>
            <button className="ss-btn text-xs" type="button" disabled={busy} onClick={() => fileRef.current?.click()}>
              Upload file
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

          <section className="ss-panel p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="ss-label mb-0">Question</h2>
              {parsed && (
                <span className="ss-muted text-[11px]">
                  {parsed.type.replace(/-/g, " ")}
                  {parsed.confidence >= 0.5 ? "" : " · check the text"}
                </span>
              )}
            </div>
            <textarea
              className="ss-input min-h-[140px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Edit the question here before solving…"
              aria-label="Question text"
            />
            {imageDataUrl && (
              <img
                src={imageDataUrl}
                alt="Captured region"
                className="mt-2 max-h-40 rounded-[6px] border border-[var(--ss-border)] object-contain"
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
              className="ss-input max-w-[170px]"
              aria-label="Answer style"
              value={settings.answerMode}
              onChange={(e) => void update({ answerMode: e.target.value as typeof settings.answerMode })}
            >
              <option value="quick">Short answer</option>
              <option value="learn">Step by step</option>
              <option value="practice">Practice first</option>
              <option value="tutor">Tutor</option>
              <option value="revision">Revision notes</option>
              <option value="research">Research</option>
              <option value="coding">Code help</option>
              <option value="assessment-review">Review mode</option>
            </select>
            <select
              className="ss-input max-w-[160px]"
              aria-label="Provider"
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
            <button
              className="ss-btn-primary ss-btn"
              type="button"
              disabled={busy}
              data-action="solve"
              onClick={() => void onBatchSolve()}
            >
              {busy ? "Working…" : "Solve"}
            </button>
            <button
              className="ss-btn text-xs"
              type="button"
              disabled={busy || !isPro(settings)}
              title={isPro(settings) ? "Run a second model check" : "Pro feature"}
              onClick={() => void update({ verifyAnswers: !settings.verifyAnswers })}
            >
              Second check: {!isPro(settings) ? "Pro" : settings.verifyAnswers ? "On" : "Off"}
            </button>
          </div>

          {progress && <p className="ss-muted text-xs">{progress}</p>}
          {error && (
            <p className="ss-alert" role="alert">
              {error}
            </p>
          )}

          {response && (
            <section className="ss-panel p-4">
              <p className="ss-label">Answer</p>
              <p className="font-display text-xl font-semibold leading-snug">{response.answer}</p>
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
                  <p className="ss-label">Other options</p>
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
                {response.provider}/{response.model}
                {response.latencyMs ? ` · ${response.latencyMs} ms` : ""}
              </p>
              {response.warnings?.map((w) => (
                <p key={w} className="ss-note mt-2">
                  {w}
                </p>
              ))}
              {verification && (
                <div className="mt-3 rounded-[6px] border border-[var(--ss-border)] p-3 text-sm">
                  <p className="font-semibold">Second opinion · {verification.agreement}</p>
                  <p className="mt-1">{verification.assessment}</p>
                  <p className="ss-muted mt-2 text-xs">
                    {verification.secondary.provider}/{verification.secondary.model}:{" "}
                    {verification.secondary.answer}
                  </p>
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="ss-btn text-xs" type="button" onClick={() => void copyAnswer()}>
                  Copy
                </button>
                <button className="ss-btn text-xs" type="button" disabled={busy} onClick={() => void onSolve()}>
                  Try again
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  className="ss-input"
                  placeholder="Ask a follow-up…"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  aria-label="Follow-up"
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
                  Ask
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {tab === "history" && (
        <section className="ss-panel p-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">History</h2>
            <button
              className="ss-btn text-xs"
              type="button"
              onClick={() => void clearHistory().then(refreshHistory)}
            >
              Clear all
            </button>
          </div>
          {history.length === 0 && <p className="ss-muted text-sm">Nothing saved yet.</p>}
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  className="w-full rounded-[6px] border border-[var(--ss-border)] p-2 text-left text-sm hover:bg-[var(--ss-accent-soft)]"
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
        <section className="ss-panel space-y-3 p-4 text-sm leading-relaxed">
          <h2 className="font-display text-lg font-semibold">{BRAND.product}</h2>
          <p>
            Built by {BRAND.creator}.{" "}
            <a className="ss-brand-link" href={BRAND.website} target="_blank" rel="noopener noreferrer">
              {BRAND.website.replace("https://", "")}
            </a>
          </p>
          <p className="ss-muted">
            Use it for homework review, practice papers, and studying. It won’t submit answers for you,
            and it doesn’t watch your screen in the background.
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
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

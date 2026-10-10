import type { Settings } from "@/shared/types";
import { consentPatch, needsExternalConsent } from "@/privacy/consent";

type Props = {
  settings: Settings;
  busy?: boolean;
  /** Called after consent is saved (e.g. retry solve). */
  onAllowed?: () => void;
  update: (patch: Partial<Settings>) => Promise<unknown>;
  /** Force show even if helpers think consent isn't needed (e.g. after a consent error). */
  force?: boolean;
};

export function ExternalConsentCard({
  settings,
  busy,
  onAllowed,
  update,
  force,
}: Props) {
  const show = force || needsExternalConsent(settings);
  if (!show) return null;

  const provider =
    settings.providers.find((p) => p.id === settings.defaultProvider)?.label ||
    settings.defaultProvider;

  return (
    <div className="ss-panel mb-3 space-y-2 p-3" role="region" aria-label="External AI consent">
      <p className="text-sm font-medium leading-snug">Allow external AI?</p>
      <p className="ss-muted text-xs leading-relaxed">
        SnapSolve will send the question you submit to{" "}
        <span className="font-medium text-[var(--ss-fg)]">{provider}</span> (or your routed free LLM).
        Keys stay in this extension. Nothing is sent until you solve.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          className="ss-btn-primary ss-btn text-xs"
          type="button"
          disabled={busy}
          onClick={() => {
            void update(consentPatch()).then(() => onAllowed?.());
          }}
        >
          Allow & continue
        </button>
        <button
          className="ss-btn text-xs"
          type="button"
          disabled={busy}
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          Privacy settings
        </button>
      </div>
    </div>
  );
}

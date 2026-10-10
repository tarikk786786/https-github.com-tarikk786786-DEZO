import { BRAND } from "@/storage/defaults";

export function BrandFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`ss-muted flex items-center justify-center gap-1 text-[11px] ${className}`}
      aria-label="Product attribution"
    >
      <span>{BRAND.attribution}</span>
      <span aria-hidden>·</span>
      <a
        className="ss-brand-link"
        href={BRAND.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Made by TarikIslam.in — open tarikislam.in"
      >
        tarikislam.in
      </a>
    </footer>
  );
}

import { BRAND } from "@/storage/defaults";

export function BrandFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`ss-muted flex items-center justify-center gap-1.5 text-[11px] ${className}`}
      aria-label="Product attribution"
    >
      <span>{BRAND.attribution}</span>
      <span aria-hidden>·</span>
      <a
        className="ss-brand-link"
        href={BRAND.website}
        target="_blank"
        rel="noopener noreferrer"
      >
        {BRAND.website.replace("https://", "")}
      </a>
    </footer>
  );
}

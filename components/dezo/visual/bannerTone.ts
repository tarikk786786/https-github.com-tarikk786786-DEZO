import type { BannerTone } from '@/content/banners';

export function bannerToneClasses(tone: BannerTone = 'paper'): {
  section: string;
  title: string;
  body: string;
  meta: string;
  rule: string;
} {
  switch (tone) {
    case 'ink':
      return {
        section: 'bg-dezo-ink text-dezo-text-inverse',
        title: 'text-white',
        body: 'text-white/60',
        meta: 'text-white/40',
        rule: 'border-white/15',
      };
    case 'warm':
      return {
        section: 'bg-dezo-bg-warm text-dezo-text-primary',
        title: 'text-dezo-text-primary',
        body: 'text-dezo-text-secondary',
        meta: 'text-dezo-text-muted',
        rule: 'border-dezo-border',
      };
    case 'surface':
      return {
        section: 'bg-dezo-surface text-dezo-text-primary',
        title: 'text-dezo-text-primary',
        body: 'text-dezo-text-secondary',
        meta: 'text-dezo-text-muted',
        rule: 'border-dezo-border',
      };
    default:
      return {
        section: 'bg-dezo-bg text-dezo-text-primary',
        title: 'text-dezo-text-primary',
        body: 'text-dezo-text-secondary',
        meta: 'text-dezo-text-muted',
        rule: 'border-dezo-border',
      };
  }
}

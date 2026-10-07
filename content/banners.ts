/**
 * DEZO Banner data model — presentation components consume this, not hard-coded copy/media.
 * Media must appear in docs/media-license-ledger.md before production use.
 */

export type BannerTone = 'paper' | 'warm' | 'ink' | 'surface';

export type BannerMedia =
  | { kind: 'none' }
  | { kind: 'work-preview'; host: string; objectPosition?: string }
  | { kind: 'image'; src: string; alt: string; objectPosition?: string }
  | { kind: 'video'; src: string; poster: string; alt: string };

export interface CtaLink {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | 'ghost';
}

export interface BannerBase {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: BannerTone;
  media?: BannerMedia;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  meta?: string;
  numeral?: string;
}

export interface ChapterBannerData extends BannerBase {
  chapter: 'build' | 'grow' | 'sell' | 'advertise' | 'brand';
  href: string;
}

export const heroBanner: BannerBase = {
  id: 'hero-home',
  eyebrow: 'Digital growth company',
  title: 'BUILD. MARKET. GROW.',
  body: 'Websites, ecommerce, marketplaces, advertising, SEO, social and brand systems—built to work together.',
  tone: 'warm',
  media: {
    kind: 'work-preview',
    host: 'yasanabeautyrituals.in',
    objectPosition: 'top',
  },
  primaryCta: { label: 'Start a Project', href: '/start-a-project', variant: 'primary' },
  secondaryCta: { label: 'View Our Work', href: '/work', variant: 'outline' },
  meta: 'Based in India. Built for businesses everywhere.',
};

export const chapterBanners: ChapterBannerData[] = [
  {
    id: 'chapter-build',
    chapter: 'build',
    numeral: '01',
    eyebrow: 'Build',
    title: 'Websites & commerce systems that convert.',
    body: 'Next.js, Shopify, WordPress and custom applications engineered for speed and clarity.',
    href: '/services/web-development',
    tone: 'paper',
    media: { kind: 'work-preview', host: 'sonvicasarees.com', objectPosition: 'top' },
  },
  {
    id: 'chapter-grow',
    chapter: 'grow',
    numeral: '02',
    eyebrow: 'Grow',
    title: 'Organic discovery as a system.',
    body: 'Technical SEO, content architecture and local visibility—without ranking promises we cannot control.',
    href: '/services/seo',
    tone: 'surface',
    media: { kind: 'work-preview', host: 'shreeayurved.com', objectPosition: 'top' },
  },
  {
    id: 'chapter-sell',
    chapter: 'sell',
    numeral: '03',
    eyebrow: 'Sell',
    title: 'Amazon & Flipkart, operated properly.',
    body: 'Listings, catalog health, creative and advertising with transparent reporting.',
    href: '/services/amazon',
    tone: 'warm',
    media: { kind: 'work-preview', host: 'nilkanthpaints.com', objectPosition: 'top' },
  },
  {
    id: 'chapter-advertise',
    chapter: 'advertise',
    numeral: '04',
    eyebrow: 'Advertise',
    title: 'Meta & Google with measurement first.',
    body: 'Tracking, creative testing and optimization—strategy before spend.',
    href: '/services/paid-ads',
    tone: 'paper',
    media: { kind: 'work-preview', host: 'thepaanluxe.com', objectPosition: 'top' },
  },
  {
    id: 'chapter-brand',
    chapter: 'brand',
    numeral: '05',
    eyebrow: 'Brand',
    title: 'Identity that sells as well as it looks.',
    body: 'Positioning, visual systems, packaging and campaign creative.',
    href: '/services/branding',
    tone: 'ink',
    media: { kind: 'work-preview', host: 'greatindiapublicschool.org', objectPosition: 'top' },
  },
];

export const statementBanners: BannerBase[] = [
  {
    id: 'statement-one-partner',
    title: 'ONE PARTNER. EVERY DIGITAL TOUCHPOINT.',
    body: 'Your website, search, advertising, social and marketplace operations should not work in isolation.',
    tone: 'paper',
  },
  {
    id: 'statement-evidence',
    title: 'Evidence over decoration.',
    body: 'Real live sites. Challenge → what we did → result. No invented averages.',
    tone: 'warm',
    primaryCta: { label: 'Selected work', href: '/work', variant: 'outline' },
  },
  {
    id: 'statement-standard',
    eyebrow: 'The DEZO Standard',
    title: 'We guarantee what we control.',
    body: 'Defined scope, QA, transparent reporting and accountability—not rankings, ROAS or virality.',
    tone: 'ink',
    primaryCta: { label: 'Read the promise system', href: '/promise', variant: 'outline' },
  },
];

export const marketplaceBanner: BannerBase = {
  id: 'banner-marketplace',
  eyebrow: 'Marketplace growth',
  title: 'Amazon & Flipkart',
  body: 'Listings, creative, advertising and operations—honest about platform rules and market conditions.',
  tone: 'paper',
  primaryCta: { label: 'Amazon growth', href: '/services/amazon', variant: 'outline' },
  secondaryCta: { label: 'Flipkart growth', href: '/services/flipkart', variant: 'outline' },
};

export const performanceBanner: BannerBase = {
  id: 'banner-performance',
  eyebrow: 'Performance marketing',
  title: 'Google & Meta',
  body: 'Measurable acquisition systems. Outcomes remain subject to auctions, competition and creative.',
  tone: 'surface',
  primaryCta: { label: 'Performance marketing', href: '/services/paid-ads', variant: 'outline' },
};

export const seoBanner: BannerBase = {
  id: 'banner-seo',
  eyebrow: 'Organic growth',
  title: 'SEO as a system',
  body: 'Technical → Structure → Content → Authority → Local → Measurement → Optimization',
  tone: 'paper',
  primaryCta: { label: 'SEO & organic', href: '/services/seo', variant: 'outline' },
};

export const brandBanner: BannerBase = {
  id: 'banner-brand',
  eyebrow: 'Brand & social',
  title: 'Brand systems that sell',
  body: 'Strategy, identity, creative, social, content and campaign assets.',
  tone: 'warm',
  primaryCta: { label: 'Brand & creative', href: '/services/branding', variant: 'outline' },
};

export const labBanner: BannerBase = {
  id: 'banner-lab',
  eyebrow: 'DEZO LAB',
  title: 'Analyst toolkit',
  body: 'Practical tools for understanding your digital business—scores and opportunities, not spectacle.',
  tone: 'paper',
  primaryCta: { label: 'Open DEZO LAB', href: '/growth-lab', variant: 'primary' },
};

export const locationBanners = {
  bhubaneswar: {
    id: 'banner-bhubaneswar',
    eyebrow: 'Studio · Patia, Bhubaneswar',
    title: 'Digital infrastructure from Bhubaneswar.',
    body: 'Web, ecommerce, marketplaces and performance programs for businesses across the capital region—and India.',
    tone: 'warm' as BannerTone,
    primaryCta: { label: 'Start a Project', href: '/start-a-project', variant: 'primary' as const },
    secondaryCta: { label: 'Odisha hub', href: '/locations/odisha', variant: 'outline' as const },
    meta: 'Phase 2, Patia · 751024',
  },
  odisha: {
    id: 'banner-odisha',
    eyebrow: 'Built in Odisha · Built for India',
    title: 'Growth systems for Odisha businesses with national ambition.',
    body: 'Local commercial context. Engineering standards. Marketplace and performance capability that scales beyond the state.',
    tone: 'paper' as BannerTone,
    primaryCta: { label: 'Talk to DEZO', href: '/contact', variant: 'primary' as const },
    secondaryCta: {
      label: 'Bhubaneswar studio',
      href: '/locations/bhubaneswar',
      variant: 'outline' as const,
    },
  },
} satisfies Record<string, BannerBase>;

export const finalCtaBanner: BannerBase = {
  id: 'banner-final-cta',
  title: 'Have a business to build or grow?',
  body: "Tell us what you're building, what isn't working and where you want to go next.",
  tone: 'paper',
  primaryCta: { label: 'Start a Project', href: '/start-a-project', variant: 'primary' },
  secondaryCta: { label: 'Request a Growth Audit', href: '/growth-lab', variant: 'outline' },
};

export const ogTemplates = {
  default: {
    title: 'DEZO | BUILD. MARKET. GROW.',
    description:
      'Digital infrastructure for ambitious businesses — websites, marketplaces, advertising, SEO and brand.',
    image: '/dezo-logo-transparent.png',
  },
  work: {
    title: 'Selected Work | DEZO',
    description: 'Live project stories — evidence over decoration.',
    image: '/work-previews/yasana-beauty-rituals.jpg',
  },
  lab: {
    title: 'DEZO LAB | Analyst toolkit',
    description: 'Practical diagnostics for websites, ecommerce and marketplaces.',
    image: '/dezo-logo-transparent.png',
  },
  bhubaneswar: {
    title: 'DEZO Bhubaneswar | Digital growth studio',
    description: 'Web, ecommerce and growth systems from Patia, Bhubaneswar, Odisha.',
    image: '/work-previews/shree-ayurved.jpg',
  },
} as const;

/** Map hostname → preview path helper key used by workPreviewMap */
export const bannerHostToPreviewKey: Record<string, string> = {
  'yasanabeautyrituals.in': 'yasanabeautyrituals.in',
  'sonvicasarees.com': 'sonvicasarees.com',
  'shreeayurved.com': 'shreeayurved.com',
  'nilkanthpaints.com': 'nilkanthpaints.com',
  'thepaanluxe.com': 'thepaanluxe.com',
  'greatindiapublicschool.org': 'greatindiapublicschool.org',
};

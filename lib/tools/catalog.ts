/**
 * DEZO Tools Lab — tool catalog & availability
 */

import type { ToolCategory } from './types';

export type ToolAvailability = 'live' | 'demo' | 'coming_soon';

export interface ToolCatalogItem {
  slug: ToolCategory;
  name: string;
  phase: 1 | 2 | 3 | 4;
  availability: ToolAvailability;
  tagline: string;
  description: string;
  badge?: string;
}

export const TOOL_CATALOG: ToolCatalogItem[] = [
  {
    slug: 'seo',
    name: 'SEO Audit',
    phase: 1,
    availability: 'live',
    tagline: 'Index & crawl readiness',
    description:
      'Titles, canonicals, schema signals, robots/sitemap heuristics, and crawl hygiene.',
    badge: 'Live',
  },
  {
    slug: 'page-speed',
    name: 'Page Speed',
    phase: 1,
    availability: 'live',
    tagline: 'Core Web Vitals oriented',
    description: 'TTFB/probe latency, payload signals, and CWV-oriented performance heuristics.',
    badge: 'Live',
  },
  {
    slug: 'accessibility',
    name: 'Accessibility',
    phase: 1,
    availability: 'live',
    tagline: 'WCAG-oriented checks',
    description: 'Contrast, labels, landmarks, and touch-target heuristics for conversion accessibility.',
    badge: 'Live',
  },
  {
    slug: 'shopify',
    name: 'Shopify Audit',
    phase: 1,
    availability: 'live',
    tagline: 'Storefront health',
    description: 'Theme/app bloat signals, CDN image habits, and checkout trust heuristics.',
    badge: 'Live',
  },
  {
    slug: 'security',
    name: 'Security & Headers',
    phase: 1,
    availability: 'live',
    tagline: 'TLS & header posture',
    description: 'HTTPS enforcement and public security-header observations from a safe probe.',
    badge: 'Live',
  },
  {
    slug: 'cro',
    name: 'CRO Checklist',
    phase: 2,
    availability: 'live',
    tagline: 'Checkout trust & friction',
    description: 'COD/trust, CTA, shipping clarity, and mobile conversion heuristics for India D2C.',
    badge: 'Live',
  },
  {
    slug: 'keywords',
    name: 'Keyword Opportunity',
    phase: 2,
    availability: 'live',
    tagline: 'India intent clustering',
    description:
      'Client-side commercial intent, modifiers, and long-tail opportunity scoring — no paid keyword API.',
    badge: 'Live',
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    phase: 2,
    availability: 'live',
    tagline: 'Odisha & India local',
    description: 'NAP/geo keyword readiness and LocalBusiness schema heuristics for regional brands.',
    badge: 'Live',
  },
  {
    slug: 'brand',
    name: 'Brand Health',
    phase: 4,
    availability: 'live',
    tagline: 'Cross-channel footprint',
    description: 'Domain/brand consistency checks and marketplace-vs-web naming heuristics.',
    badge: 'Live',
  },
  {
    slug: 'amazon',
    name: 'Amazon Listing',
    phase: 3,
    availability: 'demo',
    tagline: 'Public demo heuristics',
    description:
      'ASIN/URL checklist scoring for titles, images, and A+ readiness. Not connected to Amazon SP-API.',
    badge: 'Demo',
  },
  {
    slug: 'flipkart',
    name: 'Flipkart Catalog',
    phase: 3,
    availability: 'demo',
    tagline: 'Public demo heuristics',
    description:
      'Listing completeness & F-Assured readiness checklist. Not connected to Flipkart seller APIs.',
    badge: 'Demo',
  },
];

export const LIVE_SCANNER_CATEGORIES: ToolCategory[] = TOOL_CATALOG.filter(
  (t) => t.availability === 'live' || t.availability === 'demo'
).map((t) => t.slug);

export function getToolMeta(slug: ToolCategory): ToolCatalogItem {
  return TOOL_CATALOG.find((t) => t.slug === slug) || TOOL_CATALOG[0];
}

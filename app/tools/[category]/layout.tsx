import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

const TOOL_META: Record<string, { title: string; description: string }> = {
  seo: {
    title: 'Free Website SEO Audit Tool',
    description:
      'Run a practical SEO diagnostic — canonicals, titles, schema signals and indexation cues. Part of DEZO LAB.',
  },
  shopify: {
    title: 'Shopify Store Health Checker',
    description:
      'Scan Shopify storefront speed and health signals. Analyst toolkit from DEZO LAB — no fake scores.',
  },
  amazon: {
    title: 'Amazon Listing Optimizer Checklist',
    description:
      'Listing structure checklist for Amazon India. Demo-honest where APIs are unavailable.',
  },
  flipkart: {
    title: 'Flipkart Catalog Readiness Tool',
    description: 'Catalog and attribute readiness checks for Flipkart sellers — DEZO LAB.',
  },
  'page-speed': {
    title: 'Page Speed & Core Web Vitals Checker',
    description: 'Performance-oriented diagnostics for LCP, INP and CLS signals — DEZO LAB.',
  },
  cro: {
    title: 'Conversion Rate Optimization Audit',
    description: 'Checkout and trust-friction checklist for ecommerce — DEZO LAB.',
  },
  keywords: {
    title: 'Keyword Opportunity Engine',
    description: 'Search intent and opportunity framing for Indian commercial queries — DEZO LAB.',
  },
  'local-seo': {
    title: 'Local SEO Audit Tool',
    description: 'Local visibility checklist for Bhubaneswar, Odisha and India businesses — DEZO LAB.',
  },
  security: {
    title: 'Security Header & TLS Checker',
    description: 'TLS and security header review for public sites — DEZO LAB.',
  },
  accessibility: {
    title: 'Accessibility Usability Checker',
    description: 'WCAG-oriented accessibility signals for public websites — DEZO LAB.',
  },
  brand: {
    title: 'Brand Presence Checklist',
    description: 'Brand consistency and presence checklist — DEZO LAB.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = TOOL_META[category];
  if (!meta) {
    return constructMetadata({
      title: 'DEZO LAB Tools',
      canonicalUrl: 'https://dezo.in/tools',
    });
  }
  return constructMetadata({
    title: meta.title,
    description: meta.description,
    canonicalUrl: `https://dezo.in/tools/${category}`,
  });
}

export default function ToolCategoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}

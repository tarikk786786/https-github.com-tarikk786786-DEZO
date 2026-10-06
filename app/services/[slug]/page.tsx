import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { servicePillars } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';

const SERVICE_SLUGS = [
  'web-development',
  'seo',
  'amazon',
  'flipkart',
  'paid-ads',
  'social',
  'branding',
  'growth-systems',
] as const;

type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const SLUG_TO_PILLAR: Record<ServiceSlug, string> = {
  'web-development': 'digital-build',
  seo: 'search',
  amazon: 'amazon',
  flipkart: 'flipkart',
  'paid-ads': 'paid',
  social: 'social',
  branding: 'brand',
  'growth-systems': 'systems',
};

const DELIVERABLES: Record<ServiceSlug, string[]> = {
  'web-development': [
    'Next.js / Shopify / WordPress storefronts',
    'Landing pages & CRO',
    'Custom web apps',
    'Performance & Core Web Vitals',
  ],
  seo: [
    'Technical SEO',
    'Local SEO',
    'Content systems',
    'Backlink & authority programs',
  ],
  amazon: [
    'Listing & keyword systems',
    'A+ content',
    'Sponsored ads',
    'Catalog & account health',
  ],
  flipkart: [
    'Catalog & listing ops',
    'Pricing & promotions',
    'Inventory & orders',
    'Performance reporting',
  ],
  'paid-ads': [
    'Meta FB/IG campaigns',
    'Google Search / Shopping / PMax',
    'Creative testing',
    'Conversion tracking',
  ],
  social: [
    'Strategy & content calendars',
    'Reels & creatives',
    'Community & influencers',
    'Analytics',
  ],
  branding: [
    'Naming & positioning',
    'Identity & packaging',
    'Guidelines & photography',
    'Creative direction',
  ],
  'growth-systems': [
    'Growth Lab diagnostics',
    'Reporting cadence',
    'Connector adapters (phased)',
    'Client Portal path',
  ],
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillarSlug = SLUG_TO_PILLAR[slug as ServiceSlug];
  const pillar = servicePillars.find((p) => p.slug === pillarSlug);
  if (!pillar) return {};
  return constructMetadata({
    title: `${pillar.title} — DEZO`,
    description: pillar.summary,
    canonicalUrl: `https://dezo.in/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound();
  const pillarSlug = SLUG_TO_PILLAR[slug as ServiceSlug];
  const pillar = servicePillars.find((p) => p.slug === pillarSlug);
  if (!pillar) notFound();
  const deliverables = DELIVERABLES[slug as ServiceSlug];

  return (
    <PlatformPageScaffold
      badge={pillar.name}
      title={pillar.title}
      subtitle={pillar.summary}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-dezo-text-primary mb-3">
              Problem we solve
            </h2>
            <p className="text-sm text-dezo-text-secondary leading-relaxed">
              Brands lose growth when {pillar.name.toLowerCase()} is treated as a one-off
              vendor task instead of part of a connected commercial system.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-dezo-text-primary mb-3">
              What we do
            </h2>
            <p className="text-sm text-dezo-text-secondary leading-relaxed">{pillar.summary}</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-dezo-text-primary mb-3">
              Deliverables
            </h2>
            <ul className="space-y-2">
              {deliverables.map((d) => (
                <li key={d} className="text-sm text-dezo-text-secondary flex gap-2">
                  <span className="text-dezo-primary">·</span>
                  {d}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="lg:col-span-5 p-6 rounded-dezo-lg border border-dezo-border bg-dezo-surface h-fit">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-3">
            How it works
          </p>
          <ol className="space-y-3 text-sm text-dezo-text-secondary">
            <li>01 — Diagnose channel readiness</li>
            <li>02 — Architect the stack</li>
            <li>03 — Execute with specialists</li>
            <li>04 — Operate & report</li>
          </ol>
        </aside>
      </div>
    </PlatformPageScaffold>
  );
}

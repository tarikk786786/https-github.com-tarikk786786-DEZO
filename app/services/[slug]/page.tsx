import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTASection, ServiceBanner } from '@/components/dezo/visual';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoReveal, DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';
import { ServicePromiseBlock } from '@/components/promise/ServicePromise';
import { finalCtaBanner, serviceDetailBanners } from '@/content/banners';
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
    title: pillar.title,
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
  const banner = serviceDetailBanners[slug] ?? {
    id: `svc-${slug}`,
    eyebrow: pillar.name,
    title: pillar.title,
    body: pillar.summary,
    tone: 'warm' as const,
    primaryCta: { label: 'Start a Project', href: '/start-a-project', variant: 'primary' as const },
  };

  return (
    <>
      <ServiceBanner data={banner} />

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              <DezoReveal>
                <section>
                  <h2 className="font-display text-2xl text-dezo-text-primary mb-3">
                    Problem we solve
                  </h2>
                  <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed max-w-xl">
                    Brands lose growth when {pillar.name.toLowerCase()} is treated as a one-off
                    vendor task instead of part of a connected commercial system.
                  </p>
                </section>
              </DezoReveal>
              <DezoReveal delay={0.06}>
                <section>
                  <h2 className="font-display text-2xl text-dezo-text-primary mb-3">What we do</h2>
                  <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed max-w-xl">
                    {pillar.summary}
                  </p>
                </section>
              </DezoReveal>
              <DezoReveal delay={0.1}>
                <section>
                  <h2 className="font-display text-2xl text-dezo-text-primary mb-4">
                    Deliverables
                  </h2>
                  <DezoStagger className="space-y-0 border-y border-dezo-border divide-y divide-dezo-border" stagger={0.04}>
                    {deliverables.map((d, i) => (
                      <DezoStaggerItem key={d}>
                        <li className="list-none flex gap-4 py-4 text-sm text-dezo-text-secondary">
                          <span className="font-mono text-[10px] text-dezo-text-muted shrink-0 pt-0.5">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {d}
                        </li>
                      </DezoStaggerItem>
                    ))}
                  </DezoStagger>
                </section>
              </DezoReveal>
            </div>
            <aside className="lg:col-span-5">
              <DezoReveal delay={0.08}>
                <div className="border border-dezo-border bg-dezo-surface p-6 sm:p-8 sticky top-28">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-5">
                    How it works
                  </p>
                  <ol className="space-y-4 text-sm text-dezo-text-secondary">
                    {[
                      'Diagnose channel readiness',
                      'Architect the stack',
                      'Execute with specialists',
                      'Operate & report',
                    ].map((step, i) => (
                      <li key={step} className="flex gap-3 border-t border-dezo-border pt-4 first:border-0 first:pt-0">
                        <span className="font-mono text-[10px] text-dezo-text-muted">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </DezoReveal>
            </aside>
          </div>
          <div className="mt-16">
            <ServicePromiseBlock slug={slug} />
          </div>
        </DezoContainer>
      </DezoSection>

      <CTASection data={finalCtaBanner} />
    </>
  );
}

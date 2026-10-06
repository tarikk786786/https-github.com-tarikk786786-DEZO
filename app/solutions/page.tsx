import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import { pillars, brand } from '@/content/site';

export const metadata: Metadata = constructMetadata({
  title: 'Solutions — Build, Brand, Marketplace, Grow, Intelligence',
  description:
    'DEZO’s five commercial pillars: digital engineering, brand systems, Amazon & Flipkart marketplace growth, performance marketing, and Growth OS intelligence.',
  canonicalUrl: 'https://dezo.in/solutions',
});

const deliverables: Record<string, string[]> = {
  build: [
    'Custom Next.js storefronts & marketing sites',
    'Shopify architecture & theme systems',
    'SaaS / portals / internal tools',
    'Performance-first frontend engineering',
  ],
  brand: [
    'Positioning & identity systems',
    'Packaging & unboxing design',
    'Marketplace creative & A+ content',
    'Launch kits across web + ads',
  ],
  marketplace: [
    'Amazon & Flipkart listing systems',
    'Catalog health & indexing work',
    'Sponsored ads / PPC operations',
    'Seller account growth playbooks',
  ],
  growth: [
    'Technical & content SEO',
    'Meta & Google acquisition',
    'CRO and analytics instrumentation',
    'Unified performance reporting',
  ],
  intelligence: [
    'DEZO Growth OS (phased)',
    'Cross-channel telemetry concepts',
    'Tools Lab public diagnostics',
    'Automation adapters for later scale',
  ],
};

export default function SolutionsIndexPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-14">
            <DezoHeading
              badge="Solutions"
              as="h1"
              subtitle={`${brand.tagline} Five disciplines under one commercial roof — ${brand.geo}`}
            >
              Build · Brand · Marketplace · Grow · Intelligence
            </DezoHeading>
          </div>

          <div className="flex flex-col gap-6">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-dezo-lg border border-dezo-border bg-dezo-surface"
              >
                <div className="lg:col-span-4">
                  <p className="font-mono text-xs text-dezo-text-muted mb-2">
                    0{index + 1}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-dezo-text-primary mb-1">
                    {pillar.name}
                  </h2>
                  <p className="text-sm font-semibold text-dezo-primary mb-3">
                    {pillar.title}
                  </p>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {(deliverables[pillar.slug] || []).map((item) => (
                      <li
                        key={item}
                        className="text-sm text-dezo-text-secondary flex gap-2"
                      >
                        <span className="text-dezo-primary shrink-0">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-2 flex lg:justify-end lg:items-start">
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary hover:underline"
                  >
                    Explore <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <DezoButton href="/start-a-project" size="lg">
              Start a Project
            </DezoButton>
            <DezoButton href="/tools" variant="outline" size="lg">
              Try Tools Lab
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

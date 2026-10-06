import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Pricing — START / GROW / SCALE / CUSTOM',
  description: 'DEZO engagement packages. Exact pricing after project diagnostic.',
  canonicalUrl: 'https://dezo.in/pricing',
});

const plans = [
  {
    name: 'START',
    blurb: 'Foundation website or storefront, brand basics, and launch checklist.',
  },
  {
    name: 'GROW',
    blurb: 'Build plus SEO, ads, or marketplace focus — monthly operating cadence.',
  },
  {
    name: 'SCALE',
    blurb: 'Full stack: brand, web, marketplaces, paid media, social, reporting.',
  },
  {
    name: 'CUSTOM',
    blurb: 'Assemble your own stack — strategy call and scoped estimate.',
  },
];

export default function PricingPage() {
  return (
    <PlatformPageScaffold
      badge="Pricing"
      title="Engagement packages"
      subtitle="START · GROW · SCALE · CUSTOM. Exact pricing after a short diagnostic — no published vanity rates."
      ctaHref="/contact"
      ctaLabel="Request an estimate"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dezo-border border border-dezo-border">
        {plans.map((p) => (
          <div key={p.name} className="p-6 sm:p-8 bg-dezo-surface">
            <p className="font-display text-2xl text-dezo-text-primary mb-3">{p.name}</p>
            <p className="text-sm text-dezo-text-secondary leading-relaxed">{p.blurb}</p>
          </div>
        ))}
      </div>
    </PlatformPageScaffold>
  );
}

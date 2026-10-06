import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Pricing — START / GROW / SCALE / CUSTOM',
  description: 'DEZO growth packages and build-your-own stack estimates.',
  canonicalUrl: 'https://dezo.in/pricing',
});

const plans = [
  {
    name: 'START',
    blurb: 'Foundation website or storefront + brand basics + launch checklist.',
  },
  {
    name: 'GROW',
    blurb: 'Build + SEO/ads or marketplace focus — monthly operating cadence.',
  },
  {
    name: 'SCALE',
    blurb: 'Full stack: brand, web, marketplaces, paid, social, reporting.',
  },
  {
    name: 'CUSTOM',
    blurb: 'Build your own stack — strategy call + scoped estimate.',
  },
];

export default function PricingPage() {
  return (
    <PlatformPageScaffold
      badge="Pricing"
      title="Packages that match how growth actually works"
      subtitle="START · GROW · SCALE · CUSTOM — or assemble your own stack. Exact pricing after diagnostic."
      ctaHref="/book-strategy-call"
      ctaLabel="Get a scoped estimate"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className="p-6 border border-dezo-border bg-dezo-surface rounded-dezo-lg"
          >
            <p className="font-display text-2xl font-bold text-dezo-primary mb-3">{p.name}</p>
            <p className="text-sm text-dezo-text-secondary leading-relaxed">{p.blurb}</p>
          </div>
        ))}
      </div>
    </PlatformPageScaffold>
  );
}

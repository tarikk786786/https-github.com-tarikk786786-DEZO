import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold, ScaffoldLinkList } from '@/components/platform/PlatformPageScaffold';
import { industries } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Industries — Who We Grow',
  description: 'D2C, ecommerce, local, startups, manufacturers, service brands, and personal brands.',
  canonicalUrl: 'https://dezo.in/industries',
});

export default function IndustriesPage() {
  return (
    <PlatformPageScaffold
      badge="Industries"
      title="Built for brands that need to sell"
      subtitle="From D2C and ecommerce to manufacturers and personal brands across India."
    >
      <ScaffoldLinkList
        items={industries.map((i) => ({ href: i.href, name: i.name }))}
      />
    </PlatformPageScaffold>
  );
}

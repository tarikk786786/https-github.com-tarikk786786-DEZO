import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold, ScaffoldLinkList } from '@/components/platform/PlatformPageScaffold';
import { servicePillars } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Services — Full Growth Stack',
  description:
    'DEZO services: Digital Build, Search, Amazon, Flipkart, Paid Growth, Social, Brand, and Growth Systems.',
  canonicalUrl: 'https://dezo.in/services',
});

export default function ServicesPage() {
  return (
    <PlatformPageScaffold
      badge="Services"
      title="Eight pillars. One growth partner."
      subtitle="Web, SEO, Amazon, Flipkart, Meta/Google ads, social, brand, and growth systems — operated together."
    >
      <ScaffoldLinkList
        items={servicePillars.map((p) => ({
          href: p.href,
          name: p.name,
          summary: p.summary,
        }))}
      />
    </PlatformPageScaffold>
  );
}

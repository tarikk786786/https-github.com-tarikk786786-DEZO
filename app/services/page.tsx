import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold, ScaffoldLinkList } from '@/components/platform/PlatformPageScaffold';
import { serviceRows } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Services — Digital Growth Capabilities',
  description:
    'Web development, performance marketing, marketplace growth, SEO, and brand & creative.',
  canonicalUrl: 'https://dezo.in/services',
});

export default function ServicesPage() {
  return (
    <PlatformPageScaffold
      badge="Services"
      title="Capabilities across the full commercial stack"
      subtitle="Web, performance marketing, marketplaces, SEO, and brand — delivered as one partner."
    >
      <ScaffoldLinkList
        items={serviceRows.map((s) => ({
          href: s.href,
          name: `${s.num}  ${s.name}`,
          summary: s.summary,
        }))}
      />
    </PlatformPageScaffold>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Client Portal',
  description: 'DEZO Client Portal — project dashboards, reports, and channel modules.',
  canonicalUrl: 'https://dezo.in/portal',
});

const modules = [
  'Dashboard',
  'Projects',
  'SEO',
  'Ads',
  'Amazon',
  'Flipkart',
  'Social',
  'Reports',
  'Tasks',
  'Billing',
];

export default function PortalShellPage() {
  return (
    <PlatformPageScaffold
      badge="Client Portal"
      title="Client portal — coming online"
      subtitle="Modules are scaffolded. Authentication and live connectors ship in later phases — no fabricated data here."
      ctaHref="/contact"
      ctaLabel="Request access"
    >
      <div className="p-8 border border-dashed border-dezo-border bg-dezo-surface mb-8">
        <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
          Login gate coming soon. Current clients: contact studio leadership for project updates.
        </p>
        <Link href="/contact" className="text-sm font-semibold text-dezo-primary hover:underline">
          Contact studio →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-dezo-border border border-dezo-border">
        {modules.map((m) => (
          <div
            key={m}
            className="p-4 bg-dezo-bg text-center text-sm font-medium text-dezo-text-muted"
          >
            {m}
          </div>
        ))}
      </div>
    </PlatformPageScaffold>
  );
}

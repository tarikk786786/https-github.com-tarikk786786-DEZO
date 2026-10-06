import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Client Portal — Coming Online',
  description: 'DEZO Client Portal shell — dashboard, projects, SEO, ads, marketplaces, reports.',
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
      title="Your Growth OS — shell online"
      subtitle="Portal modules are scaffolded. Full auth, Postgres, and connectors ship in later phases — no fake live data."
      ctaHref="/contact"
      ctaLabel="Request portal access"
    >
      <div className="p-8 rounded-dezo-lg border border-dashed border-dezo-border bg-dezo-surface mb-8">
        <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
          Login gate coming soon. Current clients: contact studio leadership for project updates.
        </p>
        <Link
          href="/contact"
          className="text-sm font-semibold text-dezo-primary hover:underline"
        >
          Contact studio →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {modules.map((m) => (
          <div
            key={m}
            className="p-4 rounded-dezo-md border border-dezo-border text-center text-sm font-semibold text-dezo-text-muted"
          >
            {m}
          </div>
        ))}
      </div>
    </PlatformPageScaffold>
  );
}

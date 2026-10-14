import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Resources — Guides, Tools, Insights',
  description: 'DEZO resources: Growth Lab tools, guides, templates, and insights.',
  canonicalUrl: 'https://dezo.in/resources',
});

const links = [
  { href: '/growth-lab', name: 'Growth Lab', summary: 'Free public diagnostics' },
  { href: '/work', name: 'Work archive', summary: 'Live client deployments' },
  { href: '/results', name: 'Results', summary: 'Case study narratives' },
  { href: '/pricing', name: 'Pricing', summary: 'Packages & stack builder' },
];

export default function ResourcesPage() {
  return (
    <PlatformPageScaffold
      badge="Resources"
      title="Guides, tools, and proof"
      subtitle="Growth Lab tools are live. Blog/guides templates ship as content expands — no filler posts."
    >
      <ul className="divide-y divide-dezo-border border-y border-dezo-border">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="flex flex-col sm:flex-row sm:items-center gap-1 py-5"
            >
              <span className="font-display text-lg font-bold text-dezo-text-primary sm:w-48">
                {l.name}
              </span>
              <span className="text-sm text-dezo-text-secondary">{l.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PlatformPageScaffold>
  );
}

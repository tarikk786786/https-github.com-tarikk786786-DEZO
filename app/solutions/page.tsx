import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { servicePillars, brand } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Solutions — Growth Stack',
  description: brand.supporting,
  canonicalUrl: 'https://dezo.in/solutions',
});

export default function SolutionsPage() {
  return (
    <PlatformPageScaffold
      badge="Solutions"
      title="Build · Market · Grow"
      subtitle={`${brand.tagline} Eight service pillars under one commercial roof.`}
    >
      <div className="flex flex-col divide-y divide-dezo-border border-y border-dezo-border">
        {servicePillars.map((pillar, index) => (
          <article key={pillar.slug} className="py-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-mono text-xs text-dezo-text-muted w-10">
              0{index + 1}
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-dezo-text-primary">
                {pillar.name}
              </h2>
              <p className="text-sm text-dezo-text-secondary mt-1">{pillar.summary}</p>
            </div>
            <Link
              href={pillar.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary"
            >
              Explore <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </PlatformPageScaffold>
  );
}

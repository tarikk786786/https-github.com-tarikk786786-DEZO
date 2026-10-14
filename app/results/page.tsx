import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { featuredCaseStudies } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';
export const metadata: Metadata = constructMetadata({
  title: 'Results — Verified Outcomes',
  description: 'Live deployments and structured case studies — verified figures only.',
  canonicalUrl: 'https://dezo.in/results',
});

export default function ResultsPage() {
  return (
    <PlatformPageScaffold
      badge="Results"
      title="Verified outcomes only"
      subtitle="Case studies use challenge and result framing — no invented volume metrics or sitewide ROI averages."
      ctaHref="/work"
      ctaLabel="Browse work"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {featuredCaseStudies.map((c) => (
          <a
            key={c.url}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-dezo-border pt-5 group"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-dezo-primary mb-2">
              {c.industry}
            </p>
            <h3 className="font-display text-2xl text-dezo-text-primary group-hover:text-dezo-primary transition-colors mb-3">
              {c.title}
            </h3>
            <p className="text-sm text-dezo-text-secondary leading-relaxed">{c.result}</p>
          </a>
        ))}
      </div>
    </PlatformPageScaffold>
  );
}

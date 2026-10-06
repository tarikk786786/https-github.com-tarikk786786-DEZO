import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { StoryCaseStudies, CaseStudyCta } from '@/components/platform/StoryCaseStudies';
import { constructMetadata } from '@/lib/seo/metadata';
import { portfolioData } from '@/content/projects';

export const metadata: Metadata = constructMetadata({
  title: 'Results — Verifiable Outcomes',
  description: 'Live deployments and structured case studies — no fake stats.',
  canonicalUrl: 'https://dezo.in/results',
});

export default function ResultsPage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;

  return (
    <PlatformPageScaffold
      badge="Results"
      title="Proof you can click"
      subtitle={`${liveCount}+ live URLs catalogued. Case studies use Problem → Strategy → Execution → Result — no invented metrics.`}
      ctaHref="/work"
      ctaLabel="Browse work archive"
    >
      <StoryCaseStudies />
      <CaseStudyCta />
    </PlatformPageScaffold>
  );
}

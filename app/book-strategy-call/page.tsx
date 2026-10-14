import React from 'react';
import type { Metadata } from 'next';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { DezoQualificationFunnel } from '@/components/dezo/DezoQualificationFunnel';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Book a Strategy Call',
  description: 'Book a DEZO strategy call — channel diagnostic and studio leadership routing.',
  canonicalUrl: 'https://dezo.in/book-strategy-call',
});

export default function BookStrategyCallPage() {
  return (
    <PlatformPageScaffold
      badge="Strategy call"
      title="Book a strategy call"
      subtitle="Tell us about channels, goals, and timeline. We’ll route your brief to studio leadership."
      ctaHref="/start-a-project"
      ctaLabel="Start project diagnostic"
    >
      <div className="max-w-2xl">
        <DezoQualificationFunnel />
      </div>
    </PlatformPageScaffold>
  );
}

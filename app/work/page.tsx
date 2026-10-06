import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import { constructMetadata } from '@/lib/seo/metadata';
import { portfolioData } from '@/content/projects';

export const metadata: Metadata = constructMetadata({
  title: 'Work — Live Client Deployments',
  description:
    'Browse DEZO’s live client deployments across ecommerce, healthcare, education, corporate, and more — real URLs, not invented testimonials.',
  canonicalUrl: 'https://dezo.in/work',
});

export default function WorkPage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-12">
            <DezoHeading
              badge="Work"
              as="h1"
              subtitle={`${liveCount}+ live URLs in our public archive. Prefer case-study framing over anonymous testimonials. Metrics only when methodology is clear.`}
            >
              Proof you can click
            </DezoHeading>
          </div>

          <DezoWorkGallery initialLimit={18} />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

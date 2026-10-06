import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import { DezoFeaturedWork } from '@/components/dezo/DezoFeaturedWork';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { constructMetadata } from '@/lib/seo/metadata';
import { portfolioData } from '@/content/projects';

export const metadata: Metadata = constructMetadata({
  title: 'Work — Live Client Deployments',
  description:
    'Browse DEZO’s live client deployments across ecommerce, healthcare, education, corporate, and more — real URLs with live previews.',
  canonicalUrl: 'https://dezo.in/work',
});

export default function WorkPage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;
  const featured = portfolioData.filter((p) => p.featured && p.isLive);

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-14">
              <DezoHeading
                badge="Work"
                as="h1"
                subtitle={`${liveCount}+ live URLs in our public archive. Featured sites below are production websites with clickable previews — not invented case studies.`}
              >
                Proof you can click
              </DezoHeading>
            </div>
          </DezoReveal>

          <div className="mb-20">
            <DezoFeaturedWork projects={featured} />
          </div>

          <DezoReveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary mb-8 tracking-tight">
              Full live archive
            </h2>
          </DezoReveal>
          <DezoWorkGallery initialLimit={18} featuredFirst />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

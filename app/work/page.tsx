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
    'Browse DEZO live client deployments — real URLs with live previews.',
  canonicalUrl: 'https://dezo.in/work',
});

export default function WorkPage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;
  const featuredPriority = [
    'yasanabeautyrituals.in',
    'sonvicasarees.com',
    'thepaanluxe.com',
    'shreeayurved.com',
    'nilkanthpaints.com',
    'greatindiapublicschool.org',
  ];
  const featured = portfolioData
    .filter((p) => p.featured && p.isLive)
    .sort((a, b) => {
      const ai = featuredPriority.findIndex((h) => a.url.includes(h));
      const bi = featuredPriority.findIndex((h) => b.url.includes(h));
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

  return (
    <div className="pt-32 sm:pt-36 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-10">
              <DezoHeading
                badge="Work"
                as="h1"
                subtitle={`${liveCount}+ live URLs. Featured sites are production websites with clickable previews.`}
              >
                Proof you can click
              </DezoHeading>
            </div>
          </DezoReveal>
          <div className="dezo-section-rule mb-14" />
          <div className="mb-20">
            <DezoFeaturedWork projects={featured} />
          </div>
          <DezoReveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
              Full live archive
            </h2>
          </DezoReveal>
          <DezoWorkGallery initialLimit={18} featuredFirst />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

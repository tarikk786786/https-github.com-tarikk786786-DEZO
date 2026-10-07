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
  title: 'Work — Live Client Websites',
  description:
    'Browse DEZO live client websites — real production URLs with previews. Every listed project is shown.',
  canonicalUrl: 'https://dezo.in/work',
});

export default function WorkPage() {
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
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-10">
              <DezoHeading
                badge="Work"
                as="h1"
                subtitle="Every listed live website in our archive — real production URLs, not mockups. Featured stories first; the complete directory follows."
              >
                Live websites
              </DezoHeading>
            </div>
          </DezoReveal>
          <div className="dezo-section-rule mb-14" />
          <div className="mb-20">
            <DezoFeaturedWork projects={featured} />
          </div>
          <DezoReveal>
            <h2 className="font-display text-2xl sm:text-3xl text-dezo-text-primary mb-8">
              Complete archive
            </h2>
          </DezoReveal>
          <DezoWorkGallery showAll featuredFirst />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

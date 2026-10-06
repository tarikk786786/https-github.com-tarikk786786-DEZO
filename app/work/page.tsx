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
    <div className="pt-28 sm:pt-36 pb-24 dezo-paper min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-6">
              <DezoHeading
                badge="Work"
                as="h1"
                subtitle={`${liveCount}+ live URLs in our public archive. Featured sites below are production websites with clickable previews — not invented case studies.`}
              >
                Proof you can click
              </DezoHeading>
            </div>
          </DezoReveal>

          <div className="dezo-section-rule my-12 sm:my-16" />

          <div className="mb-24">
            <DezoFeaturedWork projects={featured} />
          </div>

          <DezoReveal>
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-3">
                Full archive
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-dezo-text-primary tracking-tight">
                Every live deployment
              </h2>
            </div>
          </DezoReveal>
          <DezoWorkGallery initialLimit={18} featuredFirst />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

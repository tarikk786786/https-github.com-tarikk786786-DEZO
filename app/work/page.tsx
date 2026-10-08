import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import { DezoFeaturedWork } from '@/components/dezo/DezoFeaturedWork';
import { CTASection, ServiceBanner } from '@/components/dezo/visual';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { finalCtaBanner, workIndexBanner } from '@/content/banners';
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
    <>
      <ServiceBanner data={workIndexBanner} compact />

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Featured"
              as="h2"
              subtitle="Image-led project stories with live production URLs."
            >
              Evidence over decoration
            </DezoHeading>
          </DezoReveal>
          <div className="mt-12 mb-20">
            <DezoFeaturedWork projects={featured} />
          </div>
          <DezoReveal>
            <h2
              id="archive"
              className="font-display text-2xl sm:text-3xl text-dezo-text-primary mb-8 scroll-mt-28"
            >
              Complete archive
            </h2>
          </DezoReveal>
          <DezoWorkGallery showAll featuredFirst />
        </DezoContainer>
      </DezoSection>

      <CTASection data={finalCtaBanner} />
    </>
  );
}

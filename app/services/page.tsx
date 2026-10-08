import React from 'react';
import type { Metadata } from 'next';
import {
  ChapterBanner,
  CTASection,
  ServiceBanner,
} from '@/components/dezo/visual';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { chapterBanners, finalCtaBanner, servicesIndexBanner } from '@/content/banners';
import { serviceRows } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Services — Digital Growth Capabilities',
  description:
    'Web development, performance marketing, marketplace growth, SEO, and brand & creative — one commercial system.',
  canonicalUrl: 'https://dezo.in/services',
});

export default function ServicesPage() {
  return (
    <>
      <ServiceBanner data={servicesIndexBanner} />

      {chapterBanners.map((chapter, i) => (
        <ChapterBanner key={chapter.id} data={chapter} reverse={i % 2 === 1} />
      ))}

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Index"
              as="h2"
              subtitle="Jump straight to the capability you need."
            >
              All services
            </DezoHeading>
          </DezoReveal>
          <div className="mt-10 divide-y divide-dezo-border border-y border-dezo-border">
            {serviceRows.map((row) => (
              <Link
                key={row.num}
                href={row.href}
                className="dezo-service-row group grid grid-cols-12 gap-4 py-7 items-start -mx-2 px-2"
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-xs text-dezo-text-muted pt-1">
                  {row.num}
                </span>
                <div className="col-span-10 sm:col-span-4">
                  <h3 className="font-display text-xl sm:text-2xl text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                    {row.name}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-span-6 sm:col-start-7">
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{row.summary}</p>
                </div>
                <span className="hidden lg:flex col-span-1 justify-end items-center text-dezo-text-muted group-hover:text-dezo-primary transition-colors">
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      <CTASection data={finalCtaBanner} />
    </>
  );
}

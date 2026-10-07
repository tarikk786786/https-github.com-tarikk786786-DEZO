'use client';

import React from 'react';
import Link from 'next/link';
import type { ChapterBannerData } from '@/content/banners';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoImageReveal } from '@/lib/motion/MotionAdapter';
import { BannerMedia } from './BannerMedia';
import { bannerToneClasses } from './bannerTone';
import { ArrowUpRight } from 'lucide-react';

export function ChapterBanner({
  data,
  reverse = false,
}: {
  data: ChapterBannerData;
  reverse?: boolean;
}) {
  const tone = bannerToneClasses(data.tone);

  return (
    <section className={`${tone.section} border-y ${tone.rule}`}>
      <DezoContainer size="wide" className="py-16 sm:py-20">
        <Link
          href={data.href}
          className={`group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
            reverse ? 'lg:[direction:rtl]' : ''
          }`}
        >
          <div className={`lg:col-span-5 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
            <div className="flex items-baseline gap-4 mb-4">
              {data.numeral && (
                <span className="font-mono text-xs text-dezo-text-muted">{data.numeral}</span>
              )}
              {data.eyebrow && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary">
                  {data.eyebrow}
                </span>
              )}
            </div>
            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.1] ${tone.title} group-hover:text-dezo-primary transition-colors`}
            >
              {data.title}
            </h2>
            {data.body && (
              <p className={`mt-5 text-sm sm:text-base leading-relaxed max-w-md ${tone.body}`}>
                {data.body}
              </p>
            )}
            <span
              className={`mt-7 inline-flex items-center gap-1.5 text-sm font-medium border-b pb-0.5 ${
                data.tone === 'ink'
                  ? 'text-white border-white/40 group-hover:border-dezo-primary group-hover:text-dezo-primary'
                  : 'text-dezo-text-primary border-dezo-ink group-hover:border-dezo-primary group-hover:text-dezo-primary'
              } transition-colors`}
            >
              Explore {data.eyebrow?.toLowerCase() || 'capability'}
              <ArrowUpRight size={14} className="dezo-cta-arrow" />
            </span>
          </div>
          <div className={`lg:col-span-7 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
            <DezoImageReveal className="relative aspect-[16/10] sm:aspect-[21/12] w-full overflow-hidden border border-dezo-border bg-dezo-bg-warm">
              <BannerMedia media={data.media} className="dezo-img-zoom" />
            </DezoImageReveal>
          </div>
        </Link>
      </DezoContainer>
    </section>
  );
}

'use client';

import React from 'react';
import type { BannerBase } from '@/content/banners';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoHeroMotion } from '@/lib/motion/MotionAdapter';
import { BannerMedia } from './BannerMedia';
import { bannerToneClasses } from './bannerTone';

/** Full-bleed or split service / location hero from Banner data */
export function ServiceBanner({
  data,
  compact = false,
}: {
  data: BannerBase;
  compact?: boolean;
}) {
  const tone = bannerToneClasses(data.tone);
  const hasMedia = data.media && data.media.kind !== 'none';

  return (
    <section
      className={`relative overflow-hidden ${tone.section} ${
        compact ? 'min-h-[50svh]' : 'min-h-[72svh]'
      } flex flex-col justify-end`}
    >
      {hasMedia && (
        <div className="absolute inset-0" aria-hidden>
          <BannerMedia media={data.media} priority className="dezo-hero-kenburns opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                data.tone === 'ink'
                  ? 'linear-gradient(105deg, rgba(11,11,10,0.94) 0%, rgba(11,11,10,0.75) 55%, rgba(11,11,10,0.45) 100%)'
                  : 'linear-gradient(105deg, rgba(245,243,238,0.97) 0%, rgba(245,243,238,0.88) 45%, rgba(245,243,238,0.55) 100%)',
            }}
          />
        </div>
      )}
      <DezoContainer size="wide" className="relative z-10 pt-28 pb-14 sm:pb-18">
        <DezoHeroMotion>
          <div className="max-w-3xl">
            {data.eyebrow && (
              <p
                data-hero-item
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-4"
              >
                {data.eyebrow}
              </p>
            )}
            <h1
              data-hero-item
              className={`font-display text-3xl sm:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.08] mb-5 ${tone.title}`}
            >
              {data.title}
            </h1>
            {data.body && (
              <p data-hero-item className={`text-base sm:text-lg leading-relaxed max-w-xl mb-8 ${tone.body}`}>
                {data.body}
              </p>
            )}
            <div data-hero-item className="flex flex-wrap gap-3">
              {data.primaryCta && (
                <DezoButton href={data.primaryCta.href} size="lg">
                  {data.primaryCta.label}
                </DezoButton>
              )}
              {data.secondaryCta && (
                <DezoButton href={data.secondaryCta.href} variant="outline" size="lg">
                  {data.secondaryCta.label}
                </DezoButton>
              )}
            </div>
            {data.meta && (
              <p data-hero-item className={`mt-10 text-xs ${tone.meta}`}>
                {data.meta}
              </p>
            )}
          </div>
        </DezoHeroMotion>
      </DezoContainer>
    </section>
  );
}

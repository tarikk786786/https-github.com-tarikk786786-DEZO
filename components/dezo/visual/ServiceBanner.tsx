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
          <BannerMedia media={data.media} priority className="dezo-hero-kenburns opacity-[0.58]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                data.tone === 'ink'
                  ? 'linear-gradient(105deg, rgba(11,11,10,0.94) 0%, rgba(11,11,10,0.72) 52%, rgba(11,11,10,0.4) 100%)'
                  : 'linear-gradient(105deg, rgba(245,243,238,0.96) 0%, rgba(245,243,238,0.82) 38%, rgba(245,243,238,0.42) 100%)',
            }}
          />
        </div>
      )}
      <DezoContainer size="wide" className="relative z-10 pt-28 pb-14 sm:pb-18">
        <DezoHeroMotion>
          <div className="max-w-4xl">
            {data.eyebrow && (
              <div data-hero-item className="flex items-center gap-2.5 mb-4">
                <span className="w-2 h-2 bg-dezo-primary shrink-0" />
                <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-dezo-primary">
                  {data.eyebrow}
                </p>
              </div>
            )}
            <h1
              data-hero-item
              className={`font-display text-4xl sm:text-6xl lg:text-[4rem] font-black tracking-tightest leading-[1.04] uppercase mb-5 ${tone.title}`}
            >
              {data.title}
            </h1>
            <div
              data-hero-item
              className="w-16 h-[3px] bg-dezo-primary mb-6"
              aria-hidden
            />
            {data.body && (
              <p data-hero-item className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-8 border-l-2 border-dezo-primary pl-4 ${tone.body}`}>
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

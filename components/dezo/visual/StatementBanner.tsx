'use client';

import React from 'react';
import type { BannerBase } from '@/content/banners';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { bannerToneClasses } from './bannerTone';

export function StatementBanner({ data }: { data: BannerBase }) {
  const tone = bannerToneClasses(data.tone);

  return (
    <DezoSection spacing="normal" className={`${tone.section} border-y ${tone.rule}`}>
      <DezoContainer size="wide">
        <DezoReveal>
          <div className="max-w-4xl">
            {data.eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-4">
                {data.eyebrow}
              </p>
            )}
            <h2
              className={`font-display text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.12] ${tone.title}`}
            >
              {data.title}
            </h2>
            {data.body && (
              <p className={`mt-6 text-base sm:text-lg leading-relaxed max-w-2xl ${tone.body}`}>
                {data.body}
              </p>
            )}
            {(data.primaryCta || data.secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {data.primaryCta && (
                  <DezoButton
                    href={data.primaryCta.href}
                    variant={data.primaryCta.variant === 'outline' ? 'outline' : 'primary'}
                    size="sm"
                  >
                    {data.primaryCta.label}
                  </DezoButton>
                )}
                {data.secondaryCta && (
                  <DezoButton href={data.secondaryCta.href} variant="outline" size="sm">
                    {data.secondaryCta.label}
                  </DezoButton>
                )}
              </div>
            )}
          </div>
        </DezoReveal>
      </DezoContainer>
    </DezoSection>
  );
}

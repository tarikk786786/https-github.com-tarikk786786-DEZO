'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { BannerBase } from '@/content/banners';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoReveal, DezoMagnetic } from '@/lib/motion/MotionAdapter';
import { bannerToneClasses } from './bannerTone';

export function CTASection({ data }: { data: BannerBase }) {
  const tone = bannerToneClasses(data.tone);

  return (
    <DezoSection spacing="relaxed" className={tone.section}>
      <DezoContainer size="wide">
        <DezoReveal>
          <div className="max-w-2xl">
            {data.eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-4">
                {data.eyebrow}
              </p>
            )}
            <h2
              className={`font-display text-3xl sm:text-5xl tracking-tight leading-[1.1] mb-5 ${tone.title}`}
            >
              {data.title}
            </h2>
            {data.body && (
              <p className={`text-base leading-relaxed mb-8 max-w-lg ${tone.body}`}>{data.body}</p>
            )}
            <div className="flex flex-wrap gap-3">
              {data.primaryCta && (
                <DezoMagnetic>
                  <DezoButton
                    href={data.primaryCta.href}
                    size="lg"
                    magnetic
                    icon={<ArrowUpRight size={16} className="dezo-cta-arrow" />}
                  >
                    {data.primaryCta.label}
                  </DezoButton>
                </DezoMagnetic>
              )}
              {data.secondaryCta && (
                <DezoMagnetic strength={0.14}>
                  <DezoButton href={data.secondaryCta.href} variant="outline" size="lg" magnetic>
                    {data.secondaryCta.label}
                  </DezoButton>
                </DezoMagnetic>
              )}
            </div>
          </div>
        </DezoReveal>
      </DezoContainer>
    </DezoSection>
  );
}

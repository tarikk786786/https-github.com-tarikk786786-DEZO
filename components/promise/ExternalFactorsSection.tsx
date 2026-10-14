import React from 'react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { externalFactors } from '@/content/promises';

export function ExternalFactorsSection() {
  return (
    <DezoSection spacing="normal">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <DezoReveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                What we cannot control
              </p>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-dezo-text-primary leading-[1.12]">
                External factors stay external
              </h2>
              <p className="mt-5 text-base text-dezo-text-secondary leading-relaxed max-w-md">
                We measure these factors, adapt to them and optimize around them—but we don&apos;t
                pretend to control them.
              </p>
            </DezoReveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {externalFactors.map((factor) => (
                <li
                  key={factor}
                  className="border-t border-dezo-border py-4 text-sm sm:text-base text-dezo-text-primary"
                >
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DezoContainer>
    </DezoSection>
  );
}

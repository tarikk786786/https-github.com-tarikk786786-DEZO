import React from 'react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoReveal, DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';
import { controlledOutcomes } from '@/content/promises';

export function ControlledOutcomeSection() {
  return (
    <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <DezoReveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                What we can promise
              </p>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-dezo-text-primary leading-[1.12]">
                Our strongest guarantees attach to what we control
              </h2>
              <p className="mt-5 text-base text-dezo-text-secondary leading-relaxed max-w-md">
                Delivery, quality, transparency, reporting, tracking, accountability, communication
                and documentation.
              </p>
            </DezoReveal>
          </div>
          <div className="lg:col-span-7">
            <DezoStagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-dezo-border border border-dezo-border" stagger={0.04}>
              {controlledOutcomes.map((item) => (
                <DezoStaggerItem key={item}>
                  <div className="bg-dezo-surface px-4 py-6 min-h-[96px] flex items-end">
                    <p className="font-display text-lg sm:text-xl text-dezo-text-primary tracking-tight">
                      {item}
                    </p>
                  </div>
                </DezoStaggerItem>
              ))}
            </DezoStagger>
          </div>
        </div>
      </DezoContainer>
    </DezoSection>
  );
}

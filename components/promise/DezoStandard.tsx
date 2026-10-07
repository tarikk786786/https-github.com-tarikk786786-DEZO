'use client';

import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { dezoStandard } from '@/content/standards';

export function DezoStandard({ id = 'dezo-standard' }: { id?: string }) {
  const [open, setOpen] = useState<string | null>(dezoStandard.steps[0]?.number ?? null);
  const baseId = useId();

  return (
    <DezoSection spacing="normal" id={id} className="bg-dezo-bg-warm border-y border-dezo-border">
      <DezoContainer size="wide">
        <DezoReveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
            {dezoStandard.badge}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-dezo-text-primary max-w-2xl leading-[1.12]">
            {dezoStandard.title}
          </h2>
          <p className="mt-4 text-base text-dezo-text-secondary max-w-xl">
            {dezoStandard.subtitle}
          </p>
        </DezoReveal>

        <ol className="mt-12 divide-y divide-dezo-border border-y border-dezo-border">
          {dezoStandard.steps.map((step) => {
            const isOpen = open === step.number;
            return (
              <li key={step.number}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${baseId}-${step.number}`}
                  onClick={() => setOpen(isOpen ? null : step.number)}
                  className="w-full text-left grid grid-cols-12 gap-4 py-6 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dezo-primary"
                >
                  <span className="col-span-2 sm:col-span-1 font-mono text-xs text-dezo-text-muted pt-1">
                    {step.number}
                  </span>
                  <span className="col-span-8 sm:col-span-10 font-display text-xl sm:text-2xl text-dezo-text-primary">
                    {step.title}
                  </span>
                  <span className="col-span-2 sm:col-span-1 flex justify-end pt-1">
                    <ChevronDown
                      size={18}
                      className={`text-dezo-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </span>
                  {isOpen && (
                    <div
                      id={`${baseId}-${step.number}`}
                      className="col-span-12 sm:col-span-10 sm:col-start-2 pb-2"
                    >
                      <p className="text-sm text-dezo-text-secondary leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </DezoContainer>
    </DezoSection>
  );
}

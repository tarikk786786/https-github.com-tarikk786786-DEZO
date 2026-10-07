import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { promiseCta } from '@/content/promises';

export function PromiseCTA() {
  return (
    <DezoSection spacing="relaxed">
      <DezoContainer size="wide">
        <DezoReveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl tracking-tight leading-[1.1] text-dezo-text-primary mb-5">
              {promiseCta.title}
            </h2>
            <p className="text-dezo-text-secondary text-base leading-relaxed mb-8 max-w-lg">
              {promiseCta.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <DezoButton
                href={promiseCta.primary.href}
                size="lg"
                icon={<ArrowUpRight size={16} />}
              >
                {promiseCta.primary.label}
              </DezoButton>
              <DezoButton href={promiseCta.secondary.href} variant="outline" size="lg">
                {promiseCta.secondary.label}
              </DezoButton>
            </div>
          </div>
        </DezoReveal>
      </DezoContainer>
    </DezoSection>
  );
}

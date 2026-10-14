import React from 'react';
import type { Metadata } from 'next';
import { CTASection } from '@/components/dezo/visual';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoReveal, DezoHeroMotion, DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';
import { finalCtaBanner } from '@/content/banners';
import { engagementPlans } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Pricing — START / GROW / SCALE / CUSTOM',
  description:
    'DEZO engagement packages for launch and growth. Exact pricing after a short diagnostic—no vanity rates.',
  canonicalUrl: 'https://dezo.in/pricing',
});

export default function PricingPage() {
  return (
    <>
      <div className="pt-28 sm:pt-32 pb-8">
        <DezoContainer size="wide">
          <DezoHeroMotion>
            <p
              data-hero-item
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-4"
            >
              Pricing
            </p>
            <h1
              data-hero-item
              className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.08] text-dezo-text-primary mb-5 max-w-3xl"
            >
              Clear packages for a new growth company
            </h1>
            <p
              data-hero-item
              className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-2xl"
            >
              START · GROW · SCALE · CUSTOM. Exact pricing after a short diagnostic — no published
              vanity rates.
            </p>
          </DezoHeroMotion>
        </DezoContainer>
      </div>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoStagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dezo-border border border-dezo-border"
            stagger={0.06}
          >
            {engagementPlans.map((plan) => (
              <DezoStaggerItem key={plan.name}>
                <div className="h-full p-6 sm:p-8 bg-dezo-surface flex flex-col">
                  <p className="font-display text-2xl sm:text-3xl text-dezo-text-primary mb-4">
                    {plan.name}
                  </p>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed flex-1">
                    {plan.blurb}
                  </p>
                  <DezoButton href="/start-a-project" size="sm" className="mt-8 w-fit">
                    Choose {plan.name}
                  </DezoButton>
                </div>
              </DezoStaggerItem>
            ))}
          </DezoStagger>

          <DezoReveal delay={0.1}>
            <div className="mt-14 max-w-2xl">
              <DezoHeading
                badge="How pricing works"
                as="h2"
                subtitle="We scope after understanding your business—not before."
              >
                Diagnostic first
              </DezoHeading>
              <ul className="mt-8 space-y-3 text-sm text-dezo-text-secondary">
                <li className="border-t border-dezo-border pt-3">
                  01 — Share your goals and current stack
                </li>
                <li className="border-t border-dezo-border pt-3">
                  02 — We propose START / GROW / SCALE / CUSTOM
                </li>
                <li className="border-t border-dezo-border pt-3">
                  03 — Fixed or monthly scope with clear deliverables
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <DezoButton href="/contact" size="lg">
                  Request an estimate
                </DezoButton>
                <DezoButton href="/start-a-project" variant="outline" size="lg">
                  Start a Project
                </DezoButton>
              </div>
            </div>
          </DezoReveal>
        </DezoContainer>
      </DezoSection>

      <CTASection data={finalCtaBanner} />
    </>
  );
}

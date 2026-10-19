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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A]"
            stagger={0.06}
          >
            {engagementPlans.map((plan, i) => (
              <DezoStaggerItem key={plan.name}>
                <div className="h-full p-6 sm:p-8 bg-white border-b sm:border-b-0 sm:border-r-2 border-dezo-ink last:border-b-0 sm:last:border-r-0 flex flex-col justify-between hover:bg-dezo-bg-warm transition-colors">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-dezo-primary block mb-3">
                      PLAN // 0{i + 1}
                    </span>
                    <p className="font-display text-2xl sm:text-3xl font-black text-dezo-text-primary mb-4">
                      {plan.name}
                    </p>
                    <p className="text-sm text-dezo-text-secondary leading-relaxed">
                      {plan.blurb}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t-2 border-dezo-ink/10">
                    <DezoButton href="/start-a-project" size="sm" className="w-full">
                      Choose {plan.name} //
                    </DezoButton>
                  </div>
                </div>
              </DezoStaggerItem>
            ))}
          </DezoStagger>

          <DezoReveal delay={0.1}>
            <div className="mt-14 max-w-2xl border-2 border-dezo-ink bg-white p-8 shadow-[4px_4px_0_0_#0B0B0A]">
              <DezoHeading
                badge="OPERATING PROTOCOL"
                as="h2"
                subtitle="We scope after understanding your business—not before."
              >
                Diagnostic first
              </DezoHeading>
              <ul className="mt-8 space-y-3 font-mono text-xs sm:text-sm text-dezo-text-secondary">
                <li className="border-t-2 border-dezo-ink/10 pt-3 flex items-start gap-3">
                  <span className="text-dezo-primary font-bold">[01]</span>
                  <span>Share your goals, market bottlenecks, and current stack</span>
                </li>
                <li className="border-t-2 border-dezo-ink/10 pt-3 flex items-start gap-3">
                  <span className="text-dezo-primary font-bold">[02]</span>
                  <span>We assemble the stack: START / GROW / SCALE / CUSTOM</span>
                </li>
                <li className="border-t-2 border-dezo-ink/10 pt-3 flex items-start gap-3">
                  <span className="text-dezo-primary font-bold">[03]</span>
                  <span>Fixed or monthly scope with clear deliverables and KPIs</span>
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

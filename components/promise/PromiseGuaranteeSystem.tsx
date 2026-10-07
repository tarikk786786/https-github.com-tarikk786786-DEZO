import React from 'react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { promiseItems } from '@/content/promises';
import { PromiseHero } from './PromiseHero';
import { PromiseList } from './PromiseList';
import { ControlledOutcomeSection } from './ControlledOutcomeSection';
import { ExternalFactorsSection } from './ExternalFactorsSection';
import { GuaranteeDisclosure } from './GuaranteeDisclosure';
import { DezoStandard } from './DezoStandard';
import { AccountabilityPreview } from './AccountabilityPreview';
import { TrustEvidence } from './TrustEvidence';
import { PromiseCTA } from './PromiseCTA';
import { servicePromises } from '@/content/service-promises';

/** Full Promise & Guarantee experience for /promise */
export function PromiseGuaranteeSystem() {
  return (
    <>
      <PromiseHero />

      <DezoSection spacing="normal" id="promises">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Guarantees"
              as="h2"
              subtitle="We guarantee execution, transparency, accountability and quality—not uncontrollable business outcomes."
            >
              Ten commitments. Zero hype.
            </DezoHeading>
          </DezoReveal>
          <div className="mt-12">
            <PromiseList items={promiseItems} />
          </div>
          <GuaranteeDisclosure />
        </DezoContainer>
      </DezoSection>

      <ControlledOutcomeSection />
      <ExternalFactorsSection />

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border" id="service-promises">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="By service"
              as="h2"
              subtitle="Each discipline carries a clear execution promise—never a fabricated outcome guarantee."
            >
              Service-specific promises
            </DezoHeading>
          </DezoReveal>
          <ul className="mt-12 divide-y divide-dezo-border border-y border-dezo-border">
            {servicePromises.map((sp) => (
              <li key={sp.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-7">
                <p className="lg:col-span-3 font-mono text-[11px] uppercase tracking-wider text-dezo-text-muted pt-1">
                  {sp.slug.replace(/-/g, ' ')}
                </p>
                <div className="lg:col-span-9">
                  <h3 className="font-display text-xl sm:text-2xl text-dezo-text-primary mb-2">
                    {sp.statement}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{sp.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </DezoContainer>
      </DezoSection>

      <DezoStandard />
      <AccountabilityPreview />
      <TrustEvidence />
      <PromiseCTA />
    </>
  );
}

/** Compact homepage teaser for The DEZO Standard */
export function PromiseHomeTeaser() {
  return (
    <DezoSection spacing="normal" className="bg-dezo-ink text-dezo-text-inverse">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-4">
              The DEZO Standard
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.12] text-white">
              We guarantee what we control.
            </h2>
            <p className="mt-5 text-base text-white/60 leading-relaxed max-w-xl">
              Defined scope, documented deliverables, quality assurance, transparent reporting,
              implementation accountability and clear communication. We do not guarantee outcomes
              controlled by algorithms, auctions, marketplaces or market conditions.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <a
              href="/promise"
              className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-white/40 pb-0.5 hover:border-dezo-primary hover:text-dezo-primary transition-colors"
            >
              Read the full promise system →
            </a>
          </div>
        </div>
      </DezoContainer>
    </DezoSection>
  );
}

export {
  PromiseHero,
  PromiseList,
  ControlledOutcomeSection,
  ExternalFactorsSection,
  GuaranteeDisclosure,
  DezoStandard,
  AccountabilityPreview,
  TrustEvidence,
  PromiseCTA,
};

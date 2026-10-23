import React from 'react';
import Link from 'next/link';
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
import { WebsiteConfidencePromise } from '@/components/dezo/pricing/WebsiteConfidencePromise';

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
      <DezoSection spacing="compact" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <WebsiteConfidencePromise />
        </DezoContainer>
      </DezoSection>
      <AccountabilityPreview />
      <TrustEvidence />
      <PromiseCTA />
    </>
  );
}

/** Compact homepage teaser for The DEZO Standard */
export function PromiseHomeTeaser() {
  return (
    <DezoSection spacing="normal" className="bg-dezo-ink text-white border-y-2 border-dezo-ink">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dezo-primary px-2.5 py-1 bg-white/10 border border-dezo-primary inline-block mb-4">
              The DEZO Standard · 10 Written Commitments
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-white uppercase">
              We guarantee what we control.
            </h2>
            <p className="mt-4 text-xs sm:text-sm font-mono text-gray-300 leading-relaxed max-w-xl">
              Defined Scope Lock, working staging preview, 10-point Quality Assurance, transparent reporting, full Git source-code handover, and a written 30-day post-launch warranty.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/promise"
              className="px-6 py-3 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-all shadow-dezo-soft border border-dezo-primary inline-block text-center"
            >
              Read Full Guarantee &amp; Warranties &rarr;
            </Link>
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

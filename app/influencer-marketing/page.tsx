import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  influencerPositioning,
  influencerServices,
  collaborationTypes,
  brandWorkflow,
  creatorWorkflow,
  influencerFaqs,
  dualPaths,
} from '@/content/influencer';

export const metadata: Metadata = constructMetadata({
  title: 'Influencer Marketing & Creator Partnerships',
  description:
    'DEZO connects brands with Instagram, YouTube, UGC and regional creators — campaign management from discovery to reporting across India.',
  canonicalUrl: 'https://dezo.in/influencer-marketing',
});

export default function InfluencerMarketingPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoHeading
            badge={influencerPositioning.division}
            as="h1"
            subtitle={influencerPositioning.heroBody}
          >
            {influencerPositioning.heroTitle}
          </DezoHeading>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <DezoButton href={influencerPositioning.primaryBrandCta.href} size="lg">
              {influencerPositioning.primaryBrandCta.label}
            </DezoButton>
            <DezoButton
              href={influencerPositioning.primaryCreatorCta.href}
              variant="outline"
              size="lg"
            >
              {influencerPositioning.primaryCreatorCta.label}
            </DezoButton>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-dezo-text-muted leading-relaxed">
            Opportunity volume is a network development target as client demand grows — not a guaranteed paid-job count
            for every creator. We guarantee process and transparent communication.
          </p>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dualPaths.map((path) => (
              <Link
                key={path.id}
                href={path.href}
                className="group block border border-dezo-border p-8 hover:border-dezo-primary transition-colors"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                  {path.eyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-dezo-text-primary mb-3 group-hover:text-dezo-primary transition-colors">
                  {path.title}
                </h2>
                <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">{path.body}</p>
                <span className="text-sm font-semibold text-dezo-primary">{path.cta} →</span>
              </Link>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoHeading badge="Services" as="h2" subtitle="Creator partnerships inside BUILD. MARKET. GROW.">
            Influencer marketing capabilities
          </DezoHeading>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dezo-border border border-dezo-border">
            {influencerServices.map((svc) => (
              <article key={svc.slug} className="bg-dezo-bg p-6 sm:p-7">
                <h3 className="font-display text-lg text-dezo-text-primary mb-2">{svc.name}</h3>
                <p className="text-sm text-dezo-text-secondary leading-relaxed">{svc.summary}</p>
              </article>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoHeading badge="Models" as="h2" subtitle="Creators select what they accept. Brands filter by budget and terms.">
            Collaboration types
          </DezoHeading>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {collaborationTypes.map((c) => (
              <div key={c.id} className="border border-dezo-border bg-dezo-surface p-5">
                <h3 className="font-display text-xl text-dezo-text-primary mb-1">{c.name}</h3>
                <p className="text-sm text-dezo-text-secondary">{c.summary}</p>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl mb-6">How brands launch</h2>
              <ol className="space-y-5">
                {brandWorkflow.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="font-mono text-xs text-dezo-primary shrink-0 mt-1">{s.step}</span>
                    <div>
                      <p className="font-display text-lg">{s.title}</p>
                      <p className="text-sm text-dezo-text-secondary mt-1">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <DezoButton href="/campaigns/launch">Launch a Campaign</DezoButton>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl mb-6">How creators join</h2>
              <ol className="space-y-5">
                {creatorWorkflow.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="font-mono text-xs text-dezo-primary shrink-0 mt-1">{s.step}</span>
                    <div>
                      <p className="font-display text-lg">{s.title}</p>
                      <p className="text-sm text-dezo-text-secondary mt-1">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <DezoButton href="/creators/register" variant="outline">
                  Join as a Creator
                </DezoButton>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoHeading badge="FAQ" as="h2">
            Straight answers
          </DezoHeading>
          <dl className="mt-10 divide-y divide-dezo-border border-y border-dezo-border max-w-3xl">
            {influencerFaqs.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="font-display text-lg text-dezo-text-primary mb-2">{item.q}</dt>
                <dd className="text-sm text-dezo-text-secondary leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

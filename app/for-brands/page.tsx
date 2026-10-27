import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  brandWorkflow,
  campaignTransparencyChecklist,
  influencerServices,
  influencerPositioning,
} from '@/content/influencer';

export const metadata: Metadata = constructMetadata({
  title: 'For Brands — Influencer Campaigns',
  description:
    'Launch influencer, UGC and affiliate campaigns with DEZO. Brief intake, creator shortlists, delivery tracking and reporting.',
  canonicalUrl: 'https://dezo.in/for-brands',
});

export default function ForBrandsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoHeading
            badge="For brands"
            as="h1"
            subtitle={influencerPositioning.brandPromise}
          >
            Find creators. Launch campaigns. Measure delivery.
          </DezoHeading>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <DezoButton href="/campaigns/launch" size="lg">
              Launch a Campaign
            </DezoButton>
            <DezoButton href="/influencer-marketing" variant="outline" size="lg">
              View services
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl mb-8">What brands can request</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {influencerServices.map((s) => (
              <li key={s.slug} className="border border-dezo-border p-5">
                <p className="font-display text-lg">{s.name}</p>
                <p className="text-sm text-dezo-text-secondary mt-1">{s.summary}</p>
              </li>
            ))}
          </ul>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl mb-8">Campaign workflow</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandWorkflow.map((s) => (
              <li key={s.step} className="border-t border-dezo-border pt-4">
                <p className="font-mono text-[11px] text-dezo-primary mb-2">{s.step}</p>
                <p className="font-display text-xl mb-2">{s.title}</p>
                <p className="text-sm text-dezo-text-secondary">{s.body}</p>
              </li>
            ))}
          </ol>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y border-dezo-border">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl mb-4">Every campaign must disclose</h2>
          <p className="text-sm text-dezo-text-secondary max-w-2xl mb-8">
            Transparent terms before creators apply or content ships.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
            {campaignTransparencyChecklist.map((item) => (
              <li key={item} className="text-sm text-dezo-text-primary border-l-2 border-dezo-primary pl-3">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <DezoButton href="/campaigns/launch" size="lg">
              Submit a campaign brief
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

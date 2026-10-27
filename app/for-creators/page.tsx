import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  creatorWorkflow,
  collaborationTypes,
  influencerPositioning,
  influencerFaqs,
} from '@/content/influencer';

export const metadata: Metadata = constructMetadata({
  title: 'For Creators — Join the DEZO Network',
  description:
    'Register as a DEZO creator. List niches and collaboration types, apply to eligible campaigns, and track deliverables. No registration fee.',
  canonicalUrl: 'https://dezo.in/for-creators',
});

export default function ForCreatorsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoHeading
            badge="For creators"
            as="h1"
            subtitle={influencerPositioning.creatorPromise}
          >
            A professional network — not a vague promise of easy money.
          </DezoHeading>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <DezoButton href="/creators/register" size="lg">
              Join as a Creator
            </DezoButton>
            <DezoButton href="/influencer-marketing" variant="outline" size="lg">
              How campaigns work
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl mb-8">Creator workflow</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorWorkflow.map((s) => (
              <li key={s.step} className="border-t border-dezo-border pt-4">
                <p className="font-mono text-[11px] text-dezo-primary mb-2">{s.step}</p>
                <p className="font-display text-xl mb-2">{s.title}</p>
                <p className="text-sm text-dezo-text-secondary">{s.body}</p>
              </li>
            ))}
          </ol>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl mb-4">Select the work you accept</h2>
          <p className="text-sm text-dezo-text-secondary max-w-2xl mb-8">
            Paid, barter, free product, affiliate and hybrid — labeled honestly on every brief.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collaborationTypes.map((c) => (
              <div key={c.id} className="border border-dezo-border p-5">
                <p className="font-display text-lg">{c.name}</p>
                <p className="text-sm text-dezo-text-secondary mt-1">{c.summary}</p>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y border-dezo-border">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl mb-6">Important</h2>
          <ul className="space-y-3 text-sm text-dezo-text-secondary max-w-3xl">
            <li>No mandatory registration fee to access opportunities.</li>
            <li>
              Building capacity for 10–15+ suitable opportunities over time is a network goal — not a promise of that
              many paid jobs for each creator every month.
            </li>
            <li>Sponsored content must follow ASCI and platform disclosure rules.</li>
            <li>Creator portal dashboards (assignments, invoices) ship after intake; registration starts the pipeline now.</li>
          </ul>
          <div className="mt-10">
            <DezoButton href="/creators/register" size="lg">
              Register your creator profile
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl mb-8">FAQ</h2>
          <dl className="divide-y divide-dezo-border border-y border-dezo-border max-w-3xl">
            {influencerFaqs.slice(0, 3).map((item) => (
              <div key={item.q} className="py-5">
                <dt className="font-display text-lg mb-2">{item.q}</dt>
                <dd className="text-sm text-dezo-text-secondary">{item.a}</dd>
              </div>
            ))}
          </dl>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

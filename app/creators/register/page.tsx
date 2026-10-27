import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { CreatorRegisterForm } from '@/components/influencer/CreatorRegisterForm';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Creator Registration',
  description:
    'Join the DEZO creator network. No registration fee. List niches, platforms and collaboration types to be matched to eligible campaigns.',
  canonicalUrl: 'https://dezo.in/creators/register',
});

export default function CreatorRegisterPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen bg-dezo-bg">
      <DezoSection spacing="compact">
        <DezoContainer size="default">
          <DezoHeading
            badge="Creator intake"
            as="h1"
            subtitle="Register your profile to enter the matching pipeline. Opportunity volume depends on live client demand — we do not promise a fixed number of paid jobs."
          >
            Join as a creator
          </DezoHeading>
          <div className="mt-10 border border-dezo-border bg-dezo-surface p-6 sm:p-10">
            <CreatorRegisterForm />
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

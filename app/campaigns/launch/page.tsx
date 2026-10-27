import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { CampaignInquiryForm } from '@/components/influencer/CampaignInquiryForm';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Launch a Campaign',
  description:
    'Submit an influencer or UGC campaign brief to DEZO. Qualification, proposal and creator shortlist follow within business hours.',
  canonicalUrl: 'https://dezo.in/campaigns/launch',
});

export default function LaunchCampaignPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen bg-dezo-bg">
      <DezoSection spacing="compact">
        <DezoContainer size="default">
          <DezoHeading
            badge="Brand inquiry"
            as="h1"
            subtitle="Tell us the objective, budget model and deliverables. We qualify the brief before sourcing creators — no invented reach numbers."
          >
            Launch a campaign brief
          </DezoHeading>
          <div className="mt-10 border border-dezo-border bg-dezo-surface p-6 sm:p-10">
            <CampaignInquiryForm />
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

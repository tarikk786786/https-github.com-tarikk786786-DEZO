import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoQualificationFunnel } from '@/components/dezo/DezoQualificationFunnel';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Start a Project',
  description: 'Qualify your project with DEZO. Channel diagnostic and strategy routing.',
  canonicalUrl: 'https://dezo.in/start-a-project',
});

export default function StartAProjectPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="default">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <DezoHeading
              badge="Start a project"
              as="h1"
              align="center"
              subtitle="Tell us about your brand, channels, and targets. We diagnose readiness before your strategy call."
            >
              Project intake
            </DezoHeading>
          </div>
          <div className="dezo-section-rule my-10 max-w-md mx-auto" />
          <DezoQualificationFunnel />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

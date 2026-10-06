import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoQualificationFunnel } from '@/components/dezo/DezoQualificationFunnel';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Start a Project · Commercial Qualification Funnel',
  description:
    'Qualify your project with DEZO Growth OS. Receive instant channel diagnostics and direct strategy assignment with studio leadership.',
  canonicalUrl: 'https://dezo.in/start-a-project',
});

export default function StartAProjectPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="default">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <DezoHeading
              badge="Project Intake & Diagnostic"
              as="h1"
              align="center"
              subtitle="Tell us about your brand, channels, and commercial targets. Our intake algorithm diagnoses channel readiness before your strategy call."
            >
              Let's Build Something That Scales
            </DezoHeading>
          </div>

          <DezoQualificationFunnel />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

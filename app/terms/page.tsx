import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service governing engineering contracts, marketplace management, and consulting services.',
  canonicalUrl: 'https://dezo.in/terms',
});

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="narrow">
          <DezoHeading as="h1" badge="Legal & Compliance">
            Terms of Service
          </DezoHeading>

          <div className="mt-8 flex flex-col gap-6 text-sm text-dezo-text-secondary leading-relaxed">
            <p>
              By accessing DEZO.in or engaging DEZO for engineering, brand, or marketplace services, you agree to these commercial terms.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">1. Scope of Engagement</h3>
            <p>
              All software development, design, and growth marketing services are governed by formal statements of work (SOW) executed between DEZO and the client.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">2. Intellectual Property</h3>
            <p>
              Custom application code, design systems, and brand assets created specifically for clients are transferred upon complete settlement of invoices, excluding DEZO’s proprietary internal frameworks, adapters, and Growth OS telemetry engines.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">3. Governing Jurisdiction</h3>
            <p>
              Commercial agreements and dispute resolutions are subject to the exclusive jurisdiction of the competent courts in Bhubaneswar, Odisha, India.
            </p>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

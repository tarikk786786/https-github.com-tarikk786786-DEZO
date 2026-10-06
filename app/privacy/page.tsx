import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy',
  description: 'DEZO Privacy Policy regarding client data, telemetry, and business confidentiality.',
  canonicalUrl: 'https://dezo.in/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="narrow">
          <DezoHeading as="h1" badge="Legal & Compliance">
            Privacy Policy
          </DezoHeading>

          <div className="mt-8 flex flex-col gap-6 text-sm text-dezo-text-secondary leading-relaxed">
            <p>
              Last updated: October 2026. DEZO (operating as dezo.in) is dedicated to safeguarding commercial confidentiality and client telemetry.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">1. Information We Collect</h3>
            <p>
              We collect information provided directly through our project qualification forms, contact requests, and authorized marketplace API connections (such as Amazon SP-API and Flipkart Ads). We do not sell or lease commercial data to third-party data brokers.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">2. Marketplace & Advertising Data</h3>
            <p>
              When clients grant authorized access to advertising accounts (Meta Ads, Google Ads) or seller portals (Amazon, Flipkart), credentials and access tokens are secured under enterprise encryption protocols. Data is accessed solely for authorized optimization, reporting, and campaign management purposes.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">3. Contact & NDA Inquiries</h3>
            <p>
              For privacy or data access inquiries, contact our data protection team directly at <a href="mailto:contact@dezo.in" className="text-dezo-accent underline">contact@dezo.in</a>.
            </p>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

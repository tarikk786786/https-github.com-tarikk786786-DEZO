import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Commercial Disclaimer & Outcome Transparency',
  description: 'Commercial performance disclaimer regarding marketplace algorithms, advertising ROAS, and third-party platform policies.',
  canonicalUrl: 'https://dezo.in/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="narrow">
          <DezoHeading as="h1" badge="Outcome Transparency">
            Commercial Disclaimer
          </DezoHeading>

          <div className="mt-8 flex flex-col gap-6 text-sm text-dezo-text-secondary leading-relaxed">
            <div className="p-5 rounded-dezo-md bg-dezo-surface border border-dezo-border text-dezo-text-primary text-xs font-semibold">
              ⚠️ Important Notice Regarding Commercial Guarantees & Platform Policies
            </div>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-2">1. No Guaranteed Sales or Ranking Outcomes</h3>
            <p>
              DEZO provides high-level engineering, conversion design, advertising management, and marketplace optimization based on documented industry best practices. However, commercial outcomes, return on ad spend (ROAS), search rankings, and sales volume inevitably depend on macroeconomic factors, product pricing, competitive saturation, inventory availability, and third-party platform algorithm updates.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">2. Third-Party Platform Policies</h3>
            <p>
              Marketplaces (including Amazon India, Flipkart, Meesho) and advertising channels (Meta Ads, Google Ads) operate under their own autonomous terms of service, editorial policies, and fee structures. DEZO does not own or control these platforms and cannot guarantee immunity against platform-wide policy adjustments, catalog suppressions, or account verification delays mandated by those entities.
            </p>

            <h3 className="text-lg font-bold text-dezo-text-primary mt-4">3. Verified Case Study Metrics</h3>
            <p>
              All performance metrics, ROAS benchmarks, and revenue figures cited across DEZO case studies reflect specific historical client results achieved under defined parameters. They do not constitute an explicit projection or guarantee for future campaigns.
            </p>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

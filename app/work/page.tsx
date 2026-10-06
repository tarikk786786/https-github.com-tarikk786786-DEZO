import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Client Work & Portfolio',
  description:
    'Explore 100+ verified live websites, ecommerce architectures, and digital portals engineered by DEZO.',
  canonicalUrl: 'https://dezo.in/work',
});

export default function WorkPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-12">
            <DezoHeading
              badge="Portfolio"
              as="h1"
              subtitle="Browse through over 100 live client deployments across retail, healthcare, corporate, real estate, and education."
            >
              Proven Results Across Real Industries
            </DezoHeading>
          </div>

          <DezoWorkGallery initialLimit={18} />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

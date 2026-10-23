import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoServiceDirectory } from '@/components/dezo/services/DezoServiceDirectory';
import { CTASection, ServiceBanner } from '@/components/dezo/visual';
import { servicesIndexBanner, finalCtaBanner } from '@/content/banners';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/jsonld';

export const metadata: Metadata = constructMetadata({
  title: 'Services Directory — Digital Growth, SEO, Web & Marketplaces | DEZO',
  description:
    'Searchable directory of DEZO digital growth services across 12 primary departments: Web Development, SEO, Paid Ads, Social, Branding, Amazon, Lead Generation, WhatsApp CRM, and Analytics.',
  canonicalUrl: 'https://dezo.in/services',
});

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ServiceBanner data={servicesIndexBanner} />

      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <DezoServiceDirectory />
        </DezoContainer>
      </DezoSection>

      <CTASection
        data={{
          ...finalCtaBanner,
          id: 'services-growth-plan',
          eyebrow: 'Not sure where to start?',
          title: 'Build a growth plan with DEZO',
          body: 'Tell us your business type and goal — we assemble the stack, timeline, and next step.',
          primaryCta: { label: 'Build My Growth Plan', href: '/start-a-project', variant: 'primary' },
          secondaryCta: { label: 'Open DEZO LAB', href: '/growth-lab', variant: 'outline' },
          tone: 'ink',
        }}
      />
    </>
  );
}

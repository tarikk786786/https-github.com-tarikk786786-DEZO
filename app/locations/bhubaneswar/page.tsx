import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Mail, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema } from '@/lib/seo/jsonld';

export const metadata: Metadata = constructMetadata({
  title: 'Web Development & Digital Growth Agency in Bhubaneswar, Odisha',
  description:
    'DEZO is Bhubaneswar’s leading digital engineering and commerce technology company located in Patia. High-speed websites, ecommerce, Amazon & Flipkart management, and performance ads.',
  canonicalUrl: 'https://dezo.in/locations/bhubaneswar',
});

export default function BhubaneswarLocationPage() {
  const localSchema = generateLocalBusinessSchema();

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-12">
            <DezoHeading
              badge="Bhubaneswar Studio · Patia"
              as="h1"
              subtitle="Direct engineering and performance marketing partnerships for companies located across Bhubaneswar, Cuttack, and the Odisha capital region."
            >
              Bhubaneswar's Premier Digital Commerce & Growth Studio
            </DezoHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
              <p>
                From our studio located in Patia, Bhubaneswar, we collaborate directly with local business owners, healthcare leaders, coaching institutes, and manufacturing executives who want high-performance digital results without dealing with remote agency delays.
              </p>
              <p>
                Whether you need a high-speed Next.js corporate portal, a direct-to-consumer Shopify storefront, Amazon and Flipkart seller scaling, or Google Local 3-Pack search dominance across Bhubaneswar, we are just a phone call or in-person meeting away.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <DezoButton href="/contact" size="md">
                  Visit Our Patia Studio
                </DezoButton>
                <DezoButton href="/locations/odisha" variant="secondary" size="md">
                  View All-Odisha Solutions
                </DezoButton>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-dezo-xl bg-dezo-surface border border-dezo-border">
              <div className="flex items-center gap-3 text-dezo-accent mb-4">
                <MapPin size={22} />
                <h3 className="text-lg font-bold text-dezo-text-primary">Studio Address</h3>
              </div>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                Phase 2, Patia<br />
                Bhubaneswar, Odisha<br />
                PIN: 751024, India
              </p>
              <div className="pt-4 border-t border-dezo-border flex flex-col gap-3 text-xs">
                <a href="tel:+919114411026" className="text-dezo-text-primary hover:text-dezo-accent font-semibold flex items-center gap-2">
                  <Phone size={14} className="text-dezo-accent" /> +91 9114411026 / +91 77870 63088
                </a>
                <a href="mailto:contact@dezo.in" className="text-dezo-text-primary hover:text-dezo-accent font-semibold flex items-center gap-2">
                  <Mail size={14} className="text-dezo-accent" /> contact@dezo.in
                </a>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

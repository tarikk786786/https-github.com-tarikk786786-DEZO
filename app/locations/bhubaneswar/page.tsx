import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { ServiceBanner } from '@/components/dezo/visual';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  generateLocalBusinessSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/jsonld';
import { locationBanners } from '@/content/banners';
import { napCanonical } from '@/content/seo/nap';
import { serviceRows, contact } from '@/content/site';

export const metadata: Metadata = constructMetadata({
  title: 'Digital Growth Studio in Bhubaneswar, Odisha',
  description:
    'DEZO builds websites, ecommerce, Amazon & Flipkart programs, SEO and performance marketing from Patia, Bhubaneswar — for local businesses and India-scale brands.',
  canonicalUrl: 'https://dezo.in/locations/bhubaneswar',
});

const faqs = [
  {
    question: 'Where is the DEZO studio in Bhubaneswar?',
    answer: `DEZO operates from ${napCanonical.fullAddress}. Studio visits are by appointment.`,
  },
  {
    question: 'What services does DEZO offer in Bhubaneswar?',
    answer:
      'Web development, ecommerce, SEO and local SEO, Meta and Google ads, Amazon and Flipkart growth, branding, social, and DEZO LAB diagnostics.',
  },
  {
    question: 'Do you only work with Bhubaneswar clients?',
    answer:
      'No. The studio is in Bhubaneswar; we deliver across Odisha and India. Local presence helps for workshops and reviews when useful.',
  },
];

export default function BhubaneswarLocationPage() {
  const localSchema = generateLocalBusinessSchema();
  const faqSchema = generateFaqSchema(faqs);
  const crumbs = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations/odisha' },
    { name: 'Bhubaneswar', path: '/locations/bhubaneswar' },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <ServiceBanner data={locationBanners.bhubaneswar} />

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-5 text-base text-dezo-text-secondary leading-relaxed">
              <p>
                From Patia, we work with founders, manufacturers, healthcare brands, education
                institutions and retailers who need digital systems that sell—not slide decks.
              </p>
              <p>
                Engagements typically combine a commercial website or ecommerce foundation with the
                growth channels that matter: organic search, Meta and Google, and Amazon or Flipkart
                when product distribution requires it.
              </p>
              <p>
                We do not promise map-pack or ranking outcomes we cannot control. We do deliver
                defined scope, measurement, and accountable execution under the{' '}
                <Link href="/promise" className="text-dezo-text-primary border-b border-dezo-border">
                  DEZO Standard
                </Link>
                .
              </p>
            </div>
            <aside className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-dezo-border pt-6 lg:pt-0 lg:pl-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-4">
                Studio NAP
              </p>
              <p className="font-display text-xl text-dezo-text-primary mb-2">{napCanonical.name}</p>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
                {napCanonical.fullAddress}
              </p>
              <p className="text-sm text-dezo-text-primary font-medium">
                <a href={`tel:${contact.phone}`}>{contact.phoneFormatted}</a>
              </p>
              <p className="text-sm text-dezo-text-secondary mt-1">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p className="text-xs text-dezo-text-muted mt-4">{napCanonical.hoursNote}</p>
            </aside>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-dezo-text-primary mb-8">
            Services from Bhubaneswar
          </h2>
          <ul className="divide-y divide-dezo-border border-y border-dezo-border">
            {serviceRows.map((row) => (
              <li key={row.href}>
                <Link
                  href={row.href}
                  className="group grid grid-cols-12 gap-4 py-6 items-start hover:bg-dezo-bg/60 -mx-2 px-2 transition-colors"
                >
                  <span className="col-span-2 sm:col-span-1 font-mono text-xs text-dezo-text-muted">
                    {row.num}
                  </span>
                  <span className="col-span-10 sm:col-span-4 font-display text-lg sm:text-xl text-dezo-text-primary group-hover:text-dezo-primary">
                    {row.name}
                  </span>
                  <span className="col-span-12 sm:col-span-7 text-sm text-dezo-text-secondary leading-relaxed">
                    {row.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <DezoButton href="/work" variant="outline" size="sm">
              Selected work
            </DezoButton>
            <DezoButton href="/growth-lab" variant="outline" size="sm">
              DEZO LAB
            </DezoButton>
            <DezoButton href="/locations/odisha" variant="outline" size="sm">
              Odisha hub
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl text-dezo-text-primary mb-8">FAQ</h2>
          <dl className="max-w-3xl divide-y divide-dezo-border border-y border-dezo-border">
            {faqs.map((f) => (
              <div key={f.question} className="py-6">
                <dt className="font-display text-lg text-dezo-text-primary mb-2">{f.question}</dt>
                <dd className="text-sm text-dezo-text-secondary leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { ServiceBanner } from '@/components/dezo/visual';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  generateServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/jsonld';
import { locationBanners } from '@/content/banners';
import { napCanonical } from '@/content/seo/nap';

export const metadata: Metadata = constructMetadata({
  title: 'Digital Growth for Odisha Businesses | DEZO',
  description:
    'DEZO helps Odisha founders, manufacturers, healthcare, education and retail brands scale with websites, ecommerce, Amazon, Flipkart, SEO and performance marketing — from Bhubaneswar across India.',
  canonicalUrl: 'https://dezo.in/locations/odisha',
});

const sectors = [
  {
    title: 'Education & academies',
    body: 'Admissions sites, local search foundations and lead systems for schools, colleges and coaching.',
  },
  {
    title: 'Healthcare & wellness',
    body: 'Trust-first websites and organic discovery for clinics, hospitals and Ayurveda brands.',
  },
  {
    title: 'Handloom & artisanal D2C',
    body: 'Brand-led ecommerce and marketplace programs for Odisha craft and textile businesses.',
  },
  {
    title: 'Manufacturing & B2B',
    body: 'Catalogs, inquiry systems and national marketplace readiness for industrial sellers.',
  },
  {
    title: 'Retail & local commerce',
    body: 'Storefronts, local SEO and Meta/Google acquisition with measurement discipline.',
  },
  {
    title: 'Real estate & services',
    body: 'Project showcases and high-intent lead journeys without vanity metric theatre.',
  },
];

const faqs = [
  {
    question: 'Where is DEZO based in Odisha?',
    answer: `DEZO is headquartered at ${napCanonical.fullAddress}, serving clients across Odisha and India.`,
  },
  {
    question: 'Do you have separate pages for every Odisha city?',
    answer:
      'No. We maintain strong Bhubaneswar and Odisha hubs. Additional city pages are only published when there is unique content and real service demand — we do not create doorway pages.',
  },
  {
    question: 'Can DEZO help Odisha manufacturers sell on Amazon and Flipkart?',
    answer:
      'Yes — catalog, listings, creative, advertising and reporting. Sales volume and rankings are not guaranteed outside contracted outcomes.',
  },
];

export default function DezoOdishaPage() {
  const serviceSchema = generateServiceSchema(
    'Digital growth services for Odisha businesses',
    'Web engineering, ecommerce, Amazon and Flipkart operations, local SEO and performance marketing for Odisha companies.',
    '/locations/odisha'
  );
  const faqSchema = generateFaqSchema(faqs);
  const crumbs = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Odisha', path: '/locations/odisha' },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <ServiceBanner data={locationBanners.odisha} />

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="max-w-3xl space-y-5 text-base text-dezo-text-secondary leading-relaxed">
            <p>
              Being rooted in Odisha means we understand regional buyer behaviour, manufacturing and
              craft supply chains, and the leap from local reputation to national digital commerce.
            </p>
            <p>
              Secondary cities such as Cuttack, Rourkela, Berhampur and Sambalpur are served through
              this statewide hub until a city deserves its own unique page — not a template with the
              city name swapped.
            </p>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-dezo-text-primary mb-10">
            Sectors we support across Odisha
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {sectors.map((s) => (
              <div key={s.title} className="border-t border-dezo-border pt-5 pr-6 pb-10">
                <h3 className="font-display text-xl text-dezo-text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-dezo-text-secondary leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <h2 className="font-display text-2xl text-dezo-text-primary mb-6">Start here</h2>
          <div className="flex flex-wrap gap-3 mb-12">
            <DezoButton href="/locations/bhubaneswar" size="sm">
              Bhubaneswar studio
            </DezoButton>
            <DezoButton href="/services/web-development" variant="outline" size="sm">
              Web development
            </DezoButton>
            <DezoButton href="/services/amazon" variant="outline" size="sm">
              Amazon growth
            </DezoButton>
            <DezoButton href="/services/seo" variant="outline" size="sm">
              SEO
            </DezoButton>
            <DezoButton href="/growth-lab" variant="outline" size="sm">
              DEZO LAB
            </DezoButton>
            <DezoButton href="/work" variant="outline" size="sm">
              Work
            </DezoButton>
          </div>
          <h2 className="font-display text-2xl text-dezo-text-primary mb-8">FAQ</h2>
          <dl className="max-w-3xl divide-y divide-dezo-border border-y border-dezo-border">
            {faqs.map((f) => (
              <div key={f.question} className="py-6">
                <dt className="font-display text-lg text-dezo-text-primary mb-2">{f.question}</dt>
                <dd className="text-sm text-dezo-text-secondary leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-dezo-text-muted">
            Prefer to talk?{' '}
            <Link href="/contact" className="text-dezo-text-primary border-b border-dezo-border">
              Contact
            </Link>{' '}
            or call{' '}
            <a href={`tel:${napCanonical.phone}`} className="text-dezo-text-primary">
              {napCanonical.phoneFormatted}
            </a>
            .
          </p>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

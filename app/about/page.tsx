import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import { brand, leadership, contact } from '@/content/site';

export const metadata: Metadata = constructMetadata({
  title: 'About',
  description:
    'Introducing DEZO — a new digital growth company founded in Bhubaneswar, Odisha by Tarik Islam.',
  canonicalUrl: 'https://dezo.in/about',
});

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-10">
            <DezoHeading
              badge="About · Introducing DEZO"
              as="h1"
              subtitle={`${brand.launchLine} ${brand.geo}`}
            >
              A new growth company for brands that sell
            </DezoHeading>
          </div>
          <div className="dezo-section-rule mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-7 space-y-6 text-base text-dezo-text-secondary leading-relaxed">
              <p>{brand.thesis}</p>
              <p>
                DEZO builds and operates digital infrastructure for ambitious brands: storefronts,
                brand systems, Amazon and Flipkart growth, and performance marketing — connected as
                one commercial journey.
              </p>
              <p>
                Founded in Bhubaneswar, Odisha, we work with D2C brands, manufacturers, healthcare,
                education, and enterprise teams who need craftsmanship and measurable selling
                systems.
              </p>
              <p>
                Founded and led by{' '}
                <Link
                  href={leadership.primary.profile}
                  className="text-dezo-primary font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {leadership.primary.name}
                </Link>
                , {leadership.primary.role}.
              </p>
            </div>
            <aside className="lg:col-span-5 lg:pl-8 lg:border-l border-dezo-border">
              <div className="flex items-center gap-3 mb-4 text-dezo-primary">
                <MapPin size={18} />
                <h3 className="font-display text-xl text-dezo-text-primary">
                  Bhubaneswar Studio
                </h3>
              </div>
              <p className="text-sm text-dezo-text-secondary mb-4">
                {contact.address.street}, {contact.address.city}
                <br />
                {contact.address.region} {contact.address.postalCode}, India
              </p>
              <p className="text-sm text-dezo-text-primary font-medium">{contact.phoneFormatted}</p>
              <p className="text-sm text-dezo-text-muted">
                <a href={`mailto:${contact.email}`} className="hover:text-dezo-primary">
                  {contact.email}
                </a>
              </p>
              <p className="text-sm text-dezo-text-muted">
                <a href={`mailto:${contact.supportEmail}`} className="hover:text-dezo-primary">
                  {contact.supportEmail}
                </a>
              </p>
            </aside>
          </div>

          <div className="border border-dezo-border bg-dezo-surface p-8 mb-16 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.14em] text-dezo-primary mb-2">
              {leadership.primary.role}
            </p>
            <h3 className="font-display text-2xl mb-3">{leadership.primary.name}</h3>
            <p className="text-sm text-dezo-text-secondary mb-6">{leadership.primary.bio}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <a
                href={leadership.primary.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-dezo-primary"
              >
                tarikislam.in <ArrowUpRight size={14} />
              </a>
              <a
                href={`mailto:${contact.supportEmail}`}
                className="font-mono text-sm text-dezo-text-muted hover:text-dezo-primary"
              >
                {contact.supportEmail}
              </a>
            </div>
          </div>

          <div className="p-10 sm:p-14 border border-dezo-border bg-dezo-surface text-center">
            <h2 className="font-display text-2xl sm:text-4xl mb-4">
              Have a project in mind?
            </h2>
            <p className="text-sm text-dezo-text-secondary max-w-xl mx-auto mb-8">
              Start a conversation with studio leadership.
            </p>
            <DezoButton href="/contact" size="lg">
              Let&apos;s Talk
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

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
  title: 'About DEZO',
  description:
    'DEZO is a digital commerce, brand, marketplace and growth company founded by Tarik Islam in Bhubaneswar, Odisha.',
  canonicalUrl: 'https://dezo.in/about',
});

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-10">
            <DezoHeading
              badge="About"
              as="h1"
              subtitle={`${brand.positioning}. ${brand.geo}`}
            >
              A serious company that handles digital business growth
            </DezoHeading>
          </div>
          <div className="dezo-section-rule mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-7 space-y-6 text-base text-dezo-text-secondary leading-relaxed">
              <p>
                DEZO builds and operates digital infrastructure for ambitious brands: storefronts,
                brand systems, Amazon and Flipkart growth, and performance marketing — connected as
                one commercial journey.
              </p>
              <p>
                Based in Bhubaneswar, Odisha, we work with D2C brands, manufacturers, healthcare,
                education, and enterprise teams who need craftsmanship and measurable selling
                systems.
              </p>
              <p>
                Founding leadership:{' '}
                <Link
                  href={leadership.primary.profile}
                  className="text-dezo-primary font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {leadership.primary.name}
                </Link>
                . Commercial partnership: {leadership.partner.name}.
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
              <p className="text-sm text-dezo-text-muted">{contact.email}</p>
            </aside>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dezo-border border border-dezo-border mb-16">
            <article className="p-8 bg-dezo-surface">
              <p className="text-[11px] uppercase tracking-[0.14em] text-dezo-primary mb-2">
                {leadership.primary.role}
              </p>
              <h3 className="font-display text-2xl mb-3">{leadership.primary.name}</h3>
              <p className="text-sm text-dezo-text-secondary mb-6">{leadership.primary.bio}</p>
              <a
                href={leadership.primary.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-dezo-primary"
              >
                tarikislam.in <ArrowUpRight size={14} />
              </a>
            </article>
            <article className="p-8 bg-dezo-bg">
              <p className="text-[11px] uppercase tracking-[0.14em] text-dezo-text-muted mb-2">
                {leadership.partner.role}
              </p>
              <h3 className="font-display text-2xl mb-3">{leadership.partner.name}</h3>
              <p className="text-sm text-dezo-text-secondary mb-6">{leadership.partner.bio}</p>
              <p className="font-mono text-sm text-dezo-text-muted">{leadership.partner.email}</p>
            </article>
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

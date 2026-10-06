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
    'DEZO is an India-focused digital commerce, brand, marketplace, and growth company founded by Tarik Islam in Bhubaneswar, Odisha.',
  canonicalUrl: 'https://dezo.in/about',
});

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-16">
            <DezoHeading
              badge="About"
              as="h1"
              subtitle={`${brand.positioning}. ${brand.geo}`}
            >
              We build brands that sell — from Odisha to India.
            </DezoHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed">
              <p>
                DEZO is not a generic web agency. We are a digital commerce company: we engineer
                storefronts and software, build brand systems, operate Amazon & Flipkart growth,
                and run performance marketing — connected as one commercial journey.
              </p>
              <p>
                Headquartered in Bhubaneswar, Odisha, we work with D2C brands, manufacturers,
                healthcare, education, and enterprise teams who need craftsmanship and measurable
                selling systems — not template theatre.
              </p>
              <p>
                Founding engineering and product leadership sits with{' '}
                <Link
                  href={leadership.primary.profile}
                  className="text-dezo-primary font-semibold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {leadership.primary.name}
                </Link>
                . Commercial partnership support is provided by {leadership.partner.name}.
              </p>
            </div>

            <div className="lg:col-span-5 p-8 rounded-dezo-lg bg-dezo-surface border border-dezo-border">
              <div className="flex items-center gap-3 mb-6 text-dezo-primary">
                <MapPin size={22} />
                <h3 className="font-display text-xl font-bold text-dezo-text-primary">
                  Bhubaneswar Studio
                </h3>
              </div>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
                {contact.address.street}, {contact.address.city}
                <br />
                {contact.address.region} {contact.address.postalCode}, India
              </p>
              <div className="pt-4 border-t border-dezo-border flex flex-col gap-2 text-sm text-dezo-text-muted">
                <p>{contact.phoneFormatted}</p>
                <p>{contact.email}</p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="max-w-3xl mb-10">
              <DezoHeading
                badge="Leadership"
                as="h2"
                subtitle="Single source of truth for public leadership titles."
              >
                Who leads DEZO
              </DezoHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="flex flex-col justify-between p-7 rounded-dezo-lg border border-dezo-border bg-dezo-surface">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-dezo-primary mb-2">
                    {leadership.primary.role}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-dezo-text-primary mb-3">
                    {leadership.primary.name}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                    {leadership.primary.bio}
                  </p>
                </div>
                <a
                  href={leadership.primary.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary hover:underline pt-4 border-t border-dezo-border"
                >
                  tarikislam.in <ArrowUpRight size={14} />
                </a>
              </article>

              <article className="flex flex-col justify-between p-7 rounded-dezo-lg border border-dezo-border bg-dezo-bg">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-dezo-text-muted mb-2">
                    {leadership.partner.role}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-dezo-text-primary mb-3">
                    {leadership.partner.name}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                    {leadership.partner.bio}
                  </p>
                </div>
                <p className="text-sm text-dezo-text-muted font-mono pt-4 border-t border-dezo-border">
                  {leadership.partner.email}
                </p>
              </article>
            </div>
          </div>

          <div className="p-8 sm:p-14 rounded-dezo-lg bg-dezo-ink text-center flex flex-col items-center text-white">
            <h2 className="font-display text-2xl sm:text-4xl font-bold mb-4">
              Have a project in mind?
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mb-8">
              Tell us what you need to build, brand, list, or grow — we will route the brief to
              studio leadership.
            </p>
            <DezoButton
              href="/start-a-project"
              size="lg"
              className="!bg-white !text-dezo-ink hover:!bg-white/90 !border-white"
            >
              Start a Project
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

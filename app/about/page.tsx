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
    <div className="pt-28 sm:pt-36 pb-24 dezo-paper min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-8">
            <DezoHeading
              badge="About"
              as="h1"
              subtitle={`${brand.positioning}. ${brand.geo}`}
            >
              We build brands that sell — from Odisha to India.
            </DezoHeading>
          </div>

          <div className="dezo-section-rule my-12 sm:my-16" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start mb-24">
            <div className="lg:col-span-7 flex flex-col gap-7 text-base sm:text-lg text-dezo-text-secondary leading-relaxed">
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

            <aside className="lg:col-span-5 lg:pl-8 lg:border-l border-dezo-border">
              <div className="flex items-center gap-3 mb-5 text-dezo-primary">
                <MapPin size={20} />
                <h3 className="font-display text-xl font-bold text-dezo-text-primary tracking-tight">
                  Bhubaneswar Studio
                </h3>
              </div>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                {contact.address.street}, {contact.address.city}
                <br />
                {contact.address.region} {contact.address.postalCode}, India
              </p>
              <div className="pt-5 border-t border-dezo-border flex flex-col gap-2 text-sm text-dezo-text-muted">
                <p className="font-medium text-dezo-text-primary">{contact.phoneFormatted}</p>
                <p>{contact.email}</p>
              </div>
            </aside>
          </div>

          <div className="mb-24">
            <div className="max-w-3xl mb-12">
              <DezoHeading
                badge="Leadership"
                as="h2"
                subtitle="Single source of truth for public leadership titles."
              >
                Who leads DEZO
              </DezoHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dezo-border border border-dezo-border">
              <article className="flex flex-col justify-between p-8 sm:p-10 bg-dezo-surface">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-3">
                    {leadership.primary.role}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary mb-4 tracking-tight">
                    {leadership.primary.name}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-8">
                    {leadership.primary.bio}
                  </p>
                </div>
                <a
                  href={leadership.primary.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary hover:underline pt-5 border-t border-dezo-border"
                >
                  tarikislam.in <ArrowUpRight size={14} />
                </a>
              </article>

              <article className="flex flex-col justify-between p-8 sm:p-10 bg-dezo-bg">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-3">
                    {leadership.partner.role}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary mb-4 tracking-tight">
                    {leadership.partner.name}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-8">
                    {leadership.partner.bio}
                  </p>
                </div>
                <p className="text-sm text-dezo-text-muted font-mono pt-5 border-t border-dezo-border">
                  {leadership.partner.email}
                </p>
              </article>
            </div>
          </div>

          <div className="dezo-ink-field p-10 sm:p-16 text-center flex flex-col items-center text-white">
            <span className="dezo-accent-line !bg-dezo-highlight mb-6" aria-hidden />
            <h2 className="font-display text-2xl sm:text-4xl font-bold mb-4 tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mb-9 leading-relaxed">
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

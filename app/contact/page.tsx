import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoContactForm } from '@/components/dezo/DezoContactForm';
import { constructMetadata } from '@/lib/seo/metadata';
import { contact } from '@/content/site';

export const metadata: Metadata = constructMetadata({
  title: "Let's Talk — Contact DEZO",
  description:
    'Contact DEZO studio leadership. We respond within 24 business hours.',
  canonicalUrl: 'https://dezo.in/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <DezoHeading
                badge="Contact"
                as="h1"
                subtitle="We respond within 24 business hours. Direct access to studio leadership."
              >
                Let&apos;s discuss your project
              </DezoHeading>

              <div className="mt-10 flex flex-col gap-6 text-sm">
                <a href={`tel:${contact.phone}`} className="flex items-start gap-3 group">
                  <Phone size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-dezo-text-muted mb-1">
                      Phone
                    </p>
                    <p className="font-medium text-dezo-text-primary group-hover:text-dezo-primary">
                      {contact.phoneFormatted}
                    </p>
                  </div>
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 group">
                  <Mail size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-dezo-text-muted mb-1">
                      Email
                    </p>
                    <p className="font-medium text-dezo-text-primary group-hover:text-dezo-primary">
                      {contact.email}
                    </p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-dezo-text-muted mb-1">
                      Studio
                    </p>
                    <p className="text-dezo-text-secondary">
                      {contact.address.street}, {contact.address.city}
                      <br />
                      {contact.address.region} {contact.address.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 border border-dezo-border bg-dezo-surface p-6 sm:p-8">
              <DezoContactForm />
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

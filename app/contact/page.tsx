import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoContactForm } from '@/components/dezo/DezoContactForm';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Start a Project / Contact Us',
  description:
    'Initiate a project with DEZO. Connect directly with our studio directors via phone, email, or fast WhatsApp project intake.',
  canonicalUrl: 'https://dezo.in/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Context */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <DezoHeading
                  badge="Initiate"
                  as="h1"
                  subtitle="We respond within 24 business hours. Direct access to our leadership team without administrative layers."
                >
                  Let's Discuss Your Project
                </DezoHeading>

                <div className="mt-10 flex flex-col gap-6 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-dezo-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                        Call / WhatsApp
                      </h4>
                      <a
                        href="tel:+919114411026"
                        className="text-dezo-text-primary hover:text-dezo-accent font-semibold transition-colors"
                      >
                        +91 9114411026
                      </a>
                      <span className="text-dezo-text-muted"> / </span>
                      <a
                        href="tel:+917787063088"
                        className="text-dezo-text-primary hover:text-dezo-accent font-semibold transition-colors"
                      >
                        +91 77870 63088
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-dezo-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                        Inquiries Email
                      </h4>
                      <a
                        href="mailto:contact@dezo.in"
                        className="text-dezo-text-primary hover:text-dezo-accent font-semibold transition-colors block"
                      >
                        contact@dezo.in
                      </a>
                      <a
                        href="mailto:princetarikislam@gmail.com"
                        className="text-dezo-text-secondary hover:text-dezo-accent text-xs transition-colors block mt-0.5"
                      >
                        princetarikislam@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-dezo-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                        Studio Location
                      </h4>
                      <p className="text-dezo-text-secondary leading-relaxed">
                        Phase 2, Patia, Bhubaneswar, Odisha 751024, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-dezo-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                        Working Hours
                      </h4>
                      <p className="text-dezo-text-secondary">
                        Monday – Saturday: 9:00 AM – 7:30 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 rounded-dezo-lg bg-dezo-surface border border-dezo-border flex items-center gap-3 text-xs text-dezo-text-secondary">
                <ShieldCheck size={20} className="text-dezo-accent shrink-0" />
                <span>NDA & Commercial Confidentiality signed upfront upon client request.</span>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card">
                <h3 className="text-xl font-black text-dezo-text-primary mb-6">
                  Project Inquiry Form
                </h3>
                <DezoContactForm />
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

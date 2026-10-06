import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Award, HeartHandshake, MapPin } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'About DEZO & Studio Leadership',
  description:
    'Meet the engineering minds behind DEZO. Founded by Tarik Islam and Rohan Dinkar Sanap, building high-assurance web technologies and commercial growth engines.',
  canonicalUrl: 'https://dezo.in/about',
});

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-16">
            <DezoHeading
              badge="About DEZO"
              as="h1"
              subtitle="An independent digital engineering studio dedicated to craftsmanship, high-assurance web systems, and measurable commercial impact."
            >
              Building The Web With Precision & Purpose
            </DezoHeading>
          </div>

          {/* Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed">
              <p>
                DEZO began with a simple observation: most agency websites look flashier than ever, but load slower than ever and convert poorly. Founders were paying tens of thousands for bloated templates packed with 50 random libraries that broke on mobile and offered zero search visibility.
              </p>
              <p>
                We took the exact opposite approach. We treat every web project as a controlled software engineering problem. We write clean, semantic HTML first, layer minimal and responsive CSS second, and only introduce JavaScript and animation where it genuinely enhances the user experience.
              </p>
              <p>
                Headquartered in Bhubaneswar, Odisha, DEZO partners directly with high-growth startups, established D2C brands, and corporate enterprises across India and global markets.
              </p>
            </div>

            {/* Headquarters Card */}
            <div className="lg:col-span-5 p-8 rounded-dezo-xl bg-dezo-surface border border-dezo-border">
              <div className="flex items-center gap-3 mb-6 text-dezo-accent">
                <MapPin size={24} />
                <h3 className="text-xl font-bold text-dezo-text-primary">Studio Location</h3>
              </div>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
                Phase 2, Patia, Bhubaneswar<br />
                Odisha 751024, India
              </p>
              <div className="pt-4 border-t border-dezo-border flex flex-col gap-2 text-xs text-dezo-text-muted">
                <p>📞 +91 9114411026 / +91 77870 63088</p>
                <p>📧 contact@dezo.in / princetarikislam@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="mb-20">
            <div className="max-w-3xl mb-10">
              <DezoHeading
                badge="Leadership"
                as="h2"
                subtitle="The engineering and executive leadership driving DEZO forward."
              >
                Studio Directors
              </DezoHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DezoCard interactive={false} className="flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-dezo-accent mb-2">
                    Founder & Director
                  </div>
                  <h3 className="text-2xl font-black text-dezo-text-primary mb-3">
                    Tarik Islam
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                    Forensic science specialist, full-stack engineer, and systems architect. Tarik leads engineering standards, security hardening, and high-assurance web development across all DEZO projects.
                  </p>
                </div>
                <div className="text-xs text-dezo-text-muted font-mono pt-4 border-t border-dezo-border">
                  princetarikislam@gmail.com
                </div>
              </DezoCard>

              <DezoCard interactive={false} className="flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-dezo-accent mb-2">
                    Chief Executive Officer
                  </div>
                  <h3 className="text-2xl font-black text-dezo-text-primary mb-3">
                    Rohan Dinkar Sanap
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                    Commercial strategist and growth leader. Rohan spearheads client partnerships, brand positioning, and performance campaign architecture to ensure every project hits its business milestones.
                  </p>
                </div>
                <div className="text-xs text-dezo-text-muted font-mono pt-4 border-t border-dezo-border">
                  contact@dezo.in
                </div>
              </DezoCard>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-8 sm:p-14 rounded-dezo-xl bg-dezo-surface border border-dezo-border text-center flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl font-black text-dezo-text-primary mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-sm sm:text-base text-dezo-text-secondary max-w-xl mb-8">
              Let's talk about your vision, timeline, and how we can engineer a digital system that accelerates your business.
            </p>
            <DezoButton href="/contact" size="lg" magnetic>
              Start a Conversation
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

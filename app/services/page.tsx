import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoServiceDirectory } from '@/components/dezo/services/DezoServiceDirectory';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/jsonld';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Services Directory — Digital Growth, SEO, Web & Marketplaces | DEZO',
  description:
    'Searchable directory of DEZO digital growth services across 12 primary departments: Web Development, SEO, Paid Ads, Social, Branding, Amazon, Lead Generation, WhatsApp CRM, and Analytics.',
  canonicalUrl: 'https://dezo.in/services',
});

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header Banner */}
      <section className="bg-dezo-bg-warm border-b-2 border-dezo-ink pt-32 pb-16">
        <DezoContainer size="wide">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-6">
              <span className="w-2 h-2 bg-dezo-primary shrink-0 animate-pulse" />
              <span>Full Service Catalog · 12 Departments (A - L)</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-dezo-ink tracking-tight uppercase leading-[0.95]">
              Commercial Services. <br />
              <span className="text-dezo-primary">Engineered for Growth.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-2xl">
              We do not believe in fragmented vendor churn. Explore our searchable catalog of website development,
              organic search, paid advertising, marketplace operations, and business automation — delivered under one
              accountable operating cadence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-dezo-text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-dezo-primary" /> Transparent Scope
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-dezo-primary" /> Zero Fabricated Claims
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-dezo-primary" /> Bhubaneswar Studio + India Delivery
              </span>
            </div>
          </div>
        </DezoContainer>
      </section>

      {/* Searchable Service Directory Section */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <DezoServiceDirectory />
        </DezoContainer>
      </DezoSection>

      {/* Need custom recommendation banner */}
      <section className="bg-dezo-ink text-dezo-bg border-t-2 border-dezo-ink py-16">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2">
                Unsure which services fit your growth stage?
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white leading-tight">
                Use our Interactive Growth Plan Builder
              </h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed font-mono">
                Select your business type, primary objective, and location to receive a transparent, rules-based
                recommendation of the exact services, deliverables, and timeline your business needs.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="px-8 py-4 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border border-white/80 hover:bg-white transition-all shadow-dezo-soft inline-flex items-center gap-2"
            >
              Build My Growth Plan <ArrowRight size={16} />
            </Link>
          </div>
        </DezoContainer>
      </section>
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { MASTER_INDUSTRIES_CATALOG } from '@/content/industries-catalog';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/jsonld';
import { ArrowRight, CheckCircle2, Building2, MapPin } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Industry Solutions — Digital Growth for Odisha & India | DEZO',
  description:
    'Tailored digital growth architectures for 16 key sectors across Odisha and India: Handloom, Real Estate, Healthcare, Education, Tourism, Manufacturing, D2C eCommerce, and Local Retail.',
  canonicalUrl: 'https://dezo.in/industries',
});

export default function IndustriesIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Banner */}
      <section className="bg-dezo-bg-warm border-b-2 border-dezo-ink pt-32 pb-16">
        <DezoContainer size="wide">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-6">
              <Building2 size={13} className="text-dezo-ink" />
              <span>Odisha-First & Nationwide Solutions · 16 Priority Sectors</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-dezo-ink tracking-tight uppercase leading-[0.95]">
              Industry Solutions. <br />
              <span className="text-dezo-primary">Built for How You Sell.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-2xl">
              Generic marketing advice burns budget. A Sambalpuri handloom weaver has completely different unit
              economics than a Rourkela steel manufacturer or a Bhubaneswar dental clinic. Explore dedicated growth
              blueprints tailored to your exact industry challenges.
            </p>
          </div>
        </DezoContainer>
      </section>

      {/* Industries Grid */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MASTER_INDUSTRIES_CATALOG.map((ind) => (
              <div
                key={ind.id}
                className="group relative flex flex-col justify-between bg-dezo-bg-warm border-2 border-dezo-ink p-7 shadow-[4px_4px_0_0_#0B0B0A] hover:shadow-[6px_6px_0_0_#B08D57] transition-all"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2 font-bold">
                    [Sector Blueprint]
                  </span>
                  <h2 className="font-display text-2xl font-bold text-dezo-ink group-hover:text-dezo-primary transition-colors leading-tight">
                    {ind.name}
                  </h2>
                  <p className="mt-2 text-xs font-mono text-dezo-text-muted leading-snug">
                    {ind.tagline}
                  </p>

                  <p className="mt-4 text-sm text-dezo-text-secondary leading-relaxed line-clamp-3">
                    {ind.overview}
                  </p>

                  {/* Regional context snippet */}
                  <div className="mt-5 p-3 bg-dezo-bg border border-dezo-border">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-text-muted block mb-1 flex items-center gap-1">
                      <MapPin size={11} className="text-dezo-primary" /> Regional Relevance:
                    </span>
                    <p className="text-xs text-dezo-text-secondary line-clamp-2">
                      {ind.odishaContext}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-dezo-border flex items-center justify-between">
                  <span className="font-mono text-xs text-dezo-text-muted">
                    {ind.recommendedServices.length} Recommended Systems
                  </span>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary transition-colors"
                  >
                    View Blueprint <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Cross-Sell Growth Plan CTA */}
      <section className="bg-dezo-ink text-dezo-bg border-t-2 border-dezo-ink py-16">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2">
                Don’t see your exact industry listed?
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white leading-tight">
                We Engineer Custom Commercial Blueprints
              </h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed font-mono">
                From specialized niche manufacturing to regional B2B distribution, we assemble tailored stacks combining
                Next.js web engineering, search indexing, and lead funnels.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="px-8 py-4 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border-2 border-white hover:bg-white transition-all shadow-[4px_4px_0_0_#FFFFFF] inline-flex items-center gap-2"
            >
              Consult On Your Industry <ArrowRight size={16} />
            </Link>
          </div>
        </DezoContainer>
      </section>
    </>
  );
}

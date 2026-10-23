import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { ODISHA_LOCATIONS } from '@/content/locations-catalog';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/jsonld';
import { MapPin, ArrowRight, Building, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Digital Marketing & Growth Services Across Odisha | DEZO Locations',
  description:
    'DEZO provides digital growth, website development, SEO, and performance marketing across 25 key commercial hubs in Odisha — from our Bhubaneswar studio to Cuttack, Puri, Rourkela, Sambalpur, and beyond.',
  canonicalUrl: 'https://dezo.in/locations',
});

export default function LocationsIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
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
              <MapPin size={13} className="text-dezo-ink" />
              <span>Odisha Regional Delivery Network · 25 Priority Commercial Hubs</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-dezo-ink tracking-tight uppercase leading-[0.95]">
              Odisha Service Areas. <br />
              <span className="text-dezo-primary">Studio in Patia, Delivery Statewide.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-2xl">
              We operate from our central founding studio in Patia, Bhubaneswar, serving ambitious businesses across
              all 30 districts of Odisha with dedicated in-person strategy sessions and remote digital execution.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-dezo-text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-dezo-primary" /> Single Verified Business Identity
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-dezo-primary" /> Zero Fabricated Branch Offices
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-dezo-primary" /> Genuine Regional Economic Insight
              </span>
            </div>
          </div>
        </DezoContainer>
      </section>

      {/* Locations Grid */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ODISHA_LOCATIONS.map((loc) => (
              <div
                key={loc.slug}
                className="group relative flex flex-col justify-between bg-dezo-bg-warm border border-dezo-border p-7 shadow-dezo-card hover:shadow-dezo-soft transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-dezo-border">
                    <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold">
                      [{loc.regionType}]
                    </span>
                    <span className="font-mono text-[11px] text-dezo-text-muted">
                      {loc.distanceFromStudio}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-dezo-ink group-hover:text-dezo-primary transition-colors leading-tight">
                    {loc.cityName}
                  </h2>
                  <span className="text-xs font-mono text-dezo-text-muted block mt-1">
                    District: {loc.districtName}
                  </span>

                  <p className="mt-4 text-sm text-dezo-text-secondary leading-relaxed line-clamp-3">
                    {loc.economicProfile}
                  </p>

                  <div className="mt-5 pt-3 border-t border-dezo-border">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-text-muted block mb-2">
                      Key Local Industries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.keyIndustries.slice(0, 3).map((ind, idx) => (
                        <span key={idx} className="text-[11px] font-mono px-2 py-0.5 bg-dezo-bg border border-dezo-border text-dezo-ink">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dezo-border flex items-center justify-between">
                  <span className="font-mono text-xs text-dezo-text-muted">
                    {loc.recommendedServices.length} Recommended Services
                  </span>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary transition-colors"
                  >
                    View Hub <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Statewide CTA */}
      <section className="bg-dezo-ink text-dezo-bg border-t-2 border-dezo-ink py-16">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2">
                Operating a business anywhere in Odisha?
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white leading-tight">
                Let’s Scale Your Regional Reach
              </h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed font-mono">
                Whether you need local Google Maps domination in your city or nationwide eCommerce distribution from
                Odisha, we build the digital infrastructure to make it happen.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="px-8 py-4 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border border-white/80 hover:bg-white transition-all shadow-dezo-soft inline-flex items-center gap-2"
            >
              Consult With Our Team <ArrowRight size={16} />
            </Link>
          </div>
        </DezoContainer>
      </section>
    </>
  );
}

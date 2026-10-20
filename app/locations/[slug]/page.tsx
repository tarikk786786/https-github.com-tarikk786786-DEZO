import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ODISHA_LOCATIONS,
  getLocationBySlug,
  getAllLocationSlugs,
} from '@/content/locations-catalog';
import { getServiceBySlug } from '@/content/services-catalog';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateLocalBusinessSchema,
} from '@/lib/seo/jsonld';
import { napCanonical } from '@/content/seo/nap';
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building,
} from 'lucide-react';

export function generateStaticParams() {
  // Exclude bhubaneswar since app/locations/bhubaneswar/page.tsx already exists
  return getAllLocationSlugs()
    .filter((slug) => slug !== 'bhubaneswar')
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return {};

  return constructMetadata({
    title: `Digital Marketing, SEO & Web Development in ${loc.cityName}, Odisha | DEZO`,
    description: `DEZO delivers website development, Google Maps local SEO, and performance marketing for businesses in ${loc.cityName} (${loc.districtName} district) from our Patia, Bhubaneswar studio.`,
    canonicalUrl: `https://dezo.in/locations/${loc.slug}`,
  });
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);

  if (!loc) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name: loc.cityName, path: `/locations/${loc.slug}` },
  ]);

  const faqSchema = generateFaqSchema(loc.faqs.map((f) => ({ question: f.q, answer: f.a })));
  const localBusinessSchema = generateLocalBusinessSchema();

  const recommendedServices = loc.recommendedServices
    .map((sSlug) => getServiceBySlug(sSlug))
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-dezo-bg-warm border-b-2 border-dezo-ink pt-32 pb-16">
        <DezoContainer size="wide">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Link
                href="/locations"
                className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted hover:text-dezo-ink transition-colors"
              >
                ← All Odisha Locations
              </Link>
              <span className="text-dezo-text-muted">/</span>
              <span className="px-2.5 py-0.5 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink">
                {loc.regionType}
              </span>
              <span className="px-2.5 py-0.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider">
                {loc.distanceFromStudio}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-dezo-ink tracking-tight uppercase leading-[0.98]">
              Digital Growth for <br />
              <span className="text-dezo-primary">{loc.cityName}, Odisha</span>
            </h1>

            <p className="mt-4 text-base sm:text-xl font-mono text-dezo-ink font-bold">
              District: {loc.districtName} · {loc.summary}
            </p>

            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-3xl">
              {loc.economicProfile} DEZO delivers enterprise-grade web development, high-intent local SEO, and paid
              acquisition campaigns for ambitious businesses across {loc.cityName}.
            </p>

            {/* Studio Identity Callout */}
            <div className="mt-8 p-5 bg-dezo-bg border-2 border-dezo-ink shadow-[4px_4px_0_0_#0B0B0A] max-w-3xl">
              <div className="flex items-center gap-2 text-dezo-primary font-mono text-xs uppercase tracking-wider font-bold mb-1.5">
                <ShieldCheck size={15} /> Authentic Studio Transparency
              </div>
              <p className="text-xs text-dezo-text-secondary leading-relaxed font-mono">
                DEZO’s central engineering studio is located at <strong>{napCanonical.fullAddress}</strong>. We do not
                publish fake local addresses. We serve {loc.cityName} through structured remote digital collaboration,
                video briefings, and scheduled on-site commercial workshops.
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/start-a-project?location=${encodeURIComponent(loc.cityName)}`}
                className="px-7 py-3.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[4px_4px_0_0_#B08D57] inline-flex items-center gap-2"
              >
                Grow Your {loc.cityName} Business <ArrowRight size={14} />
              </Link>
              <Link
                href="/book-strategy-call"
                className="px-7 py-3.5 bg-dezo-bg text-dezo-ink text-xs font-mono uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-bg-warm transition-all shadow-[4px_4px_0_0_#0B0B0A]"
              >
                Book Virtual Strategy Call
              </Link>
            </div>
          </div>
        </DezoContainer>
      </section>

      {/* Local Economic Challenges & Solutions */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 6 cols: Local Challenges */}
            <div className="lg:col-span-6">
              <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-7 sm:p-9 shadow-[4px_4px_0_0_#0B0B0A] h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold flex items-center gap-1.5 mb-2">
                    <AlertTriangle size={14} /> Regional Market Friction
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink mb-6">
                    Digital Challenges in {loc.cityName}
                  </h2>
                  <div className="space-y-4">
                    {loc.localChallenges.map((c, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-dezo-bg p-4 border border-dezo-border">
                        <span className="font-mono text-xs font-bold text-red-600 shrink-0 mt-0.5">
                          [0{idx + 1}]
                        </span>
                        <p className="text-sm text-dezo-text-primary leading-relaxed">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-dezo-ink/15">
                  <span className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted block mb-2 font-bold">
                    Primary Regional Industries:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {loc.keyIndustries.map((ind, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-dezo-bg border border-dezo-ink text-xs font-mono">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Recommended Services */}
            <div className="lg:col-span-6">
              <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-7 sm:p-9 shadow-[4px_4px_0_0_#0B0B0A] h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold flex items-center gap-1.5 mb-2">
                    <Building size={14} /> Recommended Capabilities
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink mb-6">
                    Solutions for {loc.cityName}
                  </h2>
                  <div className="space-y-4">
                    {recommendedServices.map((srv) => {
                      if (!srv) return null;
                      return (
                        <div key={srv.id} className="bg-dezo-bg p-5 border-2 border-dezo-ink shadow-[2px_2px_0_0_#0B0B0A]">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-display text-lg font-bold text-dezo-ink">
                              {srv.name}
                            </h3>
                            <Link
                              href={`/services/${srv.slug}`}
                              className="text-xs font-mono text-dezo-primary font-bold uppercase hover:underline inline-flex items-center gap-1"
                            >
                              Scope <ArrowRight size={12} />
                            </Link>
                          </div>
                          <p className="text-xs text-dezo-text-secondary leading-relaxed">
                            {srv.shortDescription}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-dezo-ink/15">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-dezo-ink font-bold hover:text-dezo-primary"
                  >
                    View All 12 Primary Service Departments <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Frequently Asked Questions */}
      {loc.faqs.length > 0 && (
        <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y-2 border-dezo-ink">
          <DezoContainer size="default">
            <DezoHeading
              badge="Local FAQs"
              as="h2"
              subtitle={`Answers for businesses operating in ${loc.cityName} and ${loc.districtName} district.`}
            >
              Frequently Asked Questions
            </DezoHeading>

            <div className="mt-10 space-y-5">
              {loc.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A]"
                >
                  <h3 className="font-display text-lg font-bold text-dezo-ink flex items-start gap-2.5">
                    <span className="font-mono text-dezo-primary font-bold">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-3 text-sm text-dezo-text-secondary leading-relaxed pl-6 border-l-2 border-dezo-primary/40">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </DezoContainer>
        </DezoSection>
      )}

      {/* Bottom Conversion CTA */}
      <section className="bg-dezo-ink text-dezo-bg border-t-2 border-dezo-ink py-16">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2 font-bold">
                Serving {loc.cityName} from Patia, Bhubaneswar
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white leading-tight">
                Let’s Build Your Digital Advantage in {loc.cityName}
              </h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed font-mono">
                Connect with Tarik Islam and our engineering team. We deliver transparent scopes, predictable
                milestones, and measurable local or national growth.
              </p>
            </div>
            <Link
              href={`/start-a-project?location=${encodeURIComponent(loc.cityName)}`}
              className="px-8 py-4 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border-2 border-white hover:bg-white transition-all shadow-[4px_4px_0_0_#FFFFFF] inline-flex items-center gap-2"
            >
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </DezoContainer>
      </section>
    </>
  );
}

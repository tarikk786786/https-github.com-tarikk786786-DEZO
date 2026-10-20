import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MASTER_INDUSTRIES_CATALOG,
  getIndustryBySlug,
  getAllIndustrySlugs,
} from '@/content/industries-catalog';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
} from '@/lib/seo/jsonld';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  MapPin,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) return {};

  return constructMetadata({
    title: `${ind.name} Digital Marketing & Growth Solutions in Odisha | DEZO`,
    description: `Digital growth architecture for ${ind.name.toLowerCase()} in Odisha and India: ${ind.tagline}. Web, SEO, paid ads, and automation by DEZO.`,
    canonicalUrl: `https://dezo.in/industries/${ind.slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);

  if (!ind) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: ind.name, path: `/industries/${ind.slug}` },
  ]);

  const faqSchema = generateFaqSchema(ind.faqs.map((f) => ({ question: f.q, answer: f.a })));

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

      {/* Hero Header Banner */}
      <section className="bg-dezo-bg-warm border-b-2 border-dezo-ink pt-32 pb-16">
        <DezoContainer size="wide">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Link
                href="/industries"
                className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted hover:text-dezo-ink transition-colors"
              >
                ← All Industries
              </Link>
              <span className="text-dezo-text-muted">/</span>
              <span className="px-2.5 py-0.5 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink">
                Sector Blueprint
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-dezo-ink tracking-tight uppercase leading-[0.98]">
              {ind.name}
            </h1>
            <p className="mt-4 text-base sm:text-xl font-mono text-dezo-primary font-bold">
              {ind.tagline}
            </p>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-3xl">
              {ind.overview}
            </p>

            {/* Regional Focus Box */}
            <div className="mt-8 p-5 bg-dezo-bg border-2 border-dezo-ink shadow-[4px_4px_0_0_#0B0B0A] max-w-3xl">
              <div className="flex items-center gap-2 text-dezo-primary font-mono text-xs uppercase tracking-wider font-bold mb-1.5">
                <MapPin size={14} /> Regional Market Context (Odisha & Eastern India)
              </div>
              <p className="text-sm text-dezo-text-secondary leading-relaxed font-mono">
                {ind.odishaContext}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/start-a-project?industry=${encodeURIComponent(ind.name)}`}
                className="px-7 py-3.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[4px_4px_0_0_#B08D57] inline-flex items-center gap-2"
              >
                {ind.ctaLabel} <ArrowRight size={14} />
              </Link>
              <Link
                href="/book-strategy-call"
                className="px-7 py-3.5 bg-dezo-bg text-dezo-ink text-xs font-mono uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-bg-warm transition-all shadow-[4px_4px_0_0_#0B0B0A]"
              >
                Schedule Industry Strategy Call
              </Link>
            </div>
          </div>
        </DezoContainer>
      </section>

      {/* Challenges & Recommended Systems */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 6 cols: Sector Challenges */}
            <div className="lg:col-span-6">
              <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-7 sm:p-9 shadow-[4px_4px_0_0_#0B0B0A] h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold flex items-center gap-1.5 mb-2">
                    <AlertTriangle size={14} /> Core Market Friction
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink mb-6">
                    Common Digital Challenges
                  </h2>
                  <div className="space-y-4">
                    {ind.challenges.map((c, idx) => (
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
                    Target Channels:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ind.suggestedChannels.map((ch, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-dezo-bg border border-dezo-ink text-xs font-mono">
                        {ch}
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
                    <Layers size={14} /> Recommended Solutions
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink mb-6">
                    The Optimal Growth Stack
                  </h2>
                  <div className="space-y-4">
                    {ind.recommendedServices.map((rs, idx) => (
                      <div key={idx} className="bg-dezo-bg p-5 border-2 border-dezo-ink shadow-[2px_2px_0_0_#0B0B0A]">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-lg font-bold text-dezo-ink">
                            {rs.serviceName}
                          </h3>
                          <Link
                            href={`/services/${rs.serviceSlug}`}
                            className="text-xs font-mono text-dezo-primary font-bold uppercase hover:underline inline-flex items-center gap-1"
                          >
                            Scope <ArrowRight size={12} />
                          </Link>
                        </div>
                        <p className="text-xs text-dezo-text-secondary leading-relaxed">
                          {rs.whyItMatters}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-dezo-ink/15">
                  <span className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted block mb-2 font-bold">
                    Primary Success Metrics:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ind.metrics.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono font-bold text-dezo-ink">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Engagement Workflow Blueprint */}
      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y-2 border-dezo-ink">
        <DezoContainer size="wide">
          <DezoHeading
            badge="Execution Workflow"
            as="h2"
            subtitle="How we roll out this growth blueprint step-by-step for maximum impact."
          >
            Engagement & Delivery Workflow
          </DezoHeading>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ind.workflow.map((wf, idx) => (
              <div
                key={idx}
                className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-dezo-primary block mb-2">
                    PHASE 0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-dezo-ink mb-2">
                    {wf.step}
                  </h3>
                  <p className="text-xs text-dezo-text-secondary leading-relaxed mb-4">
                    {wf.action}
                  </p>
                </div>
                <div className="pt-3 border-t border-dezo-border text-[11px] font-mono text-dezo-ink bg-dezo-bg-warm p-2.5 border">
                  <strong className="block text-dezo-primary">Key Milestone:</strong>
                  {wf.outcome}
                </div>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* FAQs Section */}
      {ind.faqs.length > 0 && (
        <DezoSection spacing="normal" className="bg-dezo-bg">
          <DezoContainer size="default">
            <DezoHeading
              badge="Sector Questions"
              as="h2"
              subtitle="Straightforward answers for business owners in this industry."
            >
              Frequently Asked Questions
            </DezoHeading>

            <div className="mt-10 space-y-5">
              {ind.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-dezo-bg-warm border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A]"
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
                Ready to deploy the {ind.name} blueprint?
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white leading-tight">
                Let’s Build Your Commercial Engine
              </h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed font-mono">
                We will analyze your current presence, identify conversion bottlenecks, and deliver an actionable 90-day
                roadmap. No vanity promises—just disciplined execution.
              </p>
            </div>
            <Link
              href={`/start-a-project?industry=${encodeURIComponent(ind.name)}`}
              className="px-8 py-4 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border-2 border-white hover:bg-white transition-all shadow-[4px_4px_0_0_#FFFFFF] inline-flex items-center gap-2"
            >
              {ind.ctaLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </DezoContainer>
      </section>
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MASTER_SERVICES_CATALOG,
  getServiceBySlug,
  getAllServiceSlugs,
  ServiceItem,
} from '@/content/services-catalog';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateServiceSchema,
} from '@/lib/seo/jsonld';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Wrench,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Target,
  Clock,
  Sparkles,
} from 'lucide-react';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return constructMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    canonicalUrl: `https://dezo.in/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path: `/services/${service.slug}` },
  ]);

  const faqSchema = generateFaqSchema(service.faqs.map((f) => ({ question: f.q, answer: f.a })));
  const serviceSchema = generateServiceSchema(
    service.name,
    service.shortDescription,
    `/services/${service.slug}`
  );

  const relatedServices = service.relatedServiceSlugs
    .map((rSlug) => getServiceBySlug(rSlug))
    .filter((s): s is ServiceItem => Boolean(s));

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Service Banner */}
      <section className="bg-dezo-bg-warm border-b-2 border-dezo-ink pt-32 pb-16">
        <DezoContainer size="wide">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Link
                href="/services"
                className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted hover:text-dezo-ink transition-colors"
              >
                ← All Services
              </Link>
              <span className="text-dezo-text-muted">/</span>
              <span className="px-2.5 py-0.5 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink">
                [{service.departmentCode}] {service.departmentName}
              </span>
              <span className="px-2.5 py-0.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider">
                {service.tier} Model
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-dezo-ink tracking-tight uppercase leading-[0.98]">
              {service.name}
            </h1>
            <p className="mt-4 text-base sm:text-xl font-mono text-dezo-primary font-bold">
              {service.tagline}
            </p>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-3xl">
              {service.fullDescription}
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/start-a-project?service=${service.slug}`}
                className="px-7 py-3.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[4px_4px_0_0_#B08D57] inline-flex items-center gap-2"
              >
                Request Scoped Quote <ArrowRight size={14} />
              </Link>
              <Link
                href="/book-strategy-call"
                className="px-7 py-3.5 bg-dezo-bg text-dezo-ink text-xs font-mono uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-bg-warm transition-all shadow-[4px_4px_0_0_#0B0B0A]"
              >
                Book 20-Min Strategy Call
              </Link>
            </div>
          </div>
        </DezoContainer>
      </section>

      {/* Deliverables & Scope Grid */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 cols: What is Included */}
            <div className="lg:col-span-7">
              <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-7 sm:p-9 shadow-[4px_4px_0_0_#0B0B0A]">
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2 font-bold">
                  Documented Scope
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink mb-6">
                  What is Included in This Service
                </h2>
                <div className="space-y-4">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-dezo-bg p-4 border border-dezo-border">
                      <CheckCircle2 size={18} className="text-dezo-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-dezo-text-primary leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Exclusions / Clear Accountability notice */}
                <div className="mt-8 pt-6 border-t border-dezo-ink/15">
                  <span className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted block mb-2 font-bold">
                    Commercial Clarity (What is Excluded)
                  </span>
                  <div className="flex items-start gap-3 text-xs font-mono text-dezo-text-secondary">
                    <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <span>
                      Third-party advertising spend (paid directly to Google/Meta), paid software subscriptions, and
                      unauthorized third-party API fees are billed separately with zero agency markups.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Target Industries & Tech Stack */}
            <div className="lg:col-span-5 space-y-8">
              {/* Target Industries */}
              <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-7 shadow-[4px_4px_0_0_#0B0B0A]">
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-1 font-bold">
                  Recommended For
                </span>
                <h3 className="font-display text-xl font-bold uppercase text-dezo-ink mb-4">
                  Primary Target Sectors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.targetIndustries.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-dezo-bg border border-dezo-ink text-xs font-mono text-dezo-ink"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Platforms */}
              <div className="bg-dezo-bg border-2 border-dezo-ink p-6 sm:p-7 shadow-[4px_4px_0_0_#0B0B0A]">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench size={16} className="text-dezo-primary" />
                  <h3 className="font-display text-xl font-bold uppercase text-dezo-ink">
                    Tools & Technologies
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.relevantTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-dezo-bg-warm border border-dezo-border text-xs font-mono text-dezo-text-secondary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accountability Box */}
              <div className="bg-dezo-ink text-dezo-bg border-2 border-dezo-ink p-6 sm:p-7 shadow-[4px_4px_0_0_#B08D57]">
                <div className="flex items-center gap-2 text-dezo-primary mb-2">
                  <ShieldCheck size={18} />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    The DEZO Standard
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-300 leading-relaxed">
                  We guarantee clear deliverables, weekly progress reporting, and documented code ownership. We do
                  not make fabricated ranking or vanity traffic promises.
                </p>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Execution Process Steps */}
      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y-2 border-dezo-ink">
        <DezoContainer size="wide">
          <DezoHeading
            badge="Process"
            as="h2"
            subtitle="Predictable, transparent execution milestones from kickoff to handoff."
          >
            How We Execute This Service
          </DezoHeading>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-dezo-primary block mb-2">
                    PHASE {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-bold text-dezo-ink mb-2">
                    {step.step}
                  </h3>
                  <p className="text-xs text-dezo-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Frequently Asked Questions */}
      {service.faqs.length > 0 && (
        <DezoSection spacing="normal" className="bg-dezo-bg">
          <DezoContainer size="default">
            <DezoHeading
              badge="Clarity"
              as="h2"
              subtitle="Straightforward answers to common questions about this service."
            >
              Frequently Asked Questions
            </DezoHeading>

            <div className="mt-10 space-y-5">
              {service.faqs.map((faq, idx) => (
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

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <DezoSection spacing="normal" className="bg-dezo-bg-warm border-t-2 border-dezo-ink">
          <DezoContainer size="wide">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-1">
                  Connected Capabilities
                </span>
                <h2 className="font-display text-2xl font-bold uppercase text-dezo-ink">
                  Related Services
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-dezo-ink hover:text-dezo-primary font-bold"
              >
                View Catalog <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rSrv) => (
                <Link
                  key={rSrv.id}
                  href={`/services/${rSrv.slug}`}
                  className="group bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A] hover:shadow-[5px_5px_0_0_#B08D57] transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[11px] font-bold text-dezo-primary block mb-2">
                      [{rSrv.departmentCode}] {rSrv.tier}
                    </span>
                    <h3 className="font-display text-lg font-bold text-dezo-ink group-hover:text-dezo-primary transition-colors">
                      {rSrv.name}
                    </h3>
                    <p className="mt-2 text-xs text-dezo-text-secondary line-clamp-2">
                      {rSrv.shortDescription}
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-dezo-border inline-flex items-center gap-1 text-xs font-mono font-bold text-dezo-ink group-hover:text-dezo-primary">
                    Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
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
                Ready to implement {service.name}?
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white leading-tight">
                Let’s Scope Your Exact Requirements
              </h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed font-mono">
                Tell us about your business, current traffic, and primary objective. Tarik Islam and our team will
                prepare a transparent milestone scope and delivery timeline.
              </p>
            </div>
            <Link
              href={`/start-a-project?service=${service.slug}`}
              className="px-8 py-4 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border-2 border-white hover:bg-white transition-all shadow-[4px_4px_0_0_#FFFFFF] inline-flex items-center gap-2"
            >
              Start This Project <ArrowRight size={16} />
            </Link>
          </div>
        </DezoContainer>
      </section>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { GrowthCommandCenter } from '@/components/platform/GrowthCommandCenter';
import { ChooseYourGoal } from '@/components/platform/ChooseYourGoal';
import { StoryCaseStudies, CaseStudyCta } from '@/components/platform/StoryCaseStudies';
import {
  DezoReveal,
  DezoHeroMotion,
  DezoStagger,
  DezoStaggerItem,
} from '@/lib/motion/MotionAdapter';
import {
  brand,
  servicePillars,
  growthSystemSteps,
  notAgencyPillars,
  industries,
  howWeWork,
  faqItems,
  featuredCaseStudies,
} from '@/content/site';
import { portfolioData } from '@/content/projects';
import { TOOL_CATALOG } from '@/lib/tools/catalog';

const CAPABILITY_CHIPS = [
  'Shopify / Next.js',
  'Amazon Growth',
  'Flipkart Growth',
  'Meta Ads',
  'Google Ads',
  'SEO',
  'Brand Systems',
  'CRO',
];

export default function HomePage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;
  const liveTools = TOOL_CATALOG.filter((t) => t.availability === 'live').length;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* 03 HERO */}
      <section className="relative min-h-[100svh] pt-28 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dezo-hero-glow pointer-events-none" />
        <div className="absolute inset-0 dezo-grid-fade pointer-events-none opacity-60" />

        <DezoHeroMotion className="relative z-10">
          <DezoContainer size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100svh-10rem)]">
              <div className="lg:col-span-6 max-w-xl">
                <p
                  data-hero-item
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dezo-primary mb-5"
                >
                  {brand.tag}
                </p>
                <h1
                  data-hero-item
                  className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tightest leading-[1.05] text-dezo-text-primary mb-5"
                >
                  {brand.heroLine}
                </h1>
                <p
                  data-hero-item
                  className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed mb-4"
                >
                  {brand.tagline}
                </p>
                <p
                  data-hero-item
                  className="text-sm text-dezo-text-muted leading-relaxed mb-9 max-w-md"
                >
                  {brand.supporting}
                </p>
                <div data-hero-item className="flex flex-wrap gap-3">
                  <DezoButton
                    href="/start-a-project"
                    size="lg"
                    magnetic
                    icon={<ArrowUpRight size={18} />}
                  >
                    Start Growing
                  </DezoButton>
                  <DezoButton href="/growth-lab" variant="outline" size="lg">
                    Get Free Growth Audit
                  </DezoButton>
                </div>
              </div>

              <div data-hero-item className="lg:col-span-6 pb-10">
                <GrowthCommandCenter />
              </div>
            </div>
          </DezoContainer>
        </DezoHeroMotion>
      </section>

      {/* 04 Trust strip */}
      <DezoSection spacing="compact" className="border-y border-dezo-border bg-dezo-surface/40">
        <DezoContainer size="wide">
          <DezoReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-text-muted mb-5 text-center">
              Capability across the full growth stack · {liveCount}+ live deployments catalogued
            </p>
          </DezoReveal>
          <DezoStagger className="flex flex-wrap justify-center gap-2 sm:gap-3" stagger={0.04}>
            {CAPABILITY_CHIPS.map((chip) => (
              <DezoStaggerItem key={chip}>
                <span className="inline-block px-3.5 py-1.5 rounded-dezo-pill border border-dezo-border text-xs font-medium text-dezo-text-secondary">
                  {chip}
                </span>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 05 Not Another Agency */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Positioning"
              as="h2"
              subtitle="We don’t sell isolated services. We operate the entire digital growth ecosystem."
            >
              Not another marketing agency
            </DezoHeading>
          </DezoReveal>
          <DezoStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dezo-border border border-dezo-border mt-12" stagger={0.08}>
            {notAgencyPillars.map((p) => (
              <DezoStaggerItem key={p.title}>
                <div className="h-full p-7 sm:p-8 bg-dezo-bg hover:bg-dezo-surface transition-colors">
                  <h3 className="font-display text-xl font-bold text-dezo-primary mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{p.body}</p>
                </div>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 06 Growth System viz */}
      <DezoSection spacing="normal" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Growth system"
              as="h2"
              subtitle="One journey from brand to scale — not a menu of disconnected vendors."
            >
              Brand → Build → Traffic → Marketplaces → Conversion → Scale
            </DezoHeading>
          </DezoReveal>
          <DezoStagger
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
            stagger={0.05}
          >
            {growthSystemSteps.map((step, i) => (
              <DezoStaggerItem key={step}>
                <div className="relative flex flex-col items-center text-center p-4 rounded-dezo-md border border-dezo-border bg-dezo-bg">
                  <span className="font-mono text-[10px] text-dezo-primary mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-sm font-bold text-dezo-text-primary">
                    {step}
                  </span>
                  {i < growthSystemSteps.length - 1 && (
                    <ArrowRight
                      size={12}
                      className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-dezo-text-muted"
                    />
                  )}
                </div>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 07 Eight service pillars */}
      <DezoSection spacing="normal" id="services">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Services"
                as="h2"
                subtitle="Eight pillars. Full coverage. One operating partner."
              >
                Everything your brand needs to scale
              </DezoHeading>
            </DezoReveal>
            <DezoButton href="/services" variant="outline" size="sm">
              All services
            </DezoButton>
          </div>
          <DezoStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.06}>
            {servicePillars.map((p, i) => (
              <DezoStaggerItem key={p.slug}>
                <Link
                  href={p.href}
                  className="group block h-full p-6 border border-dezo-border bg-dezo-surface hover:border-dezo-primary/40 transition-colors dezo-card-lift"
                >
                  <span className="font-mono text-[10px] text-dezo-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-bold text-dezo-text-primary mt-2 mb-1 group-hover:text-dezo-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs font-semibold text-dezo-text-muted mb-3">{p.title}</p>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{p.summary}</p>
                </Link>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 08 Choose Your Goal */}
      <DezoSection spacing="normal" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="mb-12">
              <DezoHeading
                badge="Interactive"
                as="h2"
                subtitle="Pick an outcome — we’ll recommend the service stack."
              >
                Choose your goal
              </DezoHeading>
            </div>
          </DezoReveal>
          <ChooseYourGoal />
        </DezoContainer>
      </DezoSection>

      {/* 09 Story case studies */}
      <DezoSection spacing="normal" id="work">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="mb-12">
              <DezoHeading
                badge="Case studies"
                as="h2"
                subtitle="Problem → Strategy → Execution → Result on verified live deployments — no invented metrics."
              >
                Stories behind the work
              </DezoHeading>
            </div>
          </DezoReveal>
          <StoryCaseStudies />
          <CaseStudyCta />
        </DezoContainer>
      </DezoSection>

      {/* 10 Before → After */}
      <DezoSection spacing="normal" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Results"
              as="h2"
              subtitle="We show live proof, not vanity dashboards. Click through to production sites."
            >
              Before templates. After systems.
            </DezoHeading>
          </DezoReveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-dezo-border rounded-dezo-lg bg-dezo-bg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-4">
                Before
              </p>
              <ul className="space-y-3 text-sm text-dezo-text-secondary">
                <li>Disconnected vendors for web, ads, and marketplaces</li>
                <li>Template sites that don’t convert paid traffic</li>
                <li>No shared telemetry across channels</li>
              </ul>
            </div>
            <div className="p-8 border border-dezo-primary/30 rounded-dezo-lg bg-dezo-accent-soft">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-4">
                After DEZO
              </p>
              <ul className="space-y-3 text-sm text-dezo-text-primary">
                <li>One growth partner across brand → build → traffic → sell</li>
                <li>{liveCount}+ live deployments in our public archive</li>
                <li>Growth Lab diagnostics + Client Portal path</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <DezoButton href="/results" variant="outline" size="sm">
              View results
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 11 Platform expertise */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading badge="Platforms" as="h2" subtitle="Deep operators on the channels that move Indian commerce.">
              Amazon · Flipkart · Meta · Google
            </DezoHeading>
          </DezoReveal>
          <DezoStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.07}>
            {[
              {
                name: 'Amazon',
                body: 'Listings, A+, ads, catalog health, seller ops — SP-API connectors scaffolded for later.',
                href: '/services/amazon',
              },
              {
                name: 'Flipkart',
                body: 'Catalog, pricing, promotions, inventory, and marketplace performance playbooks.',
                href: '/services/flipkart',
              },
              {
                name: 'Meta',
                body: 'FB/IG ecommerce & lead gen, retargeting, creative testing, conversion tracking.',
                href: '/services/paid-ads',
              },
              {
                name: 'Google',
                body: 'Search, Shopping, PMax, YouTube, remarketing — tied to measurable outcomes.',
                href: '/services/paid-ads',
              },
            ].map((p) => (
              <DezoStaggerItem key={p.name}>
                <Link
                  href={p.href}
                  className="block h-full p-6 border border-dezo-border bg-dezo-surface dezo-card-lift"
                >
                  <h3 className="font-display text-xl font-bold text-dezo-text-primary mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{p.body}</p>
                </Link>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 12 Growth Lab teaser */}
      <DezoSection spacing="normal" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <DezoReveal>
                <DezoHeading
                  badge="Growth Lab"
                  as="h2"
                  subtitle={`${liveTools} live public diagnostics — SEO, speed, Shopify, security, CRO, keywords, and more. Partial findings free; full Growth Report unlocks via CTA.`}
                >
                  Free tools that prove the craft
                </DezoHeading>
              </DezoReveal>
              <div className="mt-8 flex flex-wrap gap-3">
                <DezoButton href="/growth-lab" size="lg" icon={<ArrowUpRight size={18} />}>
                  Open Growth Lab
                </DezoButton>
                <DezoButton href="/tools" variant="outline" size="lg">
                  Browse tools
                </DezoButton>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 rounded-dezo-lg border border-dezo-border bg-dezo-bg">
              <p className="font-mono text-xs text-dezo-primary mb-4">GROWTH SCORE FUNNEL</p>
              <div className="space-y-3">
                {['Probe public signals', 'Show partial findings', 'Lock full report → CTA'].map(
                  (step, i) => (
                    <div key={step} className="flex items-center gap-3 text-sm text-dezo-text-secondary">
                      <span className="w-7 h-7 rounded-full border border-dezo-primary/40 text-dezo-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 13 Free Audit CTA */}
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="p-8 sm:p-12 rounded-dezo-xl border border-dezo-primary/25 bg-dezo-accent-soft flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-2">
                Free Growth Audit
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary tracking-tight">
                See where your brand leaks growth
              </h2>
            </div>
            <DezoButton href="/growth-lab" size="lg" magnetic>
              Get Free Growth Audit
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 14 How We Work */}
      <DezoSection spacing="normal" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading badge="Process" as="h2">
              How we work
            </DezoHeading>
          </DezoReveal>
          <DezoStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {howWeWork.map((s) => (
              <DezoStaggerItem key={s.step}>
                <div>
                  <span className="font-mono text-dezo-primary text-sm">{s.step}</span>
                  <h3 className="font-display text-xl font-bold text-dezo-text-primary mt-2 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{s.body}</p>
                </div>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 15 Industries */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading badge="Industries" as="h2" subtitle="Built for brands that need to sell — not just look premium.">
              Who we grow
            </DezoHeading>
          </DezoReveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="px-5 py-3 rounded-dezo-pill border border-dezo-border text-sm font-semibold text-dezo-text-secondary hover:border-dezo-primary hover:text-dezo-primary transition-colors"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 16 Technology / Integrations */}
      <DezoSection spacing="normal" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Technology"
              as="h2"
              subtitle="Adapters and connectors scaffolded now — full SP-API / Ads APIs / CMS backends ship in later phases."
            >
              Integrations that compound
            </DezoHeading>
          </DezoReveal>
          <div className="mt-10 flex flex-wrap gap-2">
            {[
              'Next.js',
              'Shopify',
              'Amazon SP-API*',
              'Flipkart*',
              'Meta Ads*',
              'Google Ads*',
              'Growth Lab',
              'Client Portal',
            ].map((t) => (
              <span
                key={t}
                className="px-3.5 py-2 rounded-dezo-md border border-dezo-border text-xs font-mono text-dezo-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-dezo-text-muted">* Connector shells — live auth later</p>
        </DezoContainer>
      </DezoSection>

      {/* 17 Testimonials — verifiable only */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Proof"
              as="h2"
              subtitle="No anonymous quotes. Proof is live URLs and structured case studies."
            >
              Verifiable outcomes only
            </DezoHeading>
          </DezoReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCaseStudies.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 border border-dezo-border bg-dezo-surface hover:border-dezo-primary/40 transition-colors"
              >
                <p className="font-display font-bold text-dezo-text-primary">{c.title}</p>
                <p className="text-xs text-dezo-text-muted mt-1">{c.industry}</p>
                <p className="text-sm text-dezo-text-secondary mt-3 line-clamp-2">{c.result}</p>
              </a>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 18 FAQ */}
      <DezoSection spacing="normal" className="bg-dezo-surface/30">
        <DezoContainer size="default">
          <DezoReveal>
            <DezoHeading badge="FAQ" as="h2" align="center" className="mb-10">
              Questions, answered
            </DezoHeading>
          </DezoReveal>
          <div className="divide-y divide-dezo-border border-y border-dezo-border">
            {faqItems.map((item, i) => (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display font-bold text-dezo-text-primary">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-dezo-text-muted shrink-0 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-sm text-dezo-text-secondary leading-relaxed pr-8">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 19 Final CTA */}
      <DezoSection spacing="relaxed">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-4">
                Next step
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tightest leading-[1.05] text-dezo-text-primary mb-5">
                Ready to operate your entire growth system?
              </h2>
              <p className="text-dezo-text-secondary text-base leading-relaxed mb-9 max-w-xl">
                Start with a free Growth Audit, or book a strategy call with studio leadership.
              </p>
              <div className="flex flex-wrap gap-3">
                <DezoButton
                  href="/growth-lab"
                  size="lg"
                  magnetic
                  icon={<ArrowUpRight size={18} />}
                >
                  Get Free Growth Audit
                </DezoButton>
                <DezoButton href="/book-strategy-call" variant="outline" size="lg">
                  Book Strategy Call
                </DezoButton>
              </div>
            </div>
          </DezoReveal>
        </DezoContainer>
      </DezoSection>
    </>
  );
}

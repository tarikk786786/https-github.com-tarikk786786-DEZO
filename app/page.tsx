'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { cleanHost } from '@/components/dezo/LiveSitePreview';
import { WorkSitePreview } from '@/components/dezo/WorkSitePreview';
import { DezoEngine } from '@/components/dezo/DezoEngine';
import {
  DezoReveal,
  DezoStagger,
  DezoStaggerItem,
  DezoScrollProgress,
  DezoMagnetic,
} from '@/lib/motion/MotionAdapter';
import { PromiseHomeTeaser } from '@/components/promise/PromiseGuaranteeSystem';
import { CTASection, StatementBanner } from '@/components/dezo/visual';
import { DezoHeroMedia } from '@/components/dezo/DezoHeroMedia';
import { DezoHeroText } from '@/components/dezo/DezoHeroText';
import { finalCtaBanner, heroBanner, statementBanners } from '@/content/banners';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import {
  brand,
  serviceRows,
  processSteps,
  industries,
  featuredCaseStudies,
  contact,
  touchpointPillars,
  aboutHomePoints,
  faqItems,
  leadership,
  engagementPlans,
} from '@/content/site';
export default function HomePage() {
  /** Homepage shows only image-led featured stories — full archive lives on /work */
  const featured = featuredCaseStudies.slice(0, 3);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeGoal, setActiveGoal] = useState(0);
  const reducedMotion = useReducedMotion();

  const trustHosts = [
    'yasanabeautyrituals.in',
    'sonvicasarees.com',
    'shreeayurved.com',
    'nilkanthpaints.com',
    'thepaanluxe.com',
    'greatindiapublicschool.org',
  ];

  const goals = [
    {
      label: 'Launch a Business',
      stack: ['Brand', 'Website', 'SEO foundations', 'Analytics'],
      href: '/start-a-project',
    },
    {
      label: 'Build Ecommerce',
      stack: ['Shopify / Next.js', 'CRO', 'Paid ads', 'Analytics'],
      href: '/services/web-development',
    },
    {
      label: 'Grow Amazon',
      stack: ['Listing', 'A+', 'PPC', 'Creative', 'Reporting'],
      href: '/services/amazon',
    },
    {
      label: 'Grow Flipkart',
      stack: ['Catalog', 'Promotions', 'Ads', 'Reporting'],
      href: '/services/flipkart',
    },
    {
      label: 'Generate Leads',
      stack: ['Landing pages', 'SEO', 'Meta / Google', 'Tracking'],
      href: '/services/paid-ads',
    },
    {
      label: 'Improve SEO',
      stack: ['Technical SEO', 'Content', 'Local', 'Measurement'],
      href: '/services/seo',
    },
    {
      label: 'Scale Ads',
      stack: ['Tracking', 'Creative testing', 'Optimization', 'Reporting'],
      href: '/services/paid-ads',
    },
    {
      label: 'Build a Brand',
      stack: ['Positioning', 'Identity', 'Guidelines', 'Creative'],
      href: '/services/branding',
    },
  ];

  const trustLoop = [...trustHosts, ...trustHosts];

  return (
    <>
      <DezoScrollProgress />

      {/*
        Hero — full-bleed cinema impact.
        Media shoots in; brand slams; BUILD / MARKET / GROW streak.
        No root DezoHeroMotion / chapter ticker. See docs/hero-marketing-motion.md
      */}
      <section className="relative min-h-[100svh] overflow-hidden bg-dezo-ink">
        <DezoHeroMedia />
        <div
          className="pointer-events-none absolute inset-0 dezo-hero-film"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 dezo-hero-grain opacity-[0.07] mix-blend-overlay"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-28 sm:justify-center sm:pb-20 sm:pt-32">
          <DezoContainer size="wide" className="w-full">
            <DezoHeroText
              brandName={brand.name}
              eyebrow={heroBanner.eyebrow ?? brand.companyLabel}
              body={heroBanner.body ?? brand.supporting}
            />

            <motion.div
              className="mt-7 sm:mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <DezoMagnetic>
                <DezoButton
                  href={heroBanner.primaryCta?.href ?? '/start-a-project'}
                  size="lg"
                  magnetic
                  className="w-full sm:w-auto justify-center !bg-dezo-primary !border-dezo-primary !text-dezo-ink hover:!bg-dezo-primary-hover"
                  icon={<ArrowUpRight size={16} className="dezo-cta-arrow" />}
                >
                  {heroBanner.primaryCta?.label ?? 'Start a Project'}
                </DezoButton>
              </DezoMagnetic>
              <DezoMagnetic strength={0.14}>
                <DezoButton
                  href={heroBanner.secondaryCta?.href ?? '/work'}
                  variant="outline"
                  size="lg"
                  magnetic
                  className="w-full sm:w-auto justify-center !border-white/45 !text-dezo-text-inverse hover:!bg-white/10 hover:!border-white/70"
                >
                  {heroBanner.secondaryCta?.label ?? 'View Our Work'}
                </DezoButton>
              </DezoMagnetic>
            </motion.div>

            <motion.p
              className="mt-8 sm:mt-10 max-w-md text-[11px] sm:text-xs tracking-wide text-white/55"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
            >
              {heroBanner.meta ?? brand.studioLine}
            </motion.p>
          </DezoContainer>
        </div>
      </section>

      {/* 03 Trust — animated host strip (proof after trailer) */}
      <DezoSection spacing="compact" className="border-y border-dezo-border bg-dezo-surface overflow-hidden">
        <DezoContainer size="wide">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted">
                Live proof · selected production sites
              </p>
              <p className="text-[11px] text-dezo-text-muted tracking-wide">{brand.launchLine}</p>
            </div>
            <div className="relative overflow-hidden">
              <div className="dezo-trust-marquee" aria-hidden>
                {trustLoop.map((host, i) => (
                  <span
                    key={`${host}-${i}`}
                    className="font-mono text-xs sm:text-sm text-dezo-text-secondary tracking-wide whitespace-nowrap"
                  >
                    {host}
                  </span>
                ))}
              </div>
              <p className="sr-only">{trustHosts.join(', ')}</p>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 04 Startup thesis */}
      <StatementBanner data={statementBanners[0]} />

      {/* Touchpoints */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="The product"
              as="h2"
              subtitle="Five connected capabilities. One partner. No vendor stack."
            >
              What DEZO operates
            </DezoHeading>
          </DezoReveal>
          <DezoStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0" stagger={0.05}>
            {touchpointPillars.map((pillar) => (
              <DezoStaggerItem key={pillar.name}>
                <Link
                  href={pillar.href}
                  className="block border-t border-dezo-border pt-5 pr-4 h-full group"
                >
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-dezo-text-primary mb-2 group-hover:text-dezo-primary transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">
                    {pillar.summary}
                  </p>
                </Link>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 05 DEZO Engine — signature system */}
      <DezoSection
        id="engine"
        spacing="normal"
        className="bg-dezo-surface border-y border-dezo-border"
      >
        <DezoContainer size="wide">
          <DezoEngine />
        </DezoContainer>
      </DezoSection>

      {/* Capabilities — editorial rows */}
      <DezoSection spacing="normal" id="services">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Services"
              as="h2"
              subtitle="Clear offers for launch, growth and scale—linked to full service pages."
            >
              How you can work with us
            </DezoHeading>
          </DezoReveal>
          <div className="mt-12 divide-y divide-dezo-border border-y border-dezo-border">
            {serviceRows.map((row) => (
              <Link
                key={row.num}
                href={row.href}
                className="dezo-service-row group grid grid-cols-12 gap-4 py-7 sm:py-8 items-start -mx-2 px-2"
                onMouseEnter={() => setHoveredService(row.num)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-xs text-dezo-text-muted pt-1">
                  {row.num}
                </span>
                <div className="col-span-10 sm:col-span-4">
                  <h3 className="font-display text-xl sm:text-2xl text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                    {row.name}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-span-6 sm:col-start-7">
                  <p
                    className={`text-sm text-dezo-text-secondary leading-relaxed transition-opacity duration-300 ${
                      hoveredService === row.num || hoveredService === null
                        ? 'opacity-100'
                        : 'opacity-50'
                    }`}
                  >
                    {row.summary}
                  </p>
                </div>
                <span className="hidden lg:flex col-span-1 justify-end items-center text-dezo-text-muted group-hover:text-dezo-primary transition-colors">
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 06 Selected Work — image-led stories only (not the full client list) */}
      <DezoSection spacing="normal" id="work" className="bg-dezo-bg-warm border-y border-dezo-border">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <DezoReveal>
              <DezoHeading
                badge="Selected work"
                as="h2"
                subtitle="Large project stories with real site previews. The complete archive is on Work."
              >
                Evidence over decoration
              </DezoHeading>
            </DezoReveal>
            <DezoButton href="/work" variant="outline" size="sm">
              View all work
            </DezoButton>
          </div>
          <div className="flex flex-col gap-24 lg:gap-36">
            {featured.map((study, i) => {
              const reverse = i % 2 === 1;
              return (
                <DezoReveal key={study.url} delay={i * 0.04}>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div
                      className={`relative w-full overflow-hidden border border-dezo-border bg-dezo-bg mb-8 lg:mb-10 ${
                        i === 0
                          ? 'aspect-[16/10] sm:aspect-[21/9]'
                          : 'aspect-[16/9] sm:aspect-[21/10]'
                      }`}
                    >
                      <WorkSitePreview
                        url={study.url}
                        title={study.title}
                        eager={i < 2}
                        pan="auto"
                      />
                    </div>
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 ${
                        reverse ? 'lg:[direction:rtl]' : ''
                      }`}
                    >
                      <div className={`lg:col-span-5 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                          {study.industry}
                          {study.stack?.length ? ` · ${study.stack.slice(0, 3).join(' · ')}` : ''}
                        </p>
                        <h3
                          className={`font-display tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors duration-300 ${
                            i === 0
                              ? 'text-3xl sm:text-5xl lg:text-[3.25rem]'
                              : 'text-3xl sm:text-4xl lg:text-[2.75rem]'
                          }`}
                        >
                          {study.title}
                        </h3>
                        <p className="font-mono text-xs text-dezo-text-muted mt-3">
                          {cleanHost(study.url)}
                        </p>
                      </div>
                      <div
                        className={`lg:col-span-7 space-y-4 ${reverse ? 'lg:[direction:ltr]' : ''}`}
                      >
                        <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
                          <span className="font-semibold text-dezo-text-primary">Challenge. </span>
                          {study.challenge}
                        </p>
                        <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
                          <span className="font-semibold text-dezo-text-primary">What we did. </span>
                          {study.execution}
                        </p>
                        <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
                          <span className="font-semibold text-dezo-text-primary">Result. </span>
                          {study.result}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-dezo-text-primary border-b border-dezo-ink pb-0.5 mt-2 group-hover:border-dezo-primary group-hover:text-dezo-primary transition-colors">
                          Visit live site{' '}
                          <ArrowUpRight size={14} className="dezo-cta-arrow" />
                        </span>
                      </div>
                    </div>
                  </a>
                </DezoReveal>
              );
            })}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Lab — free product surface for prospects */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <DezoReveal>
                <DezoHeading
                  badge="Product · DEZO LAB"
                  as="h2"
                  subtitle="Try the company before you hire it. Paste a URL—practical score and next steps, free, no login."
                >
                  Free diagnostics for your site
                </DezoHeading>
              </DezoReveal>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <DezoButton href="/growth-lab" size="lg" icon={<ArrowUpRight size={16} />}>
                Open DEZO LAB
              </DezoButton>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Goals — entry by outcome, not another services list */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Start here"
              as="h2"
              subtitle="Pick the outcome. We assemble the stack."
            >
              What are you trying to grow?
            </DezoHeading>
          </DezoReveal>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <ul className="lg:col-span-5 flex flex-col border-y border-dezo-border divide-y divide-dezo-border">
              {goals.map((g, i) => (
                <li key={g.label}>
                  <button
                    type="button"
                    onClick={() => setActiveGoal(i)}
                    className={`w-full text-left py-4 text-sm sm:text-base transition-colors ${
                      activeGoal === i
                        ? 'text-dezo-text-primary font-medium'
                        : 'text-dezo-text-secondary hover:text-dezo-text-primary'
                    }`}
                  >
                    {g.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-7 border-t border-dezo-border pt-6 sm:pt-2 lg:border-t-0 lg:border-l lg:pl-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                Recommended stack
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-dezo-text-primary mb-5">
                {goals[activeGoal].label}
              </h3>
              <p className="font-mono text-sm text-dezo-text-secondary leading-relaxed mb-8">
                {goals[activeGoal].stack.join('  →  ')}
              </p>
              <DezoButton href={goals[activeGoal].href} size="sm" icon={<ArrowUpRight size={14} />}>
                Build my growth plan
              </DezoButton>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* How we work */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Operating model"
              as="h2"
              subtitle="A clear cadence from discovery to ongoing optimization."
            >
              How DEZO runs
            </DezoHeading>
          </DezoReveal>
          <DezoStagger className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6" stagger={0.06}>
            {processSteps.map((step, i) => (
              <DezoStaggerItem key={step}>
                <li className="border-t border-dezo-border pt-4 list-none group cursor-default">
                  <span className="font-mono text-[10px] text-dezo-text-muted group-hover:text-dezo-primary transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-display text-lg sm:text-xl text-dezo-text-primary mt-2 transition-transform duration-300 group-hover:translate-x-0.5">
                    {step}
                  </p>
                </li>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* Engagement packages — startup pricing clarity */}
      <DezoSection spacing="normal" id="pricing">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Pricing"
                as="h2"
                subtitle="Transparent packages. Exact rates after a short diagnostic—no vanity numbers."
              >
                Engagement models
              </DezoHeading>
            </DezoReveal>
            <DezoButton href="/pricing" variant="outline" size="sm">
              Full pricing
            </DezoButton>
          </div>
          <DezoStagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dezo-border border border-dezo-border"
            stagger={0.05}
          >
            {engagementPlans.map((plan) => (
              <DezoStaggerItem key={plan.name}>
                <div className="h-full p-6 sm:p-8 bg-dezo-surface">
                  <p className="font-display text-2xl text-dezo-text-primary mb-3">{plan.name}</p>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{plan.blurb}</p>
                </div>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
          <p className="mt-8 text-sm text-dezo-text-muted">
            Built for{' '}
            {industries
              .slice(0, 5)
              .map((i) => i.name)
              .join(' · ')}
            {industries.length > 5 ? ' · and more' : ''}.
          </p>
        </DezoContainer>
      </DezoSection>

      {/* DEZO Standard */}
      <PromiseHomeTeaser />

      {/* Founding team */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <DezoHeading badge="Founding team" as="h2">
                A serious company for brands that sell
              </DezoHeading>
              <p className="mt-5 text-base text-dezo-text-secondary leading-relaxed max-w-xl">
                {brand.thesis}
              </p>
              <div className="mt-10 space-y-6">
                {aboutHomePoints.map((p) => (
                  <div key={p.title} className="border-t border-dezo-border pt-4">
                    <h3 className="font-display text-xl text-dezo-text-primary mb-2">{p.title}</h3>
                    <p className="text-sm text-dezo-text-secondary leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <DezoButton href="/about" variant="outline" size="sm">
                  About DEZO
                </DezoButton>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 border-l border-dezo-border pl-0 lg:pl-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-6">
                Leadership
              </p>
              <div className="mb-8">
                <p className="font-display text-xl text-dezo-text-primary">
                  {leadership.primary.name}
                </p>
                <p className="text-sm text-dezo-primary mt-1">{leadership.primary.role}</p>
                <p className="text-sm text-dezo-text-secondary mt-2 leading-relaxed">
                  {leadership.primary.bio}
                </p>
              </div>
              <p className="text-sm text-dezo-text-muted mt-6">
                {contact.address.street}, {contact.address.city}
                <br />
                {contact.phoneFormatted}
                <br />
                <a href={`mailto:${contact.email}`} className="hover:text-dezo-primary">
                  {contact.email}
                </a>
                <br />
                <a href={`mailto:${contact.supportEmail}`} className="hover:text-dezo-primary">
                  {contact.supportEmail}
                </a>
              </p>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 18 FAQ — one system */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoHeading badge="FAQ" as="h2">
            Straight answers
          </DezoHeading>
          <dl className="mt-10 divide-y divide-dezo-border border-y border-dezo-border max-w-3xl">
            {faqItems.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="font-display text-lg text-dezo-text-primary mb-2">{item.q}</dt>
                <dd className="text-sm text-dezo-text-secondary leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </DezoContainer>
      </DezoSection>

      <CTASection data={finalCtaBanner} />
    </>
  );
}

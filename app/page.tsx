'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { LiveSitePreview, cleanHost } from '@/components/dezo/LiveSitePreview';
import { DezoEngine } from '@/components/dezo/DezoEngine';
import {
  DezoReveal,
  DezoStagger,
  DezoStaggerItem,
  DezoHeroMotion,
  DezoImageReveal,
  DezoScrollProgress,
  DezoMagnetic,
} from '@/lib/motion/MotionAdapter';
import { PromiseHomeTeaser } from '@/components/promise/PromiseGuaranteeSystem';
import { CTASection, StatementBanner } from '@/components/dezo/visual';
import { DezoHeroMedia } from '@/components/dezo/DezoHeroMedia';
import { DezoHeroChapters } from '@/components/dezo/DezoHeroChapters';
import { DezoHeroText } from '@/components/dezo/DezoHeroText';
import { HeroShowcaseProvider } from '@/components/dezo/HeroShowcaseContext';
import { finalCtaBanner, heroBanner, statementBanners } from '@/content/banners';
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
        Hero — editorial split: solid type panel + sharp cinema plane.
        Three-line BUILD / MARKET / GROW reveal (not single-word rotator).
        See docs/hero-marketing-motion.md
      */}
      <section className="relative overflow-hidden bg-dezo-bg-warm">
        <HeroShowcaseProvider>
          <DezoHeroMotion className="flex min-h-[100svh] flex-col lg:grid lg:grid-cols-12 lg:min-h-[100svh]">
            {/* Media — stacked on mobile; sharp right plane on desktop (no cream wash) */}
            <div
              className="relative h-[46vh] min-h-[280px] w-full shrink-0 overflow-hidden sm:h-[48vh] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-auto lg:min-h-[100svh]"
              aria-hidden
            >
              <DezoHeroMedia />
              <div className="absolute inset-0 dezo-hero-grain pointer-events-none opacity-[0.03] mix-blend-multiply hidden lg:block" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-dezo-bg-warm via-dezo-bg-warm/50 to-transparent lg:hidden" />
              {/* Soft edge only where panel meets media */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-dezo-bg-warm/40 to-transparent hidden lg:block" />
            </div>

            {/* Type panel — solid paper, brand-first manifesto */}
            <div className="relative z-10 flex flex-1 flex-col justify-start overflow-hidden bg-dezo-bg-warm lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:min-h-[100svh] lg:justify-center lg:border-r lg:border-dezo-border/50">
              <DezoContainer size="wide" className="w-full pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pt-8 sm:pb-14 lg:max-w-none lg:px-10 xl:px-14 lg:pt-28 lg:pb-16">
                <DezoHeroText
                  brandName={brand.name}
                  eyebrow={heroBanner.eyebrow ?? brand.companyLabel}
                  body={heroBanner.body ?? brand.supporting}
                />

                <div
                  data-hero-item
                  className="mt-6 sm:mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
                >
                  <DezoMagnetic>
                    <DezoButton
                      href={heroBanner.primaryCta?.href ?? '/start-a-project'}
                      size="lg"
                      magnetic
                      className="w-full sm:w-auto justify-center"
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
                      className="w-full sm:w-auto justify-center"
                    >
                      {heroBanner.secondaryCta?.label ?? 'View Our Work'}
                    </DezoButton>
                  </DezoMagnetic>
                </div>

                <div
                  data-hero-item
                  className="mt-7 sm:mt-10 flex flex-col gap-3 border-t border-dezo-border/60 pt-4 max-w-md"
                >
                  <p className="text-[11px] sm:text-xs text-dezo-text-muted tracking-wide">
                    {heroBanner.meta ?? brand.studioLine}
                  </p>
                  {featured[0] && (
                    <a
                      href={featured[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-dezo-text-secondary hover:text-dezo-primary transition-colors min-h-11 sm:min-h-0"
                    >
                      <span className="text-dezo-text-muted uppercase tracking-[0.12em]">
                        Proof
                      </span>
                      <span className="text-dezo-border">·</span>
                      <span>{featured[0].title}</span>
                      <ArrowUpRight size={12} className="dezo-cta-arrow" />
                    </a>
                  )}
                </div>

                {/* Compact reel chapter status — not a dense grid */}
                <DezoHeroChapters />
              </DezoContainer>
            </div>
          </DezoHeroMotion>
        </HeroShowcaseProvider>
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
                    <DezoImageReveal
                      delay={i * 0.03}
                      className={`relative w-full bg-dezo-bg border border-dezo-border mb-8 lg:mb-10 ${
                        i === 0
                          ? 'aspect-[16/10] sm:aspect-[21/9]'
                          : 'aspect-[16/9] sm:aspect-[21/10]'
                      }`}
                    >
                      <LiveSitePreview
                        url={study.url}
                        title={study.title}
                        eager={i < 2}
                        className="absolute inset-0 w-full h-full object-cover object-[center_18%] dezo-img-zoom"
                      />
                    </DezoImageReveal>
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
              {[leadership.primary, leadership.partner].map((person) => (
                <div key={person.name} className="mb-8">
                  <p className="font-display text-xl text-dezo-text-primary">{person.name}</p>
                  <p className="text-sm text-dezo-primary mt-1">{person.role}</p>
                  <p className="text-sm text-dezo-text-secondary mt-2 leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              ))}
              <p className="text-sm text-dezo-text-muted mt-6">
                {contact.address.street}, {contact.address.city}
                <br />
                {contact.phoneFormatted}
                <br />
                {contact.email}
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

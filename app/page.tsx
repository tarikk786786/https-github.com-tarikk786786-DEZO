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
import {
  brand,
  serviceRows,
  processSteps,
  industries,
  featuredCaseStudies,
  contact,
  touchpointPillars,
  aboutHomePoints,
  performancePipeline,
  faqItems,
  leadership,
} from '@/content/site';
export default function HomePage() {
  /** Homepage shows only image-led featured stories — full archive lives on /work */
  const featured = featuredCaseStudies.slice(0, 6);
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

      {/* 02 Hero — full-bleed live proof + brand-first composition */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-dezo-bg-warm" aria-hidden>
          <LiveSitePreview
            url={featured[0]?.url || 'https://yasanabeautyrituals.in/'}
            title={featured[0]?.title || 'Featured work'}
            eager
            className="absolute inset-0 w-full h-full object-cover object-top scale-[1.02] dezo-img-zoom"
          />
          <div
            className="absolute inset-0 dezo-atmosphere"
            data-hero-atmosphere
            style={{
              background:
                'linear-gradient(105deg, rgba(245,243,238,0.96) 0%, rgba(245,243,238,0.88) 38%, rgba(245,243,238,0.45) 62%, rgba(11,11,10,0.28) 100%)',
            }}
          />
        </div>

        <DezoContainer size="wide" className="relative z-10 pt-28 pb-14 sm:pb-20">
          <DezoHeroMotion>
            <div className="max-w-2xl">
              <p
                data-hero-item
                className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight text-dezo-text-primary mb-5"
              >
                {brand.name}
              </p>
              <h1
                data-hero-item
                className="font-display text-[2rem] sm:text-4xl lg:text-[2.75rem] tracking-tightest leading-[1.08] text-dezo-text-primary mb-5"
              >
                {brand.tag}
              </h1>
              <p
                data-hero-item
                className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-lg mb-9"
              >
                {brand.supporting}
              </p>
              <div data-hero-item className="flex flex-wrap gap-3">
                <DezoMagnetic>
                  <DezoButton
                    href="/start-a-project"
                    size="lg"
                    magnetic
                    icon={<ArrowUpRight size={16} className="dezo-cta-arrow" />}
                  >
                    Start a Project
                  </DezoButton>
                </DezoMagnetic>
                <DezoMagnetic strength={0.14}>
                  <DezoButton href="/work" variant="outline" size="lg" magnetic>
                    View Our Work
                  </DezoButton>
                </DezoMagnetic>
              </div>
            </div>

            <div
              data-hero-item
              className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-t border-dezo-border/70 pt-5"
            >
              <p className="text-xs text-dezo-text-muted">{brand.geo}</p>
              {featured[0] && (
                <a
                  href={featured[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-xs text-dezo-text-secondary hover:text-dezo-primary transition-colors"
                >
                  <span>{featured[0].title}</span>
                  <span className="text-dezo-text-muted">·</span>
                  <span>{cleanHost(featured[0].url)}</span>
                  <ArrowUpRight size={12} className="dezo-cta-arrow" />
                </a>
              )}
            </div>
          </DezoHeroMotion>
        </DezoContainer>
      </section>

      {/* 03 Trust — animated host strip (not a full dump) */}
      <DezoSection spacing="compact" className="border-y border-dezo-border bg-dezo-surface overflow-hidden">
        <DezoContainer size="wide">
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted">
              Selected live sites
            </p>
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

      {/* 04 One partner / touchpoints */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <p className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.15] text-dezo-text-primary max-w-4xl">
              {brand.onePartner}
            </p>
          </DezoReveal>
          <DezoReveal delay={0.08}>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary max-w-2xl leading-relaxed">
              Your website, search visibility, advertising, social presence and marketplace
              operations should not work in isolation. DEZO connects them into one commercial
              system.
            </p>
          </DezoReveal>
          <DezoStagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0" stagger={0.05}>
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

      {/* 05 DEZO Engine */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoEngine />
        </DezoContainer>
      </DezoSection>

      {/* Capabilities rows */}
      <DezoSection spacing="normal" id="services">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Capabilities"
              as="h2"
              subtitle="Service rows—not ten generic cards saying the same thing."
            >
              What we deliver
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
          <div className="flex flex-col gap-20 lg:gap-28">
            {featured.map((study, i) => (
              <DezoReveal key={study.url} delay={i * 0.04}>
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <DezoImageReveal
                    delay={i * 0.03}
                    className="relative w-full bg-dezo-bg border border-dezo-border aspect-[16/9] sm:aspect-[21/10] mb-8 lg:mb-10"
                  >
                    <LiveSitePreview
                      url={study.url}
                      title={study.title}
                      eager={i < 2}
                      className="absolute inset-0 w-full h-full object-cover object-top dezo-img-zoom"
                    />
                  </DezoImageReveal>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                    <div className="lg:col-span-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                        {study.industry}
                        {study.stack?.length ? ` · ${study.stack.slice(0, 3).join(' · ')}` : ''}
                      </p>
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors duration-300">
                        {study.title}
                      </h3>
                      <p className="font-mono text-xs text-dezo-text-muted mt-3">
                        {cleanHost(study.url)}
                      </p>
                    </div>
                    <div className="lg:col-span-7 space-y-4">
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
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 07 Marketplace */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <DezoHeading
                badge="Marketplace growth"
                as="h2"
                subtitle="Your marketplace presence deserves its own strategy."
              >
                Amazon & Flipkart
              </DezoHeading>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-sm text-dezo-text-secondary leading-relaxed max-w-lg">
                We optimize listings, creative, advertising and operations with transparent
                reporting. Marketplace rankings and sales remain subject to platform rules and
                market conditions—we do not fake those guarantees.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-10">
            {[
              {
                title: 'Amazon',
                href: '/services/amazon',
                items: [
                  'Listing optimization',
                  'Marketplace SEO',
                  'A+ content',
                  'PPC',
                  'Catalog',
                  'Creative',
                  'Analytics',
                ],
              },
              {
                title: 'Flipkart',
                href: '/services/flipkart',
                items: [
                  'Catalog',
                  'Listing optimization',
                  'Search',
                  'Advertising',
                  'Promotions',
                  'Pricing',
                  'Analytics',
                ],
              },
            ].map((col) => (
              <Link key={col.title} href={col.href} className="group border-t border-dezo-border pt-6">
                <h3 className="font-display text-2xl sm:text-3xl text-dezo-text-primary mb-5 group-hover:text-dezo-primary transition-colors">
                  {col.title}
                </h3>
                <ul className="space-y-2 mb-6">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-dezo-text-secondary flex gap-2">
                      <span className="text-dezo-primary">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="text-sm font-medium text-dezo-text-primary border-b border-dezo-border pb-0.5 group-hover:border-dezo-primary group-hover:text-dezo-primary transition-colors">
                  Explore marketplace growth →
                </span>
              </Link>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 08 Performance */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <DezoHeading
                badge="Performance marketing"
                as="h2"
                subtitle="Strategy before spend."
              >
                Google & Meta
              </DezoHeading>
              <p className="mt-5 text-sm text-dezo-text-secondary leading-relaxed max-w-md">
                We focus on measurable acquisition systems rather than vanity metrics. Campaign
                outcomes remain subject to auctions, competition and creative performance.
              </p>
              <div className="mt-8">
                <DezoButton href="/services/paid-ads" variant="outline" size="sm">
                  Performance marketing
                </DezoButton>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {performancePipeline.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="border border-dezo-border bg-dezo-bg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-dezo-text-primary">
                      {step}
                    </span>
                    {i < performancePipeline.length - 1 && (
                      <span className="text-dezo-text-muted font-mono text-xs" aria-hidden>
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 09 SEO */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <DezoHeading
                badge="Organic growth"
                as="h2"
                subtitle="Sustainable search visibility—not fabricated ranking guarantees."
              >
                SEO as a system
              </DezoHeading>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <p className="text-sm text-dezo-text-secondary leading-relaxed">
                We build sustainable search visibility through technical improvements, relevant
                content and ongoing optimization.
              </p>
              <p className="font-mono text-xs sm:text-sm text-dezo-text-primary tracking-wide">
                Technical → Structure → Content → Authority → Local → Measurement → Optimization
              </p>
              <DezoButton href="/services/seo" variant="outline" size="sm">
                SEO & organic
              </DezoButton>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 10 Brand + Social */}
      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoHeading
            badge="Brand & social"
            as="h2"
            subtitle="Make the business look as good as it works."
          >
            Brand systems that sell
          </DezoHeading>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-base text-dezo-text-secondary">
            {[
              'Brand strategy',
              'Identity',
              'Creative',
              'Social',
              'Content',
              'Campaign assets',
              'Packaging',
              'Visual direction',
            ].map((item) => (
              <li key={item} className="border-b border-transparent hover:border-dezo-primary pb-0.5">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <DezoButton href="/services/branding" variant="outline" size="sm">
              Brand & creative
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 11 DEZO Lab */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <DezoReveal>
                <DezoHeading
                  badge="DEZO LAB"
                  as="h2"
                  subtitle="Practical tools for understanding your digital business—not a dashboard spectacle."
                >
                  Analyst toolkit
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

      {/* 12 Positioning strip — no volume quantities */}
      <DezoSection spacing="compact" className="bg-dezo-ink text-dezo-text-inverse">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-4">
            <div>
              <p className="font-display text-2xl sm:text-3xl tracking-tight">Build</p>
              <p className="text-sm text-white/55 mt-2">Websites, ecommerce, applications</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl tracking-tight">Market</p>
              <p className="text-sm text-white/55 mt-2">Search, ads, marketplaces, social</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl tracking-tight">Grow</p>
              <p className="text-sm text-white/55 mt-2">Measure, optimize, operate</p>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Goals / solutions */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoHeading
            badge="Solutions"
            as="h2"
            subtitle="Tell us the business goal—we assemble the stack."
          >
            What are you trying to grow?
          </DezoHeading>
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
            <div className="lg:col-span-7 border border-dezo-border bg-dezo-surface p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                Recommended stack
              </p>
              <h3 className="font-display text-2xl text-dezo-text-primary mb-5">
                {goals[activeGoal].label}
              </h3>
              <p className="font-mono text-sm text-dezo-text-secondary leading-relaxed mb-8">
                {goals[activeGoal].stack.join('  +  ')}
              </p>
              <DezoButton href={goals[activeGoal].href} size="sm" icon={<ArrowUpRight size={14} />}>
                Build my growth plan
              </DezoButton>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 13 How we work */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading badge="How we work" as="h2">
              Discover → Optimize
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

      {/* 14 Industries */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Industries"
              as="h2"
              subtitle="Built for brands that need to sell—not just look premium."
            >
              Who we work with
            </DezoHeading>
          </DezoReveal>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {industries.map((ind) => (
              <li key={ind.href}>
                <Link
                  href={ind.href}
                  className="text-base sm:text-lg text-dezo-text-secondary hover:text-dezo-primary transition-colors border-b border-transparent hover:border-dezo-primary pb-0.5"
                >
                  {ind.name}
                </Link>
              </li>
            ))}
          </ul>
        </DezoContainer>
      </DezoSection>

      {/* 15 DEZO Standard */}
      <PromiseHomeTeaser />

      {/* 16 About / leadership */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <DezoHeading badge="About" as="h2">
                Built for businesses that take their digital presence seriously
              </DezoHeading>
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

      {/* 19 Final CTA */}
      <DezoSection spacing="relaxed">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-5xl tracking-tight leading-[1.1] text-dezo-text-primary mb-5">
                Have a business to build or grow?
              </h2>
              <p className="text-dezo-text-secondary text-base leading-relaxed mb-8 max-w-lg">
                Tell us what you&apos;re building, what isn&apos;t working and where you want to go
                next.
              </p>
              <div className="flex flex-wrap gap-3">
                <DezoMagnetic>
                  <DezoButton
                    href="/start-a-project"
                    size="lg"
                    magnetic
                    icon={<ArrowUpRight size={16} className="dezo-cta-arrow" />}
                  >
                    Start a Project
                  </DezoButton>
                </DezoMagnetic>
                <DezoMagnetic strength={0.14}>
                  <DezoButton href="/growth-lab" variant="outline" size="lg" magnetic>
                    Request a Growth Audit
                  </DezoButton>
                </DezoMagnetic>
              </div>
            </div>
          </DezoReveal>
        </DezoContainer>
      </DezoSection>
    </>
  );
}

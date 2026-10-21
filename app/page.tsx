'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Building2, MapPin, Building, ShieldCheck } from 'lucide-react';
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
import { DezoHeroGrowthConsole } from '@/components/dezo/DezoHeroGrowthConsole';
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

        {/* Responsive Hero Container — justify-start on mobile prevents flex-center scroll clipping */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-start lg:justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-32">
          <DezoContainer size="wide" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
              {/* Left Column: Brand & Manifesto */}
              <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
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
                      className="w-full sm:w-auto justify-center !bg-dezo-primary !border-2 !border-dezo-primary !text-dezo-ink hover:!bg-white hover:!border-white hover:!text-dezo-ink !shadow-[4px_4px_0_0_#FFFFFF] hover:!shadow-[4px_4px_0_0_#B08D57] font-mono font-bold tracking-wider uppercase transition-all"
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
                      className="w-full sm:w-auto justify-center !bg-transparent !border-2 !border-white/80 !text-white hover:!bg-white hover:!text-dezo-ink !shadow-[4px_4px_0_0_rgba(255,255,255,0.25)] hover:!shadow-[4px_4px_0_0_#B08D57] font-mono font-bold tracking-wider uppercase transition-all"
                    >
                      {heroBanner.secondaryCta?.label ?? 'Explore Our Work'}
                    </DezoButton>
                  </DezoMagnetic>
                </motion.div>

                <motion.p
                  className="mt-8 sm:mt-10 max-w-md text-[11px] sm:text-xs tracking-wide text-white/75 font-mono"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.05 }}
                >
                  {heroBanner.meta ?? brand.studioLine}
                </motion.p>
              </div>

              {/* Right Column: Animated, Informative Marketing Showcase */}
              <motion.div
                className="lg:col-span-5 xl:col-span-6 w-full flex justify-center lg:justify-end"
                initial={reducedMotion ? false : { opacity: 0, x: 28, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <DezoHeroGrowthConsole />
              </motion.div>
            </div>
          </DezoContainer>
        </div>
      </section>

      {/* 03 Trust — animated host strip (proof after trailer) */}
      <DezoSection spacing="compact" className="border-y-2 border-dezo-ink bg-white overflow-hidden py-4 shadow-[0_4px_0_0_rgba(11,11,10,0.06)]">
        <DezoContainer size="wide">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-dezo-ink/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-dezo-primary shrink-0" />
                <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-dezo-ink">
                  [LIVE PROOF] · 181+ VERIFIED PRODUCTION SITES
                </p>
              </div>
              <p className="font-mono text-[10px] sm:text-[11px] text-dezo-text-muted uppercase tracking-wider">{brand.launchLine}</p>
            </div>
            <div className="relative overflow-hidden py-1">
              <div className="dezo-trust-marquee" aria-hidden>
                {trustLoop.map((host, i) => (
                  <span
                    key={`${host}-${i}`}
                    className="font-mono text-xs sm:text-sm font-bold text-dezo-ink tracking-wider whitespace-nowrap hover:text-dezo-primary transition-colors"
                  >
                    {host} //
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
          <DezoStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A]" stagger={0.05}>
            {touchpointPillars.map((pillar, i) => (
              <DezoStaggerItem key={pillar.name}>
                <Link
                  href={pillar.href}
                  className="block border-b sm:border-b-0 sm:border-r-2 border-dezo-ink p-6 h-full group hover:bg-dezo-bg-warm transition-colors last:border-b-0 sm:last:border-r-0"
                >
                  <span className="font-mono text-[10px] font-bold text-dezo-primary block mb-3">
                    [0{i + 1}]
                  </span>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-dezo-text-primary mb-2 group-hover:text-dezo-primary transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed">
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
          <div className="mt-12 divide-y-2 divide-dezo-ink border-y-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A]">
            {serviceRows.map((row) => (
              <Link
                key={row.num}
                href={row.href}
                className="dezo-service-row group grid grid-cols-12 gap-4 p-6 sm:p-7 items-start hover:bg-dezo-bg-warm transition-all"
                onMouseEnter={() => setHoveredService(row.num)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-xs font-bold text-dezo-primary pt-1">
                  [{row.num}]
                </span>
                <div className="col-span-10 sm:col-span-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
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
                <span className="hidden lg:flex col-span-1 justify-end items-center text-dezo-ink group-hover:text-dezo-primary transition-colors">
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          {/* Quick link to 12 departments */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-dezo-bg-warm border-2 border-dezo-ink shadow-[4px_4px_0_0_#0B0B0A]">
            <span className="font-mono text-xs text-dezo-text-secondary">
              Looking for a specific service? Browse all 12 primary departments from Web Development to AI Automation.
            </span>
            <Link
              href="/services"
              className="px-5 py-2.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[2px_2px_0_0_#B08D57] shrink-0 inline-flex items-center gap-1.5"
            >
              Search Full Directory <ArrowRight size={14} />
            </Link>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Industry Solutions Showcase */}
      <DezoSection spacing="normal" id="industries" className="bg-dezo-surface border-y-2 border-dezo-ink">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Sectors"
                as="h2"
                subtitle="Customized digital growth architectures for Odisha’s key economic sectors."
              >
                Industry solutions
              </DezoHeading>
            </DezoReveal>
            <DezoButton href="/industries" variant="outline" size="sm">
              All 16 industries //
            </DezoButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Local Retailers & Stores',
                tag: 'Google Maps 3-Pack & Walk-ins',
                desc: 'Dominate neighborhood searches in Bhubaneswar and Cuttack, capture nearby footfall, and enable instant WhatsApp reordering.',
                href: '/industries/local-business',
              },
              {
                title: 'Real Estate & Construction',
                tag: 'High-Ticket Property Leads',
                desc: 'Pre-qualified buyer inquiry funnels, 3D floor plan showcases, and site visit booking calendars for builders and brokers.',
                href: '/industries/real-estate',
              },
              {
                title: 'Hospitals & Healthcare',
                tag: 'Patient Trust & Consultations',
                desc: 'Doctor directories, OPD schedule booking, medical local SEO, and ethical patient review collection systems.',
                href: '/industries/healthcare',
              },
              {
                title: 'Schools & Coaching Academies',
                tag: 'Student Admissions Growth',
                desc: 'Seasonal entrance exam admission campaigns, digital prospectus downloads, and counselor WhatsApp alerts.',
                href: '/industries/education',
              },
              {
                title: 'Handloom & Artisanal D2C',
                tag: 'Direct-to-Consumer Craft',
                desc: 'High-speed Shopify storefronts, craft heritage storytelling, and global diaspora Meta ad campaigns.',
                href: '/industries/handloom-textiles',
              },
              {
                title: 'Manufacturing & Industrial',
                tag: 'B2B Procurement Catalogs',
                desc: 'Corporate technical specifications, ISO credential compliance, and Request for Quote (RFQ) lead funnels.',
                href: '/industries/manufacturing',
              },
            ].map((ind, idx) => (
              <Link
                key={idx}
                href={ind.href}
                className="group bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[4px_4px_0_0_#0B0B0A] hover:shadow-[6px_6px_0_0_#B08D57] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dezo-primary block mb-2">
                    {ind.tag}
                  </span>
                  <h3 className="font-display text-xl font-bold text-dezo-ink group-hover:text-dezo-primary transition-colors">
                    {ind.title}
                  </h3>
                  <p className="mt-3 text-xs text-dezo-text-secondary leading-relaxed line-clamp-3">
                    {ind.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-dezo-border flex items-center justify-between text-xs font-mono font-bold text-dezo-ink group-hover:text-dezo-primary">
                  <span>Explore Blueprint</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
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
                      className={`relative w-full overflow-hidden border-2 border-dezo-ink bg-white mb-8 lg:mb-10 shadow-[6px_6px_0_0_#0B0B0A] group-hover:shadow-[8px_8px_0_0_#B08D57] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${
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
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-2 border-dezo-ink bg-white p-6 sm:p-8 shadow-[4px_4px_0_0_#0B0B0A] ${
                        reverse ? 'lg:[direction:rtl]' : ''
                      }`}
                    >
                      <div className={`lg:col-span-5 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-dezo-ink px-2 py-0.5 shadow-[2px_2px_0_0_#B08D57]">
                            CASE // 0{i + 1}
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dezo-primary">
                            {study.industry}
                          </span>
                        </div>
                        <h3
                          className={`font-display font-black tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors duration-300 ${
                            i === 0
                              ? 'text-3xl sm:text-5xl lg:text-[3.25rem]'
                              : 'text-3xl sm:text-4xl lg:text-[2.75rem]'
                          }`}
                        >
                          {study.title}
                        </h3>
                        <p className="font-mono text-xs font-bold text-dezo-text-muted mt-3">
                          {cleanHost(study.url)}
                        </p>
                      </div>
                      <div
                        className={`lg:col-span-7 space-y-4 ${reverse ? 'lg:[direction:ltr]' : ''}`}
                      >
                        <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed border-l-2 border-dezo-ink/10 pl-3">
                          <span className="font-mono text-xs uppercase font-bold text-dezo-ink block mb-1">Challenge //</span>
                          {study.challenge}
                        </p>
                        <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed border-l-2 border-dezo-primary pl-3">
                          <span className="font-mono text-xs uppercase font-bold text-dezo-primary block mb-1">Architecture &amp; Growth //</span>
                          {study.execution}
                        </p>
                        <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed bg-dezo-bg-warm p-3 border border-dezo-border">
                          <span className="font-mono text-xs uppercase font-bold text-dezo-ink block mb-1">Measured Outcome //</span>
                          {study.result}
                        </p>
                        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary transition-colors">
                          Visit Production System{' '}
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

      {/* Odisha Regional Delivery Network */}
      <DezoSection spacing="normal" id="locations" className="bg-dezo-bg border-y-2 border-dezo-ink">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Odisha Delivery"
                as="h2"
                subtitle="Central studio in Patia, Bhubaneswar — engineering growth statewide across 25 commercial districts."
              >
                Regional delivery hubs
              </DezoHeading>
            </DezoReveal>
            <DezoButton href="/locations" variant="outline" size="sm">
              All 25 districts //
            </DezoButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: 'Bhubaneswar',
                dist: 'Khordha',
                role: 'Founding Studio & Tech Hub',
                desc: 'Infocity tech corridor, healthcare centers, real estate, and education.',
                href: '/locations/bhubaneswar',
              },
              {
                city: 'Cuttack',
                dist: 'Cuttack',
                role: 'Trade & Judicial Hub',
                desc: 'Wholesale markets, legal services, SCB medical, and silver filigree.',
                href: '/locations/cuttack',
              },
              {
                city: 'Puri',
                dist: 'Puri',
                role: 'Tourism & Coastal Heritage',
                desc: 'Direct hotel booking engines, beach resorts, and pilgrimage crafts.',
                href: '/locations/puri',
              },
              {
                city: 'Rourkela',
                dist: 'Sundargarh',
                role: 'Steel & Engineering Hub',
                desc: 'SAIL suppliers, heavy fabrication units, and technical institutions.',
                href: '/locations/rourkela',
              },
            ].map((loc, idx) => (
              <Link
                key={idx}
                href={loc.href}
                className="group bg-dezo-bg-warm border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A] hover:shadow-[5px_5px_0_0_#B08D57] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-dezo-border">
                    <span className="font-mono text-[10px] uppercase font-bold text-dezo-primary">
                      {loc.role}
                    </span>
                    <MapPin size={12} className="text-dezo-text-muted" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-dezo-ink group-hover:text-dezo-primary transition-colors">
                    {loc.city}
                  </h3>
                  <span className="font-mono text-[11px] text-dezo-text-muted block mt-0.5">
                    District: {loc.dist}
                  </span>
                  <p className="mt-3 text-xs text-dezo-text-secondary leading-relaxed">
                    {loc.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-dezo-border flex items-center justify-between text-xs font-mono font-bold text-dezo-ink group-hover:text-dezo-primary">
                  <span>View Hub Scope</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
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
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 border-2 border-dezo-ink bg-white p-6 sm:p-8 shadow-[6px_6px_0_0_#0B0B0A]">
            <ul className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-dezo-ink divide-y-2 divide-dezo-ink/10 lg:pr-8">
              {goals.map((g, i) => (
                <li key={g.label}>
                  <button
                    type="button"
                    onClick={() => setActiveGoal(i)}
                    className={`w-full text-left py-3.5 px-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeGoal === i
                        ? 'bg-dezo-ink text-white shadow-[3px_3px_0_0_#B08D57] -translate-x-0.5'
                        : 'text-dezo-text-secondary hover:text-dezo-text-primary hover:bg-dezo-bg-warm'
                    }`}
                  >
                    [{String(i + 1).padStart(2, '0')}] {g.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-dezo-primary px-2.5 py-1 w-max mb-3 shadow-[2px_2px_0_0_#0B0B0A]">
                RECOMMENDED ARCHITECTURE
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-black text-dezo-text-primary mb-4">
                {goals[activeGoal].label}
              </h3>
              <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-4 mb-6 shadow-[3px_3px_0_0_#0B0B0A]">
                <p className="font-mono text-xs sm:text-sm font-bold text-dezo-ink leading-relaxed">
                  {goals[activeGoal].stack.join('  //  ')}
                </p>
              </div>
              <div>
                <DezoButton href={goals[activeGoal].href} size="sm" icon={<ArrowUpRight size={14} />}>
                  Build My Growth Plan
                </DezoButton>
              </div>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A]"
            stagger={0.05}
          >
            {engagementPlans.map((plan, i) => (
              <DezoStaggerItem key={plan.name}>
                <div className="h-full p-6 sm:p-8 bg-white border-b sm:border-b-0 sm:border-r-2 border-dezo-ink last:border-b-0 sm:last:border-r-0 hover:bg-dezo-bg-warm transition-colors flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-dezo-primary block mb-3">
                      PLAN // 0{i + 1}
                    </span>
                    <p className="font-display text-2xl font-black text-dezo-text-primary mb-3">{plan.name}</p>
                    <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed">{plan.blurb}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-dezo-ink/10">
                    <DezoButton href="/pricing" variant="outline" size="sm" className="w-full">
                      Details //
                    </DezoButton>
                  </div>
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

      {/* Careers Promotion — Guided Training & Internship Pathway */}
      <DezoSection spacing="compact" className="border-t-2 border-dezo-ink bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="p-8 sm:p-10 border-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A] relative">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-700 bg-emerald-100 text-emerald-950 font-mono text-[11px] font-bold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 bg-emerald-600 animate-pulse" />
                  Always Hiring · Guided Training Pathway
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-dezo-ink tracking-tight uppercase">
                  Your Digital Career Starts Here.
                </h3>
                <p className="text-dezo-text-secondary font-mono text-xs sm:text-sm mt-3 leading-relaxed">
                  We are always recruiting motivated talent who want to learn, build, and deploy production digital platforms. Join our structured 1-month practical training program with real client projects.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 text-xs font-mono text-dezo-ink">
                  <span className="px-3 py-1 bg-dezo-bg-warm border border-dezo-ink font-bold shadow-[2px_2px_0_0_#0B0B0A]">Remote-First</span>
                  <span className="px-3 py-1 bg-dezo-bg-warm border border-dezo-ink font-bold shadow-[2px_2px_0_0_#0B0B0A]">1-Month Intensive</span>
                  <span className="px-3 py-1 bg-dezo-bg-warm border border-dezo-ink font-bold shadow-[2px_2px_0_0_#0B0B0A]">Students & Freshers</span>
                  <span className="px-3 py-1 bg-dezo-bg-warm border border-dezo-ink font-bold shadow-[2px_2px_0_0_#0B0B0A]">₹0 Practical Training</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <DezoButton href="/careers" variant="primary" size="md">
                  Explore Careers at DEZO →
                </DezoButton>
                <a
                  href="https://wa.me/919114411026?text=Hi%20DEZO%20Careers%20Team%2C%20I%20saw%20your%20guided%20internship%20and%20training%20opportunity%20on%20dezo.in%20and%20would%20like%20to%20apply."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-dezo-ink bg-[#25D366] text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-all text-center shadow-[3px_3px_0_0_#0B0B0A]"
                >
                  Apply via WhatsApp
                </a>
              </div>
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

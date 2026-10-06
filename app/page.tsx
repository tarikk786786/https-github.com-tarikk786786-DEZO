'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import {
  DezoFeaturedWork,
  DezoCaseStudyStrip,
} from '@/components/dezo/DezoFeaturedWork';
import {
  DezoReveal,
  DezoHeroMotion,
  DezoStagger,
  DezoStaggerItem,
} from '@/lib/motion/MotionAdapter';
import {
  brand,
  pillars,
  featuredCaseStudies,
  toolsLabPhase1,
} from '@/content/site';
import { portfolioData } from '@/content/projects';

export default function HomePage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;
  const featuredProjects = portfolioData.filter((p) => p.featured && p.isLive);
  const phase1Unique = toolsLabPhase1.filter(
    (t, i, arr) => arr.findIndex((x) => x.name === t.name) === i
  );

  return (
    <>
      {/* Hero — brand-first, full-bleed atmosphere, GSAP entrance */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden dezo-hero-atmosphere">
        <DezoHeroMotion className="relative flex flex-col justify-end flex-1 w-full min-h-[100svh]">
          <div
            className="absolute inset-0 dezo-grid-fade pointer-events-none"
            aria-hidden
            data-hero-atmosphere
          />
          <div
            className="dezo-atmosphere-orb absolute -top-24 right-[-10%] w-[70vw] max-w-[720px] h-[70vw] max-h-[720px] rounded-full bg-dezo-primary/10 blur-3xl pointer-events-none"
            aria-hidden
            data-hero-atmosphere
          />
          <div
            className="dezo-atmosphere-orb absolute bottom-[-20%] left-[-15%] w-[55vw] max-w-[520px] h-[55vw] max-h-[520px] rounded-full bg-dezo-highlight/15 blur-3xl pointer-events-none"
            style={{ animationDelay: '-6s' }}
            aria-hidden
            data-hero-atmosphere
          />

          <div className="absolute inset-0 pointer-events-none" aria-hidden data-hero-atmosphere>
            <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] opacity-90">
              <div className="absolute inset-0 bg-gradient-to-r from-dezo-bg via-transparent to-transparent z-10 lg:from-dezo-bg/90" />
              <div className="h-full w-full bg-[url('/dezo-logo-transparent.png')] bg-contain bg-right bg-no-repeat opacity-[0.07] scale-125 origin-right" />
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.14] dezo-route-draw"
                viewBox="0 0 800 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMaxYMid slice"
              >
                <path
                  d="M120 780 C200 620, 280 540, 360 480 C440 420, 500 360, 560 280 C620 200, 680 140, 740 80"
                  stroke="#0B6B52"
                  strokeWidth="2"
                  className="dezo-path-line"
                />
                <path
                  d="M80 700 C180 640, 260 580, 340 500 C420 420, 480 340, 540 260"
                  stroke="#1A5F7A"
                  strokeWidth="1.5"
                  opacity="0.7"
                  className="dezo-path-line"
                />
                <circle cx="560" cy="280" r="6" fill="#0B6B52" />
                <circle cx="360" cy="480" r="4" fill="#C4A35A" />
                <circle cx="740" cy="80" r="5" fill="#1A5F7A" />
              </svg>
            </div>
          </div>

          <DezoContainer
            size="wide"
            className="relative z-10 pb-16 pt-36 sm:pb-24 sm:pt-44 lg:pb-32 lg:pt-52"
          >
            <div className="max-w-3xl">
              <p
                data-hero-item
                className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-extrabold tracking-tightest text-dezo-text-primary mb-5 sm:mb-7 leading-none"
              >
                DEZO
              </p>

              <h1
                data-hero-item
                className="font-display text-3xl sm:text-[2.75rem] lg:text-5xl font-bold tracking-tight text-dezo-text-primary leading-[1.12] mb-5 max-w-2xl"
              >
                {brand.tagline}
              </h1>

              <p
                data-hero-item
                className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-xl mb-9"
              >
                {brand.supporting}
              </p>

              <div data-hero-item className="flex flex-wrap items-center gap-3 mb-11">
                <DezoButton
                  href="/start-a-project"
                  size="lg"
                  magnetic
                  icon={<ArrowUpRight size={18} />}
                >
                  Start a Project
                </DezoButton>
                <DezoButton href="/work" variant="outline" size="lg">
                  See Our Work
                </DezoButton>
              </div>

              <p
                data-hero-item
                className="inline-flex items-center gap-2 text-sm font-medium text-dezo-text-secondary"
              >
                <MapPin size={14} className="text-dezo-primary shrink-0" />
                {brand.geo}
              </p>
            </div>
          </DezoContainer>
        </DezoHeroMotion>
      </section>

      {/* Journey */}
      <DezoSection spacing="compact" borderBottom className="bg-dezo-surface">
        <DezoContainer size="wide">
          <DezoReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-6">
              Commercial Journey
            </p>
          </DezoReveal>
          <DezoStagger className="relative" stagger={0.05}>
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px dezo-journey-track -translate-y-1/2" />
            <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 relative">
              {brand.journey.map((step, i) => (
                <DezoStaggerItem key={step}>
                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-dezo-text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-sm sm:text-base font-bold text-dezo-text-primary">
                      {step}
                    </span>
                  </li>
                </DezoStaggerItem>
              ))}
            </ol>
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* Proof */}
      <DezoSection spacing="compact" className="bg-dezo-bg-warm">
        <DezoContainer size="wide">
          <DezoStagger className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-14" stagger={0.1}>
            <DezoStaggerItem>
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-dezo-text-primary tracking-tight tabular-nums">
                {liveCount}+
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-2.5">
                Live deployments catalogued
              </p>
              <p className="text-xs text-dezo-text-muted mt-1.5 leading-relaxed">
                Linked projects from our public work archive — not inflated totals.
              </p>
            </DezoStaggerItem>
            <DezoStaggerItem>
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-dezo-text-primary tracking-tight">
                5
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-2.5">
                Integrated commercial pillars
              </p>
              <p className="text-xs text-dezo-text-muted mt-1.5 leading-relaxed">
                Build · Brand · Marketplace · Grow · Intelligence
              </p>
            </DezoStaggerItem>
            <DezoStaggerItem>
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-dezo-text-primary tracking-tight">
                IN
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-2.5">
                Odisha roots, India scale
              </p>
              <p className="text-xs text-dezo-text-muted mt-1.5 leading-relaxed">
                Studio in Bhubaneswar · shipping for brands nationwide
              </p>
            </DezoStaggerItem>
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* Pillars */}
      <DezoSection id="solutions" spacing="normal">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
            <DezoReveal>
              <DezoHeading
                badge="Platform"
                as="h2"
                subtitle="One studio across the full digital commercial stack — from first build to marketplace and paid growth."
              >
                Build. Brand. Marketplace. Grow. Intelligence.
              </DezoHeading>
            </DezoReveal>
            <DezoReveal delay={0.1}>
              <DezoButton href="/solutions" variant="outline" size="sm">
                All solutions
              </DezoButton>
            </DezoReveal>
          </div>

          <DezoStagger className="divide-y divide-dezo-border border-y border-dezo-border" stagger={0.06}>
            {pillars.map((pillar, index) => (
              <DezoStaggerItem key={pillar.slug}>
                <Link
                  href={pillar.href}
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-7 hover:bg-dezo-surface/80 transition-colors px-1 sm:px-3 -mx-1 sm:-mx-3"
                >
                  <span className="font-mono text-xs text-dezo-text-muted w-10 shrink-0">
                    0{index + 1}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors sm:w-44 shrink-0">
                    {pillar.name}
                  </span>
                  <span className="text-sm text-dezo-text-secondary flex-1 leading-relaxed">
                    {pillar.summary}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-dezo-text-muted group-hover:text-dezo-primary group-hover:translate-x-1 transition-all shrink-0 hidden sm:block"
                  />
                </Link>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* Featured live work — real URLs + previews */}
      <DezoSection spacing="normal" className="bg-dezo-surface" borderTop id="work">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Selected work"
                as="h2"
                subtitle="Real live websites — click through to production sites. Previews from the public web, not mockups."
              >
                Brands that sell online
              </DezoHeading>
            </DezoReveal>
          </div>
          <DezoFeaturedWork projects={featuredProjects} />
        </DezoContainer>
      </DezoSection>

      {/* Case study framing */}
      <DezoSection spacing="normal" borderTop>
        <DezoContainer size="wide">
          <div className="mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Case studies"
                as="h2"
                subtitle="Challenge → result framing on verified live deployments — no anonymous testimonials."
              >
                How the work reads
              </DezoHeading>
            </DezoReveal>
          </div>
          <DezoCaseStudyStrip studies={[...featuredCaseStudies]} />
        </DezoContainer>
      </DezoSection>

      {/* Tools Lab Phase 1 */}
      <DezoSection spacing="normal" borderTop className="bg-dezo-bg-warm">
        <DezoContainer size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <DezoReveal>
              <DezoHeading
                badge="DEZO Tools Lab"
                as="h2"
                subtitle="Phase 1 public diagnostics — SEO, speed, accessibility, schema, sitemap/robots, links, tech detection, and Shopify health."
              >
                Free tools that prove the craft
              </DezoHeading>
            </DezoReveal>
            <DezoReveal delay={0.08}>
              <DezoButton href="/tools" variant="outline" size="sm">
                Open Tools Lab
              </DezoButton>
            </DezoReveal>
          </div>

          <DezoStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.07}>
            {phase1Unique.map((tool) => (
              <DezoStaggerItem key={tool.name}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block h-full p-5 border border-dezo-border rounded-dezo-md bg-dezo-surface hover:border-dezo-primary/40 transition-colors dezo-card-lift"
                >
                  <p className="font-display font-bold text-dezo-text-primary mb-1.5">
                    {tool.name}
                  </p>
                  <p className="text-xs text-dezo-text-secondary leading-relaxed">
                    {tool.description}
                  </p>
                </Link>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* Archive gallery */}
      <DezoSection spacing="normal" borderTop>
        <DezoContainer size="wide">
          <div className="mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Archive"
                as="h2"
                subtitle="Browse live client deployments across fashion, healthcare, education, corporate, and more."
              >
                More live deployments
              </DezoHeading>
            </DezoReveal>
          </div>
          <DezoWorkGallery initialLimit={6} featuredFirst />
        </DezoContainer>
      </DezoSection>

      {/* CTA */}
      <DezoSection spacing="relaxed" borderTop className="bg-dezo-ink text-dezo-text-inverse">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-highlight mb-4">
                Next step
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight mb-5 tracking-tight">
                Ready to build a brand that sells?
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-9 max-w-xl">
                A short project diagnostic routes your brief to studio leadership — channels,
                marketplace needs, timeline, and goals.
              </p>
              <div className="flex flex-wrap gap-3">
                <DezoButton
                  href="/start-a-project"
                  size="lg"
                  magnetic
                  className="!bg-white !text-dezo-ink hover:!bg-white/90 !border-white"
                  icon={<ArrowUpRight size={18} />}
                >
                  Start Project Diagnostic
                </DezoButton>
                <DezoButton
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="!border-white/30 !text-white hover:!bg-white/10"
                >
                  Contact
                </DezoButton>
              </div>
            </div>
          </DezoReveal>
        </DezoContainer>
      </DezoSection>
    </>
  );
}

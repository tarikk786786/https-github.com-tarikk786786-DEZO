'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
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
import { DezoHeroMedia } from '@/components/dezo/DezoHeroMedia';
import {
  brand,
  pillars,
  featuredCaseStudies,
} from '@/content/site';
import { portfolioData } from '@/content/projects';
import { TOOL_CATALOG } from '@/lib/tools/catalog';

export default function HomePage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;
  const featuredPriority = [
    'yasanabeautyrituals.in',
    'sonvicasarees.com',
    'thepaanluxe.com',
    'shreeayurved.com',
    'nilkanthpaints.com',
    'greatindiapublicschool.org',
  ];
  const featuredProjects = portfolioData
    .filter((p) => p.featured && p.isLive)
    .sort((a, b) => {
      const ai = featuredPriority.findIndex((h) => a.url.includes(h));
      const bi = featuredPriority.findIndex((h) => b.url.includes(h));
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  const liveToolsHome = TOOL_CATALOG.filter((t) => t.availability === 'live').slice(0, 6);

  return (
    <>
      {/* Hero — brand-first over full-bleed commerce media */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <DezoHeroMotion className="relative flex flex-col justify-end flex-1 w-full min-h-[100svh]">
          <DezoHeroMedia />

          {/* Readability scrim only — no badges/chips on media */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            aria-hidden
            data-hero-atmosphere
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#060a09]/[0.9] via-[#060a09]/[0.52] to-[#060a09]/[0.12]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a09]/[0.78] via-transparent to-[#060a09]/[0.32]" />
          </div>

          <DezoContainer
            size="wide"
            className="relative z-10 pb-20 pt-36 sm:pb-28 sm:pt-44 lg:pb-36 lg:pt-52"
          >
            <div className="max-w-3xl">
              <p
                data-hero-item
                className="font-display text-6xl sm:text-8xl lg:text-[9rem] font-extrabold tracking-tightest text-white mb-6 sm:mb-8 leading-none"
              >
                DEZO
              </p>

              <h1
                data-hero-item
                className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.15] mb-5 max-w-xl"
              >
                {brand.tagline}
              </h1>

              <p
                data-hero-item
                className="text-base sm:text-lg text-white/72 leading-relaxed max-w-lg mb-10"
              >
                {brand.supporting}
              </p>

              <div data-hero-item className="flex flex-wrap items-center gap-3">
                <DezoButton
                  href="/start-a-project"
                  size="lg"
                  magnetic
                  icon={<ArrowUpRight size={18} />}
                  className="!bg-white !text-dezo-ink !border-white hover:!bg-white/90"
                >
                  Start a Project
                </DezoButton>
                <DezoButton
                  href="/work"
                  variant="outline"
                  size="lg"
                  className="border-white/35 text-white hover:bg-white/10 hover:border-white/60"
                >
                  See Our Work
                </DezoButton>
              </div>
            </div>
          </DezoContainer>
        </DezoHeroMotion>
      </section>

      {/* Journey */}
      <DezoSection spacing="compact" borderBottom className="bg-dezo-surface">
        <DezoContainer size="wide">
          <DezoReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-8">
              Commercial Journey
            </p>
          </DezoReveal>
          <DezoStagger className="relative" stagger={0.05}>
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px dezo-journey-track -translate-y-1/2" />
            <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5 relative">
              {brand.journey.map((step, i) => (
                <DezoStaggerItem key={step}>
                  <li className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] text-dezo-text-muted tracking-wider">
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
      <DezoSection spacing="compact" className="dezo-paper">
        <DezoContainer size="wide">
          <DezoStagger className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16" stagger={0.1}>
            <DezoStaggerItem>
              <p className="font-display text-5xl sm:text-6xl font-extrabold text-dezo-text-primary tracking-tightest tabular-nums">
                {liveCount}+
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-3">
                Live deployments catalogued
              </p>
              <p className="text-xs text-dezo-text-muted mt-2 leading-relaxed max-w-[16rem]">
                Linked projects from our public work archive — not inflated totals.
              </p>
            </DezoStaggerItem>
            <DezoStaggerItem>
              <p className="font-display text-5xl sm:text-6xl font-extrabold text-dezo-text-primary tracking-tightest">
                5
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-3">
                Integrated commercial pillars
              </p>
              <p className="text-xs text-dezo-text-muted mt-2 leading-relaxed max-w-[16rem]">
                Build · Brand · Marketplace · Grow · Intelligence
              </p>
            </DezoStaggerItem>
            <DezoStaggerItem>
              <p className="font-display text-5xl sm:text-6xl font-extrabold text-dezo-text-primary tracking-tightest">
                IN
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-3">
                Odisha roots, India scale
              </p>
              <p className="text-xs text-dezo-text-muted mt-2 leading-relaxed max-w-[16rem]">
                Studio in Bhubaneswar · shipping for brands nationwide
              </p>
            </DezoStaggerItem>
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* Pillars */}
      <DezoSection id="solutions" spacing="normal" className="bg-dezo-surface">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-18">
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
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-8 hover:bg-dezo-bg/60 transition-colors px-1 sm:px-4 -mx-1 sm:-mx-4"
                >
                  <span className="font-mono text-xs text-dezo-text-muted w-10 shrink-0 tracking-wider">
                    0{index + 1}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors sm:w-48 shrink-0 tracking-tight">
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

      {/* Featured live work */}
      <DezoSection spacing="normal" className="dezo-paper" id="work">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <DezoReveal>
              <DezoHeading
                badge="Selected work"
                as="h2"
                subtitle="Real live websites — click through to production sites. Previews from the public web, not mockups."
              >
                Brands that sell online
              </DezoHeading>
            </DezoReveal>
            <DezoReveal delay={0.08}>
              <DezoButton href="/work" variant="outline" size="sm">
                Full archive
              </DezoButton>
            </DezoReveal>
          </div>
          <DezoFeaturedWork projects={featuredProjects} />
        </DezoContainer>
      </DezoSection>

      {/* Case study framing */}
      <DezoSection spacing="normal" className="bg-dezo-surface">
        <DezoContainer size="wide">
          <div className="mb-14">
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

      {/* Tools Lab */}
      <DezoSection spacing="normal" className="dezo-paper">
        <DezoContainer size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <DezoReveal>
              <DezoHeading
                badge="DEZO Tools Lab"
                as="h2"
                subtitle="SEO, speed, accessibility, Shopify, security, CRO — free diagnostics that prove the craft."
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

          <DezoStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-dezo-border border border-dezo-border" stagger={0.07}>
            {liveToolsHome.map((tool) => (
              <DezoStaggerItem key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block h-full p-6 sm:p-7 bg-dezo-surface hover:bg-dezo-accent-soft/30 transition-colors group"
                >
                  <p className="font-display font-bold text-dezo-text-primary mb-2 group-hover:text-dezo-primary transition-colors">
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
      <DezoSection spacing="normal" className="bg-dezo-surface">
        <DezoContainer size="wide">
          <div className="mb-14">
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
      <DezoSection spacing="relaxed" className="dezo-ink-field text-dezo-text-inverse">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-highlight mb-5">
                Next step
              </p>
              <span className="dezo-accent-line !bg-dezo-highlight mb-6" aria-hidden />
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6 tracking-tightest">
                Ready to build a brand that sells?
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl">
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
                  className="!border-white/25 !text-white hover:!bg-white/10"
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

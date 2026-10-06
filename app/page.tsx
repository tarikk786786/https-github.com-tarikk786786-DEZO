import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import {
  brand,
  pillars,
  featuredCaseStudies,
  toolsLabPhase1,
} from '@/content/site';
import { portfolioData } from '@/content/projects';

export default function HomePage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;
  const phase1Unique = toolsLabPhase1.filter(
    (t, i, arr) => arr.findIndex((x) => x.name === t.name) === i
  );

  return (
    <>
      {/* Hero — one composition, brand-first, full-bleed atmosphere */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden dezo-hero-atmosphere">
        <div className="absolute inset-0 dezo-grid-fade pointer-events-none" aria-hidden />
        <div
          className="dezo-atmosphere-orb absolute -top-24 right-[-10%] w-[70vw] max-w-[720px] h-[70vw] max-h-[720px] rounded-full bg-dezo-primary/10 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="dezo-atmosphere-orb absolute bottom-[-20%] left-[-15%] w-[55vw] max-w-[520px] h-[55vw] max-h-[520px] rounded-full bg-dezo-highlight/15 blur-3xl pointer-events-none"
          style={{ animationDelay: '-6s' }}
          aria-hidden
        />

        {/* Full-bleed visual plane */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] opacity-90">
            <div className="absolute inset-0 bg-gradient-to-r from-dezo-bg via-transparent to-transparent z-10 lg:from-dezo-bg/90" />
            <div className="h-full w-full bg-[url('/dezo-logo-transparent.png')] bg-contain bg-right bg-no-repeat opacity-[0.07] scale-125 origin-right" />
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.12]"
              viewBox="0 0 800 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMaxYMid slice"
            >
              <path
                d="M120 780 C200 620, 280 540, 360 480 C440 420, 500 360, 560 280 C620 200, 680 140, 740 80"
                stroke="#0B6B52"
                strokeWidth="2"
              />
              <path
                d="M80 700 C180 640, 260 580, 340 500 C420 420, 480 340, 540 260"
                stroke="#1A5F7A"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <circle cx="560" cy="280" r="6" fill="#0B6B52" />
              <circle cx="360" cy="480" r="4" fill="#C4A35A" />
              <circle cx="740" cy="80" r="5" fill="#1A5F7A" />
              <text
                x="560"
                y="260"
                fill="#10131A"
                fontSize="14"
                fontFamily="monospace"
                opacity="0.5"
              >
                India
              </text>
            </svg>
          </div>
        </div>

        <DezoContainer size="wide" className="relative z-10 pb-16 pt-36 sm:pb-20 sm:pt-44 lg:pb-28 lg:pt-52">
          <div className="max-w-3xl">
            <DezoReveal delay={0.05} direction="up">
              <p className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tightest text-dezo-text-primary mb-6 sm:mb-8">
                DEZO
              </p>
            </DezoReveal>

            <DezoReveal delay={0.15} direction="up">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-dezo-text-primary leading-[1.15] mb-5">
                {brand.tagline}
              </h1>
            </DezoReveal>

            <DezoReveal delay={0.25} direction="up">
              <p className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-xl mb-8">
                {brand.supporting}
              </p>
            </DezoReveal>

            <DezoReveal delay={0.35} direction="up">
              <div className="flex flex-wrap items-center gap-3 mb-10">
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
            </DezoReveal>

            <DezoReveal delay={0.45} direction="up">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-dezo-text-secondary">
                <MapPin size={14} className="text-dezo-primary shrink-0" />
                {brand.geo}
              </p>
            </DezoReveal>
          </div>
        </DezoContainer>
      </section>

      {/* Journey strip */}
      <DezoSection spacing="compact" borderBottom className="bg-dezo-surface">
        <DezoContainer size="wide">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-6">
            Commercial Journey
          </p>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px dezo-journey-track -translate-y-1/2" />
            <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 relative">
              {brand.journey.map((step, i) => (
                <li key={step} className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-dezo-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold text-dezo-text-primary">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Proof — verifiable framing only */}
      <DezoSection spacing="compact" className="bg-dezo-bg-warm">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-dezo-text-primary tracking-tight">
                {liveCount}+
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-2">
                Live deployments catalogued
              </p>
              <p className="text-xs text-dezo-text-muted mt-1">
                Linked projects from our public work archive — not inflated totals.
              </p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-dezo-text-primary tracking-tight">
                5
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-2">
                Integrated commercial pillars
              </p>
              <p className="text-xs text-dezo-text-muted mt-1">
                Build · Brand · Marketplace · Grow · Intelligence
              </p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-dezo-text-primary tracking-tight">
                IN
              </p>
              <p className="text-sm font-semibold text-dezo-text-primary mt-2">
                Odisha roots, India scale
              </p>
              <p className="text-xs text-dezo-text-muted mt-1">
                Studio in Bhubaneswar · shipping for brands nationwide
              </p>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Five pillars — editorial, not card-clutter hero */}
      <DezoSection id="solutions" spacing="normal">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <DezoHeading
              badge="Platform"
              as="h2"
              subtitle="One studio across the full digital commercial stack — from first build to marketplace and paid growth."
            >
              Build. Brand. Marketplace. Grow. Intelligence.
            </DezoHeading>
            <DezoButton href="/solutions" variant="outline" size="sm">
              All solutions
            </DezoButton>
          </div>

          <div className="divide-y divide-dezo-border border-y border-dezo-border">
            {pillars.map((pillar, index) => (
              <Link
                key={pillar.slug}
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
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Featured case studies — real projects */}
      <DezoSection spacing="normal" className="bg-dezo-surface" borderTop>
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <DezoHeading
              badge="Evidence"
              as="h2"
              subtitle="Real live projects — framed as case studies, not anonymous testimonials or unverifiable ROI claims."
            >
              Brands we help sell
            </DezoHeading>
            <DezoButton href="/work" variant="outline" size="sm">
              Full work archive
            </DezoButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredCaseStudies.map((study) => (
              <article
                key={study.title}
                className="flex flex-col gap-4 p-6 sm:p-8 border border-dezo-border rounded-dezo-lg bg-dezo-bg/50"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-dezo-text-muted">
                  <span>{study.industry}</span>
                  <span aria-hidden>·</span>
                  <span>{study.location}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-dezo-text-primary">
                  {study.title}
                </h3>
                <dl className="grid gap-3 text-sm">
                  <div>
                    <dt className="text-dezo-text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                      Challenge
                    </dt>
                    <dd className="text-dezo-text-secondary">{study.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-dezo-text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                      Result
                    </dt>
                    <dd className="text-dezo-text-secondary">{study.result}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {study.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-1 bg-dezo-accent-soft text-dezo-primary rounded-dezo-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary hover:underline mt-1"
                >
                  View live site <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Tools Lab Phase 1 */}
      <DezoSection spacing="normal" borderTop>
        <DezoContainer size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <DezoHeading
              badge="DEZO Tools Lab"
              as="h2"
              subtitle="Phase 1 public diagnostics — SEO, speed, accessibility, schema, sitemap/robots, links, tech detection, and Shopify health."
            >
              Free tools that prove the craft
            </DezoHeading>
            <DezoButton href="/tools" variant="outline" size="sm">
              Open Tools Lab
            </DezoButton>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {phase1Unique.map((tool) => (
              <li key={tool.name}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block h-full p-5 border border-dezo-border rounded-dezo-md bg-dezo-surface hover:border-dezo-primary/40 transition-colors"
                >
                  <p className="font-display font-bold text-dezo-text-primary mb-1">
                    {tool.name}
                  </p>
                  <p className="text-xs text-dezo-text-secondary leading-relaxed">
                    {tool.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </DezoContainer>
      </DezoSection>

      {/* Work gallery */}
      <DezoSection id="work" spacing="normal" borderTop className="bg-dezo-bg-warm">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <DezoHeading
              badge="Archive"
              as="h2"
              subtitle="Browse live client deployments across fashion, healthcare, education, corporate, and more."
            >
              Selected live work
            </DezoHeading>
          </div>
          <DezoWorkGallery initialLimit={6} />
        </DezoContainer>
      </DezoSection>

      {/* CTA */}
      <DezoSection spacing="relaxed" borderTop className="bg-dezo-ink text-dezo-text-inverse">
        <DezoContainer size="wide">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-highlight mb-4">
              Next step
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight mb-5">
              Ready to build a brand that sells?
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-xl">
              A short project diagnostic routes your brief to studio leadership — channels,
              marketplace needs, timeline, and goals.
            </p>
            <div className="flex flex-wrap gap-3">
              <DezoButton
                href="/start-a-project"
                size="lg"
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
        </DezoContainer>
      </DezoSection>
    </>
  );
}

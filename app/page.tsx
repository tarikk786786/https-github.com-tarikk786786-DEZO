import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layers,
  BarChart3,
  MapPin,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoMetric } from '@/components/dezo/DezoMetric';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoMarquee } from '@/components/dezo/DezoMarquee';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import { DezoMarketplaceDashboard } from '@/components/dezo/DezoMarketplaceDashboard';
import { DezoContactForm } from '@/components/dezo/DezoContactForm';
import { DezoToolScanner } from '@/components/dezo/tools/DezoToolScanner';
import { DezoHeroStudioConsole } from '@/components/dezo/DezoHeroStudioConsole';
import { DezoReveal } from '@/lib/motion/MotionAdapter';

export default function HomePage() {
  const marqueeItems = [
    'We Build Brands That Sell',
    'Amazon & Flipkart Marketplace Scaling',
    'High-Speed Next.js Storefronts',
    'Bespoke Shopify Architecture',
    'Meta & Google Ads Management',
    'DEZO Growth OS Telemetry',
    'Built in Odisha · Built for India',
    'Technical SEO & Core Web Vitals',
  ];

  return (
    <>
      {/* ── 1. PREMIUM HERO (PRD Section 7) ── */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-36 overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-dezo-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-dezo-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <DezoContainer size="wide" className="relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Positioning Badge */}
            <DezoReveal delay={0.1} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dezo-surface border border-dezo-border text-dezo-text-primary text-xs font-semibold mb-8">
                <Sparkles size={14} className="text-dezo-accent" />
                <span>Digital Commerce · Brand · Marketplace · Growth Technology</span>
              </div>
            </DezoReveal>

            {/* Master Headline */}
            <DezoReveal delay={0.2} direction="up">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-dezo-text-primary mb-6">
                We Build Brands <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-dezo-accent via-blue-400 to-dezo-primary">
                  That Sell.
                </span>
              </h1>
            </DezoReveal>

            {/* Supporting Statement */}
            <DezoReveal delay={0.3} direction="up">
              <p className="text-base sm:text-xl text-dezo-text-secondary leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
                Digital engineering, ecommerce, Amazon & Flipkart marketplace growth, and performance marketing engineered together to help Indian businesses build, sell, and scale.
              </p>
            </DezoReveal>

            {/* Primary Actions */}
            <DezoReveal delay={0.4} direction="up">
              <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
                <DezoButton
                  href="/start-a-project"
                  size="lg"
                  magnetic
                  icon={<ArrowUpRight size={18} />}
                >
                  Start a Project
                </DezoButton>
                <DezoButton
                  href="/work"
                  variant="secondary"
                  size="lg"
                >
                  Explore Our Work
                </DezoButton>
              </div>
            </DezoReveal>

            {/* Geographic & Trust Anchor */}
            <DezoReveal delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-dezo-text-muted">
                <div className="flex items-center gap-1.5 font-mono text-dezo-accent font-semibold">
                  <MapPin size={13} />
                  <span>Built in Odisha · Built for India · Built to Scale</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <span>
                  Trusted by <strong className="text-dezo-text-primary">50+ businesses</strong> nationwide
                </span>
              </div>
            </DezoReveal>

            {/* Interactive Growth Engine Architecture Console */}
            <DezoReveal delay={0.6} direction="up" className="w-full">
              <DezoHeroStudioConsole />
            </DezoReveal>
          </div>
        </DezoContainer>
      </section>

      {/* ── 2. VERIFIED PROOF STRIP (PRD Section 8) ── */}
      <DezoSection spacing="compact" borderTop borderBottom className="bg-dezo-surface/50">
        <DezoContainer size="wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <DezoMetric
              value={5000}
              suffix="+"
              label="Projects Delivered"
              sublabel="Verified Commercial Code"
            />
            <DezoMetric
              value={11}
              suffix="+"
              label="Years Experience"
              sublabel="Digital Craftsmanship"
            />
            <DezoMetric
              value={10}
              suffix="+"
              label="Industries Scaled"
              sublabel="D2C, B2B, Healthcare"
            />
            <DezoMetric
              value={4.8}
              decimals={1}
              suffix="x"
              label="Average Client ROAS"
              sublabel="Measured Performance"
            />
          </div>
        </DezoContainer>
      </DezoSection>

      {/* ── 3. MARQUEE STRIP ── */}
      <DezoMarquee items={marqueeItems} speed="normal" className="border-b border-dezo-border" />

      {/* ── 4. THE FIVE PILLARS (PRD Section 3 & 9) ── */}
      <DezoSection id="solutions" spacing="normal">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <DezoHeading
              badge="Integrated Platform"
              as="h2"
              subtitle="From first line of code to national marketplace dominance. We handle the full digital commercial journey under one roof."
            >
              Five Disciplines. Complete Commercial Scale.
            </DezoHeading>
            <DezoButton href="/solutions" variant="outline" size="sm">
              View All Solutions
            </DezoButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* PILLAR 1: BUILD */}
            <DezoCard glow className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent">
                    <Code2 size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-dezo-accent">PILLAR 01</span>
                </div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-2">
                  BUILD · Digital Engineering
                </h3>
                <div className="text-xs text-dezo-accent font-semibold mb-3">
                  Websites · Ecommerce · Shopify · SaaS · Portals
                </div>
                <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed mb-6">
                  High-assurance Next.js and custom storefronts engineered for sub-second speeds, zero bloat, and frictionless conversion.
                </p>
              </div>
              <Link href="/solutions/build" className="text-xs font-bold text-dezo-accent hover:underline inline-flex items-center gap-1">
                Explore Build Solutions <ArrowRight size={12} />
              </Link>
            </DezoCard>

            {/* PILLAR 2: BRAND */}
            <DezoCard glow className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent">
                    <Sparkles size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-dezo-accent">PILLAR 02</span>
                </div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-2">
                  BRAND · Strategic Identity
                </h3>
                <div className="text-xs text-dezo-accent font-semibold mb-3">
                  Packaging · Positioning · Amazon Brand Stores · A+ Content
                </div>
                <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed mb-6">
                  We turn commodities into defensible brands that command 30-50% pricing power over generic competitors.
                </p>
              </div>
              <Link href="/solutions/brand" className="text-xs font-bold text-dezo-accent hover:underline inline-flex items-center gap-1">
                Explore Brand Studio <ArrowRight size={12} />
              </Link>
            </DezoCard>

            {/* PILLAR 3: MARKETPLACE */}
            <DezoCard glow className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent">
                    <ShoppingBag size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-dezo-accent">PILLAR 03</span>
                </div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-2">
                  MARKETPLACE · Amazon & Flipkart
                </h3>
                <div className="text-xs text-dezo-accent font-semibold mb-3">
                  Listing Indexing · PPC · Buy Box · Catalog Growth
                </div>
                <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed mb-6">
                  Complete seller account operations, Search Query Performance mining, and disciplined TACoS ad management.
                </p>
              </div>
              <Link href="/solutions/marketplace" className="text-xs font-bold text-dezo-accent hover:underline inline-flex items-center gap-1">
                Explore Marketplace Growth <ArrowRight size={12} />
              </Link>
            </DezoCard>

            {/* PILLAR 4: GROW */}
            <DezoCard glow className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent">
                    <TrendingUp size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-dezo-accent">PILLAR 04</span>
                </div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-2">
                  GROW · Performance Marketing
                </h3>
                <div className="text-xs text-dezo-accent font-semibold mb-3">
                  Meta Ads · Google Shopping · Technical SEO · CRO
                </div>
                <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed mb-6">
                  Precision ad spend management and organic Google dominance designed to maximize bottom-line profit.
                </p>
              </div>
              <Link href="/solutions/growth" className="text-xs font-bold text-dezo-accent hover:underline inline-flex items-center gap-1">
                Explore Growth Marketing <ArrowRight size={12} />
              </Link>
            </DezoCard>

            {/* PILLAR 5: INTELLIGENCE */}
            <DezoCard glow className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent">
                    <Cpu size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-dezo-accent">PILLAR 05</span>
                </div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-2">
                  INTELLIGENCE · DEZO Growth OS
                </h3>
                <div className="text-xs text-dezo-accent font-semibold mb-3">
                  AI Seller Engine · Cross-Channel Telemetry · Automation
                </div>
                <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed mb-6">
                  Our internal technology differentiator: unified telemetry that detects margin bleed and rank drops automatically.
                </p>
              </div>
              <Link href="/solutions/intelligence" className="text-xs font-bold text-dezo-accent hover:underline inline-flex items-center gap-1">
                Explore Growth OS <ArrowRight size={12} />
              </Link>
            </DezoCard>

            {/* REGIONAL ODYSSEY */}
            <DezoCard glow className="flex flex-col justify-between bg-dezo-primary/5 border-dezo-primary/30">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/20 border border-dezo-primary/40 flex items-center justify-center text-dezo-accent">
                    <MapPin size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-dezo-accent">ODISHA FOCUS</span>
                </div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-2">
                  DEZO Odisha Specialization
                </h3>
                <div className="text-xs text-dezo-accent font-semibold mb-3">
                  Bhubaneswar Studio · Cuttack · Regional Scale
                </div>
                <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed mb-6">
                  Specialized growth programs for Odisha manufacturers, education institutes, healthcare clinics, and D2C brands.
                </p>
              </div>
              <Link href="/locations/odisha" className="text-xs font-bold text-dezo-accent hover:underline inline-flex items-center gap-1">
                Explore DEZO Odisha <ArrowRight size={12} />
              </Link>
            </DezoCard>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* ── 4B. DEZO TOOLS LAB INTERACTIVE SCANNER (PRD S7) ── */}
      <DezoSection spacing="normal" borderTop className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <DezoHeading
              badge="DEZO Tools Lab"
              as="h2"
              subtitle="Run an instant, multi-engine audit on your website, Shopify store, Amazon ASIN, or keywords. 100% free with prioritized P0-P3 fixes."
            >
              Analyze. Discover. Grow.
            </DezoHeading>
            <DezoButton href="/tools" variant="outline" size="sm">
              Explore All 10 Intelligence Suites →
            </DezoButton>
          </div>

          <DezoToolScanner />
        </DezoContainer>
      </DezoSection>

      {/* ── 5. MARKETPLACE INTELLIGENCE FLAGSHIP DEMO ── */}
      <DezoSection spacing="normal" borderTop className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-12">
            <DezoHeading
              badge="Live Telemetry Demo"
              as="h2"
              subtitle="See how DEZO synthesizes sales, ad spend, and inventory data across Amazon, Flipkart, your website, and Meta into one single pane of glass."
            >
              Unified Commerce & Seller Telemetry
            </DezoHeading>
          </div>

          <DezoMarketplaceDashboard />
        </DezoContainer>
      </DezoSection>

      {/* ── 6. VERIFIED CASE STUDIES & 100+ LIVE PROOFS ── */}
      <DezoSection id="work" spacing="normal" borderTop>
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <DezoHeading
              badge="Evidence"
              as="h2"
              subtitle="Browse our verified live portfolio across D2C ecommerce, corporate portals, healthcare, real estate, and education."
            >
              100+ Live Client Deployments
            </DezoHeading>
            <DezoButton href="/work" variant="outline" size="sm">
              Explore All 100+ Proofs
            </DezoButton>
          </div>

          <DezoWorkGallery initialLimit={6} />
        </DezoContainer>
      </DezoSection>

      {/* ── 7. START A PROJECT LEAD FUNNEL CTA ── */}
      <DezoSection spacing="relaxed" borderTop className="bg-dezo-surface/40">
        <DezoContainer size="wide">
          <div className="p-8 sm:p-16 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-dezo-accent mb-2 block">
                Next-Step Action
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-dezo-text-primary mb-4 leading-tight">
                Ready to Build a Brand That Sells?
              </h2>
              <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
                Take our 2-minute project diagnostic. Our intake algorithm evaluates channel readiness, budget alignment, and assigns your brief directly to studio leadership.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <DezoButton href="/start-a-project" size="lg" magnetic icon={<ArrowUpRight size={18} />}>
                Start Project Diagnostic
              </DezoButton>
              <DezoButton href="/contact" variant="secondary" size="lg">
                Direct Contact Lines
              </DezoButton>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </>
  );
}

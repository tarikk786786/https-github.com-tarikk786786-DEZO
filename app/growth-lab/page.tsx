'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  Zap,
  Eye,
  ArrowRight,
  ShieldCheck,
  MousePointerClick,
  Package,
  TrendingUp,
  MapPin,
  BadgeCheck,
} from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoToolScanner } from '@/components/dezo/tools/DezoToolScanner';
import { DezoAuditReportView } from '@/components/dezo/tools/DezoAuditReportView';
import { DezoAIGrowthAdvisor } from '@/components/dezo/ai/DezoAIGrowthAdvisor';
import { UniversalAuditReport, ToolCategory } from '@/lib/tools/types';
import { TOOL_CATALOG } from '@/lib/tools/catalog';
import { DezoReveal, DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';

const ICONS: Partial<Record<ToolCategory, React.ElementType>> = {
  seo: Search,
  'page-speed': Zap,
  accessibility: Eye,
  shopify: ShoppingBag,
  security: ShieldCheck,
  cro: MousePointerClick,
  keywords: TrendingUp,
  'local-seo': MapPin,
  brand: BadgeCheck,
  amazon: Package,
  flipkart: Package,
};

export default function DezoLabPage() {
  const [activeReport, setActiveReport] = useState<UniversalAuditReport | null>(null);
  const liveTools = TOOL_CATALOG.filter((t) => t.availability === 'live');
  const demoTools = TOOL_CATALOG.filter((t) => t.availability === 'demo');

  const opportunityHint = activeReport
    ? Math.max(3, Math.min(12, Math.round((100 - activeReport.overallScore) / 8) + 4))
    : null;

  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-10">
              <DezoHeading
                badge="DEZO LAB"
                as="h1"
                subtitle="Free public diagnostics, multi-provider AI strategy advisor, and website audit tools. Marketplace tools stay labeled Demo — we never invent seller metrics."
              >
                DEZO Growth Lab & AI Intelligence
              </DezoHeading>
            </div>
          </DezoReveal>

          {!activeReport ? (
            <div className="space-y-12">
              {/* 1. DEZO AI Growth Advisor */}
              <DezoReveal delay={0.04}>
                <DezoAIGrowthAdvisor />
              </DezoReveal>

              {/* 2. URL Technical Deep-Scan Engine */}
              <DezoReveal delay={0.08}>
                <div className="border border-dezo-border bg-white rounded-dezo-lg p-6 sm:p-8 shadow-dezo-card">
                  <div className="mb-5 pb-4 border-b border-dezo-border">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary">
                      Technical Deep-Scan Engine
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl text-dezo-ink mt-1">
                      Live URL Diagnostics: SEO, Speed, Security & CRO Audit
                    </h2>
                  </div>
                  <DezoToolScanner
                    onAuditComplete={(rep) => {
                      setActiveReport(rep);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                  />
                </div>
              </DezoReveal>
            </div>
          ) : (
            <div className="space-y-6">
              {opportunityHint !== null && (
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border border-dezo-border bg-dezo-surface px-6 py-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-1">
                      Your results
                    </p>
                    <p className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary tracking-tight">
                      We spotted ~{opportunityHint} practical opportunities for this URL.
                    </p>
                  </div>
                  <DezoButton
                    onClick={() => {
                      setActiveReport(null);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Run another check
                  </DezoButton>
                </div>
              )}

              <DezoAuditReportView report={activeReport} />

              <div className="border border-dezo-border bg-dezo-bg-warm p-6 sm:p-8 mt-10">
                <div className="max-w-2xl">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary block mb-2">
                    Turn findings into action
                  </span>
                  <h3 className="font-display text-2xl font-bold text-dezo-text-primary mb-3">
                    Want the DEZO engineering team to fix these issues?
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                    Our developers and SEO specialists resolve crawl bottlenecks, image weight, mobile layout shifts, and tracking gaps within tight, fixed-scope sprints.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <DezoButton href="/start-a-project">
                      Discuss this audit on WhatsApp
                    </DezoButton>
                    <DezoButton
                      onClick={() => setActiveReport(null)}
                      variant="outline"
                    >
                      Audit another URL
                    </DezoButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DezoContainer>
      </DezoSection>

      {!activeReport && (
        <DezoSection spacing="compact" className="border-t border-dezo-border mt-16 pt-16">
          <DezoContainer size="wide">
            <DezoReveal>
              <div className="max-w-2xl mb-8">
                <DezoHeading
                  badge="DIAGNOSTIC SUITE"
                  as="h2"
                  subtitle="Prefer a dedicated page? Open any diagnostic below."
                >
                  Browse the toolkit
                </DezoHeading>
              </div>
            </DezoReveal>

            <DezoStagger
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dezo-border border border-dezo-border"
              stagger={0.04}
            >
              {liveTools.map((cat) => {
                const Icon = ICONS[cat.slug] || Search;
                return (
                  <DezoStaggerItem key={cat.slug}>
                    <Link
                      href={`/tools/${cat.slug}`}
                      className="block h-full p-6 bg-dezo-bg hover:bg-dezo-bg-warm transition-colors group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Icon size={18} className="text-dezo-primary mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-sans font-semibold text-dezo-text-primary group-hover:text-dezo-primary flex items-center gap-1.5">
                            {cat.name}
                            <ArrowRight
                              size={14}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </h3>
                          <p className="text-xs font-mono text-dezo-text-muted mt-0.5">
                            {cat.tagline}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-dezo-text-secondary leading-relaxed">
                        {cat.description}
                      </p>
                    </Link>
                  </DezoStaggerItem>
                );
              })}
            </DezoStagger>

            {demoTools.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display text-2xl font-bold text-dezo-text-primary mb-2">
                  Marketplace · Demo Diagnostics
                </h2>
                <p className="text-sm text-dezo-text-secondary mb-6 max-w-2xl">
                  Listing checklists from the public URL only — not connected to seller accounts. We evaluate visible listing signals to flag obvious conversion gaps.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {demoTools.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/tools/${cat.slug}`}
                      className="p-5 border border-dezo-border bg-dezo-bg hover:border-dezo-primary transition-colors flex items-start justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-dezo-primary font-bold block mb-1">
                          Demo mode
                        </span>
                        <h3 className="font-display text-base font-semibold text-dezo-text-primary">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-dezo-text-secondary mt-1">
                          {cat.description}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-dezo-text-muted mt-1 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-14 flex flex-wrap gap-3">
              <DezoButton href="/start-a-project" size="sm">
                Start a Project
              </DezoButton>
              <DezoButton href="/work" variant="outline" size="sm">
                See our work
              </DezoButton>
              <DezoButton href="/locations/bhubaneswar" variant="outline" size="sm">
                Bhubaneswar studio
              </DezoButton>
            </div>
          </DezoContainer>
        </DezoSection>
      )}
    </div>
  );
}

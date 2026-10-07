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
                subtitle="Practical tools for understanding your digital business. Run a public audit — scores and opportunities, without the spectacle."
              >
                Analyst toolkit
              </DezoHeading>
            </div>
          </DezoReveal>

          {!activeReport ? (
            <DezoReveal delay={0.06}>
              <div className="border border-dezo-border bg-dezo-surface p-1 sm:p-2">
                <DezoToolScanner
                  onAuditComplete={(rep) => {
                    setActiveReport(rep);
                    window.scrollTo({ top: 240, behavior: 'smooth' });
                  }}
                />
              </div>
            </DezoReveal>
          ) : (
            <div className="space-y-6">
              {opportunityHint !== null && (
                <div className="flex flex-wrap items-end justify-between gap-4 border border-dezo-border bg-dezo-surface px-6 py-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-1">
                      Audit summary
                    </p>
                    <p className="font-display text-2xl text-dezo-text-primary">
                      Score {Math.round(activeReport.overallScore)}
                      <span className="text-dezo-text-muted text-lg"> / 100</span>
                    </p>
                    <p className="text-sm text-dezo-text-secondary mt-1">
                      {opportunityHint} opportunities found
                    </p>
                  </div>
                  <DezoButton href="/contact" size="sm">
                    Discuss findings
                  </DezoButton>
                </div>
              )}
              <DezoAuditReportView
                report={activeReport}
                onReset={() => setActiveReport(null)}
              />
            </div>
          )}
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="mb-10">
              <DezoHeading
                badge="Live tools"
                as="h2"
                subtitle="Website, ecommerce, SEO, CRO, and security diagnostics. Marketplace engines are labeled demo until authorized APIs are available."
              >
                Available diagnostics
              </DezoHeading>
            </div>
          </DezoReveal>

          <DezoStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dezo-border border border-dezo-border" stagger={0.04}>
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
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
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
              <h2 className="font-display text-xl text-dezo-text-primary mb-2">
                Marketplace · demo mode
              </h2>
              <p className="text-sm text-dezo-text-secondary mb-6 max-w-2xl">
                Checklist scoring from URL/ASIN shape only — no fabricated seller APIs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoTools.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tools/${cat.slug}`}
                    className="p-6 border border-dashed border-dezo-border hover:border-dezo-primary/40 transition-colors"
                  >
                    <h3 className="font-sans font-semibold text-dezo-text-primary">{cat.name}</h3>
                    <p className="text-sm text-dezo-text-secondary mt-2">{cat.description}</p>
                    <span className="inline-block mt-3 text-[10px] uppercase tracking-wider text-dezo-primary">
                      Demo
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

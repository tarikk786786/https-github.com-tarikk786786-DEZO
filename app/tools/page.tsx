'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  Zap,
  Eye,
  ArrowRight,
  Sparkles,
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
import { DezoToolScanner } from '@/components/dezo/tools/DezoToolScanner';
import { DezoAuditReportView } from '@/components/dezo/tools/DezoAuditReportView';
import { UniversalAuditReport, ToolCategory } from '@/lib/tools/types';
import { TOOL_CATALOG } from '@/lib/tools/catalog';
import { DezoReveal, DezoStagger, DezoStaggerItem, DezoHoverLift } from '@/lib/motion/MotionAdapter';

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

export default function ToolsLabPage() {
  const [activeReport, setActiveReport] = useState<UniversalAuditReport | null>(null);
  const liveTools = TOOL_CATALOG.filter((t) => t.availability === 'live');
  const demoTools = TOOL_CATALOG.filter((t) => t.availability === 'demo');

  return (
    <div className="pt-24 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-10">
              <DezoHeading
                badge="DEZO Tools Lab"
                as="h1"
                subtitle="Free public diagnostics for websites, Shopify, keywords, CRO, security, and local SEO — plus honest Amazon/Flipkart demo checklists (no seller APIs faked)."
              >
                Analyze. Discover. Grow.
              </DezoHeading>
            </div>
          </DezoReveal>

          {!activeReport ? (
            <DezoReveal delay={0.08}>
              <DezoToolScanner
                onAuditComplete={(rep) => {
                  setActiveReport(rep);
                  window.scrollTo({ top: 260, behavior: 'smooth' });
                }}
              />
            </DezoReveal>
          ) : (
            <DezoAuditReportView
              report={activeReport}
              onReset={() => setActiveReport(null)}
            />
          )}
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" borderTop className="bg-dezo-surface">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-2">
                Live engines
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary">
                Working public tools
              </h2>
              <p className="text-sm text-dezo-text-secondary mt-2 max-w-2xl">
                URL tools use a lightweight SSRF-guarded probe. Keyword/local engines run
                client-side heuristics. No Postgres, Redis, or marketplace credentials required.
              </p>
            </div>
          </DezoReveal>

          <DezoStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14" stagger={0.06}>
            {liveTools.map((cat) => {
              const Icon = ICONS[cat.slug] || Sparkles;
              return (
                <DezoStaggerItem key={cat.slug}>
                  <DezoHoverLift>
                    <Link
                      href={`/tools/${cat.slug}`}
                      className="block h-full p-6 rounded-dezo-lg border border-dezo-border bg-dezo-bg hover:border-dezo-primary/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-dezo-md bg-dezo-accent-soft flex items-center justify-center text-dezo-primary">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors flex items-center gap-1.5">
                            {cat.name}
                            <ArrowRight
                              size={14}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </h3>
                          <p className="text-xs font-mono text-dezo-text-muted">{cat.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-dezo-text-secondary leading-relaxed">
                        {cat.description}
                      </p>
                      <span className="inline-block mt-4 text-[10px] font-bold uppercase tracking-wider text-dezo-primary bg-dezo-accent-soft px-2 py-0.5 rounded-dezo-sm">
                        {cat.badge || 'Live'} · Phase {cat.phase}
                      </span>
                    </Link>
                  </DezoHoverLift>
                </DezoStaggerItem>
              );
            })}
          </DezoStagger>

          <DezoReveal>
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-highlight mb-2">
                Marketplace · demo mode
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary">
                Amazon & Flipkart without fake APIs
              </h2>
              <p className="text-sm text-dezo-text-secondary mt-2 max-w-2xl">
                Public checklist scoring from URL/ASIN shape only. Seller APIs come later with
                authorized credentials.
              </p>
            </div>
          </DezoReveal>

          <DezoStagger className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.08}>
            {demoTools.map((cat) => {
              const Icon = ICONS[cat.slug] || Package;
              return (
                <DezoStaggerItem key={cat.slug}>
                  <DezoHoverLift>
                    <Link
                      href={`/tools/${cat.slug}`}
                      className="block h-full p-6 rounded-dezo-lg border border-dashed border-dezo-border bg-dezo-bg-warm hover:border-dezo-primary/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-dezo-md bg-white border border-dezo-border flex items-center justify-center text-dezo-primary">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                            {cat.name}
                          </h3>
                          <p className="text-xs font-mono text-dezo-text-muted">{cat.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-dezo-text-secondary leading-relaxed">
                        {cat.description}
                      </p>
                      <span className="inline-block mt-4 text-[10px] font-bold uppercase tracking-wider text-dezo-highlight bg-white px-2 py-0.5 rounded-dezo-sm border border-dezo-border">
                        Demo · Phase {cat.phase}
                      </span>
                    </Link>
                  </DezoHoverLift>
                </DezoStaggerItem>
              );
            })}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="compact" borderTop>
        <DezoContainer size="default">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-2">
              Methodology
            </p>
            <h3 className="font-display text-xl font-bold text-dezo-text-primary mb-3">
              Public observations. Disclosed modes. No fake seller APIs.
            </h3>
            <p className="text-sm text-dezo-text-secondary leading-relaxed">
              Live tools separate probe facts from recommendations. Marketplace engines are labeled
              demo until authorized SP-API / Flipkart access is available.
            </p>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

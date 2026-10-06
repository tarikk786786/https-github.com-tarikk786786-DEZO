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
    <div className="pt-24 pb-24 dezo-paper min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-12">
              <DezoHeading
                badge="DEZO Tools Lab"
                as="h1"
                subtitle="Free public diagnostics for websites, Shopify, keywords, CRO, security, and local SEO — plus honest Amazon/Flipkart demo checklists."
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

      <DezoSection spacing="normal" className="bg-dezo-surface">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="mb-12">
              <DezoHeading
                badge="Live engines"
                as="h2"
                subtitle="URL tools use a lightweight SSRF-guarded probe. Keyword and local engines run client-side heuristics — no marketplace credentials required."
              >
                Working public tools
              </DezoHeading>
            </div>
          </DezoReveal>

          <DezoStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dezo-border border border-dezo-border mb-16" stagger={0.05}>
            {liveTools.map((cat) => {
              const Icon = ICONS[cat.slug] || Sparkles;
              return (
                <DezoStaggerItem key={cat.slug}>
                  <Link
                    href={`/tools/${cat.slug}`}
                    className="block h-full p-6 sm:p-7 bg-dezo-bg hover:bg-dezo-accent-soft/40 transition-colors group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-dezo-md bg-dezo-accent-soft flex items-center justify-center text-dezo-primary shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors flex items-center gap-1.5">
                          {cat.name}
                          <ArrowRight
                            size={14}
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
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
                    <span className="inline-block mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-dezo-primary">
                      {cat.badge || 'Live'} · Phase {cat.phase}
                    </span>
                  </Link>
                </DezoStaggerItem>
              );
            })}
          </DezoStagger>

          <DezoReveal>
            <div className="mb-8">
              <DezoHeading
                badge="Marketplace · demo"
                as="h2"
                subtitle="Public checklist scoring from URL/ASIN shape only. Seller APIs come later with authorized credentials."
              >
                Amazon & Flipkart without fake APIs
              </DezoHeading>
            </div>
          </DezoReveal>

          <DezoStagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dezo-border border border-dashed border-dezo-border" stagger={0.08}>
            {demoTools.map((cat) => {
              const Icon = ICONS[cat.slug] || Package;
              return (
                <DezoStaggerItem key={cat.slug}>
                  <DezoHoverLift>
                    <Link
                      href={`/tools/${cat.slug}`}
                      className="block h-full p-6 sm:p-8 bg-dezo-bg-warm hover:bg-dezo-surface transition-colors group"
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
                      <span className="inline-block mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-dezo-highlight">
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

      <DezoSection spacing="compact" className="dezo-paper">
        <DezoContainer size="default">
          <div className="max-w-xl mx-auto text-center">
            <span className="dezo-accent-line mx-auto mb-5" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-3">
              Methodology
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary mb-4 tracking-tight">
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

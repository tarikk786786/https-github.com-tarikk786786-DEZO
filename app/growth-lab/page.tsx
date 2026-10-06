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
  Lock,
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

export default function GrowthLabPage() {
  const [activeReport, setActiveReport] = useState<UniversalAuditReport | null>(null);
  const [showFullLock, setShowFullLock] = useState(false);
  const liveTools = TOOL_CATALOG.filter((t) => t.availability === 'live');
  const demoTools = TOOL_CATALOG.filter((t) => t.availability === 'demo');

  return (
    <div className="pt-32 sm:pt-36 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-3xl mb-10">
              <DezoHeading
                badge="Growth Lab"
                as="h1"
                subtitle="Public diagnostics without login. Partial findings are free — unlock the full Growth Report when you’re ready to talk."
              >
                Analyze. Score. Grow.
              </DezoHeading>
            </div>
          </DezoReveal>

          {/* Growth Score funnel explainer */}
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { n: '01', t: 'Run audit', d: 'URL / ASIN probe — no login' },
              { n: '02', t: 'Partial findings', d: 'Key signals shown immediately' },
              { n: '03', t: 'Full Growth Report', d: 'Unlock via Get Full Growth Report' },
            ].map((s) => (
              <div
                key={s.n}
                className="p-4 rounded-dezo-md border border-dezo-border bg-dezo-surface"
              >
                <span className="font-mono text-[10px] text-dezo-primary">{s.n}</span>
                <p className="font-display font-bold text-dezo-text-primary mt-1">{s.t}</p>
                <p className="text-xs text-dezo-text-muted mt-1">{s.d}</p>
              </div>
            ))}
          </div>

          {!activeReport ? (
            <DezoReveal delay={0.08}>
              <DezoToolScanner
                onAuditComplete={(rep) => {
                  setActiveReport(rep);
                  setShowFullLock(true);
                  window.scrollTo({ top: 280, behavior: 'smooth' });
                }}
              />
            </DezoReveal>
          ) : (
            <div className="space-y-6">
              {/* Partial findings */}
              <div className="relative">
                <DezoAuditReportView
                  report={activeReport}
                  onReset={() => {
                    setActiveReport(null);
                    setShowFullLock(false);
                  }}
                />
                {showFullLock && (
                  <div className="mt-6 p-6 sm:p-8 rounded-dezo-lg border border-dezo-primary/30 bg-dezo-accent-soft flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex items-start gap-3">
                      <Lock size={20} className="text-dezo-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-display font-bold text-dezo-text-primary text-lg">
                          Full Growth Report locked
                        </p>
                        <p className="text-sm text-dezo-text-secondary mt-1 max-w-md">
                          You&apos;re seeing partial public findings. Unlock the full prioritized
                          Growth Report — recommendations, channel stack, and next actions.
                        </p>
                      </div>
                    </div>
                    <DezoButton href="/start-a-project" size="md">
                      Get Full Growth Report
                    </DezoButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="normal" className="bg-dezo-surface/40">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="mb-10">
              <DezoHeading
                badge="Live engines"
                as="h2"
                subtitle="Website, ecommerce, SEO, CRO, security — plus honest Amazon/Flipkart demos."
              >
                Working public tools
              </DezoHeading>
            </div>
          </DezoReveal>

          <DezoStagger
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dezo-border border border-dezo-border mb-14"
            stagger={0.05}
          >
            {liveTools.map((cat) => {
              const Icon = ICONS[cat.slug] || Sparkles;
              return (
                <DezoStaggerItem key={cat.slug}>
                  <Link
                    href={`/tools/${cat.slug}`}
                    className="block h-full p-6 bg-dezo-bg hover:bg-dezo-surface transition-colors group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-dezo-md bg-dezo-accent-soft flex items-center justify-center text-dezo-primary">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-dezo-text-primary group-hover:text-dezo-primary flex items-center gap-1.5">
                          {cat.name}
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                        </h3>
                        <p className="text-xs font-mono text-dezo-text-muted">{cat.tagline}</p>
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

          <DezoReveal>
            <h2 className="font-display text-xl font-bold text-dezo-text-primary mb-4">
              Marketplace · demo mode
            </h2>
            <p className="text-sm text-dezo-text-secondary mb-6 max-w-2xl">
              Amazon & Flipkart checklists from URL/ASIN shape only — no fake seller APIs.
            </p>
          </DezoReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoTools.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools/${cat.slug}`}
                className="p-6 border border-dashed border-dezo-border bg-dezo-bg hover:border-dezo-primary/40 transition-colors"
              >
                <h3 className="font-display font-bold text-dezo-text-primary">{cat.name}</h3>
                <p className="text-sm text-dezo-text-secondary mt-2">{cat.description}</p>
                <span className="inline-block mt-3 text-[10px] uppercase tracking-wider text-dezo-primary">
                  Demo
                </span>
              </Link>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

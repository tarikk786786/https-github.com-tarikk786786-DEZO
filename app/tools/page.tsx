'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoToolScanner } from '@/components/dezo/tools/DezoToolScanner';
import { DezoAuditReportView } from '@/components/dezo/tools/DezoAuditReportView';
import { UniversalAuditReport } from '@/lib/tools/types';
import { toolsLabPhase1 } from '@/content/site';
import {
  Search,
  ShoppingBag,
  Zap,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const PHASE1_CARDS = [
  {
    slug: 'seo',
    name: 'SEO Audit',
    tagline: 'Index & crawl readiness',
    description:
      'Titles, canonicals, schema signals, sitemap/robots discoverability, and broken-link observations.',
    icon: Search,
  },
  {
    slug: 'page-speed',
    name: 'Page Speed',
    tagline: 'Core Web Vitals oriented',
    description:
      'Performance diagnostics and public tech fingerprints for storefronts and marketing sites.',
    icon: Zap,
  },
  {
    slug: 'accessibility',
    name: 'Accessibility',
    tagline: 'WCAG-oriented checks',
    description:
      'Contrast, labels, and interaction heuristics to surface barriers before they cost conversions.',
    icon: Eye,
  },
  {
    slug: 'shopify',
    name: 'Shopify Audit',
    tagline: 'Storefront health',
    description:
      'Theme/app bloat signals, CWV friction, and checkout trust heuristics for Shopify stores.',
    icon: ShoppingBag,
  },
] as const;

export default function ToolsLabPage() {
  const [activeReport, setActiveReport] = useState<UniversalAuditReport | null>(null);

  return (
    <div className="pt-24 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-10">
            <DezoHeading
              badge="DEZO Tools Lab · Phase 1"
              as="h1"
              subtitle="Public free diagnostics for websites and Shopify stores. Later phases add keywords, marketplace, and ads engines — no account required for Phase 1."
            >
              Analyze. Discover. Grow.
            </DezoHeading>
          </div>

          {!activeReport ? (
            <DezoToolScanner
              onAuditComplete={(rep) => {
                setActiveReport(rep);
                window.scrollTo({ top: 280, behavior: 'smooth' });
              }}
            />
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
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-2">
              Phase 1 engines
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary">
              Ship-ready public tools
            </h2>
            <p className="text-sm text-dezo-text-secondary mt-2 max-w-2xl">
              SEO Audit, Page Speed, Accessibility, Schema, Sitemap/Robots, Broken Links, Tech
              Detector, and Shopify Audit — as scoped in the founding brief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {PHASE1_CARDS.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/tools/${cat.slug}`}
                  className="p-6 rounded-dezo-lg border border-dezo-border bg-dezo-bg hover:border-dezo-primary/40 transition-colors group flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
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
                </Link>
              );
            })}
          </div>

          <div className="p-6 rounded-dezo-lg border border-dashed border-dezo-border bg-dezo-bg-warm">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-dezo-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-dezo-text-primary mb-1">Coming in later phases</p>
                <p className="text-sm text-dezo-text-secondary leading-relaxed">
                  Keyword research, rank tracking, Amazon/Flipkart listing intelligence, Meta &
                  Google ads audits, and DEZO Growth OS dashboards — after Phase 1 public tools are
                  solid. Category routes for later engines remain available as placeholders.
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {toolsLabPhase1.map((t) => (
                    <li
                      key={t.name}
                      className="text-[11px] font-medium px-2 py-1 rounded-dezo-sm bg-dezo-surface border border-dezo-border text-dezo-text-secondary"
                    >
                      ✓ {t.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      <DezoSection spacing="compact" borderTop>
        <DezoContainer size="default">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-2">
              Methodology
            </p>
            <h3 className="font-display text-xl font-bold text-dezo-text-primary mb-3">
              Public observations only. Disclosed scoring.
            </h3>
            <p className="text-sm text-dezo-text-secondary leading-relaxed">
              Phase 1 tools use publicly reachable signals. Private account data and marketplace
              APIs are reserved for authorized later phases. Results separate facts from
              recommendations.
            </p>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

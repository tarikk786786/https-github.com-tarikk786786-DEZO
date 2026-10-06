'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoToolScanner } from '@/components/dezo/tools/DezoToolScanner';
import { DezoAuditReportView } from '@/components/dezo/tools/DezoAuditReportView';
import { UniversalAuditReport, ToolCategory } from '@/lib/tools/types';
import {
  Search,
  ShoppingBag,
  Zap,
  TrendingUp,
  Package,
  ShieldCheck,
  MousePointerClick,
  Eye,
  MapPin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface ToolCategoryCard {
  slug: ToolCategory;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}

const TOOL_CATEGORIES: ToolCategoryCard[] = [
  {
    slug: 'seo',
    name: 'SEO & Technical Crawl',
    tagline: 'Index equity & rich snippets',
    description: 'Diagnose canonical tags, mobile title truncation, Schema.org JSON-LD, and SERP CTR readiness.',
    icon: Search,
    badge: 'Popular',
  },
  {
    slug: 'shopify',
    name: 'Shopify Store Health',
    tagline: 'App script bloat & CWV',
    description: 'Pinpoint third-party app delays, theme liquid overhead, checkout friction, and CDN image compression.',
    icon: ShoppingBag,
    badge: 'D2C',
  },
  {
    slug: 'page-speed',
    name: 'PageSpeed & Core Web Vitals',
    tagline: 'LCP, INP & CLS telemetry',
    description: 'Simulate mobile 4G network performance, render-blocking stylesheets, and main-thread execution.',
    icon: Zap,
  },
  {
    slug: 'amazon',
    name: 'Amazon Listing Optimizer',
    tagline: 'SQP query harvesting & A9',
    description: 'Harvest high-volume keywords, benchmark image asset ratios, and assess Buy Box health.',
    icon: Package,
    badge: 'Marketplace',
  },
  {
    slug: 'flipkart',
    name: 'Flipkart Catalog Score',
    tagline: 'F-Assured badge readiness',
    description: 'Evaluate regional warehouse pin code delivery speed, product attribute completeness, and visibility.',
    icon: TrendingUp,
  },
  {
    slug: 'cro',
    name: 'Conversion Rate (CRO)',
    tagline: 'Checkout trust & drop-off',
    description: 'Audit mobile touch targets, COD payment assurances, shipping clarity, and checkout friction points.',
    icon: MousePointerClick,
  },
  {
    slug: 'security',
    name: 'Security & SSL Guard',
    tagline: 'TLS handshake & CSP',
    description: 'Verify SSL/TLS protocols, Content Security Policy headers, HSTS preloading, and SSRF safety.',
    icon: ShieldCheck,
  },
  {
    slug: 'accessibility',
    name: 'WCAG Accessibility',
    tagline: 'Contrast & touch targets',
    description: 'Test WCAG 2.1 AA compliance, color contrast ratios, screen-reader navigation, and font readability.',
    icon: Eye,
  },
  {
    slug: 'local-seo',
    name: 'Local SEO & Odisha Map',
    tagline: 'Google Business Profile',
    description: 'Audit Bhubaneswar, Cuttack, and pan-India local keyword intent, NAP consistency, and citations.',
    icon: MapPin,
    badge: 'Regional',
  },
  {
    slug: 'brand',
    name: 'Brand Health & Identity',
    tagline: 'Cross-channel footprint',
    description: 'Evaluate digital authority across Google, Amazon, social media profiles, and marketplace credibility.',
    icon: Sparkles,
  },
];

export default function ToolsLabPage() {
  const [activeReport, setActiveReport] = useState<UniversalAuditReport | null>(null);

  return (
    <div className="pt-24 pb-20">
      {/* ── HERO SECTION ── */}
      <DezoSection spacing="compact" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dezo-primary/10 border border-dezo-primary/20 text-dezo-accent text-xs font-bold uppercase tracking-widest">
              <Sparkles size={13} />
              <span>DEZO Tools Lab — Free Intelligence Engines</span>
            </div>

            <DezoHeading as="h1" align="center" className="tracking-tight">
              Analyze. Discover. <span className="text-dezo-accent">Grow.</span>
            </DezoHeading>

            <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
              Run free, multi-engine intelligence diagnostics across websites, Shopify stores, SEO, keywords, Amazon, Flipkart, performance, and brand presence. Zero sign-up required.
            </p>
          </div>

          {/* Interactive Tool Scanner */}
          {!activeReport ? (
            <DezoToolScanner
              onAuditComplete={(rep) => {
                setActiveReport(rep);
                window.scrollTo({ top: 300, behavior: 'smooth' });
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

      {/* ── TOOL CATEGORIES DIRECTORY ── */}
      <DezoSection spacing="normal" borderTop>
        <DezoContainer size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-dezo-border">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-dezo-accent font-semibold block mb-1">
                Specialized Diagnostic Engines
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-dezo-text-primary tracking-tight">
                Explore All 10 DEZO Intelligence Suites
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-dezo-text-muted max-w-md">
              Each engine combines automated deterministic crawl rules with DEZO Growth OS commercial benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/tools/${cat.slug}`}
                  className="p-6 rounded-dezo-xl bg-dezo-surface border border-dezo-border hover:border-dezo-primary/50 transition-all duration-300 group flex flex-col justify-between shadow-dezo-card hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-dezo-md bg-dezo-bg border border-dezo-border flex items-center justify-center text-dezo-accent group-hover:scale-110 transition-transform">
                        <Icon size={20} />
                      </div>
                      {cat.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-dezo-accent/15 text-dezo-accent border border-dezo-accent/30 uppercase tracking-wider">
                          {cat.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-dezo-text-primary group-hover:text-dezo-accent transition-colors flex items-center gap-1.5">
                        {cat.name}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <span className="text-xs font-mono text-dezo-text-muted block mt-0.5">
                        {cat.tagline}
                      </span>
                    </div>

                    <p className="text-xs text-dezo-text-secondary leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-dezo-border/50 flex items-center justify-between text-xs font-semibold text-dezo-text-muted group-hover:text-dezo-primary transition-colors">
                    <span>Launch Engine</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* ── METHODOLOGY & TRANSPARENCY ── */}
      <DezoSection spacing="compact" borderTop className="bg-dezo-surface/20">
        <DezoContainer size="default">
          <div className="p-8 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card text-center flex flex-col items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-dezo-accent font-semibold">
              Scoring Methodology & Security
            </span>
            <h3 className="text-xl font-bold text-dezo-text-primary">
              Deterministic Rules. Disclosed Benchmarks. Zero Vendor Bias.
            </h3>
            <p className="text-xs sm:text-sm text-dezo-text-secondary max-w-xl leading-relaxed">
              DEZO Tools Lab adheres to strict zero-vulnerability SSRF guardrails. Private IP ranges are blocked, scans are anonymous, and results separate verifiable DOM facts from prioritized strategic growth recommendations.
            </p>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

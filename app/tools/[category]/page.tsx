'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoToolScanner } from '@/components/dezo/tools/DezoToolScanner';
import { DezoAuditReportView } from '@/components/dezo/tools/DezoAuditReportView';
import { UniversalAuditReport, ToolCategory } from '@/lib/tools/types';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface CategoryConfig {
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  metricsMeasured: string[];
}

const CATEGORY_CONFIGS: Record<ToolCategory, CategoryConfig> = {
  seo: {
    title: 'SEO & Technical Crawl Engine',
    tagline: 'Index equity, mobile title truncation & canonical tags',
    description: 'Diagnose indexing issues, duplicate content traps, rich snippet JSON-LD, and search CTR bottlenecks.',
    highlights: [
      'Self-referential rel="canonical" validation',
      'Mobile SERP 60-character title truncation check',
      'Schema.org Product, Organization & FAQ JSON-LD detection',
      'Meta robots indexing directives review',
    ],
    metricsMeasured: ['Canonical Tag', 'Title Length', 'Meta Description', 'Schema.org JSON-LD', 'Robots.txt Equity'],
  },
  shopify: {
    title: 'Shopify Store Health & Speed Engine',
    tagline: 'App script bloat, Liquid overhead & checkout velocity',
    description: 'Scan your Shopify storefront for rogue app scripts, uncompressed media payloads, and mobile checkout drop-off triggers.',
    highlights: [
      'Third-party app script accumulation detection',
      'Shopify CDN responsive WebP/AVIF format verification',
      'theme.liquid DOM nesting and blocking script audit',
      'Mobile cart-to-checkout velocity signals',
    ],
    metricsMeasured: ['App Script Bloat', 'CDN Formatting', 'Checkout Flow', 'Liquid DOM Size', 'Cart Drawer Latency'],
  },
  'page-speed': {
    title: 'PageSpeed & Core Web Vitals Engine',
    tagline: 'LCP, INP, CLS & mobile 4G network performance',
    description: 'Evaluate Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift under real Indian 4G network conditions.',
    highlights: [
      'Largest Contentful Paint (LCP) target under 2.5s',
      'Interaction to Next Paint (INP) responsiveness',
      'Cumulative Layout Shift (CLS) layout stability',
      'Render-blocking CSS and JavaScript elimination',
    ],
    metricsMeasured: ['Mobile LCP', 'INP Latency', 'CLS Shift Score', 'TTFB Server Response', 'Payload Size'],
  },
  keywords: {
    title: 'Keyword Opportunity & Intent Engine',
    tagline: 'Indian search intent, CPC economics & ranking difficulty',
    description: 'Harvest commercial search queries across Google and marketplaces to identify unserved buyer demand in India.',
    highlights: [
      'Commercial buyer intent classification',
      'High-intent long-tail phrase extraction',
      'Tier-1 vs Tier-2 regional search distribution',
      'Content gap analysis vs top 3 SERP competitors',
    ],
    metricsMeasured: ['Search Intent', 'Long-tail Volume', 'Regional Demand', 'SERP Competition', 'CTR Potential'],
  },
  amazon: {
    title: 'Amazon India Listing Optimizer',
    tagline: 'Search Query Performance (SQP), title indexing & A9 algorithm',
    description: 'Audit product title character utilization, bullet point keyword density, gallery image ratios, and Buy Box competitiveness.',
    highlights: [
      '180-200 character title keyword utilization',
      '7 images + 1 video asset benchmark compliance',
      'A+ Content and Brand Story presence check',
      'Search Query Performance (SQP) gap detection',
    ],
    metricsMeasured: ['Title Harvesting', 'Image Ratio', 'A+ Content Presence', 'Review Velocity', 'Buy Box Health'],
  },
  flipkart: {
    title: 'Flipkart Catalog & F-Assured Engine',
    tagline: 'F-Assured qualification, warehouse distribution & attributes',
    description: 'Benchmark product listing completeness, Tier-2 delivery pin code coverage, and Flipkart organic ranking criteria.',
    highlights: [
      'F-Assured 2-day delivery badge eligibility check',
      'Mandatory and optional attribute completeness',
      'SuperCoin promotions and deal readiness',
      'Regional FC fulfillment hub distribution',
    ],
    metricsMeasured: ['F-Assured Tier', 'Attribute Completeness', 'Delivery Timelines', 'Image Clarity', 'Badge Readiness'],
  },
  cro: {
    title: 'Conversion Rate Optimization (CRO) Engine',
    tagline: 'Checkout friction, COD trust & mobile drop-off audit',
    description: 'Analyze friction points causing Indian shoppers to abandon carts: payment trust badges, shipping transparency, and COD assurances.',
    highlights: [
      'Cash on Delivery (COD) assurance visibility',
      'Mobile sticky Add-to-Cart and checkout button contrast',
      'Trust badges: UPI, Razorpay/Cashfree, and verified reviews',
      'Return policy and replacement window clarity',
    ],
    metricsMeasured: ['COD Trust Signals', 'Checkout Steps', 'Sticky CTA Presence', 'Social Proof', 'Policy Clarity'],
  },
  security: {
    title: 'Security, TLS & Header Guard',
    tagline: 'SSL handshake, CSP, HSTS & SSRF safety verification',
    description: 'Verify your digital presence meets modern enterprise security standards with strict header and TLS verification.',
    highlights: [
      'TLS 1.3 encryption handshake audit',
      'Strict-Transport-Security (HSTS) preloading',
      'Content-Security-Policy (CSP) injection defense',
      'X-Content-Type-Options & Frame-Options validation',
    ],
    metricsMeasured: ['TLS Version', 'HSTS Header', 'CSP Directives', 'X-Frame-Options', 'Mixed Content'],
  },
  accessibility: {
    title: 'WCAG Accessibility & Usability Engine',
    tagline: 'WCAG 2.1 AA standards, contrast & touch target size',
    description: 'Ensure your website is accessible to all Indian users across devices, screen readers, and low-vision displays.',
    highlights: [
      'WCAG 2.1 AA minimum 4.5:1 color contrast ratio',
      'Minimum 44x44px mobile interactive touch targets',
      'Semantic HTML landmarks (main, nav, header, footer)',
      'Image alt-text description completeness',
    ],
    metricsMeasured: ['Color Contrast', 'Touch Targets', 'Semantic ARIA', 'Alt Attributes', 'Keyboard Nav'],
  },
  'local-seo': {
    title: 'Local SEO & Odisha Regional Hub Engine',
    tagline: 'Google Business Profile, Bhubaneswar NAP & local ranking',
    description: 'Maximize local search visibility for businesses in Bhubaneswar, Cuttack, Rourkela, and pan-India local markets.',
    highlights: [
      'Google Business Profile (GBP) consistency check',
      'Name, Address, Phone (NAP) citation uniformity',
      'Hyperlocal keyword targeting (e.g. "Bhubaneswar", "Odisha")',
      'Local schema LocalBusiness JSON-LD implementation',
    ],
    metricsMeasured: ['GBP Completeness', 'NAP Uniformity', 'Local Schema', 'Hyperlocal Queries', 'Review Rating'],
  },
  brand: {
    title: 'Brand Health & Cross-Channel Footprint',
    tagline: 'Authority, marketplace consistency & digital presence',
    description: 'Audit consistency of branding across web storefronts, Amazon Brand Stores, Google knowledge panels, and social channels.',
    highlights: [
      'Visual identity and typography consistency',
      'Omnichannel pricing parity (Shopify vs Amazon)',
      'Verified domain reputation and social proof links',
      'Trademark and brand registry alignment',
    ],
    metricsMeasured: ['Pricing Parity', 'Omnichannel Identity', 'Brand Registry', 'Social Footprint', 'Trust Score'],
  },
};

export default function CategoryToolPage() {
  const params = useParams();
  const categorySlug = (params?.category as ToolCategory) || 'seo';
  const config = CATEGORY_CONFIGS[categorySlug] || CATEGORY_CONFIGS.seo;

  const [activeReport, setActiveReport] = useState<UniversalAuditReport | null>(null);

  return (
    <div className="pt-24 pb-20">
      <DezoSection spacing="compact" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          {/* Back breadcrumb */}
          <div className="mb-6">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs font-semibold text-dezo-text-muted hover:text-dezo-accent transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to All DEZO Tools</span>
            </Link>
          </div>

          {/* Category Hero */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dezo-primary/10 border border-dezo-primary/20 text-dezo-accent text-xs font-bold uppercase tracking-widest">
              <Sparkles size={13} />
              <span>DEZO Specialized Engine</span>
            </div>

            <DezoHeading as="h1" align="center" className="tracking-tight">
              {config.title}
            </DezoHeading>

            <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Interactive Tool Scanner */}
          {!activeReport ? (
            <DezoToolScanner
              initialCategory={categorySlug}
              categories={
                // Allow any catalog tool on its dedicated route
                [categorySlug]
              }
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

      {/* ── WHAT THIS ENGINE MEASURES ── */}
      <DezoSection spacing="normal" borderTop>
        <DezoContainer size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="p-6 sm:p-8 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-dezo-accent font-semibold">
                Core Inspection Checklist
              </span>
              <h3 className="text-xl font-bold text-dezo-text-primary">
                What This Engine Evaluates
              </h3>
              <ul className="flex flex-col gap-3 pt-2">
                {config.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-dezo-text-secondary">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-dezo-accent font-semibold">
                Deterministic Metrics
              </span>
              <h3 className="text-xl font-bold text-dezo-text-primary">
                Telemetry & Score Weighting
              </h3>
              <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed">
                Our engine uses strict deterministic DOM and network benchmarks. We do not provide arbitrary scoring — every metric reflects verifiable impact on search impressions and conversion rates.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {config.metricsMeasured.map((m, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-dezo-sm bg-dezo-bg border border-dezo-border text-xs font-mono font-medium text-dezo-text-primary"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-dezo-border text-xs text-dezo-text-muted">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Zero private data collected. 100% anonymous crawl.</span>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

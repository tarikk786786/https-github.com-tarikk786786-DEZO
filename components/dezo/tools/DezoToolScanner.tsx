'use client';

import React, { useState } from 'react';
import { Search, Loader2, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { ToolCategory, UniversalAuditReport } from '@/lib/tools/types';
import { runUniversalAudit } from '@/lib/tools/engine';

interface DezoToolScannerProps {
  initialCategory?: ToolCategory;
  onAuditComplete?: (report: UniversalAuditReport) => void;
  className?: string;
}

const CATEGORY_META: Record<
  ToolCategory,
  { name: string; placeholder: string; example: string; description: string }
> = {
  seo: {
    name: 'SEO Audit',
    placeholder: 'Enter website URL (e.g. brand.in)',
    example: 'https://example.com',
    description: 'Diagnose indexing, canonical tags, mobile titles, and SERP CTR readiness.',
  },
  shopify: {
    name: 'Shopify Store',
    placeholder: 'Enter Shopify URL (e.g. store.myshopify.com or brand.com)',
    example: 'https://store.myshopify.com',
    description: 'Detect app script bloat, theme payload, CDN optimization, and checkout blockers.',
  },
  'page-speed': {
    name: 'Page Speed & CWV',
    placeholder: 'Enter website or landing page URL',
    example: 'https://example.com/shop',
    description: 'Evaluate Largest Contentful Paint (LCP), INP, Cumulative Layout Shift, and mobile load speed.',
  },
  keywords: {
    name: 'Keyword Opportunity',
    placeholder: 'Enter seed keyword or product phrase (e.g. sambalpuri saree)',
    example: 'ayurvedic skin oil',
    description: 'Surface commercial intent volume, Indian search competition, and ranking opportunities.',
  },
  amazon: {
    name: 'Amazon Listing',
    placeholder: 'Enter Amazon Product URL or ASIN (e.g. amazon.in/dp/B08...)',
    example: 'https://amazon.in/dp/B08N5WRWNW',
    description: 'Analyze title keyword harvesting, bullet points, image ratios, and Buy Box readiness.',
  },
  flipkart: {
    name: 'Flipkart Listing',
    placeholder: 'Enter Flipkart Product URL or FSN',
    example: 'https://flipkart.com/p/itm123...',
    description: 'Check F-Assured tier qualification, regional pin code speed, and catalog scoring.',
  },
  cro: {
    name: 'CRO / Conversion',
    placeholder: 'Enter storefront or cart URL',
    example: 'https://example.com/checkout',
    description: 'Audit mobile trust badges, checkout friction, COD assurances, and abandonment leaks.',
  },
  security: {
    name: 'Security & SSL',
    placeholder: 'Enter domain name or URL',
    example: 'https://example.com',
    description: 'Audit SSL/TLS handshake, HSTS, CSP headers, mixed content, and SSRF safety.',
  },
  accessibility: {
    name: 'Accessibility / WCAG',
    placeholder: 'Enter website URL',
    example: 'https://example.com',
    description: 'Check WCAG 2.1 contrast ratios, screen-reader landmarks, and mobile touch targets.',
  },
  'local-seo': {
    name: 'Local SEO (Odisha & India)',
    placeholder: 'Enter business name, city, or website URL',
    example: 'dental clinic bhubaneswar',
    description: 'Audit Google Business Profile readiness, NAP consistency, and local geographic intent.',
  },
  brand: {
    name: 'Brand Health',
    placeholder: 'Enter brand name or domain',
    example: 'dezo.in',
    description: 'Cross-channel brand footprint review across web, search, marketplaces, and social channels.',
  },
};

export function DezoToolScanner({
  initialCategory = 'seo',
  onAuditComplete,
  className = '',
}: DezoToolScannerProps) {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>(initialCategory);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'error' | 'success'>('idle');
  const [progressStep, setProgressStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentMeta = CATEGORY_META[selectedCategory] || CATEGORY_META.seo;

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    setStatus('scanning');
    setErrorMessage(null);

    // Multi-step diagnostic simulation while executing deterministic logic
    const steps = [
      'Validating security & SSRF boundary...',
      'Executing HTTP headers & SSL handshake inspection...',
      'Crawling DOM structure & semantic hierarchy...',
      'Computing weighted category benchmark scores...',
      'Synthesizing DEZO Growth recommendation matrix...',
    ];

    try {
      let stepIndex = 0;
      setProgressStep(steps[stepIndex]);
      const interval = setInterval(() => {
        stepIndex++;
        if (stepIndex < steps.length) {
          setProgressStep(steps[stepIndex]);
        }
      }, 350);

      const report = await runUniversalAudit(inputVal, selectedCategory);

      clearInterval(interval);
      setStatus('success');
      setProgressStep('Complete!');

      if (onAuditComplete) {
        onAuditComplete(report);
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to scan this target. Please verify URL and try again.'
      );
    }
  };

  const handlePrefill = (example: string) => {
    setInputVal(example);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
        {(Object.keys(CATEGORY_META) as ToolCategory[]).map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setErrorMessage(null);
                if (status === 'error') setStatus('idle');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-dezo-primary text-white shadow-md shadow-dezo-primary/20'
                  : 'bg-dezo-surface border border-dezo-border text-dezo-text-secondary hover:text-dezo-text-primary hover:border-dezo-border-subtle'
              }`}
            >
              {CATEGORY_META[cat].name}
            </button>
          );
        })}
      </div>

      {/* Main Scanner Box */}
      <div className="p-4 sm:p-6 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-dezo-text-muted">
            <span className="font-semibold text-dezo-text-secondary">
              Engine: <strong className="text-dezo-accent">{currentMeta.name}</strong>
            </span>
            <div className="flex items-center gap-1.5 text-dezo-text-muted">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>SSRF Protected & Anonymous</span>
            </div>
          </div>

          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dezo-text-muted pointer-events-none"
              />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={currentMeta.placeholder}
                disabled={status === 'scanning'}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-dezo-md bg-dezo-bg border border-dezo-border text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none focus:border-dezo-primary focus:ring-1 focus:ring-dezo-primary transition-all disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'scanning' || !inputVal.trim()}
              className="px-6 py-3 rounded-dezo-md bg-dezo-primary hover:bg-dezo-primary-hover active:scale-98 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-dezo-primary/20 shrink-0"
            >
              {status === 'scanning' ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Prefill & Description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-dezo-text-muted gap-2 pt-1 border-t border-dezo-border/40">
            <span className="text-[11px] leading-relaxed line-clamp-1">{currentMeta.description}</span>
            <button
              type="button"
              onClick={() => handlePrefill(currentMeta.example)}
              className="text-[11px] font-medium text-dezo-accent hover:underline flex items-center gap-1 shrink-0 cursor-pointer text-left"
            >
              <Sparkles size={11} />
              <span>Try example: {currentMeta.example}</span>
            </button>
          </div>
        </div>

        {/* Scan Progress Bar & Message */}
        {status === 'scanning' && (
          <div className="mt-4 p-3 rounded-dezo-sm bg-dezo-bg/70 border border-dezo-border flex items-center gap-3 animate-pulse">
            <Loader2 size={16} className="animate-spin text-dezo-accent shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-xs font-semibold text-dezo-text-primary">
                Running 42 Multi-Engine Diagnostics
              </span>
              <span className="text-[11px] text-dezo-text-muted font-mono">{progressStep}</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {status === 'error' && (
          <div className="mt-4 p-3 rounded-dezo-sm bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs">
            <AlertCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-rose-200">Scan Incomplete</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

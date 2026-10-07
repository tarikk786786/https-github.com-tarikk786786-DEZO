'use client';

import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ToolCategory, UniversalAuditReport } from '@/lib/tools/types';
import { runUniversalAudit } from '@/lib/tools/engine';
import { LIVE_SCANNER_CATEGORIES, getToolMeta } from '@/lib/tools/catalog';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

interface DezoToolScannerProps {
  initialCategory?: ToolCategory;
  onAuditComplete?: (report: UniversalAuditReport) => void;
  className?: string;
  categories?: ToolCategory[];
}

const CATEGORY_META: Record<
  ToolCategory,
  { name: string; placeholder: string; example: string; description: string }
> = {
  seo: {
    name: 'SEO Audit',
    placeholder: 'Enter your website URL',
    example: 'https://dezo.in',
    description: 'Titles, indexing signals, and crawl basics from a public check.',
  },
  shopify: {
    name: 'Shopify Audit',
    placeholder: 'Enter your store URL',
    example: 'https://www.shopify.com',
    description: 'Storefront health, HTTPS, and common storefront issues.',
  },
  'page-speed': {
    name: 'Page Speed',
    placeholder: 'Enter a page URL',
    example: 'https://dezo.in',
    description: 'Load signals: response time, page weight, and mobile basics.',
  },
  keywords: {
    name: 'Keyword Opportunity',
    placeholder: 'Enter a seed keyword (e.g. sambalpuri saree online)',
    example: 'sambalpuri saree online',
    description: 'India-intent clusters from your keyword — not Google Planner volumes.',
  },
  amazon: {
    name: 'Amazon Listing',
    placeholder: 'Amazon product URL or ASIN',
    example: 'https://www.amazon.in/dp/B0EXAMPLE01',
    description: 'Demo checklist from the listing URL — not connected to Amazon APIs.',
  },
  flipkart: {
    name: 'Flipkart Catalog',
    placeholder: 'Flipkart product URL',
    example: 'https://www.flipkart.com',
    description: 'Demo checklist from the product URL — not connected to Flipkart APIs.',
  },
  cro: {
    name: 'CRO Checklist',
    placeholder: 'Enter store, product, or checkout URL',
    example: 'https://example.com/cart',
    description: 'Conversion basics: trust, shipping clarity, and mobile CTAs.',
  },
  security: {
    name: 'Security & Headers',
    placeholder: 'Enter domain or URL',
    example: 'https://dezo.in',
    description: 'HTTPS and public security header checks — safe and anonymous.',
  },
  accessibility: {
    name: 'Accessibility',
    placeholder: 'Enter website URL',
    example: 'https://dezo.in',
    description: 'Title, viewport, and accessibility cues for a follow-up review.',
  },
  'local-seo': {
    name: 'Local SEO',
    placeholder: 'Business + city (e.g. dental clinic bhubaneswar)',
    example: 'dental clinic bhubaneswar',
    description: 'Local search readiness for Odisha and India businesses.',
  },
  brand: {
    name: 'Brand Health',
    placeholder: 'Brand name or domain',
    example: 'dezo.in',
    description: 'Naming consistency and channel presence checks.',
  },
};

export function DezoToolScanner({
  initialCategory = 'seo',
  onAuditComplete,
  className = '',
  categories = LIVE_SCANNER_CATEGORIES,
}: DezoToolScannerProps) {
  const reduced = useReducedMotion();
  const safeInitial = categories.includes(initialCategory) ? initialCategory : categories[0];
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>(safeInitial);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'error' | 'success'>('idle');
  const [progressStep, setProgressStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentMeta = CATEGORY_META[selectedCategory] || CATEGORY_META.seo;
  const availability = getToolMeta(selectedCategory).availability;

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    setStatus('scanning');
    setErrorMessage(null);

    const steps = [
      'Checking your input…',
      availability === 'demo'
        ? 'Running marketplace demo checklist…'
        : 'Reading public page signals…',
      'Scoring findings…',
      'Ranking what to fix first…',
    ];

    try {
      let stepIndex = 0;
      setProgressStep(steps[stepIndex]);
      const interval = setInterval(() => {
        stepIndex++;
        if (stepIndex < steps.length) setProgressStep(steps[stepIndex]);
      }, 420);

      const report = await runUniversalAudit(inputVal, selectedCategory);
      clearInterval(interval);
      setStatus('success');
      setProgressStep('Complete');
      onAuditComplete?.(report);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to scan this target. Please verify input and try again.'
      );
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none mb-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const meta = getToolMeta(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setErrorMessage(null);
                if (status === 'error') setStatus('idle');
              }}
              className={`relative px-3 py-1.5 rounded-dezo-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-dezo-primary text-white'
                  : 'bg-dezo-surface border border-dezo-border text-dezo-text-secondary hover:text-dezo-text-primary hover:border-dezo-border-strong'
              }`}
            >
              {CATEGORY_META[cat].name}
              {meta.availability === 'demo' && (
                <span
                  className={`ml-1.5 text-[9px] uppercase tracking-wider ${
                    isActive ? 'text-white/80' : 'text-dezo-highlight'
                  }`}
                >
                  Demo
                </span>
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        layout={!reduced}
        className="p-4 sm:p-6 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card relative overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-dezo-primary via-dezo-highlight to-dezo-primary opacity-80" />

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-dezo-text-muted">
            <span className="font-semibold text-dezo-text-secondary">
              <strong className="text-dezo-primary">{currentMeta.name}</strong>
              {availability === 'demo' && (
                <span className="ml-2 text-[10px] uppercase tracking-wider text-dezo-highlight font-bold">
                  Demo
                </span>
              )}
            </span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-dezo-primary" />
              <span>Safe public scan · no login</span>
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
                className="w-full pl-10 pr-4 py-3.5 text-sm rounded-dezo-md bg-dezo-bg border border-dezo-border text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none focus:border-dezo-primary focus:ring-1 focus:ring-dezo-primary transition-all disabled:opacity-60"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'scanning' || !inputVal.trim()}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              className="px-6 py-3.5 rounded-dezo-md bg-dezo-primary hover:bg-dezo-primary-hover text-white font-semibold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {status === 'scanning' ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span>Analyzing…</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-dezo-text-muted gap-2 pt-1 border-t border-dezo-border/40">
            <span className="text-[11px] leading-relaxed">{currentMeta.description}</span>
            <button
              type="button"
              onClick={() => setInputVal(currentMeta.example)}
              className="text-[11px] font-medium text-dezo-primary hover:underline flex items-center gap-1 shrink-0 cursor-pointer text-left"
            >
              <span>Try example →</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {status === 'scanning' && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-dezo-sm bg-dezo-accent-soft/50 border border-dezo-border flex items-center gap-3"
            >
              <Loader2 size={16} className="animate-spin text-dezo-primary shrink-0" />
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-xs font-semibold text-dezo-text-primary">
                  Running {currentMeta.name}
                </span>
                <span className="text-[11px] text-dezo-text-muted font-mono">{progressStep}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === 'error' && (
          <div className="mt-4 p-3 rounded-dezo-sm bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-800 text-xs">
            <AlertCircle size={15} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-red-900">Scan incomplete</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

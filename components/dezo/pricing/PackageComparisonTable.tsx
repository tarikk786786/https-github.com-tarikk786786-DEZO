'use client';

import React from 'react';
import { WEBSITE_PACKAGES, WebsitePackage } from '@/content/website-pricing-catalog';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function PackageComparisonTable() {
  return (
    <div className="w-full bg-dezo-bg border-2 border-dezo-ink p-6 sm:p-10 shadow-[6px_6px_0_0_#0B0B0A]" id="packages">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Sparkles size={13} className="text-dezo-primary" />
            <span>Structured Service Models</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            5 Transparent Website Development Packages
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            Choose the package engineered for your current business stage. Every package features fixed scope, documented quality checks, and full source-code ownership.
          </p>
        </div>
        <div className="text-xs font-mono text-dezo-text-muted shrink-0">
          All Prices Framed as "Starting from"
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-8">
        {WEBSITE_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-5 sm:p-6 border-2 flex flex-col justify-between transition-all ${
              pkg.popular
                ? 'bg-dezo-bg-warm border-dezo-ink shadow-[4px_4px_0_0_#B08D57]'
                : 'bg-white border-dezo-ink shadow-[2px_2px_0_0_#0B0B0A]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-dezo-ink text-dezo-bg">
                  {pkg.name}
                </span>
                {pkg.popular && (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-dezo-primary font-bold">
                    [POPULAR]
                  </span>
                )}
              </div>

              <div className="my-3 pb-3 border-b border-dezo-ink/15">
                <span className="text-[10px] font-mono text-dezo-text-muted block uppercase">
                  Starting Price
                </span>
                <p className="font-display text-2xl font-black text-dezo-ink">
                  {pkg.startingPrice}
                </p>
              </div>

              <p className="text-xs font-mono text-dezo-text-secondary leading-relaxed mb-4">
                <strong>Best for:</strong> {pkg.bestFor}
              </p>

              <div className="pt-3 border-t border-dezo-ink/10 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-dezo-primary font-bold block mb-2">
                  Included Features:
                </span>
                <ul className="space-y-1.5">
                  {pkg.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] text-dezo-text-primary leading-tight">
                      <CheckCircle2 size={12} className="text-dezo-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-dezo-ink/10 text-[10px] font-mono text-dezo-text-muted">
                <p>
                  <strong>Revisions:</strong> {pkg.revisions}
                </p>
                <p>
                  <strong>Warranty:</strong> {pkg.warranty}
                </p>
                <p>
                  <strong>Handover:</strong> {pkg.handover}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dezo-ink/15 space-y-2">
              <Link
                href={`/start-a-project?package=${pkg.name}&startingPrice=${pkg.startingPriceNumeric}`}
                className="w-full py-2.5 px-3 bg-dezo-ink text-dezo-bg text-center text-xs font-mono uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-colors flex items-center justify-center gap-1 border border-dezo-ink"
              >
                Choose {pkg.name} <ArrowRight size={12} />
              </Link>
              <a
                href={`https://wa.me/919114411026?text=${encodeURIComponent(
                  `Hello DEZO Team, I am interested in Package ${pkg.name} (${pkg.startingPrice}). Please share the exact scope checklist and onboarding steps.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-dezo-bg-warm text-dezo-ink text-center text-[11px] font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center justify-center gap-1 border border-dezo-border"
              >
                <MessageSquare size={11} className="text-[#25D366]" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Explicit Exclusions Notice */}
      <div className="p-4 bg-dezo-bg-warm border-2 border-dezo-ink flex items-start gap-3 text-xs font-mono text-dezo-text-secondary">
        <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-dezo-ink">What is Not Included in Base Packages:</strong> Domain registration ($12–$15/year), third-party cloud hosting ($5–$25/mo or paid directly to host), paid premium plugin licenses (billed at actuals with zero agency markup), and paid marketing advertising budgets (paid directly to Google/Meta).
        </p>
      </div>
    </div>
  );
}

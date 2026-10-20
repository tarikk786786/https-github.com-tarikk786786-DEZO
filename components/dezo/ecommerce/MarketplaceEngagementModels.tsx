'use client';

import React from 'react';
import { MARKETPLACE_ENGAGEMENT_TIERS, MarketplaceEngagementTier } from '@/content/ecommerce-catalog';
import { CheckCircle2, ShieldCheck, ArrowRight, Clock, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function MarketplaceEngagementModels() {
  return (
    <div className="w-full bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-10 shadow-[4px_4px_0_0_#0B0B0A]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <ShieldCheck size={13} className="text-dezo-primary" />
            <span>Documented Scope & Deliverables</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            Engagement Tiers & Project Models
          </h3>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            Choose between fixed-scope milestone projects or ongoing monthly performance retainers. We clearly document deliverables, prerequisites, and timelines upfront.
          </p>
        </div>
        <div className="text-xs font-mono text-dezo-text-muted shrink-0">
          Zero Hidden Markups on Ad Spend
        </div>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {MARKETPLACE_ENGAGEMENT_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-dezo-ink text-dezo-bg text-[10px] font-mono uppercase tracking-wider font-bold">
                  {tier.model}
                </span>
                <span className="text-[11px] font-mono text-dezo-primary flex items-center gap-1 font-bold">
                  <Clock size={12} /> {tier.timeline}
                </span>
              </div>

              <h4 className="font-display text-xl font-bold uppercase text-dezo-ink mb-2">
                {tier.name}
              </h4>
              <p className="text-xs font-mono text-dezo-text-secondary leading-relaxed mb-4">
                {tier.tagline}
              </p>

              <div className="pt-4 border-t border-dezo-ink/15 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-dezo-text-muted block mb-2 font-bold">
                  Key Scope Deliverables:
                </span>
                <ul className="space-y-2">
                  {tier.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-dezo-text-primary leading-relaxed">
                      <CheckCircle2 size={14} className="text-dezo-primary shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-dezo-bg-warm border border-dezo-border text-[11px] font-mono text-dezo-text-muted">
                <strong>Prerequisites:</strong> {tier.prerequisites.join('; ')}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dezo-ink/15">
              <Link
                href={`/start-a-project?tier=${tier.id}`}
                className="w-full py-2.5 px-4 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-all flex items-center justify-center gap-2 border border-dezo-ink"
              >
                Request Scoped Quote <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Commercial Accountability Footer */}
      <div className="p-5 bg-dezo-ink text-dezo-bg border-2 border-dezo-ink flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <FileText size={18} className="text-dezo-primary shrink-0 mt-0.5" />
          <p className="text-xs font-mono text-gray-300 leading-relaxed">
            <strong className="text-white">Commercial Clarity:</strong> Advertising spend is paid directly by your business to Amazon Advertising or Flipkart Ads via your own credit line. DEZO operates strictly on transparent service fees with zero ad arbitrage.
          </p>
        </div>
        <Link
          href="/pricing"
          className="shrink-0 text-xs font-mono uppercase tracking-wider text-dezo-primary hover:text-white font-bold transition-colors"
        >
          View General Agency Pricing →
        </Link>
      </div>
    </div>
  );
}

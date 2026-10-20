'use client';

import React, { useState } from 'react';
import { INDUSTRY_MARKETPLACE_SOLUTIONS, IndustryMarketplaceSolution } from '@/content/ecommerce-catalog';
import { Sparkles, ShieldCheck, AlertTriangle, ArrowRight, Camera, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function MarketplaceIndustrySolutions() {
  const [selectedIndustryId, setSelectedIndustryId] = useState(INDUSTRY_MARKETPLACE_SOLUTIONS[0].id);
  const current = INDUSTRY_MARKETPLACE_SOLUTIONS.find((s) => s.id === selectedIndustryId) || INDUSTRY_MARKETPLACE_SOLUTIONS[0];

  return (
    <div className="w-full bg-dezo-bg border-2 border-dezo-ink p-6 sm:p-10 shadow-[4px_4px_0_0_#0B0B0A]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Sparkles size={13} className="text-dezo-primary" />
            <span>Category-Specific Engineering</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            Industry & Category Marketplace Solutions
          </h3>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            Every category on Amazon and Flipkart operates under distinct buyer psychology, return rates, compliance mandates, and creative guidelines.
          </p>
        </div>
        <div className="text-xs font-mono text-dezo-text-muted shrink-0">
          8 Key Indian Sectors Specially Covered
        </div>
      </div>

      {/* Industry Pill Selector */}
      <div className="flex flex-wrap gap-2 my-8">
        {INDUSTRY_MARKETPLACE_SOLUTIONS.map((ind) => {
          const isSelected = ind.id === selectedIndustryId;
          return (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustryId(ind.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink font-bold shadow-[2px_2px_0_0_#B08D57]'
                  : 'bg-dezo-bg-warm text-dezo-ink border-dezo-ink/40 hover:border-dezo-ink hover:bg-white'
              }`}
            >
              {ind.industry.split(',')[0]}
            </button>
          );
        })}
      </div>

      {/* Active Industry Breakdown Card */}
      <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-8 shadow-[3px_3px_0_0_#0B0B0A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dezo-ink/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold">
              Target Vertical
            </span>
            <h4 className="font-display text-2xl font-black uppercase text-dezo-ink mt-0.5">
              {current.industry}
            </h4>
          </div>
          <div className="px-3 py-1 bg-dezo-bg border border-dezo-ink text-xs font-mono text-dezo-primary font-bold">
            Odisha & Pan-India Relevance
          </div>
        </div>

        <p className="mt-4 text-sm font-mono text-dezo-text-primary leading-relaxed">
          {current.tagline}
        </p>

        <div className="mt-2 p-3 bg-dezo-primary/10 border-l-4 border-dezo-primary text-xs font-mono text-dezo-ink">
          <strong>Odisha Context:</strong> {current.odishaRelevance}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Strategy & Creative (Left 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2 font-bold">
                Tailored Marketplace Growth Strategy
              </span>
              <p className="text-xs sm:text-sm text-dezo-text-primary leading-relaxed bg-dezo-bg p-4 border border-dezo-border">
                {current.marketplaceStrategy}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 text-dezo-ink">
                <Camera size={14} className="text-dezo-primary" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  Mandatory Creative & Photography Brief
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.creativeRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 bg-dezo-bg p-3 border border-dezo-border text-xs text-dezo-text-secondary">
                    <CheckCircle2 size={14} className="text-dezo-primary shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenges & Compliance (Right 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 mb-2 text-red-600">
                <AlertTriangle size={14} />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  Critical Category Obstacles
                </span>
              </div>
              <ul className="space-y-2 bg-dezo-bg p-4 border border-dezo-border">
                {current.keyChallenges.map((ch, i) => (
                  <li key={i} className="text-xs text-dezo-text-secondary leading-relaxed flex items-start gap-2">
                    <span className="text-red-500 font-bold">×</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dezo-ink text-dezo-bg p-5 border-2 border-dezo-ink">
              <div className="flex items-center gap-1.5 mb-2 text-dezo-primary">
                <ShieldCheck size={14} />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  Compliance & Regulatory Checklist
                </span>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-gray-300">
                {current.complianceNotes.map((comp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-dezo-primary font-bold">✓</span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { BUDGET_BANDS, BudgetBandItem } from '@/content/website-pricing-catalog';
import { DollarSign, CheckCircle2, ArrowRight, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CustomBudgetSelector() {
  const [selectedBandIndex, setSelectedBandIndex] = useState(1); // Default to ₹10k–₹20k
  const current = BUDGET_BANDS[selectedBandIndex];

  return (
    <div className="w-full bg-dezo-bg border border-dezo-border p-6 sm:p-10 shadow-dezo-soft" id="budget-bands">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <DollarSign size={13} className="text-dezo-primary" />
            <span>Budget-Aligned Engineering</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            Tell Us Your Budget. We’ll Help You Choose the Smartest Build.
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            Not every business needs an expensive custom platform. We help you select the right technology, prioritize essential features, and plan a practical website around your budget.
          </p>
        </div>
        <div className="text-xs font-mono text-dezo-text-muted shrink-0">
          6 Transparent Budget Tiers
        </div>
      </div>

      {/* Budget Band Switcher Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-8">
        {BUDGET_BANDS.map((band, idx) => {
          const isSelected = idx === selectedBandIndex;
          return (
            <button
              key={band.id}
              onClick={() => setSelectedBandIndex(idx)}
              className={`p-3.5 text-center border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink font-bold shadow-dezo-card'
                  : 'bg-dezo-bg-warm text-dezo-ink border-dezo-border hover:border-dezo-ink hover:bg-white'
              }`}
            >
              <span className={`font-mono text-[10px] uppercase tracking-wider block mb-1 ${isSelected ? 'text-dezo-primary' : 'text-dezo-text-muted'}`}>
                TIER 0{idx + 1}
              </span>
              <p className="font-display text-xs sm:text-sm font-bold uppercase leading-tight">
                {band.rangeLabel}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Band Detail Card */}
      <div className="bg-dezo-bg-warm border border-dezo-border p-6 sm:p-8 shadow-dezo-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dezo-ink/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold">
              Budget Band: {current.rangeLabel}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-dezo-ink mt-1">
              {current.recommendedBuild}
            </h3>
          </div>
          <span className="px-3 py-1 bg-dezo-bg border border-dezo-ink text-xs font-mono text-dezo-ink font-bold">
            Stack: {current.technologyStack.split(',')[0]}
          </span>
        </div>

        <p className="mt-4 text-sm font-mono text-dezo-text-primary leading-relaxed">
          {current.practicalScope}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Deliverables (Left 7) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold block">
              What We Can Honestly Deliver Within This Budget:
            </span>
            <div className="space-y-2.5">
              {current.deliverables.map((del, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-dezo-bg p-3 border border-dezo-border text-xs text-dezo-text-primary">
                  <CheckCircle2 size={15} className="text-dezo-primary shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phased Roadmap & Action (Right 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-dezo-ink text-dezo-bg p-5 border border-dezo-border mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold block mb-2">
                Recommended Phased Roadmap:
              </span>
              <p className="text-xs font-mono text-gray-300 leading-relaxed">
                {current.phasedPath}
              </p>
            </div>

            <Link
              href={`/start-a-project?budget=${encodeURIComponent(current.rangeLabel)}&build=${encodeURIComponent(current.recommendedBuild)}`}
              className="w-full py-3 px-4 bg-dezo-primary text-dezo-ink text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 border border-dezo-border shadow-xs"
            >
              Build in {current.rangeLabel} Scope <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

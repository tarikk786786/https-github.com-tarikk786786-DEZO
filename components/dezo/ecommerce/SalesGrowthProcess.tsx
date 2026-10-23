'use client';

import React, { useState } from 'react';
import { SALES_GROWTH_STAGES, MarketplaceStage } from '@/content/ecommerce-catalog';
import { CheckCircle2, ArrowRight, TrendingUp, Layers, Target, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function SalesGrowthProcess() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = SALES_GROWTH_STAGES[activeStageIndex];

  return (
    <div className="w-full bg-dezo-bg-warm border border-dezo-border p-6 sm:p-10 shadow-dezo-card">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <TrendingUp size={13} className="text-dezo-primary" />
            <span>Structured Operating Cadence</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            The 6-Stage Marketplace Growth Framework
          </h3>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            A repeatable, evidence-based methodology to scale listings from initial audit to high-converting, profitable multi-channel sales.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-xs text-dezo-text-muted uppercase tracking-wider block">
            Current Stage
          </span>
          <span className="font-display text-3xl font-black text-dezo-primary">
            {currentStage.number} / 06
          </span>
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 my-8">
        {SALES_GROWTH_STAGES.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          return (
            <button
              key={stage.number}
              onClick={() => setActiveStageIndex(idx)}
              className={`p-3 sm:p-4 text-left border-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-dezo-card'
                  : 'bg-dezo-bg text-dezo-ink border-dezo-ink/40 hover:border-dezo-ink hover:bg-white'
              }`}
            >
              <span
                className={`font-mono text-xs font-bold block mb-1 ${
                  isActive ? 'text-dezo-primary' : 'text-dezo-text-muted'
                }`}
              >
                PHASE {stage.number}
              </span>
              <p className="font-display text-xs sm:text-sm font-bold uppercase leading-tight line-clamp-2">
                {stage.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <div className="bg-dezo-bg border border-dezo-border p-6 sm:p-8 shadow-dezo-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dezo-ink/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold">
              Stage Focus: {currentStage.focus}
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-dezo-ink mt-1">
              Phase {currentStage.number} — {currentStage.name}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentStage.primaryMetrics.map((metric, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-dezo-bg-warm border border-dezo-ink text-[11px] font-mono text-dezo-ink font-bold"
              >
                KPI: {metric}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
          {currentStage.summary}
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Activities */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted block mb-3 font-bold">
              Key Engineering & Growth Activities
            </span>
            <div className="space-y-3">
              {currentStage.keyActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-3 bg-dezo-bg-warm p-3.5 border border-dezo-border">
                  <CheckCircle2 size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-dezo-text-primary leading-relaxed">{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Concrete Deliverables */}
          <div className="lg:col-span-5">
            <div className="bg-dezo-ink text-dezo-bg p-6 border border-dezo-border h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-3 font-bold">
                  Client Deliverables & Work Products
                </span>
                <ul className="space-y-2.5">
                  {currentStage.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-mono text-gray-200">
                      <span className="text-dezo-primary font-bold">→</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <Link
                  href="/start-a-project?goal=marketplace-audit"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-dezo-primary hover:text-white font-bold transition-colors"
                >
                  Schedule Phase {currentStage.number} Audit <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

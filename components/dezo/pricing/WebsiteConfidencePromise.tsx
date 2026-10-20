'use client';

import React from 'react';
import {
  WEBSITE_CONFIDENCE_PROMISES,
  ConfidencePromiseItem,
} from '@/content/website-pricing-catalog';
import { ShieldCheck, CheckCircle2, Lock, FileText, ArrowRight, AlertCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export function WebsiteConfidencePromise() {
  return (
    <div className="w-full bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-10 shadow-[6px_6px_0_0_#0B0B0A]" id="website-promise">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <ShieldCheck size={13} className="text-dezo-primary" />
            <span>Documented Operating Standard</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            A Website Promise Backed by Work, Not Just Words.
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            We cannot honestly promise every commercial outcome. We can commit to a clearly defined scope, accountable execution, documented testing, and responsible handover.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-xs text-dezo-text-muted uppercase tracking-wider block">
            Quality Commitment
          </span>
          <span className="font-display text-2xl font-black text-dezo-primary">
            10 Written Guarantees
          </span>
        </div>
      </div>

      {/* 10 Guarantees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {WEBSITE_CONFIDENCE_PROMISES.map((item) => (
          <div
            key={item.number}
            className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-dezo-primary">
                  COMMITMENT // {item.number}
                </span>
                <span className="px-2 py-0.5 bg-dezo-bg-warm border border-dezo-ink text-[10px] font-mono uppercase tracking-wider font-bold text-dezo-ink">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-dezo-ink mb-2">
                {item.title}
              </h3>

              <p className="text-xs font-mono text-dezo-text-secondary mb-4 leading-relaxed">
                {item.summary}
              </p>

              <div className="p-3 bg-dezo-bg-warm border border-dezo-border mb-3 text-xs text-dezo-text-primary leading-relaxed">
                <strong className="text-dezo-ink font-mono text-[11px] uppercase block mb-1">
                  Our Written Commitment:
                </strong>
                {item.concreteCommitment}
              </div>
            </div>

            <div className="pt-3 border-t border-dezo-ink/10 text-[11px] font-mono text-dezo-text-muted">
              <strong>What it means for you:</strong> {item.whatItMeansForYou}
            </div>
          </div>
        ))}
      </div>

      {/* 30-Day Defect-Fix Warranty Banner */}
      <div className="p-6 sm:p-8 bg-dezo-ink text-dezo-bg border-2 border-dezo-ink flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[4px_4px_0_0_#B08D57]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-dezo-primary mb-2 font-mono text-xs uppercase tracking-wider font-bold">
            <Lock size={14} />
            <span>30-Day Covered-Defect Warranty Policy</span>
          </div>
          <h4 className="font-display text-2xl font-bold uppercase text-white mb-2">
            Peace of Mind After Your Website Goes Live
          </h4>
          <p className="text-xs font-mono text-gray-300 leading-relaxed">
            If any agreed functionality malfunctions or breaks due to an implementation defect within 30 days of launch, our engineering team fixes it promptly with zero additional charges. We stand behind what we build.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/start-a-project"
            className="px-6 py-3 bg-dezo-primary text-dezo-ink text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 border-2 border-white"
          >
            Start Protected Project <ArrowRight size={14} />
          </Link>
          <Link
            href="/promise"
            className="px-5 py-3 bg-transparent border border-gray-600 text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white flex items-center justify-center"
          >
            Read All Standards →
          </Link>
        </div>
      </div>
    </div>
  );
}

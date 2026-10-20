'use client';

import React, { useState } from 'react';
import { CHANNEL_COMPARISON_MATRIX, ChannelComparisonItem } from '@/content/ecommerce-catalog';
import { Layers, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export function OmnichannelComparison() {
  const [selectedChannel, setSelectedChannel] = useState(0);
  const current = CHANNEL_COMPARISON_MATRIX[selectedChannel];

  return (
    <div className="w-full bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-10 shadow-[4px_4px_0_0_#0B0B0A]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Layers size={13} className="text-dezo-primary" />
            <span>Channel Fit & Strategy Navigator</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            Independent Store vs. Amazon vs. Flipkart
          </h3>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            Should your business build a private Shopify/Next.js website, launch on Amazon, expand to Flipkart, or operate an integrated omnichannel engine? Compare the trade-offs.
          </p>
        </div>
        <div className="text-xs font-mono text-dezo-text-muted shrink-0">
          Tailored for Indian Brands & Manufacturers
        </div>
      </div>

      {/* Channel Switcher Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-8">
        {CHANNEL_COMPARISON_MATRIX.map((ch, idx) => {
          const isSelected = idx === selectedChannel;
          return (
            <button
              key={ch.channel}
              onClick={() => setSelectedChannel(idx)}
              className={`p-4 text-left border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[3px_3px_0_0_#B08D57]'
                  : 'bg-dezo-bg text-dezo-ink border-dezo-ink/40 hover:border-dezo-ink hover:bg-white'
              }`}
            >
              <span
                className={`font-mono text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                  isSelected ? 'text-dezo-primary' : 'text-dezo-text-muted'
                }`}
              >
                {ch.badge}
              </span>
              <p className="font-display text-sm font-bold uppercase leading-tight">
                {ch.channel.split('(')[0].trim()}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Channel Breakdown */}
      <div className="bg-dezo-bg border-2 border-dezo-ink p-6 sm:p-8 shadow-[3px_3px_0_0_#0B0B0A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-dezo-ink/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold">
              {current.badge}
            </span>
            <h4 className="font-display text-2xl font-black uppercase text-dezo-ink mt-0.5">
              {current.channel}
            </h4>
          </div>
          <span className="px-3 py-1 bg-dezo-bg-warm border border-dezo-ink text-xs font-mono font-bold text-dezo-ink">
            Launch Timeline: {current.typicalTimelineToLaunch}
          </span>
        </div>

        <p className="mt-4 text-sm font-mono text-dezo-text-secondary leading-relaxed">
          {current.tagline}
        </p>

        {/* Feature Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          <div className="bg-dezo-bg-warm p-4 border border-dezo-border">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-dezo-primary block mb-1">
              Customer Data Ownership
            </span>
            <p className="text-xs text-dezo-text-primary leading-relaxed">
              {current.customerDataOwnership}
            </p>
          </div>

          <div className="bg-dezo-bg-warm p-4 border border-dezo-border">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-dezo-primary block mb-1">
              Marketplace & Platform Fees
            </span>
            <p className="text-xs text-dezo-text-primary leading-relaxed">
              {current.marketplaceFees}
            </p>
          </div>

          <div className="bg-dezo-bg-warm p-4 border border-dezo-border">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-dezo-primary block mb-1">
              Organic Buyer Traffic
            </span>
            <p className="text-xs text-dezo-text-primary leading-relaxed">
              {current.organicBuyerDemand}
            </p>
          </div>

          <div className="bg-dezo-bg-warm p-4 border border-dezo-border">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-dezo-primary block mb-1">
              Brand Storytelling & Layout
            </span>
            <p className="text-xs text-dezo-text-primary leading-relaxed">
              {current.brandStorytellingControl}
            </p>
          </div>

          <div className="bg-dezo-bg-warm p-4 border border-dezo-border">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-dezo-primary block mb-1">
              Returns & COD Friction
            </span>
            <p className="text-xs text-dezo-text-primary leading-relaxed">
              {current.returnAndCODControl}
            </p>
          </div>

          <div className="bg-dezo-bg-warm p-4 border border-dezo-border">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-dezo-primary block mb-1">
              Best Fit Profile
            </span>
            <p className="text-xs text-dezo-text-primary leading-relaxed">
              {current.bestFor}
            </p>
          </div>
        </div>

        {/* What DEZO Delivers */}
        <div className="mt-6 p-4 bg-dezo-ink text-dezo-bg border-2 border-dezo-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-primary block font-bold mb-0.5">
              How DEZO Executes This Channel
            </span>
            <p className="text-xs font-mono text-gray-200">
              {current.dezoRole}
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="shrink-0 px-5 py-2.5 bg-dezo-primary text-dezo-ink text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors"
          >
            Start Channel Strategy →
          </Link>
        </div>
      </div>
    </div>
  );
}

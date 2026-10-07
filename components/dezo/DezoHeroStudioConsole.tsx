'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

interface PipelineNode {
  id: string;
  name: string;
  subtitle: string;
  category: 'ENGINEER' | 'MARKETPLACE' | 'GROWTH' | 'INTELLIGENCE';
  icon: React.ElementType;
  metric: string;
  metricLabel: string;
  badge: string;
  deliverables: string[];
}

const NODES: PipelineNode[] = [
  {
    id: 'build',
    name: 'Next.js & Shopify Storefront',
    subtitle: 'High-assurance commerce engineering',
    category: 'ENGINEER',
    icon: Code2,
    metric: '98/100',
    metricLabel: 'Mobile PageSpeed',
    badge: '0.9s Mobile LCP',
    deliverables: [
      'Next.js 16 App Router & Edge SSR',
      'Custom Shopify Liquid / Hydrogen theme',
      'Sub-second Indian checkout flow (UPI / COD)',
      'Schema.org Product & Offer rich snippets',
    ],
  },
  {
    id: 'marketplace',
    name: 'Amazon & Flipkart Growth',
    subtitle: 'Algorithmic catalog & PPC dominance',
    category: 'MARKETPLACE',
    icon: ShoppingBag,
    metric: '74%+',
    metricLabel: 'Buy Box Win Rate',
    badge: 'Amazon SP-API Connected',
    deliverables: [
      'Search Query Performance (SQP) harvesting',
      'A+ Brand Story & 7-image gallery ratio',
      'Flipkart F-Assured 2-day delivery routing',
      'Target TACoS ad budget governance',
    ],
  },
  {
    id: 'ads',
    name: 'Meta CAPI & Google Performance',
    subtitle: 'Server-side attribution & high ROAS',
    category: 'GROWTH',
    icon: TrendingUp,
    metric: 'Tracked',
    metricLabel: 'Measurement-first campaigns',
    badge: 'Attribution Ready',
    deliverables: [
      'Meta Conversions API (CAPI) direct telemetry',
      'Google Shopping Performance Max campaigns',
      'Dynamic creative testing across vernacular Indian languages',
      'Customer acquisition cost (CAC) dampening',
    ],
  },
  {
    id: 'intelligence',
    name: 'DEZO Growth OS Telemetry',
    subtitle: 'Predictive seller analytics SaaS',
    category: 'INTELLIGENCE',
    icon: Cpu,
    metric: 'Realtime',
    metricLabel: 'Sync Frequency',
    badge: 'Autonomous Alerts',
    deliverables: [
      'Unified Amazon, Flipkart & Shopify dashboard',
      'Automated Buy Box loss & hijack warnings',
      'Low inventory replenishment thresholds',
      'Daily profit-after-ad-spend (POAS) accounting',
    ],
  },
];

export function DezoHeroStudioConsole() {
  const [activeNodeId, setActiveNodeId] = useState<string>('build');

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];
  const ActiveIcon = activeNode.icon;

  return (
    <div className="w-full max-w-5xl mx-auto mt-14 rounded-dezo-2xl bg-dezo-surface/90 border border-dezo-border shadow-2xl backdrop-blur-2xl overflow-hidden relative">
      {/* Chrome Top Bar */}
      <div className="px-5 py-3.5 border-b border-dezo-border/80 bg-dezo-surface-elevated/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-[11px] text-dezo-text-muted hidden sm:inline pl-2 border-l border-dezo-border/60">
            dezo.in/growth-engine · live architecture console
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            All 4 Engines Active
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Engine Selector (PRD 5 Pillars) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dezo-accent font-semibold mb-1 block">
            Select Commercial Discipline
          </span>

          {NODES.map((node) => {
            const isSelected = node.id === activeNodeId;
            const NodeIcon = node.icon;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`w-full p-3.5 rounded-dezo-lg text-left transition-all duration-200 cursor-pointer flex items-center justify-between group border ${
                  isSelected
                    ? 'bg-dezo-surface-elevated border-dezo-primary shadow-lg shadow-dezo-primary/10'
                    : 'bg-dezo-bg/50 border-dezo-border hover:bg-dezo-surface-elevated/50 hover:border-dezo-border-strong'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-dezo-md flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-dezo-primary text-white'
                        : 'bg-dezo-surface text-dezo-text-muted group-hover:text-dezo-text-primary'
                    }`}
                  >
                    <NodeIcon size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-dezo-text-primary block">
                      {node.name}
                    </span>
                    <span className="text-[11px] text-dezo-text-muted block line-clamp-1">
                      {node.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span
                    className={`font-mono text-xs font-bold block ${
                      isSelected ? 'text-dezo-accent' : 'text-dezo-text-muted'
                    }`}
                  >
                    {node.metric}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-dezo-text-muted font-medium">
                    {node.metricLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Deep-Dive Stage */}
        <div className="lg:col-span-7 rounded-dezo-xl bg-dezo-bg/80 border border-dezo-border p-6 sm:p-7 flex flex-col justify-between min-h-[340px] relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-dezo-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-dezo-primary/15 border border-dezo-primary/30 text-dezo-accent text-[11px] font-bold font-mono">
                <ActiveIcon size={13} />
                <span>{activeNode.category} DISCIPLINE</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                {activeNode.badge}
              </span>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl font-black text-dezo-text-primary tracking-tight mb-1">
                {activeNode.name}
              </h4>
              <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed">
                {activeNode.subtitle}
              </p>
            </div>

            {/* Checklist Deliverables */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-dezo-text-muted font-semibold block mb-2">
                Included Production Deliverables
              </span>
              <ul className="grid grid-cols-1 gap-2">
                {activeNode.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-dezo-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dezo-accent shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action trigger footer */}
          <div className="pt-6 mt-4 border-t border-dezo-border/60 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-xs text-dezo-text-muted">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Verified in 100+ live deployments</span>
            </div>

            <Link
              href={`/solutions/${activeNode.id === 'ads' ? 'growth' : activeNode.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-dezo-accent hover:text-white transition-colors group cursor-pointer"
            >
              <span>Explore Architecture</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

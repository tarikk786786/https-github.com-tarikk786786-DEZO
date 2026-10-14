'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  BarChart2,
  DollarSign,
  Activity,
} from 'lucide-react';
import { DezoCard } from './DezoCard';
import { DezoButton } from './DezoButton';

export function DezoMarketplaceDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'matrix' | 'ai-alerts'>('overview');

  const channels = [
    { name: 'Amazon India', sales: '₹11,20,000', roas: '5.1x', units: '1,280', growth: '+28%' },
    { name: 'Flipkart', sales: '₹5,40,000', roas: '5.4x', units: '680', growth: '+19%' },
    { name: 'D2C Website (Shopify/Next)', sales: '₹8,20,000', roas: '4.4x', units: '880', growth: '+34%' },
  ];

  const opportunityItems = [
    {
      category: 'Organic Ayurvedic Cosmetics',
      keyword: 'Kumkumadi facial oil authentic',
      demand: 'High (48,000/mo)',
      competition: 'Medium',
      price: '₹1,249',
      margin: '68%',
      score: 94,
    },
    {
      category: 'Handloom & Ethnic Apparel',
      keyword: 'Sambalpuri cotton saree handwoven',
      demand: 'Strong (36,500/mo)',
      competition: 'Low',
      price: '₹2,890',
      margin: '58%',
      score: 91,
    },
    {
      category: 'Gourmet Food & Spices',
      keyword: 'Cold pressed mustard oil kachi ghani',
      demand: 'Very High (62,000/mo)',
      competition: 'High',
      price: '₹420',
      margin: '46%',
      score: 83,
    },
  ];

  return (
    <div className="w-full rounded-dezo-xl bg-dezo-surface border border-dezo-border overflow-hidden shadow-dezo-card">
      {/* Top Header Bar */}
      <div className="p-6 border-b border-dezo-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-dezo-surface-elevated/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-dezo-success animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-dezo-text-muted">
              DEZO Growth OS · Seller Intelligence Engine
            </span>
          </div>
          <h3 className="text-xl font-bold text-dezo-text-primary">
            Unified Commerce & Marketplace Telemetry
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-dezo-surface border border-dezo-border self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-dezo-primary text-white shadow-sm'
                : 'text-dezo-text-secondary hover:text-dezo-text-primary'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-dezo-primary text-white shadow-sm'
                : 'text-dezo-text-secondary hover:text-dezo-text-primary'
            }`}
          >
            Opportunity Matrix
          </button>
          <button
            onClick={() => setActiveTab('ai-alerts')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'ai-alerts'
                ? 'bg-dezo-primary text-white shadow-sm'
                : 'text-dezo-text-secondary hover:text-dezo-text-primary'
            }`}
          >
            AI Seller Alerts
          </button>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="p-6 sm:p-8 flex flex-col gap-8">
          {/* Top Level Blended Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-dezo-md bg-dezo-surface-elevated border border-dezo-border">
              <div className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                Blended Revenue (30D)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-dezo-text-primary">
                ₹24,80,000
              </div>
              <span className="text-xs font-semibold text-dezo-success mt-1 inline-block">
                ↑ +27.4% vs last mo
              </span>
            </div>

            <div className="p-5 rounded-dezo-md bg-dezo-surface-elevated border border-dezo-border">
              <div className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                Blended ROAS
              </div>
              <div className="text-2xl sm:text-3xl font-black text-dezo-accent">
                4.82x
              </div>
              <span className="text-xs text-dezo-text-muted mt-1 inline-block">
                Meta + Google + Amazon PPC
              </span>
            </div>

            <div className="p-5 rounded-dezo-md bg-dezo-surface-elevated border border-dezo-border">
              <div className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                Total Orders Dispatched
              </div>
              <div className="text-2xl sm:text-3xl font-black text-dezo-text-primary">
                2,840
              </div>
              <span className="text-xs font-semibold text-dezo-success mt-1 inline-block">
                ↑ +410 new buyers
              </span>
            </div>

            <div className="p-5 rounded-dezo-md bg-dezo-surface-elevated border border-dezo-border">
              <div className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                Organic Revenue Share
              </div>
              <div className="text-2xl sm:text-3xl font-black text-dezo-text-primary">
                56.2%
              </div>
              <span className="text-xs text-dezo-text-muted mt-1 inline-block">
                SEO & Brand Search
              </span>
            </div>
          </div>

          {/* Breakdown By Channel */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-4">
              Channel Breakdown
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {channels.map((c, i) => (
                <div
                  key={i}
                  className="p-5 rounded-dezo-md bg-dezo-surface-elevated/60 border border-dezo-border flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-dezo-text-primary text-sm">{c.name}</span>
                    <span className="text-xs font-semibold text-dezo-success bg-dezo-success/10 px-2 py-0.5 rounded-full">
                      {c.growth}
                    </span>
                  </div>
                  <div className="text-xl font-black text-dezo-text-primary mb-1">{c.sales}</div>
                  <div className="flex items-center justify-between text-xs text-dezo-text-muted pt-3 border-t border-dezo-border/60">
                    <span>ROAS: <strong className="text-dezo-text-primary">{c.roas}</strong></span>
                    <span>Units: <strong className="text-dezo-text-primary">{c.units}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Product Opportunity Matrix */}
      {activeTab === 'matrix' && (
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <p className="text-xs text-dezo-text-secondary leading-relaxed">
            DEZO's proprietary market scanner identifies high-demand, margin-positive product categories across Indian marketplaces before they become saturated.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-dezo-border text-dezo-text-muted uppercase text-[11px] font-bold tracking-wider">
                  <th className="py-3 px-4">Category / Keyword</th>
                  <th className="py-3 px-4">Search Demand</th>
                  <th className="py-3 px-4">Competition</th>
                  <th className="py-3 px-4">Avg Selling Price</th>
                  <th className="py-3 px-4">Est. Gross Margin</th>
                  <th className="py-3 px-4 text-right">Opportunity Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dezo-border/60">
                {opportunityItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-dezo-surface-elevated/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-dezo-text-primary">{item.category}</div>
                      <div className="text-xs text-dezo-accent font-mono mt-0.5">"{item.keyword}"</div>
                    </td>
                    <td className="py-4 px-4 text-dezo-text-secondary">{item.demand}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        item.competition === 'Low'
                          ? 'bg-dezo-success/10 text-dezo-success'
                          : item.competition === 'Medium'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {item.competition}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-dezo-text-primary">{item.price}</td>
                    <td className="py-4 px-4 font-semibold text-dezo-success">{item.margin}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-base font-black text-dezo-accent font-mono">
                        {item.score}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: AI Seller Alerts */}
      {activeTab === 'ai-alerts' && (
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="p-5 rounded-dezo-md bg-dezo-surface-elevated border border-dezo-border flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                  Priority Alert
                </span>
                <span className="text-xs text-dezo-text-muted font-mono">Amazon SP-API · Confidence: 94%</span>
              </div>
              <span className="text-xs font-bold text-dezo-success bg-dezo-success/10 px-2 py-0.5 rounded-full">
                ✓ Verified by Lead Strategist
              </span>
            </div>

            <h4 className="text-base font-bold text-dezo-text-primary">
              Organic Keyword Rank Displacement on Top Revenue SKU
            </h4>

            <p className="text-xs text-dezo-text-secondary leading-relaxed">
              <strong>Observation:</strong> Search impression share dropped by 14.2% over trailing 7 days. Analysis reveals competitor launched 15% promotional voucher, eroding Buy Box share.
            </p>

            <div className="p-3 rounded-dezo-sm bg-dezo-bg border border-dezo-border text-xs text-dezo-text-primary">
              <span className="text-dezo-accent font-bold">Recommended Action:</span> Adjust exact Sponsored Product bids on high-intent terms, refresh hero product image angle, and re-index backend search keywords.
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Strip */}
      <div className="px-6 py-4 bg-dezo-surface-elevated border-t border-dezo-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dezo-text-muted">
        <span>🔒 Data access restricted to verified authorized seller APIs (Amazon SP-API, Flipkart Ads, Meta CAPI).</span>
        <DezoButton href="/contact" size="sm">
          Request Marketplace Audit
        </DezoButton>
      </div>
    </div>
  );
}

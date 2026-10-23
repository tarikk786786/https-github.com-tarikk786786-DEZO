'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  ShoppingBag,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Globe,
  Layers,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

interface ConsoleTab {
  id: string;
  tabLabel: string;
  shortLabel: string;
  badge: string;
  title: string;
  category: string;
  icon: React.ElementType;
  metricValue: string;
  metricLabel: string;
  highlightPill: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
  pricingTag: string;
}

const TABS: ConsoleTab[] = [
  {
    id: 'proof',
    tabLabel: '01 LIVE PROOF',
    shortLabel: '01 PROOF',
    badge: '181+ SITES',
    category: 'AUTHENTIC PORTFOLIO',
    title: 'Real Production Client Deployments',
    icon: Globe,
    metricValue: '181+',
    metricLabel: 'Verified Deployments',
    highlightPill: '100% Production URLs · Zero Mockups or Fake Demos',
    deliverables: [
      'Yasana Beauty Rituals: D2C commerce storefront with brand storytelling',
      'Great India Public School: Admissions portal with inquiry routing',
      'Sonvica Sarees & Nilkanth Paints: Direct-order catalog & dealer navigation',
    ],
    pricingTag: 'Student from ₹1,999 · Dukaan from ₹2,999 · Scoped Custom',
    ctaLabel: 'Inspect Live Work',
    ctaHref: '/work',
  },
  {
    id: 'web',
    tabLabel: '02 WEB & SPEED',
    shortLabel: '02 WEB',
    badge: 'SUB-SECOND LCP',
    category: 'COMMERCE & APPS',
    title: 'High-Speed Next.js 16 Storefronts',
    icon: Zap,
    metricValue: '< 1.0s',
    metricLabel: 'Mobile Core Web Vitals LCP',
    highlightPill: '₹0 Lifelong Cloud Hosting (Zero Server Renewal Fees)',
    deliverables: [
      'Sub-second mobile loading (0.8s LCP on Indian 4G/5G networks)',
      'Direct WhatsApp checkout & UPI 1-click mobile order buttons',
      'Full source-code handover & 30-day bugfix warranty in writing',
    ],
    pricingTag: 'From ₹1,999 (Student) · ₹2,999 (Local Dukaan) · ₹4,999 (Launch)',
    ctaLabel: 'Calculate Your Build Cost',
    ctaHref: '/pricing#calculator',
  },
  {
    id: 'marketplace',
    tabLabel: '03 AMAZON & FLIPKART',
    shortLabel: '03 MARKET',
    badge: 'SP-API AUTOMATION',
    category: 'MARKETPLACE OPERATIONS',
    title: 'Disciplined Catalog & Ad Management',
    icon: ShoppingBag,
    metricValue: 'SP-API',
    metricLabel: 'Direct Catalog Sync',
    highlightPill: 'Amazon Brand Registry + Flipkart F-Assured Setup',
    deliverables: [
      'Search Query Performance keyword harvesting & indexing',
      'Modular 7-image A+ Brand Story conversion cards',
      'Disciplined target TACoS ad spend governance to protect margin',
    ],
    pricingTag: 'Marketplace Operations from ₹6,999 / month',
    ctaLabel: 'Explore Marketplace System',
    ctaHref: '/services/amazon',
  },
  {
    id: 'local',
    tabLabel: '04 ODISHA & MAPS',
    shortLabel: '04 LOCAL',
    badge: 'GOOGLE 3-PACK',
    category: 'LOCAL ACQUISITION',
    title: 'Dominating Local Search & Footfall',
    icon: MapPin,
    metricValue: 'TOP 3',
    metricLabel: 'Local Pack Target Goal',
    highlightPill: 'Counter QR Standee & Direct WhatsApp Menu Included',
    deliverables: [
      'Google Business Profile category & citation synchronization',
      'Instant WhatsApp click-to-chat and map direction routes',
      'Counter QR code sticker setup for neighborhood walk-in reordering',
    ],
    pricingTag: 'Local Dukaan Setup from ₹2,999 one-time',
    ctaLabel: 'Dominate Local Footfall',
    ctaHref: '/services/local-seo',
  },
  {
    id: 'connected',
    tabLabel: '05 CONNECTED STACK',
    shortLabel: '05 STACK',
    badge: '5-IN-1 PARTNER',
    category: 'GROWTH ARCHITECTURE',
    title: 'One Unified Operating System',
    icon: Layers,
    metricValue: '1 Team',
    metricLabel: 'Zero Vendor Fragmentation',
    highlightPill: 'Web + SEO + Ads + Marketplace + Brand as One Partner',
    deliverables: [
      'Synchronized web, marketplace, search, and paid advertising',
      'Dedicated delivery studio in Patia, Bhubaneswar, Odisha',
      '50-50 milestone payments with defined contractual deliverables',
    ],
    pricingTag: 'Transparent Tiers · 30-Day Defect Warranty',
    ctaLabel: 'Build Growth Plan',
    ctaHref: '/start-a-project',
  },
];

export function DezoHeroGrowthConsole() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through tabs unless paused or reduced motion is preferred
  useEffect(() => {
    if (reducedMotion || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, reducedMotion]);

  const current = TABS[activeTab];
  const Icon = current.icon;

  return (
    <div
      className="w-full max-w-xl bg-[#0E0E0D] border border-dezo-primary/80 text-white rounded-dezo-md shadow-dezo-soft sm:shadow-dezo-soft transition-all relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="DEZO Interactive Growth Console"
    >
      {/* Top Telemetry Header Bar */}
      <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-b-2 border-dezo-ink/80 bg-[#161615] flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-dezo-primary rounded-dezo-md inline-block" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 rounded-dezo-md inline-block" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/20 rounded-dezo-md inline-block" />
          </div>
          <span className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white/90">
            DEZO LAB // GROWTH CAPABILITY CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-dezo-md animate-ping" />
          <span className="font-mono text-[8px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            181+ SITES LIVE
          </span>
        </div>
      </div>

      {/* Interactive Tabs Header — Horizontal scrollable on mobile, 5-col grid on desktop */}
      <div
        className="flex overflow-x-auto sm:grid sm:grid-cols-5 border-b-2 border-dezo-ink/80 bg-[#121211] sm:divide-x-2 sm:divide-dezo-ink/80 scrollbar-none"
        role="tablist"
        aria-label="DEZO Capabilities"
      >
        {TABS.map((tab, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveTab(idx);
                setIsPaused(true);
              }}
              className={`shrink-0 py-2.5 px-3 sm:px-2 text-center transition-all relative cursor-pointer border-r border-dezo-ink/40 sm:border-r-0 ${
                isActive
                  ? 'bg-dezo-primary text-dezo-ink font-bold'
                  : 'bg-transparent text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="hidden sm:block font-mono text-[9px] tracking-wider uppercase leading-tight font-bold">
                {tab.tabLabel}
              </span>
              <span className="sm:hidden font-mono text-[10px] tracking-wider uppercase leading-tight font-bold whitespace-nowrap">
                {tab.shortLabel}
              </span>
              {isActive && !isPaused && !reducedMotion && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dezo-ink"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 4.5, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="p-4 sm:p-6 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Category Eyebrow & Live Metric Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 sm:mb-3">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-dezo-primary font-bold flex items-center gap-1.5">
                  <Icon size={12} className="text-dezo-primary" />
                  {current.category}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5 bg-white/10 text-white border border-white/20 font-bold">
                  {current.badge}
                </span>
              </div>

              {/* Title & Speed Gauge Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center pb-3.5 sm:pb-4 border-b border-white/10">
                <div className="sm:col-span-8">
                  <h3 className="font-display text-lg sm:text-2xl font-bold uppercase text-white tracking-tight leading-snug">
                    {current.title}
                  </h3>
                  <p className="font-mono text-[11px] sm:text-xs text-dezo-primary mt-1 font-bold">
                    {current.highlightPill}
                  </p>
                </div>

                <div className="sm:col-span-4 bg-[#181816] border border-dezo-primary/40 p-2 sm:p-3 text-left sm:text-right shadow-xs">
                  <span className="block font-mono text-[8px] sm:text-[9px] uppercase text-white/50 tracking-wider">
                    {current.metricLabel}
                  </span>
                  <span className="font-mono text-xl sm:text-3xl font-black text-dezo-primary tracking-tight">
                    {current.metricValue}
                  </span>
                </div>
              </div>

              {/* Deliverables List */}
              <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase text-white/50 tracking-wider block">
                  Engineered Deliverables:
                </span>
                <ul className="space-y-1 sm:space-y-1.5">
                  {current.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-mono text-[11px] sm:text-xs text-white/85 leading-snug"
                    >
                      <CheckCircle2
                        size={12}
                        className="text-dezo-primary shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Pricing & Direct Action */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                <div>
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 block">
                    Transparent Starting Price
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-white">
                    {current.pricingTag}
                  </span>
                </div>

                <Link
                  href={current.ctaHref}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-dezo-primary text-dezo-ink font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors border border-dezo-primary shadow-xs active:scale-[0.99]"
                >
                  <span>{current.ctaLabel}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Live System Strip */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#141413] border-t-2 border-dezo-ink/80 flex flex-wrap items-center justify-between gap-1.5 text-[9px] sm:text-[10px] font-mono text-white/50">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={11} className="text-dezo-primary shrink-0" />
          <span>Written 30-Day Defect Warranty · 100% Code Handover</span>
        </div>
        <a
          href="https://wa.me/919114411026"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dezo-primary hover:text-white font-bold transition-colors inline-flex items-center gap-1"
        >
          <PhoneCall size={9} /> +91 9114411026
        </a>
      </div>
    </div>
  );
}

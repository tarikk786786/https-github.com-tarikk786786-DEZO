'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  ShoppingBag,
  MapPin,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Clock,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

interface ConsoleTab {
  id: string;
  tabLabel: string;
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
    id: 'web',
    tabLabel: '01 WEB & SPEED',
    badge: 'SUB-SECOND LCP',
    category: 'COMMERCE & APPS',
    title: 'High-Speed Next.js 16 Storefronts',
    icon: Zap,
    metricValue: '99/100',
    metricLabel: 'Core Web Vitals PageSpeed',
    highlightPill: '₹0 Lifelong Cloud Hosting (Zero Server Renewal Fees)',
    deliverables: [
      'Sub-second mobile loading (0.8s LCP on Indian 4G/5G)',
      'Direct WhatsApp checkout & UPI 1-click integration',
      'Full source-code handover & 30-day bugfix warranty',
    ],
    pricingTag: 'From ₹1,999 (Student) · ₹2,999 (Local Dukaan) · ₹4,999 (Business)',
    ctaLabel: 'Calculate Your Build Cost',
    ctaHref: '/pricing#calculator',
  },
  {
    id: 'marketplace',
    tabLabel: '02 AMAZON & FLIPKART',
    badge: 'SP-API AUTOMATION',
    category: 'MARKETPLACE GROWTH',
    title: 'Algorithmic Catalog & Sponsored Ads',
    icon: ShoppingBag,
    metricValue: '78.4%',
    metricLabel: 'Buy Box Win Rate Average',
    highlightPill: 'Amazon Brand Registry + Flipkart F-Assured Setup',
    deliverables: [
      'Search Query Performance keyword harvesting',
      'Modular 7-image A+ Brand Story conversion cards',
      'Disciplined target TACoS ad spend governance',
    ],
    pricingTag: 'Marketplace Operations from ₹6,999 / month',
    ctaLabel: 'Explore Marketplace System',
    ctaHref: '/services/amazon',
  },
  {
    id: 'local',
    tabLabel: '03 ODISHA & GOOGLE MAPS',
    badge: 'GOOGLE 3-PACK',
    category: 'LOCAL ACQUISITION',
    title: 'Dominating Local Search & Footfall',
    icon: MapPin,
    metricValue: '#1 Rank',
    metricLabel: 'Local Bhubaneswar & Odisha Search',
    highlightPill: 'Free Counter QR Code Sticker Included',
    deliverables: [
      'Google Business Profile category & citation optimization',
      'Automated 5-star customer review collection flow',
      '+340% increase in click-to-call and map direction inquiries',
    ],
    pricingTag: 'Local Dukaan Setup from ₹2,999 one-time',
    ctaLabel: 'Dominate Local Footfall',
    ctaHref: '/services/local-seo',
  },
  {
    id: 'whatsapp',
    tabLabel: '04 WHATSAPP AUTOMATION',
    badge: '<15s RESPONSE',
    category: 'CRM & WORKFLOWS',
    title: 'Instant Order & Lead Routing Bot',
    icon: MessageSquare,
    metricValue: '< 15s',
    metricLabel: 'Average Lead Response Latency',
    highlightPill: 'Pre-formatted Catalog Ordering & Instant Inquiries',
    deliverables: [
      'Direct WhatsApp Business catalog & menu ordering',
      'Instant lead notification webhook to sales team phone',
      'Automated greeting bot with price quotations',
    ],
    pricingTag: 'WhatsApp Business API Setup from ₹3,499',
    ctaLabel: 'Chat on WhatsApp Now',
    ctaHref: 'https://wa.me/919114411026?text=Hello%20DEZO%20Team!%20I%20would%20like%20to%20discuss%20a%20project.',
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
      className="w-full max-w-xl bg-[#0E0E0D] border-2 border-dezo-primary/60 text-white rounded-none shadow-[8px_8px_0_0_#B08D57] transition-all relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="DEZO Interactive Growth Console"
    >
      {/* Top Telemetry Header Bar */}
      <div className="px-4 sm:px-5 py-3 border-b-2 border-dezo-ink/80 bg-[#161615] flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 bg-dezo-primary rounded-none inline-block" />
            <span className="w-2.5 h-2.5 bg-white/40 rounded-none inline-block" />
            <span className="w-2.5 h-2.5 bg-white/20 rounded-none inline-block" />
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/90">
            DEZO LAB // LIVE GROWTH TELEMETRY
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-none animate-ping" />
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            181+ SITES LIVE
          </span>
        </div>
      </div>

      {/* Interactive Tabs Header */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 border-b-2 border-dezo-ink/80 bg-[#121211] divide-x-2 divide-dezo-ink/80"
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
              className={`py-2.5 px-2 sm:px-3 text-left transition-all relative ${
                isActive
                  ? 'bg-dezo-primary text-dezo-ink font-bold'
                  : 'bg-transparent text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider uppercase leading-tight font-bold">
                {tab.tabLabel}
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
      <div className="p-5 sm:p-6 min-h-[360px] sm:min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Category Eyebrow & Live Metric Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-dezo-primary font-bold flex items-center gap-1.5">
                  <Icon size={12} className="text-dezo-primary" />
                  {current.category}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-white/10 text-white border border-white/20 font-bold">
                  {current.badge}
                </span>
              </div>

              {/* Title & Speed Gauge Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pb-4 border-b border-white/10">
                <div className="sm:col-span-8">
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-tight leading-tight">
                    {current.title}
                  </h3>
                  <p className="font-mono text-xs text-dezo-primary mt-1 font-bold">
                    {current.highlightPill}
                  </p>
                </div>

                <div className="sm:col-span-4 bg-[#181816] border-2 border-dezo-primary/40 p-3 text-center sm:text-right shadow-[2px_2px_0_0_#B08D57]">
                  <span className="block font-mono text-[9px] uppercase text-white/50 tracking-wider">
                    {current.metricLabel}
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-dezo-primary tracking-tight">
                    {current.metricValue}
                  </span>
                </div>
              </div>

              {/* Deliverables List */}
              <div className="mt-4 space-y-2">
                <span className="font-mono text-[10px] uppercase text-white/50 tracking-wider block">
                  Engineered Deliverables:
                </span>
                <ul className="space-y-1.5">
                  {current.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-mono text-xs text-white/85 leading-snug"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-dezo-primary shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Pricing & Direct Action */}
            <div className="mt-6 pt-4 border-t-2 border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 block">
                    Transparent Starting Price
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-white">
                    {current.pricingTag}
                  </span>
                </div>

                <Link
                  href={current.ctaHref}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors border border-dezo-primary shadow-[2px_2px_0_0_#FFFFFF] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <span>{current.ctaLabel}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Live System Strip */}
      <div className="px-4 py-2.5 bg-[#141413] border-t-2 border-dezo-ink/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-dezo-primary" />
          <span>Written 30-Day Warranty · 100% Code Handover</span>
        </div>
        <a
          href="https://wa.me/919114411026"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dezo-primary hover:text-white font-bold transition-colors inline-flex items-center gap-1"
        >
          <PhoneCall size={10} /> +91 9114411026
        </a>
      </div>
    </div>
  );
}

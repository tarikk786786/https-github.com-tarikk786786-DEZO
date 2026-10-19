'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DezoReveal, DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';

const NODES: Array<{ label: string; href: string; note: string }> = [
  { label: 'Brand', href: '/services/branding', note: 'Positioning & identity' },
  { label: 'Website', href: '/services/web-development', note: 'Storefront & applications' },
  { label: 'SEO', href: '/services/seo', note: 'Organic discovery' },
  { label: 'Ads', href: '/services/paid-ads', note: 'Meta & Google' },
  { label: 'Amazon / Flipkart', href: '/services/amazon', note: 'Marketplace growth' },
  { label: 'Conversion', href: '/services/web-development', note: 'CRO & UX' },
  { label: 'Analytics', href: '/services/growth-systems', note: 'Measurement' },
  { label: 'Scale', href: '/promise', note: 'Operate & optimize' },
];

/**
 * Signature DEZO Engine — interactive connected system.
 * Editorial nodes, not a neon HUD.
 */
export function DezoEngine() {
  const [active, setActive] = useState<string | null>(NODES[0].label);
  const activeIndex = Math.max(
    0,
    NODES.findIndex((n) => n.label === active)
  );

  return (
    <div>
      <DezoReveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
          Product · The DEZO Engine
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[3rem] tracking-tight text-dezo-text-primary mb-4 uppercase">
          Everything connected
        </h2>
        <p className="text-base text-dezo-text-secondary max-w-xl leading-relaxed mb-8">
          Brand → website → SEO &amp; ads → Amazon / Flipkart → conversion → analytics → scale.
          The operating system behind every DEZO engagement—not a stack of disconnected vendors.
        </p>
        <p className="font-mono text-xs text-dezo-text-muted mb-10" aria-live="polite">
          Focus · {NODES[activeIndex].label}
          <span className="text-dezo-text-secondary"> — {NODES[activeIndex].note}</span>
        </p>
      </DezoReveal>

      {/* Desktop: horizontal flow with industrial brutalist borders */}
      <DezoStagger
        className="hidden lg:grid grid-cols-8 gap-0 border-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A]"
        stagger={0.04}
      >
        {NODES.map((node, i) => {
          const isActive = active === node.label;
          return (
            <DezoStaggerItem key={node.label}>
              <Link
                href={node.href}
                onMouseEnter={() => setActive(node.label)}
                onFocus={() => setActive(node.label)}
                data-active={isActive ? 'true' : 'false'}
                className={`dezo-engine-node group relative flex flex-col justify-between min-h-[12rem] border-r-2 border-dezo-ink p-4 last:border-r-0 transition-all ${
                  isActive ? 'bg-dezo-ink text-white' : 'bg-white hover:bg-dezo-bg-warm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-dezo-primary' : 'text-dezo-text-muted'}`}>
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-dezo-primary" />
                  )}
                </div>
                <div>
                  <span className={`font-display text-lg font-bold tracking-tight block leading-tight ${isActive ? 'text-white' : 'text-dezo-text-primary'}`}>
                    {node.label}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider mt-2 block transition-opacity duration-200 ${
                      isActive ? 'opacity-100 text-dezo-primary' : 'opacity-0 text-dezo-text-muted'
                    }`}
                  >
                    {node.note}
                  </span>
                </div>
                <span
                  className={`absolute left-0 bottom-0 h-[3px] bg-dezo-primary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden
                />
              </Link>
            </DezoStaggerItem>
          );
        })}
      </DezoStagger>

      {/* Mobile / tablet: vertical cascade */}
      <ol className="relative max-w-xl mx-auto lg:hidden space-y-2">
        {NODES.map((node, i) => {
          const isActive = active === node.label;
          return (
            <li key={node.label} className="relative flex flex-col items-stretch">
              <DezoStaggerItem>
                <Link
                  href={node.href}
                  onMouseEnter={() => setActive(node.label)}
                  onMouseLeave={() => setActive(NODES[0].label)}
                  onFocus={() => setActive(node.label)}
                  onBlur={() => setActive(NODES[0].label)}
                  data-active={isActive ? 'true' : 'false'}
                  className={`dezo-engine-node group flex items-center justify-between gap-4 border-2 border-dezo-ink px-5 py-4 transition-all ${
                    isActive
                      ? 'bg-dezo-ink text-white shadow-[4px_4px_0_0_#B08D57]'
                      : 'bg-white text-dezo-text-primary shadow-[2px_2px_0_0_#0B0B0A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-dezo-primary' : 'text-dezo-text-muted'}`}>
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight">
                      {node.label}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider transition-opacity duration-200 ${
                      isActive ? 'text-dezo-primary opacity-100' : 'text-dezo-text-muted opacity-60'
                    }`}
                  >
                    {node.note}
                  </span>
                </Link>
              </DezoStaggerItem>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

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
          The DEZO Engine
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[3rem] tracking-tight text-dezo-text-primary mb-4 uppercase">
          Everything connected
        </h2>
        <p className="text-base text-dezo-text-secondary max-w-xl leading-relaxed mb-8">
          Brand → website → SEO &amp; ads → Amazon / Flipkart → conversion → analytics → scale.
          One commercial system—not a stack of disconnected vendors.
        </p>
        <p className="font-mono text-xs text-dezo-text-muted mb-10" aria-live="polite">
          Focus · {NODES[activeIndex].label}
          <span className="text-dezo-text-secondary"> — {NODES[activeIndex].note}</span>
        </p>
      </DezoReveal>

      {/* Desktop: horizontal flow */}
      <DezoStagger
        className="hidden lg:grid grid-cols-8 gap-0 border-t border-dezo-border"
        stagger={0.05}
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
                className={`dezo-engine-node group relative flex flex-col justify-between min-h-[11rem] border-r border-dezo-border px-3 py-5 last:border-r-0 ${
                  isActive ? 'bg-dezo-bg-warm' : 'bg-transparent'
                }`}
              >
                <span className="font-mono text-[10px] text-dezo-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="font-display text-lg text-dezo-text-primary tracking-tight block leading-tight">
                    {node.label}
                  </span>
                  <span
                    className={`text-[11px] text-dezo-text-muted mt-2 block transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {node.note}
                  </span>
                </div>
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-dezo-primary transition-all duration-500 ${
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
      <DezoStagger className="relative max-w-xl mx-auto lg:hidden" stagger={0.07}>
        <ol>
          {NODES.map((node, i) => {
            const isActive = active === node.label;
            return (
              <DezoStaggerItem key={node.label}>
                <li className="relative flex flex-col items-stretch">
                  <Link
                    href={node.href}
                    onMouseEnter={() => setActive(node.label)}
                    onMouseLeave={() => setActive(NODES[0].label)}
                    onFocus={() => setActive(node.label)}
                    onBlur={() => setActive(NODES[0].label)}
                    data-active={isActive ? 'true' : 'false'}
                    className={`dezo-engine-node group flex items-center justify-between gap-4 border border-dezo-border bg-dezo-surface px-5 py-4 ${
                      isActive ? 'bg-dezo-bg' : ''
                    }`}
                  >
                    <span className="font-display text-lg sm:text-xl text-dezo-text-primary tracking-tight">
                      {node.label}
                    </span>
                    <span
                      className={`text-xs text-dezo-text-muted transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 sm:opacity-55'
                      }`}
                    >
                      {node.note}
                    </span>
                  </Link>
                  {i < NODES.length - 1 && (
                    <div className="flex justify-center py-1.5" aria-hidden>
                      <span className="font-mono text-dezo-text-muted text-xs">↓</span>
                    </div>
                  )}
                </li>
              </DezoStaggerItem>
            );
          })}
        </ol>
      </DezoStagger>
    </div>
  );
}

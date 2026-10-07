'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DezoReveal } from '@/lib/motion/MotionAdapter';

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

export function DezoEngine() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <DezoReveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
          The DEZO Engine
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-dezo-text-primary mb-4">
          Everything connected.
        </h2>
        <p className="text-base text-dezo-text-secondary max-w-xl leading-relaxed mb-12">
          Brand, website, traffic, marketplaces, conversion and analytics operated as one commercial
          system—not a stack of disconnected vendors.
        </p>
      </DezoReveal>

      <ol className="relative max-w-xl mx-auto lg:mx-0">
        {NODES.map((node, i) => {
          const isActive = active === node.label;
          return (
            <li key={node.label} className="relative flex flex-col items-stretch">
              <Link
                href={node.href}
                onMouseEnter={() => setActive(node.label)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.label)}
                onBlur={() => setActive(null)}
                className={`group flex items-center justify-between gap-4 border border-dezo-border bg-dezo-surface px-5 py-4 transition-colors ${
                  isActive ? 'border-dezo-ink bg-dezo-bg' : 'hover:border-dezo-ink/40'
                }`}
              >
                <span className="font-display text-lg sm:text-xl text-dezo-text-primary tracking-tight">
                  {node.label}
                </span>
                <span
                  className={`text-xs text-dezo-text-muted transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0 sm:opacity-60'
                  }`}
                >
                  {node.note}
                </span>
              </Link>
              {i < NODES.length - 1 && (
                <div className="flex justify-center py-1" aria-hidden>
                  <span className="font-mono text-dezo-text-muted text-xs">↓</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

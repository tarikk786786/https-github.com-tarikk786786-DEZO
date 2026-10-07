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

      <DezoStagger className="relative max-w-xl mx-auto lg:mx-0" stagger={0.07}>
        <ol>
          {NODES.map((node, i) => {
            const isActive = active === node.label;
            return (
              <DezoStaggerItem key={node.label}>
                <li className="relative flex flex-col items-stretch">
                  <Link
                    href={node.href}
                    onMouseEnter={() => setActive(node.label)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(node.label)}
                    onBlur={() => setActive(null)}
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
                      <span className="font-mono text-dezo-text-muted text-xs transition-transform duration-300">
                        ↓
                      </span>
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

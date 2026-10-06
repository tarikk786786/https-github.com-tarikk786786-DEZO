'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { platformNodes } from '@/content/site';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

/**
 * Growth Command Center — animated platform nodes + live capability metrics.
 * Metrics are labels of capability, not invented performance stats.
 */
export function GrowthCommandCenter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-gcc-node]', {
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.25,
      });
      gsap.from('[data-gcc-metric]', {
        opacity: 0,
        y: 12,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5,
      });
      gsap.to('[data-gcc-ring]', {
        rotate: 360,
        duration: 48,
        repeat: -1,
        ease: 'none',
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="relative w-full aspect-square max-w-[520px] mx-auto"
      aria-hidden
    >
      {/* Orbit ring */}
      <div
        data-gcc-ring
        className="absolute inset-[8%] rounded-full border border-dashed border-white/10"
      />
      <div className="absolute inset-[22%] rounded-full border border-white/[0.06]" />

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-dezo-surface border border-dezo-primary/40 shadow-dezo-glow flex flex-col items-center justify-center text-center">
        <span className="font-display text-lg sm:text-xl font-extrabold tracking-tightest text-dezo-primary">
          DEZO
        </span>
        <span className="text-[9px] uppercase tracking-[0.14em] text-dezo-text-muted mt-1">
          Growth OS
        </span>
      </div>

      {/* Floating platform nodes */}
      {platformNodes.map((node, i) => (
        <div
          key={node.id}
          data-gcc-node
          className="absolute z-[5] dezo-float"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-dezo-pill dezo-glass text-[10px] sm:text-[11px] font-semibold tracking-wide text-dezo-text-primary whitespace-nowrap dezo-node-pulse">
            {node.label}
          </div>
        </div>
      ))}

      {/* Capability metrics strip */}
      <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2 sm:gap-3 flex-wrap">
        {[
          { label: 'Web + CRO', value: 'Live' },
          { label: 'Marketplaces', value: 'Amazon · Flipkart' },
          { label: 'Ads', value: 'Meta · Google' },
        ].map((m) => (
          <div
            key={m.label}
            data-gcc-metric
            className="px-3 py-2 rounded-dezo-md bg-dezo-surface/90 border border-dezo-border text-center min-w-[96px]"
          >
            <p className="text-[9px] uppercase tracking-wider text-dezo-text-muted">{m.label}</p>
            <p className="text-[11px] font-semibold text-dezo-primary mt-0.5">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

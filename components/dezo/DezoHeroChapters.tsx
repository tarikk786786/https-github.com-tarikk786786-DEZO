'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

/** Site chapters mirrored in the hero showcase reel. */
export const HERO_SITE_CHAPTERS = [
  { id: 'build', label: 'Build', hint: 'Web · brand · commerce' },
  { id: 'market', label: 'Market', hint: 'Ecommerce · Amazon · Flipkart' },
  { id: 'grow', label: 'Grow', hint: 'SEO · ads · measurement' },
  { id: 'work', label: 'Work', hint: 'Live project stories' },
  { id: 'engine', label: 'Engine', hint: 'One connected system' },
  { id: 'lab', label: 'Lab', hint: 'Public diagnostics' },
  { id: 'standard', label: 'Standard', hint: 'Guarantees we control' },
  { id: 'studio', label: 'Studio', hint: 'Bhubaneswar · Odisha' },
] as const;

/**
 * Editorial chapter index for the site-showcase reel.
 * Mobile: compact single-line ticker (thumb-friendly).
 * Desktop: full index grid under the active chapter.
 */
export function DezoHeroChapters() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SITE_CHAPTERS.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const chapter = HERO_SITE_CHAPTERS[index];
  const step = String(index + 1).padStart(2, '0');
  const total = String(HERO_SITE_CHAPTERS.length).padStart(2, '0');

  return (
    <div className="mt-6 sm:mt-8" aria-live="polite" data-hero-item>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-1.5 sm:mb-2">
        Watching the site
      </p>

      {/* Mobile — one active chapter + progress (no dense grid) */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-2xl text-dezo-text-primary tracking-tight">
            {chapter.label}
          </p>
          <p className="font-mono text-[10px] text-dezo-text-muted tabular-nums">
            {step} / {total}
          </p>
        </div>
        <p className="mt-1 font-mono text-xs text-dezo-text-secondary">{chapter.hint}</p>
        <div
          className="mt-3 h-px w-full bg-dezo-border/70 overflow-hidden"
          aria-hidden
        >
          <div
            className="h-full bg-dezo-primary transition-[width] duration-500 ease-out"
            style={{
              width: `${((index + 1) / HERO_SITE_CHAPTERS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Desktop+ — richer index */}
      <div className="hidden sm:block">
        <p className="font-display text-xl sm:text-2xl text-dezo-text-primary tracking-tight">
          {chapter.label}
        </p>
        <p className="mt-1 font-mono text-xs text-dezo-text-secondary">{chapter.hint}</p>
        <ol className="mt-4 grid grid-cols-4 gap-x-2 gap-y-1.5" aria-hidden>
          {HERO_SITE_CHAPTERS.map((c, i) => (
            <li
              key={c.id}
              className={`font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-300 ${
                i === index ? 'text-dezo-primary' : 'text-dezo-text-muted/50'
              }`}
            >
              {String(i + 1).padStart(2, '0')} {c.label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

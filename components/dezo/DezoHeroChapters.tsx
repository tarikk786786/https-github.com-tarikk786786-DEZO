'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

/** Site chapters mirrored in the hero showcase reel (~14s loop). */
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
 * Editorial chapter ticker — DEZO UI only (not media stickers).
 * Roughly tracks the site-showcase hero reel so the first viewport
 * feels like an index of the whole website.
 */
export function DezoHeroChapters() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SITE_CHAPTERS.length);
    }, 1750);
    return () => window.clearInterval(id);
  }, [reduced]);

  const chapter = HERO_SITE_CHAPTERS[index];

  return (
    <div
      className="mt-8 flex flex-col gap-1.5"
      aria-live="polite"
      data-hero-item
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted">
        Site showcase
      </p>
      <p className="font-mono text-xs sm:text-sm text-dezo-text-secondary">
        <span className="text-dezo-primary">{chapter.label}</span>
        <span className="text-dezo-text-muted"> · </span>
        <span>{chapter.hint}</span>
      </p>
      <ol className="mt-2 flex flex-wrap gap-x-3 gap-y-1" aria-hidden>
        {HERO_SITE_CHAPTERS.map((c, i) => (
          <li
            key={c.id}
            className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 ${
              i === index ? 'text-dezo-text-primary' : 'text-dezo-text-muted/55'
            }`}
          >
            {String(i + 1).padStart(2, '0')} {c.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

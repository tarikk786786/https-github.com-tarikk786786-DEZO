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
 * Lives in the paper column — never overlaid as stickers on media.
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

  return (
    <div className="mt-8" aria-live="polite" data-hero-item>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-2">
        Watching the site
      </p>
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
  );
}

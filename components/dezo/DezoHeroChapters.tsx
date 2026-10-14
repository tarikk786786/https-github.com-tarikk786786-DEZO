'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import {
  HERO_SITE_CHAPTERS,
  useHeroShowcase,
} from '@/components/dezo/HeroShowcaseContext';

export { HERO_SITE_CHAPTERS };

/**
 * Compact reel status for the editorial-split hero.
 * One active chapter + progress — no dense index grid.
 */
export function DezoHeroChapters() {
  const reduced = useReducedMotion();
  const { chapterIndex, loopProgress, chapterCount } = useHeroShowcase();
  const chapter = HERO_SITE_CHAPTERS[chapterIndex];
  const step = String(chapterIndex + 1).padStart(2, '0');
  const total = String(chapterCount).padStart(2, '0');

  return (
    <div className="mt-5 sm:mt-6" aria-live="polite" data-hero-item>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-2">
        Site trailer
      </p>
      <div className="relative min-h-[2.75rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={chapter.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-baseline justify-between gap-3"
          >
            <div>
              <Link
                href={chapter.href}
                className="font-display text-xl text-dezo-text-primary tracking-tight hover:text-dezo-primary transition-colors"
              >
                {chapter.label}
              </Link>
              <p className="mt-0.5 font-mono text-[11px] text-dezo-text-secondary">
                {chapter.hint}
              </p>
            </div>
            <p className="font-mono text-[10px] text-dezo-text-muted tabular-nums shrink-0">
              {step} / {total}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 h-px w-full max-w-xs bg-dezo-border/70 overflow-hidden" aria-hidden>
        <div
          className="h-full bg-dezo-primary origin-left dezo-hero-chapter-progress"
          style={{ transform: `scaleX(${loopProgress || 0.02})` }}
        />
      </div>
    </div>
  );
}

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
 * Editorial chapter index for the site-showcase reel.
 * Synced to reel time via HeroShowcaseContext (marketing trailer chapters).
 * Mobile: compact single-line ticker. Desktop: full index + active highlight.
 */
export function DezoHeroChapters() {
  const reduced = useReducedMotion();
  const { chapterIndex, loopProgress, chapterCount } = useHeroShowcase();
  const chapter = HERO_SITE_CHAPTERS[chapterIndex];
  const step = String(chapterIndex + 1).padStart(2, '0');
  const total = String(chapterCount).padStart(2, '0');
  const chapterProgress = Math.min(
    1,
    Math.max(0, loopProgress * chapterCount - chapterIndex)
  );

  return (
    <div className="mt-5 sm:mt-8" aria-live="polite" data-hero-item>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-1.5 sm:mb-2">
        Site trailer · what we build for you
      </p>

      {/* Mobile — one active chapter + progress (no dense grid) */}
      <div className="sm:hidden">
        <div className="relative min-h-[4.25rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chapter.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-2xl text-dezo-text-primary tracking-tight">
                  <Link
                    href={chapter.href}
                    className="hover:text-dezo-primary transition-colors"
                  >
                    {chapter.label}
                  </Link>
                </p>
                <p className="font-mono text-[10px] text-dezo-text-muted tabular-nums shrink-0">
                  {step} / {total}
                </p>
              </div>
              <p className="mt-1 font-mono text-xs text-dezo-text-secondary">
                {chapter.hint}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className="mt-3 h-px w-full bg-dezo-border/70 overflow-hidden"
          aria-hidden
        >
          <div
            className="h-full bg-dezo-primary origin-left dezo-hero-chapter-progress"
            style={{ transform: `scaleX(${chapterProgress || 0.02})` }}
          />
        </div>
      </div>

      {/* Desktop+ — richer index for prospects scanning capabilities */}
      <div className="hidden sm:block">
        <div className="relative min-h-[2.25rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chapter.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-xl sm:text-2xl text-dezo-text-primary tracking-tight">
                <Link
                  href={chapter.href}
                  className="hover:text-dezo-primary transition-colors"
                >
                  {chapter.label}
                </Link>
              </p>
              <p className="mt-1 font-mono text-xs text-dezo-text-secondary">
                {chapter.hint}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <ol className="mt-4 grid grid-cols-4 gap-x-2 gap-y-1.5">
          {HERO_SITE_CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <Link
                href={c.href}
                className={`font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-300 inline-flex items-center gap-1 ${
                  i === chapterIndex
                    ? 'text-dezo-primary'
                    : 'text-dezo-text-muted/50 hover:text-dezo-text-secondary'
                }`}
                aria-current={i === chapterIndex ? 'true' : undefined}
              >
                {i === chapterIndex && (
                  <span
                    className="inline-block h-1 w-1 rounded-full bg-dezo-primary dezo-hero-chapter-dot"
                    aria-hidden
                  />
                )}
                {String(i + 1).padStart(2, '0')} {c.label}
              </Link>
            </li>
          ))}
        </ol>
        <div
          className="mt-3 h-px w-full max-w-md bg-dezo-border/60 overflow-hidden"
          aria-hidden
        >
          <div
            className="h-full bg-dezo-primary/80 origin-left dezo-hero-chapter-progress"
            style={{ transform: `scaleX(${loopProgress || 0.02})` }}
          />
        </div>
      </div>
    </div>
  );
}

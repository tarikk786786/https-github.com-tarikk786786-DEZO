'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

const LINES = [
  { word: 'BUILD', hint: 'Web · brand · commerce' },
  { word: 'MARKET', hint: 'Amazon · Flipkart · storefronts' },
  { word: 'GROW', hint: 'SEO · ads · measurement' },
] as const;

/**
 * Editorial split hero type — three-line manifesto reveal.
 * Distinct from the prior single-word rotator.
 */
export function DezoHeroText({
  brandName,
  eyebrow,
  body,
}: {
  brandName: string;
  eyebrow: string;
  body: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="w-full max-w-[32rem] lg:max-w-none">
      <motion.p
        className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-dezo-primary mb-3 sm:mb-4"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow}
      </motion.p>

      <div className="overflow-hidden">
        <motion.p
          className="font-display text-[2.75rem] leading-[0.92] tracking-tight text-dezo-text-primary sm:text-6xl lg:text-[4.75rem]"
          initial={reduced ? false : { y: '115%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {brandName}
        </motion.p>
      </div>

      <h1 className="mt-5 sm:mt-7 lg:mt-9">
        <span className="sr-only">BUILD. MARKET. GROW.</span>
        <span className="flex flex-col gap-2.5 sm:gap-3.5" aria-hidden>
          {LINES.map((line, i) => (
            <span key={line.word} className="overflow-hidden block">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '120%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.28 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="font-display text-[1.55rem] sm:text-3xl lg:text-[2.65rem] tracking-tightest leading-none uppercase text-dezo-text-primary">
                  {line.word}
                  <span className="text-dezo-primary">.</span>
                </span>
                <span className="mt-1 block font-mono text-[10px] sm:text-[11px] tracking-[0.08em] text-dezo-text-muted">
                  {line.hint}
                </span>
              </motion.span>
            </span>
          ))}
        </span>
      </h1>

      <motion.p
        className="mt-5 sm:mt-7 text-[0.95rem] sm:text-lg text-dezo-text-secondary leading-relaxed max-w-md"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {body}
      </motion.p>
    </div>
  );
}

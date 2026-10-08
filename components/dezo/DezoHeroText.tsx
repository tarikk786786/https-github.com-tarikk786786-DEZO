'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

const PILLARS = [
  { word: 'BUILD', hint: 'Websites · brand · commerce' },
  { word: 'MARKET', hint: 'Amazon · Flipkart · storefronts' },
  { word: 'GROW', hint: 'SEO · ads · measurement' },
] as const;

const PILLAR_MS = 2200;

/**
 * Kinetic hero typography — different from the old y-stagger.
 * Brand clip-reveal + rotating BUILD / MARKET / GROW word stage.
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PILLARS.length);
    }, PILLAR_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const pillar = PILLARS[index];

  return (
    <div className="max-w-[36rem] lg:max-w-[40rem]">
      <motion.p
        className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-2 sm:mb-3"
        initial={reduced ? false : { opacity: 0, letterSpacing: '0.32em' }}
        animate={{ opacity: 1, letterSpacing: '0.18em' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow}
      </motion.p>

      {/* Brand — clip mask rise (not fade-up blocks) */}
      <div className="overflow-hidden">
        <motion.p
          className="font-display text-[2.75rem] leading-none tracking-tight text-dezo-text-primary sm:text-6xl lg:text-[5.75rem]"
          initial={reduced ? false : { y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {brandName}
        </motion.p>
      </div>

      <motion.div
        className="mt-4 mb-3 h-px w-12 bg-dezo-primary origin-left sm:mt-7 sm:mb-6 sm:w-14 lg:mt-9 lg:mb-8"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Rotating pillar stage — the new headline animation */}
      <h1 className="sr-only">BUILD. MARKET. GROW.</h1>
      <div
        className="relative min-h-[3.2rem] sm:min-h-[4.5rem] lg:min-h-[5.25rem]"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pillar.word}
            className="absolute inset-x-0 top-0"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 28, clipPath: 'inset(100% 0 0 0)' }
            }
            animate={{
              opacity: 1,
              y: 0,
              clipPath: 'inset(0% 0 0 0)',
            }}
            exit={
              reduced
                ? undefined
                : { opacity: 0, y: -22, clipPath: 'inset(0 0 100% 0)' }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-[1.65rem] sm:text-4xl lg:text-[3.35rem] tracking-tightest leading-[1.02] text-dezo-text-primary uppercase">
              {pillar.word}
              <span className="text-dezo-primary">.</span>
            </p>
            <p className="mt-1.5 font-mono text-[11px] sm:text-xs text-dezo-text-muted tracking-wide">
              {pillar.hint}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pillar progress dots */}
      <div className="mt-3 sm:mt-4 flex items-center gap-2" aria-hidden>
        {PILLARS.map((p, i) => (
          <span
            key={p.word}
            className={`h-px transition-all duration-500 ${
              i === index ? 'w-8 bg-dezo-primary' : 'w-3 bg-dezo-border'
            }`}
          />
        ))}
      </div>

      <motion.p
        className="mt-4 sm:mt-6 text-[0.95rem] sm:text-lg lg:text-xl text-dezo-text-secondary leading-relaxed max-w-md"
        initial={reduced ? false : { opacity: 0, filter: 'blur(6px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {body}
      </motion.p>
    </div>
  );
}

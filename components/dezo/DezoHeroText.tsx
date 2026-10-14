'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

const WORDS = ['BUILD', 'MARKET', 'GROW'] as const;

/**
 * Full-bleed cinema type — brand slam + word-shoot manifesto.
 * No root GSAP wrapper; entrance lives here.
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
    <div className="w-full max-w-3xl text-dezo-text-inverse">
      <motion.p
        className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-dezo-primary mb-4 sm:mb-5"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow}
      </motion.p>

      {/* Brand slam — oversized, clip-rise with overshoot settle */}
      <div className="overflow-hidden">
        <motion.p
          className="font-display text-[4.25rem] leading-[0.86] tracking-tightest text-dezo-text-inverse sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          initial={reduced ? false : { y: '120%', scale: 1.08 }}
          animate={{ y: '0%', scale: 1 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          {brandName}
        </motion.p>
      </div>

      {/* Accent shoot-line */}
      <motion.div
        className="mt-5 sm:mt-6 h-[2px] origin-left bg-dezo-primary"
        aria-hidden
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: 'min(12rem, 40%)' }}
      />

      <h1 className="mt-6 sm:mt-8">
        <span className="sr-only">BUILD. MARKET. GROW.</span>
        <span
          className="flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:gap-x-4"
          aria-hidden
        >
          {WORDS.map((word, i) => (
            <span key={word} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block font-display text-[1.65rem] sm:text-3xl lg:text-[2.75rem] tracking-tightest uppercase leading-none"
                initial={
                  reduced
                    ? false
                    : { x: -48, opacity: 0, filter: 'blur(8px)' }
                }
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.55,
                  delay: 0.42 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
                <span className="text-dezo-primary">.</span>
              </motion.span>
            </span>
          ))}
        </span>
      </h1>

      <motion.p
        className="mt-5 sm:mt-7 text-base sm:text-lg text-white/78 leading-relaxed max-w-md"
        initial={reduced ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        {body}
      </motion.p>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

const WORDS = ['BUILD', 'MARKET', 'GROW'] as const;

/**
 * Cinema type that shoots — brand slam + word streak manifesto.
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
        className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-dezo-primary mb-4 sm:mb-5"
        initial={reduced ? false : { opacity: 0, y: 28, letterSpacing: '0.55em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow}
      </motion.p>

      {/* Brand slam — hard clip-rise with overshoot */}
      <div className="overflow-hidden">
        <motion.p
          className="font-display text-[4.5rem] leading-[0.84] tracking-tightest text-dezo-text-inverse sm:text-7xl md:text-8xl lg:text-[8rem]"
          initial={reduced ? false : { y: '135%', scale: 1.18, rotate: -1.5 }}
          animate={{ y: '0%', scale: 1, rotate: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {brandName}
        </motion.p>
      </div>

      {/* Accent shoot-line */}
      <motion.div
        className="mt-5 sm:mt-6 h-[3px] origin-left bg-dezo-primary"
        aria-hidden
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: 'min(14rem, 48%)' }}
      />

      <h1 className="mt-6 sm:mt-8">
        <span className="sr-only">BUILD. MARKET. GROW.</span>
        <span
          className="flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:gap-x-5"
          aria-hidden
        >
          {WORDS.map((word, i) => (
            <span key={word} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block font-display text-[1.75rem] sm:text-3xl lg:text-[3rem] tracking-tightest uppercase leading-none"
                initial={
                  reduced
                    ? false
                    : { x: -110, opacity: 0, filter: 'blur(14px)', skewX: -8 }
                }
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)', skewX: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.48 + i * 0.14,
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
        className="mt-5 sm:mt-7 text-base sm:text-lg text-white/80 leading-relaxed max-w-md"
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {body}
      </motion.p>
    </div>
  );
}

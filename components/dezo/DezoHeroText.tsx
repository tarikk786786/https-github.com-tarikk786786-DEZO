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
    <div className="w-full max-w-4xl text-dezo-text-inverse">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <span className="inline-block w-2 h-2 bg-dezo-primary rounded-none" />
        <motion.p
          className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.25em] text-dezo-primary"
          initial={reduced ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow} // ARCHITECTURE & GROWTH
        </motion.p>
      </div>

      {/* Brand slam — oversized, bold brutalist sans/serif hybrid */}
      <div className="overflow-hidden">
        <motion.p
          className="font-display text-[4.5rem] leading-[0.82] tracking-tightest text-white sm:text-8xl md:text-9xl lg:text-[9.5rem] font-black uppercase"
          initial={reduced ? false : { y: '120%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {brandName}
        </motion.p>
      </div>

      {/* Industrial stark border bar */}
      <motion.div
        className="mt-5 sm:mt-6 h-[3px] origin-left bg-dezo-primary"
        aria-hidden
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: 'min(16rem, 50%)' }}
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
                className="inline-block font-display text-[1.85rem] sm:text-4xl lg:text-[3.25rem] tracking-tightest uppercase leading-none font-bold text-white hover:text-dezo-primary transition-colors"
                initial={
                  reduced
                    ? false
                    : { y: '100%', opacity: 0 }
                }
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
                <span className="text-dezo-primary font-mono ml-1 font-black">/</span>
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

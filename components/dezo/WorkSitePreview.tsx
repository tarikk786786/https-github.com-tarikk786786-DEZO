'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { LiveSitePreview } from '@/components/dezo/LiveSitePreview';

/**
 * Work website preview animation — curtain wipe in, then a slow
 * “browse the site” vertical pan (not a generic image zoom).
 */
export function WorkSitePreview({
  url,
  title,
  eager = false,
  className = '',
  pan = 'hover',
}: {
  url: string;
  title: string;
  eager?: boolean;
  className?: string;
  /** hover = pan on group hover; auto = gentle loop while in view */
  pan?: 'hover' | 'auto' | 'none';
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative h-full w-full overflow-hidden bg-dezo-bg-warm ${className}`}
      initial={
        reduced
          ? false
          : { clipPath: 'inset(0 0 0 100%)', opacity: 0.7 }
      }
      whileInView={
        reduced
          ? undefined
          : { clipPath: 'inset(0 0 0 0%)', opacity: 1 }
      }
      viewport={{ once: true, margin: '-60px', amount: 0.35 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Soft top chrome bar — reads as a live website surface */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-6 items-center gap-1.5 border-b border-black/10 bg-dezo-surface/90 px-2.5 backdrop-blur-[2px] sm:h-7 sm:px-3"
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-dezo-border-strong sm:h-2 sm:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-dezo-border-strong sm:h-2 sm:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-dezo-border-strong sm:h-2 sm:w-2" />
        <span className="ml-2 h-1 flex-1 max-w-[40%] rounded-full bg-dezo-border/80" />
      </div>

      <div
        className={`absolute inset-0 pt-6 sm:pt-7 ${
          reduced || pan === 'none'
            ? ''
            : pan === 'auto'
              ? 'dezo-work-site-pan-auto'
              : 'dezo-work-site-pan'
        }`}
      >
        <LiveSitePreview
          url={url}
          title={title}
          eager={eager}
          className="absolute inset-0 h-[130%] w-full object-cover object-top"
        />
      </div>

      {/* Bottom fade so the pan never hard-crops */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-dezo-ink/20 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}

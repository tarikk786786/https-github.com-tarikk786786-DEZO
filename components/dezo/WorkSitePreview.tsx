'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { LiveSitePreview } from '@/components/dezo/LiveSitePreview';

/**
 * Work website preview — refined browser frame with soft luxury chrome.
 */
export function WorkSitePreview({
  url,
  title,
  eager = false,
  className = '',
  pan = 'none',
}: {
  url: string;
  title: string;
  eager?: boolean;
  className?: string;
  /** Kept for backwards compatibility */
  pan?: 'hover' | 'auto' | 'none';
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative h-full w-full overflow-hidden bg-white rounded-dezo-lg border border-dezo-border shadow-dezo-card ${className}`}
      initial={reduced ? false : { opacity: 0.8 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: '-40px', amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-x-0 top-0 z-20 flex h-7 items-center justify-between border-b border-dezo-border bg-dezo-bg-warm/90 px-2.5 sm:h-8 sm:px-3 select-none"
        aria-hidden
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-dezo-primary/50"></span>
          <span className="h-2 w-2 rounded-full bg-dezo-primary/80"></span>
          <span className="h-2 w-2 rounded-full bg-dezo-ink/20"></span>
        </div>
        <span className="flex h-4 max-w-[14rem] items-center truncate rounded-dezo-sm bg-white/80 px-2 font-mono text-[9px] text-dezo-text-muted sm:text-[10px] tracking-wide">
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
        <span className="font-mono text-[8px] font-semibold uppercase tracking-widest text-dezo-primary">
          Live
        </span>
      </div>

      <div className="absolute inset-0 pt-7 sm:pt-8 overflow-hidden bg-dezo-bg-warm">
        <LiveSitePreview
          url={url}
          title={title}
          eager={eager}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
    </motion.div>
  );
}

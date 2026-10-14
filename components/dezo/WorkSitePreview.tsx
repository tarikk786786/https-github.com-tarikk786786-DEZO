'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { LiveSitePreview } from '@/components/dezo/LiveSitePreview';

/**
 * Work website preview — unmistakable “live site browse” motion.
 * Tall page pans continuously (or on hover); wipe entrance on scroll-in.
 */
export function WorkSitePreview({
  url,
  title,
  eager = false,
  className = '',
  pan = 'auto',
}: {
  url: string;
  title: string;
  eager?: boolean;
  className?: string;
  /** auto = always browsing; hover = pan on group hover; none = static */
  pan?: 'hover' | 'auto' | 'none';
}) {
  const reduced = useReducedMotion();
  const panClass =
    reduced || pan === 'none'
      ? ''
      : pan === 'hover'
        ? 'dezo-work-site-pan'
        : 'dezo-work-site-pan-auto';

  return (
    <motion.div
      className={`relative h-full w-full overflow-hidden bg-dezo-bg-warm ${className}`}
      initial={
        reduced ? false : { clipPath: 'inset(100% 0 0 0)', opacity: 0.5 }
      }
      whileInView={
        reduced ? undefined : { clipPath: 'inset(0% 0 0 0)', opacity: 1 }
      }
      viewport={{ once: true, margin: '-40px', amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Browser chrome */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-7 items-center gap-1.5 border-b border-black/10 bg-dezo-surface/95 px-2.5 sm:h-8 sm:px-3"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-[#E06C75]" />
        <span className="h-2 w-2 rounded-full bg-[#E5C07B]" />
        <span className="h-2 w-2 rounded-full bg-[#98C379]" />
        <span className="ml-2 flex h-4 flex-1 max-w-[55%] items-center truncate rounded-full bg-dezo-bg px-2 font-mono text-[9px] text-dezo-text-muted sm:text-[10px]">
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
        {!reduced && pan !== 'none' && (
          <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.14em] text-dezo-primary sm:inline">
            Live scroll
          </span>
        )}
      </div>

      {/* Tall site surface that pans */}
      <div className={`absolute inset-0 pt-7 sm:pt-8 ${panClass}`}>
        <LiveSitePreview
          url={url}
          title={title}
          eager={eager}
          className="absolute inset-0 h-[160%] w-full object-cover object-top"
        />
      </div>

      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-dezo-ink/35 via-dezo-ink/10 to-transparent"
        aria-hidden
      />
    </motion.div>
  );
}

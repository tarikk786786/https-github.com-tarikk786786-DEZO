'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { LiveSitePreview } from '@/components/dezo/LiveSitePreview';

/**
 * Work website preview — clean Brutalist browser frame with interactive elevation.
 * Removed continuous dizzying pan; replaced with refined hover depth.
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
      className={`relative h-full w-full overflow-hidden bg-white ${className}`}
      initial={
        reduced ? false : { opacity: 0.8 }
      }
      whileInView={
        reduced ? undefined : { opacity: 1 }
      }
      viewport={{ once: true, margin: '-40px', amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Brutalist Browser Top Chrome */}
      <div
        className="absolute inset-x-0 top-0 z-20 flex h-7 items-center justify-between border-b-2 border-dezo-ink bg-[#FAF8F5] px-2.5 sm:h-8 sm:px-3 select-none"
        aria-hidden
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-none bg-dezo-ink border border-dezo-ink" />
          <span className="h-2 w-2 rounded-none bg-dezo-primary border border-dezo-ink" />
          <span className="h-2 w-2 rounded-none bg-white border border-dezo-ink" />
        </div>
        <span className="flex h-4 items-center truncate px-2 font-mono text-[9px] font-bold text-dezo-ink sm:text-[10px] tracking-wide">
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-dezo-primary bg-dezo-ink text-white px-1.5 py-0.2">
          LIVE
        </span>
      </div>

      {/* Site surface container */}
      <div className="absolute inset-0 pt-7 sm:pt-8 overflow-hidden bg-[#FAF8F5]">
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

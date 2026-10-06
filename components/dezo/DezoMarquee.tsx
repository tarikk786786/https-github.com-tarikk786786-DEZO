'use client';

import React from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

interface DezoMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export function DezoMarquee({
  items,
  speed = 'normal',
  className = '',
}: DezoMarqueeProps) {
  const isReducedMotion = useReducedMotion();

  return (
    <div className={`relative w-full overflow-hidden py-4 select-none ${className}`}>
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dezo-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dezo-bg to-transparent z-10 pointer-events-none" />

      <div
        className={`flex w-max items-center gap-12 ${
          isReducedMotion ? 'flex-wrap justify-center' : 'animate-marquee hover:[animation-play-state:paused]'
        }`}
        style={{
          animationDuration: speed === 'slow' ? '45s' : speed === 'fast' ? '18s' : '30s',
        }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-dezo-text-muted hover:text-dezo-text-primary transition-colors cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-dezo-accent/50" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}

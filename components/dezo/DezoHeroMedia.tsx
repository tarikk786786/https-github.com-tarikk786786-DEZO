'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

/**
 * Eye-catching Architectural Hero Background:
 * Replaces video/continuous live animation with a stunning high-end Brutalist technical grid:
 * - Geometric isometric perspective grid
 * - Pulsing accent coordinates
 * - Ambient warm gold & ink vignette
 * - Architectural crosshairs & technical elevation markers
 */
export function DezoHeroMedia() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A0A09]" aria-hidden>
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(176, 141, 87, 0.18) 0%, rgba(11, 11, 10, 0) 70%)'
        }}
      />

      {/* High-end Architectural Grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(176, 141, 87, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(176, 141, 87, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Larger Technical 192px Grid Subdivisions */}
      <div 
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '192px 192px',
        }}
      />

      {/* Verified studio and delivery credentials */}
      <div className="absolute top-28 right-12 hidden lg:flex flex-col items-end gap-1.5 font-mono text-[11px] text-white/70 tracking-widest select-none">
        <span className="text-dezo-primary font-bold">[STUDIO // PATIA, BHUBANESWAR 751024]</span>
        <span className="text-white/80">DELIVERY: ALL-INDIA &amp; INTERNATIONAL</span>
        <span className="text-emerald-400 font-semibold">[CONSULTATIONS: OPEN]</span>
      </div>

      <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-1.5 font-mono text-[11px] text-white/70 tracking-widest select-none">
        <span className="text-white/80">STACK: NEXT.JS 16 · REACT 19 · SHOPIFY · SP-API</span>
        <span className="text-white/80">VERIFIED ARCHIVE: 181+ PRODUCTION SITES</span>
        <span className="text-dezo-primary font-bold">[STARTING FROM ₹1,999 · ₹0 LIFELONG HOSTING]</span>
      </div>

      {/* Corner crosshair accents */}
      <div className="absolute top-24 left-8 text-dezo-primary/40 font-mono text-xs">+</div>
      <div className="absolute top-24 right-8 text-dezo-primary/40 font-mono text-xs">+</div>
      <div className="absolute bottom-24 left-8 text-dezo-primary/40 font-mono text-xs">+</div>
      <div className="absolute bottom-24 right-8 text-dezo-primary/40 font-mono text-xs">+</div>

      {/* Dark Film Vignette Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/60 to-[#0B0B0A]/30 pointer-events-none"
      />
    </div>
  );
}

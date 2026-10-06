'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

export interface DezoRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

/**
 * DezoReveal: High-performance entrance animation adapter.
 * Automatically falls back to zero-motion when prefers-reduced-motion is enabled.
 */
export function DezoReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
  ...props
}: DezoRevealProps) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = 24;
  const initialOffset = {
    up: { y: offset, opacity: 0 },
    down: { y: -offset, opacity: 0 },
    left: { x: offset, opacity: 0 },
    right: { x: -offset, opacity: 0 },
    none: { opacity: 0 },
  }[direction];

  return (
    <motion.div
      initial={initialOffset}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // DEZO bespoke bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * DezoMagnetic: Subtle cursor magnetic pull interaction for CTAs.
 */
export function DezoMagnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const isReducedMotion = useReducedMotion();
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

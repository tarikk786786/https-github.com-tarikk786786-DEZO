'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useReducedMotion } from './useReducedMotion';

export const dezoEase = [0.22, 1, 0.36, 1] as const;

export interface DezoRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

/**
 * DezoReveal: Scroll-triggered entrance. Respects prefers-reduced-motion.
 */
export function DezoReveal({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  className = '',
  ...props
}: DezoRevealProps) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = 28;
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
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: dezoEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function DezoStagger({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function DezoStaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: dezoEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * DezoMagnetic: Subtle cursor magnetic pull for CTAs.
 */
export function DezoMagnetic({
  children,
  strength = 0.22,
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
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * DezoHoverLift: Card hover lift + subtle scale.
 */
export function DezoHoverLift({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * GSAP hero entrance — brand mark, headline, CTAs, geo line.
 */
export function DezoHeroMotion({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (isReducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const targets = rootRef.current?.querySelectorAll('[data-hero-item]');
      if (targets?.length) {
        gsap.set(targets, { opacity: 0, y: 36 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.11,
          ease: 'power3.out',
          clearProps: 'transform',
        });
      }

      const atmosphere = rootRef.current?.querySelectorAll('[data-hero-atmosphere]');
      if (atmosphere?.length) {
        gsap.set(atmosphere, { opacity: 0, scale: 0.96 });
        gsap.to(atmosphere, {
          opacity: 1,
          scale: 1,
          duration: 1.35,
          ease: 'power2.out',
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Lightweight route transition wrapper for main content.
 */
export function DezoPageTransition({
  children,
  routeKey,
}: {
  children: React.ReactNode;
  routeKey: string;
}) {
  const isReducedMotion = useReducedMotion();

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: dezoEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

interface DezoMetricProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  decimals?: number;
}

export function DezoMetric({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  decimals = 0,
}: DezoMetricProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion) {
      setCurrentValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCurrentValue(easeOut * value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrentValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated, isReducedMotion]);

  const displayValue = decimals > 0 ? currentValue.toFixed(decimals) : Math.floor(currentValue).toLocaleString();

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-start text-center lg:text-left select-none">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-dezo-text-primary mb-2">
        <span>{prefix}</span>
        <span>{displayValue}</span>
        <span className="text-dezo-accent">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-dezo-text-primary">
        {label}
      </div>
      {sublabel && (
        <div className="text-xs text-dezo-text-muted mt-0.5">{sublabel}</div>
      )}
    </div>
  );
}

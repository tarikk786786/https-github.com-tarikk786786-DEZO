import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

export const useIntersectionObserver = (options: Record<string, unknown> = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const optionsStr = JSON.stringify(options);

  useLayoutEffect(() => {
    const parsedOptions = JSON.parse(optionsStr) as Record<string, unknown> & IntersectionObserverInit;
    const el = ref.current;
    if (!el) return undefined;

    const triggerOnce = parsedOptions.triggerOnce !== false;
    const viewportH = typeof window !== 'undefined' ? window.innerHeight : 0;
    const rect = el.getBoundingClientRect();
    const cushion = 300;
    if (rect.top < viewportH + cushion && rect.bottom > -cushion) setIsIntersecting(true);

    const { triggerOnce: _omit, ...restIo } = parsedOptions;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce) observer.unobserve(entry.target);
      } else if (parsedOptions.triggerOnce === false) {
        setIsIntersecting(false);
      }
    }, { threshold: 0, rootMargin: '100px 0px 280px 0px', ...(restIo as IntersectionObserverInit) });

    observer.observe(el);
    return () => observer.disconnect();
  }, [optionsStr]);

  return [ref, isIntersecting] as const;
};

const directionMap: Record<string, string> = {
  up:    'translateY(36px)',
  down:  'translateY(-36px)',
  left:  'translateX(36px)',
  right: 'translateX(-36px)',
  scale: 'scale(0.92)',
  none:  'none',
};

export const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 900,
}: any) => {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  return (
    <div
      ref={ref as any}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0,0) scale(1)' : directionMap[direction] ?? directionMap.up,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export const AnimatedCounter = ({ end, duration = 2200, suffix = '', nightMode }: any) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    let frameId: number;
    const d = nightMode ? 400 : duration;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / d, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, end, duration, nightMode]);

  return (
    <span ref={ref as any} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

export const DynamicHeadline = ({ words, prefix = '', suffix = '', gradient = false }: any) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % words.length);
        setFade(true);
      }, 450);
    }, 3500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-flex items-center">
      {prefix && <span className="mr-2">{prefix}</span>}
      <span className="relative inline-flex overflow-hidden pb-1 md:pb-2 min-w-[220px] md:min-w-[340px] lg:min-w-[420px]">
        <span
          className={`absolute inset-0 smooth-transition ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${gradient ? 'text-[var(--primary-light)]' : ''}`}
          style={{ transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}
        >
          {words[index]}
        </span>
        <span className="opacity-0 pointer-events-none">
          {words.reduce((a: string, b: string) => a.length > b.length ? a : b)}
        </span>
      </span>
      {suffix && <span className="ml-2">{suffix}</span>}
    </span>
  );
};

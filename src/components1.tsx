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
  up:    'translateY(40px) scale(0.96)',
  down:  'translateY(-40px) scale(0.96)',
  left:  'translateX(40px) scale(0.96)',
  right: 'translateX(-40px) scale(0.96)',
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

  useEffect(() => {
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
  }, [end, duration, nightMode]);

  return (
    <span className="tabular-nums">
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

export const Magnetic = ({ children }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse as any}
      onMouseLeave={reset}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.15s ease-out',
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  );
};

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const hoverOn = () => setIsHovered(true);
    const hoverOff = () => setIsHovered(false);

    window.addEventListener('mousemove', move);
    
    const attachListeners = () => {
      const interactables = document.querySelectorAll('a, button');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', hoverOn);
        el.addEventListener('mouseleave', hoverOff);
      });
    };
    
    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
      const interactables = document.querySelectorAll('a, button');
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', hoverOn);
        el.removeEventListener('mouseleave', hoverOff);
      });
    };
  }, []);

  if (typeof window === 'undefined' || window.innerWidth < 768) return null;

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - 6}px, ${pos.y - 6}px, 0) scale(${isHovered ? 0 : 1})`,
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <div 
        className="fixed top-0 left-0 w-12 h-12 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center backdrop-blur-[1px]"
        style={{
          transform: `translate3d(${pos.x - 24}px, ${pos.y - 24}px, 0) scale(${isHovered ? 1.5 : 1})`,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isHovered ? 'rgba(255,255,255,1)' : 'transparent',
          opacity: isHovered ? 0.8 : 1,
        }}
      />
    </>
  );
};

export const InfiniteMarquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 border-y border-white/5 bg-[var(--bg-dark)] relative flex">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[var(--bg-dark)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[var(--bg-dark)] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee inline-block flex items-center">
        {Array(10).fill(['WEB DEVELOPMENT', 'SEO OPTIMIZATION', 'DIGITAL MARKETING', 'UI/UX DESIGN', 'E-COMMERCE']).flat().map((text, i) => (
          <div key={i} className="flex items-center mx-6">
            <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-white/40">{text}</span>
            <span className="mx-6 w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse-soft" />
          </div>
        ))}
      </div>
      <div className="animate-marquee inline-block flex items-center absolute top-0" style={{ animationDelay: '-15s' }}>
        {Array(10).fill(['WEB DEVELOPMENT', 'SEO OPTIMIZATION', 'DIGITAL MARKETING', 'UI/UX DESIGN', 'E-COMMERCE']).flat().map((text, i) => (
          <div key={i} className="flex items-center mx-6 mt-4">
            <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-white/40">{text}</span>
            <span className="mx-6 w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse-soft" />
          </div>
        ))}
      </div>
    </div>
  );
};

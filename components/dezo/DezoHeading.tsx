import React from 'react';

interface DezoHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  children: React.ReactNode;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  glow?: boolean;
}

export function DezoHeading({
  as: Component = 'h2',
  children,
  subtitle,
  badge,
  align = 'left',
  className = '',
}: DezoHeadingProps) {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const sizes = {
    h1: 'font-display text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tightest leading-[1.02]',
    h2: 'font-display text-3xl sm:text-[2.6rem] lg:text-[3.35rem] font-bold tracking-tight leading-[1.08]',
    h3: 'font-display text-2xl sm:text-3xl font-bold tracking-tight leading-snug',
    h4: 'font-display text-xl sm:text-2xl font-semibold tracking-normal',
    p: 'text-lg sm:text-xl font-medium',
  };

  return (
    <div className={`flex flex-col gap-4 max-w-3xl ${alignments[align]} ${className}`}>
      {badge && (
        <div
          className={`flex flex-col gap-3 ${
            align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'
          }`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary">
            {badge}
          </span>
          <span className="dezo-accent-line" aria-hidden />
        </div>
      )}
      <Component className={`${sizes[Component]} text-dezo-text-primary`}>
        {children}
      </Component>
      {subtitle && (
        <p className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed font-normal max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

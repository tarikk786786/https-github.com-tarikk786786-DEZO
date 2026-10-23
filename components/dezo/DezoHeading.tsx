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
    h1: 'font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-normal tracking-tightest leading-[1.08]',
    h2: 'font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight leading-[1.12]',
    h3: 'font-display text-2xl sm:text-3xl font-normal tracking-tight leading-snug',
    h4: 'font-sans text-xl sm:text-2xl font-semibold tracking-normal',
    p: 'text-lg sm:text-xl font-medium',
  };

  return (
    <div className={`flex flex-col gap-3 max-w-3xl ${alignments[align]} ${className}`}>
      {badge && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary">
          {badge}
        </span>
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

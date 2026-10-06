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
    h1: 'text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.08]',
    h2: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]',
    h3: 'text-2xl sm:text-3xl font-bold tracking-tight leading-snug',
    h4: 'text-xl sm:text-2xl font-bold tracking-normal',
    p: 'text-lg sm:text-xl font-medium',
  };

  return (
    <div className={`flex flex-col gap-3 max-w-3xl ${alignments[align]} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-dezo-surface border border-dezo-border text-dezo-accent">
          {badge}
        </span>
      )}
      <Component className={`${sizes[Component]} text-dezo-text-primary`}>
        {children}
      </Component>
      {subtitle && (
        <p className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

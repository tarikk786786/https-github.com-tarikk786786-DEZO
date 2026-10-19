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
    h1: 'font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tightest leading-[1.04]',
    h2: 'font-display text-3xl sm:text-4xl lg:text-[3rem] font-bold tracking-tight leading-[1.1]',
    h3: 'font-display text-2xl sm:text-3xl font-bold tracking-tight leading-snug',
    h4: 'font-sans text-xl sm:text-2xl font-bold tracking-tight',
    p: 'text-lg sm:text-xl font-medium',
  };

  return (
    <div className={`flex flex-col gap-3.5 max-w-3xl ${alignments[align]} ${className}`}>
      {badge && (
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-dezo-primary bg-dezo-ink text-white px-2.5 py-1 rounded-none inline-flex items-center gap-2 shadow-[2px_2px_0_0_#B08D57]">
          <span className="w-1.5 h-1.5 bg-dezo-primary shrink-0" />
          {badge}
        </span>
      )}
      <Component className={`${sizes[Component]} text-dezo-text-primary`}>
        {children}
      </Component>
      {subtitle && (
        <p className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed font-normal max-w-2xl border-l-2 border-dezo-primary pl-3.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

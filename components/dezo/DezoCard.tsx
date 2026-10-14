import React from 'react';

interface DezoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
}

export function DezoCard({
  children,
  className = '',
  glow = false,
  interactive = true,
  ...props
}: DezoCardProps) {
  return (
    <div
      className={`relative rounded-dezo-lg bg-dezo-surface border border-dezo-border p-6 sm:p-8 transition-all duration-300 ${
        interactive
          ? 'hover:border-dezo-border-strong hover:bg-dezo-surface-hover hover:-translate-y-1'
          : ''
      } ${glow ? 'shadow-dezo-card' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

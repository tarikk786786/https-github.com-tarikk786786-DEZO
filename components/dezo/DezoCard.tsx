import React from 'react';

interface DezoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
  variant?: 'default' | 'warm' | 'ink';
}

export function DezoCard({
  children,
  className = '',
  glow = false,
  interactive = true,
  variant = 'default',
  ...props
}: DezoCardProps) {
  const variantStyles = {
    default: 'bg-white text-dezo-ink border-2 border-dezo-ink',
    warm: 'bg-dezo-bg-warm text-dezo-ink border-2 border-dezo-ink',
    ink: 'bg-dezo-ink text-dezo-bg border-2 border-dezo-ink shadow-[4px_4px_0_0_#B08D57]',
  };

  const interactiveStyles = interactive
    ? 'hover:border-dezo-primary hover:shadow-[4px_4px_0_0_#B08D57] transition-all duration-150 active:translate-x-[1px] active:translate-y-[1px]'
    : 'shadow-[3px_3px_0_0_#0B0B0A]';

  return (
    <div
      className={`relative rounded-none p-6 sm:p-8 ${variantStyles[variant]} ${interactiveStyles} ${
        glow ? 'shadow-[4px_4px_0_0_#B08D57]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

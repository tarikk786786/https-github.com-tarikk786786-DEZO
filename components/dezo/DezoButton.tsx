'use client';

import React from 'react';
import Link from 'next/link';
import { DezoMagnetic } from '@/lib/motion/MotionAdapter';

interface DezoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  magnetic?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function DezoButton({
  variant = 'primary',
  size = 'md',
  href,
  magnetic = false,
  children,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}: DezoButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-150 select-none cursor-pointer rounded-none active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'font-mono text-xs px-3.5 py-2 gap-1.5',
    md: 'font-mono text-xs sm:text-sm px-5 py-2.5 gap-2',
    lg: 'font-mono text-sm sm:text-base px-6 py-3.5 gap-2.5 tracking-wide',
  };

  const variantStyles = {
    primary:
      'bg-dezo-ink hover:bg-dezo-primary text-white hover:text-dezo-ink border-2 border-dezo-ink hover:border-dezo-primary shadow-[3px_3px_0_0_#B08D57] hover:shadow-[4px_4px_0_0_#0B0B0A] hover:-translate-x-0.5 hover:-translate-y-0.5',
    secondary:
      'bg-white hover:bg-dezo-bg-warm text-dezo-ink border-2 border-dezo-ink shadow-[3px_3px_0_0_#0B0B0A] hover:shadow-[4px_4px_0_0_#B08D57] hover:-translate-x-0.5 hover:-translate-y-0.5',
    outline:
      'bg-transparent hover:bg-dezo-ink text-dezo-ink hover:text-white border-2 border-dezo-ink hover:shadow-[3px_3px_0_0_#B08D57]',
    ghost:
      'bg-transparent hover:bg-black/[0.05] text-dezo-text-secondary hover:text-dezo-text-primary border-b-2 border-transparent hover:border-dezo-ink',
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const buttonElement = href ? (
    <Link href={href} className={combinedClasses}>
      {content}
    </Link>
  ) : (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );

  if (magnetic) {
    return <DezoMagnetic>{buttonElement}</DezoMagnetic>;
  }

  return buttonElement;
}

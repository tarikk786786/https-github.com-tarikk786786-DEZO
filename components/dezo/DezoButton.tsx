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
    'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-dezo-md select-none cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-5 py-3 gap-2',
    lg: 'text-[15px] px-7 py-3.5 gap-2.5 tracking-tight',
  };

  const variantStyles = {
    primary:
      'bg-dezo-primary hover:bg-dezo-primary-hover text-white border border-dezo-primary hover:-translate-y-px',
    secondary:
      'bg-dezo-surface hover:bg-dezo-surface-hover text-dezo-text-primary border border-dezo-border-strong hover:-translate-y-px',
    outline:
      'bg-transparent hover:bg-dezo-accent-soft/50 text-dezo-text-primary border border-dezo-border-strong hover:-translate-y-px',
    ghost: 'bg-transparent hover:bg-black/[0.04] text-dezo-text-secondary hover:text-dezo-text-primary',
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

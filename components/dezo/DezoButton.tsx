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
    'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full select-none cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3.5 gap-2',
    lg: 'text-base px-8 py-4.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-dezo-primary hover:bg-dezo-primary-hover text-white shadow-lg hover:shadow-dezo-glow border border-white/10',
    secondary:
      'bg-dezo-surface-elevated hover:bg-dezo-surface-hover text-dezo-text-primary border border-dezo-border hover:border-dezo-border-strong',
    outline:
      'bg-transparent hover:bg-white/5 text-dezo-text-primary border border-dezo-border hover:border-dezo-border-strong',
    ghost: 'bg-transparent hover:bg-white/5 text-dezo-text-secondary hover:text-dezo-text-primary',
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

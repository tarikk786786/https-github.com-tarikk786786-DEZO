'use client';

import React from 'react';
import Link from 'next/link';
import { DezoMagnetic } from '@/lib/motion/MotionAdapter';

interface DezoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  magnetic?: boolean;
  isLoading?: boolean;
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
  isLoading = false,
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}: DezoButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-dezo-md transition-all duration-200 select-none cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dezo-primary focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-[15px] px-6 py-3.5 gap-2 tracking-tight',
  };

  const variantStyles = {
    primary:
      'bg-dezo-ink hover:bg-dezo-secondary text-dezo-text-inverse border border-dezo-ink shadow-xs',
    secondary:
      'bg-dezo-surface hover:bg-dezo-surface-hover text-dezo-text-primary border border-dezo-border-strong shadow-xs',
    outline:
      'bg-transparent hover:bg-dezo-bg-warm text-dezo-text-primary border border-dezo-border-strong',
    ghost:
      'bg-transparent hover:bg-black/[0.04] text-dezo-text-secondary hover:text-dezo-text-primary',
  };

  const content = (
    <>
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </>
  );

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const buttonElement = href ? (
    <Link
      href={href}
      className={combinedClasses}
      aria-busy={isLoading ? 'true' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
    >
      {content}
    </Link>
  ) : (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading ? 'true' : undefined}
      {...props}
    >
      {content}
    </button>
  );

  if (magnetic) {
    return <DezoMagnetic>{buttonElement}</DezoMagnetic>;
  }

  return buttonElement;
}

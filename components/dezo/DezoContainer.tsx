import React from 'react';

interface DezoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export function DezoContainer({
  children,
  className = '',
  size = 'default',
  ...props
}: DezoContainerProps) {
  const maxWidths = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[90rem]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${maxWidths[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

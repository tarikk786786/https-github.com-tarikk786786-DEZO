import React from 'react';

interface DezoSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  spacing?: 'compact' | 'normal' | 'relaxed';
  borderTop?: boolean;
  borderBottom?: boolean;
}

export function DezoSection({
  children,
  id,
  className = '',
  spacing = 'normal',
  borderTop = false,
  borderBottom = false,
  ...props
}: DezoSectionProps) {
  const spacings = {
    compact: 'py-12 lg:py-16',
    normal: 'py-20 lg:py-32',
    relaxed: 'py-28 lg:py-40',
  };

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${spacings[spacing]} ${
        borderTop ? 'border-t border-dezo-border' : ''
      } ${borderBottom ? 'border-b border-dezo-border' : ''} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

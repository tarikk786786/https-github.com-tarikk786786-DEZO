'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { DezoPageTransition } from '@/lib/motion/MotionAdapter';

export function DezoPageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <DezoPageTransition routeKey={pathname}>{children}</DezoPageTransition>;
}

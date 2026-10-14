import React from 'react';
import { guaranteeDisclosure } from '@/content/promises';

export function GuaranteeDisclosure() {
  return (
    <div className="border-t border-dezo-border pt-8 mt-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-3">
        {guaranteeDisclosure.title}
      </p>
      <p className="text-sm text-dezo-text-secondary leading-relaxed max-w-3xl">
        {guaranteeDisclosure.body}
      </p>
    </div>
  );
}

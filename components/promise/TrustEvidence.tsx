import React from 'react';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { trustEvidenceModules } from '@/content/promises';

export function TrustEvidence() {
  return (
    <DezoSection spacing="compact" className="border-y border-dezo-border bg-dezo-surface">
      <DezoContainer size="wide">
        <DezoReveal>
          <p className="font-display text-2xl sm:text-3xl text-dezo-text-primary tracking-tight mb-8 max-w-xl">
            Every promise should have evidence.
          </p>
        </DezoReveal>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
          {trustEvidenceModules.map((mod) => (
            <li key={mod.label} className="border-t border-dezo-border py-4">
              {'href' in mod && mod.href ? (
                <Link
                  href={mod.href}
                  className="text-sm font-medium text-dezo-text-primary hover:text-dezo-primary transition-colors"
                >
                  {mod.label}
                </Link>
              ) : (
                <p className="text-sm font-medium text-dezo-text-primary">{mod.label}</p>
              )}
              {'note' in mod && mod.note && (
                <p className="text-xs text-dezo-text-muted mt-1">{mod.note}</p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-dezo-text-muted">
          Evidence is shared per engagement. We do not publish fabricated case metrics or reviews.
        </p>
      </DezoContainer>
    </DezoSection>
  );
}

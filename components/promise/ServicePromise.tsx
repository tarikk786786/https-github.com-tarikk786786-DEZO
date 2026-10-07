import React from 'react';
import { getServicePromise } from '@/content/service-promises';
import { dezoStandardBadges } from '@/content/standards';

export function ServicePromiseBlock({ slug }: { slug: string }) {
  const promise = getServicePromise(slug);
  if (!promise) return null;

  return (
    <section className="mt-12 pt-10 border-t border-dezo-border">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
        Service promise
      </p>
      <h2 className="font-display text-2xl sm:text-3xl text-dezo-text-primary tracking-tight mb-3">
        {promise.statement}
      </h2>
      <p className="text-sm text-dezo-text-secondary leading-relaxed max-w-2xl mb-8">
        {promise.detail}
      </p>
      <DezoStandardBadges />
    </section>
  );
}

export function DezoStandardBadges() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-4">
        DEZO Standard
      </p>
      <ul className="flex flex-col gap-2">
        {dezoStandardBadges.map((badge) => (
          <li
            key={badge}
            className="text-sm text-dezo-text-primary flex items-center gap-2 border-t border-dezo-border pt-2"
          >
            <span className="text-dezo-primary shrink-0" aria-hidden>
              ·
            </span>
            {badge}
          </li>
        ))}
      </ul>
    </div>
  );
}

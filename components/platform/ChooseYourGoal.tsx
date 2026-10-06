'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { chooseGoals } from '@/content/site';
import { DezoButton } from '@/components/dezo/DezoButton';

export function ChooseYourGoal() {
  const [active, setActive] = useState<(typeof chooseGoals)[number]['id']>(
    chooseGoals[0].id
  );
  const selected = chooseGoals.find((g) => g.id === active) || chooseGoals[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-5 flex flex-col gap-2">
        {chooseGoals.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActive(g.id)}
            className={`text-left px-5 py-4 rounded-dezo-md border transition-all ${
              active === g.id
                ? 'border-dezo-primary bg-dezo-accent-soft text-dezo-text-primary'
                : 'border-dezo-border bg-dezo-surface text-dezo-text-secondary hover:border-dezo-border-strong'
            }`}
          >
            <span className="font-display font-bold text-base sm:text-lg">{g.label}</span>
          </button>
        ))}
      </div>
      <div className="lg:col-span-7 p-8 sm:p-10 rounded-dezo-lg border border-dezo-border bg-dezo-surface flex flex-col justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-3">
          Recommended stack
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary mb-6 tracking-tight">
          {selected.label}
        </h3>
        <ul className="flex flex-wrap gap-2 mb-8">
          {selected.stack.map((s) => (
            <li
              key={s}
              className="px-3 py-1.5 rounded-dezo-pill border border-dezo-border text-sm text-dezo-text-secondary"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <DezoButton href={selected.href} size="md" icon={<ArrowRight size={16} />}>
            Explore stack
          </DezoButton>
          <Link
            href="/book-strategy-call"
            className="inline-flex items-center text-sm font-semibold text-dezo-text-secondary hover:text-dezo-primary transition-colors"
          >
            Book strategy call
          </Link>
        </div>
      </div>
    </div>
  );
}

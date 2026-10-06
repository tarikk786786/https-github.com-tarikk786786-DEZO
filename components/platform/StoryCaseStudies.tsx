'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { featuredCaseStudies } from '@/content/site';
import { DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';

export function StoryCaseStudies() {
  const [active, setActive] = useState(0);
  const study = featuredCaseStudies[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 flex flex-col gap-2">
        {featuredCaseStudies.map((s, i) => (
          <button
            key={s.url}
            type="button"
            onClick={() => setActive(i)}
            className={`text-left px-4 py-3.5 rounded-dezo-md border transition-colors ${
              active === i
                ? 'border-dezo-primary bg-dezo-accent-soft'
                : 'border-dezo-border hover:border-dezo-border-strong'
            }`}
          >
            <p className="font-display font-bold text-dezo-text-primary">{s.title}</p>
            <p className="text-xs text-dezo-text-muted mt-0.5">
              {s.industry} · {s.location}
            </p>
          </button>
        ))}
      </div>

      <div className="lg:col-span-8 p-6 sm:p-10 rounded-dezo-lg border border-dezo-border bg-dezo-surface">
        <DezoStagger key={study.url} className="flex flex-col gap-6" stagger={0.06}>
          {(
            [
              ['Problem', study.problem],
              ['Strategy', study.strategy],
              ['Execution', study.execution],
              ['Result', study.result],
            ] as const
          ).map(([label, body]) => (
            <DezoStaggerItem key={label}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-1.5">
                  {label}
                </p>
                <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
                  {body}
                </p>
              </div>
            </DezoStaggerItem>
          ))}
        </DezoStagger>

        <div className="mt-8 pt-6 border-t border-dezo-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-wider px-2 py-1 border border-dezo-border text-dezo-text-muted rounded-dezo-sm"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary hover:underline"
          >
            Visit live site <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyCta() {
  return (
    <Link
      href="/work"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary hover:underline mt-8"
    >
      Browse live work archive <ArrowUpRight size={14} />
    </Link>
  );
}

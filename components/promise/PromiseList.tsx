'use client';

import React, { useId, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { PromiseItem } from '@/content/promises';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

function PromiseDetail({ item }: { item: PromiseItem }) {
  return (
    <div className="pt-4 pb-2 space-y-5 text-sm text-dezo-text-secondary leading-relaxed">
      <p>{item.description}</p>
      {item.included && item.included.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-2">
            Included
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {item.included.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-dezo-primary shrink-0">·</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.excludes && item.excludes.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-2">
            Not included
          </p>
          <ul className="space-y-1.5">
            {item.excludes.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-dezo-text-muted shrink-0">·</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.services && (
        <p className="text-xs text-dezo-text-muted">
          Applies to: {item.services.join(' · ')}
        </p>
      )}
      {item.metricsByService && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-2">
            Example metrics by service
          </p>
          <dl className="space-y-2">
            {Object.entries(item.metricsByService).map(([svc, metrics]) => (
              <div key={svc} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                <dt className="sm:col-span-3 font-mono text-[11px] uppercase tracking-wider text-dezo-text-primary">
                  {svc}
                </dt>
                <dd className="sm:col-span-9">{metrics.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {item.proof && (
        <p className="text-xs text-dezo-primary font-medium">{item.proof}</p>
      )}
    </div>
  );
}

export function PromiseList({ items }: { items: PromiseItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const baseId = useId();
  const reduced = useReducedMotion();

  return (
    <div>
      {/* Desktop editorial list */}
      <div className="hidden lg:block divide-y divide-dezo-border border-y border-dezo-border">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              id={`${baseId}-${item.id}`}
              aria-expanded={active}
              aria-controls={`${baseId}-panel-${item.id}`}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={`w-full text-left grid grid-cols-12 gap-6 py-7 px-2 -mx-2 transition-[padding,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dezo-primary ${
                active ? 'bg-dezo-bg/70 py-9' : 'hover:bg-dezo-bg/40'
              }`}
            >
              <span className="col-span-1 font-mono text-xs text-dezo-text-muted pt-1">
                {item.number}
              </span>
              <div className="col-span-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className={`font-display tracking-tight text-dezo-text-primary transition-[font-size] duration-300 ${
                        active ? 'text-3xl' : 'text-2xl'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-dezo-text-secondary">
                      {item.statement}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`mt-2 shrink-0 text-dezo-text-muted transition-transform duration-300 ${
                      active && !reduced ? 'translate-x-1 text-dezo-primary' : ''
                    }`}
                    aria-hidden
                  />
                </div>
                <div
                  id={`${baseId}-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`${baseId}-${item.id}`}
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    active ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {active && <PromiseDetail item={item} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile accordion */}
      <div className="lg:hidden divide-y divide-dezo-border border-y border-dezo-border">
        {items.map((item) => {
          const open = openMobile === item.id;
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${baseId}-m-${item.id}`}
                onClick={() => setOpenMobile(open ? null : item.id)}
                className="w-full text-left py-5 flex gap-4 items-start"
              >
                <span className="font-mono text-xs text-dezo-text-muted pt-1 shrink-0">
                  {item.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-dezo-text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-dezo-text-secondary">{item.statement}</p>
                </div>
                <ChevronDown
                  size={18}
                  className={`mt-1 shrink-0 text-dezo-text-muted transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
              {open && (
                <div id={`${baseId}-m-${item.id}`} className="pb-5 pl-10">
                  <PromiseDetail item={item} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

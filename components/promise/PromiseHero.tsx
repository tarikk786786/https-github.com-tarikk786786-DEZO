import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { promiseHero } from '@/content/promises';

export function PromiseHero() {
  return (
    <section className="relative min-h-[88svh] flex flex-col justify-end pt-28 pb-16 sm:pb-24 overflow-hidden border-b border-dezo-border">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 90% 10%, rgba(176,141,87,0.07), transparent 55%), linear-gradient(180deg, #F5F3EE 0%, #EFECE5 100%)',
        }}
      />
      <DezoContainer size="wide" className="relative z-10">
        <DezoReveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-6">
            {promiseHero.badge}
          </p>
        </DezoReveal>
        <DezoReveal delay={0.05}>
          <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-[4.5rem] tracking-tightest leading-[1.05] text-dezo-text-primary max-w-4xl">
            {promiseHero.title}
            <br />
            {promiseHero.titleLine2}
          </h1>
        </DezoReveal>
        <DezoReveal delay={0.1}>
          <p className="mt-7 text-lg sm:text-xl text-dezo-text-secondary leading-relaxed max-w-2xl">
            {promiseHero.supporting}
          </p>
        </DezoReveal>
        <DezoReveal delay={0.14}>
          <ul className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2">
            {promiseHero.pillars.map((line) => (
              <li
                key={line}
                className="font-display text-xl sm:text-2xl text-dezo-text-primary tracking-tight"
              >
                {line}
              </li>
            ))}
          </ul>
        </DezoReveal>
        <DezoReveal delay={0.18}>
          <div className="mt-12 flex flex-wrap gap-3">
            <DezoButton
              href={promiseHero.primaryCta.href}
              size="lg"
              icon={<ArrowUpRight size={16} />}
            >
              {promiseHero.primaryCta.label}
            </DezoButton>
            <DezoButton href={promiseHero.secondaryCta.href} variant="outline" size="lg">
              {promiseHero.secondaryCta.label}
            </DezoButton>
          </div>
        </DezoReveal>
      </DezoContainer>
    </section>
  );
}

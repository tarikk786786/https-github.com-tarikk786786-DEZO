'use client';

import React from 'react';

import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoHeroMotion, DezoReveal } from '@/lib/motion/MotionAdapter';

export function PlatformPageScaffold({
  badge,
  title,
  subtitle,
  children,
  ctaHref = '/contact',
  ctaLabel = "Let's Talk",
}: {
  badge: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <DezoHeroMotion>
            <div className="max-w-3xl mb-10">
              <p
                data-hero-item
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dezo-primary mb-4"
              >
                {badge}
              </p>
              <h1
                data-hero-item
                className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.08] text-dezo-text-primary mb-5"
              >
                {title}
              </h1>
              <p
                data-hero-item
                className="text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-xl"
              >
                {subtitle}
              </p>
            </div>
          </DezoHeroMotion>
          <div className="dezo-section-rule mb-12" />
          <DezoReveal>{children}</DezoReveal>
          <DezoReveal delay={0.08}>
            <div className="mt-14 flex flex-wrap gap-3">
              <DezoButton href={ctaHref} size="lg">
                {ctaLabel}
              </DezoButton>
              <DezoButton href="/start-a-project" variant="outline" size="lg">
                Start a Project
              </DezoButton>
            </div>
          </DezoReveal>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

export function ScaffoldLinkList({
  items,
}: {
  items: Array<{ href: string; name: string; summary?: string }>;
}) {
  return (
    <ul className="divide-y divide-dezo-border border-y border-dezo-border">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="flex flex-col sm:flex-row sm:items-center gap-2 py-5 hover:text-dezo-primary transition-colors"
          >
            <span className="font-display text-lg text-dezo-text-primary sm:w-52 shrink-0">
              {item.name}
            </span>
            {item.summary && (
              <span className="text-sm text-dezo-text-secondary">{item.summary}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

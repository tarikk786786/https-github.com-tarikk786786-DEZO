'use client';

import React from 'react';
import Link from 'next/link';
import { workPreviewMap } from '@/content/work-previews';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoReveal, DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';

const MOSAIC_HOSTS = [
  'yasanabeautyrituals.in',
  'sonvicasarees.com',
  'shreeayurved.com',
  'nilkanthpaints.com',
  'thepaanluxe.com',
  'greatindiapublicschool.org',
] as const;

/** Asymmetric proof mosaic — real work previews only */
export function ProjectMosaic({
  title = 'Selected live surfaces',
  href = '/work',
}: {
  title?: string;
  href?: string;
}) {
  const items = MOSAIC_HOSTS.map((host) => ({
    host,
    src: workPreviewMap[host],
  })).filter((i) => i.src);

  return (
    <section className="border-y border-dezo-border bg-dezo-bg-warm py-16 sm:py-20">
      <DezoContainer size="wide">
        <DezoReveal>
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-dezo-text-primary">
              {title}
            </h2>
            <Link
              href={href}
              className="text-sm font-medium text-dezo-text-secondary hover:text-dezo-primary border-b border-transparent hover:border-dezo-primary transition-colors"
            >
              View work →
            </Link>
          </div>
        </DezoReveal>
        <DezoStagger className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4" stagger={0.05}>
          {items.map((item, i) => (
            <DezoStaggerItem
              key={item.host}
              className={i === 0 ? 'col-span-2 md:col-span-2 md:row-span-2' : ''}
            >
              <a
                href={`https://${item.host}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden border border-dezo-border bg-dezo-bg aspect-[16/10] md:aspect-auto md:h-full min-h-[140px] sm:min-h-[180px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.host}
                  className="absolute inset-0 h-full w-full object-cover object-top dezo-img-zoom"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-dezo-ink/70 to-transparent">
                  <span className="font-mono text-[10px] sm:text-xs text-white/85">{item.host}</span>
                </span>
              </a>
            </DezoStaggerItem>
          ))}
        </DezoStagger>
      </DezoContainer>
    </section>
  );
}

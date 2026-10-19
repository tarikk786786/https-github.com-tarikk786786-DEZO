'use client';

import React, { useState } from 'react';
import { previewPathForUrl } from '@/content/work-previews';

export function cleanHost(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function LiveSitePreview({
  url,
  title,
  className = '',
  eager = false,
}: {
  url: string;
  title: string;
  className?: string;
  width?: number;
  eager?: boolean;
}) {
  const local = previewPathForUrl(url);
  const [failed, setFailed] = useState(!local);
  const host = cleanHost(url);

  if (failed || !local) {
    return (
      <div
        className={`flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-dezo-bg-warm via-[#FAF8F5] to-dezo-bg p-6 text-center select-none ${className}`}
        style={{ minHeight: '100%' }}
      >
        <div className="absolute inset-0 opacity-[0.03] dezo-hero-grain pointer-events-none" />
        <div className="w-10 h-10 rounded-full bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center mb-3">
          <span className="font-display text-sm font-bold text-dezo-primary">D</span>
        </div>
        <p className="font-display text-base sm:text-lg font-bold text-dezo-text-primary mb-1 line-clamp-1">
          {title}
        </p>
        <p className="font-mono text-[11px] text-dezo-primary tracking-wide truncate max-w-[85%]">{host}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dezo-surface border border-dezo-border text-[10px] font-mono text-dezo-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Production Verified</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={local}
      alt={`${title} live website preview`}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

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
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-dezo-bg-warm via-white to-dezo-accent-soft/50 px-6 text-center ${className}`}
        style={{ minHeight: '100%' }}
      >
        <p className="font-display text-lg sm:text-xl font-bold text-dezo-text-primary mb-1">
          {title}
        </p>
        <p className="font-mono text-xs text-dezo-primary">{host}</p>
        <p className="text-[11px] text-dezo-text-muted mt-3">Live production site</p>
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

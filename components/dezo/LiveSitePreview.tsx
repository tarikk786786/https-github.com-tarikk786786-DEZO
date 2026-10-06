'use client';

import React, { useState } from 'react';

/** Free public screenshot proxy used by many portfolios (WordPress mShots). */
export function livePreviewSrc(url: string, width = 1200) {
  const encoded = encodeURIComponent(url);
  return `https://s0.wp.com/mshots/v1/${encoded}?w=${width}`;
}

export function cleanHost(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function LiveSitePreview({
  url,
  title,
  className = '',
  width = 1200,
  eager = false,
}: {
  url: string;
  title: string;
  className?: string;
  width?: number;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const host = cleanHost(url);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-dezo-bg-warm via-white to-dezo-accent-soft/40 ${className}`}
      >
        <p className="font-display text-lg sm:text-xl font-bold text-dezo-text-primary mb-1">
          {title}
        </p>
        <p className="font-mono text-xs text-dezo-primary">{host}</p>
        <p className="text-[11px] text-dezo-text-muted mt-3">Live site · open to view</p>
      </div>
    );
  }

  return (
    <img
      src={livePreviewSrc(url, width)}
      alt={`${title} live website preview`}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

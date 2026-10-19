'use client';

import React, { useState } from 'react';
import { previewPathForUrl } from '@/content/work-previews';

export function cleanHost(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

/**
 * Returns a fallback live-capture screenshot URL from thum.io.
 * Generates an on-the-fly snapshot for sites without local pre-rendered stills.
 */
export function dynamicPreviewUrl(url: string, width = 900, height = 600) {
  try {
    const clean = url.startsWith('http') ? url : `https://${url}`;
    return `https://image.thum.io/get/width/${width}/crop/${height}/${clean}`;
  } catch {
    return null;
  }
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
  const host = cleanHost(url);

  // Try local first; if not in local registry, try thum.io dynamic screenshot
  const initialSrc = local || dynamicPreviewUrl(url);
  const [currentSrc, setCurrentSrc] = useState<string | null>(initialSrc);
  const [triedFallback, setTriedFallback] = useState(false);
  const [failed, setFailed] = useState(!initialSrc);

  const handleError = () => {
    // If local image failed, try dynamic thum.io preview
    if (!triedFallback && local) {
      setTriedFallback(true);
      setCurrentSrc(dynamicPreviewUrl(url));
    } else {
      // Both failed or no image available -> display Brutalist fallback card
      setFailed(true);
    }
  };

  if (failed || !currentSrc) {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
    return (
      <div
        className={`flex flex-col items-center justify-center relative overflow-hidden bg-dezo-bg-warm p-6 text-center select-none border-2 border-dezo-ink/10 ${className}`}
        style={{ minHeight: '100%' }}
      >
        <div className="w-12 h-12 rounded-none bg-white border-2 border-dezo-ink flex items-center justify-center mb-3 shadow-[2px_2px_0_0_#B08D57] p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={faviconUrl}
            alt=""
            className="w-7 h-7 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <p className="font-display text-base sm:text-lg font-black text-dezo-text-primary mb-1 line-clamp-1">
          {title}
        </p>
        <p className="font-mono text-xs font-bold text-dezo-ink tracking-wider truncate max-w-[85%]">{host}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-dezo-ink text-white font-mono text-[9px] uppercase tracking-widest border border-white/20 shadow-[2px_2px_0_0_#B08D57]">
          <span className="w-1.5 h-1.5 bg-dezo-primary animate-pulse" />
          <span>PRODUCTION VERIFIED</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={`${title} live website preview`}
      loading={eager ? 'eager' : 'lazy'}
      onError={handleError}
      className={className}
    />
  );
}

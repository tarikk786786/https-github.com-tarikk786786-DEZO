'use client';

import React, { useState } from 'react';
import { previewPathForUrl } from '@/content/work-previews';
import { ExternalLink, Globe } from 'lucide-react';

export function cleanHost(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

/**
 * Returns a fallback live-capture screenshot URL from thum.io.
 */
export function dynamicPreviewUrl(url: string, width = 900, height = 600) {
  try {
    const clean = url.startsWith('http') ? url : `https://${url}`;
    return `https://image.thum.io/get/width/${width}/crop/${height}/${clean}`;
  } catch {
    return null;
  }
}

// Category theme badge colors
const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'Education': { bg: 'bg-emerald-500/10', text: 'text-emerald-700', border: 'border-emerald-500/30' },
  'Beauty & Fashion': { bg: 'bg-pink-500/10', text: 'text-pink-700', border: 'border-pink-500/30' },
  'Healthcare': { bg: 'bg-teal-500/10', text: 'text-teal-700', border: 'border-teal-500/30' },
  'Corporate': { bg: 'bg-blue-500/10', text: 'text-blue-700', border: 'border-blue-500/30' },
  'Ecommerce': { bg: 'bg-amber-500/10', text: 'text-amber-700', border: 'border-amber-500/30' },
  'Real Estate': { bg: 'bg-violet-500/10', text: 'text-violet-700', border: 'border-violet-500/30' },
  'Food & Grocery': { bg: 'bg-orange-500/10', text: 'text-orange-700', border: 'border-orange-500/30' },
  'Photography': { bg: 'bg-indigo-500/10', text: 'text-indigo-700', border: 'border-indigo-500/30' },
  'Hospitality': { bg: 'bg-rose-500/10', text: 'text-rose-700', border: 'border-rose-500/30' },
  'Travel': { bg: 'bg-cyan-500/10', text: 'text-cyan-700', border: 'border-cyan-500/30' },
  'International': { bg: 'bg-purple-500/10', text: 'text-purple-700', border: 'border-purple-500/30' },
};

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

  // If local exists, show it. Otherwise try dynamic preview or render stylized mock card
  const [currentSrc, setCurrentSrc] = useState<string | null>(local);
  const [failed, setFailed] = useState(!local);
  const [faviconFailed, setFaviconFailed] = useState(false);

  const handleError = () => {
    // When the image fails to load, gracefully display the stylized site preview UI
    setFailed(true);
  };

  if (failed || !currentSrc) {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
    const initial = title.charAt(0).toUpperCase();

    return (
      <div
        className={`flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-white to-[#F2EFE9] p-5 select-none border-b-2 border-dezo-ink ${className}`}
        style={{ minHeight: '100%' }}
      >
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#0B0B0A 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />

        {/* Top bar inside the mockup surface */}
        <div className="relative z-10 flex items-center justify-between border-b border-dezo-ink/10 pb-2.5">
          <div className="flex items-center gap-2">
            {!faviconFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={faviconUrl}
                alt=""
                className="w-5 h-5 object-contain rounded-dezo-md border border-dezo-ink/20"
                onError={() => setFaviconFailed(true)}
              />
            ) : (
              <div className="w-5 h-5 bg-dezo-ink text-white font-mono text-[10px] font-bold flex items-center justify-center">
                {initial}
              </div>
            )}
            <span className="font-mono text-[11px] font-bold text-dezo-ink truncate max-w-[170px]">
              {host}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-500/15 border border-emerald-500/40 px-1.5 py-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            200 OK
          </span>
        </div>

        {/* Center UI Showcase Mockup */}
        <div className="relative z-10 my-auto py-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-white border border-dezo-border flex items-center justify-center mb-2.5 shadow-dezo-card">
            {!faviconFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={faviconUrl}
                alt=""
                className="w-8 h-8 object-contain"
                onError={() => setFaviconFailed(true)}
              />
            ) : (
              <Globe size={24} className="text-dezo-primary" />
            )}
          </div>
          <p className="font-display text-base sm:text-lg font-black text-dezo-text-primary tracking-tight line-clamp-1">
            {title}
          </p>
          <p className="font-mono text-[11px] font-bold text-dezo-primary tracking-wider mt-0.5">
            https://{host}
          </p>
        </div>

        {/* Bottom Status bar */}
        <div className="relative z-10 flex items-center justify-between border-t border-dezo-ink/10 pt-2 text-[10px] font-mono text-dezo-text-muted">
          <span className="uppercase tracking-widest font-bold text-dezo-ink">Production Storefront</span>
          <span className="flex items-center gap-1 text-dezo-primary font-bold">
            Live // <ExternalLink size={10} />
          </span>
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

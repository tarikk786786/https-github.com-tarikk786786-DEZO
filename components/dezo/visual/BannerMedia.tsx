'use client';

import React from 'react';
import type { BannerMedia as BannerMediaType } from '@/content/banners';
import { LiveSitePreview } from '@/components/dezo/LiveSitePreview';
import { workPreviewMap } from '@/content/work-previews';

function previewUrlForHost(host: string): string | null {
  const key = host.replace(/^www\./, '');
  return workPreviewMap[key] || null;
}

export function BannerMedia({
  media,
  className = '',
  priority = false,
}: {
  media?: BannerMediaType;
  className?: string;
  priority?: boolean;
}) {
  if (!media || media.kind === 'none') return null;

  if (media.kind === 'work-preview') {
    const local = previewUrlForHost(media.host);
    const url = `https://${media.host.replace(/^www\./, '')}/`;
    if (local) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={local}
          alt={`Live site preview — ${media.host}`}
          className={`absolute inset-0 h-full w-full object-cover ${className}`}
          style={{ objectPosition: media.objectPosition || 'top' }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      );
    }
    return (
      <LiveSitePreview
        url={url}
        title={media.host}
        eager={priority}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  if (media.kind === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={media.alt}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: media.objectPosition || 'center' }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }

  if (media.kind === 'video') {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        poster={media.poster}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-label={media.alt}
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return null;
}

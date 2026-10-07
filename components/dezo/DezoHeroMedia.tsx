'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

const POSTER = '/hero/dezo-hero-poster.jpg';
const LOOP = '/hero/dezo-hero-loop.mp4';

/**
 * Full-bleed cinematic hero plane — muted autoplay loop with still poster fallback.
 * No badges/overlays on the media itself; parent supplies brand copy + scrim.
 *
 * LICENSE HOLD: `/public/hero/dezo-hero-*` are unverified stock/generative — do not
 * mount this on production surfaces until `docs/media-license-ledger.md` marks APPROVED.
 * Homepage uses real LiveSitePreview proof instead.
 */
export function DezoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const tryPlay = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        await video.play();
        if (!cancelled) setUseVideo(true);
      } catch {
        if (!cancelled) setUseVideo(false);
      }
    };

    if (video.readyState >= 2) {
      void tryPlay();
    } else {
      const onReady = () => void tryPlay();
      video.addEventListener('canplay', onReady, { once: true });
      return () => {
        cancelled = true;
        video.removeEventListener('canplay', onReady);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Still poster — always present as paint + fallback */}
      <img
        src={POSTER}
        alt=""
        width={1280}
        height={720}
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
          useVideo ? 'opacity-0' : 'opacity-100 dezo-hero-kenburns'
        }`}
      />

      {!reduced && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            useVideo ? 'opacity-100' : 'opacity-0'
          }`}
          poster={POSTER}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          aria-hidden
          tabIndex={-1}
        >
          <source src={LOOP} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

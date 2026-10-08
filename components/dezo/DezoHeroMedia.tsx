'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

/** Cache-bust so apex + www edges pick up the showcase reel */
const ASSET_V = 'v6';
const POSTER = `/hero/dezo-hero-poster.jpg?${ASSET_V}`;
const POSTER_MOBILE = `/hero/dezo-hero-poster-mobile.jpg?${ASSET_V}`;
const LOOP_WEBM = `/hero/dezo-hero-loop.webm?${ASSET_V}`;
const LOOP_MP4 = `/hero/dezo-hero-loop.mp4?${ASSET_V}`;
const LOOP_MOBILE = `/hero/dezo-hero-loop-mobile.mp4?${ASSET_V}`;

/**
 * Full-bleed site-showcase hero plane.
 * Desktop: landscape WebM/MP4. Mobile: portrait 9:16 encode framed for the
 * stacked cinema stage (sharp product + chapter plates, no cream wash).
 */
export function DezoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [useVideo, setUseVideo] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

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
  }, [reduced, isNarrow]);

  const poster = isNarrow ? POSTER_MOBILE : POSTER;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        width={isNarrow ? 1080 : 1920}
        height={isNarrow ? 1920 : 1080}
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isNarrow ? 'object-[center_35%]' : 'object-center'
        } ${useVideo ? 'opacity-0' : 'opacity-100'}`}
      />

      {!reduced && (
        <video
          ref={videoRef}
          key={isNarrow ? 'mobile' : 'desktop'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isNarrow ? 'object-[center_35%]' : 'object-center'
          } ${useVideo ? 'opacity-100' : 'opacity-0'}`}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          preload={isNarrow ? 'metadata' : 'auto'}
          aria-hidden
          tabIndex={-1}
        >
          {!isNarrow && <source src={LOOP_WEBM} type="video/webm" />}
          <source src={isNarrow ? LOOP_MOBILE : LOOP_MP4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import {
  HERO_REEL_DURATION,
  useHeroShowcase,
} from '@/components/dezo/HeroShowcaseContext';

/** Cache-bust so apex + www edges pick up the showcase reel */
const ASSET_V = 'v7';
const POSTER = `/hero/dezo-hero-poster.jpg?${ASSET_V}`;
const POSTER_MOBILE = `/hero/dezo-hero-poster-mobile.jpg?${ASSET_V}`;
const LOOP_WEBM = `/hero/dezo-hero-loop.webm?${ASSET_V}`;
const LOOP_MP4 = `/hero/dezo-hero-loop.mp4?${ASSET_V}`;
const LOOP_MOBILE = `/hero/dezo-hero-loop-mobile.mp4?${ASSET_V}`;

/**
 * Full-bleed site-showcase hero plane (marketing trailer).
 * Desktop: landscape WebM/MP4. Mobile: portrait 9:16 encode framed for the
 * stacked cinema stage. Reports playback time so the chapter ticker stays synced.
 */
export function DezoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { reportVideo, setNarrow, isNarrow } = useHeroShowcase();
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [setNarrow]);

  useEffect(() => {
    if (reduced) {
      reportVideo(0, isNarrow ? HERO_REEL_DURATION.mobile : HERO_REEL_DURATION.desktop, false);
      return;
    }

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

    const onReady = () => void tryPlay();
    if (video.readyState >= 2) {
      void tryPlay();
    } else {
      video.addEventListener('canplay', onReady, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener('canplay', onReady);
    };
  }, [reduced, isNarrow, reportVideo]);

  // Live sync when the marketing reel is playing
  useEffect(() => {
    if (reduced || !useVideo) return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let cancelled = false;

    const publish = () => {
      if (cancelled) return;
      const duration =
        Number.isFinite(video.duration) && video.duration > 0.5
          ? video.duration
          : isNarrow
            ? HERO_REEL_DURATION.mobile
            : HERO_REEL_DURATION.desktop;
      reportVideo(video.currentTime || 0, duration, !video.paused && !video.ended);
      raf = window.requestAnimationFrame(publish);
    };

    raf = window.requestAnimationFrame(publish);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [reduced, useVideo, isNarrow, reportVideo]);

  // Interval fallback when video cannot play — keep marketing ticker alive
  useEffect(() => {
    if (reduced || useVideo) return;
    const duration = isNarrow ? HERO_REEL_DURATION.mobile : HERO_REEL_DURATION.desktop;
    const started = performance.now();
    const id = window.setInterval(() => {
      const elapsed = ((performance.now() - started) / 1000) % duration;
      reportVideo(elapsed, duration, false);
    }, 100);
    return () => window.clearInterval(id);
  }, [reduced, useVideo, isNarrow, reportVideo]);

  const poster = isNarrow ? POSTER_MOBILE : POSTER;

  return (
    <div
      className="absolute inset-0 overflow-hidden dezo-hero-media-stage"
      aria-hidden
      data-hero-media
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        width={isNarrow ? 1080 : 1920}
        height={isNarrow ? 1920 : 1080}
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isNarrow ? 'object-[center_35%]' : 'object-center'
        } ${useVideo ? 'opacity-0' : 'opacity-100'} ${
          !useVideo && !reduced ? 'dezo-hero-kenburns' : ''
        }`}
      />

      {!reduced && (
        <video
          ref={videoRef}
          key={isNarrow ? 'mobile' : 'desktop'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
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

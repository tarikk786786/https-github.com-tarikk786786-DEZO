'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

/** Cache-bust so apex + www edges pick up the showcase reel */
const ASSET_V = 'v9';
const POSTER = `/hero/dezo-hero-poster.jpg?${ASSET_V}`;
const POSTER_MOBILE = `/hero/dezo-hero-poster-mobile.jpg?${ASSET_V}`;
const LOOP_WEBM = `/hero/dezo-hero-loop.webm?${ASSET_V}`;
const LOOP_MP4 = `/hero/dezo-hero-loop.mp4?${ASSET_V}`;
const LOOP_MOBILE = `/hero/dezo-hero-loop-mobile.mp4?${ASSET_V}`;

/**
 * Full-bleed cinema plane — hard shoot-in zoom settle + live reel.
 */
export function DezoHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

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
  }, [reduced, isNarrow]);

  const poster = isNarrow ? POSTER_MOBILE : POSTER;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden dezo-hero-media-stage"
      aria-hidden
      data-hero-media
      initial={reduced ? false : { scale: 1.48, opacity: 0.15, filter: 'blur(10px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        width={isNarrow ? 1080 : 1920}
        height={isNarrow ? 1920 : 1080}
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover ${
          isNarrow ? 'object-[center_30%]' : 'object-center'
        } ${useVideo ? 'opacity-0' : 'opacity-100'} ${
          !useVideo && !reduced ? 'dezo-hero-kenburns' : ''
        } transition-opacity duration-700`}
      />

      {!reduced && (
        <video
          ref={videoRef}
          key={isNarrow ? 'mobile' : 'desktop'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isNarrow ? 'object-[center_30%]' : 'object-center'
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

      {/* Shoot flash — one-shot cinema open */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-white"
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}

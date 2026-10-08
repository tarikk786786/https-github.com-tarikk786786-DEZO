'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Marketing site-trailer chapters — mapped to the showcase reel plates.
 * Prospect-facing hints (outcomes), not internal jargon.
 */
export const HERO_SITE_CHAPTERS = [
  {
    id: 'build',
    label: 'Build',
    hint: 'Websites & commerce that convert',
    href: '/services/web-development',
  },
  {
    id: 'market',
    label: 'Market',
    hint: 'Amazon, Flipkart & storefronts',
    href: '/services/amazon',
  },
  {
    id: 'grow',
    label: 'Grow',
    hint: 'SEO, ads & measurement',
    href: '/services/seo',
  },
  {
    id: 'work',
    label: 'Work',
    hint: 'Live proof, not mockups',
    href: '/work',
  },
  {
    id: 'engine',
    label: 'Engine',
    hint: 'One connected growth system',
    href: '/#engine',
  },
  {
    id: 'lab',
    label: 'Lab',
    hint: 'Free diagnostics for your site',
    href: '/growth-lab',
  },
  {
    id: 'standard',
    label: 'Standard',
    hint: 'Guarantees we control',
    href: '/promise',
  },
  {
    id: 'studio',
    label: 'Studio',
    hint: 'Bhubaneswar · deliver India-wide',
    href: '/locations/bhubaneswar',
  },
] as const;

export type HeroChapter = (typeof HERO_SITE_CHAPTERS)[number];

/** Known reel lengths (seconds) — used for interval fallback when video is blocked. */
export const HERO_REEL_DURATION = {
  desktop: 12.5,
  mobile: 10.4,
} as const;

type HeroShowcaseValue = {
  chapterIndex: number;
  /** 0–1 progress through the current loop */
  loopProgress: number;
  isPlaying: boolean;
  isNarrow: boolean;
  chapterCount: number;
  reportVideo: (currentTime: number, duration: number, playing: boolean) => void;
  setNarrow: (narrow: boolean) => void;
};

const HeroShowcaseContext = createContext<HeroShowcaseValue | null>(null);

export function HeroShowcaseProvider({ children }: { children: React.ReactNode }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [loopProgress, setLoopProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const chapterCount = HERO_SITE_CHAPTERS.length;

  const reportVideo = useCallback(
    (currentTime: number, duration: number, playing: boolean) => {
      const safeDuration =
        duration > 0.5
          ? duration
          : isNarrow
            ? HERO_REEL_DURATION.mobile
            : HERO_REEL_DURATION.desktop;
      const progress = Math.min(1, Math.max(0, currentTime / safeDuration));
      const nextIndex = Math.min(
        chapterCount - 1,
        Math.floor(progress * chapterCount)
      );
      setLoopProgress(progress);
      setChapterIndex(nextIndex);
      setIsPlaying(playing);
    },
    [chapterCount, isNarrow]
  );

  const value = useMemo(
    () => ({
      chapterIndex,
      loopProgress,
      isPlaying,
      isNarrow,
      chapterCount,
      reportVideo,
      setNarrow: setIsNarrow,
    }),
    [chapterIndex, loopProgress, isPlaying, isNarrow, chapterCount, reportVideo]
  );

  return (
    <HeroShowcaseContext.Provider value={value}>{children}</HeroShowcaseContext.Provider>
  );
}

export function useHeroShowcase() {
  const ctx = useContext(HeroShowcaseContext);
  if (!ctx) {
    throw new Error('useHeroShowcase must be used within HeroShowcaseProvider');
  }
  return ctx;
}

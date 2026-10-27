'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoMagnetic } from '@/lib/motion/MotionAdapter';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';
import { heroBanner, heroBrief, type HeroBriefItem } from '@/content/banners';
import { influencerPositioning } from '@/content/influencer';
import { brand } from '@/content/site';

const ASSET_V = 'v9';
const POSTER = `/hero/dezo-hero-poster.jpg?${ASSET_V}`;
const LOOP_WEBM = `/hero/dezo-hero-loop.webm?${ASSET_V}`;
const LOOP_MP4 = `/hero/dezo-hero-loop.mp4?${ASSET_V}`;
const CYCLE_MS = 4200;

const ease = [0.22, 1, 0.36, 1] as const;

export function DezoHomeHero() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const current = heroBrief[active] ?? heroBrief[0];

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % heroBrief.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

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
      video.addEventListener('canplay', onReady, { once: true });
    }

    function onReady() {
      void tryPlay();
    }

    return () => {
      cancelled = true;
      video.removeEventListener('canplay', onReady);
    };
  }, [reduced]);

  return (
    <section className="relative border-b border-dezo-border bg-dezo-bg pt-28 sm:pt-32 pb-14 sm:pb-20">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dezo-primary"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              {heroBanner.eyebrow}
            </motion.p>

            <div className="mt-4 overflow-hidden">
              <motion.p
                className="font-display text-5xl leading-none tracking-tight text-dezo-ink sm:text-6xl"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {brand.name}
              </motion.p>
            </div>

            <motion.div
              className="mt-5 h-[2px] origin-left bg-dezo-primary"
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              style={{ width: '7.5rem' }}
            />

            <h1 className="mt-5 font-display text-[2rem] leading-[1.05] tracking-tight text-dezo-ink sm:text-5xl">
              {heroBanner.title}
            </h1>

            <motion.p
              className="mt-4 max-w-xl text-base leading-relaxed text-dezo-text-secondary sm:text-lg"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              {heroBanner.body}
            </motion.p>

            <div
              className="mt-8 border border-dezo-border bg-white"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
              }}
            >
              {heroBrief.map((item, index) => (
                <BriefRow
                  key={item.id}
                  item={item}
                  index={index}
                  active={index === active}
                  reduced={reduced}
                  onSelect={() => setActive(index)}
                />
              ))}
            </div>

            <motion.div
              className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              <DezoMagnetic>
                <DezoButton
                  href={heroBanner.primaryCta?.href ?? '/start-a-project'}
                  size="lg"
                  magnetic
                  className="w-full justify-center sm:w-auto"
                  icon={<ArrowUpRight size={16} />}
                >
                  {heroBanner.primaryCta?.label ?? 'Start a Project'}
                </DezoButton>
              </DezoMagnetic>
              <DezoMagnetic strength={0.14}>
                <DezoButton
                  href={heroBanner.secondaryCta?.href ?? '/work'}
                  variant="outline"
                  size="lg"
                  magnetic
                  className="w-full justify-center sm:w-auto"
                >
                  {heroBanner.secondaryCta?.label ?? 'View Our Work'}
                </DezoButton>
              </DezoMagnetic>
            </motion.div>

            <p className="mt-5 text-sm text-dezo-text-secondary">
              <Link href="/work" className="font-medium text-dezo-ink underline decoration-dezo-primary underline-offset-4 hover:text-dezo-primary">
                {heroBanner.meta}
              </Link>
              <span className="mx-2 text-dezo-text-muted">·</span>
              <Link href={influencerPositioning.primaryBrandCta.href} className="hover:text-dezo-ink">
                {influencerPositioning.primaryBrandCta.label}
              </Link>
              <span className="mx-2 text-dezo-text-muted">·</span>
              <Link href={influencerPositioning.primaryCreatorCta.href} className="hover:text-dezo-ink">
                {influencerPositioning.primaryCreatorCta.label}
              </Link>
            </p>
          </div>

          <motion.div
            className="lg:col-span-6"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <figure className="border border-dezo-ink bg-dezo-ink">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={POSTER}
                  alt={
                    heroBanner.media?.kind === 'video' ? heroBanner.media.alt : 'DEZO studio work'
                  }
                  width={1920}
                  height={1080}
                  decoding="async"
                  fetchPriority="high"
                  className={`absolute inset-0 h-full w-full object-cover object-center ${
                    useVideo ? 'opacity-0' : 'opacity-100'
                  } ${!useVideo && !reduced ? 'dezo-hero-kenburns' : ''} transition-opacity duration-700`}
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
                    <source src={LOOP_WEBM} type="video/webm" />
                    <source src={LOOP_MP4} type="video/mp4" />
                  </video>
                )}
              </div>
              <figcaption className="flex items-start justify-between gap-4 border-t border-white/15 px-4 py-3 sm:px-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease }}
                  >
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-dezo-primary">
                      {current.label}
                    </p>
                    <p className="mt-1 text-sm text-white/85">{current.title}</p>
                  </motion.div>
                </AnimatePresence>
                <p className="shrink-0 font-mono text-[10px] tracking-widest text-white/50">
                  0{active + 1} / 0{heroBrief.length}
                </p>
              </figcaption>
            </figure>
            <p className="mt-3 text-[11px] tracking-wide text-dezo-text-muted">
              {brand.studioLine}
            </p>
          </motion.div>
        </div>
      </DezoContainer>
    </section>
  );
}

function BriefRow({
  item,
  index,
  active,
  reduced,
  onSelect,
}: {
  item: HeroBriefItem;
  index: number;
  active: boolean;
  reduced: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.28 + index * 0.08, ease }}
      className={`relative border-b border-dezo-border last:border-b-0 ${
        active ? 'bg-dezo-bg' : 'bg-white'
      }`}
    >
      <Link
        href={item.href}
        onMouseEnter={onSelect}
        onFocus={onSelect}
        className="grid grid-cols-[auto_1fr_auto] items-start gap-4 px-4 py-4 sm:px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-dezo-primary"
        aria-current={active ? 'true' : undefined}
      >
        <span className="pt-0.5 font-mono text-[11px] font-semibold tracking-[0.16em] text-dezo-primary">
          {item.label}
        </span>
        <span>
          <span className="block text-sm font-semibold text-dezo-ink sm:text-[15px]">{item.title}</span>
          <span className="mt-1 block text-sm leading-relaxed text-dezo-text-secondary">{item.detail}</span>
        </span>
        <ArrowUpRight size={16} className="mt-0.5 text-dezo-text-muted" aria-hidden />
      </Link>
      {active && !reduced && (
        <motion.span
          key={`${item.id}-progress`}
          className="pointer-events-none absolute bottom-0 left-0 block h-[2px] bg-dezo-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}

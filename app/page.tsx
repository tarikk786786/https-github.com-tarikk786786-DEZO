'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { LiveSitePreview } from '@/components/dezo/LiveSitePreview';
import { DezoReveal, DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';
import {
  brand,
  capabilityGroups,
  serviceRows,
  processSteps,
  industries,
  featuredCaseStudies,
  contact,
} from '@/content/site';
import { portfolioData } from '@/content/projects';

export default function HomePage() {
  const liveCount = portfolioData.filter((p) => p.isLive).length;
  const featured = featuredCaseStudies.slice(0, 3);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const clientHosts = [
    'yasanabeautyrituals.in',
    'sonvicasarees.com',
    'shreeayurved.com',
    'nilkanthpaints.com',
    'thepaanluxe.com',
    'greatindiapublicschool.org',
  ];

  return (
    <>
      {/* 02 Hero — typography-led editorial */}
      <section className="relative min-h-[92svh] flex flex-col justify-end pt-28 pb-16 sm:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 85% 20%, rgba(176,141,87,0.08), transparent 55%), linear-gradient(180deg, #F5F3EE 0%, #EFECE5 100%)',
          }}
        />
        <DezoContainer size="wide" className="relative z-10">
          <div className="max-w-4xl">
            <DezoReveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-primary mb-6">
                {brand.geo}
              </p>
            </DezoReveal>
            <DezoReveal delay={0.05}>
              <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-[5rem] tracking-tightest leading-[1.05] text-dezo-text-primary mb-6">
                {brand.heroLine}
              </h1>
            </DezoReveal>
            <DezoReveal delay={0.1}>
              <p className="text-lg sm:text-xl text-dezo-text-secondary leading-relaxed max-w-2xl mb-10">
                {brand.supporting}
              </p>
            </DezoReveal>
            <DezoReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <DezoButton href="/start-a-project" size="lg" icon={<ArrowUpRight size={16} />}>
                  Start a Project
                </DezoButton>
                <DezoButton href="/work" variant="outline" size="lg">
                  View Our Work
                </DezoButton>
              </div>
            </DezoReveal>
          </div>
        </DezoContainer>
      </section>

      {/* 03 Selected clients — real hosts only */}
      <DezoSection spacing="compact" className="border-y border-dezo-border bg-dezo-surface">
        <DezoContainer size="wide">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-6">
            Selected live deployments
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {clientHosts.map((host) => (
              <span
                key={host}
                className="font-mono text-xs sm:text-sm text-dezo-text-secondary tracking-wide"
              >
                {host}
              </span>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 04 ONE PARTNER */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <p className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.15] text-dezo-text-primary max-w-4xl">
              {brand.onePartner}
            </p>
          </DezoReveal>
          <DezoReveal delay={0.08}>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary max-w-2xl leading-relaxed">
              Websites, brand systems, Amazon and Flipkart, paid acquisition, SEO, and social —
              operated as one commercial system, not a stack of disconnected vendors.
            </p>
          </DezoReveal>

          <DezoStagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.06}>
            {capabilityGroups.map((g) => (
              <DezoStaggerItem key={g.name}>
                <div className="border-t border-dezo-border pt-5">
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-dezo-text-primary mb-3">
                    {g.name}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">
                    {g.items.join(' · ')}
                  </p>
                </div>
              </DezoStaggerItem>
            ))}
          </DezoStagger>
        </DezoContainer>
      </DezoSection>

      {/* 06 Service rows — editorial horizontal */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border" id="services">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Capabilities"
              as="h2"
              subtitle="Five disciplines. One operating partner."
            >
              What we deliver
            </DezoHeading>
          </DezoReveal>

          <div className="mt-12 divide-y divide-dezo-border border-y border-dezo-border">
            {serviceRows.map((row) => (
              <Link
                key={row.num}
                href={row.href}
                className="group grid grid-cols-12 gap-4 py-7 sm:py-8 items-start transition-colors hover:bg-dezo-bg/60 -mx-2 px-2"
                onMouseEnter={() => setHoveredService(row.num)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-xs text-dezo-text-muted pt-1">
                  {row.num}
                </span>
                <div className="col-span-10 sm:col-span-4">
                  <h3 className="font-display text-xl sm:text-2xl text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                    {row.name}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-span-6 sm:col-start-7">
                  <p
                    className={`text-sm text-dezo-text-secondary leading-relaxed transition-opacity duration-300 ${
                      hoveredService === row.num || hoveredService === null
                        ? 'opacity-100'
                        : 'opacity-50'
                    }`}
                  >
                    {row.summary}
                  </p>
                </div>
                <span className="hidden lg:flex col-span-1 justify-end items-center text-dezo-text-muted group-hover:text-dezo-primary transition-colors">
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 07 Selected Work — large stories */}
      <DezoSection spacing="normal" id="work">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <DezoReveal>
              <DezoHeading
                badge="Selected work"
                as="h2"
                subtitle="Real production sites. Click through to live URLs."
              >
                Evidence over decoration
              </DezoHeading>
            </DezoReveal>
            <DezoButton href="/work" variant="outline" size="sm">
              Full archive
            </DezoButton>
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {featured.map((study, i) => (
              <DezoReveal key={study.url} delay={i * 0.05}>
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  <div
                    className={`lg:col-span-7 relative overflow-hidden bg-dezo-bg-warm border border-dezo-border aspect-[16/10] ${
                      i % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <LiveSitePreview
                      url={study.url}
                      title={study.title}
                      eager={i === 0}
                      className="absolute inset-0 w-full h-full object-cover object-top dezo-img-zoom"
                    />
                  </div>
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                      {study.industry}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl text-dezo-text-primary mb-4 group-hover:text-dezo-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-dezo-text-secondary leading-relaxed mb-3">
                      <span className="font-semibold text-dezo-text-primary">Challenge. </span>
                      {study.challenge}
                    </p>
                    <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                      <span className="font-semibold text-dezo-text-primary">Result. </span>
                      {study.result}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-dezo-text-primary border-b border-dezo-ink pb-0.5">
                      Visit live site <ArrowUpRight size={14} />
                    </span>
                  </div>
                </a>
              </DezoReveal>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 08 Results — restrained */}
      <DezoSection spacing="compact" className="bg-dezo-ink text-dezo-text-inverse">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-4">
            <div>
              <p className="font-display text-4xl sm:text-5xl tracking-tight tabular-nums">
                {liveCount}+
              </p>
              <p className="text-sm text-white/55 mt-2">Live deployments catalogued</p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl tracking-tight">5</p>
              <p className="text-sm text-white/55 mt-2">Core service disciplines</p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl tracking-tight">IN</p>
              <p className="text-sm text-white/55 mt-2">Odisha studio · India delivery</p>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 09 Marketplace Growth */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <DezoHeading
                badge="Marketplaces"
                as="h2"
                subtitle="Seller operations built for India’s marketplace economy."
              >
                Amazon & Flipkart growth
              </DezoHeading>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              {[
                {
                  title: 'Amazon',
                  body: 'Listings, keywords, A+ content, sponsored ads, catalog health, and seller account operations.',
                  href: '/services/amazon',
                },
                {
                  title: 'Flipkart',
                  body: 'Catalog, pricing, promotions, inventory, orders, and marketplace performance playbooks.',
                  href: '/services/flipkart',
                },
              ].map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="block border-t border-dezo-border pt-5 group"
                >
                  <h3 className="font-display text-2xl text-dezo-text-primary mb-2 group-hover:text-dezo-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">{p.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 10 Performance Marketing */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <DezoHeading
                badge="Performance"
                as="h2"
                subtitle="Acquisition tied to commercial outcomes — not vanity metrics."
              >
                Google & Meta advertising
              </DezoHeading>
            </div>
            <div className="lg:col-span-7 space-y-6 text-sm text-dezo-text-secondary leading-relaxed">
              <p>
                Search, Shopping, Performance Max, YouTube, Meta ecommerce and lead generation,
                retargeting, creative testing, and conversion tracking — planned and operated
                alongside your storefront and marketplace systems.
              </p>
              <DezoButton href="/services/paid-ads" variant="outline" size="sm">
                Performance marketing
              </DezoButton>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 11 DEZO LAB */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <DezoReveal>
                <DezoHeading
                  badge="DEZO LAB"
                  as="h2"
                  subtitle="Practical tools for understanding your digital business — SEO, speed, Shopify, accessibility, and more."
                >
                  Analyst toolkit, not a dashboard spectacle
                </DezoHeading>
              </DezoReveal>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <DezoButton href="/growth-lab" size="lg" icon={<ArrowUpRight size={16} />}>
                Open DEZO LAB
              </DezoButton>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 12 Process */}
      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y border-dezo-border">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading badge="Process" as="h2">
              How engagement works
            </DezoHeading>
          </DezoReveal>
          <ol className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {processSteps.map((step, i) => (
              <li key={step} className="border-t border-dezo-border pt-4">
                <span className="font-mono text-[10px] text-dezo-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display text-lg sm:text-xl text-dezo-text-primary mt-2">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </DezoContainer>
      </DezoSection>

      {/* 13 Industries */}
      <DezoSection spacing="normal">
        <DezoContainer size="wide">
          <DezoReveal>
            <DezoHeading
              badge="Industries"
              as="h2"
              subtitle="Built for brands that need to sell — not just look premium."
            >
              Who we work with
            </DezoHeading>
          </DezoReveal>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {industries.map((ind) => (
              <li key={ind.href}>
                <Link
                  href={ind.href}
                  className="text-base sm:text-lg text-dezo-text-secondary hover:text-dezo-primary transition-colors border-b border-transparent hover:border-dezo-primary pb-0.5"
                >
                  {ind.name}
                </Link>
              </li>
            ))}
          </ul>
        </DezoContainer>
      </DezoSection>

      {/* 14 About */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y border-dezo-border">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <DezoHeading badge="About" as="h2">
                A serious company that handles digital business growth
              </DezoHeading>
              <p className="mt-6 text-base text-dezo-text-secondary leading-relaxed max-w-xl">
                DEZO is headquartered in Bhubaneswar, Odisha. We engineer storefronts, build brand
                systems, operate marketplace growth, and run performance marketing — connected as
                one commercial journey for ambitious Indian brands.
              </p>
              <div className="mt-8">
                <DezoButton href="/about" variant="outline" size="sm">
                  About DEZO
                </DezoButton>
              </div>
            </div>
            <div className="lg:col-span-5 border-l border-dezo-border pl-0 lg:pl-10 pt-2">
              <p className="text-sm text-dezo-text-muted mb-1">Studio</p>
              <p className="text-sm text-dezo-text-primary font-medium">
                {contact.address.street}, {contact.address.city}
              </p>
              <p className="text-sm text-dezo-text-secondary">
                {contact.address.region} {contact.address.postalCode}
              </p>
              <p className="text-sm text-dezo-text-primary mt-4 font-medium">
                {contact.phoneFormatted}
              </p>
              <p className="text-sm text-dezo-text-secondary">{contact.email}</p>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 15 Final CTA */}
      <DezoSection spacing="relaxed">
        <DezoContainer size="wide">
          <DezoReveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-5xl tracking-tight leading-[1.1] text-dezo-text-primary mb-5">
                Ready to discuss your next project?
              </h2>
              <p className="text-dezo-text-secondary text-base leading-relaxed mb-8 max-w-lg">
                Tell us what you need to build, list, or grow. We will route the brief to studio
                leadership.
              </p>
              <div className="flex flex-wrap gap-3">
                <DezoButton href="/contact" size="lg" icon={<ArrowUpRight size={16} />}>
                  Let&apos;s Talk
                </DezoButton>
                <DezoButton href="/start-a-project" variant="outline" size="lg">
                  Start a Project
                </DezoButton>
              </div>
            </div>
          </DezoReveal>
        </DezoContainer>
      </DezoSection>
    </>
  );
}

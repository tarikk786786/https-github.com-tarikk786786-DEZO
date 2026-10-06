import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Solutions & Core Pillars (Build, Brand, Marketplace, Growth, Intelligence)',
  description:
    'Explore DEZO’s five commercial pillars: Digital Engineering, Brand Strategy, Marketplace Mastery, Performance Growth, and Seller Intelligence.',
  canonicalUrl: 'https://dezo.in/solutions',
});

export default function SolutionsIndexPage() {
  const pillars = [
    {
      slug: 'build',
      pillarNumber: '01',
      title: 'BUILD · Digital Engineering',
      tagline: 'Websites · Ecommerce · Shopify · SaaS · Custom Portals',
      description:
        'We engineer sub-second web architectures, bespoke Shopify stores, and enterprise portals designed for extreme reliability, zero bloat, and frictionless conversion.',
      deliverables: ['Custom Next.js App Router', 'High-Converting Shopify Storefronts', 'B2B Client Portals', 'Headless API Systems'],
    },
    {
      slug: 'brand',
      pillarNumber: '02',
      title: 'BRAND · Strategic Identity',
      tagline: 'Positioning · Packaging · Marketplace Creative · A+ Content',
      description:
        'We do not just advertise products; we turn commoditized items into premium brands. From packaging design to Amazon Brand Stores and editorial creative.',
      deliverables: ['Brand Naming & Identity Systems', 'D2C Packaging & Unboxing Design', 'Amazon A+ Content & Brand Stores', 'Direct-Response Product Imagery'],
    },
    {
      slug: 'marketplace',
      pillarNumber: '03',
      title: 'MARKETPLACE · Amazon & Flipkart Mastery',
      tagline: 'Seller Onboarding · Listing Strategy · PPC · Buy Box Defense',
      description:
        'Complete channel management for Amazon India, Flipkart, and modern connectors. We optimize keyword indexing, control ad spend efficiency, and protect margins.',
      deliverables: ['Full Account Setup & Brand Registry', 'Search Query Performance Harvesting', 'Sponsored Ads (SP, SB, SD) Management', 'Catalog Health & Buy Box Monitoring'],
    },
    {
      slug: 'growth',
      pillarNumber: '04',
      title: 'GROWTH · Performance Acquisition',
      tagline: 'Technical SEO · Meta Ads · Google Ads · CRO',
      description:
        'Data-backed customer acquisition. We manage precision ad spend across Meta Ads (Instagram/FB) and Google Ads (Search/PMax), paired with technical search engine dominance.',
      deliverables: ['High-ROAS Meta & Google Ad Funnels', 'Technical & Local 3-Pack SEO', 'Conversion Rate Optimization (CRO)', 'Conversion API & Server Telemetry'],
    },
    {
      slug: 'intelligence',
      pillarNumber: '05',
      title: 'INTELLIGENCE · DEZO Growth OS',
      tagline: 'AI Engine · Automation · Seller Dashboards · Telemetry',
      description:
        'Our internal technology differentiator. Machine intelligence that analyzes cross-channel sales, detects margin bleed, and triggers automated alerts before revenue drops.',
      deliverables: ['DEZO Seller OS Unified Telemetry', 'AI Listing Health Diagnostic', 'Automated Lead Qualification & CRM Routing', 'Real-Time Cross-Platform Dashboards'],
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-16">
            <DezoHeading
              badge="The DEZO Ecosystem"
              as="h1"
              subtitle="From the first concept line of code to national marketplace dominance. Explore the five integrated disciplines that drive DEZO client growth."
            >
              Five Pillars. One Unified Growth Machine.
            </DezoHeading>
          </div>

          <div className="flex flex-col gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.slug}
                className="p-8 sm:p-12 rounded-dezo-xl bg-dezo-surface border border-dezo-border hover:border-dezo-border-strong transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-dezo-accent">
                        PILLAR {pillar.pillarNumber}
                      </span>
                      <span className="text-xs text-dezo-text-muted">·</span>
                      <span className="text-xs font-semibold text-dezo-text-muted uppercase">
                        {pillar.tagline}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-dezo-text-primary">
                      {pillar.title}
                    </h2>

                    <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed mt-1">
                      {pillar.description}
                    </p>

                    <div className="pt-4">
                      <DezoButton
                        href={`/solutions/${pillar.slug}`}
                        size="sm"
                        variant="secondary"
                        icon={<ArrowRight size={14} />}
                      >
                        Explore Pillar Details
                      </DezoButton>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-dezo-md bg-dezo-surface-elevated border border-dezo-border">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-3">
                      Key Deliverables
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-xs text-dezo-text-primary">
                      {pillar.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-dezo-accent shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

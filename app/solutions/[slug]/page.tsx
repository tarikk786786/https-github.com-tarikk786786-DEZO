import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';

interface PillarData {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  whyItMatters: string;
  features: { name: string; detail: string }[];
  deliverables: string[];
}

const solutionsDatabase: Record<string, PillarData> = {
  build: {
    title: 'BUILD · Digital Engineering & Commerce Architecture',
    badge: 'PILLAR 01',
    tagline: 'High-assurance websites, custom Shopify stores, and web apps.',
    description:
      'We construct web platforms designed for extreme commercial performance. Every line of code is structured for sub-second speeds, zero dependencies on fragile page-builder plugins, and rock-solid conversion rates.',
    whyItMatters:
      'A slow or clunky website directly destroys ad spend efficiency. When pages take 3+ seconds to load, over 50% of mobile buyers bounce before seeing your product.',
    features: [
      { name: 'Next.js App Router Architecture', detail: 'Server-rendered, zero-bloat web systems that pass all Google Core Web Vitals.' },
      { name: 'Bespoke Shopify Theme Engineering', detail: 'Tailored liquid code and headless storefronts built for maximum Average Order Value (AOV).' },
      { name: 'Instant UPI & Gateway Integration', detail: 'Frictionless checkout paths via Razorpay, Cashfree, and PhonePe.' },
      { name: 'Custom B2B & Client Portals', detail: 'Secure authenticated dashboards, distributor portals, and internal workflows.' },
    ],
    deliverables: [
      'Next.js 16 Production Codebase',
      'Mobile-First Responsive Design System',
      'Integrated Technical SEO Schema',
      'Global CDN & Edge Caching Configuration',
    ],
  },
  brand: {
    title: 'BRAND · Strategic Identity & Packaging',
    badge: 'PILLAR 02',
    tagline: 'Turn commoditized products into defensible national brands.',
    description:
      'We do not simply place a logo on a box. We craft the strategic positioning, physical packaging, Amazon A+ Content, and direct-response product imagery that commands premium pricing.',
    whyItMatters:
      'In crowded marketplaces, features are easily copied. Premium brand perception, thoughtful unboxing, and clear positioning are what allow you to charge 30-50% more than generic competitors.',
    features: [
      { name: 'Brand Positioning & Naming', detail: 'Competitive whitespace analysis and memorable brand identity design.' },
      { name: 'D2C Packaging & Label Design', detail: 'Retail and ecommerce compliant packaging that pops on smartphone screens.' },
      { name: 'Amazon A+ Content & Brand Stores', detail: 'Storytelling modules that increase listing conversion rates by up to 22%.' },
      { name: 'Product Photography & 3D Renderings', detail: 'Commercial studio assets showcasing textures, dimensions, and lifestyle usage.' },
    ],
    deliverables: [
      'Comprehensive Brand Style Guide',
      'Production-Ready Packaging Artwork',
      'Amazon Brand Store Asset Suite',
      'High-Resolution Direct-Response Creative Pack',
    ],
  },
  marketplace: {
    title: 'MARKETPLACE · Amazon & Flipkart Mastery',
    badge: 'PILLAR 03',
    tagline: 'Scale profitable seller operations on India’s largest marketplaces.',
    description:
      'Comprehensive seller account management and algorithmic growth for Amazon India and Flipkart. From keyword harvesting to Buy Box protection and disciplined PPC campaigns.',
    whyItMatters:
      'Over 70% of Indian online retail transactions occur on marketplaces. Winning requires mastering algorithmic search placement, review velocity, and inventory SLAs.',
    features: [
      { name: 'Search Query Performance (SQP) Mining', detail: 'Targeting exact customer search queries where your listing has proven conversion advantages.' },
      { name: 'Sponsored Ads (SP, SB, SD) Management', detail: 'Controlling ACoS and TACoS to ensure profitable ad spend rather than wasted budget.' },
      { name: 'Flipkart Catalog & F-Assured Setup', detail: 'Qualifying for regional fast-delivery badges and participating profitably in promotional sales.' },
      { name: 'Buy Box & Inventory Health Defense', detail: 'Monitoring price parity, suppressing unauthorized sellers, and avoiding out-of-stock penalties.' },
    ],
    deliverables: [
      'Full Amazon SP-API & Flipkart Account Audit',
      'Catalog Keyword Indexing Matrix',
      'Weekly Advertising TACoS Optimization Reports',
      'Promotional Sale Event Playbook',
    ],
  },
  growth: {
    title: 'GROWTH · Performance Marketing & Technical SEO',
    badge: 'PILLAR 04',
    tagline: 'Predictable customer acquisition across Meta, Google, and Organic Search.',
    description:
      'We build scalable acquisition funnels across Meta Ads (Instagram, Facebook), Google Ads (Search, Shopping, Performance Max), and organic technical SEO.',
    whyItMatters:
      'Advertising without continuous creative testing and conversion rate optimization (CRO) leads to rising customer acquisition costs (CAC) that destroy profit margins.',
    features: [
      { name: 'Direct-Response Meta Campaigns', detail: 'Segmented prospecting, lookalike, and dynamic retargeting funnels tailored for Indian consumer psychology.' },
      { name: 'Google Performance Max & Shopping Feeds', detail: 'Clean Merchant Center feeds and laser-targeted search capture on high-intent buyer terms.' },
      { name: 'Technical & Local 3-Pack SEO', detail: 'Dominating organic search results without paying for every single click.' },
      { name: 'Conversion Rate Optimization (CRO)', detail: 'Iterative checkout and landing page experiments that multiply the value of your existing traffic.' },
    ],
    deliverables: [
      'Weekly Live ROAS & CAC Dashboards',
      'Ad Creative Strategy & Copywriting Scripts',
      'Server-Side Meta CAPI & Google Tag Telemetry',
      'Monthly Technical SEO Ranking Reports',
    ],
  },
  intelligence: {
    title: 'INTELLIGENCE · DEZO Growth OS & AI Automation',
    badge: 'PILLAR 05',
    tagline: 'Machine intelligence and automated workflows driving business scale.',
    description:
      'Our proprietary internal technology layer. We connect your advertising, inventory, marketplace, and CRM data into automated diagnostic engines that eliminate manual errors.',
    whyItMatters:
      'Operating across 4+ channels manually leads to missed stockouts, unoptimized ad spend, and dropped leads. Automated intelligence acts as a 24/7 strategic watchdog.',
    features: [
      { name: 'Cross-Channel Telemetry Dashboard', detail: 'Consolidated view of revenue, ad spend, and blended ROAS across Amazon, Flipkart, Website, and Meta.' },
      { name: 'Automated AI Seller Alerts', detail: 'Real-time detection of ranking drops, competitor voucher moves, and high add-to-cart abandonments.' },
      { name: 'WhatsApp & CRM Lead Automation', detail: 'Instant routing of high-value inbound leads directly to executive sales representatives.' },
      { name: 'Proprietary Market Opportunity Scanner', detail: 'Identifying untapped product categories and high-margin keywords across Indian retail.' },
    ],
    deliverables: [
      'Custom DEZO Growth OS Client Portal Access',
      'Automated WhatsApp Diagnostic Notifications',
      'Margin Bleed & TACoS Threshold Alerts',
      'Predictive Inventory Re-Order Models',
    ],
  },
};

export function generateStaticParams() {
  return [
    { slug: 'build' },
    { slug: 'brand' },
    { slug: 'marketplace' },
    { slug: 'growth' },
    { slug: 'intelligence' },
  ];
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const data = solutionsDatabase[slug];
    if (!data) return constructMetadata({ title: 'Solutions' });
    return constructMetadata({
      title: data.title,
      description: data.description,
      canonicalUrl: `https://dezo.in/solutions/${slug}`,
    });
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = solutionsDatabase[slug];

  if (!pillar) {
    notFound();
  }

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="mb-8">
            <DezoButton
              href="/solutions"
              variant="ghost"
              size="sm"
              icon={<ArrowLeft size={14} />}
              iconPosition="left"
            >
              Back to All Pillars
            </DezoButton>
          </div>

          <div className="max-w-4xl mb-16">
            <DezoHeading
              badge={pillar.badge}
              as="h1"
              subtitle={pillar.tagline}
            >
              {pillar.title}
            </DezoHeading>
          </div>

          {/* Core Overview & Why It Matters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
              <p>{pillar.description}</p>
              <div className="p-6 rounded-dezo-md bg-dezo-surface border border-dezo-border">
                <h3 className="text-xs font-bold uppercase tracking-widest text-dezo-accent mb-2">
                  Commercial Reality
                </h3>
                <p className="text-xs sm:text-sm text-dezo-text-primary leading-relaxed">
                  {pillar.whyItMatters}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-dezo-xl bg-dezo-surface border border-dezo-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-4">
                What You Receive
              </h3>
              <ul className="flex flex-col gap-3">
                {pillar.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-dezo-text-primary">
                    <CheckCircle2 size={16} className="text-dezo-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-dezo-border">
                <DezoButton href="/start-a-project" size="md" className="w-full">
                  Inquire For This Pillar
                </DezoButton>
              </div>
            </div>
          </div>

          {/* Deep-Dive Capabilities */}
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-black text-dezo-text-primary mb-8">
              Core Capabilities in This Pillar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillar.features.map((feat, idx) => (
                <DezoCard key={idx} interactive={false}>
                  <h4 className="text-base font-bold text-dezo-text-primary mb-2">
                    {feat.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed">
                    {feat.detail}
                  </p>
                </DezoCard>
              ))}
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

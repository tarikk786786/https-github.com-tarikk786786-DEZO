import React from 'react';
import type { Metadata } from 'next';
import {
  Code2,
  Layers,
  BarChart3,
  Search,
  Bot,
  Zap,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateServiceSchema } from '@/lib/seo/jsonld';

export const metadata: Metadata = constructMetadata({
  title: 'Services & Capabilities',
  description:
    'Comprehensive web engineering, custom ecommerce architectures, technical SEO, and performance marketing designed for maximum conversion.',
  canonicalUrl: 'https://dezo.in/services',
});

export default function ServicesPage() {
  const services = [
    {
      id: 'web-development',
      icon: <Code2 size={24} />,
      title: 'High-Performance Web Development',
      description:
        'We engineer custom web applications and corporate websites utilizing Next.js, TypeScript, and modern Server Components. Every site is built for sub-second page loads, unmatched reliability, and rock-solid Core Web Vitals.',
      deliverables: [
        'Custom Next.js App Router Architecture',
        'Mobile-First Responsive Layouts',
        'Modular Tailwind Design Systems',
        'Sub-second Global CDN Hosting',
        'Zero-dependency Accessible UI Elements',
      ],
    },
    {
      id: 'ecommerce',
      icon: <Layers size={24} />,
      title: 'Ecommerce & D2C Storefronts',
      description:
        'From high-growth Shopify stores to headless commerce architectures, we build retail systems that minimize checkout friction, increase Average Order Value (AOV), and scale effortlessly during seasonal traffic surges.',
      deliverables: [
        'Custom Shopify Theme Development',
        'Headless Commerce & Inventory APIs',
        'Frictionless UPI & Gateway Setup',
        'High-converting Product Page Layouts',
        'Cart Abandonment & Post-Purchase Funnels',
      ],
    },
    {
      id: 'seo',
      icon: <Search size={24} />,
      title: 'Technical & Organic SEO',
      description:
        'Sustainable, search-engine-dominant growth. We resolve indexing bottlenecks, deploy semantic JSON-LD structures, optimize Core Web Vitals, and build programmatic keyword landing pages that capture high-intent buyers.',
      deliverables: [
        'Deep Technical Crawl & Audit',
        'Schema.org Structured Data Engine',
        'Core Web Vitals 95+ Optimization',
        'High-Intent Keyword Architecture',
        'Local SEO & Multi-City Presence',
      ],
    },
    {
      id: 'marketing',
      icon: <BarChart3 size={24} />,
      title: 'Performance Marketing (Meta & Google Ads)',
      description:
        'Data-backed customer acquisition. We manage precision ad spend across Meta Ads (Instagram, Facebook) and Google Search/Shopping, ensuring every rupee invested yields a healthy return on ad spend (ROAS).',
      deliverables: [
        'Campaign Structure & Funnel Segmentation',
        'Ad Creative & Direct-Response Copywriting',
        'Conversion API (CAPI) & Pixel Hardening',
        'A/B Testing of Landing Page Variations',
        'Transparent Weekly Performance Reporting',
      ],
    },
    {
      id: 'ai-automation',
      icon: <Bot size={24} />,
      title: 'AI Workflows & Business Automation',
      description:
        'We help modern businesses eliminate repetitive manual operations by integrating generative AI models, custom scrapers, CRM syncs, and intelligent lead qualifiers directly into their business stack.',
      deliverables: [
        'Automated Lead Qualification & WhatsApp Routing',
        'Custom Internal Knowledge Base Retrieval',
        'CRM & Payment Reconciliation Webhooks',
        'Automated Catalog & Media Pipelines',
      ],
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-16">
            <DezoHeading
              badge="Capabilities"
              as="h1"
              subtitle="End-to-end digital engineering and growth services tailored for brands that refuse to blend into the background."
            >
              Services Engineered For Growth
            </DezoHeading>
          </div>

          <div className="flex flex-col gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-28 p-8 sm:p-12 rounded-dezo-xl bg-dezo-surface border border-dezo-border"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-dezo-text-primary">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    <div className="pt-4">
                      <DezoButton
                        href="/contact"
                        size="sm"
                        icon={<ArrowUpRight size={14} />}
                      >
                        Inquire About This Service
                      </DezoButton>
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-6 rounded-dezo-lg bg-dezo-surface-elevated border border-dezo-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-4">
                      What We Deliver
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-dezo-text-primary">
                          <CheckCircle2 size={16} className="text-dezo-accent shrink-0" />
                          <span>{item}</span>
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

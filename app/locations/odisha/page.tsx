import React from 'react';
import type { Metadata } from 'next';
import {
  MapPin,
  TrendingUp,
  Building2,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Store,
  CheckCircle2,
  ArrowUpRight,
  Phone,
} from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateServiceSchema, generateFaqSchema } from '@/lib/seo/jsonld';

export const metadata: Metadata = constructMetadata({
  title: 'DEZO Odisha — Digital Growth Technology for Odisha Businesses',
  description:
    'Built in Odisha. Built for India. Built to scale. DEZO helps Odisha founders, institutions, and manufacturers scale across Bhubaneswar, Cuttack, and all India through websites, ecommerce, Amazon, Flipkart, and performance ads.',
  canonicalUrl: 'https://dezo.in/locations/odisha',
});

export default function DezoOdishaPage() {
  const serviceSchema = generateServiceSchema(
    'Digital Transformation & Ecommerce Agency in Odisha',
    'Comprehensive web engineering, Amazon & Flipkart onboarding, local SEO, and performance marketing tailored for businesses and manufacturers across Odisha.',
    '/locations/odisha'
  );

  const faqSchema = generateFaqSchema([
    {
      question: 'Where is DEZO located in Odisha?',
      answer: 'DEZO is physically headquartered in Phase 2, Patia, Bhubaneswar, Odisha (PIN 751024), serving clients across Bhubaneswar, Cuttack, Rourkela, Berhampur, and pan-India.',
    },
    {
      question: 'What digital marketing and web services does DEZO provide in Odisha?',
      answer: 'DEZO provides custom Next.js web application development, Shopify store builds, Amazon & Flipkart marketplace management, Google Local 3-Pack SEO, and performance marketing funnels.',
    },
    {
      question: 'Can DEZO help Odisha manufacturers sell on Amazon and Flipkart?',
      answer: 'Yes, DEZO specializes in onboarding, brand registry, A+ content, catalog optimization, and advertising for Odisha handicraft, textile, FMCG, and industrial manufacturers.',
    },
  ]);
  const odishaSectors = [
    {
      icon: <GraduationCap size={20} />,
      title: 'Education & Academies',
      description: 'Admission enrollment funnels, Google Local SEO, and verified lead management for schools, colleges, and coaching institutes.',
    },
    {
      icon: <HeartPulse size={20} />,
      title: 'Healthcare & Wellness',
      description: 'Patient appointment engines, doctor branding, and organic search dominance for hospitals, clinics, and Ayurvedic wellness centers.',
    },
    {
      icon: <Building2 size={20} />,
      title: 'Real Estate & Infrastructure',
      description: 'High-converting residential and commercial project showcases with WhatsApp instant brochure downloads and high-intent buyer verification.',
    },
    {
      icon: <ShoppingBag size={20} />,
      title: 'Handloom & Artisanal D2C',
      description: 'Taking authentic Sambalpuri, Ikat, and Odisha artisanal crafts to national and global buyers through Shopify, Amazon, and international shipping setups.',
    },
    {
      icon: <Store size={20} />,
      title: 'Retailers & Local Businesses',
      description: 'Google Business Profile dominance, localized Meta Ads, and automated WhatsApp follow-ups that turn local footfall into recurring digital orders.',
    },
    {
      icon: <TrendingUp size={20} />,
      title: 'Manufacturing & Industrial B2B',
      description: 'Professional B2B digital catalogs, vendor inquiry portals, and export-ready portals connecting Odisha manufacturers to national supply chains.',
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-4xl mb-16">
            <DezoHeading
              badge="Built in Odisha · Built for India"
              as="h1"
              subtitle="Digital growth technology and commerce architecture for Odisha businesses with India-scale ambition. We bridge local market mastery with world-class engineering execution."
            >
              Empowering Odisha's Commercial Leaders to Scale Nationally
            </DezoHeading>
          </div>

          {/* Regional Anchor Statement */}
          <div className="p-8 sm:p-12 rounded-dezo-xl bg-dezo-surface border border-dezo-border mb-20 relative overflow-hidden">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-dezo-accent mb-4">
                <MapPin size={14} />
                <span>Headquartered in Patia, Bhubaneswar (751024)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-dezo-text-primary mb-4">
                Odisha Expertise + India-Scale Execution
              </h2>
              <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed mb-6">
                Being rooted in Odisha means we understand the regional buyer behavior, local commercial constraints, and high-growth opportunities better than any remote agency. From Sambalpur handlooms to Bhubaneswar healthcare and Cuttack retail, we engineer the digital tools that elevate Odisha businesses into household names across India.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <DezoButton href="/contact" size="md">
                  Book an In-Person Studio Meeting
                </DezoButton>
                <a
                  href="tel:+919114411026"
                  className="inline-flex items-center gap-2 text-xs font-bold text-dezo-text-primary hover:text-dezo-accent px-4 py-3"
                >
                  <Phone size={14} className="text-dezo-accent" />
                  <span>Call Direct: +91 9114411026</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Odisha Sectors */}
          <div className="mb-20">
            <div className="max-w-2xl mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-dezo-accent mb-2">
                Regional Focus
              </h3>
              <h2 className="text-2xl sm:text-3xl font-black text-dezo-text-primary">
                Specialized Solutions for Odisha's Core Industries
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {odishaSectors.map((sector, idx) => (
                <DezoCard key={idx} interactive={false}>
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                    {sector.icon}
                  </div>
                  <h4 className="text-lg font-bold text-dezo-text-primary mb-2">
                    {sector.title}
                  </h4>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed">
                    {sector.description}
                  </p>
                </DezoCard>
              ))}
            </div>
          </div>

          {/* Local Growth Engine Capabilities */}
          <div className="p-8 sm:p-12 rounded-dezo-xl bg-dezo-surface-elevated border border-dezo-border">
            <h3 className="text-xl sm:text-2xl font-black text-dezo-text-primary mb-6">
              The Complete Odisha Digital Growth Toolkit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-dezo-text-primary">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-dezo-accent shrink-0 mt-0.5" />
                <div>
                  <strong>Google Business Profile & 3-Pack Rank:</strong> Dominating local search map packs for Bhubaneswar, Cuttack, and Rourkela.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-dezo-accent shrink-0 mt-0.5" />
                <div>
                  <strong>WhatsApp Commerce Integration:</strong> Enabling seamless local inquiries, catalog browsing, and UPI payment links.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-dezo-accent shrink-0 mt-0.5" />
                <div>
                  <strong>National Marketplace Launch:</strong> Onboarding local manufacturers and artisans onto Amazon India and Flipkart.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-dezo-accent shrink-0 mt-0.5" />
                <div>
                  <strong>High-Speed Bilingual Websites:</strong> Fast web experiences tailored for English, Hindi, and Odia speaking users.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-dezo-accent shrink-0 mt-0.5" />
                <div>
                  <strong>Hyper-Targeted Meta Ads:</strong> Pin-code and radius-level campaigns tailored for Odisha purchasing habits.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-dezo-accent shrink-0 mt-0.5" />
                <div>
                  <strong>Local Reputation & Review Shield:</strong> Automated workflows to gather 5-star Google reviews and manage customer trust.
                </div>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

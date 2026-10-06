import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  ShoppingBag,
  Factory,
  UtensilsCrossed,
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
  title: 'Industries We Scale (D2C, Healthcare, Education, Real Estate, B2B)',
  description:
    'Tailored digital commerce, branding, marketplace management, and lead funnels engineered for India’s highest-growth verticals.',
  canonicalUrl: 'https://dezo.in/industries',
});

export default function IndustriesPage() {
  const industries = [
    {
      icon: <ShoppingBag size={22} />,
      title: 'Consumer Brands & D2C Retail',
      focus: 'Beauty, Ethnic Fashion, Personal Care, Jewelry & Apparel',
      description:
        'From handloom sarees and luxury perfumes to clean cosmetics. We engineer frictionless Shopify/Next.js storefronts, optimize Amazon & Flipkart catalogs, and run high-ROAS Meta Ads campaigns.',
      examples: 'Yasana Beauty, Sonvica Sarees, Cottons Jaipur, Zavique, The Paan Luxe',
    },
    {
      icon: <HeartPulse size={22} />,
      title: 'Healthcare, Ayurveda & Wellness',
      focus: 'Clinics, Ayurvedic Brands, Diagnostics & Hospitals',
      description:
        'Patient acquisition engines built on medical trust. We handle Google Local SEO, high-converting consultation booking systems, and compliant performance marketing.',
      examples: 'Shree Ayurved, BioBonz, Prazie Ayurveda, Genesis Health Campus',
    },
    {
      icon: <GraduationCap size={22} />,
      title: 'Education & Academic Institutes',
      focus: 'K-12 Schools, Test Prep, EdTech & Skill Academies',
      description:
        'Admission lead funnels that fill batches. We build high-speed institute portals, manage Google Ads on high-intent parent searches, and automate WhatsApp counseling follow-ups.',
      examples: 'Great India Public School, Sorobana Abacus Academy, Smart Bankers Institute',
    },
    {
      icon: <Building2 size={22} />,
      title: 'Real Estate & Infrastructure',
      focus: 'Developers, Luxury Housing, Brokerages & Precast',
      description:
        'High-value property lead generation. We design architectural project landing pages, interactive site walkthroughs, and verified buyer verification funnels.',
      examples: 'Dream Property, Mirage Property, Wallfast Precast, Sai Swastik',
    },
    {
      icon: <Factory size={22} />,
      title: 'Manufacturing & Industrial B2B',
      focus: 'Chemicals, Packaging, Security & Heavy Industrial',
      description:
        'Modernizing B2B industrial sales. We replace outdated brochures with clean digital product catalogs, RFQ inquiry engines, and export-ready international portals.',
      examples: 'Nilkanth Paints, Dark Alert Security, Allied Vents, ZMS Logistics',
    },
    {
      icon: <UtensilsCrossed size={22} />,
      title: 'Food, Snacks & Packaged Goods',
      focus: 'Traditional Snacks, Organic Foods & Spices',
      description:
        'Scalable retail distribution. We help packaged food manufacturers scale beyond local wholesale into Amazon FBA, Flipkart Grocery, and direct repeat D2C orders.',
      examples: 'Shitija Snacks, Fitnacks Foods, Pollachi Vivasaayi, Rich Relish',
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-16">
            <DezoHeading
              badge="Domain Specialization"
              as="h1"
              subtitle="Every industry has unique buyer psychology, regulatory realities, and commercial economics. Explore how DEZO tailors its growth stack for each sector."
            >
              Engineered For Your Specific Industry
            </DezoHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {industries.map((ind, i) => (
              <DezoCard key={i} interactive={false} className="flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                    {ind.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dezo-text-primary mb-1">
                    {ind.title}
                  </h3>
                  <div className="text-xs font-semibold text-dezo-accent uppercase mb-3">
                    {ind.focus}
                  </div>
                  <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                    {ind.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-dezo-border text-xs text-dezo-text-muted">
                  <strong className="text-dezo-text-primary">Verified Clients:</strong> {ind.examples}
                </div>
              </DezoCard>
            ))}
          </div>

          <div className="p-8 sm:p-12 rounded-dezo-xl bg-dezo-surface border border-dezo-border text-center flex flex-col items-center">
            <h3 className="text-2xl font-bold text-dezo-text-primary mb-3">
              Don't See Your Specific Category?
            </h3>
            <p className="text-sm text-dezo-text-secondary max-w-lg mb-6">
              Our core principles—clean engineering, marketplace discipline, and measurable customer acquisition—translate across any ambitious commercial model.
            </p>
            <DezoButton href="/start-a-project" size="md" magnetic>
              Schedule an Industry Consultation
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { CTASection } from '@/components/dezo/visual';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoReveal, DezoHeroMotion } from '@/lib/motion/MotionAdapter';
import { finalCtaBanner } from '@/content/banners';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateFaqSchema } from '@/lib/seo/jsonld';
import { PackageComparisonTable } from '@/components/dezo/pricing/PackageComparisonTable';
import { WebsiteProjectEstimator } from '@/components/dezo/pricing/WebsiteProjectEstimator';
import { CustomBudgetSelector } from '@/components/dezo/pricing/CustomBudgetSelector';
import { WebsiteCatalogBrowser } from '@/components/dezo/pricing/WebsiteCatalogBrowser';
import { WebsiteConfidencePromise } from '@/components/dezo/pricing/WebsiteConfidencePromise';
import { Sparkles, ArrowRight, ShieldCheck, Calculator, MessageSquare, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Website Development Pricing in India — Clear Prices & Quality Guarantee | DEZO',
  description:
    'Transparent website development packages starting from ₹1,999 for students and ₹2,999 for local shops. Compare dukaan sites, business websites, Shopify stores, and custom web applications with written quality guarantees and 30-day warranty.',
  canonicalUrl: 'https://dezo.in/pricing',
});

const PRICING_FAQS = [
  {
    q: 'Are the prices listed on this website fixed quotations or starting estimates?',
    a: 'All published rates are framed as "Starting from" baseline estimates for tightly scoped projects. The final quotation is finalized in a written Scope Lock agreement based on your exact page count, custom feature requirements, content readiness, and third-party API integrations.',
  },
  {
    q: 'What is DEZO’s "Scope Lock Promise"?',
    a: 'Before writing a single line of code, we document every agreed page, feature, deliverable, timeline milestone, and fixed price. Once signed off, we never introduce surprise fees or unilateral price increases. Any new feature requested mid-project is quoted via a separate written change request.',
  },
  {
    q: 'Are domain registration and cloud hosting costs included in the package price?',
    a: 'For Student Portfolio and Local Dukaan sites, we deploy on enterprise-grade cloud platforms (Vercel/Netlify) with ₹0 lifelong hosting fees so you never pay recurring cPanel server charges. For custom domain names (₹800–₹1,200/yr) or specialized cloud databases/Shopify tiers, assets are registered directly under your business name for 100% ownership.',
  },
  {
    q: 'What does the 30-Day Covered-Defect Warranty include?',
    a: 'Our written 30-day post-launch warranty covers reproducible technical bugs or broken workflows in the agreed project scope. If a form fails, a link breaks, or a layout misaligns, we fix it promptly without additional developer fees. (Excludes client-modified code or third-party server outages).',
  },
  {
    q: 'Do I get 100% source-code ownership upon project completion?',
    a: 'Yes. Upon final milestone payment, 100% intellectual property, full Git repository access, design assets, and production deployment credentials transfer entirely to your business. You are never locked into proprietary agency hosting.',
  },
  {
    q: 'What payment milestone schedule do you follow?',
    a: 'To make hiring DEZO completely accessible and risk-free for students and local businesses, micro and starter packages follow a friendly 50% kickoff deposit and 50% balance upon staging approval and launch. Larger custom projects follow 40% kickoff, 30% preview, and 30% live launch.',
  },
  {
    q: 'Can you work with businesses located outside of Bhubaneswar or Odisha?',
    a: 'Yes. While DEZO is based in Patia, Bhubaneswar, we engineer websites and digital growth platforms for clients across Mumbai, Delhi NCR, Bengaluru, Hyderabad, Kolkata, and international businesses across the UK, US, and UAE via structured remote workflows.',
  },
];

export default function PricingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ]);

  const faqSchema = generateFaqSchema(
    PRICING_FAQS.map((f) => ({ question: f.q, answer: f.a }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <div className="pt-32 sm:pt-36 pb-12 bg-dezo-bg-warm border-b-2 border-dezo-ink">
        <DezoContainer size="wide">
          <DezoHeroMotion>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-4 font-bold">
              <Sparkles size={13} className="text-dezo-primary" />
              <span>Transparent Pricing · Documented Accountability</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-dezo-ink tracking-tightest leading-[0.98] max-w-4xl">
              Any Business. Any Website. A Clear Price.
            </h1>

            <p className="mt-4 text-base sm:text-xl font-mono text-dezo-primary font-bold max-w-3xl">
              From a simple landing page to a complete eCommerce store or custom web application, DEZO helps you choose the right build for your goals and budget.
            </p>

            <p className="mt-4 text-sm sm:text-base text-dezo-text-secondary leading-relaxed max-w-2xl font-mono">
              Fixed scopes, working staging previews, 10-point Quality Assurance, source-code handover, and a written 30-day post-launch warranty.
            </p>

            {/* Quick Jumps */}
            <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-mono">
              <a
                href="#packages"
                className="px-4 py-2 bg-dezo-ink text-dezo-bg uppercase font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-colors border border-dezo-ink"
              >
                5 Core Packages ↓
              </a>
              <a
                href="#calculator"
                className="px-4 py-2 bg-white text-dezo-ink uppercase font-bold hover:bg-dezo-bg transition-colors border border-dezo-ink"
              >
                Website Cost Calculator ↓
              </a>
              <a
                href="#budget-bands"
                className="px-4 py-2 bg-white text-dezo-ink uppercase font-bold hover:bg-dezo-bg transition-colors border border-dezo-ink"
              >
                Budget Bands ↓
              </a>
              <a
                href="#website-catalog"
                className="px-4 py-2 bg-white text-dezo-ink uppercase font-bold hover:bg-dezo-bg transition-colors border border-dezo-ink"
              >
                30+ Website Catalog ↓
              </a>
              <a
                href="#website-promise"
                className="px-4 py-2 bg-white text-dezo-ink uppercase font-bold hover:bg-dezo-bg transition-colors border border-dezo-ink"
              >
                Quality Promise ↓
              </a>
            </div>
          </DezoHeroMotion>
        </DezoContainer>
      </div>

      {/* SECTION 1: 5 Core Packages Comparison */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <PackageComparisonTable />
        </DezoContainer>
      </DezoSection>

      {/* SECTION 2: Interactive Website Project Estimator / Budget Calculator */}
      <DezoSection spacing="compact" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <WebsiteProjectEstimator />
        </DezoContainer>
      </DezoSection>

      {/* SECTION 3: Custom Budget Selector ("Tell Us Your Budget...") */}
      <DezoSection spacing="compact" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <CustomBudgetSelector />
        </DezoContainer>
      </DezoSection>

      {/* SECTION 4: 30+ Searchable Website Catalog */}
      <DezoSection spacing="compact" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <WebsiteCatalogBrowser />
        </DezoContainer>
      </DezoSection>

      {/* SECTION 5: The DEZO Website Confidence Promise (10 Commitments & 30-Day Warranty) */}
      <DezoSection spacing="compact" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <WebsiteConfidencePromise />
        </DezoContainer>
      </DezoSection>

      {/* SECTION 6: Pricing & Commercial Clarity FAQ */}
      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-t-2 border-dezo-ink">
        <DezoContainer size="default">
          <DezoHeading
            badge="Clarity"
            as="h2"
            subtitle="Straightforward answers about our pricing models, scope commitments, and warranties."
          >
            Frequently Asked Questions
          </DezoHeading>

          <div className="mt-10 space-y-5">
            {PRICING_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-dezo-bg border border-dezo-border p-6 shadow-dezo-card"
              >
                <h3 className="font-display text-lg font-bold text-dezo-ink flex items-start gap-2.5">
                  <span className="font-mono text-dezo-primary font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-3 text-sm text-dezo-text-secondary leading-relaxed pl-6 border-l-2 border-dezo-primary/40">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      <CTASection data={finalCtaBanner} />
    </>
  );
}

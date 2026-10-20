'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  MapPin,
  Target,
  DollarSign,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Layers,
  ExternalLink,
} from 'lucide-react';

export type GrowthGoal =
  | 'launch-business'
  | 'build-website'
  | 'local-customers'
  | 'google-visibility'
  | 'generate-leads'
  | 'ecommerce-sales'
  | 'amazon-flipkart'
  | 'social-media'
  | 'automate-followups'
  | 'complete-system';

interface RecommendationOutput {
  title: string;
  planTier: 'START' | 'GROW' | 'SCALE' | 'CUSTOM';
  summary: string;
  recommendedServices: {
    name: string;
    slug: string;
    why: string;
    keyDeliverable: string;
  }[];
  timeline: string;
  estimatedBudget: string;
}

const GOALS_LIST = [
  { id: 'launch-business', title: 'Launch a New Business', desc: 'Need foundational brand, website, and launch checklist.' },
  { id: 'build-website', title: 'Build / Redesign Website', desc: 'Need a fast, modern Next.js or Shopify web presence.' },
  { id: 'local-customers', title: 'Get More Local Customers', desc: 'Dominate Google Maps and capture nearby footfall/calls.' },
  { id: 'google-visibility', title: 'Improve Google SEO Visibility', desc: 'Rank higher organically on high-intent commercial keywords.' },
  { id: 'generate-leads', title: 'Generate Qualified Leads', desc: 'Capture B2B inquiries, phone calls, and appointment bookings.' },
  { id: 'ecommerce-sales', title: 'Increase eCommerce & D2C Sales', desc: 'Boost Shopify sales, lower CAC, and reduce COD returns.' },
  { id: 'amazon-flipkart', title: 'Grow on Amazon or Flipkart', desc: 'Optimize listings, A+ content, and sponsored ads.' },
  { id: 'social-media', title: 'Scale Social Media Engagement', desc: 'Professional Reels, design carousels, and content calendar.' },
  { id: 'automate-followups', title: 'Automate WhatsApp & CRM', desc: 'WhatsApp Business bot, abandoned cart, and instant lead alerts.' },
  { id: 'complete-system', title: 'Build Full Growth Engine', desc: 'Synchronize web, ads, SEO, brand, and marketplaces as one.' },
];

export function DezoGrowthPlanBuilder() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [businessType, setBusinessType] = useState('Local Retailer / Store');
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('Bhubaneswar');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState<GrowthGoal>('local-customers');
  const [budgetRange, setBudgetRange] = useState('₹5,000 - ₹15,000 / month (Local Shop Foundation)');
  const [timeline, setTimeline] = useState('Within 2 to 4 weeks');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [contactInfo, setContactInfo] = useState('');
  const [clientName, setClientName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Deterministic Recommendation Engine
  const recommendation = React.useMemo<RecommendationOutput>(() => {
    switch (primaryGoal) {
      case 'local-customers':
        return {
          title: 'Local Discovery & Acquisition Engine',
          planTier: 'GROW',
          summary: `Engineered specifically for ${businessType} in ${location} looking to capture high-intent nearby customers searching on Google Maps and smartphones.`,
          recommendedServices: [
            {
              name: 'Local SEO & Google Maps Visibility',
              slug: 'local-seo',
              why: 'Places your physical location into the top 3 Google Maps results for nearby searchers.',
              keyDeliverable: 'Google Business Profile category audit, NAP citations sync, and local schema.',
            },
            {
              name: 'Fast Mobile Landing Page & Call Funnel',
              slug: 'landing-pages-cro',
              why: 'Ensures mobile searchers can click-to-call, get directions, or view your menu in under a second.',
              keyDeliverable: 'Sub-second mobile landing page with prominent call and direction buttons.',
            },
            {
              name: 'WhatsApp Business API & Review Automation',
              slug: 'whatsapp-crm-automation',
              why: 'Converts inquiries into bookings and systematically collects 5-star customer reviews.',
              keyDeliverable: 'Automated greeting bot, QR table cards, and review request flow.',
            },
          ],
          timeline: '1 to 3 weeks to full deployment',
          estimatedBudget: 'Starting ₹2,999 one-time setup + optional ₹699/mo local care',
        };

      case 'ecommerce-sales':
        return {
          title: 'Direct-to-Consumer (D2C) Scaling Engine',
          planTier: 'SCALE',
          summary: `Engineered for ${businessType} to maximize direct storefront margins, eliminate checkout friction, and profitably scale paid acquisition.`,
          recommendedServices: [
            {
              name: 'Custom Shopify 2.0 Storefront & CRO',
              slug: 'shopify-development',
              why: 'Sub-2s mobile loading, 1-click UPI checkout, and sticky Add-to-Cart triggers.',
              keyDeliverable: 'Custom theme build, payment gateway approvals, and COD fraud verification.',
            },
            {
              name: 'Meta (FB/IG) & Google Shopping Ads',
              slug: 'paid-ads',
              why: 'Full-funnel creative testing and catalog retargeting to achieve profitable blended ROAS.',
              keyDeliverable: 'Conversion API (CAPI) setup, dynamic product ads, and weekly spend reporting.',
            },
            {
              name: 'WhatsApp Abandoned Cart & COD Recovery',
              slug: 'whatsapp-crm-automation',
              why: 'Recovers 15-25% of abandoned carts and cuts RTO losses with automated phone verification.',
              keyDeliverable: 'Automated cart recovery sequence with instant discount trigger.',
            },
          ],
          timeline: '4 to 6 weeks for complete launch',
          estimatedBudget: '₹50,000 - ₹1,20,000 / month operating cadence',
        };

      case 'generate-leads':
        return {
          title: 'High-Intent B2B & Lead Generation Funnel',
          planTier: 'GROW',
          summary: `Engineered for ${businessType} in ${location} to capture pre-qualified inquiries and route them to sales reps within seconds.`,
          recommendedServices: [
            {
              name: 'High-Converting Project Landing Page',
              slug: 'landing-pages-cro',
              why: 'Single-minded focus on value proposition, proof, and multi-step qualification questions.',
              keyDeliverable: 'High-speed Next.js landing page with interactive quote or inquiry calculator.',
            },
            {
              name: 'Google Search & Call Ads',
              slug: 'paid-ads',
              why: 'Targets active buyers searching for exact solutions with commercial search intent.',
              keyDeliverable: 'Laser-focused ad groups, negative keyword filtering, and call tracking.',
            },
            {
              name: 'Lead Routing & CRM Webhook Integration',
              slug: 'lead-generation',
              why: 'Delivers qualified customer inquiries directly to sales reps on WhatsApp and CRM.',
              keyDeliverable: 'Instant lead notification webhook (under 15 seconds) to sales team.',
            },
          ],
          timeline: '2 to 3 weeks to campaign launch',
          estimatedBudget: '₹35,000 - ₹65,000 / month management retainer',
        };

      case 'amazon-flipkart':
        return {
          title: 'Marketplace Operations & Growth System',
          planTier: 'GROW',
          summary: `Engineered for ${businessType} to dominate organic search rankings and Sponsored Ads on Amazon India and Flipkart.`,
          recommendedServices: [
            {
              name: 'Amazon India Listing Optimization & A+ Content',
              slug: 'amazon',
              why: 'Increases conversion rate and search indexing across high-volume customer queries.',
              keyDeliverable: 'SEO titles, backend search terms, Brand Store, and modular A+ visual cards.',
            },
            {
              name: 'Amazon Sponsored Ads (PPC) Management',
              slug: 'amazon',
              why: 'Drives profitable sales rank velocity while maintaining disciplined target ACoS.',
              keyDeliverable: 'Campaign segmentation (auto/manual), bid calibration, and weekly reporting.',
            },
            {
              name: 'Flipkart PLA & Catalog Operations',
              slug: 'flipkart',
              why: 'Expands market reach into Tier 2 and Tier 3 Indian consumers.',
              keyDeliverable: 'Catalog quality score optimization and festival promotion enrollment.',
            },
          ],
          timeline: '2 to 4 weeks setup + monthly operating cadence',
          estimatedBudget: '₹30,000 - ₹60,000 / month management fee',
        };

      case 'build-website':
        return {
          title: 'High-Performance Modern Web Presence',
          planTier: 'START',
          summary: `Engineered for ${businessType} to deliver sub-second load times, mobile perfection, zero hosting fees, and authoritative credibility.`,
          recommendedServices: [
            {
              name: 'Custom Next.js & TypeScript Web Development',
              slug: 'web-development',
              why: 'Fast, secure, and modern web presence with zero template bloat and free lifelong cloud hosting.',
              keyDeliverable: 'Full custom responsive website with Core Web Vitals score 90+.',
            },
            {
              name: 'On-Page SEO & Schema Architecture',
              slug: 'seo',
              why: 'Ensures Google indexes your services, business credentials, and team correctly.',
              keyDeliverable: 'Structured JSON-LD schema, metadata, sitemap.xml, and Search Console verification.',
            },
            {
              name: 'Conversion Funnel & Contact Forms',
              slug: 'lead-generation',
              why: 'Captures inquiries seamlessly with direct WhatsApp delivery and instant lead alerts.',
              keyDeliverable: 'Multi-step inquiry forms connected to WhatsApp and company email.',
            },
          ],
          timeline: '1 to 2 weeks from design sign-off to launch',
          estimatedBudget: 'Starting ₹1,999 (Student) / ₹2,999 (Local Shop) / ₹4,999 (Business)',
        };

      case 'complete-system':
      default:
        return {
          title: 'Full-Stack Digital Growth Operating System',
          planTier: 'SCALE',
          summary: `Complete commercial operating system synchronizing web engineering, SEO, performance media, brand creative, and automation under one accountable cadence.`,
          recommendedServices: [
            {
              name: 'Custom Digital Build & Storefront',
              slug: 'web-development',
              why: 'Core commercial hub engineered for sub-second speed and seamless conversion.',
              keyDeliverable: 'Next.js or Shopify production build with Core Web Vitals score 90+.',
            },
            {
              name: 'Multi-Channel Paid Acquisition (Google & Meta)',
              slug: 'paid-ads',
              why: 'Synchronized search, shopping, and social advertising scaling customer acquisition.',
              keyDeliverable: 'Full-funnel campaign management with server-side CAPI event tracking.',
            },
            {
              name: 'Organic Search & Local Authority (SEO)',
              slug: 'seo',
              why: 'Compounds organic discovery and reduces blended customer acquisition cost.',
              keyDeliverable: 'Technical SEO hygiene, commercial keyword mapping, and local Google 3-Pack rank.',
            },
            {
              name: 'Marketplace Operations & Automation',
              slug: 'growth-systems',
              why: 'Bi-weekly sprints, DEZO LAB diagnostics, and transparent monthly operating cadence.',
              keyDeliverable: 'Dedicated strategic leadership access, weekly sprint calls, and unified reporting.',
            },
          ],
          timeline: 'Continuous 90-day operating sprints',
          estimatedBudget: 'Custom enterprise retainer / Scoped milestone cadence',
        };
    }
  }, [primaryGoal, businessType, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Post to contact API
      await fetch('/api/tools/probe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'growth_plan_request',
          clientName,
          businessName,
          businessType,
          location,
          websiteUrl,
          primaryGoal,
          budgetRange,
          timeline,
          preferredContact,
          contactInfo,
          planTitle: recommendation.title,
          planTier: recommendation.planTier,
        }),
      }).catch(() => null);

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-10 shadow-[6px_6px_0_0_#0B0B0A]">
      {/* Top Stepper Indicator */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b-2 border-dezo-ink">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-dezo-primary border border-dezo-ink" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-dezo-ink">
            Interactive Growth Plan Builder · [STEP 0{step} OF 04]
          </span>
        </div>
        <span className="font-mono text-xs text-dezo-text-muted">
          {step === 1 && '1. Business Context'}
          {step === 2 && '2. Growth Objectives'}
          {step === 3 && '3. Generated Blueprint'}
          {step === 4 && '4. Consultation Handoff'}
        </span>
      </div>

      {/* STEP 1: Business Profile */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink">
              Tell us about your business
            </h3>
            <p className="mt-1 text-xs font-mono text-dezo-text-secondary">
              This configures the deterministic recommendations for your sector and geographical market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Business Type / Sector:
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
              >
                <option value="Local Retailer / Store">Local Retailer / Physical Store</option>
                <option value="eCommerce & D2C Brand">eCommerce & D2C Brand</option>
                <option value="Hospital / Clinic / Healthcare">Hospital, Clinic & Healthcare</option>
                <option value="School / College / Coaching">School, College & Coaching Institute</option>
                <option value="Real Estate & Construction">Real Estate & Construction</option>
                <option value="Hotel / Resort / Tourism">Hotel, Resort & Tourism</option>
                <option value="Handloom & Handicrafts">Handloom, Handicrafts & Textiles</option>
                <option value="Manufacturing & Industrial">Manufacturing & Industrial B2B</option>
                <option value="Food Processing & Agriculture">Agriculture & Food Processing</option>
                <option value="Salon / Spa / Fitness">Salon, Spa & Fitness</option>
                <option value="Professional Services / Legal / CA">Professional Services (CA, Legal, Consulting)</option>
                <option value="Tech Startup / SaaS">Tech Startup / SaaS Product</option>
                <option value="Wholesale / Distributor">Wholesale & Export Distributor</option>
                <option value="Other Business">Other Business Category</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Primary Location:
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
              >
                <option value="Bhubaneswar">Bhubaneswar, Odisha</option>
                <option value="Cuttack">Cuttack, Odisha</option>
                <option value="Puri">Puri, Odisha</option>
                <option value="Rourkela">Rourkela, Odisha</option>
                <option value="Sambalpur">Sambalpur, Odisha</option>
                <option value="Berhampur">Berhampur, Odisha</option>
                <option value="Balasore">Balasore, Odisha</option>
                <option value="Other Odisha District">Other Odisha District</option>
                <option value="Pan-India / Metropolitan">Metropolitan India (Delhi/Mumbai/Bengaluru/Kolkata)</option>
                <option value="International / Global">International / Export Market</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Business / Brand Name:
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Acme Retail or Odisha Crafts"
                className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Existing Website URL (Optional):
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-8 py-3.5 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[4px_4px_0_0_#B08D57] inline-flex items-center gap-2"
            >
              Next: Select Primary Goal <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Objectives & Budget */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink">
              What is your primary growth goal?
            </h3>
            <p className="mt-1 text-xs font-mono text-dezo-text-secondary">
              Select the primary bottleneck your business needs resolved over the next 90 days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GOALS_LIST.map((g) => {
              const active = primaryGoal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setPrimaryGoal(g.id as GrowthGoal)}
                  className={`p-4 text-left border-2 transition-all flex flex-col justify-between ${
                    active
                      ? 'bg-dezo-primary/20 border-dezo-ink shadow-[3px_3px_0_0_#0B0B0A]'
                      : 'bg-dezo-bg border-dezo-border hover:border-dezo-ink'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-base font-bold text-dezo-ink">{g.title}</span>
                    <span
                      className={`w-4 h-4 rounded-full border border-dezo-ink flex items-center justify-center shrink-0 ml-2 ${
                        active ? 'bg-dezo-primary' : 'bg-dezo-bg'
                      }`}
                    >
                      {active && <span className="w-1.5 h-1.5 bg-dezo-ink rounded-full" />}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-dezo-text-secondary leading-snug font-mono">{g.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-dezo-border">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Estimated Monthly Budget:
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
              >
                <option value="Under ₹5,000 / month (Student & Local Dukaan)">Under ₹5,000 / month (Student & Local Dukaan)</option>
                <option value="₹5,000 - ₹15,000 / month (Local Shop Foundation)">₹5,000 - ₹15,000 / month (Local Shop Foundation)</option>
                <option value="₹15,000 - ₹35,000 / month (Growing Business)">₹15,000 - ₹35,000 / month (Growing Business)</option>
                <option value="₹35,000 - ₹75,000 / month (Scale)">₹35,000 - ₹75,000 / month (Scale)</option>
                <option value="₹75,000+ / month (Enterprise)">₹75,000+ / month (Enterprise)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Desired Launch Timeline:
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
              >
                <option value="Immediate (Within 1 to 2 weeks)">Immediate (Within 1 to 2 weeks)</option>
                <option value="Within 2 to 4 weeks">Within 2 to 4 weeks (Recommended)</option>
                <option value="Within 1 to 2 months">Within 1 to 2 months</option>
                <option value="Planning for next quarter">Planning for next quarter</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-dezo-bg text-dezo-ink font-mono text-xs uppercase tracking-wider border-2 border-dezo-ink hover:bg-dezo-bg-warm inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-8 py-3.5 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[4px_4px_0_0_#B08D57] inline-flex items-center gap-2"
            >
              Generate Recommendation <Sparkles size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Deterministic Recommendation View */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-dezo-bg border-2 border-dezo-ink p-6 sm:p-8 shadow-[4px_4px_0_0_#0B0B0A]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-dezo-border">
              <span className="font-mono text-xs font-bold text-dezo-primary uppercase tracking-wider">
                Recommended Architecture: [{recommendation.planTier} TIER]
              </span>
              <span className="font-mono text-xs text-dezo-text-muted">
                Market: {location} · Sector: {businessType}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase text-dezo-ink">
              {recommendation.title}
            </h3>
            <p className="mt-3 text-sm text-dezo-text-secondary leading-relaxed font-mono">
              {recommendation.summary}
            </p>

            {/* Recommended Services List */}
            <div className="mt-6 pt-5 border-t border-dezo-border">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-ink font-bold block mb-4">
                Recommended Service Combination:
              </span>
              <div className="space-y-4">
                {recommendation.recommendedServices.map((srv, idx) => (
                  <div key={idx} className="bg-dezo-bg-warm p-4 border-2 border-dezo-ink">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-display text-base font-bold text-dezo-ink">{srv.name}</h4>
                      <Link
                        href={`/services/${srv.slug}`}
                        target="_blank"
                        className="text-xs font-mono text-dezo-primary font-bold uppercase hover:underline inline-flex items-center gap-1"
                      >
                        Scope Details <ExternalLink size={11} />
                      </Link>
                    </div>
                    <p className="text-xs text-dezo-text-secondary mb-2 font-mono">
                      <strong>Why Recommended:</strong> {srv.why}
                    </p>
                    <div className="text-xs font-mono text-dezo-ink bg-dezo-bg p-2 border border-dezo-border">
                      <strong className="text-dezo-primary">Key Deliverable:</strong> {srv.keyDeliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline and Cost Estimate */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-dezo-border">
              <div className="p-3 bg-dezo-bg-warm border border-dezo-ink">
                <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-text-muted block">
                  Target Timeline:
                </span>
                <span className="font-mono text-xs font-bold text-dezo-ink">{recommendation.timeline}</span>
              </div>
              <div className="p-3 bg-dezo-bg-warm border border-dezo-ink">
                <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-text-muted block">
                  Indicative Scope Tier:
                </span>
                <span className="font-mono text-xs font-bold text-dezo-primary">{recommendation.estimatedBudget}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-dezo-bg text-dezo-ink font-mono text-xs uppercase tracking-wider border-2 border-dezo-ink hover:bg-dezo-bg-warm inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Adjust Goals
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-8 py-3.5 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-white transition-all shadow-[4px_4px_0_0_#0B0B0A] inline-flex items-center gap-2"
            >
              Proceed to Scoped Quotation <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Consultation Handoff / Submission */}
      {step === 4 && (
        <div>
          {submitted ? (
            <div className="bg-dezo-bg border-2 border-dezo-ink p-8 text-center shadow-[4px_4px_0_0_#0B0B0A]">
              <div className="w-12 h-12 bg-dezo-primary text-dezo-ink border-2 border-dezo-ink rounded-none flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-dezo-ink">
                Growth Blueprint Submitted Successfully
              </h3>
              <p className="mt-2 text-xs font-mono text-dezo-text-secondary max-w-lg mx-auto">
                Thank you, {clientName || 'Partner'}. Tarik Islam and our engineering team will review your business
                context ({businessType} in {location}) and contact you via {preferredContact} within 24 hours.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-2.5 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink"
                >
                  Return to Homepage
                </Link>
                <Link
                  href="/work"
                  className="px-6 py-2.5 bg-dezo-bg text-dezo-ink font-mono text-xs uppercase tracking-wider border-2 border-dezo-ink hover:bg-dezo-bg-warm"
                >
                  Explore Live Portfolio
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink">
                  Lock In Your Growth Plan Consultation
                </h3>
                <p className="mt-1 text-xs font-mono text-dezo-text-secondary">
                  Provide your contact details to receive a detailed milestone quotation and scheduled strategy call.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Rajesh Mohanty"
                    className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                    Preferred Contact Channel:
                  </label>
                  <div className="flex gap-2">
                    {(['WhatsApp', 'Phone', 'Email'] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setPreferredContact(ch)}
                        className={`flex-1 py-3 text-xs font-mono uppercase border-2 transition-all ${
                          preferredContact === ch
                            ? 'bg-dezo-primary text-dezo-ink border-dezo-ink font-bold shadow-[2px_2px_0_0_#0B0B0A]'
                            : 'bg-dezo-bg text-dezo-text-secondary border-dezo-border'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                    {preferredContact === 'Email' ? 'Work Email Address:' : `${preferredContact} Phone Number:`}
                  </label>
                  <input
                    type={preferredContact === 'Email' ? 'email' : 'tel'}
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={
                      preferredContact === 'Email' ? 'you@company.com' : '+91 91144 11026'
                    }
                    className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  />
                </div>
              </div>

              <div className="p-4 bg-dezo-bg border border-dezo-border text-[11px] font-mono text-dezo-text-muted flex items-start gap-2">
                <ShieldCheck size={14} className="text-dezo-primary shrink-0 mt-0.5" />
                <span>
                  Privacy Guaranteed: Your phone and email are never shared or spammed. Used strictly by DEZO
                  for project communication and milestone scoping.
                </span>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-dezo-bg text-dezo-ink font-mono text-xs uppercase tracking-wider border-2 border-dezo-ink hover:bg-dezo-bg-warm inline-flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Back to Blueprint
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[4px_4px_0_0_#B08D57] inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit & Book Strategy Call'} <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

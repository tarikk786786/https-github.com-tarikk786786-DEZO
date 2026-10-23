'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Send,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

interface SelectorRecommendation {
  title: string;
  engagementTier: string;
  summary: string;
  recommendedServices: { name: string; slug: string; why: string; deliverable: string }[];
  primaryChannel: string;
  estimatedTimeline: string;
}

export function EcommerceServiceSelector() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // 12 Diagnostic Answers
  const [sellingStatus, setSellingStatus] = useState<'not-yet' | 'amazon' | 'flipkart' | 'own-store' | 'multiple'>('amazon');
  const [needWebsite, setNeedWebsite] = useState<'shopify' | 'nextjs' | 'woocommerce' | 'marketplaces-only'>('shopify');
  const [amazonStatus, setAmazonStatus] = useState<'active' | 'launch-soon' | 'not-interested'>('active');
  const [flipkartStatus, setFlipkartStatus] = useState<'active' | 'launch-soon' | 'not-interested'>('launch-soon');
  const [productCategory, setProductCategory] = useState('Beauty, Personal Care & Cosmetics');
  const [skuCount, setSkuCount] = useState('11 to 50 SKUs');
  const [primaryGoal, setPrimaryGoal] = useState<'launch' | 'optimize-listings' | 'scale-ads' | 'diagnose-sales' | 'omnichannel'>('scale-ads');
  const [mainChallenge, setMainChallenge] = useState('High ACoS and bleeding advertising spend');
  const [adsExperience, setAdsExperience] = useState<'running-profitable' | 'running-bleeding' | 'never-run'>('running-bleeding');
  const [engagementType, setEngagementType] = useState<'one-time-audit' | 'onboarding-setup' | 'monthly-management' | 'omnichannel-retainer'>('monthly-management');
  const [approxBudget, setApproxBudget] = useState('₹35,000 - ₹75,000 / month');
  const [contactName, setContactName] = useState('');
  const [contactWhatsApp, setContactWhatsApp] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Deterministic Recommendation Engine
  const recommendation = useMemo<SelectorRecommendation>(() => {
    if (primaryGoal === 'launch' || sellingStatus === 'not-yet') {
      return {
        title: 'New Seller Onboarding & Marketplace Launch Engine',
        engagementTier: 'Seller Launch & Catalog Onboarding',
        summary: `Tailored for a brand launching ${productCategory} with ${skuCount}. Focuses on establishing clean brand credentials, approved catalog listings, and compliant initial inventory.`,
        recommendedServices: [
          {
            name: 'Amazon India Marketplace Growth',
            slug: 'amazon',
            why: 'Sets up Seller Central, Brand Registry, and indexable listing architecture.',
            deliverable: 'Up to 20 optimized ASIN listings, GTIN exemption, and initial shipping profiles.',
          },
          {
            name: 'Flipkart Seller Growth & Catalog Operations',
            slug: 'flipkart',
            why: 'Captures Tier 2/3 regional demand with high Listing Quality Score attributes.',
            deliverable: 'Bulk Excel catalog preparation and category approval submission.',
          },
        ],
        primaryChannel: 'Amazon India + Flipkart Dual Launch',
        estimatedTimeline: '2 to 3 weeks to first live buyable ASINs',
      };
    }

    if (primaryGoal === 'scale-ads' || adsExperience === 'running-bleeding') {
      return {
        title: 'Marketplace Ad Efficiency & ACoS Compression Retainer',
        engagementTier: 'Full-Service Marketplace Growth Retainer',
        summary: `Designed to resolve "${mainChallenge}" for ${productCategory}. Replaces automated ad waste with disciplined negative keyword harvesting, target ACoS caps, and search rank recovery.`,
        recommendedServices: [
          {
            name: 'Amazon Sponsored Ads (PPC) Architecture',
            slug: 'amazon',
            why: 'Restructures ad campaigns into exact, phrase, and product defense tiers to lower ACoS.',
            deliverable: 'Weekly search-term negative harvesting, bid pruning, and bi-weekly TACoS reporting.',
          },
          {
            name: 'Listing Optimization & Conversion Copy',
            slug: 'amazon',
            why: 'High ad spend cannot convert if titles, bullets, and main images fail buyer scrutiny.',
            deliverable: 'Revised high-converting titles, benefit bullets, and mobile-optimized A+ content.',
          },
        ],
        primaryChannel: 'Amazon Sponsored Products & Flipkart PLA',
        estimatedTimeline: 'Immediate audit in week 1; weekly sprint optimization thereafter',
      };
    }

    if (primaryGoal === 'omnichannel' || needWebsite !== 'marketplaces-only') {
      return {
        title: 'Integrated D2C Storefront + Marketplace Engine',
        engagementTier: 'Integrated eCommerce & Marketplace Growth Retainer',
        summary: `Combines a high-speed independent online store (${needWebsite === 'nextjs' ? 'Custom Next.js' : 'Shopify'}) with active Amazon and Flipkart marketplace distribution.`,
        recommendedServices: [
          {
            name: 'Shopify / Next.js eCommerce Development',
            slug: 'shopify-development',
            why: 'Establishes direct customer data ownership, zero referral fees, and brand authority.',
            deliverable: 'Full mobile-optimized storefront with UPI checkout, Razorpay, and Shiprocket sync.',
          },
          {
            name: 'Marketplace Operations Coordination',
            slug: 'marketplace-growth',
            why: 'Synchronizes product pricing, inventory data, and brand storytelling across channels.',
            deliverable: 'Centralized catalog workflow and multi-channel performance telemetry.',
          },
        ],
        primaryChannel: 'Direct D2C Store + Amazon + Flipkart',
        estimatedTimeline: '4 to 6 weeks phased deployment',
      };
    }

    // Default: Diagnostic & Listing Recovery
    return {
      title: 'Marketplace Diagnostic & Listing Quality Recovery',
      engagementTier: 'Marketplace Growth Diagnostic & Listing Audit',
      summary: `Forensic audit addressing "${mainChallenge}" across your ${skuCount} catalog. Pinpoints exact search suppression, attribute gaps, and margin leaks.`,
      recommendedServices: [
        {
          name: 'Forensic Marketplace Listing Audit',
          slug: 'amazon',
          why: 'Discovers why listings lost organic visibility or suffer from low conversion.',
          deliverable: 'Comprehensive 25-ASIN audit report with step-by-step remediation roadmap.',
        },
        {
          name: 'Unit Economics & Margin Calibration',
          slug: 'marketplace-growth',
          why: 'Ensures referral fees, closing fees, and return allowances are not consuming gross profit.',
          deliverable: 'Product-level contribution margin spreadsheet with break-even TACoS benchmarks.',
        },
      ],
      primaryChannel: 'Amazon India / Flipkart Catalog',
      estimatedTimeline: '5 to 7 business days from access',
    };
  }, [primaryGoal, sellingStatus, productCategory, skuCount, mainChallenge, adsExperience, needWebsite]);

  const whatsappMessage = useMemo(() => {
    return encodeURIComponent(
      `Hi DEZO Marketplace Team,\n\n` +
      `I used the DEZO eCommerce Growth Selector on dezo.in:\n` +
      `• Business Category: ${productCategory}\n` +
      `• Catalog Size: ${skuCount}\n` +
      `• Selling Status: ${sellingStatus}\n` +
      `• Amazon Status: ${amazonStatus} | Flipkart: ${flipkartStatus}\n` +
      `• Primary Goal: ${primaryGoal}\n` +
      `• Main Challenge: ${mainChallenge}\n` +
      `• Recommended Tier: ${recommendation.engagementTier}\n` +
      `• Budget Range: ${approxBudget}\n\n` +
      `Applicant Name: ${contactName || 'Interested Seller'}\n` +
      `Phone/WhatsApp: ${contactWhatsApp || 'Provided via chat'}\n\n` +
      `Please let me know your availability for a marketplace growth review.`
    );
  }, [
    productCategory,
    skuCount,
    sellingStatus,
    amazonStatus,
    flipkartStatus,
    primaryGoal,
    mainChallenge,
    recommendation.engagementTier,
    approxBudget,
    contactName,
    contactWhatsApp,
  ]);

  return (
    <div className="w-full bg-dezo-bg border border-dezo-border p-6 sm:p-10 shadow-dezo-card" id="growth-selector">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Sparkles size={13} className="text-dezo-primary" />
            <span>Interactive Diagnostic Engine</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            eCommerce & Marketplace Growth Selector
          </h3>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            Answer a few quick questions about your selling status, product catalog, and main hurdles to receive an exact tailored service blueprint.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-xs text-dezo-text-muted uppercase tracking-wider block">
            Progress
          </span>
          <span className="font-display text-2xl font-black text-dezo-primary">
            Step {step} of 4
          </span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 my-6">
        {[
          '1. Channel Status',
          '2. Catalog & Category',
          '3. Goals & Hurdles',
          '4. Tailored Blueprint',
        ].map((sName, i) => (
          <div
            key={i}
            className={`py-2 px-3 text-center text-[11px] font-mono uppercase tracking-wider border-2 transition-all ${
              step === i + 1
                ? 'bg-dezo-ink text-dezo-bg border-dezo-ink font-bold'
                : step > i + 1
                ? 'bg-dezo-primary/20 text-dezo-ink border-dezo-ink'
                : 'bg-dezo-bg-warm text-dezo-text-muted border-dezo-border'
            }`}
          >
            {sName}
          </div>
        ))}
      </div>

      {/* STEP 1: Channels */}
      {step === 1 && (
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-primary font-bold mb-2">
              Question 01: Do you currently sell online?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'not-yet', label: 'Not Yet Selling', desc: 'Planning first online launch' },
                { id: 'amazon', label: 'Active on Amazon', desc: 'Currently have an active Seller account' },
                { id: 'multiple', label: 'Multiple Channels', desc: 'Selling on Amazon, Flipkart, or D2C store' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSellingStatus(opt.id as any)}
                  className={`p-4 text-left border-2 transition-all cursor-pointer ${
                    sellingStatus === opt.id
                      ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-xs'
                      : 'bg-dezo-bg-warm text-dezo-ink border-dezo-ink/40 hover:border-dezo-ink'
                  }`}
                >
                  <p className="font-display text-sm font-bold uppercase">{opt.label}</p>
                  <p className="text-xs text-dezo-text-muted mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Question 02: Status on Amazon India
              </label>
              <select
                value={amazonStatus}
                onChange={(e) => setAmazonStatus(e.target.value as any)}
                className="w-full p-3 bg-dezo-bg-warm border border-dezo-border font-mono text-xs text-dezo-ink cursor-pointer"
              >
                <option value="active">Active Seller (Have listings live)</option>
                <option value="launch-soon">Planning to launch on Amazon soon</option>
                <option value="not-interested">Not looking to sell on Amazon</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Question 03: Status on Flipkart
              </label>
              <select
                value={flipkartStatus}
                onChange={(e) => setFlipkartStatus(e.target.value as any)}
                className="w-full p-3 bg-dezo-bg-warm border border-dezo-border font-mono text-xs text-dezo-ink cursor-pointer"
              >
                <option value="launch-soon">Planning to onboard on Flipkart</option>
                <option value="active">Active Seller on Flipkart Seller Hub</option>
                <option value="not-interested">Not looking to sell on Flipkart</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
              Question 04: Do you need an independent eCommerce website?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'shopify', label: 'Shopify Store' },
                { id: 'nextjs', label: 'Custom Next.js' },
                { id: 'woocommerce', label: 'WooCommerce' },
                { id: 'marketplaces-only', label: 'Marketplaces Only' },
              ].map((plat) => (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() => setNeedWebsite(plat.id as any)}
                  className={`p-3 text-center border-2 transition-all cursor-pointer text-xs font-mono font-bold ${
                    needWebsite === plat.id
                      ? 'bg-dezo-primary text-dezo-ink border-dezo-ink shadow-xs'
                      : 'bg-dezo-bg-warm text-dezo-text-secondary border-dezo-border hover:border-dezo-ink'
                  }`}
                >
                  {plat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-all flex items-center gap-2 border border-dezo-ink cursor-pointer"
            >
              Continue to Catalog Details <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Catalog & Category */}
      {step === 2 && (
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-primary font-bold mb-2">
              Question 05: Primary Product Category
            </label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full p-3 bg-dezo-bg-warm border border-dezo-border font-mono text-xs text-dezo-ink cursor-pointer"
            >
              <option value="Handloom, Sarees & Ethnic Textiles">Handloom, Sarees & Ethnic Textiles (Sambalpuri, Silk, Cotton)</option>
              <option value="Beauty, Personal Care & Cosmetics">Beauty, Personal Care & Cosmetics (Herbal, Skin, Hair)</option>
              <option value="Packaged Foods, Spices & Groceries">Packaged Foods, Spices & Groceries (Mustard Oil, Turmeric, Snacks)</option>
              <option value="Handicrafts, Brass, Stone & Terracotta Art">Handicrafts, Brass, Stone & Terracotta Art (Dhokra, Pattachitra)</option>
              <option value="Fashion, Apparel & Footwear">Fashion, Apparel & Footwear (Western, Ethnic, Uniforms)</option>
              <option value="Consumer Electronics & Home Appliances">Consumer Electronics & Home Appliances (LEDs, Accessories)</option>
              <option value="Ayurveda, Herbal & Wellness Products">Ayurveda, Herbal & Wellness Products (Extracts, Supplements)</option>
              <option value="B2B, Industrial & Wholesale Manufacturing">B2B, Industrial & Wholesale Manufacturing (Packaging, Tools)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
              Question 06: How many products/SKUs require management?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['1 to 10 SKUs', '11 to 50 SKUs', '51 to 200 SKUs', '200+ Catalog SKUs'].map((sku) => (
                <button
                  key={sku}
                  type="button"
                  onClick={() => setSkuCount(sku)}
                  className={`p-3 text-center border-2 transition-all cursor-pointer text-xs font-mono font-bold ${
                    skuCount === sku
                      ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-xs'
                      : 'bg-dezo-bg-warm text-dezo-text-secondary border-dezo-border hover:border-dezo-ink'
                  }`}
                >
                  {sku}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
              Question 07: Marketplace Advertising Experience
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'never-run', label: 'Never Run Ads', desc: 'Looking to start Sponsored Ads safely' },
                { id: 'running-bleeding', label: 'Running, but Bleeding', desc: 'High ACoS, low ROAS, wasted spend' },
                { id: 'running-profitable', label: 'Running & Scaling', desc: 'Want disciplined scaling and TACoS control' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAdsExperience(opt.id as any)}
                  className={`p-4 text-left border-2 transition-all cursor-pointer ${
                    adsExperience === opt.id
                      ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-xs'
                      : 'bg-dezo-bg-warm text-dezo-ink border-dezo-ink/40 hover:border-dezo-ink'
                  }`}
                >
                  <p className="font-display text-xs font-bold uppercase">{opt.label}</p>
                  <p className="text-[11px] text-dezo-text-muted mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 bg-dezo-bg-warm border border-dezo-ink font-mono text-xs uppercase tracking-wider font-bold text-dezo-ink hover:bg-white flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-all flex items-center gap-2 border border-dezo-ink cursor-pointer"
            >
              Continue to Goals & Obstacles <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Goals & Obstacles */}
      {step === 3 && (
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-primary font-bold mb-2">
              Question 08: What is your primary business objective right now?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'scale-ads', label: 'Lower ACoS & Scale Ad Spend', desc: 'Prune wasted search terms and improve ROAS' },
                { id: 'optimize-listings', label: 'Improve Listings & A+ Content', desc: 'Rewrite titles, bullets, and design rich brand story' },
                { id: 'diagnose-sales', label: 'Diagnose Declining / Plateaued Sales', desc: 'Find why organic impressions dropped or listings are suppressed' },
                { id: 'omnichannel', label: 'Connect Website + Amazon + Flipkart', desc: 'Build an integrated multi-channel eCommerce sales engine' },
                { id: 'launch', label: 'Launch New Account / Brand Onboarding', desc: 'Complete registration, GTIN exemption, and initial listings' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setPrimaryGoal(g.id as any)}
                  className={`p-3.5 text-left border-2 transition-all cursor-pointer ${
                    primaryGoal === g.id
                      ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-xs'
                      : 'bg-dezo-bg-warm text-dezo-ink border-dezo-ink/40 hover:border-dezo-ink'
                  }`}
                >
                  <p className="font-display text-xs font-bold uppercase">{g.label}</p>
                  <p className="text-[11px] text-dezo-text-muted mt-1">{g.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
              Question 09: What is your biggest daily operational headache?
            </label>
            <select
              value={mainChallenge}
              onChange={(e) => setMainChallenge(e.target.value)}
              className="w-full p-3 bg-dezo-bg-warm border border-dezo-border font-mono text-xs text-dezo-ink cursor-pointer"
            >
              <option value="High ACoS and bleeding advertising spend">High ACoS and bleeding advertising spend</option>
              <option value="Low search impressions and poor organic keyword rank">Low search impressions and poor organic keyword rank</option>
              <option value="Suppressed listings and missing catalog attributes (LQS)">Suppressed listings and missing catalog attributes (LQS)</option>
              <option value="High return rates (RTO) and damaged transit packaging">High return rates (RTO) and damaged transit packaging</option>
              <option value="Stockouts causing Amazon ranking and Buy Box loss">Stockouts causing Amazon ranking and Buy Box loss</option>
              <option value="Lack of time to manage daily bids and customer Q&As">Lack of time to manage daily bids and customer Q&As</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Question 10: Engagement Model Preference
              </label>
              <select
                value={engagementType}
                onChange={(e) => setEngagementType(e.target.value as any)}
                className="w-full p-3 bg-dezo-bg-warm border border-dezo-border font-mono text-xs text-dezo-ink cursor-pointer"
              >
                <option value="monthly-management">Monthly Ongoing Growth Retainer</option>
                <option value="one-time-audit">One-Time Forensic Audit & Diagnostic</option>
                <option value="onboarding-setup">Turnkey Seller Launch & Setup Project</option>
                <option value="omnichannel-retainer">Integrated D2C + Marketplace Retainer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Question 11: Approximate Monthly Growth Budget
              </label>
              <select
                value={approxBudget}
                onChange={(e) => setApproxBudget(e.target.value)}
                className="w-full p-3 bg-dezo-bg-warm border border-dezo-border font-mono text-xs text-dezo-ink cursor-pointer"
              >
                <option value="₹25,000 - ₹50,000 / month">₹25,000 - ₹50,000 / month</option>
                <option value="₹50,000 - ₹1,00,000 / month">₹50,000 - ₹1,00,000 / month</option>
                <option value="₹1,00,000 - ₹2,50,000 / month">₹1,00,000 - ₹2,50,000 / month</option>
                <option value="₹2,50,000+ / month (Enterprise)">₹2,50,000+ / month (Enterprise)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-dezo-bg-warm border border-dezo-ink font-mono text-xs uppercase tracking-wider font-bold text-dezo-ink hover:bg-white flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-3 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-all flex items-center gap-2 border border-dezo-border cursor-pointer shadow-dezo-card"
            >
              Generate Tailored Blueprint <Sparkles size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Output Blueprint */}
      {step === 4 && (
        <div className="space-y-8 py-4">
          <div className="bg-dezo-bg-warm border border-dezo-border p-6 sm:p-8 shadow-dezo-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-dezo-ink/15">
              <div>
                <span className="px-2.5 py-0.5 bg-dezo-primary/20 border border-dezo-ink text-[11px] font-mono uppercase tracking-wider text-dezo-ink font-bold">
                  Recommended Model: {recommendation.engagementTier}
                </span>
                <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-dezo-ink mt-2">
                  {recommendation.title}
                </h4>
              </div>
              <span className="text-xs font-mono bg-dezo-ink text-dezo-bg px-3 py-1 font-bold">
                Timeline: {recommendation.estimatedTimeline}
              </span>
            </div>

            <p className="mt-4 text-sm font-mono text-dezo-text-secondary leading-relaxed">
              {recommendation.summary}
            </p>

            {/* Recommended Services List */}
            <div className="mt-6 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block font-bold">
                Recommended Service Architecture
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.recommendedServices.map((srv, idx) => (
                  <div key={idx} className="bg-dezo-bg border border-dezo-border p-5 shadow-xs">
                    <h5 className="font-display text-lg font-bold uppercase text-dezo-ink mb-1">
                      {srv.name}
                    </h5>
                    <p className="text-xs font-mono text-dezo-text-secondary mb-3 leading-relaxed">
                      <strong>Why Recommended:</strong> {srv.why}
                    </p>
                    <div className="p-2.5 bg-dezo-bg-warm border border-dezo-border text-[11px] font-mono text-dezo-text-primary">
                      <strong>Primary Deliverable:</strong> {srv.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-dezo-bg border border-dezo-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div>
                <span className="text-dezo-text-muted">Primary Channel Focus:</span>{' '}
                <strong className="text-dezo-ink">{recommendation.primaryChannel}</strong>
              </div>
              <div>
                <span className="text-dezo-text-muted">Target Category:</span>{' '}
                <strong className="text-dezo-ink">{productCategory.split('(')[0]}</strong>
              </div>
              <div>
                <span className="text-dezo-text-muted">Catalog Scale:</span>{' '}
                <strong className="text-dezo-ink">{skuCount}</strong>
              </div>
            </div>
          </div>

          {/* Action Box: Direct WhatsApp or Intake Submission */}
          <div className="bg-dezo-ink text-dezo-bg border border-dezo-border p-6 sm:p-8 shadow-dezo-card">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2 font-bold">
                Next Step: Lock in Your Scope
              </span>
              <h4 className="font-display text-2xl font-bold uppercase text-white mb-2">
                Discuss Your Customized Marketplace Scope
              </h4>
              <p className="text-xs font-mono text-gray-300 leading-relaxed mb-6">
                Connect directly with DEZO’s marketplace specialists in Bhubaneswar. We will review your product catalog, evaluate your current listings, and prepare a written scope breakdown.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name / Business"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-700 text-xs font-mono text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="WhatsApp Phone Number"
                    value={contactWhatsApp}
                    onChange={(e) => setContactWhatsApp(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-700 text-xs font-mono text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-700 text-xs font-mono text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`https://wa.me/919114411026?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-all flex items-center justify-center gap-2 border border-black shadow-xs"
                >
                  <MessageSquare size={14} /> Send Blueprint via WhatsApp →
                </a>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-transparent border border-gray-600 text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={12} /> Edit Diagnostic Answers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

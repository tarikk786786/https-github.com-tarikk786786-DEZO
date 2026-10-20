'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info,
  ShieldCheck,
  MessageSquare,
  RefreshCw,
  Clock,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

interface CalculationResult {
  basePrice: number;
  addOnPrice: number;
  totalLow: number;
  totalHigh: number;
  recommendedPackage: 'LAUNCH' | 'BUSINESS' | 'GROW' | 'COMMERCE' | 'CUSTOM';
  timeline: string;
  scopeAssumptions: string[];
  includedDeliverables: string[];
  exclusions: string[];
}

export function WebsiteProjectEstimator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // 1. Website Type
  const [websiteType, setWebsiteType] = useState('simple-business');
  // 2. Page Count
  const [pageCount, setPageCount] = useState<'1' | '2-5' | '6-10' | '11-20' | '20+'>('2-5');
  // 3. Design Preference
  const [designTier, setDesignTier] = useState<'framework' | 'bespoke'>('framework');
  // 4. Functionalities (Multi-select)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'whatsapp-chat',
    'contact-form',
  ]);
  // 5. Integrations (Multi-select)
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    'ga4-gsc',
  ]);
  // 6. Content Creation
  const [contentCreation, setContentCreation] = useState<'client' | 'dezo-copy'>('client');
  // 7. Product Count (eCommerce)
  const [productCount, setProductCount] = useState<'none' | '1-20' | '21-50' | '50+'>('none');
  // 8. Maintenance Preference
  const [maintenance, setMaintenance] = useState<'handover' | 'monthly-retainer'>('handover');
  // 9. Timeline
  const [desiredTimeline, setDesiredTimeline] = useState<'standard' | 'urgent'>('standard');
  // 10. Available Budget
  const [userBudget, setUserBudget] = useState('₹15,000 - ₹35,000');

  // Contact State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectName, setProjectName] = useState('');

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleIntegration = (id: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Deterministic Calculation Engine
  const result = useMemo<CalculationResult>(() => {
    let base = 14999;
    let pkg: 'LAUNCH' | 'BUSINESS' | 'GROW' | 'COMMERCE' | 'CUSTOM' = 'BUSINESS';
    let timelineWeeks = '2 to 3 weeks';
    let scopeNotes: string[] = [];

    // Base price by website type
    switch (websiteType) {
      case 'student-dukaan':
        base = 2499;
        pkg = 'LAUNCH';
        timelineWeeks = desiredTimeline === 'urgent' ? '24 to 48 hours' : '2 to 4 business days';
        scopeNotes.push('Subsidized Student Portfolio or Local Shop Digital Storefront with WhatsApp actions');
        break;
      case 'landing-page':
        base = 2999;
        pkg = 'LAUNCH';
        timelineWeeks = desiredTimeline === 'urgent' ? '24 to 48 hours' : '2 to 4 business days';
        scopeNotes.push('Single focused high-converting landing page');
        break;
      case 'simple-business':
        base = 4999;
        pkg = 'BUSINESS';
        timelineWeeks = desiredTimeline === 'urgent' ? '3 to 5 days' : '5 to 7 business days';
        scopeNotes.push('Up to 5 custom-designed business pages');
        break;
      case 'corporate':
        base = 17999;
        pkg = 'GROW';
        timelineWeeks = desiredTimeline === 'urgent' ? '7 to 10 days' : '2 to 3 weeks';
        scopeNotes.push('Up to 10-12 structured corporate pages with CMS');
        break;
      case 'shopify-store':
        base = 11999;
        pkg = 'COMMERCE';
        timelineWeeks = desiredTimeline === 'urgent' ? '5 to 7 days' : '7 to 10 business days';
        scopeNotes.push('Complete Shopify 2.0 store with Indian payment gateway & COD');
        break;
      case 'woocommerce':
        base = 13999;
        pkg = 'COMMERCE';
        timelineWeeks = desiredTimeline === 'urgent' ? '7 to 10 days' : '10 to 14 business days';
        scopeNotes.push('WooCommerce online store with custom checkout & UPI payment');
        break;
      case 'booking-site':
        base = 11999;
        pkg = 'GROW';
        timelineWeeks = '7 to 10 business days';
        scopeNotes.push('Interactive time-slot booking engine with doctor/staff schedules');
        break;
      case 'real-estate':
        base = 24999;
        pkg = 'GROW';
        timelineWeeks = '2 to 3 weeks';
        scopeNotes.push('Property project showcase with floor plans & brochure gates');
        break;
      case 'lms-platform':
        base = 39999;
        pkg = 'CUSTOM';
        timelineWeeks = '3 to 5 weeks';
        scopeNotes.push('Video lesson player, student login, quizzes, and certificates');
        break;
      case 'marketplace':
        base = 69999;
        pkg = 'CUSTOM';
        timelineWeeks = '4 to 6 weeks';
        scopeNotes.push('Multi-vendor initial MVP: vendor dashboards & split checkouts');
        break;
      case 'custom-saas':
        base = 69999;
        pkg = 'CUSTOM';
        timelineWeeks = '4 to 6 weeks';
        scopeNotes.push('Full-stack Next.js App Router MVP with Supabase auth & billing');
        break;
      case 'speed-optimization':
        base = 1499;
        pkg = 'LAUNCH';
        timelineWeeks = '2 to 3 business days';
        scopeNotes.push('Core Web Vitals performance remediation and script optimization');
        break;
      default:
        base = 4999;
        pkg = 'BUSINESS';
        break;
    }

    // Add-on cost calculations
    let addOns = 0;

    // Page count adjustments
    if (pageCount === '6-10' && websiteType !== 'corporate' && websiteType !== 'lms-platform') {
      addOns += 8000;
      if (pkg === 'LAUNCH' || pkg === 'BUSINESS') pkg = 'GROW';
    } else if (pageCount === '11-20') {
      addOns += 16000;
      pkg = 'GROW';
    } else if (pageCount === '20+') {
      addOns += 30000;
      pkg = 'CUSTOM';
    }

    // Design tier
    if (designTier === 'bespoke') {
      addOns += 10000;
      scopeNotes.push('Bespoke custom UI/UX design system in Figma with moodboards');
    }

    // Functionality add-ons
    if (selectedFeatures.includes('payment-gateway') && !['shopify-store', 'woocommerce', 'marketplace', 'custom-saas'].includes(websiteType)) {
      addOns += 5000;
      scopeNotes.push('Indian payment gateway integration (Razorpay/UPI)');
    }
    if (selectedFeatures.includes('cod-otp') && !['shopify-store', 'woocommerce'].includes(websiteType)) {
      addOns += 4000;
      scopeNotes.push('Cash on Delivery OTP verification workflow');
    }
    if (selectedFeatures.includes('booking-engine') && websiteType !== 'booking-site') {
      addOns += 8000;
      scopeNotes.push('Interactive booking calendar with automated SMS/email alerts');
    }
    if (selectedFeatures.includes('user-portal') && !['lms-platform', 'marketplace', 'custom-saas'].includes(websiteType)) {
      addOns += 20000;
      pkg = 'CUSTOM';
      scopeNotes.push('Secure user authentication & private dashboard');
    }

    // Content Creation
    if (contentCreation === 'dezo-copy') {
      const copyFee = pageCount === '1' ? 3000 : pageCount === '2-5' ? 6000 : 12000;
      addOns += copyFee;
      scopeNotes.push(`Professional marketing copywriting for ${pageCount} pages`);
    }

    // eCommerce Product additions
    if (productCount === '21-50' && ['shopify-store', 'woocommerce'].includes(websiteType)) {
      addOns += 4000;
    } else if (productCount === '50+' && ['shopify-store', 'woocommerce'].includes(websiteType)) {
      addOns += 9000;
    }

    // Maintenance
    if (maintenance === 'monthly-retainer') {
      scopeNotes.push('Optional Monthly Website Maintenance: ₹2,999/month (billed separately)');
    }

    // Urgency surcharge
    if (desiredTimeline === 'urgent') {
      addOns += Math.round(base * 0.2);
    }

    const totalEstimate = base + addOns;
    const totalLow = totalEstimate;
    const totalHigh = Math.round(totalEstimate * 1.25);

    const deliverables = [
      'Mobile-responsive layout tested on iOS, Android, and Desktop browsers',
      'Contact forms with email alerts & official WhatsApp click-to-chat links',
      'Technical SEO baseline: Title tags, meta descriptions, XML sitemap, and schema',
      'Google Analytics 4 & Google Search Console integration',
      '10-point Quality Assurance (QA) audit before cutover',
      '30-day post-launch covered-defect fix warranty',
      '100% full source-code ownership transferred upon completion',
    ];

    const exclusions = [
      'Domain registration and third-party hosting fees (billed directly to client)',
      'Third-party paid plugin or theme recurring licenses',
      'Third-party SMS/WhatsApp API balance charges (if applicable)',
      'Advertising media spend (paid directly to Google/Meta/Amazon)',
    ];

    return {
      basePrice: base,
      addOnPrice: addOns,
      totalLow,
      totalHigh,
      recommendedPackage: pkg,
      timeline: timelineWeeks,
      scopeAssumptions: scopeNotes,
      includedDeliverables: deliverables,
      exclusions,
    };
  }, [
    websiteType,
    pageCount,
    designTier,
    selectedFeatures,
    selectedIntegrations,
    contentCreation,
    productCount,
    maintenance,
    desiredTimeline,
  ]);

  // Formatted WhatsApp URL
  const whatsappUrl = useMemo(() => {
    const rawMsg =
      `Hello DEZO Team, I want to build a website.\n\n` +
      `Website type: ${websiteType}\n` +
      `Business or project name: ${projectName || 'Not specified'}\n` +
      `Approximate page count: ${pageCount}\n` +
      `Design preference: ${designTier === 'bespoke' ? 'Bespoke Figma UI/UX' : 'Clean Framework Theme'}\n` +
      `Required features: ${selectedFeatures.join(', ')}\n` +
      `Estimated budget range: ₹${result.totalLow.toLocaleString('en-IN')} - ₹${result.totalHigh.toLocaleString('en-IN')}\n` +
      `Preferred timeline: ${desiredTimeline}\n` +
      `Client Name: ${clientName || 'Website Owner'}\n` +
      `Phone/WhatsApp: ${clientPhone || 'Shared via chat'}\n\n` +
      `Please confirm scope, included deliverables, and initial milestone plan.`;

    return `https://wa.me/919114411026?text=${encodeURIComponent(rawMsg)}`;
  }, [
    websiteType,
    projectName,
    pageCount,
    designTier,
    selectedFeatures,
    result.totalLow,
    result.totalHigh,
    desiredTimeline,
    clientName,
    clientPhone,
  ]);

  return (
    <div className="w-full bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-10 shadow-[6px_6px_0_0_#0B0B0A]" id="calculator">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Calculator size={13} className="text-dezo-primary" />
            <span>Transparent Scope & Budget Calculator</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            Calculate Your Website Project Cost
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            Select your required website type, feature stack, and design depth. Our deterministic rules engine provides an honest scope estimate and recommended package.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-xs text-dezo-text-muted uppercase tracking-wider block">
            Step Progress
          </span>
          <span className="font-display text-2xl font-black text-dezo-primary">
            Step {step} of 4
          </span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 my-6">
        {[
          '1. Website Type',
          '2. Scope & Pages',
          '3. Features & Add-ons',
          '4. Scoped Estimate',
        ].map((sName, i) => (
          <div
            key={i}
            className={`py-2 px-3 text-center text-[11px] font-mono uppercase tracking-wider border-2 transition-all ${
              step === i + 1
                ? 'bg-dezo-ink text-dezo-bg border-dezo-ink font-bold'
                : step > i + 1
                ? 'bg-dezo-primary/20 text-dezo-ink border-dezo-ink'
                : 'bg-white text-dezo-text-muted border-dezo-border'
            }`}
          >
            {sName}
          </div>
        ))}
      </div>

      {/* STEP 1: Website Type */}
      {step === 1 && (
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-primary font-bold mb-3">
              Select Your Core Website Type:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'student-dukaan', name: 'Student Resume / Local Dukaan Store', starting: '₹2,499', desc: '1-page mobile site with WhatsApp orders/CV and free lifelong hosting' },
                { id: 'simple-business', name: 'Simple Business Website', starting: '₹4,999', desc: 'Up to 5 pages for local shops, clinics & SMBs' },
                { id: 'landing-page', name: 'Campaign Landing Page', starting: '₹2,999', desc: 'Single high-converting page for paid ads & offers' },
                { id: 'shopify-store', name: 'Shopify Starter D2C Store', starting: '₹11,999', desc: 'eCommerce with UPI checkout & Shiprocket' },
                { id: 'woocommerce', name: 'WooCommerce Online Store', starting: '₹13,999', desc: 'Self-hosted WordPress store with 0% platform fee' },
                { id: 'booking-site', name: 'Appointment & Booking Site', starting: '₹11,999', desc: 'Interactive slots for clinics, salons & consultants' },
                { id: 'corporate', name: 'Corporate Multi-Page Site', starting: '₹17,999', desc: '10-12 pages for mid-sized & industrial firms' },
                { id: 'real-estate', name: 'Real Estate Project Site', starting: '₹24,999', desc: 'Floor plans, brochure gates & site visit leads' },
                { id: 'lms-platform', name: 'LMS / Online Course Portal', starting: '₹39,999', desc: 'Student login, video lessons & certificates' },
                { id: 'marketplace', name: 'Multi-Vendor Marketplace MVP', starting: '₹69,999', desc: 'Vendor dashboards & split commission cart' },
                { id: 'custom-saas', name: 'Custom SaaS MVP / Web App', starting: '₹69,999', desc: 'Next.js App Router, Supabase auth & billing' },
                { id: 'speed-optimization', name: 'Speed & Core Web Vitals', starting: '₹1,499', desc: 'Remediate slow WordPress/Shopify pages' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setWebsiteType(opt.id)}
                  className={`p-4 text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    websiteType === opt.id
                      ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[3px_3px_0_0_#B08D57]'
                      : 'bg-white text-dezo-ink border-dezo-ink/30 hover:border-dezo-ink hover:bg-dezo-bg'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-display text-sm font-bold uppercase">{opt.name}</span>
                      <span className={`text-[11px] font-mono font-bold ${websiteType === opt.id ? 'text-dezo-primary' : 'text-dezo-ink'}`}>
                        {opt.starting}
                      </span>
                    </div>
                    <p className={`text-xs ${websiteType === opt.id ? 'text-gray-300' : 'text-dezo-text-secondary'}`}>
                      {opt.desc}
                    </p>
                  </div>
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
              Continue to Scope & Design <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Scope & Design Depth */}
      {step === 2 && (
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-primary font-bold mb-2">
              Expected Total Page Count:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: '1', label: '1 Single Page' },
                { id: '2-5', label: '2 to 5 Pages' },
                { id: '6-10', label: '6 to 10 Pages' },
                { id: '11-20', label: '11 to 20 Pages' },
                { id: '20+', label: '20+ Pages' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPageCount(p.id as any)}
                  className={`p-3 text-center border-2 transition-all cursor-pointer text-xs font-mono font-bold ${
                    pageCount === p.id
                      ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                      : 'bg-white text-dezo-ink border-dezo-border hover:border-dezo-ink'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                UI/UX Design Approach:
              </label>
              <div className="space-y-2.5">
                {[
                  { id: 'framework', label: 'Modern Framework Theme (Next.js/Tailwind)', desc: 'Clean, fast, responsive design using established UI tokens (Cost-effective)' },
                  { id: 'bespoke', label: 'Bespoke Figma UI/UX Design System (+₹10,000)', desc: '100% custom wireframes, moodboards, and bespoke layouts in Figma before coding' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDesignTier(d.id as any)}
                    className={`w-full p-3.5 text-left border-2 transition-all cursor-pointer ${
                      designTier === d.id
                        ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                        : 'bg-white text-dezo-ink border-dezo-border hover:border-dezo-ink'
                    }`}
                  >
                    <p className="font-display text-xs font-bold uppercase">{d.label}</p>
                    <p className={`text-[11px] mt-1 ${designTier === d.id ? 'text-gray-300' : 'text-dezo-text-muted'}`}>
                      {d.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Content & Copywriting:
              </label>
              <div className="space-y-2.5">
                {[
                  { id: 'client', label: 'Client Provides Copy & Images', desc: 'You provide finished text, headings, and images. We format and polish them.' },
                  { id: 'dezo-copy', label: 'DEZO Writes Professional Marketing Copy (+₹3k–₹12k)', desc: 'Our copywriters craft benefit-driven headlines, service descriptions, and hooks.' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setContentCreation(c.id as any)}
                    className={`w-full p-3.5 text-left border-2 transition-all cursor-pointer ${
                      contentCreation === c.id
                        ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                        : 'bg-white text-dezo-ink border-dezo-border hover:border-dezo-ink'
                    }`}
                  >
                    <p className="font-display text-xs font-bold uppercase">{c.label}</p>
                    <p className={`text-[11px] mt-1 ${contentCreation === c.id ? 'text-gray-300' : 'text-dezo-text-muted'}`}>
                      {c.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 bg-white border border-dezo-ink font-mono text-xs uppercase tracking-wider font-bold text-dezo-ink hover:bg-dezo-bg flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-all flex items-center gap-2 border border-dezo-ink cursor-pointer"
            >
              Continue to Features <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Features & Integrations */}
      {step === 3 && (
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-dezo-primary font-bold mb-2">
              Select Desired Functionalities (Select All That Apply):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'whatsapp-chat', label: 'Official WhatsApp Click-to-Chat', desc: 'Direct chat trigger with prefilled inquiry message' },
                { id: 'contact-form', label: 'Lead Enquiry Form with Email Alerts', desc: 'Anti-spam protected lead capture form' },
                { id: 'payment-gateway', label: 'India Payment Gateway (Razorpay/UPI)', desc: 'Instant UPI, Cards & Net Banking checkout (+₹5k)' },
                { id: 'cod-otp', label: 'Cash on Delivery (COD) OTP Verification', desc: 'Reduce RTO fraud with mobile OTP check (+₹4k)' },
                { id: 'booking-engine', label: 'Time-Slot Appointment Engine', desc: 'Calendar slot booking for appointments (+₹8k)' },
                { id: 'user-portal', label: 'Customer Login / Member Dashboard', desc: 'Private accounts & paywalled access (+₹20k)' },
              ].map((feat) => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3.5 text-left border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                        : 'bg-white text-dezo-ink border-dezo-border hover:border-dezo-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display text-xs font-bold uppercase">{feat.label}</span>
                      <CheckCircle2 size={14} className={isSelected ? 'text-dezo-primary' : 'text-gray-300'} />
                    </div>
                    <p className={`text-[11px] ${isSelected ? 'text-gray-300' : 'text-dezo-text-muted'}`}>
                      {feat.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Deployment Timeline Preference:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'standard', label: 'Standard Delivery', desc: 'Measured sprint cadence' },
                  { id: 'urgent', label: 'Urgent Sprint (+20%)', desc: 'Priority developer allocation' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setDesiredTimeline(t.id as any)}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      desiredTimeline === t.id
                        ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                        : 'bg-white text-dezo-ink border-dezo-border hover:border-dezo-ink'
                    }`}
                  >
                    <p className="font-display text-xs font-bold uppercase">{t.label}</p>
                    <p className={`text-[10px] mt-0.5 ${desiredTimeline === t.id ? 'text-gray-300' : 'text-dezo-text-muted'}`}>
                      {t.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Post-Launch Maintenance:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'handover', label: 'Full Handover (Zero Retainer)', desc: '100% self-managed' },
                  { id: 'monthly-retainer', label: 'Monthly Retainer (₹699/mo)', desc: 'Backups, updates & edits' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMaintenance(m.id as any)}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      maintenance === m.id
                        ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                        : 'bg-white text-dezo-ink border-dezo-border hover:border-dezo-ink'
                    }`}
                  >
                    <p className="font-display text-xs font-bold uppercase">{m.label}</p>
                    <p className={`text-[10px] mt-0.5 ${maintenance === m.id ? 'text-gray-300' : 'text-dezo-text-muted'}`}>
                      {m.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-white border border-dezo-ink font-mono text-xs uppercase tracking-wider font-bold text-dezo-ink hover:bg-dezo-bg flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-3 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-all flex items-center gap-2 border-2 border-dezo-ink cursor-pointer shadow-[3px_3px_0_0_#0B0B0A]"
            >
              View Scoped Quotation <Sparkles size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Scoped Estimate Output */}
      {step === 4 && (
        <div className="space-y-8 py-4">
          <div className="bg-white border-2 border-dezo-ink p-6 sm:p-8 shadow-[4px_4px_0_0_#0B0B0A]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dezo-ink">
              <div>
                <span className="px-2.5 py-0.5 bg-dezo-primary/20 border border-dezo-ink text-[11px] font-mono uppercase tracking-wider text-dezo-ink font-bold">
                  Recommended Tier: PACKAGE {result.recommendedPackage}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-dezo-ink mt-2">
                  Estimated Starting Range: ₹{result.totalLow.toLocaleString('en-IN')} – ₹{result.totalHigh.toLocaleString('en-IN')}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono text-dezo-text-muted block">Estimated Timeline</span>
                <span className="font-mono text-sm font-bold text-dezo-ink flex items-center gap-1 justify-end">
                  <Clock size={13} className="text-dezo-primary" /> {result.timeline}
                </span>
              </div>
            </div>

            {/* Inclusions & Scope */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold block">
                  Included Baseline Deliverables:
                </span>
                <div className="space-y-2">
                  {result.includedDeliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-dezo-bg-warm p-2.5 border border-dezo-border text-xs text-dezo-text-primary">
                      <CheckCircle2 size={14} className="text-dezo-primary shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                {result.scopeAssumptions.length > 0 && (
                  <div className="pt-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-ink font-bold block mb-1">
                      Selected Scope Add-ons:
                    </span>
                    <ul className="space-y-1 text-xs font-mono text-dezo-text-secondary pl-4 list-disc">
                      {result.scopeAssumptions.map((sc, i) => (
                        <li key={i}>{sc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="bg-dezo-ink text-dezo-bg p-5 border-2 border-dezo-ink">
                  <div className="flex items-center gap-1.5 text-dezo-primary mb-2">
                    <ShieldCheck size={16} />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">
                      The DEZO Guarantee
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-gray-300">
                    <li className="flex items-start gap-1.5">
                      <span className="text-dezo-primary font-bold">✓</span>
                      <span>Scope Lock: Fixed price before kickoff</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-dezo-primary font-bold">✓</span>
                      <span>Staging preview before public deployment</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-dezo-primary font-bold">✓</span>
                      <span>30-Day post-launch defect-fix warranty</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-dezo-primary font-bold">✓</span>
                      <span>100% full source-code ownership handover</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-dezo-bg-warm border border-dezo-border text-[11px] font-mono text-dezo-text-muted">
                  <strong className="text-dezo-ink">Explicit Exclusions:</strong> {result.exclusions.join('; ')}
                </div>
              </div>
            </div>
          </div>

          {/* Action Box: Prefilled WhatsApp or Intake */}
          <div className="bg-dezo-ink text-dezo-bg border-2 border-dezo-ink p-6 sm:p-8 shadow-[4px_4px_0_0_#B08D57]">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2 font-bold">
                Lock in Your Scope & Timeline
              </span>
              <h4 className="font-display text-2xl font-bold uppercase text-white mb-2">
                Connect Directly with our Bhubaneswar Studio
              </h4>
              <p className="text-xs font-mono text-gray-300 leading-relaxed mb-6">
                Send this generated estimate directly to Tarik Islam and our engineering team via WhatsApp. We will review your requirements, confirm milestone availability, and lock your fixed scope.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-700 text-xs font-mono text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Business / Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-700 text-xs font-mono text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="WhatsApp Phone Number"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-700 text-xs font-mono text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-all flex items-center justify-center gap-2 border border-black shadow-[2px_2px_0_0_#FFFFFF]"
                >
                  <MessageSquare size={14} /> Send Estimate via WhatsApp (+91 9114411026) →
                </a>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-transparent border border-gray-600 text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={12} /> Recalculate Answers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

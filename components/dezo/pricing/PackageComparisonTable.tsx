'use client';

import React, { useState } from 'react';
import { WEBSITE_PACKAGES, WebsitePackage } from '@/content/website-pricing-catalog';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, MessageSquare, Sparkles, LayoutGrid, TableProperties, HelpCircle, Check, Minus } from 'lucide-react';
import Link from 'next/link';

interface MatrixRow {
  label: string;
  category: string;
  tooltip?: string;
  values: {
    'pkg-student-dukaan': string | boolean;
    'pkg-launch': string | boolean;
    'pkg-business': string | boolean;
    'pkg-commerce': string | boolean;
    'pkg-custom': string | boolean;
  };
}

const COMPARISON_MATRIX: MatrixRow[] = [
  {
    label: 'Starting Investment',
    category: 'Commercials',
    values: {
      'pkg-student-dukaan': '₹1,999 (Student) / ₹2,999 (Dukaan)',
      'pkg-launch': '₹4,999',
      'pkg-business': '₹8,999',
      'pkg-commerce': '₹14,999',
      'pkg-custom': '₹24,999',
    },
  },
  {
    label: 'Typical Turnaround',
    category: 'Commercials',
    values: {
      'pkg-student-dukaan': '2 to 4 Days',
      'pkg-launch': '3 to 5 Days',
      'pkg-business': '5 to 7 Days',
      'pkg-commerce': '7 to 10 Days',
      'pkg-custom': '2 to 4 Weeks',
    },
  },
  {
    label: 'Page / Screen Capacity',
    category: 'Scope',
    values: {
      'pkg-student-dukaan': '1 Fast Single Page',
      'pkg-launch': 'Up to 3 Custom Pages',
      'pkg-business': 'Up to 5 Custom Pages',
      'pkg-commerce': 'Full Storefront (20+ Items)',
      'pkg-custom': 'Modular / Unlimited',
    },
  },
  {
    label: 'Lifelong ₹0 Cloud Hosting',
    category: 'Infrastructure',
    tooltip: 'Deployed on Vercel/Netlify with global CDN and automated SSL certificate',
    values: {
      'pkg-student-dukaan': true,
      'pkg-launch': true,
      'pkg-business': true,
      'pkg-commerce': 'Shopify Cloud Plan',
      'pkg-custom': true,
    },
  },
  {
    label: 'WhatsApp Lead & Order Action',
    category: 'Conversion',
    tooltip: 'Direct 1-tap WhatsApp chat/ordering forwarding details straight to phone',
    values: {
      'pkg-student-dukaan': true,
      'pkg-launch': true,
      'pkg-business': true,
      'pkg-commerce': true,
      'pkg-custom': true,
    },
  },
  {
    label: 'Google Maps & Click-to-Call',
    category: 'Conversion',
    values: {
      'pkg-student-dukaan': true,
      'pkg-launch': true,
      'pkg-business': true,
      'pkg-commerce': true,
      'pkg-custom': true,
    },
  },
  {
    label: 'Technical SEO & Schema Markup',
    category: 'Marketing',
    values: {
      'pkg-student-dukaan': 'Basic Meta',
      'pkg-launch': 'Meta + Sitemap',
      'pkg-business': 'LocalBusiness Schema + GA4',
      'pkg-commerce': 'Product Schema + Merchant',
      'pkg-custom': 'Advanced Custom Schema',
    },
  },
  {
    label: 'Payment Gateway (Razorpay/UPI)',
    category: 'Commerce',
    values: {
      'pkg-student-dukaan': 'WhatsApp / UPI QR',
      'pkg-launch': 'UPI QR / Enquiry Form',
      'pkg-business': 'Custom Lead Form',
      'pkg-commerce': 'Full Razorpay + COD',
      'pkg-custom': 'Multi-gateway / Escrow',
    },
  },
  {
    label: 'Structured Revision Rounds',
    category: 'Delivery',
    values: {
      'pkg-student-dukaan': '2 Rounds',
      'pkg-launch': '2 Rounds',
      'pkg-business': '3 Rounds',
      'pkg-commerce': '3 Rounds',
      'pkg-custom': 'Unlimited in Sprints',
    },
  },
  {
    label: 'Written 30-Day Defect Warranty',
    category: 'Guarantee',
    tooltip: 'Bug fixes and workflow corrections covered without extra developer fees',
    values: {
      'pkg-student-dukaan': true,
      'pkg-launch': true,
      'pkg-business': true,
      'pkg-commerce': true,
      'pkg-custom': true,
    },
  },
  {
    label: '100% Source-Code Handover',
    category: 'Ownership',
    tooltip: 'Full Git repository, credentials, and design files handed over upon launch',
    values: {
      'pkg-student-dukaan': true,
      'pkg-launch': true,
      'pkg-business': true,
      'pkg-commerce': true,
      'pkg-custom': true,
    },
  },
  {
    label: 'Payment Milestone Schedule',
    category: 'Commercials',
    values: {
      'pkg-student-dukaan': '50% Kickoff / 50% Launch',
      'pkg-launch': '50% Kickoff / 50% Launch',
      'pkg-business': '50% Kickoff / 50% Launch',
      'pkg-commerce': '40% Kickoff / 30% Staging / 30% Launch',
      'pkg-custom': '40% Kickoff / 30% Alpha / 30% Live',
    },
  },
];

export function PackageComparisonTable() {
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  return (
    <div className="w-full bg-dezo-bg border-2 border-dezo-ink p-5 sm:p-8 lg:p-10 shadow-[6px_6px_0_0_#0B0B0A]" id="packages">
      {/* Header with View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Sparkles size={13} className="text-dezo-primary" />
            <span>Structured Service Models · 0 Hidden Costs</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            5 Transparent Website Development Packages
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-3xl">
            From subsidized student portfolios and local neighborhood shops to high-converting Shopify stores and bespoke Next.js web applications. Every package features fixed Scope Lock, working staging preview, and full code handover.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-end">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`px-3 py-2 text-xs font-mono uppercase tracking-wider font-bold border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                : 'bg-white text-dezo-ink border-dezo-ink hover:bg-dezo-bg-warm'
            }`}
          >
            <LayoutGrid size={14} /> Package Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-2 text-xs font-mono uppercase tracking-wider font-bold border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'matrix'
                ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                : 'bg-white text-dezo-ink border-dezo-ink hover:bg-dezo-bg-warm'
            }`}
          >
            <TableProperties size={14} /> Full Deliverables Matrix
          </button>
        </div>
      </div>

      {/* VIEW 1: Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-8">
          {WEBSITE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-5 sm:p-6 border-2 flex flex-col justify-between transition-all ${
                pkg.popular
                  ? 'bg-dezo-bg-warm border-dezo-ink shadow-[4px_4px_0_0_#B08D57] ring-1 ring-dezo-primary/40'
                  : 'bg-white border-dezo-ink shadow-[2px_2px_0_0_#0B0B0A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-dezo-ink text-dezo-bg">
                    {pkg.name}
                  </span>
                  {pkg.popular && (
                    <span className="text-[9px] font-mono uppercase tracking-widest text-dezo-primary font-bold px-1.5 py-0.5 border border-dezo-primary/50 bg-dezo-primary/10">
                      POPULAR
                    </span>
                  )}
                </div>

                <div className="my-3 pb-3 border-b border-dezo-ink/15">
                  <span className="text-[10px] font-mono text-dezo-text-muted block uppercase">
                    Starting Price
                  </span>
                  <p className="font-display text-xl sm:text-2xl font-black text-dezo-ink leading-tight mt-0.5">
                    {pkg.startingPrice}
                  </p>
                  <span className="text-[10px] font-mono text-dezo-text-muted mt-1 block">
                    {pkg.badge}
                  </span>
                </div>

                <p className="text-xs font-mono text-dezo-text-secondary leading-relaxed mb-4">
                  <strong>Best for:</strong> {pkg.bestFor}
                </p>

                <div className="pt-3 border-t border-dezo-ink/10 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-dezo-primary font-bold block mb-2">
                    Included Scope:
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-dezo-text-primary leading-tight">
                        <CheckCircle2 size={13} className="text-dezo-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-dezo-ink/10 text-[10px] font-mono text-dezo-text-muted">
                  <p>
                    <strong>Revisions:</strong> {pkg.revisions}
                  </p>
                  <p>
                    <strong>Warranty:</strong> {pkg.warranty}
                  </p>
                  <p>
                    <strong>Handover:</strong> {pkg.handover}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dezo-ink/15 space-y-2">
                <Link
                  href={`/start-a-project?package=${pkg.name}&startingPrice=${pkg.startingPriceNumeric}`}
                  className="w-full py-2.5 px-3 bg-dezo-ink text-dezo-bg text-center text-xs font-mono uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-colors flex items-center justify-center gap-1 border border-dezo-ink shadow-[2px_2px_0_0_#0B0B0A]"
                >
                  Choose {pkg.name} <ArrowRight size={12} />
                </Link>
                <a
                  href={`https://wa.me/919114411026?text=${encodeURIComponent(
                    `Hello DEZO Team, I am interested in Package ${pkg.name} (${pkg.startingPrice}). Please share the exact scope checklist and onboarding steps.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-dezo-bg-warm text-dezo-ink text-center text-[11px] font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center justify-center gap-1 border border-dezo-border"
                >
                  <MessageSquare size={11} className="text-[#25D366]" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: Detailed Matrix Table */}
      {viewMode === 'matrix' && (
        <div className="my-8 overflow-x-auto border-2 border-dezo-ink bg-white shadow-[3px_3px_0_0_#0B0B0A]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider border-b-2 border-dezo-ink">
                <th className="p-4 w-[24%] border-r border-gray-700">Deliverable / Standard</th>
                <th className="p-4 w-[15%] border-r border-gray-700">STUDENT & DUKAAN</th>
                <th className="p-4 w-[15%] border-r border-gray-700">LAUNCH</th>
                <th className="p-4 w-[16%] border-r border-gray-700 bg-dezo-primary/20 text-white">
                  BUSINESS <span className="text-dezo-primary font-bold">★</span>
                </th>
                <th className="p-4 w-[15%] border-r border-gray-700">COMMERCE</th>
                <th className="p-4 w-[15%]">GROW & CUSTOM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dezo-border font-mono text-xs">
              {COMPARISON_MATRIX.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-dezo-bg-warm/50'}>
                  <td className="p-3.5 font-bold text-dezo-ink border-r border-dezo-border">
                    <div className="flex items-center gap-1.5">
                      <span>{row.label}</span>
                      {row.tooltip && (
                        <span title={row.tooltip} className="cursor-help text-dezo-text-muted hover:text-dezo-primary">
                          <HelpCircle size={12} />
                        </span>
                      )}
                    </div>
                  </td>
                  {(['pkg-student-dukaan', 'pkg-launch', 'pkg-business', 'pkg-commerce', 'pkg-custom'] as const).map(
                    (pkgId) => {
                      const val = row.values[pkgId];
                      const isPopularCol = pkgId === 'pkg-business';
                      return (
                        <td
                          key={pkgId}
                          className={`p-3.5 border-r border-dezo-border last:border-r-0 ${
                            isPopularCol ? 'bg-dezo-primary/5 font-semibold text-dezo-ink' : 'text-dezo-text-secondary'
                          }`}
                        >
                          {typeof val === 'boolean' ? (
                            val ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                                <Check size={14} className="stroke-[3]" /> Included
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-gray-400">
                                <Minus size={14} /> Optional
                              </span>
                            )
                          ) : (
                            <span>{val}</span>
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-dezo-bg-warm border-t-2 border-dezo-ink">
                <td className="p-4 font-mono text-xs uppercase font-bold text-dezo-ink border-r border-dezo-border">
                  Direct Action:
                </td>
                {WEBSITE_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-3 border-r border-dezo-border last:border-r-0">
                    <Link
                      href={`/start-a-project?package=${pkg.name}&startingPrice=${pkg.startingPriceNumeric}`}
                      className="block w-full py-2 px-2 bg-dezo-ink text-dezo-bg text-center text-[11px] font-mono uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-colors"
                    >
                      Book →
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Explicit Exclusions Notice & Student Discount Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-dezo-bg-warm border-2 border-dezo-ink flex items-start gap-3 text-xs font-mono text-dezo-text-secondary">
          <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-dezo-ink">What is Not Included in Base Packages:</strong> Domain registration fees (₹600–₹1,200/yr), specialized third-party cloud database fees, premium commercial plugin licenses, or direct paid ad budgets (paid directly to Google/Meta).
          </p>
        </div>

        <div className="p-4 bg-emerald-50 border-2 border-emerald-600 flex items-start gap-3 text-xs font-mono text-emerald-900">
          <ShieldCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-emerald-950">Student & Local Dukaan Subsidy:</strong> College students in Bhubaneswar/Odisha and across India can get a complete personal portfolio for just ₹1,999 with valid college ID. Neighborhood shops get a complete digital storefront for ₹2,999.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Calculator, Info, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MarketplaceMetricsExplainer() {
  // Interactive Educational Simulator Inputs
  const [sellingPrice, setSellingPrice] = useState(1299);
  const [cogs, setCogs] = useState(380);
  const [referralPercent, setReferralPercent] = useState(14);
  const [shippingFee, setShippingFee] = useState(85);
  const [adSpendPercent, setAdSpendPercent] = useState(12);
  const [returnRatePercent, setReturnRatePercent] = useState(8);

  // Calculations
  const marketplaceReferral = Math.round((sellingPrice * referralPercent) / 100);
  const closingFee = sellingPrice > 1000 ? 55 : sellingPrice > 500 ? 30 : 15;
  const adSpendPerUnit = Math.round((sellingPrice * adSpendPercent) / 100);
  const returnAllowance = Math.round(((shippingFee * 1.5 + cogs * 0.1) * returnRatePercent) / 100);

  const totalDeductions = cogs + marketplaceReferral + closingFee + shippingFee + adSpendPerUnit + returnAllowance;
  const netContributionMargin = sellingPrice - totalDeductions;
  const netMarginPercent = ((netContributionMargin / sellingPrice) * 100).toFixed(1);
  const calculatedROAS = (100 / adSpendPercent).toFixed(1);

  return (
    <div className="w-full bg-dezo-bg border-2 border-dezo-ink p-6 sm:p-10 shadow-[4px_4px_0_0_#0B0B0A]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Calculator size={13} className="text-dezo-primary" />
            <span>Commercial Transparency & Unit Economics</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            Marketplace Metrics & Profitability Reality
          </h3>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-2xl">
            A high ROAS does not guarantee profit. We manage marketplace advertising with strict accountability to TACoS, referral fees, returns, and true net contribution margin.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-dezo-bg-warm border border-dezo-ink text-[11px] font-mono text-dezo-text-muted shrink-0">
          <Info size={12} className="text-dezo-primary" />
          <span>Interactive Decision Model (Sample Data)</span>
        </div>
      </div>

      {/* Core Definitions Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-5 shadow-[2px_2px_0_0_#0B0B0A]">
          <span className="font-mono text-xs font-bold text-dezo-primary block mb-1">
            ACoS (Advertising Cost of Sale)
          </span>
          <p className="font-mono text-xs text-dezo-ink font-bold mb-2">
            ACoS = (Ad Spend ÷ Ad-Attributed Sales) × 100
          </p>
          <p className="text-xs text-dezo-text-secondary leading-relaxed">
            Measures ad campaign efficiency in isolation. Useful for bidding calibration, but ignores organic sales lift.
          </p>
        </div>

        <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-5 shadow-[2px_2px_0_0_#0B0B0A]">
          <span className="font-mono text-xs font-bold text-dezo-primary block mb-1">
            ROAS (Return on Ad Spend)
          </span>
          <p className="font-mono text-xs text-dezo-ink font-bold mb-2">
            ROAS = Ad-Attributed Sales ÷ Ad Spend
          </p>
          <p className="text-xs text-dezo-text-secondary leading-relaxed">
            Inverse of ACoS (4x ROAS = 25% ACoS). A 4x ROAS is unprofitable if your gross margin is only 20%.
          </p>
        </div>

        <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-5 shadow-[2px_2px_0_0_#0B0B0A]">
          <span className="font-mono text-xs font-bold text-dezo-primary block mb-1">
            TACoS (Total ACoS — The Real North Star)
          </span>
          <p className="font-mono text-xs text-dezo-ink font-bold mb-2">
            TACoS = (Total Ad Spend ÷ Total Marketplace Sales) × 100
          </p>
          <p className="text-xs text-dezo-text-secondary leading-relaxed">
            Reflects overall business health. As listings gain organic rank, TACoS should drop even if ad budget grows.
          </p>
        </div>
      </div>

      {/* Interactive Unit Economics Calculator */}
      <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-8 shadow-[3px_3px_0_0_#0B0B0A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dezo-ink/15 mb-6">
          <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-dezo-ink">
            Interactive Unit Economics Simulator
          </h4>
          <span className="text-xs font-mono text-dezo-text-muted">
            Simulate your product’s real margin after all Amazon/Flipkart deductions
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sliders and Inputs */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5 font-bold">
                <span className="text-dezo-ink">Selling Price (MRP / Listed Price):</span>
                <span className="text-dezo-primary text-sm font-bold">₹{sellingPrice}</span>
              </div>
              <input
                type="range"
                min="299"
                max="5999"
                step="50"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full accent-dezo-primary cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5 font-bold">
                <span className="text-dezo-ink">Product Cost (COGS + Packaging):</span>
                <span className="text-dezo-primary text-sm font-bold">₹{cogs}</span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="25"
                value={cogs}
                onChange={(e) => setCogs(Number(e.target.value))}
                className="w-full accent-dezo-primary cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-dezo-text-secondary mb-1 font-bold">
                  Platform Referral Fee: {referralPercent}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="22"
                  value={referralPercent}
                  onChange={(e) => setReferralPercent(Number(e.target.value))}
                  className="w-full accent-dezo-primary cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-dezo-text-secondary mb-1 font-bold">
                  Fulfillment/Shipping: ₹{shippingFee}
                </label>
                <input
                  type="range"
                  min="40"
                  max="200"
                  step="5"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(Number(e.target.value))}
                  className="w-full accent-dezo-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-dezo-text-secondary mb-1 font-bold">
                  Ad Spend Ratio (TACoS): {adSpendPercent}%
                </label>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={adSpendPercent}
                  onChange={(e) => setAdSpendPercent(Number(e.target.value))}
                  className="w-full accent-dezo-primary cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-dezo-text-secondary mb-1 font-bold">
                  Return Rate (RTO %): {returnRatePercent}%
                </label>
                <input
                  type="range"
                  min="2"
                  max="25"
                  value={returnRatePercent}
                  onChange={(e) => setReturnRatePercent(Number(e.target.value))}
                  className="w-full accent-dezo-primary cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Real Margin Output Card */}
          <div className="lg:col-span-5">
            <div className="bg-dezo-ink text-dezo-bg p-6 border-2 border-dezo-ink h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-3 font-bold">
                  Unit Margin Breakdown
                </span>

                <div className="space-y-2 text-xs font-mono pb-4 border-b border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Selling Price:</span>
                    <span className="font-bold text-white">₹{sellingPrice}</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>- Product COGS:</span>
                    <span>₹{cogs}</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>- Referral & Closing:</span>
                    <span>₹{marketplaceReferral + closingFee}</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>- Shipping / FBA:</span>
                    <span>₹{shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>- Ad Spend Allocation:</span>
                    <span>₹{adSpendPerUnit}</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>- Return & Damage Reserve:</span>
                    <span>₹{returnAllowance}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs font-mono text-gray-400 block">
                        Net Profit Per Unit
                      </span>
                      <span
                        className={`font-display text-3xl font-black ${
                          netContributionMargin > 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        ₹{netContributionMargin}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-gray-400 block">
                        Net Margin
                      </span>
                      <span
                        className={`font-mono text-xl font-bold ${
                          Number(netMarginPercent) > 15 ? 'text-emerald-400' : 'text-yellow-400'
                        }`}
                      >
                        {netMarginPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <Link
                  href="/start-a-project?goal=unit-economics"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-dezo-primary text-dezo-ink text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors"
                >
                  Audit My Product Margins <ArrowRight size={13} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import {
  WEBSITE_PRICING_CATALOG,
  WebsiteTypeItem,
} from '@/content/website-pricing-catalog';
import {
  Search,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'all', label: 'All Website Types' },
  { id: 'business', label: 'Business & Corporate' },
  { id: 'landing-pages', label: 'Landing Pages & CRO' },
  { id: 'ecommerce', label: 'eCommerce & D2C' },
  { id: 'booking', label: 'Booking & Appointments' },
  { id: 'education', label: 'Education & Coaching' },
  { id: 'industry', label: 'Industry-Specific' },
  { id: 'personal', label: 'Portfolios & Personal' },
  { id: 'content', label: 'Content & Publishing' },
  { id: 'custom-apps', label: 'Custom Apps & SaaS' },
  { id: 'maintenance', label: 'Speed & Maintenance' },
];

export function WebsiteCatalogBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = useMemo(() => {
    return WEBSITE_PRICING_CATALOG.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.idealFor.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.recommendedPlatforms.some((p) => p.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-dezo-bg border-2 border-dezo-ink p-6 sm:p-10 shadow-[6px_6px_0_0_#0B0B0A]" id="website-catalog">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-dezo-ink">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-3 font-bold">
            <Sparkles size={13} className="text-dezo-primary" />
            <span>Searchable Website Directory</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight">
            Explore 30+ Website Types & Clear Starting Prices
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-dezo-text-secondary max-w-3xl">
            From a focused landing page to a multi-vendor marketplace or custom SaaS application. Find your exact website type, see the baseline scope, and know your starting budget.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="font-mono text-xs text-dezo-text-muted uppercase tracking-wider block">
            Catalog Coverage
          </span>
          <span className="font-display text-2xl font-black text-dezo-primary">
            {filteredItems.length} of {WEBSITE_PRICING_CATALOG.length} Types
          </span>
        </div>
      </div>

      {/* Search Input & Quick Filter */}
      <div className="my-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dezo-text-muted" />
          <input
            type="text"
            placeholder="Search by website type, industry, or tech (e.g., 'school', 'shopify', 'restaurant', 'real estate', 'doctor')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dezo-bg-warm border-2 border-dezo-ink font-mono text-xs text-dezo-ink placeholder-dezo-text-muted focus:outline-none focus:bg-white shadow-[2px_2px_0_0_#0B0B0A]"
          />
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 border border-dezo-ink bg-dezo-bg text-xs font-mono uppercase text-dezo-ink hover:bg-dezo-bg-warm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink font-bold shadow-[2px_2px_0_0_#B08D57]'
                  : 'bg-dezo-bg-warm text-dezo-text-secondary border-dezo-border hover:border-dezo-ink hover:text-dezo-ink'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-dezo-bg-warm border-2 border-dashed border-dezo-border">
          <p className="font-display text-lg font-bold text-dezo-ink mb-2">No matching website types found</p>
          <p className="text-xs font-mono text-dezo-text-secondary mb-4">
            Looking for a custom architecture or unlisted vertical? We build custom web platforms tailored to any requirement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink"
          >
            Request a Custom Scoped Quote →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A] flex flex-col justify-between hover:shadow-[5px_5px_0_0_#B08D57] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-dezo-bg-warm border border-dezo-ink text-[10px] font-mono uppercase tracking-wider text-dezo-text-muted font-bold">
                    {item.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-dezo-primary flex items-center gap-1 font-bold">
                    <Clock size={12} /> {item.typicalTimeline}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-dezo-ink mb-1.5 leading-snug">
                  {item.name}
                </h3>

                <p className="text-xs font-mono text-dezo-text-secondary mb-4 leading-relaxed">
                  <strong>Best for:</strong> {item.idealFor}
                </p>

                {/* Price Display */}
                <div className="p-3 bg-dezo-bg-warm border-2 border-dezo-ink mb-4 flex items-baseline justify-between">
                  <span className="text-[11px] font-mono uppercase text-dezo-text-muted font-bold">
                    Starting from:
                  </span>
                  <span className="font-display text-2xl font-black text-dezo-ink">
                    {item.startingPriceFormatted}
                  </span>
                </div>

                {/* Scope & Deliverables */}
                <div className="space-y-2 mb-4 text-xs">
                  <p className="font-mono text-[11px] text-dezo-ink font-bold">
                    Baseline Included Scope:
                  </p>
                  <p className="text-xs text-dezo-text-secondary leading-relaxed bg-white p-2.5 border border-dezo-border">
                    {item.minimumScope}
                  </p>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-dezo-text-muted font-bold block mb-1.5">
                    Recommended Platforms:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.recommendedPlatforms.map((plat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-dezo-primary/10 border border-dezo-primary/40 text-[10px] font-mono text-dezo-ink font-bold"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-dezo-ink/15 flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/start-a-project?websiteType=${encodeURIComponent(item.name)}&startingPrice=${item.startingPrice}`}
                  className="flex-1 py-2.5 px-3 bg-dezo-ink text-dezo-bg text-center text-xs font-mono uppercase tracking-wider font-bold hover:bg-dezo-primary hover:text-dezo-ink transition-colors flex items-center justify-center gap-1.5 border border-dezo-ink"
                >
                  Choose Build <ArrowRight size={13} />
                </Link>
                <a
                  href={`https://wa.me/919114411026?text=${encodeURIComponent(
                    `Hello DEZO Team, I am interested in building a ${item.name} (starting from ${item.startingPriceFormatted}). Please share the exact scope, timeline, and next steps.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#25D366] text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center justify-center gap-1 border border-black"
                  title="Enquire on WhatsApp"
                >
                  <MessageSquare size={13} /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pricing Clarification Notice */}
      <div className="mt-8 p-4 bg-dezo-bg-warm border-2 border-dezo-ink flex items-start gap-3 text-xs font-mono text-dezo-text-secondary">
        <Info size={16} className="text-dezo-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-dezo-ink">Pricing Transparency Notice:</strong> All listed rates represent introductory starting prices for tightly scoped baseline implementations. The final quotation depends on your exact page count, content readiness, third-party API integrations, and technical complexity. Every project begins with a documented Scope Lock agreement before payment.
        </p>
      </div>
    </div>
  );
}

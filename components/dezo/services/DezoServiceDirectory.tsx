'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Layers,
  Code,
  TrendingUp,
  Share2,
  ShoppingCart,
  Target,
  MessageSquare,
  BarChart3,
  Award,
  Cpu,
} from 'lucide-react';
import {
  MASTER_SERVICES_CATALOG,
  SERVICE_DEPARTMENTS,
  ServiceItem,
  ServiceDepartmentCode,
} from '@/content/services-catalog';

const DEPARTMENT_ICONS: Record<string, React.ElementType> = {
  Code,
  Search,
  TrendingUp,
  Share2,
  Sparkles,
  ShoppingCart,
  Target,
  MessageSquare,
  BarChart3,
  Award,
  Cpu,
  Layers,
};

export function DezoServiceDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<ServiceDepartmentCode | 'ALL'>('ALL');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');

  // Collect unique industries from all services
  const allIndustries = useMemo(() => {
    const set = new Set<string>();
    MASTER_SERVICES_CATALOG.forEach((srv) => {
      srv.targetIndustries.forEach((ind) => set.add(ind));
    });
    return Array.from(set).sort();
  }, []);

  const filteredServices = useMemo(() => {
    return MASTER_SERVICES_CATALOG.filter((srv) => {
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = srv.name.toLowerCase().includes(q);
        const matchesDesc = srv.shortDescription.toLowerCase().includes(q) || srv.fullDescription.toLowerCase().includes(q);
        const matchesTagline = srv.tagline.toLowerCase().includes(q);
        const matchesDeliverables = srv.deliverables.some((d) => d.toLowerCase().includes(q));
        const matchesIndustry = srv.targetIndustries.some((i) => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTagline && !matchesDeliverables && !matchesIndustry) {
          return false;
        }
      }

      // Department filter
      if (selectedDept !== 'ALL' && srv.departmentCode !== selectedDept) {
        return false;
      }

      // Industry filter
      if (selectedIndustry !== 'ALL' && !srv.targetIndustries.includes(selectedIndustry)) {
        return false;
      }

      // Tier filter
      if (selectedTier !== 'ALL' && srv.tier !== selectedTier) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDept, selectedIndustry, selectedTier]);

  return (
    <div className="w-full">
      {/* Search & Filter Header Bar */}
      <div className="bg-dezo-bg-warm border border-dezo-border p-5 sm:p-7 shadow-dezo-card mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Search input */}
          <div className="lg:col-span-6 relative">
            <label htmlFor="service-search" className="sr-only">
              Search digital growth services
            </label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dezo-text-muted" size={18} />
            <input
              id="service-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., SEO, Shopify, Google Ads, WhatsApp, Bhubaneswar)..."
              className="w-full pl-11 pr-4 py-3 bg-dezo-bg border border-dezo-border text-sm font-mono text-dezo-ink placeholder:text-dezo-text-muted focus:outline-none focus:ring-0 focus:border-dezo-primary transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono uppercase bg-dezo-surface px-2 py-1 border border-dezo-border hover:bg-dezo-bg"
              >
                Clear
              </button>
            )}
          </div>

          {/* Industry Filter Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              aria-label="Filter by target industry"
              className="w-full px-4 py-3 bg-dezo-bg border border-dezo-border text-xs font-mono text-dezo-ink focus:outline-none focus:border-dezo-primary cursor-pointer"
            >
              <option value="ALL">ALL INDUSTRIES ({allIndustries.length})</option>
              {allIndustries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Tier Filter Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              aria-label="Filter by engagement model tier"
              className="w-full px-4 py-3 bg-dezo-bg border border-dezo-border text-xs font-mono text-dezo-ink focus:outline-none focus:border-dezo-primary cursor-pointer"
            >
              <option value="ALL">ALL TIERS (START, GROW, SCALE)</option>
              <option value="START">START (Foundation & Launch)</option>
              <option value="GROW">GROW (Monthly Operating Cadence)</option>
              <option value="SCALE">SCALE (Full Stack Commercial)</option>
              <option value="CUSTOM">CUSTOM (Tailored Scope)</option>
            </select>
          </div>
        </div>

        {/* Department Pills / Tabs */}
        <div className="mt-6 pt-5 border-t border-dezo-ink/15">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted flex items-center gap-1.5">
              <Filter size={12} /> Departments (A - L)
            </span>
            <span className="font-mono text-xs text-dezo-text-muted">
              Showing {filteredServices.length} of {MASTER_SERVICES_CATALOG.length} services
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedDept('ALL')}
              className={`px-3 py-1.5 text-xs font-mono uppercase transition-all border ${
                selectedDept === 'ALL'
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-xs'
                  : 'bg-dezo-bg text-dezo-text-secondary border-dezo-border hover:border-dezo-ink'
              }`}
            >
              All Departments
            </button>
            {SERVICE_DEPARTMENTS.map((dept) => {
              const active = selectedDept === dept.code;
              return (
                <button
                  key={dept.code}
                  type="button"
                  onClick={() => setSelectedDept(dept.code)}
                  className={`px-3 py-1.5 text-xs font-mono transition-all border flex items-center gap-1.5 ${
                    active
                      ? 'bg-dezo-primary text-dezo-ink border-dezo-ink font-bold shadow-xs'
                      : 'bg-dezo-bg text-dezo-text-secondary border-dezo-border hover:border-dezo-ink'
                  }`}
                >
                  <span className="font-bold">[{dept.code}]</span> {dept.name.split('&')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const dept = SERVICE_DEPARTMENTS.find((d) => d.code === service.departmentCode);
            const IconComponent = dept ? DEPARTMENT_ICONS[dept.iconName] || Code : Code;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between bg-dezo-bg border border-dezo-border p-6 sm:p-7 shadow-dezo-card hover:shadow-dezo-soft transition-all"
              >
                <div>
                  {/* Top Bar: Dept Code & Tier */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-dezo-border">
                    <span className="font-mono text-xs font-bold text-dezo-primary flex items-center gap-1.5">
                      <IconComponent size={14} /> [{service.departmentCode}] {service.tier}
                    </span>
                    {service.featured && (
                      <span className="font-mono text-[10px] uppercase tracking-wider bg-dezo-primary/20 text-dezo-ink px-2 py-0.5 border border-dezo-ink">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-dezo-ink group-hover:text-dezo-primary transition-colors leading-tight">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs font-mono text-dezo-text-muted leading-snug">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm text-dezo-text-secondary leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Key Deliverables Bullet Preview */}
                  <div className="mt-5 pt-4 border-t border-dezo-border">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-text-muted block mb-2">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 3).map((d, idx) => (
                        <li key={idx} className="text-xs text-dezo-text-secondary flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-dezo-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-5 border-t-2 border-dezo-ink/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-dezo-text-muted">
                    {service.targetIndustries.slice(0, 2).join(' · ')}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary transition-colors"
                  >
                    Explore Scope <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-dezo-bg-warm border border-dezo-border p-12 text-center shadow-dezo-card">
          <p className="font-display text-2xl text-dezo-ink font-bold">No services match your filters</p>
          <p className="mt-2 text-sm text-dezo-text-secondary font-mono">
            Try adjusting your search keywords, department filter, or industry selection.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedDept('ALL');
              setSelectedIndustry('ALL');
              setSelectedTier('ALL');
            }}
            className="mt-6 px-6 py-2.5 bg-dezo-ink text-dezo-bg text-xs font-mono uppercase tracking-wider border border-dezo-border hover:bg-dezo-primary hover:text-dezo-ink transition-colors shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

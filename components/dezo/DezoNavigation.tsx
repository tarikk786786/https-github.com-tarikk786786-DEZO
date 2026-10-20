'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight, MapPin, Building2, Layers } from 'lucide-react';
import { DezoButton } from './DezoButton';
import { DezoContainer } from './DezoContainer';

const SERVICE_GROUPS = [
  {
    label: 'Build & Commerce',
    items: [
      { name: 'Custom Web & Next.js', href: '/services/web-development' },
      { name: 'Shopify & D2C Stores', href: '/services/shopify-development' },
      { name: 'eCommerce Growth', href: '/services/ecommerce-growth' },
      { name: 'Landing Pages & CRO', href: '/services/landing-pages-cro' },
    ],
  },
  {
    label: 'Search & Visibility',
    items: [
      { name: 'Technical SEO', href: '/services/seo' },
      { name: 'Local Maps & Google 3-Pack', href: '/services/local-seo' },
      { name: 'Online Reputation & Reviews', href: '/services/reputation-management' },
    ],
  },
  {
    label: 'Paid Media & Social',
    items: [
      { name: 'Google & Meta Paid Ads', href: '/services/paid-ads' },
      { name: 'Social Media & Reels', href: '/services/social' },
      { name: 'Brand Identity & Packaging', href: '/services/branding' },
    ],
  },
  {
    label: 'Marketplace & Automation',
    items: [
      { name: 'Amazon India Operations', href: '/services/amazon' },
      { name: 'Flipkart Seller Operations', href: '/services/flipkart' },
      { name: 'Marketplace Growth Hub', href: '/services/marketplace-growth' },
      { name: 'WhatsApp API & CRM', href: '/services/whatsapp-crm-automation' },
      { name: 'Full Growth Systems', href: '/services/growth-systems' },
    ],
  },
] as const;

const TOP_INDUSTRIES = [
  { name: 'Local Retail & Stores', href: '/industries/local-business' },
  { name: 'Real Estate & Construction', href: '/industries/real-estate' },
  { name: 'Hospitals & Healthcare', href: '/industries/healthcare' },
  { name: 'Schools & Coaching', href: '/industries/education' },
  { name: 'Handloom & Textiles', href: '/industries/handloom-textiles' },
  { name: 'Manufacturing & Industrial', href: '/industries/manufacturing' },
  { name: 'eCommerce & D2C', href: '/industries/d2c-ecommerce' },
  { name: 'Hotels & Tourism', href: '/industries/hospitality-tourism' },
] as const;

const TOP_LOCATIONS = [
  { name: 'Bhubaneswar Studio', href: '/locations/bhubaneswar' },
  { name: 'Cuttack Trade Hub', href: '/locations/cuttack' },
  { name: 'Puri Coastal & Tourism', href: '/locations/puri' },
  { name: 'Rourkela Steel Belt', href: '/locations/rourkela' },
  { name: 'Sambalpur Weaving Hub', href: '/locations/sambalpur' },
  { name: 'Berhampur Silk Hub', href: '/locations/berhampur' },
] as const;

export function DezoNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
    setLocationsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  const linkClass = (href: string) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
    if (isTransparent) {
      return `dezo-nav-link text-[12px] font-mono uppercase tracking-wider font-semibold transition-colors ${
        active ? 'text-white' : 'text-white/80 hover:text-white'
      }`;
    }
    return `dezo-nav-link text-[12px] font-mono uppercase tracking-wider font-semibold transition-colors ${
      active ? 'text-dezo-primary font-bold' : 'text-dezo-ink hover:text-dezo-primary'
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-dezo-bg/95 backdrop-blur-md border-b-2 border-dezo-ink py-3 shadow-[0_4px_0_0_rgba(11,11,10,0.15)]'
          : isHome
          ? 'bg-transparent py-5 border-b border-white/[0.12]'
          : 'bg-dezo-bg-warm py-4 border-b-2 border-dezo-ink'
      }`}
    >
      <DezoContainer size="wide">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" aria-label="DEZO homepage" className="group flex items-baseline gap-2.5">
            <span
              className={`font-display text-2xl sm:text-3xl font-black tracking-tightest uppercase transition-colors ${
                isTransparent
                  ? 'text-white group-hover:text-dezo-primary'
                  : 'text-dezo-ink group-hover:text-dezo-primary'
              }`}
            >
              DEZO
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-widest text-dezo-primary font-bold">
              [EST. 2026]
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-6">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`${linkClass('/services')} inline-flex items-center gap-1 py-2`}
              >
                Services <ChevronDown size={12} />
              </Link>
              <div
                className={`absolute top-full -left-20 pt-2 transition-opacity ${
                  servicesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-dezo-bg border-2 border-dezo-ink shadow-[6px_6px_0_0_#0B0B0A] p-6 w-[36rem]">
                  <div className="grid grid-cols-2 gap-6">
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group.label}>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-dezo-primary mb-2.5 pb-1 border-b border-dezo-border">
                          {group.label}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {group.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="text-xs font-mono text-dezo-ink hover:text-dezo-primary transition-colors block"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t-2 border-dezo-ink/15 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-dezo-text-muted">
                      12 primary departments (A - L)
                    </span>
                    <Link
                      href="/services"
                      className="text-xs font-mono font-bold uppercase text-dezo-ink hover:text-dezo-primary inline-flex items-center gap-1"
                    >
                      Search Full Directory <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <Link
                href="/industries"
                className={`${linkClass('/industries')} inline-flex items-center gap-1 py-2`}
              >
                Industries <ChevronDown size={12} />
              </Link>
              <div
                className={`absolute top-full -left-12 pt-2 transition-opacity ${
                  industriesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-dezo-bg border-2 border-dezo-ink shadow-[6px_6px_0_0_#0B0B0A] p-6 w-[28rem]">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-dezo-primary mb-3 pb-1 border-b border-dezo-border flex items-center gap-1.5">
                    <Building2 size={12} /> Tailored Sector Blueprints
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {TOP_INDUSTRIES.map((ind) => (
                      <Link
                        key={ind.name}
                        href={ind.href}
                        className="text-xs font-mono text-dezo-ink hover:text-dezo-primary transition-colors py-0.5 block"
                      >
                        {ind.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-dezo-border flex justify-end">
                    <Link
                      href="/industries"
                      className="text-xs font-mono font-bold uppercase text-dezo-ink hover:text-dezo-primary inline-flex items-center gap-1"
                    >
                      All 16 Industry Solutions <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Odisha Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
            >
              <Link
                href="/locations"
                className={`${linkClass('/locations')} inline-flex items-center gap-1 py-2`}
              >
                Odisha Hubs <ChevronDown size={12} />
              </Link>
              <div
                className={`absolute top-full -left-12 pt-2 transition-opacity ${
                  locationsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-dezo-bg border-2 border-dezo-ink shadow-[6px_6px_0_0_#0B0B0A] p-6 w-[26rem]">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-dezo-primary mb-3 pb-1 border-b border-dezo-border flex items-center gap-1.5">
                    <MapPin size={12} /> Regional Delivery Coverage
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {TOP_LOCATIONS.map((loc) => (
                      <Link
                        key={loc.name}
                        href={loc.href}
                        className="text-xs font-mono text-dezo-ink hover:text-dezo-primary transition-colors py-0.5 block"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-dezo-border flex justify-end">
                    <Link
                      href="/locations"
                      className="text-xs font-mono font-bold uppercase text-dezo-ink hover:text-dezo-primary inline-flex items-center gap-1"
                    >
                      All 25 Odisha Districts <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/work" className={linkClass('/work')}>
              Work
            </Link>
            <Link href="/growth-lab" className={linkClass('/growth-lab')}>
              DEZO LAB
            </Link>
            <Link href="/careers" className={linkClass('/careers')}>
              Careers
            </Link>
            <Link href="/pricing" className={linkClass('/pricing')}>
              Pricing
            </Link>
            <Link href="/about" className={linkClass('/about')}>
              About
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              href="/start-a-project"
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all border-2 border-dezo-ink ${
                isTransparent
                  ? 'bg-white text-dezo-ink hover:bg-dezo-primary hover:text-white shadow-[2px_2px_0_0_#B08D57]'
                  : 'bg-dezo-ink text-dezo-bg hover:bg-dezo-primary hover:text-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
              }`}
            >
              Growth Plan Builder
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2.5 border-2 transition-colors ${
              isTransparent
                ? 'border-white/30 text-white bg-black/20 hover:bg-black/40'
                : 'border-dezo-ink text-dezo-ink bg-dezo-bg hover:bg-dezo-bg-warm'
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </DezoContainer>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 top-[65px] bg-dezo-bg z-40 xl:hidden flex flex-col px-6 py-8 overflow-y-auto transition-all ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4 divide-y divide-dezo-border">
          <div className="space-y-3 pb-3">
            <Link href="/services" className="font-display text-xl uppercase font-bold text-dezo-ink block">
              Services Directory
            </Link>
            <div className="grid grid-cols-2 gap-2 pl-3">
              <Link href="/services/web-development" className="text-xs font-mono text-dezo-text-secondary">
                Web & Next.js
              </Link>
              <Link href="/services/seo" className="text-xs font-mono text-dezo-text-secondary">
                SEO & Maps
              </Link>
              <Link href="/services/paid-ads" className="text-xs font-mono text-dezo-text-secondary">
                Google/Meta Ads
              </Link>
              <Link href="/services/amazon" className="text-xs font-mono text-dezo-text-secondary">
                Amazon Growth
              </Link>
              <Link href="/services/whatsapp-crm-automation" className="text-xs font-mono text-dezo-text-secondary">
                WhatsApp API
              </Link>
              <Link href="/services/growth-systems" className="text-xs font-mono text-dezo-text-secondary">
                Growth Systems
              </Link>
            </div>
          </div>

          <div className="space-y-2 pt-3 pb-3">
            <Link href="/industries" className="font-display text-xl uppercase font-bold text-dezo-ink block">
              Industry Solutions
            </Link>
            <div className="grid grid-cols-2 gap-2 pl-3">
              <Link href="/industries/local-business" className="text-xs font-mono text-dezo-text-secondary">
                Local Retail
              </Link>
              <Link href="/industries/real-estate" className="text-xs font-mono text-dezo-text-secondary">
                Real Estate
              </Link>
              <Link href="/industries/healthcare" className="text-xs font-mono text-dezo-text-secondary">
                Healthcare
              </Link>
              <Link href="/industries/handloom-textiles" className="text-xs font-mono text-dezo-text-secondary">
                Handloom D2C
              </Link>
            </div>
          </div>

          <div className="space-y-2 pt-3 pb-3">
            <Link href="/locations" className="font-display text-xl uppercase font-bold text-dezo-ink block">
              Odisha Locations
            </Link>
            <div className="grid grid-cols-3 gap-2 pl-3">
              <Link href="/locations/bhubaneswar" className="text-xs font-mono text-dezo-text-secondary">
                Bhubaneswar
              </Link>
              <Link href="/locations/cuttack" className="text-xs font-mono text-dezo-text-secondary">
                Cuttack
              </Link>
              <Link href="/locations/puri" className="text-xs font-mono text-dezo-text-secondary">
                Puri
              </Link>
              <Link href="/locations/rourkela" className="text-xs font-mono text-dezo-text-secondary">
                Rourkela
              </Link>
              <Link href="/locations/sambalpur" className="text-xs font-mono text-dezo-text-secondary">
                Sambalpur
              </Link>
              <Link href="/locations/berhampur" className="text-xs font-mono text-dezo-text-secondary">
                Berhampur
              </Link>
            </div>
          </div>

          <div className="pt-3 space-y-3">
            <Link href="/work" className="font-display text-lg uppercase font-bold text-dezo-ink block">
              Live Work Archive (70+ Projects)
            </Link>
            <Link href="/growth-lab" className="font-display text-lg uppercase font-bold text-dezo-ink block">
              DEZO LAB Diagnostics
            </Link>
            <Link href="/careers" className="font-display text-lg uppercase font-bold text-dezo-ink flex items-center justify-between">
              <span>Careers &amp; Internship</span>
              <span className="text-[10px] font-mono text-dezo-primary font-bold uppercase border border-dezo-primary px-1.5 py-0.5">Always Hiring</span>
            </Link>
            <Link href="/pricing" className="font-display text-lg uppercase font-bold text-dezo-ink block">
              Engagement Models & Pricing
            </Link>
            <Link href="/about" className="font-display text-lg uppercase font-bold text-dezo-ink block">
              About & Patia Studio
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t-2 border-dezo-ink">
          <Link
            href="/start-a-project"
            className="w-full py-3.5 bg-dezo-primary text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink text-center block shadow-[3px_3px_0_0_#0B0B0A]"
          >
            Launch Growth Plan Builder
          </Link>
        </div>
      </div>
    </header>
  );
}

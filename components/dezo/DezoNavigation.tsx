'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { DezoButton } from './DezoButton';
import { DezoContainer } from './DezoContainer';

export function DezoNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Solutions', href: '/solutions', hasDropdown: true },
    { label: 'Industries', href: '/industries' },
    { label: 'Work', href: '/work' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Tools', href: '/tools', badge: 'Free' },
    { label: 'Odisha', href: '/locations/odisha', badge: 'Regional' },
    { label: 'Lab', href: '/lab' },
    { label: 'About', href: '/about' },
  ];

  const solutionPillars = [
    { name: 'BUILD', desc: 'Websites, Next.js & Shopify Storefronts', href: '/solutions/build' },
    { name: 'BRAND', desc: 'Identity, Packaging & Amazon Brand Stores', href: '/solutions/brand' },
    { name: 'MARKETPLACE', desc: 'Amazon & Flipkart Seller Scaling & PPC', href: '/solutions/marketplace' },
    { name: 'GROWTH', desc: 'Meta Ads, Google Shopping & Technical SEO', href: '/solutions/growth' },
    { name: 'INTELLIGENCE', desc: 'DEZO Growth OS & AI Seller Alerts', href: '/solutions/intelligence' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dezo-bg/95 backdrop-blur-xl border-b border-dezo-border py-3 shadow-lg'
          : 'bg-transparent py-5 lg:py-6'
      }`}
    >
      <DezoContainer size="wide">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="DEZO.in Homepage"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-2xl font-black tracking-tight text-dezo-text-primary group-hover:text-dezo-accent transition-colors">
              DEZO<span className="text-dezo-primary">.in</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden xl:flex items-center gap-6 ${
              !scrolled
                ? 'bg-dezo-surface/80 border border-dezo-border/80 px-7 py-2.5 rounded-full backdrop-blur-md'
                : ''
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative group/dropdown"
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors py-1 ${
                        isActive
                          ? 'text-dezo-accent'
                          : 'text-dezo-text-secondary hover:text-dezo-text-primary'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={12} className="transition-transform group-hover/dropdown:rotate-180" />
                    </Link>

                    {/* Solutions Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 w-80 pt-2 transition-all duration-200 ${
                        solutionsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="p-3 rounded-dezo-lg bg-dezo-surface border border-dezo-border shadow-dezo-card flex flex-col gap-1">
                        {solutionPillars.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="p-2.5 rounded-dezo-sm hover:bg-dezo-surface-elevated transition-colors flex flex-col"
                          >
                            <span className="text-xs font-black text-dezo-text-primary">{p.name}</span>
                            <span className="text-[11px] text-dezo-text-muted">{p.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'text-dezo-accent'
                      : 'text-dezo-text-secondary hover:text-dezo-text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-dezo-accent/10 text-dezo-accent border border-dezo-accent/20">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+919114411026"
              className="flex items-center gap-2 text-xs font-bold text-dezo-text-secondary hover:text-dezo-text-primary transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-dezo-surface border border-dezo-border flex items-center justify-center text-dezo-accent">
                <Phone size={12} />
              </div>
              <span>+91 9114411026</span>
            </a>

            <DezoButton href="/start-a-project" size="sm" magnetic>
              Start a Project
            </DezoButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full bg-dezo-surface border border-dezo-border text-dezo-text-primary cursor-pointer active:scale-95"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </DezoContainer>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[60px] bg-dezo-bg/95 backdrop-blur-2xl z-40 xl:hidden flex flex-col justify-between px-6 py-8 overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4 text-center">
          <Link
            href="/solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-text-primary hover:text-dezo-accent transition-colors"
          >
            Solutions (Build, Brand, Marketplace)
          </Link>
          <Link
            href="/industries"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-text-primary hover:text-dezo-accent transition-colors"
          >
            Industries We Scale
          </Link>
          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-text-primary hover:text-dezo-accent transition-colors"
          >
            Work & 100+ Live Proofs
          </Link>
          <Link
            href="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-text-primary hover:text-dezo-accent transition-colors"
          >
            Marketplace Intelligence
          </Link>
          <Link
            href="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-accent transition-colors"
          >
            DEZO Tools Lab (Free Audits)
          </Link>
          <Link
            href="/locations/odisha"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-accent transition-colors"
          >
            DEZO Odisha & Bhubaneswar
          </Link>
          <Link
            href="/lab"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-text-primary hover:text-dezo-accent transition-colors"
          >
            DEZO Lab
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-dezo-text-primary hover:text-dezo-accent transition-colors"
          >
            About Studio
          </Link>
        </div>

        <div className="flex flex-col gap-4 text-center pt-8 border-t border-dezo-border">
          <a
            href="tel:+919114411026"
            className="flex items-center justify-center gap-2 text-sm font-bold text-dezo-text-secondary"
          >
            <Phone size={14} className="text-dezo-accent" />
            +91 9114411026
          </a>
          <DezoButton href="/start-a-project" size="lg" className="w-full">
            Start a Project
          </DezoButton>
        </div>
      </div>
    </header>
  );
}

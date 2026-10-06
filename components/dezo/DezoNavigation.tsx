'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { DezoButton } from './DezoButton';
import { DezoContainer } from './DezoContainer';
import { servicePillars, industries } from '@/content/site';

export function DezoNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  const linkClass = (href: string) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
    return `dezo-nav-link text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
      active ? 'text-dezo-primary' : 'text-dezo-text-secondary hover:text-dezo-text-primary'
    }`;
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-dezo-primary text-dezo-text-inverse text-center text-[11px] sm:text-xs font-semibold tracking-wide py-2 px-4">
        BUILD. MARKET. GROW. — Free Growth Audit available ·{' '}
        <Link href="/growth-lab" className="underline underline-offset-2">
          Open Growth Lab
        </Link>
      </div>

      <header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'px-3 sm:px-6 py-2' : 'px-0 py-3'
        }`}
      >
        <DezoContainer size="wide">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? 'dezo-pill-nav rounded-dezo-pill px-4 sm:px-6 py-2.5'
                : 'bg-transparent px-1 py-2'
            }`}
          >
            <Link href="/" aria-label="DEZO homepage" className="group">
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tightest text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                DEZO
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden xl:flex items-center gap-6">
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link href="/services" className={`${linkClass('/services')} inline-flex items-center gap-1`}>
                  Services <ChevronDown size={12} />
                </Link>
                <div
                  className={`absolute top-full left-0 w-72 pt-3 transition-all ${
                    servicesOpen
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="dezo-glass rounded-dezo-lg p-2 flex flex-col">
                    {servicePillars.map((p) => (
                      <Link
                        key={p.slug}
                        href={p.href}
                        className="px-3 py-2.5 rounded-dezo-sm hover:bg-white/[0.04] transition-colors"
                      >
                        <span className="text-sm font-semibold text-dezo-text-primary">{p.name}</span>
                        <span className="block text-[11px] text-dezo-text-muted mt-0.5">
                          {p.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <Link
                  href="/industries"
                  className={`${linkClass('/industries')} inline-flex items-center gap-1`}
                >
                  Solutions <ChevronDown size={12} />
                </Link>
                <div
                  className={`absolute top-full left-0 w-64 pt-3 transition-all ${
                    solutionsOpen
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="dezo-glass rounded-dezo-lg p-2 flex flex-col">
                    {industries.map((i) => (
                      <Link
                        key={i.href}
                        href={i.href}
                        className="px-3 py-2 text-sm text-dezo-text-secondary hover:text-dezo-text-primary rounded-dezo-sm hover:bg-white/[0.04]"
                      >
                        {i.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/results" className={linkClass('/results')}>
                Results
              </Link>
              <Link href="/growth-lab" className={linkClass('/growth-lab')}>
                Growth Lab
              </Link>
              <Link href="/resources" className={linkClass('/resources')}>
                Resources
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <DezoButton href="/growth-lab" size="sm">
                Get Free Audit
              </DezoButton>
            </div>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close' : 'Open'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-dezo-md border border-dezo-border text-dezo-text-primary"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </DezoContainer>
      </header>

      <div
        className={`fixed inset-0 top-[72px] bg-dezo-bg z-40 xl:hidden flex flex-col px-6 py-8 overflow-y-auto transition-all ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-5">
          {[
            ['Services', '/services'],
            ['Industries', '/industries'],
            ['Results', '/results'],
            ['Work', '/work'],
            ['Growth Lab', '/growth-lab'],
            ['Pricing', '/pricing'],
            ['Resources', '/resources'],
            ['About', '/about'],
            ['Contact', '/contact'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="font-display text-2xl font-bold text-dezo-text-primary"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-8">
          <DezoButton href="/growth-lab" size="lg" className="w-full">
            Get Free Audit
          </DezoButton>
        </div>
      </div>
    </>
  );
}

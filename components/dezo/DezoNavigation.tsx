'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { DezoButton } from './DezoButton';
import { DezoContainer } from './DezoContainer';

const SERVICE_GROUPS = [
  {
    label: 'Build',
    items: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Ecommerce', href: '/services/web-development' },
      { name: 'Growth Systems', href: '/services/growth-systems' },
    ],
  },
  {
    label: 'Grow',
    items: [
      { name: 'SEO', href: '/services/seo' },
      { name: 'Brand & Creative', href: '/services/branding' },
    ],
  },
  {
    label: 'Sell',
    items: [
      { name: 'Amazon', href: '/services/amazon' },
      { name: 'Flipkart', href: '/services/flipkart' },
    ],
  },
  {
    label: 'Advertise',
    items: [
      { name: 'Meta & Google Ads', href: '/services/paid-ads' },
      { name: 'Social Media', href: '/services/social' },
    ],
  },
] as const;

export function DezoNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  const linkClass = (href: string) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
    if (isTransparent) {
      return `dezo-nav-link text-[12px] font-medium tracking-wide transition-colors ${
        active ? 'text-white' : 'text-white/75 hover:text-white'
      }`;
    }
    return `dezo-nav-link text-[12px] font-medium tracking-wide transition-colors ${
      active ? 'text-dezo-text-primary' : 'text-dezo-text-secondary hover:text-dezo-text-primary'
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dezo-bg/95 backdrop-blur-md border-b border-dezo-border py-3 shadow-xs'
          : isHome
          ? 'bg-transparent py-5 border-b border-white/[0.08]'
          : 'bg-dezo-bg-warm/95 backdrop-blur-sm py-5 border-b border-transparent'
      }`}
    >
      <DezoContainer size="wide">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="DEZO homepage" className="group">
            <span
              className={`font-display text-2xl tracking-tight transition-colors ${
                isTransparent
                  ? 'text-white group-hover:text-dezo-primary'
                  : 'text-dezo-text-primary group-hover:text-dezo-primary'
              }`}
            >
              DEZO
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`${linkClass('/services')} inline-flex items-center gap-1`}
              >
                Services <ChevronDown size={12} />
              </Link>
              <div
                className={`absolute top-full left-0 pt-3 transition-opacity ${
                  servicesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-dezo-surface border border-dezo-border shadow-dezo-card p-5 w-[28rem] grid grid-cols-2 gap-6">
                  {SERVICE_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-dezo-text-muted mb-2">
                        {group.label}
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {group.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="text-sm text-dezo-text-secondary hover:text-dezo-text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/work" className={linkClass('/work')}>
              Work
            </Link>
            <Link href="/growth-lab" className={linkClass('/growth-lab')}>
              Lab
            </Link>
            <Link href="/pricing" className={linkClass('/pricing')}>
              Pricing
            </Link>
            <Link href="/about" className={linkClass('/about')}>
              About
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/promise"
              className={`text-[12px] font-medium transition-colors ${
                isTransparent
                  ? 'text-white/75 hover:text-white'
                  : 'text-dezo-text-secondary hover:text-dezo-text-primary'
              }`}
            >
              Standard
            </Link>
            <DezoButton
              href="/start-a-project"
              size="sm"
              className={
                isTransparent
                  ? '!bg-white !text-dezo-ink hover:!bg-white/90 border-transparent shadow-xs'
                  : ''
              }
            >
              Get started
            </DezoButton>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close' : 'Open'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 border transition-colors ${
              isTransparent
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-dezo-border text-dezo-text-primary hover:bg-black/5'
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </DezoContainer>

      <div
        className={`fixed inset-0 top-[60px] bg-dezo-bg z-40 lg:hidden flex flex-col px-6 py-8 overflow-y-auto transition-opacity ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-5">
          {[
            ['Services', '/services'],
            ['Work', '/work'],
            ['Lab', '/growth-lab'],
            ['Pricing', '/pricing'],
            ['About', '/about'],
            ['DEZO Standard', '/promise'],
            ['Contact', '/contact'],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="font-display text-2xl text-dezo-text-primary">
              {label}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-8">
          <DezoButton href="/start-a-project" size="lg" className="w-full">
            Get started
          </DezoButton>
        </div>
      </div>
    </header>
  );
}

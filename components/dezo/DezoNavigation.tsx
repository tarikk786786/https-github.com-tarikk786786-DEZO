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

  const linkClass = (href: string) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
    return `dezo-nav-link text-[12px] font-medium tracking-wide transition-colors ${
      active ? 'text-dezo-text-primary' : 'text-dezo-text-secondary hover:text-dezo-text-primary'
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dezo-bg/95 backdrop-blur-sm border-b border-dezo-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <DezoContainer size="wide">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="DEZO homepage" className="group">
            <span className="font-display text-2xl tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
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

            <Link href="/industries" className={linkClass('/industries')}>
              Solutions
            </Link>
            <Link href="/work" className={linkClass('/work')}>
              Work
            </Link>
            <Link href="/growth-lab" className={linkClass('/growth-lab')}>
              Lab
            </Link>
            <Link href="/resources" className={linkClass('/resources')}>
              Insights
            </Link>
            <Link href="/about" className={linkClass('/about')}>
              About
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/promise"
              className="text-[12px] font-medium text-dezo-text-secondary hover:text-dezo-text-primary transition-colors"
            >
              Standard
            </Link>
            <DezoButton href="/start-a-project" size="sm">
              Start a Project
            </DezoButton>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close' : 'Open'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 border border-dezo-border text-dezo-text-primary"
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
            ['Solutions', '/industries'],
            ['Work', '/work'],
            ['Lab', '/growth-lab'],
            ['Insights', '/resources'],
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
            Start a Project
          </DezoButton>
        </div>
      </div>
    </header>
  );
}

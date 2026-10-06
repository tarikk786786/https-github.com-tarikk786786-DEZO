'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { DezoButton } from './DezoButton';
import { DezoContainer } from './DezoContainer';
import { pillars } from '@/content/site';

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
    { label: 'Work', href: '/work' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Tools Lab', href: '/tools' },
    { label: 'Odisha', href: '/locations/odisha' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dezo-bg/90 backdrop-blur-md border-b border-dezo-border py-3'
          : 'bg-transparent py-5 lg:py-6'
      }`}
    >
      <DezoContainer size="wide">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="DEZO homepage"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-display text-2xl font-extrabold tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
              DEZO
            </span>
          </Link>

          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-7"
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

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
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors py-1 ${
                        isActive
                          ? 'text-dezo-primary'
                          : 'text-dezo-text-secondary hover:text-dezo-text-primary'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={12}
                        className="transition-transform group-hover/dropdown:rotate-180"
                      />
                    </Link>

                    <div
                      className={`absolute top-full left-0 w-80 pt-2 transition-all duration-200 ${
                        solutionsOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="p-2 rounded-dezo-lg bg-dezo-surface border border-dezo-border shadow-dezo-card flex flex-col gap-0.5">
                        {pillars.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="p-3 rounded-dezo-sm hover:bg-dezo-bg transition-colors flex flex-col"
                          >
                            <span className="text-xs font-bold text-dezo-text-primary tracking-wide">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-dezo-text-muted mt-0.5">
                              {p.summary}
                            </span>
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
                  className={`text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'text-dezo-primary'
                      : 'text-dezo-text-secondary hover:text-dezo-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+919114411026"
              className="flex items-center gap-2 text-xs font-semibold text-dezo-text-secondary hover:text-dezo-text-primary transition-colors"
            >
              <Phone size={14} className="text-dezo-primary" />
              <span>+91 9114411026</span>
            </a>

            <DezoButton href="/start-a-project" size="sm">
              Start a Project
            </DezoButton>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-dezo-md bg-dezo-surface border border-dezo-border text-dezo-text-primary cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </DezoContainer>

      <div
        className={`fixed inset-0 top-[60px] bg-dezo-bg z-40 xl:hidden flex flex-col justify-between px-6 py-8 overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-5">
          {[
            ['Solutions', '/solutions'],
            ['Work', '/work'],
            ['Marketplace', '/marketplace'],
            ['Tools Lab', '/tools'],
            ['Odisha', '/locations/odisha'],
            ['About', '/about'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-dezo-text-primary hover:text-dezo-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-8 border-t border-dezo-border">
          <a
            href="tel:+919114411026"
            className="flex items-center gap-2 text-sm font-semibold text-dezo-text-secondary"
          >
            <Phone size={14} className="text-dezo-primary" />
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

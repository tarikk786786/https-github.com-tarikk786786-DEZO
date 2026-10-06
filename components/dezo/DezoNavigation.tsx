'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { DezoButton } from './DezoButton';
import { DezoContainer } from './DezoContainer';

export function DezoNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Lab', href: '/lab' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dezo-bg/90 backdrop-blur-xl border-b border-dezo-border py-3 shadow-lg'
          : 'bg-transparent py-5 lg:py-6'
      }`}
    >
      <DezoContainer size="wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="DEZO Homepage"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-2xl font-black tracking-tight text-dezo-text-primary group-hover:text-dezo-accent transition-colors">
              DEZO<span className="text-dezo-primary">.in</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden md:flex items-center gap-8 ${
              !scrolled
                ? 'bg-dezo-surface/80 border border-dezo-border/80 px-7 py-2.5 rounded-full backdrop-blur-md'
                : ''
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'text-dezo-accent'
                      : 'text-dezo-text-secondary hover:text-dezo-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+919114411026"
              className="flex items-center gap-2 text-xs font-bold text-dezo-text-secondary hover:text-dezo-text-primary transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-dezo-surface border border-dezo-border flex items-center justify-center text-dezo-accent">
                <Phone size={12} />
              </div>
              <span>+91 9114411026</span>
            </a>

            <DezoButton href="/contact" size="sm" magnetic>
              Start a Project
            </DezoButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-dezo-surface border border-dezo-border text-dezo-text-primary cursor-pointer active:scale-95"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </DezoContainer>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[60px] bg-dezo-bg/95 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between px-6 py-10 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black tracking-tight text-dezo-text-primary hover:text-dezo-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-center">
          <a
            href="tel:+919114411026"
            className="flex items-center justify-center gap-2 text-sm font-bold text-dezo-text-secondary"
          >
            <Phone size={14} className="text-dezo-accent" />
            +91 9114411026
          </a>
          <DezoButton href="/contact" size="lg" className="w-full">
            Start a Project
          </DezoButton>
        </div>
      </div>
    </header>
  );
}

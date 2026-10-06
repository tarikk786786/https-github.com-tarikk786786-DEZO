import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { DezoContainer } from './DezoContainer';

export function DezoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dezo-surface border-t border-dezo-border pt-16 sm:pt-20 pb-12 text-dezo-text-secondary">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-dezo-border/60">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tight text-dezo-text-primary">
                DEZO<span className="text-dezo-primary">.in</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-dezo-text-secondary">
              Digital Engineering & Growth Studio. We craft high-converting web architectures, bespoke ecommerce platforms, and performance engines for ambitious founders and enterprises.
            </p>
            <div className="flex flex-col gap-1.5 text-xs">
              <span className="text-dezo-text-muted uppercase font-bold tracking-widest">Leadership</span>
              <span className="text-dezo-text-primary font-semibold">Tarik Islam (Director) · Rohan Dinkar Sanap (CEO)</span>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-primary">
              Core Capabilities
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/services#web-development" className="hover:text-dezo-text-primary transition-colors">
                  Web Development & Next.js
                </Link>
              </li>
              <li>
                <Link href="/services#ecommerce" className="hover:text-dezo-text-primary transition-colors">
                  Ecommerce Platforms & D2C
                </Link>
              </li>
              <li>
                <Link href="/services#seo" className="hover:text-dezo-text-primary transition-colors">
                  Organic SEO & Technical Growth
                </Link>
              </li>
              <li>
                <Link href="/services#marketing" className="hover:text-dezo-text-primary transition-colors">
                  Meta & Google Performance Ads
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-dezo-text-primary transition-colors">
                  DEZO LAB (Experimental)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-primary">
              Studio
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/work" className="hover:text-dezo-text-primary transition-colors">
                  Case Studies & Proofs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-dezo-text-primary transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-dezo-text-primary transition-colors">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-primary">
              Direct Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:+919114411026"
                className="flex items-center gap-2 hover:text-dezo-text-primary transition-colors"
              >
                <Phone size={14} className="text-dezo-accent shrink-0" />
                <span>+91 9114411026</span>
              </a>
              <a
                href="mailto:contact@dezo.in"
                className="flex items-center gap-2 hover:text-dezo-text-primary transition-colors"
              >
                <Mail size={14} className="text-dezo-accent shrink-0" />
                <span>contact@dezo.in</span>
              </a>
              <div className="flex items-start gap-2 text-xs leading-relaxed text-dezo-text-muted mt-2">
                <MapPin size={14} className="text-dezo-accent shrink-0 mt-0.5" />
                <span>Phase 2, Patia, Bhubaneswar, Odisha 751024, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dezo-text-muted">
          <p>© {currentYear} DEZO.in. All rights reserved.</p>
          <p className="font-mono">Engineered with Next.js & DEZO Growth Engine.</p>
        </div>
      </DezoContainer>
    </footer>
  );
}

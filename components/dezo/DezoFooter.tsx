import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { DezoContainer } from './DezoContainer';

export function DezoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dezo-surface border-t border-dezo-border pt-16 sm:pt-20 pb-12 text-dezo-text-secondary">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-dezo-border/60">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tight text-dezo-text-primary">
                DEZO<span className="text-dezo-primary">.in</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm text-dezo-text-secondary">
              Digital Commerce, Brand, Marketplace & Growth Technology Platform. Built in Odisha. Built for India. Built to scale.
            </p>
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-dezo-text-muted uppercase font-bold tracking-widest">Leadership</span>
              <span className="text-dezo-text-primary font-semibold">Tarik Islam (Director) · Rohan Dinkar Sanap (CEO)</span>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-primary">
              Core Pillars
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/solutions/build" className="hover:text-dezo-text-primary transition-colors">
                  BUILD: High-Speed Web & Ecommerce
                </Link>
              </li>
              <li>
                <Link href="/solutions/brand" className="hover:text-dezo-text-primary transition-colors">
                  BRAND: Identity, Packaging & A+
                </Link>
              </li>
              <li>
                <Link href="/solutions/marketplace" className="hover:text-dezo-text-primary transition-colors">
                  MARKETPLACE: Amazon & Flipkart
                </Link>
              </li>
              <li>
                <Link href="/solutions/growth" className="hover:text-dezo-text-primary transition-colors">
                  GROW: Performance Ads & SEO
                </Link>
              </li>
              <li>
                <Link href="/solutions/intelligence" className="hover:text-dezo-text-primary transition-colors">
                  INTELLIGENCE: DEZO Growth OS
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional & Studio */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-primary">
              Regional & Labs
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/locations/odisha" className="hover:text-dezo-accent transition-colors font-semibold">
                  DEZO Odisha
                </Link>
              </li>
              <li>
                <Link href="/locations/bhubaneswar" className="hover:text-dezo-accent transition-colors font-semibold">
                  Bhubaneswar Studio
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-dezo-text-primary transition-colors">
                  Marketplace Intelligence
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-dezo-text-primary transition-colors">
                  Industries We Scale
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-dezo-text-primary transition-colors">
                  DEZO LAB (R&D)
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-dezo-text-primary">
              Studio Headquarters
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a href="tel:+919114411026" className="flex items-center gap-2 hover:text-dezo-text-primary transition-colors font-bold">
                <Phone size={13} className="text-dezo-accent shrink-0" />
                <span>+91 9114411026</span>
              </a>
              <a href="mailto:contact@dezo.in" className="flex items-center gap-2 hover:text-dezo-text-primary transition-colors">
                <Mail size={13} className="text-dezo-accent shrink-0" />
                <span>contact@dezo.in</span>
              </a>
              <div className="flex items-start gap-2 text-xs leading-relaxed text-dezo-text-muted mt-1">
                <MapPin size={13} className="text-dezo-accent shrink-0 mt-0.5" />
                <span>Phase 2, Patia, Bhubaneswar, Odisha 751024, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dezo-text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {currentYear} DEZO.in. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-dezo-text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-dezo-text-primary transition-colors">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-dezo-text-primary transition-colors">
              Disclaimer
            </Link>
          </div>
          <p className="font-mono text-[11px]">DEZO Growth OS · Built in Odisha, for India.</p>
        </div>
      </DezoContainer>
    </footer>
  );
}

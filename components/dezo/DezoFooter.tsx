import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { DezoContainer } from './DezoContainer';
import { brand, contact, leadership } from '@/content/site';

export function DezoFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-dezo-ink text-dezo-text-inverse pt-20 sm:pt-24 pb-12 border-t-4 border-dezo-primary">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Studio Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-baseline gap-2.5">
              <span className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tightest text-white">DEZO</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-dezo-primary font-bold">[EST. 2026]</span>
            </Link>
            <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-dezo-primary">
              {brand.companyLabel}
            </p>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {brand.thesis}
            </p>
            <p className="font-mono text-xs text-white/50">{brand.geo}</p>

            <div className="text-xs pt-3 border-t border-white/10 mt-2">
              <p className="font-mono text-[10px] text-dezo-primary uppercase tracking-widest mb-1">FOUNDER &amp; CEO</p>
              <p className="text-white font-bold">{leadership.primary.name}</p>
              <p className="text-xs text-white/50">{leadership.primary.role}</p>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-primary mb-4 pb-1 border-b border-white/10">
              Services Directory
            </h3>
            <ul className="flex flex-col gap-2 text-xs font-mono text-white/70">
              <li>
                <Link href="/services/web-development" className="hover:text-dezo-primary transition-colors">
                  Web &amp; Next.js Build
                </Link>
              </li>
              <li>
                <Link href="/services/shopify-development" className="hover:text-dezo-primary transition-colors">
                  Shopify &amp; D2C Stores
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-growth" className="hover:text-dezo-primary transition-colors">
                  eCommerce Growth &amp; Store Setup
                </Link>
              </li>
              <li>
                <Link href="/services/amazon" className="hover:text-dezo-primary transition-colors">
                  Amazon India Operations
                </Link>
              </li>
              <li>
                <Link href="/services/flipkart" className="hover:text-dezo-primary transition-colors">
                  Flipkart Seller Hub &amp; PLA
                </Link>
              </li>
              <li>
                <Link href="/services/marketplace-growth" className="hover:text-dezo-primary transition-colors">
                  Marketplace Growth Hub
                </Link>
              </li>
              <li>
                <Link href="/services/whatsapp-crm-automation" className="hover:text-dezo-primary transition-colors">
                  WhatsApp Business API
                </Link>
              </li>
              <li>
                <Link href="/services/growth-systems" className="hover:text-dezo-primary transition-colors">
                  Full Growth Systems
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/services" className="text-dezo-primary hover:text-white inline-flex items-center gap-1">
                  All 12 Departments →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries & Odisha Hubs Column */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-primary mb-4 pb-1 border-b border-white/10">
              Industry Blueprints
            </h3>
            <ul className="flex flex-col gap-2 text-xs font-mono text-white/70 mb-6">
              <li>
                <Link href="/industries/local-business" className="hover:text-dezo-primary transition-colors">
                  Local Retail &amp; Stores
                </Link>
              </li>
              <li>
                <Link href="/industries/real-estate" className="hover:text-dezo-primary transition-colors">
                  Real Estate &amp; Construction
                </Link>
              </li>
              <li>
                <Link href="/industries/healthcare" className="hover:text-dezo-primary transition-colors">
                  Hospitals &amp; Healthcare
                </Link>
              </li>
              <li>
                <Link href="/industries/handloom-textiles" className="hover:text-dezo-primary transition-colors">
                  Handloom &amp; Textiles
                </Link>
              </li>
              <li>
                <Link href="/industries/manufacturing" className="hover:text-dezo-primary transition-colors">
                  Industrial Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-dezo-primary hover:text-white inline-flex items-center gap-1">
                  All 16 Industry Solutions →
                </Link>
              </li>
            </ul>

            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-primary mb-3 pb-1 border-b border-white/10">
              Odisha Service Hubs
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-white/60">
              <Link href="/locations/bhubaneswar" className="hover:text-dezo-primary">Bhubaneswar</Link> ·
              <Link href="/locations/cuttack" className="hover:text-dezo-primary">Cuttack</Link> ·
              <Link href="/locations/puri" className="hover:text-dezo-primary">Puri</Link> ·
              <Link href="/locations/rourkela" className="hover:text-dezo-primary">Rourkela</Link> ·
              <Link href="/locations/sambalpur" className="hover:text-dezo-primary">Sambalpur</Link> ·
              <Link href="/locations" className="text-dezo-primary hover:text-white">All 25 Hubs →</Link>
            </div>
          </div>

          {/* Contact & Studio Details */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-primary mb-4 pb-1 border-b border-white/10">
              Founding Studio
            </h3>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-white/70">
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 hover:text-white font-medium py-1"
              >
                <Phone size={13} className="text-dezo-primary shrink-0" />
                {contact.phoneFormatted}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 hover:text-white py-1"
              >
                <Mail size={13} className="text-dezo-primary shrink-0" />
                {contact.email}
              </a>
              <div className="flex items-start gap-2 text-white/50 pt-1 leading-relaxed">
                <MapPin size={13} className="text-dezo-primary shrink-0 mt-0.5" />
                <span>
                  {contact.address.street}, {contact.address.city}, {contact.address.region} {contact.address.postalCode}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link href="/work" className="text-xs font-mono text-white/70 hover:text-white">
                Live Portfolio (181+ Sites)
              </Link>
              <Link href="/growth-lab" className="text-xs font-mono text-white/70 hover:text-white">
                DEZO LAB Diagnostics
              </Link>
              <Link href="/pricing" className="text-xs font-mono text-white/70 hover:text-white">
                Engagement Models
              </Link>
              <Link href="/promise" className="text-xs font-mono text-white/70 hover:text-white">
                DEZO Standard Guarantee
              </Link>
              <Link href="/badges" className="text-xs font-mono text-white/70 hover:text-white">
                Partner &amp; Client Badges
              </Link>
              <Link href="/careers" className="text-xs font-mono text-dezo-primary font-bold hover:text-white flex items-center gap-1">
                Careers (Always Hiring) →
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex flex-wrap gap-5">
            <p>© {year} DEZO · Digital Infrastructure for Ambitious Businesses</p>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-white">
              Disclaimer
            </Link>
          </div>
          <p className="font-mono text-[11px] text-dezo-primary">Patia, Bhubaneswar · Delivery Statewide &amp; India</p>
        </div>
      </DezoContainer>
    </footer>
  );
}

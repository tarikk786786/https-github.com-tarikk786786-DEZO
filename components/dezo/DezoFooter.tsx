import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { DezoContainer } from './DezoContainer';
import { brand, contact, leadership, servicePillars } from '@/content/site';

export function DezoFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-dezo-bg border-t border-dezo-border pt-20 sm:pt-24 pb-12">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-dezo-border">
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/">
              <span className="font-display text-4xl font-extrabold tracking-tightest text-dezo-text-primary">
                DEZO
              </span>
            </Link>
            <p className="text-sm text-dezo-text-secondary leading-relaxed max-w-sm">
              {brand.tagline}
            </p>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dezo-primary">
              {brand.tag}
            </p>
            <p className="text-xs text-dezo-text-muted">{brand.geo}</p>
            <div className="text-xs pt-2">
              <p className="text-dezo-text-muted uppercase tracking-widest mb-1">Leadership</p>
              <p className="text-dezo-text-primary font-medium">
                {leadership.primary.name} — {leadership.primary.role}
              </p>
              <p className="text-dezo-text-secondary">
                {leadership.partner.name} — {leadership.partner.role}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-dezo-text-secondary">
              {servicePillars.map((p) => (
                <li key={p.slug}>
                  <Link href={p.href} className="hover:text-dezo-primary transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-4">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-dezo-text-secondary">
              <li>
                <Link href="/growth-lab" className="hover:text-dezo-primary">
                  Growth Lab
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-dezo-primary">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-dezo-primary">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-dezo-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-dezo-primary">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/book-strategy-call" className="hover:text-dezo-primary">
                  Book Strategy Call
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted mb-4">
              Studio
            </h4>
            <div className="flex flex-col gap-3 text-sm text-dezo-text-secondary">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 hover:text-dezo-primary font-medium"
              >
                <Phone size={13} className="text-dezo-primary shrink-0" />
                {contact.phoneFormatted}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-dezo-primary"
              >
                <Mail size={13} className="text-dezo-primary shrink-0" />
                {contact.email}
              </a>
              <div className="flex items-start gap-2 text-dezo-text-muted">
                <MapPin size={13} className="text-dezo-primary shrink-0 mt-0.5" />
                <span>
                  {contact.address.street}, {contact.address.city}, {contact.address.region}{' '}
                  {contact.address.postalCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dezo-text-muted">
          <div className="flex flex-wrap gap-5">
            <p>© {year} DEZO.in</p>
            <Link href="/privacy" className="hover:text-dezo-text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-dezo-text-primary">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-dezo-text-primary">
              Disclaimer
            </Link>
          </div>
          <p className="font-mono text-[11px]">dezo.in</p>
        </div>
      </DezoContainer>
    </footer>
  );
}

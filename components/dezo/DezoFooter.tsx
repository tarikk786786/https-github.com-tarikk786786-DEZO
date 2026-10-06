import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { DezoContainer } from './DezoContainer';
import { brand, contact, leadership, serviceRows } from '@/content/site';

export function DezoFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-dezo-ink text-dezo-text-inverse pt-20 sm:pt-24 pb-12">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/">
              <span className="font-display text-3xl tracking-tight text-white">DEZO</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              {brand.supporting}
            </p>
            <p className="text-xs text-white/40">{brand.geo}</p>
            <div className="text-xs pt-2">
              <p className="text-white/35 uppercase tracking-widest mb-1">Leadership</p>
              <p className="text-white/80 font-medium">
                {leadership.primary.name} — {leadership.primary.role}
              </p>
              <p className="text-white/50">
                {leadership.partner.name} — {leadership.partner.role}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              {serviceRows.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              <li>
                <Link href="/work" className="hover:text-white">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/growth-lab" className="hover:text-white">
                  DEZO LAB
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-4">
              Studio
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 hover:text-white font-medium"
              >
                <Phone size={13} className="text-dezo-primary shrink-0" />
                {contact.phoneFormatted}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail size={13} className="text-dezo-primary shrink-0" />
                {contact.email}
              </a>
              <div className="flex items-start gap-2 text-white/45">
                <MapPin size={13} className="text-dezo-primary shrink-0 mt-0.5" />
                <span>
                  {contact.address.street}, {contact.address.city}, {contact.address.region}{' '}
                  {contact.address.postalCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <div className="flex flex-wrap gap-5">
            <p>© {year} DEZO.in</p>
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
          <p className="font-mono text-[11px]">dezo.in</p>
        </div>
      </DezoContainer>
    </footer>
  );
}

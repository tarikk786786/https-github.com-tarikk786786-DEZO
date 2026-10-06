import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { DezoContainer } from './DezoContainer';
import { brand, contact, leadership, pillars } from '@/content/site';

export function DezoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full dezo-ink-field text-dezo-text-inverse pt-20 sm:pt-24 pb-12">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-10 pb-16 border-b border-white/10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <span className="font-display text-4xl font-extrabold tracking-tightest text-white">
                DEZO
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-white/65">
              {brand.tagline} {brand.positioning}.
            </p>
            <p className="text-xs font-medium tracking-wide text-dezo-highlight">
              {brand.geo}
            </p>
            <div className="flex flex-col gap-1 text-xs pt-2">
              <span className="text-white/35 uppercase font-semibold tracking-[0.16em]">
                Leadership
              </span>
              <span className="text-white font-medium">
                {leadership.primary.name} — {leadership.primary.role}
              </span>
              <span className="text-white/55">
                {leadership.partner.name} — {leadership.partner.role}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
              Pillars
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/65">
              {pillars.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-white transition-colors">
                    <span className="font-semibold text-white/90">{p.name}</span>
                    <span className="text-white/45"> · {p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/65">
              <li>
                <Link href="/tools" className="hover:text-white transition-colors">
                  Tools Lab
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/locations/odisha" className="hover:text-white transition-colors">
                  DEZO Odisha
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-white transition-colors">
                  Lab R&D
                </Link>
              </li>
              <li>
                <Link href="/start-a-project" className="hover:text-white transition-colors">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
              Studio
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/65">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors font-medium"
              >
                <Phone size={13} className="text-dezo-highlight shrink-0" />
                <span>{contact.phoneFormatted}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={13} className="text-dezo-highlight shrink-0" />
                <span>{contact.email}</span>
              </a>
              <div className="flex items-start gap-2 text-sm leading-relaxed text-white/45 mt-1">
                <MapPin size={13} className="text-dezo-highlight shrink-0 mt-0.5" />
                <span>
                  {contact.address.street}, {contact.address.city},{' '}
                  {contact.address.region} {contact.address.postalCode}, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <div className="flex flex-wrap items-center gap-5">
            <p>© {currentYear} DEZO.in. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
          <p className="font-mono text-[11px] tracking-wide">dezo.in</p>
        </div>
      </DezoContainer>
    </footer>
  );
}

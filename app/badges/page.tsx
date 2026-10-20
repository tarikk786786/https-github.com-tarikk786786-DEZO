import React from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { BadgeGenerator } from '@/components/badges/BadgeGenerator';
import { ShieldCheck, Award, Link2, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'DEZO Partner & Client Badge Generator · Official Verification Badges',
  description: 'Embed the official Built by DEZO, Verified by DEZO Lab, or DEZO Growth Partner badge. High-performance, zero-latency vector badges for client websites, applications, and GitHub repositories.',
  canonicalUrl: 'https://dezo.in/badges',
});

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-dezo-bg text-dezo-text-primary pt-28 pb-20">
      <DezoContainer size="wide">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-semibold bg-dezo-primary/10 text-dezo-primary border border-dezo-primary/20">
              DEZO Ecosystem · Public Embeds
            </span>
            <span className="text-xs font-mono text-dezo-text-muted">
              SVG Vector Engine v2.0
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-dezo-text-primary">
            Official Partner &amp; Verification Badges
          </h1>
          <p className="text-sm sm:text-base text-dezo-text-secondary mt-3 leading-relaxed max-w-2xl">
            Showcase that your website, eCommerce platform, or open-source application was engineered, audited, or powered by DEZO. Zero-runtime overhead, cached globally on Anycast CDN.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-dezo-border text-xs font-mono text-dezo-text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>100% Vector Scalable</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Zero JavaScript Payload</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Google-Compliant Attribution</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Dark / Light / Brand Themes</span>
            </div>
          </div>
        </div>

        {/* Interactive Badge Generator */}
        <BadgeGenerator />
      </DezoContainer>
    </div>
  );
}

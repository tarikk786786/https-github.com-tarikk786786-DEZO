'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Code2,
  FileCode,
  Layers,
  ArrowRight,
  TrendingUp,
  Globe,
} from 'lucide-react';

export function BadgeGenerator() {
  const [badgeType, setBadgeType] = useState<'built' | 'verified' | 'partner'>('built');
  const [theme, setTheme] = useState<'dark' | 'light' | 'brand'>('dark');
  const [style, setStyle] = useState<'pill' | 'flat'>('pill');
  const [targetPath, setTargetPath] = useState<string>('https://dezo.in');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const getSvgUrl = () => {
    if (badgeType === 'verified') {
      return `https://dezo.in/api/badges/verified-by-dezo?theme=${theme === 'brand' ? 'dark' : theme}`;
    }
    const label = badgeType === 'partner' ? 'DEZO Growth Partner' : 'Built by DEZO';
    return `https://dezo.in/api/badges/built-by-dezo?theme=${theme}&style=${style}&text=${encodeURIComponent(label)}`;
  };

  const getAltText = () => {
    if (badgeType === 'verified') return 'Verified by DEZO Lab · 100% Core Web Vitals';
    if (badgeType === 'partner') return 'DEZO Growth Partner · Digital Infrastructure';
    return 'Built by DEZO · Digital Infrastructure for Ambitious Businesses';
  };

  const svgUrl = getSvgUrl();
  const altText = getAltText();

  const snippets = {
    html: `<!-- DEZO Official Verified Badge -->\n<a href="${targetPath}" target="_blank" rel="noopener" title="${altText}">\n  <img src="${svgUrl}" alt="${altText}" width="220" height="34" />\n</a>`,
    markdown: `[![${altText}](${svgUrl})](${targetPath})`,
    jsx: `{/* DEZO Official Verified Badge */}\n<a href="${targetPath}" target="_blank" rel="noopener" title="${altText}">\n  <img src="${svgUrl}" alt="${altText}" width={220} height={34} />\n</a>`,
    svgUrl: svgUrl,
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Interactive Customizer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 bg-dezo-surface border border-dezo-border p-6 shadow-sm">
          <div className="border-b border-dezo-border pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-dezo-primary font-bold">
              Step 1: Configuration
            </span>
            <h3 className="font-display text-lg font-bold text-dezo-text-primary mt-1">
              Customize Your Badge
            </h3>
          </div>

          {/* Badge Type Selector */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-dezo-text-secondary mb-2">
              Badge Certification
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBadgeType('built')}
                className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                  badgeType === 'built'
                    ? 'border-dezo-primary bg-dezo-primary/10 text-dezo-primary font-bold'
                    : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary hover:text-dezo-text-primary'
                }`}
              >
                Built by DEZO
              </button>
              <button
                type="button"
                onClick={() => setBadgeType('verified')}
                className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                  badgeType === 'verified'
                    ? 'border-dezo-primary bg-dezo-primary/10 text-dezo-primary font-bold'
                    : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary hover:text-dezo-text-primary'
                }`}
              >
                Lab Verified
              </button>
              <button
                type="button"
                onClick={() => setBadgeType('partner')}
                className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                  badgeType === 'partner'
                    ? 'border-dezo-primary bg-dezo-primary/10 text-dezo-primary font-bold'
                    : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary hover:text-dezo-text-primary'
                }`}
              >
                Growth Partner
              </button>
            </div>
          </div>

          {/* Color Theme Selector */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-dezo-text-secondary mb-2">
              Color Palette
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                  theme === 'dark'
                    ? 'border-dezo-primary bg-black text-white font-bold ring-1 ring-dezo-primary'
                    : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary'
                }`}
              >
                Stealth Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                  theme === 'light'
                    ? 'border-dezo-primary bg-white text-black font-bold ring-1 ring-dezo-primary'
                    : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary'
                }`}
              >
                Crisp Light
              </button>
              <button
                type="button"
                onClick={() => setTheme('brand')}
                className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                  theme === 'brand'
                    ? 'border-dezo-primary bg-dezo-primary text-black font-bold'
                    : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary'
                }`}
              >
                DEZO Orange
              </button>
            </div>
          </div>

          {/* Corner Shape */}
          {badgeType !== 'verified' && (
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-dezo-text-secondary mb-2">
                Corner Geometry
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStyle('pill')}
                  className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                    style === 'pill'
                      ? 'border-dezo-primary bg-dezo-primary/10 text-dezo-primary font-bold'
                      : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary'
                  }`}
                >
                  Pill Rounded (14px)
                </button>
                <button
                  type="button"
                  onClick={() => setStyle('flat')}
                  className={`px-3 py-2 text-xs font-medium border text-center transition-all ${
                    style === 'flat'
                      ? 'border-dezo-primary bg-dezo-primary/10 text-dezo-primary font-bold'
                      : 'border-dezo-border bg-dezo-bg text-dezo-text-secondary'
                  }`}
                >
                  Clean Flat (4px)
                </button>
              </div>
            </div>
          )}

          {/* Destination Link */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-dezo-text-secondary mb-2">
              Backlink Destination URL
            </label>
            <select
              value={targetPath}
              onChange={(e) => setTargetPath(e.target.value)}
              className="w-full bg-dezo-bg border border-dezo-border px-3 py-2 text-xs font-mono text-dezo-text-primary focus:outline-hidden focus:border-dezo-primary"
            >
              <option value="https://dezo.in">Homepage (https://dezo.in)</option>
              <option value="https://dezo.in/services/web-development">Web Development (https://dezo.in/services/web-development)</option>
              <option value="https://dezo.in/services/ecommerce">Ecommerce Growth (https://dezo.in/services/ecommerce)</option>
              <option value="https://dezo.in/growth-lab">DEZO LAB Diagnostics (https://dezo.in/growth-lab)</option>
              <option value="https://dezo.in/promise">DEZO Standards (https://dezo.in/promise)</option>
            </select>
          </div>
        </div>

        {/* Live Preview & Code Generator Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Preview Card */}
          <div className="bg-dezo-surface border border-dezo-border p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-dezo-border pb-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-dezo-text-primary">
                  Live Vector Render Preview
                </span>
              </div>
              <span className="text-[10px] font-mono text-dezo-text-muted">
                Zero JavaScript · Pure Crisp SVG
              </span>
            </div>

            {/* Simulated website background canvas */}
            <div className="p-10 rounded-sm bg-gradient-to-b from-dezo-bg to-neutral-900 border border-dezo-border flex flex-col items-center justify-center min-h-[160px] gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={svgUrl}
                alt={altText}
                className="max-w-full h-auto shadow-xl transition-all duration-300"
              />
              <p className="text-[11px] font-mono text-white/50 text-center">
                Clicking opens: <span className="text-dezo-primary font-bold">{targetPath}</span>
              </p>
            </div>
          </div>

          {/* Copy Snippets */}
          <div className="bg-dezo-surface border border-dezo-border p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-dezo-border pb-3">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-dezo-text-primary">
                Step 2: Copy Embed Code
              </span>
              {copiedFormat && (
                <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1">
                  <Check size={13} /> Copied {copiedFormat}!
                </span>
              )}
            </div>

            {/* HTML Tab */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-dezo-text-secondary flex items-center gap-1">
                  <Code2 size={13} className="text-dezo-primary" /> HTML Snippet (Client Footers &amp; Websites)
                </span>
                <button
                  onClick={() => copyToClipboard(snippets.html, 'HTML')}
                  className="px-2.5 py-1 text-[11px] font-mono uppercase font-semibold bg-dezo-primary text-white hover:bg-dezo-primary-hover transition-colors flex items-center gap-1"
                >
                  <Copy size={12} /> Copy HTML
                </button>
              </div>
              <pre className="p-3 bg-dezo-bg border border-dezo-border text-[11px] font-mono text-dezo-text-secondary overflow-x-auto">
                {snippets.html}
              </pre>
            </div>

            {/* Markdown Tab */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-dezo-text-secondary flex items-center gap-1">
                  <FileCode size={13} className="text-dezo-primary" /> Markdown (GitHub READMEs &amp; Documentation)
                </span>
                <button
                  onClick={() => copyToClipboard(snippets.markdown, 'Markdown')}
                  className="px-2.5 py-1 text-[11px] font-mono uppercase font-semibold bg-dezo-bg border border-dezo-border hover:border-dezo-primary text-dezo-text-primary transition-colors flex items-center gap-1"
                >
                  <Copy size={12} /> Copy Markdown
                </button>
              </div>
              <pre className="p-3 bg-dezo-bg border border-dezo-border text-[11px] font-mono text-dezo-text-secondary overflow-x-auto">
                {snippets.markdown}
              </pre>
            </div>

            {/* Direct SVG URL */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-dezo-text-secondary flex items-center gap-1">
                  <Globe size={13} className="text-dezo-primary" /> Direct SVG Image Endpoint
                </span>
                <button
                  onClick={() => copyToClipboard(snippets.svgUrl, 'SVG URL')}
                  className="px-2.5 py-1 text-[11px] font-mono uppercase font-semibold bg-dezo-bg border border-dezo-border hover:border-dezo-primary text-dezo-text-primary transition-colors flex items-center gap-1"
                >
                  <Copy size={12} /> Copy URL
                </button>
              </div>
              <input
                readOnly
                value={snippets.svgUrl}
                className="w-full bg-dezo-bg border border-dezo-border px-3 py-2 text-xs font-mono text-dezo-text-muted focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Backlink Growth Strategic Architecture */}
      <div className="bg-dezo-surface border border-dezo-border p-8">
        <div className="max-w-3xl mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-dezo-primary font-bold">
            White-Hat Backlink Velocity
          </span>
          <h2 className="font-display text-2xl font-bold text-dezo-text-primary mt-1">
            How The DEZO Embeddable Badge Generates 10,000+ Verified Backlinks
          </h2>
          <p className="text-xs text-dezo-text-secondary mt-2 leading-relaxed">
            In modern search engine algorithms (Google SpamBrain &amp; Helpful Content System), mass-blasting automated blog comments or low-tier link farms triggers catastrophic domain penalties. Real enterprise growth operates via product-led viral loops:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-dezo-bg border border-dezo-border space-y-3">
            <div className="w-8 h-8 rounded-full bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-primary font-mono text-xs font-bold">
              01
            </div>
            <h4 className="font-display text-base font-bold text-dezo-text-primary">
              Client Website Footers
            </h4>
            <p className="text-xs text-dezo-text-secondary leading-relaxed">
              Every business, eCommerce store, and startup launched by DEZO across Odisha and India displays the &quot;Built by DEZO&quot; badge, creating natural, contextual, permanent authority backlinks.
            </p>
          </div>

          <div className="p-5 bg-dezo-bg border border-dezo-border space-y-3">
            <div className="w-8 h-8 rounded-full bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-primary font-mono text-xs font-bold">
              02
            </div>
            <h4 className="font-display text-base font-bold text-dezo-text-primary">
              DEZO LAB Audit Badges
            </h4>
            <p className="text-xs text-dezo-text-secondary leading-relaxed">
              Site owners auditing their Core Web Vitals, Shopify speed, or security on DEZO LAB embed the &quot;Verified by DEZO Lab&quot; badge to prove enterprise quality to their customers.
            </p>
          </div>

          <div className="p-5 bg-dezo-bg border border-dezo-border space-y-3">
            <div className="w-8 h-8 rounded-full bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-primary font-mono text-xs font-bold">
              03
            </div>
            <h4 className="font-display text-base font-bold text-dezo-text-primary">
              Open-Source &amp; Partner Network
            </h4>
            <p className="text-xs text-dezo-text-secondary leading-relaxed">
              GitHub repositories, developer documentation, and partner directories embed the official shield badge in their READMEs, passing authoritative developer ecosystem link equity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

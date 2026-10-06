import React from 'react';
import type { Metadata } from 'next';
import {
  TrendingUp,
  ShoppingBag,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BarChart2,
  CheckCircle2,
} from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoMarketplaceDashboard } from '@/components/dezo/DezoMarketplaceDashboard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Marketplace Intelligence & Seller Telemetry (Amazon + Flipkart)',
  description:
    'Consolidated marketplace analytics and AI seller intelligence. Master Amazon, Flipkart, Meta, Google, and direct web commerce through unified data.',
  canonicalUrl: 'https://dezo.in/marketplace',
});

export default function MarketplacePage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-12">
            <DezoHeading
              badge="Marketplace Telemetry"
              as="h1"
              subtitle="Stop managing Amazon, Flipkart, and your website in disconnected silos. DEZO synthesizes your advertising, inventory, and ranking data into unified commercial intelligence."
            >
              Unified Marketplace & Seller Intelligence
            </DezoHeading>
          </div>

          {/* Interactive Intelligence Dashboard */}
          <div className="mb-20">
            <DezoMarketplaceDashboard />
          </div>

          {/* How DEZO Drives Marketplace Growth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <DezoCard interactive={false}>
              <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                <ShoppingBag size={20} />
              </div>
              <h3 className="text-xl font-bold text-dezo-text-primary mb-3">
                Amazon India Optimization
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
                Full-funnel seller growth: keyword harvesting, conversion-focused A+ Content, Brand Store design, Buy Box defense, and Sponsored Ads (SP, SB, SD) managed with clinical precision.
              </p>
              <ul className="flex flex-col gap-2 text-xs text-dezo-text-muted">
                <li>✓ Search Query Performance diagnostics</li>
                <li>✓ High-intent backend keyword architecture</li>
                <li>✓ Target TACoS & blended ROAS controls</li>
              </ul>
            </DezoCard>

            <DezoCard interactive={false}>
              <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                <Layers size={20} />
              </div>
              <h3 className="text-xl font-bold text-dezo-text-primary mb-3">
                Flipkart Growth & PLA Ads
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
                Catalog health enhancement, F-Assured qualification, Big Billion Days promotional strategy, and Product Listing Ads (PLA) tuned for Tier-2/Tier-3 customer demand.
              </p>
              <ul className="flex flex-col gap-2 text-xs text-dezo-text-muted">
                <li>✓ SuperCoins and promotional deal integration</li>
                <li>✓ Regional fulfillment SLA optimization</li>
                <li>✓ Competitor price monitoring</li>
              </ul>
            </DezoCard>

            <DezoCard interactive={false}>
              <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-xl font-bold text-dezo-text-primary mb-3">
                Future-Ready Marketplace Connectors
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-4">
                Modular architecture built to connect your brand into emerging channels including Meesho, Myntra, Nykaa, and the Open Network for Digital Commerce (ONDC).
              </p>
              <ul className="flex flex-col gap-2 text-xs text-dezo-text-muted">
                <li>✓ Multi-channel inventory synchronization</li>
                <li>✓ Authorized API integration</li>
                <li>✓ Single source of truth reporting</li>
              </ul>
            </DezoCard>
          </div>

          {/* CTA Banner */}
          <div className="p-8 sm:p-12 rounded-dezo-xl bg-dezo-surface border border-dezo-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-dezo-text-primary mb-2">
                Ready to Scale Your Marketplace Revenues?
              </h3>
              <p className="text-sm text-dezo-text-secondary">
                Request a comprehensive audit of your Amazon and Flipkart seller accounts today.
              </p>
            </div>
            <DezoButton href="/contact" size="lg" magnetic>
              Book Marketplace Audit
            </DezoButton>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

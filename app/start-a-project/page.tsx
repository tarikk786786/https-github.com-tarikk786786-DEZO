import React from 'react';
import type { Metadata } from 'next';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoGrowthPlanBuilder } from '@/components/dezo/DezoGrowthPlanBuilder';
import { constructMetadata } from '@/lib/seo/metadata';
import { ShieldCheck, Sparkles, Building2, MapPin } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Interactive Growth Plan Builder & Project Intake | DEZO',
  description:
    'Use DEZO’s interactive Growth Plan Builder to receive a deterministic, tailored digital service blueprint, deliverables breakdown, and scoped milestone quotation.',
  canonicalUrl: 'https://dezo.in/start-a-project',
});

export default function StartAProjectPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen bg-dezo-bg">
      <DezoSection spacing="compact">
        <DezoContainer size="default">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-4">
              <Sparkles size={12} className="text-dezo-primary" />
              <span>Guided Diagnostic & Scope Builder</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-dezo-ink uppercase tracking-tight">
              Build Your Growth Plan
            </h1>
            <p className="mt-4 text-sm sm:text-base text-dezo-text-secondary font-mono leading-relaxed">
              Answer 3 simple questions about your business, market, and primary goal. Our rules engine recommends the
              exact service architecture, deliverables, and timeline your business needs.
            </p>
          </div>

          <DezoGrowthPlanBuilder />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

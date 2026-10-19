import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoBacklinksGenerator } from '@/components/dezo/tools/DezoBacklinksGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '150+ Free Authority Backlinks Generator | DEZO Lab',
  description:
    'Instantly generate 150+ high-authority directory profiles, SEO audit anchors, WHOIS records, and web archive submissions with live pinging and CSV export.',
};

export default function BacklinksToolPage() {
  return (
    <div className="pt-24 pb-20">
      <DezoSection spacing="compact" className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <div className="mb-6">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs font-semibold text-dezo-text-muted hover:text-dezo-accent transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to All DEZO Tools</span>
            </Link>
          </div>
          <DezoBacklinksGenerator />
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

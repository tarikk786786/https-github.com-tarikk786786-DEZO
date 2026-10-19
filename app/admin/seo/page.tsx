import React from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { DezoSeoAdminDashboard } from '@/components/admin/DezoSeoAdminDashboard';

export const metadata: Metadata = constructMetadata({
  title: 'DEZO SEO & 10,000 Backlink Automation Command Center',
  description: 'Enterprise SEO management, 10,000 backlink campaign tracker, real-time HTTP verification, crawler health and outreach CRM.',
  canonicalUrl: 'https://dezo.in/admin/seo',
  noIndex: true, // Internal administrative panel
});

export default function SeoAdminPage() {
  return (
    <div className="min-h-screen bg-dezo-bg text-dezo-text-primary pt-24 pb-16">
      <DezoSeoAdminDashboard />
    </div>
  );
}

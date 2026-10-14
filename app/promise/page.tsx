import React from 'react';
import type { Metadata } from 'next';
import { PromiseGuaranteeSystem } from '@/components/promise/PromiseGuaranteeSystem';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Our Promise, Standards & Accountability',
  description:
    "Discover DEZO's standards for delivery, transparency, reporting, quality, accountability and measurable digital growth execution.",
  canonicalUrl: 'https://dezo.in/promise',
});

export default function PromisePage() {
  return <PromiseGuaranteeSystem />;
}

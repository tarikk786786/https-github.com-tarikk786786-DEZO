import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'DEZO LAB — Free site diagnostics',
  description:
    'Free public checks for your website and storefront — SEO, speed, accessibility, Shopify, CRO and more. No login.',
  canonicalUrl: 'https://dezo.in/growth-lab',
});

export default function GrowthLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}

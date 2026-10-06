import { Metadata } from 'next';
import { brand, contact, leadership } from '@/content/site';

export const siteConfig = {
  name: `${brand.name} — ${brand.positioning}`,
  shortName: brand.name,
  description: brand.supporting,
  url: 'https://dezo.in',
  ogImage: 'https://dezo.in/dezo-logo-transparent.png',
  phone: contact.phone,
  phoneFormatted: contact.phoneFormatted,
  email: contact.email,
  address: contact.address,
  founders: [
    { name: leadership.primary.name, role: leadership.primary.role },
    { name: leadership.partner.name, role: leadership.partner.role },
  ],
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonicalUrl,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const metaTitle = title
    ? `${title} | DEZO`
    : 'DEZO | We Build Brands That Sell — Digital Commerce India';

  return {
    title: metaTitle,
    description,
    keywords: [
      'digital commerce india',
      'amazon flipkart marketplace agency',
      'brand building odisha',
      'ecommerce development bhubaneswar',
      'meta google ads india',
      'shopify agency india',
      'dezo',
      'growth technology',
    ],
    authors: [{ name: 'DEZO', url: siteConfig.url }],
    creator: 'DEZO',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
    },
    openGraph: {
      title: metaTitle,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: 'DEZO',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description,
      images: [image],
      creator: '@dezo_agency',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

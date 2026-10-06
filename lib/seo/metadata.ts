import { Metadata } from 'next';

export const siteConfig = {
  name: 'DEZO — Digital Engineering & Growth Studio',
  shortName: 'DEZO',
  description:
    'DEZO builds high-converting websites, bespoke ecommerce architectures, and performance growth funnels for ambitious brands and enterprises in India and worldwide.',
  url: 'https://dezo.in',
  ogImage: 'https://dezo.in/dezo-logo-transparent.png',
  phone: '+919114411026',
  phoneFormatted: '+91 9114411026',
  email: 'contact@dezo.in',
  address: {
    street: 'Phase 2, Patia',
    city: 'Bhubaneswar',
    region: 'Odisha',
    postalCode: '751024',
    country: 'IN',
  },
  founders: [
    { name: 'Tarik Islam', role: 'Director & Founder' },
    { name: 'Rohan Dinkar Sanap', role: 'Chief Executive Officer' },
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
    ? `${title} | DEZO Digital Engineering`
    : 'DEZO | Web Development, Ecommerce & Growth Agency India';

  return {
    title: metaTitle,
    description,
    keywords: [
      'web development company india',
      'digital marketing agency bhubaneswar',
      'seo services india',
      'ecommerce website development',
      'next.js development agency',
      'performance marketing studio',
      'b2b growth engine',
      'dezo agency',
    ],
    authors: [{ name: 'DEZO Team', url: siteConfig.url }],
    creator: 'DEZO',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
    },
    openGraph: {
      title: metaTitle,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
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

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://dezo.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article';
  image?: string;
  noIndex?: boolean;
  keywords?: string;
  schemaData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function SeoHead({
  title,
  description,
  path = '/',
  ogType = 'website',
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords,
  schemaData,
}: SeoHeadProps) {
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="DEZO" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
    </Helmet>
  );
}

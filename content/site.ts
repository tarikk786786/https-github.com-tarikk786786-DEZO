/**
 * DEZO positioning & credibility source of truth.
 * Locked from ChatGPT share brief (2026-10-06).
 */

export const brand = {
  name: 'DEZO',
  domain: 'dezo.in',
  tagline: 'We Build Brands That Sell.',
  supporting:
    'India-focused digital commerce — websites, brand systems, Amazon & Flipkart marketplaces, and performance growth — engineered from Odisha to scale nationwide.',
  geo: 'Built in Odisha. Built for India. Built to scale.',
  positioning:
    'Digital commerce, brand, marketplace & growth technology company',
  pillars: ['Build', 'Brand', 'Marketplace', 'Grow', 'Intelligence'] as const,
  journey: [
    'Discover',
    'Build',
    'Brand',
    'Launch',
    'Sell',
    'Advertise',
    'Optimize',
    'Scale',
  ] as const,
};

export const leadership = {
  primary: {
    name: 'Tarik Islam',
    role: 'Founder & CEO',
    bio: 'Founder of DEZO. Full-stack engineer and systems architect leading product, engineering standards, and high-assurance delivery across web, marketplace, and growth systems.',
    email: 'princetarikislam@gmail.com',
    profile: 'https://tarikislam.in',
  },
  partner: {
    name: 'Rohan Dinkar Sanap',
    role: 'Commercial Partner',
    bio: 'Partners on client relationships, brand positioning, and performance campaign architecture alongside studio leadership.',
    email: 'contact@dezo.in',
  },
} as const;

export const contact = {
  phone: '+919114411026',
  phoneFormatted: '+91 9114411026',
  phoneAlt: '+91 77870 63088',
  email: 'contact@dezo.in',
  address: {
    street: 'Phase 2, Patia',
    city: 'Bhubaneswar',
    region: 'Odisha',
    postalCode: '751024',
    country: 'IN',
  },
};

export const pillars = [
  {
    slug: 'build',
    name: 'BUILD',
    title: 'Digital Engineering',
    summary: 'Websites, ecommerce, Shopify, SaaS, and custom software engineered for speed and conversion.',
    href: '/solutions/build',
  },
  {
    slug: 'brand',
    name: 'BRAND',
    title: 'Strategic Identity',
    summary: 'Positioning, identity, packaging, and marketplace creative that make products memorable and sellable.',
    href: '/solutions/brand',
  },
  {
    slug: 'marketplace',
    name: 'MARKETPLACE',
    title: 'Amazon & Flipkart',
    summary: 'Listings, catalog growth, PPC, and seller operations built for India’s marketplace economy.',
    href: '/solutions/marketplace',
  },
  {
    slug: 'growth',
    name: 'GROW',
    title: 'Performance Marketing',
    summary: 'SEO, Meta, Google, CRO, and analytics focused on profitable acquisition — not vanity traffic.',
    href: '/solutions/growth',
  },
  {
    slug: 'intelligence',
    name: 'INTELLIGENCE',
    title: 'DEZO Growth OS',
    summary: 'AI, automation, and unified telemetry across web, ads, and marketplaces — shipping in phases.',
    href: '/solutions/intelligence',
  },
] as const;

/** Phase 1 Tools Lab — public free diagnostics */
export const toolsLabPhase1 = [
  {
    slug: 'seo',
    name: 'SEO Audit',
    description: 'Technical crawl signals, titles, canonicals, and index readiness.',
  },
  {
    slug: 'page-speed',
    name: 'Page Speed',
    description: 'Core Web Vitals-oriented performance diagnostics.',
  },
  {
    slug: 'accessibility',
    name: 'Accessibility',
    description: 'WCAG-oriented contrast, labels, and interaction checks.',
  },
  {
    slug: 'seo',
    name: 'Schema Check',
    description: 'Structured data presence and common schema gaps.',
    note: 'Runs via SEO engine',
  },
  {
    slug: 'seo',
    name: 'Sitemap / Robots',
    description: 'robots.txt and sitemap discoverability checks.',
    note: 'Runs via SEO engine',
  },
  {
    slug: 'seo',
    name: 'Broken Links',
    description: 'Public link integrity observations on crawlable pages.',
    note: 'Runs via SEO engine',
  },
  {
    slug: 'page-speed',
    name: 'Tech Detector',
    description: 'Stack fingerprints visible from public responses.',
    note: 'Runs via performance engine',
  },
  {
    slug: 'shopify',
    name: 'Shopify Audit',
    description: 'Theme/app bloat signals and storefront health heuristics.',
  },
] as const;

export const featuredCaseStudies = [
  {
    title: 'Yasana Beauty Rituals',
    industry: 'Beauty & Fashion',
    location: 'India',
    challenge: 'Needed a brand-led ecommerce presence that converted paid traffic.',
    goal: 'Launch a high-converting storefront with coherent brand storytelling.',
    result: 'Live D2C storefront with Meta-ready creative surfaces.',
    url: 'https://yasanabeautyrituals.in/',
    stack: ['Ecommerce', 'Brand', 'Meta Ads'],
  },
  {
    title: 'Shree Ayurved',
    industry: 'Healthcare',
    location: 'India',
    challenge: 'Local and national search visibility for a trusted Ayurveda brand.',
    goal: 'Build a credible web presence optimized for organic discovery.',
    result: 'Live marketing site with SEO-forward information architecture.',
    url: 'https://www.shreeayurved.com/',
    stack: ['Web', 'SEO', 'Brand'],
  },
  {
    title: 'Sonvica Sarees',
    industry: 'Beauty & Fashion',
    location: 'India',
    challenge: 'Move ethnic wear buyers from discovery to direct orders online.',
    goal: 'Ship a commerce experience that reflects craft and hierarchy of product.',
    result: 'Live storefront supporting direct-order journeys.',
    url: 'https://sonvicasarees.com/',
    stack: ['Ecommerce', 'Brand'],
  },
  {
    title: 'Nilkanth Paints',
    industry: 'Corporate',
    location: 'India',
    challenge: 'Enterprise-facing portal needed clarity, trust, and modern structure.',
    goal: 'Rebuild a corporate web system for product and dealer communication.',
    result: 'Live enterprise portal with clearer commercial navigation.',
    url: 'https://nilkanthpaints.com/',
    stack: ['Web', 'Corporate Portal'],
  },
] as const;

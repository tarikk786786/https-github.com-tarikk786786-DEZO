/**
 * DEZO Growth Platform — content source of truth
 * Aligned to growth-platform-architecture.md
 */

export const brand = {
  name: 'DEZO',
  domain: 'dezo.in',
  tagline: 'One Growth Partner. Everything Your Brand Needs to Scale.',
  heroLine: 'We Build Brands That Get Seen, Get Clicked & Get Bought.',
  supporting:
    'Brand → Website → Marketplaces → Traffic → Ads → Social → Conversion → Retention → Scale — operated as one growth system from Odisha to India.',
  tag: 'BUILD. MARKET. GROW.',
  geo: 'Built in Odisha. Built for India. Built to scale.',
  positioning:
    'Premium growth platform + agency — digital commerce, marketplaces, ads, and brand systems under one roof',
} as const;

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

/** 8 service pillars for homepage (not 20 equal cards) */
export const servicePillars = [
  {
    slug: 'digital-build',
    name: 'Digital Build',
    title: 'Websites & Ecommerce',
    summary:
      'Shopify, Next.js, WordPress, landing pages, CRO, custom web apps — engineered for speed and conversion.',
    href: '/services/web-development',
  },
  {
    slug: 'search',
    name: 'Search',
    title: 'SEO & Discovery',
    summary:
      'Technical SEO, local SEO, content, backlinks, and conversion-focused organic growth.',
    href: '/services/seo',
  },
  {
    slug: 'amazon',
    name: 'Amazon',
    title: 'Amazon Growth',
    summary:
      'Listings, keywords, A+, ads, catalog health, inventory, and seller operations.',
    href: '/services/amazon',
  },
  {
    slug: 'flipkart',
    name: 'Flipkart',
    title: 'Flipkart Growth',
    summary:
      'Catalog, listings, pricing, promotions, inventory, orders, and marketplace performance.',
    href: '/services/flipkart',
  },
  {
    slug: 'paid',
    name: 'Paid Growth',
    title: 'Meta & Google Ads',
    summary:
      'Meta + Google acquisition: search, shopping, PMax, retargeting, creative testing, conversion tracking.',
    href: '/services/paid-ads',
  },
  {
    slug: 'social',
    name: 'Social',
    title: 'Social Media',
    summary:
      'Strategy, content, reels, creatives, community, influencers, and analytics.',
    href: '/services/social',
  },
  {
    slug: 'brand',
    name: 'Brand',
    title: 'Brand Building',
    summary:
      'Naming, identity, packaging, guidelines, photography, creative direction, positioning.',
    href: '/services/branding',
  },
  {
    slug: 'systems',
    name: 'Growth Systems',
    title: 'Growth OS',
    summary:
      'Unified telemetry, Growth Lab diagnostics, automation adapters, and operating systems for scale.',
    href: '/services/growth-systems',
  },
] as const;

/** Platform nodes for Growth Command Center */
export const platformNodes = [
  { id: 'shopify', label: 'Shopify', x: 18, y: 22 },
  { id: 'amazon', label: 'Amazon', x: 72, y: 18 },
  { id: 'flipkart', label: 'Flipkart', x: 82, y: 48 },
  { id: 'google', label: 'Google', x: 68, y: 78 },
  { id: 'meta', label: 'Meta', x: 32, y: 82 },
  { id: 'seo', label: 'SEO', x: 12, y: 55 },
  { id: 'social', label: 'Social', x: 48, y: 12 },
  { id: 'brand', label: 'Brand', x: 50, y: 50 },
] as const;

export const growthSystemSteps = [
  'Brand',
  'Build',
  'SEO / Ads',
  'Marketplaces',
  'Conversion',
  'Sales',
  'Analytics',
  'Scale',
] as const;

export const notAgencyPillars = [
  {
    title: 'We Build',
    body: 'Storefronts, brand systems, and digital products engineered to sell — not template theatre.',
  },
  {
    title: 'We Drive',
    body: 'Traffic across SEO, Meta, Google, and marketplaces with attribution that connects to revenue.',
  },
  {
    title: 'We Optimize',
    body: 'CRO, listings, creatives, and funnels — continuous improvement on live commercial systems.',
  },
  {
    title: 'We Scale',
    body: 'Retention, reporting, and Growth OS telemetry so growth compounds instead of resetting each quarter.',
  },
] as const;

export const chooseGoals = [
  {
    id: 'website',
    label: 'Build my website / store',
    stack: ['Digital Build', 'Brand', 'CRO'],
    href: '/services/web-development',
  },
  {
    id: 'amazon',
    label: 'Grow my Amazon store',
    stack: ['Amazon', 'Brand', 'Paid Growth'],
    href: '/services/amazon',
  },
  {
    id: 'seo',
    label: 'Fix my SEO',
    stack: ['Search', 'Digital Build', 'Content'],
    href: '/services/seo',
  },
  {
    id: 'ads',
    label: 'Scale my ads',
    stack: ['Paid Growth', 'CRO', 'Analytics'],
    href: '/services/paid-ads',
  },
  {
    id: 'brand',
    label: 'Launch my brand',
    stack: ['Brand', 'Digital Build', 'Social'],
    href: '/services/branding',
  },
  {
    id: 'full',
    label: 'Full growth system',
    stack: ['Brand', 'Build', 'Marketplaces', 'Ads', 'SEO'],
    href: '/book-strategy-call',
  },
] as const;

export const industries = [
  { name: 'D2C Brands', href: '/industries/d2c' },
  { name: 'Ecommerce', href: '/industries/ecommerce' },
  { name: 'Local Business', href: '/industries/local' },
  { name: 'Startups', href: '/industries/startups' },
  { name: 'Manufacturers', href: '/industries/manufacturers' },
  { name: 'Service Brands', href: '/industries/service' },
  { name: 'Personal Brands', href: '/industries/personal-brands' },
] as const;

export const howWeWork = [
  {
    step: '01',
    title: 'Diagnose',
    body: 'Free Growth Audit maps channels, gaps, and commercial priority.',
  },
  {
    step: '02',
    title: 'Architect',
    body: 'We design the stack: brand, build, marketplaces, traffic, conversion.',
  },
  {
    step: '03',
    title: 'Execute',
    body: 'Specialists ship across web, ads, Amazon/Flipkart, and social in parallel.',
  },
  {
    step: '04',
    title: 'Operate',
    body: 'Reporting, iteration, and Growth Lab telemetry keep the system compounding.',
  },
] as const;

export const faqItems = [
  {
    q: 'Is DEZO an agency or a platform?',
    a: 'Both. We operate as a growth partner with agency craft, and we ship public Growth Lab tools plus a Client Portal (shell now, full OS later).',
  },
  {
    q: 'Do you only build websites?',
    a: 'No. Web is one pillar. We also run Amazon & Flipkart growth, Meta/Google ads, SEO, social, brand systems, and CRO as one commercial journey.',
  },
  {
    q: 'Are Growth Lab tools free?',
    a: 'Public audits run without login. Partial findings are free; the full Growth Report unlocks via a lead CTA — no fake seller APIs.',
  },
  {
    q: 'Where are you based?',
    a: 'Bhubaneswar, Odisha — shipping for brands across India.',
  },
] as const;

export const featuredCaseStudies = [
  {
    title: 'Yasana Beauty Rituals',
    industry: 'Beauty & Fashion',
    location: 'India',
    challenge: 'Needed a brand-led ecommerce presence that converted paid traffic.',
    problem: 'Needed a brand-led ecommerce presence that converted paid traffic.',
    strategy: 'Positioned a D2C story system with Meta-ready creative surfaces.',
    execution: 'Shipped a live storefront with coherent brand hierarchy and product UX.',
    result: 'Live D2C storefront accepting traffic and orders.',
    url: 'https://yasanabeautyrituals.in/',
    stack: ['Ecommerce', 'Brand', 'Meta Ads'],
  },
  {
    title: 'Shree Ayurved',
    industry: 'Healthcare',
    location: 'India',
    challenge: 'Local and national search visibility for a trusted Ayurveda brand.',
    problem: 'Local and national search visibility for a trusted Ayurveda brand.',
    strategy: 'SEO-forward information architecture with trust-first content structure.',
    execution: 'Built and launched a marketing site optimized for organic discovery.',
    result: 'Live healthcare brand site with crawlable commercial pages.',
    url: 'https://www.shreeayurved.com/',
    stack: ['Web', 'SEO', 'Brand'],
  },
  {
    title: 'Sonvica Sarees',
    industry: 'Beauty & Fashion',
    location: 'India',
    challenge: 'Move ethnic wear buyers from discovery to direct orders online.',
    problem: 'Move ethnic wear buyers from discovery to direct orders online.',
    strategy: 'Commerce experience that reflects craft and clear product hierarchy.',
    execution: 'Shipped a live storefront supporting direct-order journeys.',
    result: 'Live ethnic wear ecommerce deployment.',
    url: 'https://sonvicasarees.com/',
    stack: ['Ecommerce', 'Brand'],
  },
  {
    title: 'Nilkanth Paints',
    industry: 'Corporate',
    location: 'India',
    challenge: 'Enterprise portal needed clarity, trust, and modern structure.',
    problem: 'Enterprise portal needed clarity, trust, and modern structure.',
    strategy: 'Rebuild commercial navigation for product and dealer communication.',
    execution: 'Delivered a live enterprise web system.',
    result: 'Live corporate portal in production.',
    url: 'https://nilkanthpaints.com/',
    stack: ['Web', 'Corporate Portal'],
  },
] as const;

/** Legacy aliases used by older pages — map to new pillars */
export const pillars = servicePillars.map((p) => ({
  slug: p.slug,
  name: p.name.toUpperCase(),
  title: p.title,
  summary: p.summary,
  href: p.href,
}));

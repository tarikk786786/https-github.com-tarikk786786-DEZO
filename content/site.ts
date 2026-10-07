/**
 * DEZO content — professional consulting + growth platform
 * Visual/copy: professional-design-direction.md
 * Structure breadth: growth-platform-architecture.md
 */

export const brand = {
  name: 'DEZO',
  domain: 'dezo.in',
  tagline: 'Digital infrastructure for ambitious businesses.',
  heroLine: 'Digital infrastructure for ambitious businesses.',
  supporting:
    'Websites, ecommerce, marketplaces, advertising, SEO, social and brand systems—built to work together.',
  tag: 'BUILD. MARKET. GROW.',
  geo: 'Based in India. Built for businesses everywhere.',
  studioLine: 'Studio in Bhubaneswar, Odisha · Delivery across India',
  positioning:
    'Digital commerce, brand, marketplace and growth company',
  onePartner: 'ONE PARTNER. EVERY DIGITAL TOUCHPOINT.',
} as const;

/**
 * Single source of truth for company facts.
 * Only publish numbers we can substantiate. Live deployment count is derived from portfolioData.
 * Do not invent clients, ROI, or project totals elsewhere.
 */
export const companyFacts = {
  liveDeploymentsNote: 'Live production websites in our public archive',
  resultsNote:
    'Results are published per case study when substantiated—not as sitewide vanity averages.',
  noFakeClaims: true,
} as const;

export const leadership = {
  primary: {
    name: 'Tarik Islam',
    role: 'Founder & CEO',
    bio: 'Founder of DEZO. Full-stack engineer and systems architect leading product, engineering standards, and delivery across web, marketplace, and growth systems.',
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

/** Five-category capability map for homepage */
export const touchpointPillars = [
  {
    name: 'Build',
    summary: 'Websites, ecommerce, applications',
    href: '/services/web-development',
  },
  {
    name: 'Grow',
    summary: 'SEO, content, organic acquisition',
    href: '/services/seo',
  },
  {
    name: 'Advertise',
    summary: 'Google, Meta, retargeting',
    href: '/services/paid-ads',
  },
  {
    name: 'Sell',
    summary: 'Amazon, Flipkart, ecommerce',
    href: '/services/amazon',
  },
  {
    name: 'Brand',
    summary: 'Identity, creative, social, content',
    href: '/services/branding',
  },
] as const;

/** Signature DEZO Engine flow */
export const dezoEngine = [
  'Brand',
  'Website',
  'SEO',
  'Ads',
  'Amazon / Flipkart',
  'Conversion',
  'Analytics',
  'Scale',
] as const;

export const aboutHomePoints = [
  {
    title: 'Commercial thinking',
    body: 'Every build and campaign is framed around the business outcome it must support.',
  },
  {
    title: 'Technical execution',
    body: 'Engineering standards, measurement foundations and QA before scale.',
  },
  {
    title: 'Long-term partnership',
    body: 'One operating cadence across web, growth and marketplace—not vendor churn.',
  },
] as const;

export const heroChannels =
  'Web · Ecommerce · Amazon · Flipkart · SEO · Meta · Google · Social · Brand' as const;

export const performancePipeline = [
  'Research',
  'Tracking',
  'Creative',
  'Campaign',
  'Test',
  'Optimize',
  'Report',
] as const;

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

/** Capability groups for homepage */
export const capabilityGroups = [
  {
    name: 'Digital',
    items: ['Websites', 'Ecommerce', 'Shopify', 'Next.js', 'CRO', 'Custom apps'],
  },
  {
    name: 'Growth',
    items: ['SEO', 'Google Ads', 'Meta Ads', 'Content', 'Analytics'],
  },
  {
    name: 'Marketplaces',
    items: ['Amazon', 'Flipkart', 'Listings', 'Catalog', 'Sponsored ads'],
  },
  {
    name: 'Brand',
    items: ['Identity', 'Packaging', 'Creative', 'Positioning', 'Guidelines'],
  },
] as const;

/** Editorial service rows 01–05 */
export const serviceRows = [
  {
    num: '01',
    name: 'Web Development',
    summary: 'Shopify, Next.js, WordPress, landing pages, and custom web applications engineered for speed and conversion.',
    href: '/services/web-development',
  },
  {
    num: '02',
    name: 'Performance Marketing',
    summary: 'Google and Meta advertising — search, shopping, PMax, retargeting, creative testing, and conversion tracking.',
    href: '/services/paid-ads',
  },
  {
    num: '03',
    name: 'Marketplace Growth',
    summary: 'Amazon and Flipkart seller operations: listings, keywords, A+, ads, catalog health, and reporting.',
    href: '/services/amazon',
  },
  {
    num: '04',
    name: 'SEO & Organic',
    summary: 'Technical SEO, local SEO, content systems, and organic discovery built for measurable traffic.',
    href: '/services/seo',
  },
  {
    num: '05',
    name: 'Brand & Creative',
    summary: 'Naming, identity, packaging, guidelines, photography, and creative direction that make products sellable.',
    href: '/services/branding',
  },
] as const;

export const servicePillars = [
  {
    slug: 'digital-build',
    name: 'Digital Build',
    title: 'Websites & Ecommerce',
    summary: 'Shopify, Next.js, WordPress, landing pages, CRO, custom web apps.',
    href: '/services/web-development',
  },
  {
    slug: 'search',
    name: 'Search',
    title: 'SEO & Discovery',
    summary: 'Technical SEO, local SEO, content, and organic growth.',
    href: '/services/seo',
  },
  {
    slug: 'amazon',
    name: 'Amazon',
    title: 'Amazon Growth',
    summary: 'Listings, keywords, A+, ads, catalog health, seller operations.',
    href: '/services/amazon',
  },
  {
    slug: 'flipkart',
    name: 'Flipkart',
    title: 'Flipkart Growth',
    summary: 'Catalog, listings, pricing, promotions, inventory, performance.',
    href: '/services/flipkart',
  },
  {
    slug: 'paid',
    name: 'Paid Growth',
    title: 'Meta & Google Ads',
    summary: 'Search, shopping, PMax, retargeting, creative testing.',
    href: '/services/paid-ads',
  },
  {
    slug: 'social',
    name: 'Social',
    title: 'Social Media',
    summary: 'Strategy, content, creatives, community, analytics.',
    href: '/services/social',
  },
  {
    slug: 'brand',
    name: 'Brand',
    title: 'Brand Building',
    summary: 'Naming, identity, packaging, guidelines, positioning.',
    href: '/services/branding',
  },
  {
    slug: 'systems',
    name: 'Growth Systems',
    title: 'DEZO LAB & Ops',
    summary: 'Diagnostics, reporting cadence, and operating systems for scale.',
    href: '/services/growth-systems',
  },
] as const;

export const processSteps = [
  'Discover',
  'Define',
  'Build',
  'Launch',
  'Optimize',
  'Scale',
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
  {
    title: 'The Paan Luxe',
    industry: 'Ecommerce',
    location: 'India',
    challenge: 'Specialty lifestyle brand needed a conversion-focused D2C storefront.',
    problem: 'Specialty lifestyle brand needed a conversion-focused D2C storefront.',
    strategy: 'Commerce architecture with clear product hierarchy and brand-led UX.',
    execution: 'Shipped a live ecommerce experience for direct orders.',
    result: 'Live D2C storefront in production.',
    url: 'https://thepaanluxe.com',
    stack: ['Ecommerce', 'Brand'],
  },
  {
    title: 'Great India Public School',
    industry: 'Education',
    location: 'India',
    challenge: 'School needed admissions-focused digital presence with clear programs.',
    problem: 'School needed admissions-focused digital presence with clear programs.',
    strategy: 'Information architecture for programs, trust, and inquiry pathways.',
    execution: 'Built and launched a live education website.',
    result: 'Live school site supporting admissions inquiries.',
    url: 'https://greatindiapublicschool.org/',
    stack: ['Web', 'Education'],
  },
] as const;

/** Legacy alias */
export const pillars = servicePillars.map((p) => ({
  slug: p.slug,
  name: p.name.toUpperCase(),
  title: p.title,
  summary: p.summary,
  href: p.href,
}));

export const growthSystemSteps = processSteps;
export const notAgencyPillars = capabilityGroups.map((g) => ({
  title: g.name,
  body: g.items.join(' · '),
}));
export const chooseGoals = [] as const;
export const howWeWork = processSteps.map((s, i) => ({
  step: String(i + 1).padStart(2, '0'),
  title: s,
  body: '',
}));
export const faqItems = [
  {
    q: 'Is DEZO an agency or a platform?',
    a: 'We operate as a digital growth company: agency craft, public DEZO LAB diagnostics, and a Client Portal path for ongoing work—connected as one commercial system.',
  },
  {
    q: 'Do you only build websites?',
    a: 'No. Web is one capability. We also run Amazon and Flipkart growth, Meta and Google ads, SEO, social, brand systems, and CRO.',
  },
  {
    q: 'What does DEZO guarantee?',
    a: 'We guarantee what we control: defined scope, documented deliverables, QA, transparent reporting, implementation accountability and clear communication. We do not guarantee rankings, ROAS, sales or revenue unless a contract explicitly defines those outcomes.',
  },
  {
    q: 'What is DEZO LAB?',
    a: 'Practical tools for understanding your digital business — public audits with clear scores and opportunities. No login required for basic findings.',
  },
  {
    q: 'Where are you based?',
    a: 'Studio in Bhubaneswar, Odisha. Built for businesses everywhere.',
  },
] as const;

export const platformNodes = [] as const;

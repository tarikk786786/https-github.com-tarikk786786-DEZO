/**
 * DEZO Master Service Catalog
 * Centralized registry of digital growth capabilities across 12 departments (A - L)
 * Follows PRD specifications with zero fabricated claims or guaranteed outcomes.
 */

export type ServiceDepartmentCode =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L';

export interface ServiceDepartment {
  code: ServiceDepartmentCode;
  slug: string;
  name: string;
  summary: string;
  iconName: string;
}

export const SERVICE_DEPARTMENTS: ServiceDepartment[] = [
  {
    code: 'A',
    slug: 'web-development',
    name: 'Website Development & Digital Products',
    summary: 'Custom Next.js, Shopify, WordPress storefronts, landing pages, and web apps engineered for speed, conversion, and scale.',
    iconName: 'Code',
  },
  {
    code: 'B',
    slug: 'seo-organic-growth',
    name: 'SEO & Organic Growth',
    summary: 'Technical SEO, Local Google Maps ranking, on-page optimization, content architecture, and crawl hygiene.',
    iconName: 'Search',
  },
  {
    code: 'C',
    slug: 'performance-marketing',
    name: 'Performance Marketing & Paid Ads',
    summary: 'Google Search/Shopping, Meta (FB/IG) campaigns, retargeting, and rigorous ad spend optimization.',
    iconName: 'TrendingUp',
  },
  {
    code: 'D',
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    summary: 'Strategic organic social, content calendars, Reels & Shorts production, community management, and analytics.',
    iconName: 'Share2',
  },
  {
    code: 'E',
    slug: 'branding-creative-content',
    name: 'Branding, Creative & Content',
    summary: 'Brand positioning, logo design, visual identity, packaging, commercial photography direction, and copy.',
    iconName: 'Sparkles',
  },
  {
    code: 'F',
    slug: 'ecommerce-marketplace',
    name: 'eCommerce & Marketplace Growth',
    summary: 'Shopify D2C operations, Amazon India & Flipkart listing optimization, A+ content, catalog health, and sponsored ads.',
    iconName: 'ShoppingCart',
  },
  {
    code: 'G',
    slug: 'lead-generation-conversion',
    name: 'Lead Generation & Conversion (CRO)',
    summary: 'High-intent enquiry funnels, appointment booking systems, B2B lead generation, and checkout friction audits.',
    iconName: 'Target',
  },
  {
    code: 'H',
    slug: 'crm-automation-messaging',
    name: 'WhatsApp, Email, SMS & CRM Automation',
    summary: 'Official WhatsApp Business APIs, automated follow-ups, abandoned cart recovery, and CRM workflow pipelines.',
    iconName: 'MessageSquare',
  },
  {
    code: 'I',
    slug: 'analytics-marketing-intelligence',
    name: 'Analytics & Marketing Intelligence',
    summary: 'GA4, Google Tag Manager, Meta Pixel/CAPI, UTM tracking, custom dashboards, and CAC/LTV attribution.',
    iconName: 'BarChart3',
  },
  {
    code: 'J',
    slug: 'reputation-pr-influencer',
    name: 'Reputation, PR & Influencer Marketing',
    summary: 'Google review growth systems, online reputation management, digital PR distribution, and verified UGC creator campaigns.',
    iconName: 'Award',
  },
  {
    code: 'K',
    slug: 'ai-marketing-automation',
    name: 'AI-Powered Marketing & Automation',
    summary: 'AI lead qualification assistants, automated reporting scripts, custom internal tools, and content workflow automation.',
    iconName: 'Cpu',
  },
  {
    code: 'L',
    slug: 'specialized-marketing',
    name: 'App Store Optimization & Specialized Growth',
    summary: 'App Store & Google Play optimization (ASO), app install campaigns, SaaS marketing, and B2B account-based marketing.',
    iconName: 'Layers',
  },
];

export interface ServiceItem {
  id: string;
  slug: string;
  departmentCode: ServiceDepartmentCode;
  departmentName: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  targetIndustries: string[];
  deliverables: string[];
  process: { step: string; description: string }[];
  relevantTools: string[];
  relatedServiceSlugs: string[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  popular?: boolean;
  featured?: boolean;
  tier: 'START' | 'GROW' | 'SCALE' | 'CUSTOM';
}

export const MASTER_SERVICES_CATALOG: ServiceItem[] = [
  // --- DEPARTMENT A: Web Development ---
  {
    id: 'srv-web-dev',
    slug: 'web-development',
    departmentCode: 'A',
    departmentName: 'Website Development & Digital Products',
    name: 'Custom Web & Application Development',
    tagline: 'High-speed, conversion-engineered digital storefronts and web platforms',
    shortDescription: 'Modern Next.js web applications, headless commerce, corporate portals, and custom business websites engineered for sub-second speed.',
    fullDescription: 'We build production-grade web systems using modern stacks like Next.js, React, Node.js, and headless CMS frameworks. Every site is engineered with clean semantic markup, strict Core Web Vitals optimization, mobile-first responsiveness, and structured schema so your business looks authoritative and converts visitors into paying customers.',
    targetIndustries: ['Corporate', 'D2C Brands', 'Healthcare', 'Real Estate', 'Education', 'Manufacturing'],
    deliverables: [
      'Tailored Next.js / React responsive web application',
      'Mobile-first responsive design across phone, tablet, and desktop',
      'Sub-second load times optimized for Google Core Web Vitals',
      'Integrated contact funnels, WhatsApp click-to-chat, and CRM connectors',
      'Production deployment on high-availability cloud infrastructure (Vercel/AWS)',
      'Clean schema markup, sitemap.xml, robots.txt, and metadata integration',
    ],
    process: [
      { step: '01. Architecture', description: 'Information hierarchy, wireframing, and commercial funnel planning.' },
      { step: '02. UI/UX Design', description: 'High-contrast design system, typography, and responsive component layouts.' },
      { step: '03. Full-Stack Build', description: 'Clean TypeScript/Next.js engineering with semantic HTML and accessibility.' },
      { step: '04. Rigorous QA', description: 'Device testing, form validation, broken link checks, and Core Web Vitals audit.' },
      { step: '05. Deployment', description: 'Production launch, SSL configuration, DNS setup, and indexing submission.' },
    ],
    relevantTools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'PostgreSQL', 'Figma'],
    relatedServiceSlugs: ['seo', 'paid-ads', 'conversion-rate-optimization', 'whatsapp-crm-automation'],
    faqs: [
      {
        q: 'How long does a custom web development project take?',
        a: 'Standard business and high-converting marketing websites typically launch in 2 to 4 weeks. Complex eCommerce portals and custom web applications take 4 to 8 weeks depending on scope and integrations.',
      },
      {
        q: 'Do I own the code and domain?',
        a: 'Yes, 100%. All source code, assets, hosting credentials, and domains belong entirely to you with zero vendor lock-in.',
      },
      {
        q: 'Can you redesign or fix an existing website?',
        a: 'Yes. We frequently conduct diagnostic audits on legacy WordPress, Wix, or custom websites to rebuild them into high-speed Next.js or modern storefronts.',
      },
    ],
    seoTitle: 'Website Development Company in Bhubaneswar, Odisha | DEZO',
    seoDescription: 'DEZO builds high-speed custom websites, Next.js web apps, and eCommerce storefronts for ambitious businesses in Bhubaneswar, Odisha, and nationwide India.',
    popular: true,
    featured: true,
    tier: 'START',
  },
  {
    id: 'srv-shopify-dev',
    slug: 'shopify-development',
    departmentCode: 'A',
    departmentName: 'Website Development & Digital Products',
    name: 'Shopify & D2C Store Development',
    tagline: 'High-converting eCommerce storefronts built for direct-to-consumer scale',
    shortDescription: 'Custom Shopify and Shopify Plus storefronts optimized for mobile checkout, Cash on Delivery (COD) trust, fast loading, and high average order value.',
    fullDescription: 'We design and develop custom Shopify stores tailored specifically for the Indian consumer landscape. From seamless Razorpay/Cashfree payment gateway setups to Shiprocket logistics integration, OTP-based checkout, and instant product discovery, we build stores that eliminate checkout friction and maximize direct sales.',
    targetIndustries: ['eCommerce & D2C Brands', 'Handloom & Textiles', 'Beauty & Fashion', 'Food & Grocery'],
    deliverables: [
      'Custom Shopify 2.0 liquid or headless theme build',
      'Mobile-optimized product and collection page architectures',
      'India payment gateway integration (Razorpay, Cashfree, UPI, PhonePe)',
      'Automated COD verification and fraud prevention setup',
      'Shipping and logistics sync (Shiprocket, Delhivery, Bluedart)',
      'Conversion apps audit to maintain sub-2 second load times',
    ],
    process: [
      { step: '01. Catalog Structuring', description: 'Collection taxonomy, variant architecture, and navigation design.' },
      { step: '02. Storefront Design', description: 'Brand-led theme customization and friction-free product pages.' },
      { step: '03. Logistics & Payments', description: 'Gateway approvals, shipping zone rules, and tax configuration.' },
      { step: '04. Conversion Testing', description: 'Cart abandonment flows, trust badges, and speed optimization.' },
    ],
    relevantTools: ['Shopify', 'Shopify Plus', 'Liquid', 'Razorpay', 'Shiprocket', 'Klaviyo'],
    relatedServiceSlugs: ['web-development', 'paid-ads', 'conversion-rate-optimization', 'amazon'],
    faqs: [
      {
        q: 'Do you work with Shopify Plus or regular Shopify?',
        a: 'We work with all Shopify tiers, from Shopify Basic for emerging D2C brands to Shopify Plus for high-volume enterprises.',
      },
      {
        q: 'How do you handle COD orders in India?',
        a: 'We implement OTP verification apps, WhatsApp confirmation workflows, and RTO (Return to Origin) reduction mechanisms to safeguard your margins.',
      },
    ],
    seoTitle: 'Shopify Store Development Services in India | DEZO',
    seoDescription: 'Custom Shopify development for Indian D2C brands. Fast load speeds, seamless UPI/COD checkouts, and logistics integration by DEZO.',
    popular: true,
    featured: false,
    tier: 'START',
  },
  {
    id: 'srv-landing-pages',
    slug: 'landing-pages-cro',
    departmentCode: 'A',
    departmentName: 'Website Development & Digital Products',
    name: 'High-Converting Landing Pages',
    tagline: 'Campaign-specific landing pages built to maximize ad return on ad spend (ROAS)',
    shortDescription: 'Single-minded, high-converting landing pages built for Google Ads, Meta Ads, and lead generation campaigns with sub-second mobile loading.',
    fullDescription: 'Sending paid traffic to a generic homepage burns ad budget. We build focused, benefit-driven landing pages with clear psychological hierarchy, undeniable social proof, intuitive enquiry forms, and instant WhatsApp click-to-lead buttons.',
    targetIndustries: ['Real Estate & Construction', 'Schools, Colleges & Coaching', 'Hospitals & Healthcare', 'B2B Services'],
    deliverables: [
      'High-converting landing page layout tailored to your ad campaign',
      'Instant mobile loading (< 1.2s First Contentful Paint)',
      'Built-in A/B headline and CTA split-testing readiness',
      'Direct integration with WhatsApp, Google Sheets, email, and CRM',
      'Pixel, Google Ads Tag, and server-side conversion tracking verification',
    ],
    process: [
      { step: '01. Audience Analysis', description: 'Identify buyer triggers, pain points, and objections.' },
      { step: '02. Persuasive Copywriting', description: 'Headline, value proposition, and bulleted benefit proof.' },
      { step: '03. Rapid Build', description: 'High-speed Next.js or WordPress page build with clean forms.' },
      { step: '04. Tracking Verification', description: 'Test purchase, lead, and call conversion firing.' },
    ],
    relevantTools: ['Next.js', 'Tailwind CSS', 'Google Tag Manager', 'Meta Pixel', 'Hotjar'],
    relatedServiceSlugs: ['paid-ads', 'lead-generation', 'web-development'],
    faqs: [
      {
        q: 'Can you integrate landing pages with our existing website domain?',
        a: 'Yes, we can deploy landing pages on a subdomain (e.g. go.yourbrand.com) or a subfolder on your main website.',
      },
    ],
    seoTitle: 'High-Converting Landing Page Design & CRO | DEZO',
    seoDescription: 'Campaign landing pages engineered for high conversion rates and low customer acquisition costs by DEZO.',
    popular: false,
    featured: false,
    tier: 'START',
  },

  // --- DEPARTMENT B: SEO & Organic Growth ---
  {
    id: 'srv-seo',
    slug: 'seo',
    departmentCode: 'B',
    departmentName: 'SEO & Organic Growth',
    name: 'Search Engine Optimization (SEO)',
    tagline: 'Technical, on-page, and authority SEO that compounds organic customer acquisition',
    shortDescription: 'Comprehensive organic search strategy: technical audits, commercial keyword clustering, Google Business Profile optimization, and schema markup.',
    fullDescription: 'SEO is not about keyword stuffing or buying low-quality backlink packages. DEZO implements sustainable, white-hat search architecture that aligns with Google’s Helpful Content Guidelines. We fix crawl bottlenecks, structure commercial landing pages for high-intent queries, build local authority across Odisha and India, and measure rankings that actually translate into inquiries and orders.',
    targetIndustries: ['Healthcare', 'Corporate', 'Real Estate', 'Local Businesses', 'Education', 'eCommerce'],
    deliverables: [
      'Comprehensive technical SEO audit and crawl hygiene remediation',
      'Commercial intent keyword mapping for target services and products',
      'On-page title, meta, header, and structured JSON-LD schema implementation',
      'Google Search Console and Bing Webmaster Tools setup with XML sitemap submission',
      'Local SEO & Google Maps optimization for regional discovery',
      'Monthly search performance reporting with verified impression and click data',
    ],
    process: [
      { step: '01. Technical Audit', description: 'Indexation status, Core Web Vitals, redirects, and robots directives.' },
      { step: '02. Search Intent Mapping', description: 'Cluster high-value commercial keywords by search volume and competition.' },
      { step: '03. Architecture & Content', description: 'Implement on-page hierarchy, internal links, and comprehensive answers.' },
      { step: '04. Local & Authority', description: 'Local citations, NAP consistency, and genuine brand mentions.' },
      { step: '05. Monitor & Refine', description: 'Track Search Console query trends, CTR improvements, and keyword movements.' },
    ],
    relevantTools: ['Google Search Console', 'Google Analytics 4', 'Ahrefs', 'Screaming Frog', 'Schema.org'],
    relatedServiceSlugs: ['local-seo', 'web-development', 'paid-ads', 'growth-systems'],
    faqs: [
      {
        q: 'Can you guarantee the #1 spot on Google?',
        a: 'No, and any agency promising guaranteed #1 rankings is violating Google Webmaster Guidelines. What DEZO guarantees is proven technical execution, high-intent targeting, white-hat practices, and transparent monthly Search Console data.',
      },
      {
        q: 'How long before we see organic search results?',
        a: 'Initial indexation fixes and local Google Maps updates often show impact within 4 to 8 weeks. Competitive national organic rankings typically compound over 3 to 6 months of steady execution.',
      },
      {
        q: 'Do you cover local SEO for Odisha towns?',
        a: 'Yes. We specialize in regional Odisha search intent across Bhubaneswar, Cuttack, Rourkela, Sambalpur, Puri, and all 30 districts.',
      },
    ],
    seoTitle: 'SEO Company in Bhubaneswar, Odisha | Search Engine Optimization — DEZO',
    seoDescription: 'Data-driven technical SEO, local SEO, and organic growth services in Bhubaneswar and across Odisha by DEZO.',
    popular: true,
    featured: true,
    tier: 'GROW',
  },
  {
    id: 'srv-local-seo',
    slug: 'local-seo',
    departmentCode: 'B',
    departmentName: 'SEO & Organic Growth',
    name: 'Local SEO & Google Maps Visibility',
    tagline: 'Dominate the Google 3-Pack and capture high-intent local buyers in your city',
    shortDescription: 'Google Business Profile (GBP) optimization, local NAP citations, geo-targeted landing pages, and review generation systems for local businesses.',
    fullDescription: 'When nearby customers search for "near me" or specific services in Bhubaneswar, Cuttack, or other Odisha cities, being in the Google Local 3-Pack is the primary driver of calls and walk-ins. We optimize your business profile, establish consistent Name-Address-Phone (NAP) citations across reputable Indian directories, structure geo-tagged photos, and build automated review collection workflows.',
    targetIndustries: ['Hospitals, Clinics & Healthcare', 'Local Businesses & Retailers', 'Real Estate & Construction', 'Hotels & Restaurants', 'Salons & Spas'],
    deliverables: [
      'Google Business Profile complete audit, verification, and category optimization',
      'Consistent NAP citation cleanup across 40+ Indian business directories',
      'Local schema markup (LocalBusiness, GeoCoordinates, OpeningHours)',
      'Geo-targeted local service pages for your primary target cities and neighborhoods',
      'Ethical Google Review request strategy and response management guidelines',
      'Monthly Google Maps discovery, call count, and direction request reporting',
    ],
    process: [
      { step: '01. Profile Audit', description: 'Claim, verify, and categorize your primary Google Business listing.' },
      { step: '02. Citation Sync', description: 'Harmonize name, address, and phone across directories and social profiles.' },
      { step: '03. Geo Content', description: 'Create local service pages with authentic landmarks and area coverage.' },
      { step: '04. Reputation Flow', description: 'Implement QR codes and WhatsApp review triggers for genuine customers.' },
    ],
    relevantTools: ['Google Business Profile', 'Google Maps API', 'Local Falcon', 'BrightLocal'],
    relatedServiceSlugs: ['seo', 'web-development', 'lead-generation', 'reputation-management'],
    faqs: [
      {
        q: 'Why isn’t my business showing up on Google Maps?',
        a: 'Common reasons include category mismatches, inconsistent NAP data across the web, lack of localized landing pages, or insufficient genuine customer reviews. We diagnose and fix these root causes.',
      },
    ],
    seoTitle: 'Local SEO & Google Maps Optimization in Odisha | DEZO',
    seoDescription: 'Rank your business on Google Maps 3-Pack across Bhubaneswar, Cuttack, and Odisha. Complete local SEO by DEZO.',
    popular: true,
    featured: false,
    tier: 'START',
  },

  // --- DEPARTMENT C: Performance Marketing & Paid Ads ---
  {
    id: 'srv-paid-ads',
    slug: 'paid-ads',
    departmentCode: 'C',
    departmentName: 'Performance Marketing & Paid Advertising',
    name: 'Performance Marketing & Paid Ads',
    tagline: 'High-ROI Google, Meta, and Shopping campaigns engineered for customer acquisition',
    shortDescription: 'Google Search, Shopping, PMax, Meta (Facebook & Instagram) ads, and retargeting managed with strict return on ad spend (ROAS) accountability.',
    fullDescription: 'Stop wasting budget on broad boost buttons and uncalibrated ad accounts. DEZO structures paid campaigns with surgical targeting, tight negative keyword lists, high-converting ad copy, iterative creative testing, and server-side conversion tracking so every rupee spent is measured against real revenue and qualified leads.',
    targetIndustries: ['eCommerce & D2C Brands', 'Real Estate & Construction', 'Schools & Coaching', 'Healthcare', 'B2B Services'],
    deliverables: [
      'Full campaign architecture (Top-of-funnel discovery, middle consideration, bottom retargeting)',
      'Google Search, Shopping, and Performance Max (PMax) campaign management',
      'Meta (Facebook & Instagram) ads with multi-format creative testing',
      'Conversion API (CAPI) and Google Tag Manager server-side event tracking',
      'Negative keyword maintenance and fraud click mitigation',
      'Transparent weekly and monthly ROAS/CPA performance reporting dashboards',
    ],
    process: [
      { step: '01. Measurement Setup', description: 'Install Pixel, CAPI, GA4, and define primary purchase/lead conversion events.' },
      { step: '02. Audience & Creative', description: 'Develop persona angles, benefit-led hooks, and high-impact ad creatives.' },
      { step: '03. Campaign Launch', description: 'Deploy structured ad sets with distinct bid strategies and budget caps.' },
      { step: '04. Daily Optimization', description: 'Prune non-performing keywords/creatives and scale winning ad combinations.' },
      { step: '05. Reporting', description: 'Transparent breakdown of spend vs. verified customer acquisitions.' },
    ],
    relevantTools: ['Google Ads', 'Meta Ads Manager', 'Google Tag Manager', 'Meta Conversions API', 'Looker Studio'],
    relatedServiceSlugs: ['landing-pages-cro', 'web-development', 'shopify-development', 'analytics-tracking'],
    faqs: [
      {
        q: 'Is ad spend included in your management fee?',
        a: 'No. Advertising spend is paid directly by you to Google and Meta using your own credit card or billing account. DEZO charges a transparent management retainer with zero hidden markups.',
      },
      {
        q: 'What is the minimum recommended budget for paid ads?',
        a: 'For local lead generation in Odisha, we recommend starting with at least ₹20,000–₹40,000/month in ad spend. For nationwide eCommerce D2C campaigns, a minimum of ₹50,000–₹1,00,000/month provides sufficient data to test and scale effectively.',
      },
    ],
    seoTitle: 'Google & Meta Ads Agency in Bhubaneswar, Odisha | DEZO',
    seoDescription: 'Performance marketing and paid advertising agency in Bhubaneswar. Google Search, Shopping, and Meta Ads managed with strict ROAS accountability by DEZO.',
    popular: true,
    featured: true,
    tier: 'GROW',
  },

  // --- DEPARTMENT D: Social Media Marketing ---
  {
    id: 'srv-social',
    slug: 'social',
    departmentCode: 'D',
    departmentName: 'Social Media Marketing',
    name: 'Social Media Strategy & Content Management',
    tagline: 'Brand authority and organic engagement across Instagram, LinkedIn, and YouTube',
    shortDescription: 'End-to-end social media management: content calendars, viral Reels/Shorts scripts, professional graphic design, and community management.',
    fullDescription: 'Social media is your brand’s daily digital storefront. We turn inconsistent posting into an organized organic growth engine. We produce high-quality visual carousels, short-form Reels that address real buyer questions, professional LinkedIn thought leadership, and responsive community interaction that builds lasting brand equity.',
    targetIndustries: ['Beauty & Fashion', 'Hotels, Restaurants & Tourism', 'Education & Coaching', 'Real Estate', 'D2C Brands'],
    deliverables: [
      'Comprehensive monthly content calendar with clear thematic pillars',
      '12 to 20 original custom designed graphic posts and carousels per month',
      'Short-form vertical video (Reels/Shorts) concepts, scripts, and editing',
      'Bio optimization, highlight covers, and brand aesthetic harmonization',
      'Community engagement: comment monitoring and direct message routing',
      'Monthly reach, engagement rate, and audience growth analytics report',
    ],
    process: [
      { step: '01. Brand Voice & Pillars', description: 'Define tone, visual styling, and content pillars that align with customer desires.' },
      { step: '02. Creative Batching', description: 'Write scripts, design graphic templates, and produce video assets in weekly batches.' },
      { step: '03. Scheduling & Review', description: 'Client review portal for approvals prior to automated scheduled publishing.' },
      { step: '04. Community Ops', description: 'Monitor incoming inquiries and engage with target accounts.' },
    ],
    relevantTools: ['Canva Pro', 'Adobe Premiere Pro', 'CapCut', 'Meta Business Suite', 'Buffer'],
    relatedServiceSlugs: ['branding', 'paid-ads', 'reputation-management'],
    faqs: [
      {
        q: 'Do you shoot the videos or do we provide footage?',
        a: 'Both options are available. For clients in Bhubaneswar and nearby Odisha districts, we can coordinate on-site video shoots. For remote or national clients, you can share raw phone footage and product clips, which our video editors turn into polished Reels.',
      },
    ],
    seoTitle: 'Social Media Marketing Agency in Bhubaneswar | DEZO',
    seoDescription: 'Organic social media management, Instagram Reels, LinkedIn growth, and content strategy for businesses in Odisha and India by DEZO.',
    popular: false,
    featured: false,
    tier: 'GROW',
  },

  // --- DEPARTMENT E: Branding, Creative & Content ---
  {
    id: 'srv-branding',
    slug: 'branding',
    departmentCode: 'E',
    departmentName: 'Branding, Creative & Content',
    name: 'Brand Identity, Positioning & Creative Design',
    tagline: 'Distinctive visual identities, logo systems, and packaging that make products sellable',
    shortDescription: 'Complete brand creation: naming, logo design, color palettes, brand guideline books, packaging design, and commercial storytelling.',
    fullDescription: 'A strong brand allows you to charge premium prices and build lasting customer loyalty. DEZO crafts comprehensive visual and verbal identity systems. We establish clear brand guidelines, typography, color psychology, product packaging, brochures, and digital collateral that stand out across both retail shelves and digital screens.',
    targetIndustries: ['Beauty & Fashion', 'eCommerce & D2C Brands', 'Food & Grocery', 'Corporate', 'Hospitality'],
    deliverables: [
      'Primary, secondary, and sub-mark vector logo suites (SVG, PNG, PDF)',
      'Comprehensive Brand Style Guide (Color tokens, typography hierarchy, usage rules)',
      'Stationery suite: Business cards, letterheads, invoice templates, and email signatures',
      'Product packaging, pouch, box, and label design print-ready vector files',
      'Social media starter kit with customizable Figma/Canva templates',
      'Core brand positioning narrative, tagline, and elevator pitch documentation',
    ],
    process: [
      { step: '01. Discovery & Positioning', description: 'Analyze competitors, audience psychology, and unique selling proposition.' },
      { step: '02. Concept Exploration', description: 'Present 3 distinct creative visual directions and moodboards.' },
      { step: '03. System Refinement', description: 'Flesh out chosen direction with typography, color palettes, and mockups.' },
      { step: '04. Guideline Delivery', description: 'Export full vector assets and master brand documentation.' },
    ],
    relevantTools: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Brand Guidelines Engine'],
    relatedServiceSlugs: ['web-development', 'social', 'amazon', 'shopify-development'],
    faqs: [
      {
        q: 'Do I get full copyright and vector source files for the logo?',
        a: 'Yes. Upon final payment, 100% intellectual property ownership transfers to you, including all master AI, SVG, EPS, and PNG files.',
      },
    ],
    seoTitle: 'Branding & Logo Design Agency in Bhubaneswar, Odisha | DEZO',
    seoDescription: 'Transform your business with modern brand identity, logo design, packaging, and creative guidelines by DEZO.',
    popular: false,
    featured: true,
    tier: 'START',
  },

  // --- DEPARTMENT F: eCommerce & Marketplace Growth ---
    {
    id: 'srv-ecommerce-growth',
    slug: 'ecommerce-growth',
    departmentCode: 'F',
    departmentName: 'eCommerce & Marketplace Growth',
    name: 'Independent eCommerce Growth & Store Development',
    tagline: 'Turnkey Shopify & Next.js storefronts, India payment gateways, UPI checkout, and retention marketing',
    shortDescription: 'Launch and scale your independent online store: custom Shopify/Next.js engineering, frictionless UPI/Razorpay checkout, Shiprocket logistics sync, and high-converting paid acquisition.',
    fullDescription: 'An independent eCommerce store grants your business what marketplaces never will: 100% customer data ownership, zero referral commissions, and complete brand equity. DEZO builds high-speed, conversion-engineered direct-to-consumer (D2C) online storefronts. From custom Shopify 2.0 or Next.js development to Razorpay/Cashfree payment integrations, automated COD fraud prevention, Shiprocket shipping workflows, and Google Shopping & Meta Ads scaling, we build stores that turn first-time visitors into repeat buyers.',
    targetIndustries: [
      'eCommerce & D2C Brands',
      'Handloom & Ethnic Textiles',
      'Beauty, Skincare & Cosmetics',
      'Packaged Foods & Groceries',
      'Fashion & Apparel',
      'Consumer Goods & Lifestyle',
      'Wholesale & B2B Portals',
    ],
    deliverables: [
      'Comprehensive eCommerce business model planning, competitor benchmarking, and launch roadmap',
      'Custom Shopify 2.0 or headless Next.js storefront engineering optimized for sub-second mobile loading',
      'India payment gateway integration: Razorpay, Cashfree, PhonePe, and instant 1-click UPI checkout',
      'Cash on Delivery (COD) configuration with OTP verification and automated RTO fraud reduction workflows',
      'Logistics and shipping provider sync with Shiprocket, Delhivery, or automated tracking webhooks',
      'Product catalog structuring, variant matrices, high-resolution imagery, and collection tagging',
      'Technical eCommerce SEO: Product schema markup, category content, buying guides, and clean sitemaps',
      'Conversion Rate Optimization (CRO): Cart abandonment email/WhatsApp recovery and trust badges',
      'Analytics setup: GA4 eCommerce event tracking, Meta Pixel, Conversions API (CAPI), and Looker Studio dashboard',
    ],
    process: [
      { step: '01. Architecture & Model Planning', description: 'Catalog taxonomy, payment/logistics selection, target customer journey, and UX wireframing.' },
      { step: '02. Storefront Engineering', description: 'Custom theme build, mobile-first responsiveness, sub-second speed optimization, and cart UX.' },
      { step: '03. Integrations & Checkouts', description: 'Payment gateway approvals, shipping zone rules, tax compliance, and automated tracking setup.' },
      { step: '04. QA & End-to-End Test Orders', description: 'Live payment simulation, refund workflows, COD OTP checks, and mobile checkout friction tests.' },
      { step: '05. Growth Launch & Retention Marketing', description: 'Google Shopping ads, Meta product ads, and automated WhatsApp abandoned cart recovery flows.' },
    ],
    relevantTools: ['Shopify Plus', 'Next.js', 'Razorpay', 'Cashfree', 'Shiprocket', 'Klaviyo', 'WhatsApp API', 'Google Analytics 4'],
    relatedServiceSlugs: ['shopify-development', 'web-development', 'marketplace-growth', 'amazon', 'flipkart', 'paid-ads'],
    faqs: [
      {
        q: 'Should I choose Shopify or custom Next.js for my online store?',
        a: 'For most D2C brands, Shopify 2.0 provides the best balance of speed, stability, India app ecosystem, and easy inventory management. For businesses requiring custom product configurators, complex B2B rules, or extreme sub-second edge rendering, a custom Next.js storefront is the superior choice.',
      },
      {
        q: 'How do you handle Cash on Delivery (COD) risks in India?',
        a: 'We implement multi-layered RTO defense: OTP verification at checkout, automated WhatsApp order confirmation prompts, address validation, and instant prepayment discount incentives (e.g., 5% off on prepaid UPI).',
      },
      {
        q: 'Do you charge a percentage of store revenue?',
        a: 'No. DEZO operates strictly on transparent fixed-scope development milestones or monthly management retainers. We never take a percentage of your online store revenue.',
      },
      {
        q: 'Can you migrate our existing store from WooCommerce or Magento?',
        a: 'Yes. We handle complete catalog, customer data, historical order data, and 301 URL redirect migration to preserve your existing SEO rankings without downtime.',
      },
      {
        q: 'What payment gateways do you integrate?',
        a: 'We integrate all leading Indian payment gateways including Razorpay, Cashfree, PhonePe Payment Gateway, and PayU, supporting UPI, credit/debit cards, net banking, and EMI options.',
      },
    ],
    seoTitle: 'eCommerce Website Development & D2C Growth Agency in India | DEZO',
    seoDescription: 'Custom Shopify and Next.js eCommerce website development in India. Sub-second speed, seamless UPI/Razorpay checkout, and D2C marketing by DEZO in Bhubaneswar, Odisha.',
    popular: true,
    featured: true,
    tier: 'GROW',
  },

  {
    id: 'srv-amazon',
    slug: 'amazon',
    departmentCode: 'F',
    departmentName: 'eCommerce & Marketplace Growth',
    name: 'Amazon India Marketplace Growth & PPC Management',
    tagline: 'Seller Central onboarding, search-indexed listings, A+ Content, Brand Stores, and Sponsored Ads optimization',
    shortDescription: 'Comprehensive Amazon India seller management: catalog cleanup, high-volume buyer keywords, A+ content modules, Brand Store creation, and Sponsored Ads managed with strict target ACoS.',
    fullDescription: 'Winning on Amazon India requires both high organic search rank and rigorous ad spend discipline. DEZO manages your entire Amazon Seller Central ecosystem. From seller onboarding, document verification, and Brand Registry enrollment to keyword-dense listing copy, high-converting A+ modules, Sponsored Products/Brands campaigns, inventory aging alerts, and account health maintenance, we treat your catalog as an active revenue engine. We operate on authorized child-account permissions, track true contribution margins, and never make fabricated Buy Box or ranking claims.',
    targetIndustries: [
      'eCommerce & D2C Brands',
      'Handloom & Ethnic Textiles',
      'Beauty, Skincare & Cosmetics',
      'Packaged Foods & Spices',
      'Consumer Electronics & Appliances',
      'Ayurveda & Herbal Wellness',
      'Home & Kitchen',
      'B2B & Industrial Manufacturing',
    ],
    deliverables: [
      'Seller Central readiness assessment, document verification checklist, and secure child account setup',
      'Amazon Brand Registry enrollment submission guidance and GTIN exemption support',
      'Keyword-indexed product titles, 5 benefit-driven bullet points, and compliant backend search terms (250 bytes)',
      'Custom modular A+ Content (Enhanced Brand Content) design, copywriting, comparison tables, and submission',
      'Multi-page Amazon Brand Store architecture with category navigation and curated product showcases',
      'Sponsored Products, Sponsored Brands (Video), and Sponsored Display campaign creation and bid management',
      'Daily bid adjustments and weekly negative search-term harvesting to minimize wasted ad spend and lower ACoS',
      'Catalog suppression triage, stranded inventory fixes, and Account Health Rating (ODR/LDR) monitoring',
      'Bi-weekly performance reporting tracking unit sales, organic vs. ad revenue, TACoS, and net contribution margins',
    ],
    process: [
      { step: '01. Forensic Account & Catalog Audit', description: 'Inspect listing suppression, keyword coverage, ad waste, review profiles, and competitor pricing baselines.' },
      { step: '02. Keyword Architecture & Optimization', description: 'Inject high-volume customer search terms into indexable titles, bullet points, and backend search fields.' },
      { step: '03. Visual Persuasion & A+ Production', description: 'Design conversion-focused infographics, size guides, comparison tables, and Brand Store layout.' },
      { step: '04. Segmented PPC Campaign Architecture', description: 'Deploy Auto, Exact, Phrase, and Product Defense ad structures with disciplined target ACoS caps.' },
      { step: '05. Weekly Management & Margin Telemetry', description: 'Prune bleeding search terms, monitor FBA/EasyShip fee slabs, and report true net contribution margin.' },
    ],
    relevantTools: ['Amazon Seller Central', 'Amazon Ads Console', 'Helium 10', 'Jungle Scout', 'Figma', 'Excel Bulk Feeds'],
    relatedServiceSlugs: ['flipkart', 'ecommerce-growth', 'marketplace-growth', 'shopify-development', 'paid-ads', 'branding'],
    faqs: [
      {
        q: 'Do you need our Amazon master account credentials?',
        a: 'No, absolutely not. You should never share your master account password. Amazon provides a secure User Permissions (child account) feature where you grant DEZO secondary access restricted specifically to Catalog, Advertising, and Performance reports.',
      },
      {
        q: 'Can you help our brand enroll in Amazon Brand Registry?',
        a: 'Yes. We guide you through the trademark application verification, documentation submission, and Brand Registry approval workflow to unlock A+ content, Brand Stores, Sponsored Brands video ads, and brand protection tools.',
      },
      {
        q: 'Is third-party advertising spend included in your management fee?',
        a: 'No. Advertising spend is paid directly by you to Amazon Advertising through your own credit card or billing account. DEZO charges a transparent service management fee with zero ad arbitrage or hidden markups.',
      },
      {
        q: 'Do you guarantee Buy Box placement or specific keyword rankings?',
        a: 'No ethical agency can guarantee specific algorithmic rankings or 100% Buy Box share, as Amazon’s algorithm evaluates dynamic seller factors including inventory proximity, fulfillment speed, seller rating, and real-time price. We optimize every controllable element to maximize your competitive win probability.',
      },
      {
        q: 'Does DEZO physically handle warehousing, packaging, or parcel dispatch?',
        a: 'No. DEZO manages digital operations, catalog data, listings, creative production, and advertising. Physical storage and order fulfillment are handled by your warehouse team or through Amazon FBA / Easy Ship fulfillment networks.',
      },
      {
        q: 'Can you assist manufacturers and brands located in Odisha?',
        a: 'Yes. DEZO is headquartered in Patia, Bhubaneswar, Odisha. We work closely with regional handloom weavers, food processors, spice manufacturers, and artisans across Odisha, as well as brands nationwide across India.',
      },
      {
        q: 'What is TACoS and why do you prioritize it over ROAS alone?',
        a: 'TACoS (Total Advertising Cost of Sales) measures ad spend against your TOTAL marketplace revenue (both organic and paid). A campaign with 4x ROAS is meaningless if your total ad spend eats 40% of your gross margin. We optimize for healthy TACoS (typically 8%–15%) to ensure real commercial net profit.',
      },
      {
        q: 'How do you handle suppressed listings and stranded inventory?',
        a: 'We conduct regular catalog audits to catch missing attributes, image compliance flags, and category mapping errors. We open structured case tickets with Amazon Seller Support and track resolutions until products are active and buyable.',
      },
    ],
    seoTitle: 'Amazon India Seller Account Management & PPC Agency | DEZO',
    seoDescription: 'End-to-end Amazon India seller management: listing optimization, A+ content, Brand Stores, and Sponsored Ads managed with strict ACoS accountability by DEZO in Bhubaneswar, Odisha.',
    popular: true,
    featured: true,
    tier: 'GROW',
  },

  {
    id: 'srv-flipkart',
    slug: 'flipkart',
    departmentCode: 'F',
    departmentName: 'eCommerce & Marketplace Growth',
    name: 'Flipkart Seller Growth & Catalog Operations',
    tagline: 'Seller Hub onboarding, Listing Quality Score (LQS) optimization, PLA advertising, and festive sale scaling',
    shortDescription: 'Full Flipkart seller management: catalog creation, search keyword enrichment, Product Listing Ads (PLA), smart promotions, and account health maintenance.',
    fullDescription: 'Flipkart reaches deep into Tier 2, Tier 3, and rural Indian retail markets. DEZO optimizes your Flipkart Seller Hub operations to capture this high-volume consumer demand. We manage single and bulk catalog uploads, maximize Listing Quality Scores (LQS > 80), structure Product Listing Ads (PLA) and Product Contextual Ads (PCA), participate strategically in Big Billion Days promotions, and safeguard dispatch metrics to maintain your seller tier.',
    targetIndustries: [
      'eCommerce & D2C Brands',
      'Handloom & Ethnic Textiles',
      'Fashion, Apparel & Footwear',
      'Consumer Electronics & Mobile Accessories',
      'Packaged Foods & Groceries',
      'Manufacturing & Wholesale',
    ],
    deliverables: [
      'Flipkart Seller Hub registration checklist, GSTIN verification, and category approval support',
      'Bulk Excel catalog preparation, attribute mapping, and variant structure configuration',
      'Listing Quality Score (LQS) optimization focusing on complete technical attributes and size guides',
      'Product Listing Ads (PLA) and Smart ROI campaign setup and ROI-focused bid management',
      'Promotional calendar planning for Flipkart Big Billion Days, festive sale events, and deal enrollment',
      'Fulfillment, dispatch latency, and cancellation tracking to prevent seller tier downgrades',
      'Listing error investigation, catalog dispute resolution, and brand approval escalation guidance',
      'Monthly sales volume, ad spend, returns (RTO) diagnostic, and marketplace settlement reporting',
    ],
    process: [
      { step: '01. Catalog & Health Diagnostic', description: 'Evaluate current listings against Flipkart listing quality benchmarks (LQS) and inspect account standing.' },
      { step: '02. Attribute & Keyword Enrichment', description: 'Fill every key attribute, search filter tag, material specification, and size chart to maximize search reach.' },
      { step: '03. Performance Advertising Setup', description: 'Deploy CPC and Smart ROI campaigns targeting high-converting buyer search queries and category filters.' },
      { step: '04. Promotional Calibration & Scaling', description: 'Enroll eligible hero products into platform promotions and flash deals without eroding gross margins.' },
      { step: '05. Weekly Operations & SLA Safeguarding', description: 'Monitor order processing speed, dispatch latency, and return patterns to protect seller tier status.' },
    ],
    relevantTools: ['Flipkart Seller Hub', 'Flipkart Ads Manager', 'Excel Catalog Templates', 'Figma'],
    relatedServiceSlugs: ['amazon', 'ecommerce-growth', 'marketplace-growth', 'shopify-development', 'paid-ads'],
    faqs: [
      {
        q: 'What is Listing Quality Score (LQS) on Flipkart and why does it matter?',
        a: 'Flipkart assigns every listing a score from 0 to 100 based on title length, image count, attribute completeness, and descriptions. A score above 80 is required for high organic visibility in Flipkart search results and filter navigation.',
      },
      {
        q: 'What types of ads are available on Flipkart Ads Manager?',
        a: 'Flipkart offers Product Listing Ads (PLA) which appear in search results, browse pages, and product detail pages, as well as Product Contextual Ads (PCA). We manage both CPC campaigns and automated Smart ROI campaigns depending on your catalog scale.',
      },
      {
        q: 'How do you prepare clients for Flipkart Big Billion Days (BBD)?',
        a: 'We begin preparation 6 to 8 weeks prior: auditing inventory availability, optimizing catalog LQS scores, submitting products to eligible BBD promotion tiers, and structuring ad budgets to capture the surge in festive traffic without running out of stock.',
      },
      {
        q: 'How do you help manage high return rates (RTO) on Flipkart?',
        a: 'We analyze customer return reasons in Seller Hub. For fashion and handloom, we introduce detailed Indian size charts and fabric drape images. For electronics, we add clear compatibility infographics and setup instructions to prevent user-error returns.',
      },
      {
        q: 'Can DEZO manage both Amazon India and Flipkart together?',
        a: 'Yes. Most successful brands run dual-channel strategies. DEZO operates as your single point of contact, synchronizing catalog data, pricing policies, and promotional calendars across both platforms.',
      },
    ],
    seoTitle: 'Flipkart Seller Management & Ads Agency in India | DEZO',
    seoDescription: 'Flipkart listing optimization, catalog creation, Listing Quality Score enhancement, and PLA ads for Indian sellers by DEZO in Bhubaneswar, Odisha.',
    popular: false,
    featured: false,
    tier: 'GROW',
  },

  {
    id: 'srv-marketplace-growth',
    slug: 'marketplace-growth',
    departmentCode: 'F',
    departmentName: 'eCommerce & Marketplace Growth',
    name: 'Integrated Marketplace Growth & Omnichannel Strategy',
    tagline: 'Synchronizing your independent storefront, Amazon, and Flipkart into one unified sales machine',
    shortDescription: 'Unified commerce management: catalog synchronization, channel-specific listing content, balanced ad spend allocation, and cross-channel profitability telemetry.',
    fullDescription: 'Operating in silos burns resources. If your website, Amazon account, and Flipkart store are run by different teams without alignment, pricing disputes, stockouts, and margin leakage are inevitable. DEZO coordinates your entire digital retail ecosystem as one unified engine. We tailor product copy for marketplace search algorithms while preserving brand storytelling on your website, optimize total ad budgets across Google, Meta, Amazon, and Flipkart, and report true contribution margins.',
    targetIndustries: [
      'eCommerce & D2C Brands',
      'Handloom & Ethnic Textiles',
      'Beauty, Skincare & Cosmetics',
      'Packaged Foods & Spices',
      'Consumer Electronics & Mobile Accessories',
      'Manufacturing & Wholesale',
    ],
    deliverables: [
      'Cross-channel marketplace and D2C launch strategy blueprint and channel fit assessment',
      'Unified product catalog data management and channel-specific listing content adaptation',
      'Channel-level budget allocation across Amazon Sponsored Ads, Flipkart PLA, Meta, and Google Shopping',
      'Centralized inventory replenishment forecasting to prevent costly out-of-stock rank penalties',
      'Consolidated monthly profitability dashboard tracking sales, TACoS, and net margins across all channels',
      'Bi-weekly strategic operating cadence with single-point accountability and dedicated growth leadership',
    ],
    process: [
      { step: '01. Cross-Channel Diagnostic', description: 'Audit listings, brand consistency, pricing alignment, and margin leaks across all active channels.' },
      { step: '02. Unified Catalog & Positioning', description: 'Adapt product titles and creative assets to match each channel’s unique buyer search algorithms.' },
      { step: '03. Disciplined Media Allocation', description: 'Direct ad spend toward high-margin channels while maintaining defensive rank on marketplaces.' },
      { step: '04. Inventory & Operations Sync', description: 'Implement replenishment schedules and multi-channel safety stock buffers to prevent stockouts.' },
      { step: '05. Scaled Omnichannel Reporting', description: 'Measure blended customer acquisition cost (blended CAC) and net commercial profit.' },
    ],
    relevantTools: ['Amazon Seller Central', 'Flipkart Seller Hub', 'Shopify', 'Google Ads', 'Meta Ads', 'Looker Studio'],
    relatedServiceSlugs: ['amazon', 'flipkart', 'ecommerce-growth', 'shopify-development', 'paid-ads'],
    faqs: [
      {
        q: 'Why should a brand sell on both Amazon and an independent website?',
        a: 'Marketplaces like Amazon and Flipkart provide immediate, high-intent buyer traffic from day one. Your independent website provides 100% customer data ownership, higher margins, and long-term brand equity. Running both creates a self-reinforcing flywheel where marketplace discovery fuels direct brand search.',
      },
      {
        q: 'How do you prevent price conflicts between our website and marketplaces?',
        a: 'We help you maintain price parity while creating channel-specific value. For example, offering exclusive bundles, starter kits, or personalized engraving on your own website, while maintaining standardized single-unit SKUs on marketplaces.',
      },
      {
        q: 'How does DEZO coordinate multiple channels without confusion?',
        a: 'You have a single accountable DEZO Growth Lead in Bhubaneswar who coordinates all channel sprints, creative production, ad budgets, and weekly performance reviews under one unified operating cadence.',
      },
    ],
    seoTitle: 'Marketplace Management & Omnichannel Growth Agency India | DEZO',
    seoDescription: 'Unify your Amazon India, Flipkart, and D2C website operations. Catalog synchronization, PPC management, and cross-channel profit reporting by DEZO.',
    popular: true,
    featured: true,
    tier: 'SCALE',
  },



  // --- DEPARTMENT G: Lead Generation & Conversion (CRO) ---
  {
    id: 'srv-lead-gen',
    slug: 'lead-generation',
    departmentCode: 'G',
    departmentName: 'Lead Generation & Conversion',
    name: 'B2B & Local Lead Generation Systems',
    tagline: 'Predictable, high-intent inquiry pipelines connecting paid channels to sales CRM',
    shortDescription: 'Turn website traffic into qualified phone, WhatsApp, and email inquiries with engineered lead magnets, qualification forms, and instant routing.',
    fullDescription: 'A lead generation campaign is only as good as the quality of inquiries it delivers. DEZO builds end-to-end lead acquisition pipelines. We design targeted enquiry funnels with upfront qualification fields to filter out tyre-kickers, connect instant WhatsApp notifications to your sales team, and integrate automated CRM tracking.',
    targetIndustries: ['Real Estate & Construction', 'Hospitals, Clinics & Healthcare', 'Schools & Coaching', 'Manufacturing', 'Professional Services'],
    deliverables: [
      'Multi-step qualification inquiry forms that filter high-intent prospects',
      'Instant lead alerts to your sales team via WhatsApp, SMS, and Email',
      'Lead magnet creation (brochures, cost calculators, checklists)',
      'CRM integration with Zoho, HubSpot, Google Sheets, or custom webhook',
      'Call tracking setup to measure telephone inquiries from Google Ads',
      'Lead source attribution report showing exact cost per qualified lead',
    ],
    process: [
      { step: '01. Prospect Profiling', description: 'Define mandatory qualification criteria (budget, location, timeline).' },
      { step: '02. Funnel Construction', description: 'Build interactive forms, quote calculators, and consultation booking.' },
      { step: '03. Instant Routing', description: 'Connect webhooks so sales reps receive customer inquiries within 10 seconds.' },
      { step: '04. Cadence Optimization', description: 'A/B test form length vs. lead quality to maximize conversion rates.' },
    ],
    relevantTools: ['Zod', 'React Hook Form', 'WhatsApp API', 'Zoho CRM', 'HubSpot', 'Make'],
    relatedServiceSlugs: ['landing-pages-cro', 'paid-ads', 'seo', 'whatsapp-crm-automation'],
    faqs: [
      {
        q: 'Do you sell pre-scraped contact lists?',
        a: 'No. DEZO never sells scraped or third-party phone lists. We build inbound organic and advertising funnels where prospective customers willingly submit their own details for your specific services.',
      },
    ],
    seoTitle: 'B2B & Local Lead Generation Services in Odisha | DEZO',
    seoDescription: 'Generate qualified customer enquiries, phone calls, and appointment bookings with engineered lead funnels by DEZO.',
    popular: true,
    featured: false,
    tier: 'GROW',
  },
  {
    id: 'srv-cro',
    slug: 'conversion-rate-optimization',
    departmentCode: 'G',
    departmentName: 'Lead Generation & Conversion',
    name: 'Conversion Rate Optimization (CRO)',
    tagline: 'Audit checkout friction, improve trust signals, and lift conversion without increasing ad spend',
    shortDescription: 'Data-driven conversion audits, user heatmaps, checkout trust improvements, and mobile UX refinements to turn more visitors into buyers.',
    fullDescription: 'If your site gets traffic but struggles with high bounce rates and abandoned carts, you have a conversion leak. DEZO performs rigorous qualitative and quantitative conversion audits. We inspect mobile viewport responsiveness, simplify checkout forms, introduce strategic trust badges, and run methodical A/B tests.',
    targetIndustries: ['eCommerce & D2C Brands', 'Real Estate', 'Healthcare', 'Education'],
    deliverables: [
      'Comprehensive 40-point CRO audit report across mobile and desktop',
      'Session recording and heatmap analysis identifying drop-off zones',
      'Checkout form simplification and Indian trust signal enhancements',
      'Page speed improvements directly targeting conversion latency',
      'A/B test recommendations with prioritized impact vs. effort scoring',
    ],
    process: [
      { step: '01. Data Gathering', description: 'Analyze GA4 funnel steps, bounce rates, and checkout abandonment.' },
      { step: '02. Heatmap Audit', description: 'Identify where users hesitate, rage-click, or abandon forms.' },
      { step: '03. Hypothesis Formulation', description: 'Draft specific visual and structural fixes to reduce friction.' },
      { step: '04. Implementation & Test', description: 'Deploy changes and track statistical conversion rate improvements.' },
    ],
    relevantTools: ['Hotjar', 'Microsoft Clarity', 'Google Analytics 4', 'VWO'],
    relatedServiceSlugs: ['web-development', 'shopify-development', 'landing-pages-cro'],
    faqs: [
      {
        q: 'What is a typical conversion rate for an Indian eCommerce store?',
        a: 'Across Indian D2C stores, average conversion rates range between 1.2% and 2.5%. High-performing, trust-optimized stores frequently achieve 3.0% to 4.5% on qualified traffic.',
      },
    ],
    seoTitle: 'Conversion Rate Optimization (CRO) Services in India | DEZO',
    seoDescription: 'Boost your website and eCommerce sales with rigorous conversion rate audits, UX fixes, and trust engineering by DEZO.',
    popular: false,
    featured: false,
    tier: 'GROW',
  },

  // --- DEPARTMENT H: WhatsApp, Email, SMS & CRM Automation ---
  {
    id: 'srv-whatsapp-crm',
    slug: 'whatsapp-crm-automation',
    departmentCode: 'H',
    departmentName: 'WhatsApp, Email, SMS & CRM',
    name: 'WhatsApp Business API & CRM Automation',
    tagline: 'Consent-based WhatsApp chatbots, automated customer follow-ups, and CRM workflows',
    shortDescription: 'Official Meta WhatsApp Business Cloud API setup, automated lead capture bots, order confirmation triggers, abandoned cart recovery, and CRM integration.',
    fullDescription: 'In India, WhatsApp is the dominant communication channel. DEZO implements official Meta WhatsApp Business Cloud API integrations that respect user consent. We build automated chatbots to qualify inquiries 24/7, trigger instant order updates, recover abandoned checkout carts, and automatically sync leads into Zoho, HubSpot, or custom databases.',
    targetIndustries: ['Local Businesses & Retailers', 'eCommerce & D2C Brands', 'Schools & Coaching', 'Real Estate', 'Healthcare'],
    deliverables: [
      'Official Meta WhatsApp Business Cloud API setup and verified green tick guidance',
      'Automated qualification bot flows for 24/7 customer enquiry response',
      'Automated eCommerce triggers: Order confirmation, tracking links, and COD validation',
      'Abandoned cart recovery sequence via WhatsApp with one-click checkout links',
      'Two-way CRM integration: Sync contacts and chat history into Zoho or HubSpot',
      'Opt-out management ensuring strict compliance with Indian privacy regulations',
    ],
    process: [
      { step: '01. Account Verification', description: 'Register Meta Business Manager and approve official message templates.' },
      { step: '02. Workflow Logic', description: 'Map out customer conversation trees, auto-replies, and qualification questions.' },
      { step: '03. Webhook Integration', description: 'Connect your website checkout or lead forms to the WhatsApp API.' },
      { step: '04. Testing & Launch', description: 'Verify delivery rates, opt-out triggers, and CRM contact synchronization.' },
    ],
    relevantTools: ['Meta WhatsApp Cloud API', 'Wati', 'Interakt', 'Zoho CRM', 'HubSpot', 'n8n', 'Make'],
    relatedServiceSlugs: ['web-development', 'lead-generation', 'shopify-development'],
    faqs: [
      {
        q: 'Is this official WhatsApp or unofficial bulk software?',
        a: 'We ONLY implement official Meta WhatsApp Cloud API integrations. We never use unofficial scraping or unauthorized bulk blasting tools that risk getting your business phone number banned.',
      },
      {
        q: 'Do customers need to opt in to receive messages?',
        a: 'Yes. Indian regulations and Meta policies mandate that users provide clear opt-in consent before receiving transactional or marketing messages.',
      },
    ],
    seoTitle: 'WhatsApp Business API & Marketing Automation in India | DEZO',
    seoDescription: 'Official WhatsApp Business API setup, automated chatbots, and CRM integrations for Indian businesses by DEZO.',
    popular: true,
    featured: false,
    tier: 'GROW',
  },

  // --- DEPARTMENT I: Analytics & Marketing Intelligence ---
  {
    id: 'srv-analytics',
    slug: 'analytics-tracking',
    departmentCode: 'I',
    departmentName: 'Analytics & Marketing Intelligence',
    name: 'GA4, Tag Manager & Conversion Intelligence',
    tagline: 'Reliable measurement foundations, server-side tracking, and executive marketing dashboards',
    shortDescription: 'Google Analytics 4 (GA4), Google Tag Manager (GTM), Meta Conversions API (CAPI), custom Looker Studio dashboards, and commercial attribution.',
    fullDescription: 'You cannot optimize what you do not accurately measure. With browser privacy restrictions and ad blockers, standard client-side tracking loses up to 30% of conversion data. DEZO builds robust server-side measurement architectures. We configure GA4 custom events, build clean UTM tracking frameworks, and assemble automated Looker Studio executive dashboards.',
    targetIndustries: ['Corporate', 'eCommerce & D2C Brands', 'Real Estate', 'Healthcare', 'Startups'],
    deliverables: [
      'Comprehensive Google Analytics 4 (GA4) property configuration and custom event setup',
      'Google Tag Manager (GTM) data layer deployment for web and eCommerce transactions',
      'Meta Conversions API (CAPI) server-side event tracking verification',
      'Unified UTM campaign tracking naming convention and documentation',
      'Custom real-time Looker Studio executive dashboard for marketing ROI overview',
      'Audit of existing tracking scripts to eliminate redundant tags and speed up site load',
    ],
    process: [
      { step: '01. Measurement Plan', description: 'Identify key commercial events: Form submits, phone clicks, purchases, downloads.' },
      { step: '02. Tag Deployment', description: 'Configure triggers, variables, and data layer pushes via GTM.' },
      { step: '03. Server-Side Sync', description: 'Deploy server-side event dispatching for high-reliability conversion data.' },
      { step: '04. Dashboard Build', description: 'Assemble visual Looker Studio reports aggregating ad spend, traffic, and sales.' },
    ],
    relevantTools: ['Google Analytics 4', 'Google Tag Manager', 'Looker Studio', 'Meta CAPI', 'BigQuery'],
    relatedServiceSlugs: ['paid-ads', 'web-development', 'growth-systems'],
    faqs: [
      {
        q: 'Why does my Google Ads conversion data differ from my Shopify orders?',
        a: 'Discrepancies arise from attribution windows, ad-blockers, cookie consent rejections, and timezone differences. We implement server-side tracking to minimize this discrepancy and provide true order reconciliation.',
      },
    ],
    seoTitle: 'Google Analytics 4 & Conversion Tracking Services | DEZO',
    seoDescription: 'Fix your measurement foundations with GA4, Google Tag Manager, and Meta CAPI server-side tracking by DEZO.',
    popular: false,
    featured: false,
    tier: 'GROW',
  },

  // --- DEPARTMENT J: Reputation, PR & Influencer Marketing ---
  {
    id: 'srv-reputation',
    slug: 'reputation-management',
    departmentCode: 'J',
    departmentName: 'Reputation, PR & Influencer Marketing',
    name: 'Online Reputation Management & Review Systems',
    tagline: 'Systematize customer reviews, protect brand reputation, and build regional authority',
    shortDescription: 'Ethical Google Review generation systems, negative review mitigation strategies, digital PR distribution, and genuine customer feedback loops.',
    fullDescription: 'Before buying or booking, Indian consumers check Google reviews and social comments. A single string of unresolved complaints can cripple your conversion rates. DEZO builds proactive reputation systems. We deploy frictionless QR-code and WhatsApp review collection flows for satisfied clients, craft professional response templates, and distribute press releases.',
    targetIndustries: ['Hospitals, Clinics & Healthcare', 'Hotels, Restaurants & Tourism', 'Schools & Coaching', 'Local Businesses'],
    deliverables: [
      'Automated review generation workflows via WhatsApp and post-service SMS',
      'Physical in-store and desk QR code cards linked directly to 5-star review forms',
      'Professional response protocols and crisis communication guidelines',
      'Brand mention and sentiment monitoring across Google, social media, and forums',
      'Digital PR press release distribution to reputable regional and national media outlets',
    ],
    process: [
      { step: '01. Sentiment Audit', description: 'Review existing ratings, recurring complaints, and unaddressed negative feedback.' },
      { step: '02. Review Trigger Setup', description: 'Integrate review requests immediately following positive service delivery moments.' },
      { step: '03. Response Management', description: 'Establish clear, empathetic response guidelines that de-escalate unhappy clients.' },
      { step: '04. PR Amplification', description: 'Pitch notable company milestones and expansions to verified regional news portals.' },
    ],
    relevantTools: ['Google Business Profile', 'Mention', 'PR Distribution Networks'],
    relatedServiceSlugs: ['local-seo', 'social', 'branding'],
    faqs: [
      {
        q: 'Do you post fake positive reviews?',
        a: 'Never. Posting fabricated reviews is illegal under consumer protection laws and strictly prohibited by Google policies. We build automated, ethical systems that make it effortless for your real, satisfied customers to leave genuine 5-star reviews.',
      },
    ],
    seoTitle: 'Online Reputation Management & Review Growth in Odisha | DEZO',
    seoDescription: 'Build trust with ethical Google Review generation and professional online reputation management by DEZO.',
    popular: false,
    featured: false,
    tier: 'GROW',
  },

  // --- DEPARTMENT K: AI-Powered Marketing & Automation ---
  {
    id: 'srv-ai-marketing',
    slug: 'ai-marketing-automation',
    departmentCode: 'K',
    departmentName: 'AI-Powered Marketing & Automation',
    name: 'AI Marketing & Business Workflow Automation',
    tagline: 'Custom AI qualification assistants, automated marketing pipelines, and internal tools',
    shortDescription: 'Deploy modular, safe AI tools: 24/7 lead qualification assistants, automated marketing report generators, smart content workflows, and n8n pipelines.',
    fullDescription: 'Cut hours of manual administrative work by augmenting your team with custom AI automation. DEZO builds secure, modular AI systems that integrate directly into your business stack. From instant website inquiry triage to automated competitor price checks and daily performance briefings, we help ambitious businesses operate with modern efficiency.',
    targetIndustries: ['Startups & SaaS', 'Corporate', 'Real Estate', 'eCommerce', 'Professional Services'],
    deliverables: [
      'Tailored AI lead triage assistant integrated with website forms or WhatsApp',
      'Automated marketing reporting pipeline that compiles daily stats into Slack or email',
      'Structured content drafting workflows trained on your unique brand voice',
      'No-code / low-code business integrations using n8n, Make, or custom Node.js webhooks',
      'Strict security guardrails ensuring your private company data is never leaked to public models',
    ],
    process: [
      { step: '01. Bottleneck Audit', description: 'Identify repetitive manual tasks that drain your team’s weekly hours.' },
      { step: '02. Solution Architecture', description: 'Select modular AI models and design deterministic fallback logic.' },
      { step: '03. Integration & Testing', description: 'Deploy within your secure private infrastructure with strict validation.' },
      { step: '04. Staff Enablement', description: 'Train internal team members with simple prompts and standard operating procedures.' },
    ],
    relevantTools: ['Claude API', 'OpenAI API', 'n8n', 'Make', 'TypeScript', 'Node.js'],
    relatedServiceSlugs: ['whatsapp-crm-automation', 'growth-systems', 'lead-generation'],
    faqs: [
      {
        q: 'Will AI replace our sales or marketing staff?',
        a: 'No. AI handles repetitive low-level tasks—like initial greeting, answering FAQs, and pulling reports—freeing your human team to focus on high-touch sales consultations and strategic decisions.',
      },
    ],
    seoTitle: 'AI Marketing & Workflow Automation Agency | DEZO',
    seoDescription: 'Empower your business with custom AI lead triage, workflow automation, and smart internal tools by DEZO.',
    popular: false,
    featured: false,
    tier: 'CUSTOM',
  },

  // --- DEPARTMENT L: Specialized & App Marketing ---
  {
    id: 'srv-growth-systems',
    slug: 'growth-systems',
    departmentCode: 'L',
    departmentName: 'Specialized Growth Systems',
    name: 'Growth Operating Systems & Strategic Retainers',
    tagline: 'Full-stack cross-channel coordination, DEZO LAB diagnostics, and monthly operating cadence',
    shortDescription: 'Unified digital management: continuous technical sprints, multi-channel marketing synchronization, weekly KPIs, and dedicated strategic leadership.',
    fullDescription: 'Businesses often suffer from fragmented vendor silos: one agency builds the site, another handles ads, a freelancer manages SEO, and none talk to each other. DEZO operates as your single accountable digital growth partner. We coordinate web engineering, marketplace growth, SEO, paid ads, and brand creative under one synchronized operating cadence.',
    targetIndustries: ['Corporate', 'eCommerce & D2C Brands', 'Manufacturing', 'Startups & Scaleups'],
    deliverables: [
      'Dedicated digital growth operating cadence with bi-weekly sprint reviews',
      'Cross-channel strategy alignment across Web, Marketplaces, Paid Media, and SEO',
      'Quarterly digital capability roadmap with clear milestone deliverables',
      'Access to advanced DEZO LAB diagnostic audits and performance benchmarking',
      'Priority development queue for technical bug fixes, new features, and CRO tests',
      'Single consolidated monthly invoice and dedicated strategic leadership access',
    ],
    process: [
      { step: '01. Diagnostic Sprint', description: 'Full-stack audit of web infrastructure, tracking, ad accounts, and SEO health.' },
      { step: '02. Master Growth Plan', description: 'Formulate 90-day execution roadmap prioritizing high-impact quick wins.' },
      { step: '03. Synchronized Sprints', description: 'Bi-weekly sprints alternating between engineering upgrades and marketing campaigns.' },
      { step: '04. Continuous Review', description: 'Measure overall business revenue impact, refine targets, and scale winners.' },
    ],
    relevantTools: ['DEZO LAB Engine', 'Jira / Linear', 'Looker Studio', 'Slack Connect'],
    relatedServiceSlugs: ['web-development', 'seo', 'paid-ads', 'amazon'],
    faqs: [
      {
        q: 'What is the minimum commitment for a Growth Systems retainer?',
        a: 'We work on 3-month initial commitment periods. True digital growth requires foundational setup in month 1, iterative testing in month 2, and disciplined scaling in month 3.',
      },
    ],
    seoTitle: 'Digital Growth Retainers & Fractional CMO in Odisha | DEZO',
    seoDescription: 'One accountable partner for web, marketplaces, SEO, ads, and brand. Strategic growth retainers by DEZO.',
    popular: true,
    featured: true,
    tier: 'SCALE',
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  if (slug === 'performance-marketing') {
    return MASTER_SERVICES_CATALOG.find((s) => s.slug === 'paid-ads') || MASTER_SERVICES_CATALOG.find((s) => s.slug === slug);
  }
  if (slug === 'brand-creative') {
    return MASTER_SERVICES_CATALOG.find((s) => s.slug === 'branding') || MASTER_SERVICES_CATALOG.find((s) => s.slug === slug);
  }
  return MASTER_SERVICES_CATALOG.find((s) => s.slug === slug);
}

export function getServicesByDepartment(code: ServiceDepartmentCode): ServiceItem[] {
  return MASTER_SERVICES_CATALOG.filter((s) => s.departmentCode === code);
}

export function getAllServiceSlugs(): string[] {
  return [...MASTER_SERVICES_CATALOG.map((s) => s.slug), 'performance-marketing', 'brand-creative'];
}

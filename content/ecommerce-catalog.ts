/**
 * DEZO eCommerce & Marketplace Growth Catalog
 * Master data structures, industry matrices, channel comparisons, and metric models
 * Strictly complies with PRD guidelines: zero fabricated metrics, truthful scopes, transparent fees.
 */

export interface MarketplaceStage {
  number: string;
  name: string;
  summary: string;
  focus: string;
  keyActivities: string[];
  deliverables: string[];
  primaryMetrics: string[];
}

export const SALES_GROWTH_STAGES: MarketplaceStage[] = [
  {
    number: '01',
    name: 'Discover & Audit',
    summary: 'Comprehensive diagnostic of current marketplace listings, catalog health, account standing, and competitive baseline.',
    focus: 'Baseline Assessment & Gap Analysis',
    keyActivities: [
      'Audit existing product listings for title structure, attribute completion, and search terms',
      'Benchmark competitor pricing, variation structures, and review profiles using permitted public sources',
      'Examine account health metrics: Order Defect Rate (ODR), Late Dispatch Rate, and Cancellation Rates',
      'Assess eligibility for Amazon Brand Registry or Flipkart Brand Onboarding',
      'Compile historical advertising reports where authorized account access is provided',
    ],
    deliverables: [
      'Comprehensive Marketplace Readiness Audit Report',
      'Listing & Catalog Quality Issue Register',
      'Competitor Price & Presentation Benchmark',
      'Historical Ad Spend & ACoS Baseline Review',
      'Priority Action Matrix ranked by expected commercial impact',
    ],
    primaryMetrics: ['Listing Quality Score', 'Suppressed ASIN count', 'Historical ACoS/ROAS', 'Account Health Rating'],
  },
  {
    number: '02',
    name: 'Prepare the Products',
    summary: 'Refining product data, compliance attributes, high-resolution visual briefs, and catalog structure before traffic scale.',
    focus: 'Catalog Foundation & Asset Preparation',
    keyActivities: [
      'Conduct rigorous buyer search-term research across marketplace-specific indexing tools',
      'Draft keyword-indexed product titles, 5 benefit-driven bullet points, and compliant descriptions',
      'Formulate creative briefs for white-background main images and infographic secondary angles',
      'Organize parent-child variation themes (size, color, pack quantity) for catalog clarity',
      'Verify mandatory legal attributes: manufacturer details, net quantity, expiry/batch data where applicable',
    ],
    deliverables: [
      'Master Product Copy & Keyword Mapping Sheets',
      'Listing Image & Infographic Specification Briefs',
      'Variation Structure & Category Mapping Schema',
      'Mandatory Regulatory & Legal Attribute Checklist',
      'Product Prioritization Matrix (Hero SKUs vs. Long Tail)',
    ],
    primaryMetrics: ['Search Indexation Readiness', 'Attribute Completion %', 'Image Compliance Ratio'],
  },
  {
    number: '03',
    name: 'Improve Discovery',
    summary: 'Deploying optimized search listings, backend search terms, category navigation, and disciplined sponsored ad campaigns.',
    focus: 'Organic Search Rank & Paid Marketplace Reach',
    keyActivities: [
      'Upload and index revised listing titles, bullet points, and backend search terms (250 bytes limit on Amazon)',
      'Structure sponsored advertising campaigns (Auto, Exact, Phrase, and Product Targeting)',
      'Set up Flipkart Product Listing Ads (PLA) targeting relevant buyer queries and categories',
      'Implement negative keyword harvesting routines to prevent wasted ad spend on irrelevant terms',
      'Monitor search indexation and organic rank trajectory for primary target keywords',
    ],
    deliverables: [
      'Active Optimized Listings Live on Seller Central / Seller Hub',
      'Segmented Ad Campaign Architecture (Discovery vs. Defense vs. Competitor)',
      'Target Keyword Bidding Matrix with discipline target ACoS caps',
      'Weekly Negative Search-Term Harvest Report',
      'Search Visibility & Keyword Position Tracking Log',
    ],
    primaryMetrics: ['Search Impressions', 'Click-Through Rate (CTR)', 'Average Cost Per Click (CPC)', 'Organic Keyword Rank'],
  },
  {
    number: '04',
    name: 'Improve Conversion',
    summary: 'Elevating product page persuasion through rich visual assets, clear dimensions, authentic reviews, and pricing clarity.',
    focus: 'Listing Conversion Rate (Unit Session %)',
    keyActivities: [
      'Design and deploy rich A+ (Enhanced Brand Content) modules and comparison charts for eligible brand accounts',
      'Craft multi-page Amazon Brand Stores with category navigation and curated product showcases',
      'Produce infographics highlighting dimensions, materials, certifications, and real-world scale',
      'Audit customer questions (Q&A) to proactively address buyer hesitations in listing copy',
      'Calibrate deal eligibility, coupons, and promotional discounts to incentivize first-time buyers',
    ],
    deliverables: [
      'Custom A+ Content Modules (Submitted & Approved)',
      'Multi-Page Brand Store Live on Amazon',
      'Infographic Visual Assets (Dimensions, Features, How-to-Use)',
      'Customer Q&A Proactive Content Update',
      'Promotional Discount & Coupon Setup Schedule',
    ],
    primaryMetrics: ['Unit Session Percentage (Conversion Rate)', 'Add-to-Cart Rate', 'Bounce Rate', 'A+ Content Engagement'],
  },
  {
    number: '05',
    name: 'Improve Profitable Sales',
    summary: 'Evaluating real commercial profitability beyond vanity revenue: controlling TACoS, marketplace fees, returns, and net margin.',
    focus: 'Unit Economics & Net Contribution Margin',
    keyActivities: [
      'Calculate true product-level contribution margins: Selling Price minus COGS, Referral Fees, Closing Fees, Shipping, and Ads',
      'Monitor and control Total Advertising Cost of Sales (TACoS) to protect overall gross margin',
      'Analyze return and cancellation root causes (defective items, size mismatch, damaged transit packaging)',
      'Advise on FBA (Fulfillment by Amazon) vs. Easy Ship vs. Self-Ship unit economics based on weight tiers',
      'Prune unprofitable ad targets and low-margin SKUs draining marketing capital',
    ],
    deliverables: [
      'Product-Level Unit Economics & Net Margin Matrix',
      'TACoS & Blended Ad Efficiency Trend Analysis',
      'Return & Cancellation Diagnostic Report with corrective actions',
      'Fulfillment Fee & Weight Slab Optimization Audit',
      'Margin-Accretive SKU Scaling Recommendations',
    ],
    primaryMetrics: ['TACoS (Total ACoS)', 'Net Contribution Margin %', 'Return Rate (RTO %)', 'Blended ROAS'],
  },
  {
    number: '06',
    name: 'Report & Scale',
    summary: 'Structured weekly and monthly operating cadence, inventory replenishment forecasting, and disciplined expansion to new channels.',
    focus: 'Predictable Growth Cadence & Channel Expansion',
    keyActivities: [
      'Conduct bi-weekly review meetings covering sales trajectory, ad spend efficiency, and inventory health',
      'Forecast stock replenishment milestones to prevent costly out-of-stock search ranking penalties',
      'Prepare event-specific playbooks for major sale festivals (Amazon Prime Day, Great Indian Festival, Flipkart Big Billion Days)',
      'Identify cross-channel expansion opportunities: bridging marketplace winners to an independent D2C Shopify store',
      'Iterate ad campaign targeting and creative assets based on empirical conversion data',
    ],
    deliverables: [
      'Consolidated Monthly Marketplace Performance Dashboard',
      'Inventory Stock-Out Early Warning & Replenishment Plan',
      'Festival Sale Strategy & Promotional Calendar',
      'Quarterly Cross-Channel Expansion Blueprint',
      'Action Item & Experiment Log for Next Sprint',
    ],
    primaryMetrics: ['Month-over-Month Revenue Growth', 'Inventory Turn Ratio', 'Stock-Out Days', 'Customer Repeat Rate'],
  },
];

export interface IndustryMarketplaceSolution {
  id: string;
  industry: string;
  tagline: string;
  odishaRelevance: string;
  keyChallenges: string[];
  marketplaceStrategy: string;
  creativeRequirements: string[];
  complianceNotes: string[];
}

export const INDUSTRY_MARKETPLACE_SOLUTIONS: IndustryMarketplaceSolution[] = [
  {
    id: 'handloom-textiles',
    industry: 'Handloom, Sarees & Ethnic Textiles',
    tagline: 'Preserving authentic artisanal heritage while scaling high-ticket pan-India marketplace orders.',
    odishaRelevance: 'Directly powers Sambalpuri ikat, Bomkai, Kotpad, and Berhampuri silk weavers and textile aggregators in Odisha.',
    keyChallenges: [
      'High rate of color and weave mismatch complaints from mobile screen differences',
      'Competitor copycats selling machine-printed polyester under authentic handloom titles',
      'High return rates in fashion categories if drape, fabric feel, and sizing are ambiguous',
    ],
    marketplaceStrategy:
      'Position authentic handloom with Geographical Indication (GI) provenance storytelling. Use structured variation matrices by color and border motif. Emphasize silk mark certifications, pure cotton thread counts, and genuine artisan craftsmanship in A+ content.',
    creativeRequirements: [
      'High-CRI daylight photography capturing true weave texture and natural luster',
      'Pallu, border, and blouse-piece close-up detail macro shots',
      'Drape video showing fabric fall, flow, and pleating behavior',
      'Infographic explaining genuine handloom irregularities vs. machine flaws',
    ],
    complianceNotes: ['Handloom mark / Silk mark labeling adherence', 'Fiber composition disclosure (100% Cotton / Mulberry Silk)', 'Care instruction labeling'],
  },
  {
    id: 'beauty-personal-care',
    industry: 'Beauty, Skincare & Personal Care',
    tagline: 'High-margin repeat replenishment driven by trust, ingredient transparency, and visual proof.',
    odishaRelevance: 'Ideal for herbal cosmetics, Ayurvedic formulations, cold-pressed oils, and artisanal soaps manufactured in Odisha.',
    keyChallenges: [
      'High Customer Acquisition Cost (CAC) and intense competition from venture-funded D2C brands',
      'Stringent marketplace cosmetic compliance rules and ingredient disclosure mandates',
      'Fake review flooding by competitors requiring continuous review monitoring',
    ],
    marketplaceStrategy:
      'Highlight active ingredients (Kumkumadi, Neem, Sandalwood, Bakuchiol) in listing titles and primary infographics. Use Sponsored Products for high-intent search terms like "chemical free face oil" and Sponsored Brands video demonstrating texture and application.',
    creativeRequirements: [
      'Texture swatch macro photography showing serum/cream consistency',
      'Before/after routine infographics illustrating morning/night usage steps',
      'Clean ingredient transparency cards (Paraben-free, Cruelty-free, GMP-certified)',
      'Unboxing and tamper-evident seal imagery reassuring buyers of hygiene',
    ],
    complianceNotes: ['State Drug Controller / Cosmetic Manufacturing License', 'Complete ingredients list in descending order of weight', 'Batch number, Mfg date, and Expiry clearly visible'],
  },
  {
    id: 'packaged-foods-spices',
    industry: 'Packaged Foods, Spices & Groceries',
    tagline: 'Scaling regional culinary flavors into recurring national household staples.',
    odishaRelevance: 'Empowers Odisha food brands: Kachi Ghani mustard oils, Koraput coffee, Badi, Chenna sweets, and turmeric processors.',
    keyChallenges: [
      'Fragile transit packaging leading to leaks, container damage, and negative seller ratings',
      'Strict FSSAI regulatory compliance, shelf-life restrictions, and expiry management',
      'Low unit price points requiring multi-pack and bundle strategies to absorb shipping costs',
    ],
    marketplaceStrategy:
      'Formulate multi-packs (Pack of 2, 3, or family combo packs) to increase Average Order Value (AOV) and absorb FBA weight fees. Optimize for Amazon Fresh, Pantry, and standard marketplace search. Implement airtight tamper-evident packaging briefs.',
    creativeRequirements: [
      'Clear nutritional table and 100% vegetarian / non-vegetarian green/red dot labeling',
      'Serving suggestion and recipe inspiration infographics',
      'Airtight packaging and zip-lock seal demonstration visuals',
      'FSSAI license number and batch traceability graphic',
    ],
    complianceNotes: ['Valid 14-digit FSSAI Central/State license on all images and copy', 'Mandatory Net Weight, Expiry, and Allergen disclosures', 'Minimum 60-day remaining shelf life upon marketplace warehouse receipt'],
  },
  {
    id: 'handicrafts-stone-brass',
    industry: 'Handicrafts, Brass, Stone & Terracotta Art',
    tagline: 'Connecting timeless traditional craftsmanship to affluent home decor buyers.',
    odishaRelevance: 'Tailored for Dhokra brass casting, Pattachitra paintings, Pipili appliqué, and stone sculpture artisans of Odisha.',
    keyChallenges: [
      'High risk of transit breakage for fragile terracotta and stone sculptures',
      'Uncertainty about scale and real-world dimensions in buyer rooms',
      'High shipping weight slabs eroding margins on heavy brass and granite items',
    ],
    marketplaceStrategy:
      'Focus on high-ticket, gift-ready decorative collections. Use room-setting lifestyle images showing the artifact on a coffee table, console, or prayer altar alongside standard reference objects. Offer customized gift packaging options.',
    creativeRequirements: [
      'Room-scale contextual photography showing real-world size relative to a sofa or lamp',
      'Dimension infographic with exact height, width, depth, and weight in kg',
      'Artisan craft process storytelling (lost-wax casting, natural stone carving)',
      'Multi-layer thermocol and wooden crate protective packaging assurance visuals',
    ],
    complianceNotes: ['Country of Origin declaration mandatory', 'Fragile item warning labels', 'Accurate product weight declaration to prevent marketplace weight disputes'],
  },
  {
    id: 'fashion-apparel',
    industry: 'Fashion, Apparel & Footwear',
    tagline: 'Minimizing return friction and maximizing conversion through precise sizing and styling.',
    odishaRelevance: 'Supports ready-to-wear ethnic wear brands, kidswear, uniforms, and western apparel manufacturers.',
    keyChallenges: [
      'Return to Origin (RTO) rates reaching 25-35% due to sizing and fit issues',
      'Rapid catalog obsolescence requiring frequent seasonal inventory rotation',
      'Heavy discounting pressure from large marketplace private labels',
    ],
    marketplaceStrategy:
      'Design custom branded size charts with Indian body measurements (Chest, Waist, Inseam in inches and cm). Build robust variation families so all sizes and colors share one review repository. Run Flipkart Smart ROI and Amazon Sponsored Products on high-intent occasion keywords.',
    creativeRequirements: [
      'Front, side, and back model photography on neutral editorial backgrounds',
      'Model height and size worn disclosure (e.g., "Model is 5\'8\\" wearing Size M")',
      'Detailed fabric composition and stretch/fit indicator graphic (Regular vs. Slim fit)',
      'Wash and care instruction icons',
    ],
    complianceNotes: ['Standardized Indian sizing standards', 'GST invoice tax classification (5% vs 12% apparel slabs)', 'Accurate fabric material composition'],
  },
  {
    id: 'electronics-appliances',
    industry: 'Consumer Electronics & Home Appliances',
    tagline: 'Building buyer confidence through technical specs, warranty clarity, and compatibility guides.',
    odishaRelevance: 'Supports regional electronics distributors, LED lighting manufacturers, battery assemblers, and appliance brands.',
    keyChallenges: [
      'High customer scrutiny regarding technical specifications and counterfeit risks',
      'Customer returns driven by user operation errors or compatibility misunderstandings',
      'Aggressive price scraping and Buy Box competition among multiple sellers',
    ],
    marketplaceStrategy:
      'Build comprehensive compatibility tables directly in A+ content. Highlight manufacturer warranty, BIS certification, and Indian pin-plug standards. Implement automated order messaging with digital setup manuals to prevent user-error returns.',
    creativeRequirements: [
      'Exploded-view diagram highlighting internal components, chips, and copper windings',
      'Port and connectivity pinout infographic with labelled inputs/outputs',
      'Device compatibility matrix (iOS, Android, Windows, voltage range)',
      'Warranty card and customer care support telephone verification graphic',
    ],
    complianceNotes: ['Mandatory BIS (Bureau of Indian Standards) registration number', 'E-Waste management compliance declaration', 'Energy efficiency star ratings for eligible electrical appliances'],
  },
  {
    id: 'ayurveda-wellness',
    industry: 'Ayurveda, Herbal & Wellness Products',
    tagline: 'Evidence-informed holistic wellness marketed with strict regulatory compliance.',
    odishaRelevance: 'Designed for Odisha herbal extractors, Chyawanprash makers, Triphala processors, and natural supplement brands.',
    keyChallenges: [
      'Marketplace policy bans on unsubstantiated medical and curative health claims',
      'High skepticism among urban consumers regarding purity and heavy metal contamination',
      'Strict Amazon & Flipkart restricted-products policies requiring upfront documentation',
    ],
    marketplaceStrategy:
      'Focus on classical Ayurvedic benefits and traditional wellness support without claiming disease cures. Upload third-party lab test certifications for heavy metals and purity in A+ content. Run Sponsored Brands search ads around generic wellness themes.',
    creativeRequirements: [
      'Herbal ingredient illustration showcasing pure origin (Amla, Ashwagandha, Giloy)',
      'Standardized dosage and consumption timing visual guide (e.g., "Take 1 spoon with warm milk")',
      'Third-party NABL lab-tested purity stamp and GMP facility visual',
      'Ministry of AYUSH license display',
    ],
    complianceNotes: ['Valid AYUSH manufacturing license', 'Prohibited from claiming cures for scheduled diseases under Drugs and Magic Remedies Act', 'Strict expiry and allergen disclosures'],
  },
  {
    id: 'b2b-wholesale-manufacturing',
    industry: 'B2B, Industrial & Wholesale Manufacturing',
    tagline: 'Capturing bulk commercial procurement orders through Amazon Business and digital catalogs.',
    odishaRelevance: 'Empowers Odisha plastic molders, metal fabricators, packaging suppliers, and commercial safety gear makers.',
    keyChallenges: [
      'Marketplace interfaces traditionally optimized for single-unit consumer orders',
      'Clients expecting GST input tax credit invoices with proper business GSTIN',
      'Complex shipping logistics for pallet-sized or heavy industrial consignments',
    ],
    marketplaceStrategy:
      'Enroll in Amazon Business Seller Program with automated GST invoicing and tiered quantity discounts (5% off on 10+ units, 10% off on 50+ units). Build multi-pack and carton-level SKUs to serve wholesale buyers across India.',
    creativeRequirements: [
      'Bulk carton packaging and pallet dimension infographics',
      'Technical load-bearing, tensile strength, and industrial test specification sheets',
      'GST invoice availability badge highlighting input tax credit savings for businesses',
      'Commercial application photos in warehouses, factories, and construction sites',
    ],
    complianceNotes: ['Automated B2B GST tax invoicing enablement', 'Commercial HSN code alignment', 'Industrial safety standards (ISI / CE where applicable)'],
  },
];

export interface ChannelComparisonItem {
  channel: string;
  badge: string;
  tagline: string;
  bestFor: string;
  customerDataOwnership: string;
  marketplaceFees: string;
  organicBuyerDemand: string;
  brandStorytellingControl: string;
  returnAndCODControl: string;
  typicalTimelineToLaunch: string;
  dezoRole: string;
}

export const CHANNEL_COMPARISON_MATRIX: ChannelComparisonItem[] = [
  {
    channel: 'Independent D2C Store (Shopify / Next.js)',
    badge: 'Own Your Brand & Data',
    tagline: 'Your private digital flagship store where you set the rules and retain 100% of customer relationships.',
    bestFor: 'Established brands, high-margin products, unique custom creations, and businesses building long-term enterprise value.',
    customerDataOwnership: '100% Full Ownership. You collect verified phone numbers, emails, and purchase histories for WhatsApp/Email retargeting.',
    marketplaceFees: '0% Referral Fees. You pay only standard payment gateway charges (approx. 1.95% + GST for Razorpay/Cashfree).',
    organicBuyerDemand: 'None initially. Requires proactive traffic acquisition through Google SEO, Meta Ads, and social media.',
    brandStorytellingControl: 'Absolute Freedom. Custom layout, video heroes, interactive quizzes, custom fonts, and zero competitor ads on your pages.',
    returnAndCODControl: 'High Control. Enable OTP verification for COD, offer instant prepayment discounts, and configure custom return policies.',
    typicalTimelineToLaunch: '2 to 4 weeks for complete design, payment gateway integration, shipping sync, and testing.',
    dezoRole: 'Full design, Next.js or Shopify engineering, payment/shipping setup, SEO optimization, and Meta/Google ad management.',
  },
  {
    channel: 'Amazon India',
    badge: 'Massive High-Intent Reach',
    tagline: 'India’s most trusted retail search engine where millions of primed buyers search daily with credit cards ready.',
    bestFor: 'Packaged goods, branded consumer products, electronics, beauty, home essentials, and gift items with nationwide appeal.',
    customerDataOwnership: 'Platform Controlled. Amazon masks buyer phone and email. You cannot directly retarget them outside Amazon.',
    marketplaceFees: 'Referral fee (5%–18% depending on category) + Closing fee + Fulfillment fees (FBA or Easy Ship).',
    organicBuyerDemand: 'Extremely High. Millions of active monthly shoppers actively typing product queries into the search bar.',
    brandStorytellingControl: 'Moderate to High. Requires Brand Registry to unlock A+ Content, Brand Stores, and video modules within Amazon’s grid.',
    returnAndCODControl: 'Platform Dictated. Amazon enforces customer-friendly return windows. Strict packaging and dispatch metrics required.',
    typicalTimelineToLaunch: '1 to 2 weeks for seller registration, brand registry, listing upload, and initial FBA/Easy Ship inventory sync.',
    dezoRole: 'Listing SEO, A+ content design, Brand Store architecture, Sponsored Ads (PPC) management, and catalog health maintenance.',
  },
  {
    channel: 'Flipkart',
    badge: 'Tier 2 & 3 Powerhouse',
    tagline: 'The dominant marketplace reaching deeply into Bharat, non-metro towns, value-conscious shoppers, and festive events.',
    bestFor: 'Fashion, sarees, ethnic textiles, footwear, budget electronics, home appliances, and value-focused consumer staples.',
    customerDataOwnership: 'Platform Controlled. Flipkart manages buyer communications and retention programs directly.',
    marketplaceFees: 'Commission fee by category + Collection fee + Fixed fee + Shipping fee depending on regional vs. national zones.',
    organicBuyerDemand: 'Massive Footfall. Immense surge during Big Billion Days and festive sale campaigns across Tier 2 and Tier 3 cities.',
    brandStorytellingControl: 'Structured. Clean, templated listing pages scored strictly by Flipkart Listing Quality Score (LQS).',
    returnAndCODControl: 'Flipkart Managed. Higher COD propensity in Tier 2/3 requiring diligent packaging and rapid dispatch compliance.',
    typicalTimelineToLaunch: '1 to 2 weeks for Seller Hub onboarding, category approval, bulk excel catalog upload, and PLA ad activation.',
    dezoRole: 'Catalog creation, Listing Quality Score (LQS) maximization, Flipkart PLA ad campaigns, and festival promotion planning.',
  },
  {
    channel: 'Integrated Omnichannel (All 3 Channels)',
    badge: 'The Complete Growth Engine',
    tagline: 'Synchronizing your independent storefront, Amazon, and Flipkart into one mutually reinforcing sales machine.',
    bestFor: 'Ambitious manufacturers, D2C brands, and retail aggregators seeking maximum revenue and market dominance.',
    customerDataOwnership: 'Balanced. Capture high-LTV direct customers on your site while harvesting marketplace demand for scale.',
    marketplaceFees: 'Diversified. Blended margin structure where marketplace fees are balanced by higher-margin direct website sales.',
    organicBuyerDemand: 'Omnipresent. Customers who discover you on Amazon often search your brand on Google and buy on your site.',
    brandStorytellingControl: 'Cohesive. United brand narrative across Amazon Brand Store, Flipkart catalog, and independent flagship website.',
    returnAndCODControl: 'Optimized. Clear inventory sync prevents stockouts across platforms while diversifying channel risk.',
    typicalTimelineToLaunch: '4 to 6 weeks phased rollout: Store build + Amazon launch + Flipkart catalog scaling.',
    dezoRole: 'Single accountable growth partner: Web engineering, multi-channel catalog syncing, unified ad spend, and monthly reporting.',
  },
];

export interface MarketplaceEngagementTier {
  id: string;
  name: string;
  tagline: string;
  model: 'ONE-TIME PROJECT' | 'MONTHLY RETAINER' | 'HYBRID';
  bestFor: string;
  deliverables: string[];
  prerequisites: string[];
  timeline: string;
}

export const MARKETPLACE_ENGAGEMENT_TIERS: MarketplaceEngagementTier[] = [
  {
    id: 'tier-audit',
    name: 'Marketplace Growth Diagnostic & Listing Audit',
    tagline: 'Deep-dive forensic audit of your Amazon or Flipkart catalog, search suppression, ad waste, and unit economics.',
    model: 'ONE-TIME PROJECT',
    bestFor: 'Existing sellers experiencing declining sales, high ACoS, suppressed listings, or plateaued marketplace revenue.',
    deliverables: [
      'Comprehensive audit of up to 25 primary ASINs/listings',
      'Keyword indexing gap analysis vs. top 3 category competitors',
      'Listing Quality Score (LQS) and attribute completeness check',
      'Historical advertising audit identifying bleeding and negative keywords',
      'Actionable prioritized remediation roadmap with exact fixes',
    ],
    prerequisites: ['Child account / User permissions access to Seller Central or Seller Hub reports'],
    timeline: '5 to 7 business days from report access',
  },
  {
    id: 'tier-onboarding',
    name: 'Seller Launch & Catalog Onboarding',
    tagline: 'Turnkey onboarding to get your brand registered, catalog formatted, and products successfully live and buyable.',
    model: 'ONE-TIME PROJECT',
    bestFor: 'New manufacturers, brand owners, and wholesalers launching on Amazon or Flipkart for the first time.',
    deliverables: [
      'Seller Central / Seller Hub registration workflow guidance and documentation',
      'Category ungating and GTIN barcode exemption submission support',
      'Brand Registry enrollment submission assistance (with trademark documents)',
      'Catalog creation and bulk upload for up to 20 initial product SKUs',
      'Initial shipping and fulfillment profile configuration (Easy Ship, Self Ship, or FBA prep)',
    ],
    prerequisites: ['Valid GST certificate, active bank account, trademark application (for Brand Registry), authentic product images'],
    timeline: '2 to 3 weeks depending on platform approval speed',
  },
  {
    id: 'tier-listing-aplus',
    name: 'Listing Optimization & Premium A+ Content',
    tagline: 'Transform ordinary product pages into high-converting digital storefronts with rich visual storytelling.',
    model: 'ONE-TIME PROJECT',
    bestFor: 'Active sellers who have active listings but suffer from low conversion rates or poor visual presentation.',
    deliverables: [
      'Complete keyword rewrite of titles, 5 bullet points, and backend search terms',
      'Custom graphic design for 5 to 7 modular A+ (EBC) visual banners',
      'Comparison table design highlighting product lineup differences',
      'Multi-page Amazon Brand Store layout and navigation setup',
      'Full submission and rejection troubleshooting until final approval',
    ],
    prerequisites: ['Approved Brand Registry on Amazon, high-resolution raw product photos or CAD renders'],
    timeline: '10 to 14 business days',
  },
  {
    id: 'tier-monthly-management',
    name: 'Full-Service Marketplace Growth Retainer',
    tagline: 'Dedicated ongoing management of Amazon or Flipkart: Sponsored Ads, catalog health, pricing, and weekly ROI reporting.',
    model: 'MONTHLY RETAINER',
    bestFor: 'Growing brands wanting disciplined daily execution without hiring an expensive in-house marketplace department.',
    deliverables: [
      'Ongoing Amazon Sponsored Products / Brands / Display or Flipkart PLA ad management',
      'Daily bid optimization, negative keyword harvesting, and target ACoS control',
      'Listing health monitoring: resolving suppressed ASINs, stranded inventory, and error codes',
      'Promotional deal submissions (Lightning Deals, Coupons, Festival Sale Events)',
      'Bi-weekly performance review meetings and consolidated monthly contribution margin dashboard',
    ],
    prerequisites: ['Active seller account in good standing, dedicated monthly ad budget, client product inventory'],
    timeline: 'Ongoing monthly operating cadence (3-month initial commitment recommended)',
  },
  {
    id: 'tier-omnichannel-retainer',
    name: 'Integrated eCommerce & Marketplace Growth Retainer',
    tagline: 'Complete synchronization of your independent website, Amazon, Flipkart, and cross-channel performance marketing.',
    model: 'HYBRID',
    bestFor: 'Established brands scaling nationwide through both direct-to-consumer (D2C) and major marketplace channels.',
    deliverables: [
      'All deliverables from the Full-Service Marketplace Retainer (Amazon + Flipkart)',
      'Continuous maintenance, CRO enhancements, and technical speed optimization for Shopify / Next.js website',
      'Google Shopping Ads and Meta (FB/IG) product catalog campaign management',
      'Automated WhatsApp order confirmation and abandoned cart recovery workflow maintenance',
      'Consolidated omnichannel profitability reporting comparing channel-by-channel unit economics',
    ],
    prerequisites: ['Active website, seller accounts on Amazon/Flipkart, Google & Meta ad accounts, dedicated ad spend'],
    timeline: 'Quarterly strategic growth cadence',
  },
];

/**
 * Influencer Marketing & Creator Partnerships — content source of truth.
 * No invented counts, earnings, or guaranteed opportunity volumes.
 */

export const influencerPositioning = {
  division: 'Influencer Marketing & Creator Partnerships',
  heroTitle: 'Your Brand. The Right Creators. Campaigns Built to Grow.',
  heroBody:
    'DEZO connects ambitious brands with relevant influencers, UGC creators and digital marketing specialists to plan, execute and measure campaigns across India’s creator economy.',
  brandPromise:
    'End-to-end creator campaigns — discovery, negotiation, content delivery, tracking and reporting — without inventing reach or earnings.',
  creatorPromise:
    'Register once, list niches and collaboration types, then apply to eligible briefs as real client demand opens. Opportunity volume depends on budgets, niche and selection — not a guaranteed job count.',
  primaryBrandCta: { label: 'Launch a Campaign', href: '/campaigns/launch' },
  primaryCreatorCta: { label: 'Join as a Creator', href: '/creators/register' },
} as const;

export const collaborationTypes = [
  {
    id: 'paid',
    name: 'Paid collaboration',
    summary: 'Fixed payment for agreed deliverables, confirmed in writing.',
  },
  {
    id: 'barter',
    name: 'Barter collaboration',
    summary: 'Product or service exchange — terms disclosed; not labeled as paid.',
  },
  {
    id: 'free-product',
    name: 'Free product campaign',
    summary: 'Product supplied; cash payment is not implied unless stated.',
  },
  {
    id: 'affiliate',
    name: 'Affiliate / commission',
    summary: 'Earnings tied to tracked sales or referrals with clear attribution.',
  },
  {
    id: 'hybrid',
    name: 'Hybrid collaboration',
    summary: 'Base payment plus performance commission when budgets allow.',
  },
  {
    id: 'ugc',
    name: 'UGC-only assignment',
    summary: 'Content creation with or without creator posting rights.',
  },
  {
    id: 'ambassador',
    name: 'Brand ambassador',
    summary: 'Longer-term, repeat campaign arrangement with defined exclusivity.',
  },
  {
    id: 'event',
    name: 'Event / location campaign',
    summary: 'Appearances, launches and local promotions.',
  },
  {
    id: 'micro',
    name: 'Micro-influencer campaigns',
    summary: 'Smaller niche creators and local audiences.',
  },
  {
    id: 'macro',
    name: 'Large creator campaigns',
    summary: 'Macro influencers and celebrities — subject to budget and availability.',
  },
] as const;

export const influencerServices = [
  {
    slug: 'instagram',
    name: 'Instagram influencer campaigns',
    summary: 'Reels, Stories, posts and creator-led social proof for product and brand growth.',
  },
  {
    slug: 'youtube',
    name: 'YouTube integrations & sponsorships',
    summary: 'Dedicated videos, integrations, reviews, tutorials and Shorts.',
  },
  {
    slug: 'ugc',
    name: 'UGC content production',
    summary: 'Creator-made ads, unboxing, demos, testimonials and lifestyle creatives.',
  },
  {
    slug: 'regional',
    name: 'Regional & vernacular creators',
    summary: 'Hindi, Hinglish, Odia and city-level creators for local and language-led campaigns.',
  },
  {
    slug: 'specialist',
    name: 'Specialist & professional creators',
    summary: 'LinkedIn, podcasts, B2B, finance, tech, gaming, fitness and beauty niches.',
  },
  {
    slug: 'performance',
    name: 'Performance & affiliate campaigns',
    summary: 'Trackable links, codes, commission sales, seeding and ambassador programmes.',
  },
  {
    slug: 'strategy',
    name: 'Campaign strategy & management',
    summary: 'Briefing, shortlists, contracts, approvals, publication evidence and reporting.',
  },
  {
    slug: 'whitelisting',
    name: 'Whitelisted / paid amplification',
    summary: 'Creator-led ads where platform permissions allow — disclosed and rights-cleared.',
  },
] as const;

export const brandWorkflow = [
  { step: '01', title: 'Inquiry', body: 'Submit a campaign brief with objectives, budget and creator needs.' },
  { step: '02', title: 'Qualification', body: 'DEZO reviews fit, feasibility and brand-safety requirements.' },
  { step: '03', title: 'Proposal', body: 'Scoped plan: creator mix, deliverables, timeline and commercial model.' },
  { step: '04', title: 'Shortlist', body: 'Matched creators with transparent rates and collaboration types.' },
  { step: '05', title: 'Execution', body: 'Contracts, drafts, approvals, posting evidence and tracking.' },
  { step: '06', title: 'Reporting', body: 'Delivery report, learnings and recommended next campaigns.' },
] as const;

export const creatorWorkflow = [
  { step: '01', title: 'Registration', body: 'Profile, niches, languages, city, platforms and collaboration preferences.' },
  { step: '02', title: 'Verification', body: 'Ownership checks and engagement quality review — no fabricated metrics.' },
  { step: '03', title: 'Matching', body: 'Eligible briefs matched to niche, location, platform and budget.' },
  { step: '04', title: 'Applications', body: 'Apply to live campaigns; selection confirmed in writing.' },
  { step: '05', title: 'Delivery', body: 'Upload drafts, meet deadlines, collect approvals and posting proof.' },
  { step: '06', title: 'Payment tracking', body: 'Invoices and payment status when fixed fees or commissions apply.' },
] as const;

export const campaignTransparencyChecklist = [
  'Compensation type (paid, barter, free product, affiliate, hybrid)',
  'Guaranteed fixed payment, if any',
  'Commission formula and attribution window',
  'Product supplied, shipping and return terms',
  'Deliverable count, format and posting requirements',
  'Draft and publication deadlines',
  'Revision limits and usage rights duration',
  'Exclusivity, cancellation and dispute rules',
  'Required advertising disclosures (ASCI / platform)',
] as const;

export const influencerFaqs = [
  {
    q: 'Does DEZO guarantee influencers 10–15 paid jobs every month?',
    a: 'No. Building a pipeline of 10–15+ suitable opportunities over time is a network development target as client demand grows. Actual assignments depend on budgets, niche, location and selection. We guarantee transparent process and communication — not a fixed job count.',
  },
  {
    q: 'Do creators pay to register?',
    a: 'No mandatory registration fee to access opportunities.',
  },
  {
    q: 'Are barter campaigns shown as paid work?',
    a: 'Never. Barter and affiliate-only briefs are labeled clearly. Only campaigns with a stated fixed payment are called paid collaborations.',
  },
  {
    q: 'What does DEZO earn?',
    a: 'Campaign management fees, agreed commissions, creator sourcing packages, retainers, UGC production and related digital marketing services — disclosed in proposals.',
  },
  {
    q: 'Does influencer marketing replace DEZO’s other services?',
    a: 'No. Web, ecommerce, SEO, Meta/Google ads, Amazon, Flipkart and brand systems remain core. Influencer Marketing is an added division inside BUILD. MARKET. GROW.',
  },
] as const;

export const dualPaths = [
  {
    id: 'brand',
    eyebrow: 'For brands',
    title: 'Hire creators. Run campaigns. Get reports.',
    body: 'Find influencers, request proposals, launch promotions, buy UGC, run affiliates and receive delivery reports.',
    href: '/for-brands',
    cta: 'Explore for brands',
  },
  {
    id: 'creator',
    eyebrow: 'For creators',
    title: 'Register. Match. Deliver. Get paid.',
    body: 'List platforms and niches, choose collaboration types, apply to eligible campaigns and track assignments.',
    href: '/for-creators',
    cta: 'Explore for creators',
  },
] as const;

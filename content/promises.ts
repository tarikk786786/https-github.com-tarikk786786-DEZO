/**
 * DEZO Promise & Guarantee — content source of truth.
 * Distinguishes controllable execution guarantees from external outcome factors.
 */

export type PromiseItem = {
  id: string;
  number: string;
  title: string;
  statement: string;
  description: string;
  included?: string[];
  excludes?: string[];
  services?: string[];
  proof?: string;
  featured?: boolean;
  metricsByService?: Record<string, string[]>;
};

export const promiseHero = {
  badge: 'THE DEZO PROMISE',
  title: "We don't promise magic.",
  titleLine2: 'We promise execution.',
  supporting:
    'Anyone can promise growth. DEZO promises something harder: clear work, clear ownership, clear measurement and clear accountability.',
  pillars: [
    'Clear work.',
    'Clear ownership.',
    'Clear measurement.',
    'Clear accountability.',
  ],
  primaryCta: { label: 'Start a Project', href: '/start-a-project' },
  secondaryCta: { label: 'See How We Work', href: '/promise#dezo-standard' },
} as const;

export const promiseItems: PromiseItem[] = [
  {
    id: 'no-excuse-delivery',
    number: '01',
    title: 'No-Excuse Delivery',
    statement: 'What we commit to gets tracked.',
    description:
      'Every agreed deliverable is documented with scope, ownership, deadline and status. Clients should never have to guess what was promised or whether it was completed.',
    included: [
      'Defined deliverables',
      'Ownership',
      'Timelines',
      'Status tracking',
      'Completion visibility',
    ],
    excludes: [
      'Impossible deadlines not agreed in scope',
      'Open-ended “as soon as possible” commitments without dates',
    ],
    services: ['All engagements'],
    featured: true,
  },
  {
    id: 'full-transparency',
    number: '02',
    title: 'Full Transparency',
    statement: "You always know what we're doing.",
    description:
      'DEZO gives clients visibility into agreed work, campaign activity, website changes, SEO activity, marketplace work and reporting.',
    included: [
      'Work status',
      'Project activity',
      'Campaign activity',
      'Approvals',
      'Reports',
      'Next actions',
    ],
    services: ['All engagements'],
    featured: true,
  },
  {
    id: 'real-reporting',
    number: '03',
    title: 'Real Reporting',
    statement: 'We report business metrics—not vanity metrics.',
    description:
      'Reporting should help you make decisions. Depending on the engagement, DEZO tracks commercially relevant indicators such as leads, conversions, traffic, ROAS, CAC, CPC, CTR, marketplace performance and conversion rate.',
    included: [
      'Engagement-relevant KPI reporting',
      'Decision-oriented summaries',
      'Agreed reporting cadence',
    ],
    excludes: ['Vanity metrics presented as success without commercial context'],
    services: ['SEO', 'Paid Ads', 'Amazon', 'Flipkart', 'Ecommerce', 'Growth Systems'],
    metricsByService: {
      seo: ['Organic traffic', 'Indexed pages', 'Keyword visibility trends', 'Lead/form conversions'],
      'paid-ads': ['ROAS', 'CAC', 'CPC', 'CTR', 'Conversions', 'Cost per lead'],
      amazon: ['Sponsored ad efficiency', 'Listing health', 'Conversion rate', 'Buy Box signals'],
      flipkart: ['Catalog health', 'Promotion performance', 'Order metrics', 'Listing quality'],
      'web-development': ['Conversion rate', 'Form completions', 'Core UX issues', 'Launch readiness'],
      social: ['Reach quality', 'Engagement quality', 'Traffic to site', 'Lead actions'],
    },
    featured: true,
  },
  {
    id: 'tracking-first',
    number: '04',
    title: 'Tracking First',
    statement: "We don't scale what we cannot measure.",
    description:
      'Before meaningful optimization, the required measurement and attribution foundations are established wherever technically and commercially appropriate.',
    included: [
      'Analytics foundations',
      'Events & conversion tracking',
      'UTM strategy',
      'Pixels / tags where applicable',
      'Marketplace data visibility',
      'Dashboards as agreed',
    ],
    services: ['Paid Ads', 'SEO', 'Ecommerce', 'Amazon', 'Flipkart', 'Web Development'],
    featured: true,
  },
  {
    id: 'website-quality',
    number: '05',
    title: 'Website Quality',
    statement: 'Your website is built to work—not merely look good.',
    description:
      'Every website project passes a defined quality-assurance process covering the agreed functionality, responsive behavior and core user experience.',
    included: [
      'Mobile & desktop review',
      'Navigation',
      'Forms & links',
      'Core functionality',
      'Accessibility fundamentals',
      'SEO foundations',
      'Performance checks',
      'Browser testing',
    ],
    excludes: [
      'A specific Lighthouse score unless explicitly contracted',
      'Third-party plugin or hosting failures outside DEZO implementation',
    ],
    services: ['Web Development', 'Ecommerce', 'Landing pages'],
  },
  {
    id: 'implementation-accountability',
    number: '06',
    title: 'Implementation Accountability',
    statement: "If our implementation causes a covered defect, we fix it.",
    description:
      "Critical defects directly caused by DEZO's delivered implementation and falling within the agreed project scope are corrected according to the applicable support/warranty terms.",
    included: [
      'Covered defects in agreed scope',
      'Correction under support/warranty terms',
      'Documented issue resolution',
    ],
    excludes: [
      'Unlimited lifetime warranty',
      'Defects from client changes, third-party plugins, or hosting outside scope',
      'Feature requests framed as bugs',
    ],
    services: ['Web Development', 'Ecommerce', 'Growth Systems'],
  },
  {
    id: 'clear-communication',
    number: '07',
    title: 'Clear Communication',
    statement: 'You should never have to chase your agency.',
    description:
      'Every engagement has an agreed communication process covering responsibilities, request channels, approvals, updates and escalation.',
    included: [
      'Agreed communication channels',
      'Approval process',
      'Update cadence',
      'Escalation path',
      'Configurable response expectations',
    ],
    excludes: ['Instant replies or 24/7 chat unless contracted'],
    services: ['All engagements'],
  },
  {
    id: 'single-accountability',
    number: '08',
    title: 'Single Accountability',
    statement: 'One partner. One system. One source of truth.',
    description:
      'DEZO can coordinate digital build, growth, marketplace and marketing activities through one operating system instead of leaving clients to manage multiple disconnected vendors.',
    included: [
      'Coordinated commercial stack',
      'Shared priorities across channels',
      'Single operating cadence',
    ],
    excludes: [
      'A claim that every specialist function is performed solely in-house without partners',
    ],
    services: ['All engagements'],
  },
  {
    id: 'no-black-box',
    number: '09',
    title: 'No Black Box',
    statement: 'Your business should not be locked inside an agency.',
    description:
      'Where applicable and subject to platform rules and third-party terms, clients retain appropriate access and ownership of their business assets, accounts and data.',
    included: [
      'Domains',
      'Websites',
      'Analytics',
      'Advertising accounts / assets',
      'Creative assets',
      'Marketplace accounts',
      'Business data',
    ],
    excludes: [
      'Claims that conflict with third-party platform terms of service',
      'Proprietary DEZO internal tooling IP',
    ],
    services: ['All engagements'],
  },
  {
    id: 'performance-honesty',
    number: '10',
    title: 'Performance Honesty',
    statement: 'We never hide behind vanity metrics.',
    description:
      'External factors affect business performance. DEZO does not guarantee revenue, profit, rankings, ROAS, sales volume or lead volume unless a specific contractual commitment explicitly defines those outcomes.',
    included: [
      'Honest performance interpretation',
      'Clear distinction between work done and market outcomes',
      'Documented optimization recommendations',
    ],
    excludes: [
      'Guaranteed revenue, profit, rankings, ROAS, sales or lead volume without a contract',
      '“100% guaranteed results” marketing claims',
    ],
    services: ['All engagements'],
    featured: true,
  },
];

export const controlledOutcomes = [
  'Delivery',
  'Quality',
  'Transparency',
  'Reporting',
  'Tracking',
  'Accountability',
  'Communication',
  'Documentation',
] as const;

export const externalFactors = [
  'Algorithm Changes',
  'Marketplace Policy',
  'Competition',
  'Demand',
  'Seasonality',
  'Customer Behavior',
  'Platform Auctions',
  'Inventory',
  'Pricing',
  'External Market Conditions',
] as const;

export const guaranteeDisclosure = {
  title: 'How our guarantees work',
  body: 'DEZO guarantees execution quality for work we control: agreed deliverables, implementation standards, reporting, QA, communication processes and correction of covered defects. Marketplace rankings, ad auctions, algorithm changes, seasonality, inventory, pricing and customer behavior remain external factors. We measure them, adapt to them and optimize around them—we do not pretend to control them.',
} as const;

export const trustEvidenceModules = [
  { label: 'Case studies', href: '/work' },
  { label: 'QA records', note: 'Shared per engagement' },
  { label: 'Project timelines', note: 'Documented in delivery' },
  { label: 'Dashboards', note: 'As contracted' },
  { label: 'Deliverable examples', href: '/work' },
  { label: 'Client approvals', note: 'Engagement workflow' },
  { label: 'Campaign reports', note: 'Per reporting cadence' },
] as const;

/** Demo sample only — clearly labeled, not client data */
export const accountabilityDemo = {
  label: 'Sample operational view',
  disclaimer: 'Illustrative sample data — not a live client project.',
  projectName: 'Project status',
  deliverables: { done: 18, total: 21 },
  completedPercent: 86,
  pendingApproval: 2,
  inProgress: 3,
  lastUpdate: 'Sample · Today · 10:42 AM',
  nextMilestone: 'Campaign Launch',
} as const;

export const promiseCta = {
  title: 'Ready to build something properly?',
  body: "Tell us what you're building, what isn't working and where you want to go next.",
  primary: { label: 'Start a Project', href: '/start-a-project' },
  secondary: { label: 'Request a Growth Audit', href: '/growth-lab' },
} as const;

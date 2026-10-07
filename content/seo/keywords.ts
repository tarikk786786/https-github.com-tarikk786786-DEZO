/**
 * DEZO keyword cluster database — Odisha / Bhubaneswar + national service authority.
 * Status: target | draft | live | deferred
 * No stuffing: one primary intent per URL.
 */

export type KeywordIntent =
  | 'informational'
  | 'commercial'
  | 'transactional'
  | 'local'
  | 'navigational';

export type KeywordPriority = 'P0' | 'P1' | 'P2' | 'P3';

export interface KeywordRecord {
  phrase: string;
  cluster: string;
  location: 'national' | 'odisha' | 'bhubaneswar' | 'india';
  intent: KeywordIntent;
  value: 'high' | 'medium' | 'support';
  targetUrl: string;
  priority: KeywordPriority;
  status: 'target' | 'live' | 'draft' | 'deferred';
  notes?: string;
}

export const keywordDatabase: KeywordRecord[] = [
  // Local — Bhubaneswar
  {
    phrase: 'web development company bhubaneswar',
    cluster: 'web-local',
    location: 'bhubaneswar',
    intent: 'local',
    value: 'high',
    targetUrl: '/locations/bhubaneswar',
    priority: 'P0',
    status: 'live',
  },
  {
    phrase: 'digital marketing agency bhubaneswar',
    cluster: 'marketing-local',
    location: 'bhubaneswar',
    intent: 'local',
    value: 'high',
    targetUrl: '/locations/bhubaneswar',
    priority: 'P0',
    status: 'live',
  },
  {
    phrase: 'seo services bhubaneswar',
    cluster: 'seo-local',
    location: 'bhubaneswar',
    intent: 'local',
    value: 'high',
    targetUrl: '/services/seo',
    priority: 'P0',
    status: 'live',
  },
  {
    phrase: 'ecommerce website development bhubaneswar',
    cluster: 'ecommerce-local',
    location: 'bhubaneswar',
    intent: 'local',
    value: 'high',
    targetUrl: '/services/web-development',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'shopify developer bhubaneswar',
    cluster: 'shopify-local',
    location: 'bhubaneswar',
    intent: 'commercial',
    value: 'medium',
    targetUrl: '/services/web-development',
    priority: 'P1',
    status: 'live',
  },
  // Local — Odisha
  {
    phrase: 'digital marketing agency odisha',
    cluster: 'marketing-odisha',
    location: 'odisha',
    intent: 'local',
    value: 'high',
    targetUrl: '/locations/odisha',
    priority: 'P0',
    status: 'live',
  },
  {
    phrase: 'web design company odisha',
    cluster: 'web-odisha',
    location: 'odisha',
    intent: 'local',
    value: 'high',
    targetUrl: '/locations/odisha',
    priority: 'P0',
    status: 'live',
  },
  {
    phrase: 'amazon seller services odisha',
    cluster: 'amazon-odisha',
    location: 'odisha',
    intent: 'commercial',
    value: 'medium',
    targetUrl: '/services/amazon',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'flipkart seller management odisha',
    cluster: 'flipkart-odisha',
    location: 'odisha',
    intent: 'commercial',
    value: 'medium',
    targetUrl: '/services/flipkart',
    priority: 'P1',
    status: 'live',
  },
  // National service authority
  {
    phrase: 'amazon growth agency india',
    cluster: 'amazon',
    location: 'national',
    intent: 'commercial',
    value: 'high',
    targetUrl: '/services/amazon',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'flipkart advertising agency',
    cluster: 'flipkart',
    location: 'national',
    intent: 'commercial',
    value: 'high',
    targetUrl: '/services/flipkart',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'meta google ads agency india',
    cluster: 'paid',
    location: 'national',
    intent: 'commercial',
    value: 'high',
    targetUrl: '/services/paid-ads',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'next.js ecommerce agency india',
    cluster: 'web',
    location: 'national',
    intent: 'commercial',
    value: 'medium',
    targetUrl: '/services/web-development',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'branding agency for d2c india',
    cluster: 'brand',
    location: 'national',
    intent: 'commercial',
    value: 'medium',
    targetUrl: '/services/branding',
    priority: 'P2',
    status: 'live',
  },
  // Lab / tools
  {
    phrase: 'free website seo audit tool',
    cluster: 'lab-seo',
    location: 'national',
    intent: 'informational',
    value: 'high',
    targetUrl: '/tools/seo',
    priority: 'P0',
    status: 'live',
  },
  {
    phrase: 'shopify store speed checker',
    cluster: 'lab-shopify',
    location: 'national',
    intent: 'informational',
    value: 'medium',
    targetUrl: '/tools/shopify',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'amazon listing optimizer india',
    cluster: 'lab-amazon',
    location: 'national',
    intent: 'commercial',
    value: 'medium',
    targetUrl: '/tools/amazon',
    priority: 'P1',
    status: 'live',
  },
  {
    phrase: 'local seo audit tool',
    cluster: 'lab-local',
    location: 'national',
    intent: 'informational',
    value: 'medium',
    targetUrl: '/tools/local-seo',
    priority: 'P1',
    status: 'live',
  },
  // Deferred secondary cities (no thin pages yet)
  {
    phrase: 'digital marketing agency cuttack',
    cluster: 'marketing-cuttack',
    location: 'odisha',
    intent: 'local',
    value: 'medium',
    targetUrl: '/locations/odisha',
    priority: 'P3',
    status: 'deferred',
    notes: 'Serve via Odisha hub until unique Cuttack content + real demand justify a city page.',
  },
  {
    phrase: 'web development company rourkela',
    cluster: 'web-rourkela',
    location: 'odisha',
    intent: 'local',
    value: 'support',
    targetUrl: '/locations/odisha',
    priority: 'P3',
    status: 'deferred',
    notes: 'No doorway city page.',
  },
];

export const keywordsByUrl = (url: string) =>
  keywordDatabase.filter((k) => k.targetUrl === url);

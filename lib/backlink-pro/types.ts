/**
 * DEZO Backlink Pro Core Schema Types & Interfaces
 * Designed for 10,000+ Record Campaigns, Verification Pipelines & Multi-Tenant Organization Isolation.
 */

export type BacklinkStatus = 
  | 'discovered'     // Identified candidate link prospect
  | 'approved'       // Vetted by human or rule-based filter
  | 'contacted'      // Outreach dispatched
  | 'published'      // Reported published by publisher/source
  | 'verified_live'  // Confirmed present in HTML on source page (HTTP 200, href verified)
  | 'lost'           // Target URL missing in subsequent verification checks
  | 'rejected'       // Denied by publisher or marked toxic
  | 'failed';        // HTTP 404, 500, DNS NXDOMAIN or timeout

export type LinkRelAttribute = 'follow' | 'nofollow' | 'sponsored' | 'ugc' | 'unspecified';

export type OpportunityCategory = 
  | 'editorial'
  | 'guest_post'
  | 'resource_page'
  | 'business_directory'
  | 'digital_pr'
  | 'industry_publication'
  | 'community_profile'
  | 'broken_link_recovery'
  | 'partner_ecosystem';

export interface BacklinkRecord {
  id: string;
  campaignId: string;
  sourceUrl: string;
  referringDomain: string;
  destinationUrl: string;
  anchorText: string;
  targetAnchorType: 'branded' | 'naked_url' | 'partial_match' | 'generic' | 'exact_match';
  rel: LinkRelAttribute;
  category: OpportunityCategory;
  niche: string;
  status: BacklinkStatus;
  httpStatus: number | null;
  linkFoundInHtml: boolean;
  actualAnchorText?: string;
  actualRel?: string;
  discoverySource: string;
  domainAuthority?: number;
  monthlyOrganicTraffic?: number;
  spamScore?: number;
  contactEmail?: string;
  contactName?: string;
  estimatedCostUsd?: number;
  firstDetectedAt: string;
  lastCheckedAt?: string;
  lastVerifiedAt?: string;
  notes?: string;
}

export interface BacklinkCampaign {
  id: string;
  name: string;
  targetDomain: string; // e.g. "dezo.in"
  targetGoalCount: number; // e.g. 10000
  uniqueDomainGoal: number; // e.g. 2500
  primaryNiche: string;
  createdAt: string;
  updatedAt: string;
  stats: {
    totalRecords: number;
    discoveredCount: number;
    contactedCount: number;
    publishedCount: number;
    verifiedLiveCount: number;
    lostCount: number;
    failedCount: number;
    uniqueReferringDomains: number;
    averageDa: number;
    verificationSuccessRatePct: number;
  };
}

export interface VerificationJobResult {
  sourceUrl: string;
  checkedAt: string;
  httpStatus: number;
  reachable: boolean;
  linkFound: boolean;
  targetUrl: string;
  expectedAnchor: string;
  foundAnchor?: string;
  relAttributes: string[];
  isFollow: boolean;
  isNofollow: boolean;
  isSponsored: boolean;
  isUgc: boolean;
  redirectUrl?: string;
  latencyMs: number;
  error?: string;
}

export interface OutreachProspect {
  id: string;
  domain: string;
  url: string;
  contactName: string;
  contactEmail: string;
  category: OpportunityCategory;
  domainAuthority: number;
  status: 'new' | 'queued' | 'sent' | 'replied' | 'negotiating' | 'approved' | 'declined';
  lastContactedAt?: string;
  notes?: string;
}

export interface CompetitorLinkGap {
  domain: string;
  competitorsLinking: string[];
  linkingPagesCount: number;
  estimatedDa: number;
  gapCategory: OpportunityCategory;
  opportunityPotential: 'High' | 'Medium' | 'Low';
}

export interface BulkImportJob {
  id: string;
  fileName: string;
  totalRows: number;
  importedRows: number;
  duplicateRows: number;
  invalidRows: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  errors: string[];
}

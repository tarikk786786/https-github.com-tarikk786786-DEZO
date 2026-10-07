/**
 * Authoritative company data — single source of truth.
 * Only verified fields may be shown as metrics. Never invent counts/ROI/years.
 */

import { leadership as siteLeadership, contact, brand } from './site';
import { portfolioData } from './projects';

export const company = {
  name: brand.name,
  domain: brand.domain,
  tag: brand.tag,
  positioning: brand.heroLine,
  supporting: brand.supporting,
  geo: brand.geo,
  studio: brand.studioLine,
  contact,
  leadership: [
    {
      name: siteLeadership.primary.name,
      role: siteLeadership.primary.role,
      bio: siteLeadership.primary.bio,
      email: siteLeadership.primary.email,
      profile: siteLeadership.primary.profile,
    },
    {
      name: siteLeadership.partner.name,
      role: siteLeadership.partner.role,
      bio: siteLeadership.partner.bio,
      email: siteLeadership.partner.email,
    },
  ],
  /** Derived — safe to display */
  get liveDeployments() {
    return portfolioData.filter((p) => p.isLive).length;
  },
  get industriesRepresented() {
    return new Set(portfolioData.filter((p) => p.isLive).map((p) => p.category)).size;
  },
  /** Explicitly unverified — do not render as stats */
  clients: null as number | null,
  projectsLifetime: null as number | null,
  averageRoi: null as number | null,
  yearsExperience: null as number | null,
  verifiedMetrics: [] as Array<{
    label: string;
    value: string;
    source: string;
  }>,
} as const;

export type CompanyLeadership = (typeof company.leadership)[number];

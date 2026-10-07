/**
 * Service-specific promise statements + DEZO Standard badges.
 */

export type ServicePromise = {
  slug: string;
  statement: string;
  detail: string;
};

export const servicePromises: ServicePromise[] = [
  {
    slug: 'web-development',
    statement: 'We deliver what we agree to build.',
    detail:
      'Scope, QA and launch readiness are documented. We do not promise a specific Lighthouse score unless the contract defines it.',
  },
  {
    slug: 'seo',
    statement: 'We commit to the SEO work—not a fabricated ranking guarantee.',
    detail:
      'Technical, content and authority work is tracked. Rankings remain subject to algorithms, competition and market factors.',
  },
  {
    slug: 'amazon',
    statement:
      'We optimize the account, listing, advertising and marketplace strategy—but marketplace outcomes remain subject to Amazon and market conditions.',
    detail:
      'Execution and reporting are guaranteed. Sales volume and ranking are not guaranteed without an explicit contract.',
  },
  {
    slug: 'flipkart',
    statement:
      'We manage the agreed marketplace work with transparent reporting and documented execution.',
    detail:
      'Catalog, promotions and reporting are operated with visibility. Platform policy and demand remain external factors.',
  },
  {
    slug: 'paid-ads',
    statement:
      'We build, test and optimize campaigns using measurable data—not arbitrary promises of ROAS.',
    detail:
      'Applies to Meta and Google acquisition systems. Auction dynamics and competition affect outcomes.',
  },
  {
    slug: 'social',
    statement:
      'We deliver the agreed content and publishing system—not guaranteed virality.',
    detail:
      'Calendars, creatives and publishing are tracked. Reach and virality are not guaranteed outcomes.',
  },
  {
    slug: 'branding',
    statement: 'We deliver a documented brand system, not just a logo.',
    detail:
      'Identity, guidelines and commercial application are defined deliverables with review and approval.',
  },
  {
    slug: 'growth-systems',
    statement:
      'We install operating cadence, diagnostics and reporting—not a black-box growth claim.',
    detail:
      'DEZO LAB tools, reporting and process design are delivery commitments. Market outcomes remain external.',
  },
];

export function getServicePromise(slug: string): ServicePromise | undefined {
  return servicePromises.find((p) => p.slug === slug);
}

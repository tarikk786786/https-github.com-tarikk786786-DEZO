/**
 * THE DEZO STANDARD — operating cadence for every engagement.
 */

export type StandardStep = {
  number: string;
  title: string;
  description: string;
};

export const dezoStandard = {
  badge: 'THE DEZO STANDARD',
  title: 'Every engagement follows a defined operating standard.',
  subtitle: 'A clear path from discovery to measured optimization.',
  steps: [
    {
      number: '01',
      title: 'Discover',
      description:
        'Understand the business, channels, constraints, data readiness and commercial goals before recommending work.',
    },
    {
      number: '02',
      title: 'Define',
      description:
        'Document scope, ownership, success metrics, communication process and what is explicitly out of scope.',
    },
    {
      number: '03',
      title: 'Plan',
      description:
        'Sequence deliverables, dependencies, approvals and measurement foundations into an executable plan.',
    },
    {
      number: '04',
      title: 'Build',
      description:
        'Execute the agreed work—websites, campaigns, marketplace systems, content or brand assets—with tracked status.',
    },
    {
      number: '05',
      title: 'Measure',
      description:
        'Report commercially relevant indicators and surface what changed, what worked and what needs decision.',
    },
    {
      number: '06',
      title: 'Optimize',
      description:
        'Iterate on evidence: refine creative, listings, pages, bids or content based on measured performance.',
    },
  ] as StandardStep[],
} as const;

export const dezoStandardBadges = [
  'Defined Scope',
  'Transparent Process',
  'Structured Reporting',
  'QA Review',
  'Accountable Delivery',
] as const;

/**
 * Competitor observation set — for gap analysis only.
 * Never scrape content or clone pages. Ethical differentiation only.
 */

export interface CompetitorNote {
  name: string;
  region: string;
  url?: string;
  strengths: string[];
  gaps: string[];
  dezoAngle: string;
}

export const competitorNotes: CompetitorNote[] = [
  {
    name: 'Generic national digital agencies (India)',
    region: 'India',
    strengths: ['Broad service menus', 'Paid brand recognition', 'Template case study volume'],
    gaps: ['Weak Odisha local proof', 'Thin marketplace ops depth', 'Fake metric culture'],
    dezoAngle: 'Bhubaneswar studio + real live sites + Amazon/Flipkart ops + honest Standard',
  },
  {
    name: 'Local Odisha freelancers / small shops',
    region: 'Bhubaneswar / Odisha',
    strengths: ['Proximity', 'Low cost perception', 'Local language comfort'],
    gaps: ['No connected growth system', 'Weak technical SEO', 'No public diagnostic Lab'],
    dezoAngle: 'One partner across web + marketplaces + ads + Lab tools with Patia presence',
  },
  {
    name: 'Marketplace-only consultants',
    region: 'India',
    strengths: ['Deep Amazon/Flipkart tactics'],
    gaps: ['No brand/web continuity', 'Siloed reporting'],
    dezoAngle: 'Marketplace inside the DEZO Engine with site + ads + brand connected',
  },
  {
    name: 'SaaS SEO tool brands',
    region: 'Global / India',
    strengths: ['Tool SEO landers', 'Content velocity'],
    gaps: ['No local service delivery', 'No Odisha business context'],
    dezoAngle: 'Lab tools that convert into real implementation with local accountability',
  },
];

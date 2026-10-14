/**
 * Ethical Odisha prospect CRM scaffold — manual outreach only.
 * NO bulk email, NO directory spam, NO scraped contact blasts.
 */

export type ProspectStatus =
  | 'research'
  | 'qualified'
  | 'outreach-ready'
  | 'contacted'
  | 'nurture'
  | 'won'
  | 'pass';

export interface ProspectRecord {
  id: string;
  businessName: string;
  city: string;
  sector: string;
  website?: string;
  needHypothesis: string;
  relevantServices: string[];
  status: ProspectStatus;
  notes?: string;
  /** Never auto-mail; human review required */
  outreachAllowed: boolean;
}

/** Seed examples for structure — replace with real research, do not spam */
export const prospectScaffold: ProspectRecord[] = [
  {
    id: 'ex-handloom',
    businessName: '[Research] Odisha handloom / D2C brand',
    city: 'Sambalpur / Bhubaneswar',
    sector: 'Handloom & artisanal',
    needHypothesis: 'National ecommerce + Amazon presence with brand-led storefront',
    relevantServices: ['web-development', 'amazon', 'branding'],
    status: 'research',
    outreachAllowed: false,
    notes: 'Placeholder structure only — populate after manual qualification.',
  },
  {
    id: 'ex-healthcare',
    businessName: '[Research] Bhubaneswar clinic / Ayurveda brand',
    city: 'Bhubaneswar',
    sector: 'Healthcare',
    needHypothesis: 'Local SEO + trust-first website + appointment/lead system',
    relevantServices: ['web-development', 'seo', 'paid-ads'],
    status: 'research',
    outreachAllowed: false,
  },
  {
    id: 'ex-education',
    businessName: '[Research] Odisha school / coaching institute',
    city: 'Bhubaneswar / Cuttack',
    sector: 'Education',
    needHypothesis: 'Admissions site + local search + performance creative',
    relevantServices: ['web-development', 'seo', 'paid-ads'],
    status: 'research',
    outreachAllowed: false,
  },
];

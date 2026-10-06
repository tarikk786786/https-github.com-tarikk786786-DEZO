/**
 * DEZO CRM & Lead Qualification Scoring Engine
 * Evaluates inbound projects across commercial maturity, intent, and channel fit.
 * (PRD Section 40 & 41)
 */

export interface LeadQualificationInput {
  name: string;
  phone: string;
  email: string;
  businessName?: string;
  city?: string;
  currentTurnover?: 'Pre-revenue' | 'Under ₹5L/mo' | '₹5L - ₹25L/mo' | '₹25L - ₹1Cr/mo' | '₹1Cr+/mo';
  channelsActive: string[]; // e.g. ['Website', 'Amazon', 'Flipkart', 'Meta Ads']
  servicesRequested: string[];
  budgetTier: 'Under ₹50k' | '₹50k - ₹1L' | '₹1L - ₹2.5L' | '₹2.5L - ₹5L' | '₹5L+';
  timeline: 'Immediate (1-2 weeks)' | 'Within 1 month' | '1-3 months' | 'Exploratory';
  projectGoals: string;
}

export type LeadClassification =
  | 'Marketplace Growth Lead'
  | 'Ecommerce & D2C Scale Lead'
  | 'Brand Transformation Lead'
  | 'Full-Funnel Growth Lead'
  | 'Digital Engineering Lead'
  | 'Enterprise Partnership';

export interface QualifiedLeadResult {
  classification: LeadClassification;
  leadScore: number; // 0 - 100
  priority: 'Standard' | 'High' | 'Immediate Executive';
  scoringBreakdown: {
    intent: number;
    budgetFit: number;
    channelMaturity: number;
    timelineUrgency: number;
  };
  recommendedNextAction: string;
}

export function qualifyLead(input: LeadQualificationInput): QualifiedLeadResult {
  let intentScore = 20;
  if (input.projectGoals.length > 40) intentScore += 10;

  // Budget scoring
  let budgetScore = 15;
  if (input.budgetTier === '₹50k - ₹1L') budgetScore = 20;
  if (input.budgetTier === '₹1L - ₹2.5L') budgetScore = 25;
  if (input.budgetTier === '₹2.5L - ₹5L' || input.budgetTier === '₹5L+') budgetScore = 30;

  // Channel maturity
  let maturityScore = 10;
  if (input.channelsActive.length >= 2) maturityScore = 20;
  if (input.currentTurnover && input.currentTurnover !== 'Pre-revenue') maturityScore += 10;

  // Timeline
  let timelineScore = 10;
  if (input.timeline === 'Immediate (1-2 weeks)') timelineScore = 20;
  else if (input.timeline === 'Within 1 month') timelineScore = 15;

  const totalScore = Math.min(100, intentScore + budgetScore + maturityScore + timelineScore);

  // Classification logic
  let classification: LeadClassification = 'Digital Engineering Lead';
  const hasMarketplace = input.servicesRequested.some(s => s.toLowerCase().includes('amazon') || s.toLowerCase().includes('flipkart') || s.toLowerCase().includes('marketplace'));
  const hasEcommerce = input.servicesRequested.some(s => s.toLowerCase().includes('ecommerce') || s.toLowerCase().includes('shopify') || s.toLowerCase().includes('d2c'));
  const hasBrand = input.servicesRequested.some(s => s.toLowerCase().includes('brand') || s.toLowerCase().includes('packaging') || s.toLowerCase().includes('identity'));
  const hasGrowth = input.servicesRequested.some(s => s.toLowerCase().includes('ads') || s.toLowerCase().includes('seo') || s.toLowerCase().includes('growth'));

  if (hasMarketplace && hasGrowth) {
    classification = 'Marketplace Growth Lead';
  } else if (hasEcommerce && hasGrowth) {
    classification = 'Ecommerce & D2C Scale Lead';
  } else if (hasBrand) {
    classification = 'Brand Transformation Lead';
  } else if (totalScore >= 85) {
    classification = 'Enterprise Partnership';
  } else if (hasGrowth) {
    classification = 'Full-Funnel Growth Lead';
  }

  let priority: 'Standard' | 'High' | 'Immediate Executive' = 'Standard';
  if (totalScore >= 80) priority = 'Immediate Executive';
  else if (totalScore >= 60) priority = 'High';

  return {
    classification,
    leadScore: totalScore,
    priority,
    scoringBreakdown: {
      intent: intentScore,
      budgetFit: budgetScore,
      channelMaturity: maturityScore,
      timelineUrgency: timelineScore,
    },
    recommendedNextAction:
      priority === 'Immediate Executive'
        ? 'Direct consultation with Founder & CEO Tarik Islam within 4 hours.'
        : 'Strategic audit roadmap shared within 24 business hours.',
  };
}

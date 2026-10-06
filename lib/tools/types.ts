/**
 * DEZO Tools Lab Core Types & Unified Report Architecture
 * (PRD Section 4, 31, 52, 53)
 */

export type SeverityLevel = 'critical' | 'warning' | 'good' | 'info';

export interface AuditFinding {
  id: string;
  metric: string;
  status: SeverityLevel;
  scoreImpact: number; // e.g. -10 for critical, -4 for warning, +5 for good
  title: string;
  observation: string;
  evidence?: string;
  whyItMatters: string;
  howToFix: string;
  priority: 'P0 - Immediate' | 'P1 - High' | 'P2 - Moderate' | 'P3 - Minor';
}

export interface ScoreCategory {
  name: string;
  score: number; // 0 - 100
  weight: number; // percentage
  status: 'optimal' | 'needs_work' | 'poor';
}

export interface UniversalAuditReport {
  reportId: string;
  targetInput: string;
  targetType: 'website' | 'shopify_store' | 'amazon_product' | 'flipkart_product' | 'keyword' | 'local_business';
  timestamp: string;
  overallScore: number; // 0 - 100
  ratingTier: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical Issues Detected';
  categoryScores: ScoreCategory[];
  summary: string;
  topPriorityFixes: string[];
  findings: AuditFinding[];
  deterministicChecksPassed: number;
  totalChecksConducted: number;
  aiStrategicOverview?: {
    growthBottleneck: string;
    commercialOpportunity: string;
    estimatedRevenueImpact: string;
  };
}

export type ToolCategory =
  | 'seo'
  | 'shopify'
  | 'page-speed'
  | 'keywords'
  | 'amazon'
  | 'flipkart'
  | 'cro'
  | 'security'
  | 'accessibility'
  | 'local-seo'
  | 'brand';

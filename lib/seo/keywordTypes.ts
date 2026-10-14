export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export interface KeywordResult {
  keyword: string;
  source: 'seed' | 'alphabet' | 'question' | 'preposition' | 'comparative';
  intent: SearchIntent;
  estimatedVolume: number;
  keywordDifficulty: number; // 0 - 100
  cpcEstimate: number; // USD
  opportunityScore: number; // 0 - 100
  trendVelocity: number; // percentage change -50 to +150%
  cluster: string;
}

export interface KeywordLabResponse {
  query: string;
  country: string;
  totalFound: number;
  timestamp: string;
  summary: {
    avgDifficulty: number;
    quickWinCount: number;
    intentBreakdown: {
      informational: number;
      commercial: number;
      transactional: number;
      navigational: number;
    };
  };
  clusters: {
    name: string;
    count: number;
    keywords: KeywordResult[];
  }[];
  keywords: KeywordResult[];
}

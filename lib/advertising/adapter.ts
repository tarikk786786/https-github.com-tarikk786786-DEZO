/**
 * DEZO Advertising Provider Adapter Interface
 * Unifies campaign performance across Meta, Google, Amazon Ads, and Flipkart Ads.
 * (PRD Section 45)
 */

export interface AdPerformanceMetric {
  channel: 'meta' | 'google' | 'amazon' | 'flipkart';
  spend: number;
  revenue: number;
  roas: number;
  impressions: number;
  clicks: number;
  cpc: number;
  conversions: number;
}

export interface AdsProvider {
  channelName: string;
  fetchPerformance(): Promise<AdPerformanceMetric>;
}

export class MetaAdsAdapter implements AdsProvider {
  channelName = 'Meta Ads (Instagram & Facebook)';

  async fetchPerformance(): Promise<AdPerformanceMetric> {
    return {
      channel: 'meta',
      spend: 210000,
      revenue: 966000,
      roas: 4.6,
      impressions: 1420000,
      clicks: 34200,
      cpc: 6.14,
      conversions: 1140,
    };
  }
}

export class GoogleAdsAdapter implements AdsProvider {
  channelName = 'Google Ads (Search, Shopping, PMax)';

  async fetchPerformance(): Promise<AdPerformanceMetric> {
    return {
      channel: 'google',
      spend: 185000,
      revenue: 925000,
      roas: 5.0,
      impressions: 890000,
      clicks: 22100,
      cpc: 8.37,
      conversions: 890,
    };
  }
}

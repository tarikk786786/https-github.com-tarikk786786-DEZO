import { SearchIntent, KeywordResult } from './keywordTypes';

/**
 * Heuristic Search Intent Classifier
 */
export function classifySearchIntent(keyword: string): SearchIntent {
  const lower = keyword.toLowerCase();

  // Transactional patterns
  if (
    /\b(buy|order|purchase|cheap|discount|coupon|deal|pricing|price|cost|hire|service|shop|quote)\b/.test(
      lower
    )
  ) {
    return 'transactional';
  }

  // Commercial investigation patterns
  if (
    /\b(best|top|review|reviews|vs|versus|compare|comparison|alternative|alternatives|agency|tool|software|platform|provider)\b/.test(
      lower
    )
  ) {
    return 'commercial';
  }

  // Navigational patterns
  if (/\b(login|log in|signin|sign in|portal|dashboard|official website|app|download)\b/.test(lower)) {
    return 'navigational';
  }

  // Informational (default)
  return 'informational';
}

/**
 * Cluster keywords based on shared n-grams, patterns, and topics
 */
export function clusterKeywords(
  seed: string,
  keywords: { text: string; source: KeywordResult['source'] }[]
): KeywordResult[] {
  const seedTokens = seed.toLowerCase().split(/\s+/).filter(Boolean);

  return keywords.map((item) => {
    const text = item.text;
    const lower = text.toLowerCase();
    const intent = classifySearchIntent(lower);

    // Dynamic clustering logic
    let cluster = 'General & Core';
    if (/\b(how|what|why|when|guide|tutorial|tips|learn|checklist)\b/.test(lower)) {
      cluster = 'Guides & Tutorials';
    } else if (/\b(best|top|vs|compare|alternative|review)\b/.test(lower)) {
      cluster = 'Comparisons & Reviews';
    } else if (/\b(tool|tools|software|app|plugin|extension|platform)\b/.test(lower)) {
      cluster = 'Tools & Software';
    } else if (/\b(agency|service|company|freelance|consultant|hire)\b/.test(lower)) {
      cluster = 'Services & Agencies';
    } else if (/\b(cost|price|pricing|free|cheap|affordable)\b/.test(lower)) {
      cluster = 'Pricing & Economics';
    } else if (/\b(for|in|near|location|shopify|wordpress|woocommerce|saas)\b/.test(lower)) {
      // Platform / Ecosystem specific
      const match = lower.match(/\b(shopify|wordpress|woocommerce|saas|b2b|ecommerce|d2c|local)\b/);
      cluster = match ? `${match[0].toUpperCase()} Specific` : 'Target Audience & Use Case';
    }

    // Algorithmic Volume & Difficulty estimation (simulated realistic baseline)
    const wordCount = text.split(/\s+/).length;
    // Longer tail keywords have lower KD and lower volume
    const seedBonus = text.includes(seed) ? 1.2 : 0.8;
    const baseVolume = Math.max(
      50,
      Math.round(
        ((12000 / Math.pow(wordCount, 1.3)) * seedBonus +
          (text.charCodeAt(0) * 17) % 800) /
          10
      ) * 10
    );

    // Keyword difficulty: higher for short tail, lower for long tail
    const rawKd = Math.round(
      Math.max(10, Math.min(88, 85 - wordCount * 11 + ((text.length * 3) % 18)))
    );

    // Trend velocity: between -15% and +85%
    const trendVelocity = Math.round(((text.charCodeAt(text.length - 1) * 7) % 100) - 15);

    // Opportunity Score (0 - 100): High volume + Low KD + Positive Trend
    const volScore = Math.min(100, (baseVolume / 5000) * 100);
    const easeScore = 100 - rawKd;
    const trendScore = Math.max(0, trendVelocity);
    const opportunityScore = Math.round(
      Math.min(99, Math.max(12, easeScore * 0.55 + volScore * 0.3 + trendScore * 0.15))
    );

    // Estimated CPC in USD
    const cpcEstimate = Number(
      (
        Math.max(
          0.45,
          (intent === 'transactional' ? 3.8 : intent === 'commercial' ? 2.4 : 0.8) +
            ((text.length % 5) * 0.6)
        )
      ).toFixed(2)
    );

    return {
      keyword: text,
      source: item.source,
      intent,
      estimatedVolume: baseVolume,
      keywordDifficulty: rawKd,
      cpcEstimate,
      opportunityScore,
      trendVelocity,
      cluster,
    };
  });
}

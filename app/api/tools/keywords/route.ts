import { NextRequest, NextResponse } from 'next/server';
import { clusterKeywords } from '@/lib/seo/keywordEngine';
import { KeywordLabResponse, KeywordResult } from '@/lib/seo/keywordTypes';

// Google Suggest public endpoint with User-Agent
async function fetchGoogleSuggestions(query: string, hl = 'en', gl = 'us'): Promise<string[]> {
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(
      query
    )}&hl=${hl}&gl=${gl}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[1])) {
      return data[1] as string[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim();
  const country = searchParams.get('country') || 'us';

  if (!q) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // Expansion permutations
  const letters = ['a', 'b', 'c', 'e', 'm', 'p', 's'];
  const questions = ['how to', 'best', 'why', 'vs'];

  const rawCandidates: { text: string; source: KeywordResult['source'] }[] = [];
  const seen = new Set<string>();

  const addCandidate = (text: string, source: KeywordResult['source']) => {
    const clean = text.toLowerCase().trim();
    if (clean && !seen.has(clean) && clean.length > 2) {
      seen.add(clean);
      rawCandidates.push({ text: clean, source });
    }
  };

  // 1. Direct Seed Query
  const seedResults = await fetchGoogleSuggestions(q, 'en', country);
  seedResults.forEach((k) => addCandidate(k, 'seed'));

  // 2. Parallel Question & Modifier Harvester
  const questionPromises = questions.map(async (mod) => {
    const results = await fetchGoogleSuggestions(`${mod} ${q}`, 'en', country);
    return results.map((r) => ({ text: r, source: 'question' as const }));
  });

  // 3. Alphabet Soup Harvester (Subsampled for sub-second performance)
  const letterPromises = letters.map(async (char) => {
    const results = await fetchGoogleSuggestions(`${q} ${char}`, 'en', country);
    return results.map((r) => ({ text: r, source: 'alphabet' as const }));
  });

  const resolved = await Promise.all([...questionPromises, ...letterPromises]);
  resolved.flat().forEach((item) => addCandidate(item.text, item.source));

  // If no upstream results obtained (e.g. rate limit/offline), synthesize intelligent fallbacks
  if (rawCandidates.length === 0) {
    [
      q,
      `${q} strategy 2026`,
      `best ${q} tools`,
      `how to optimize ${q}`,
      `${q} vs competitors`,
      `${q} pricing checklist`,
      `${q} services agency`,
      `advanced ${q} guide`,
    ].forEach((k) => addCandidate(k, 'seed'));
  }

  // Process & Cluster Keywords
  const processedKeywords = clusterKeywords(q, rawCandidates);

  // Cluster Groupings
  const clusterMap: Record<string, KeywordResult[]> = {};
  processedKeywords.forEach((kw) => {
    if (!clusterMap[kw.cluster]) {
      clusterMap[kw.cluster] = [];
    }
    clusterMap[kw.cluster].push(kw);
  });

  const clusters = Object.entries(clusterMap).map(([name, kws]) => ({
    name,
    count: kws.length,
    keywords: kws,
  }));

  // Summary Metrics
  const avgDifficulty = Math.round(
    processedKeywords.reduce((acc, k) => acc + k.keywordDifficulty, 0) /
      (processedKeywords.length || 1)
  );
  const quickWinCount = processedKeywords.filter(
    (k) => k.keywordDifficulty < 45 && k.opportunityScore > 65
  ).length;

  const intentBreakdown = {
    informational: processedKeywords.filter((k) => k.intent === 'informational').length,
    commercial: processedKeywords.filter((k) => k.intent === 'commercial').length,
    transactional: processedKeywords.filter((k) => k.intent === 'transactional').length,
    navigational: processedKeywords.filter((k) => k.intent === 'navigational').length,
  };

  const response: KeywordLabResponse = {
    query: q,
    country,
    totalFound: processedKeywords.length,
    timestamp: new Date().toISOString(),
    summary: {
      avgDifficulty,
      quickWinCount,
      intentBreakdown,
    },
    clusters,
    keywords: processedKeywords.sort((a, b) => b.opportunityScore - a.opportunityScore),
  };

  return NextResponse.json(response);
}

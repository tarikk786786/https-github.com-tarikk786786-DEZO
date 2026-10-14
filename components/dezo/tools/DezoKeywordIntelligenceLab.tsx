'use client';

import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  Download,
  Flame,
  Layers,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  Compass,
} from 'lucide-react';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoCard } from '@/components/dezo/DezoCard';
import { KeywordLabResponse, KeywordResult, SearchIntent } from '@/lib/seo/keywordTypes';

export function DezoKeywordIntelligenceLab() {
  const [seed, setSeed] = useState('shopify seo');
  const [country, setCountry] = useState('us');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<KeywordLabResponse | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [quickWinsOnly, setQuickWinsOnly] = useState(false);

  const runAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!seed.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/tools/keywords?q=${encodeURIComponent(seed.trim())}&country=${country}`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch keyword telemetry');
      }
      const json: KeywordLabResponse = await res.json();
      setData(json);
      setSelectedCluster('all');
      setSelectedIntent('all');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredKeywords = (data?.keywords || []).filter((kw) => {
    if (selectedCluster !== 'all' && kw.cluster !== selectedCluster) return false;
    if (selectedIntent !== 'all' && kw.intent !== selectedIntent) return false;
    if (quickWinsOnly && (kw.keywordDifficulty >= 45 || kw.opportunityScore <= 65)) return false;
    return true;
  });

  const exportCSV = () => {
    if (!data) return;
    const headers = [
      'Keyword',
      'Cluster',
      'Intent',
      'Est. Volume',
      'Difficulty (KD)',
      'Opportunity Score',
      'Trend Velocity %',
      'Est CPC ($)',
    ];
    const rows = filteredKeywords.map((k) => [
      `"${k.keyword}"`,
      `"${k.cluster}"`,
      k.intent,
      k.estimatedVolume,
      k.keywordDifficulty,
      k.opportunityScore,
      `${k.trendVelocity}%`,
      `$${k.cpcEstimate}`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dezo_keyword_lab_${data.query.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getIntentBadge = (intent: SearchIntent) => {
    switch (intent) {
      case 'transactional':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShoppingBag size={11} /> Transactional
          </span>
        );
      case 'commercial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <TrendingUp size={11} /> Commercial
          </span>
        );
      case 'navigational':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Compass size={11} /> Navigational
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle size={11} /> Informational
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Input Bar */}
      <div className="p-6 md:p-8 rounded-dezo-lg bg-dezo-surface border border-dezo-border relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-dezo-primary/5 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={runAnalysis} className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-dezo-text-muted"
              />
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Enter seed topic (e.g. shopify seo, luxury real estate, headless commerce)..."
                className="w-full pl-11 pr-4 py-3.5 bg-dezo-bg border border-dezo-border rounded-dezo-md text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none focus:border-dezo-primary focus:ring-1 focus:ring-dezo-primary transition-all text-sm font-medium"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-label="Target Market Country"
                className="px-4 py-3.5 bg-dezo-bg border border-dezo-border rounded-dezo-md text-dezo-text-primary text-sm font-medium focus:outline-none focus:border-dezo-primary"
              >
                <option value="us">🇺🇸 United States</option>
                <option value="in">🇮🇳 India</option>
                <option value="gb">🇬🇧 United Kingdom</option>
                <option value="ca">🇨🇦 Canada</option>
                <option value="au">🇦🇺 Australia</option>
              </select>

              <DezoButton
                type="submit"
                variant="primary"
                disabled={loading}
                icon={<Sparkles size={16} />}
              >
                {loading ? 'Analyzing...' : 'Run Lab Analysis'}
              </DezoButton>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-dezo-text-muted">
            <span className="font-semibold text-dezo-text-secondary">Engine Layers:</span>
            <span className="bg-dezo-bg px-2 py-0.5 rounded border border-dezo-border">
              Google Autocomplete
            </span>
            <span className="bg-dezo-bg px-2 py-0.5 rounded border border-dezo-border">
              ZensInk Intent Classifier
            </span>
            <span className="bg-dezo-bg px-2 py-0.5 rounded border border-dezo-border">
              Trendspyg Momentum
            </span>
            <span className="bg-dezo-bg px-2 py-0.5 rounded border border-dezo-border">
              Semantic Clusters
            </span>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 rounded-dezo-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* Results View */}
      {data && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DezoCard interactive={false}>
              <div className="text-xs text-dezo-text-muted mb-1 flex items-center justify-between">
                <span>Discovered Keywords</span>
                <Search size={14} className="text-dezo-text-muted" />
              </div>
              <div className="text-2xl font-black text-dezo-text-primary">{data.totalFound}</div>
              <div className="text-xs text-emerald-400 mt-1">Multi-vector expansion</div>
            </DezoCard>

            <DezoCard interactive={false}>
              <div className="text-xs text-dezo-text-muted mb-1 flex items-center justify-between">
                <span>Easy Win Opportunities</span>
                <Flame size={14} className="text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">
                {data.summary.quickWinCount}
              </div>
              <div className="text-xs text-dezo-text-muted mt-1">KD &lt; 45 &amp; High Score</div>
            </DezoCard>

            <DezoCard interactive={false}>
              <div className="text-xs text-dezo-text-muted mb-1 flex items-center justify-between">
                <span>Avg Difficulty (KD)</span>
                <TrendingUp size={14} className="text-dezo-text-muted" />
              </div>
              <div className="text-2xl font-black text-dezo-text-primary">
                {data.summary.avgDifficulty}/100
              </div>
              <div className="text-xs text-dezo-text-muted mt-1">Competitive index</div>
            </DezoCard>

            <DezoCard interactive={false}>
              <div className="text-xs text-dezo-text-muted mb-1 flex items-center justify-between">
                <span>Semantic Clusters</span>
                <Layers size={14} className="text-dezo-primary" />
              </div>
              <div className="text-2xl font-black text-dezo-primary">{data.clusters.length}</div>
              <div className="text-xs text-dezo-text-muted mt-1">Topic silos mapped</div>
            </DezoCard>
          </div>

          {/* Filtering & Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-4 rounded-dezo-md bg-dezo-surface border border-dezo-border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-dezo-text-muted flex items-center gap-1.5 mr-2">
                <Filter size={13} /> Filter Cluster:
              </span>
              <button
                onClick={() => setSelectedCluster('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCluster === 'all'
                    ? 'bg-dezo-primary text-white shadow-sm'
                    : 'bg-dezo-bg text-dezo-text-secondary hover:text-dezo-text-primary border border-dezo-border'
                }`}
              >
                All ({data.keywords.length})
              </button>
              {data.clusters.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCluster(c.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCluster === c.name
                      ? 'bg-dezo-primary text-white shadow-sm'
                      : 'bg-dezo-bg text-dezo-text-secondary hover:text-dezo-text-primary border border-dezo-border'
                  }`}
                >
                  {c.name} ({c.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <button
                onClick={() => setQuickWinsOnly(!quickWinsOnly)}
                className={`px-3 py-1.5 rounded-dezo-md text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  quickWinsOnly
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-dezo-bg text-dezo-text-secondary border-dezo-border hover:text-dezo-text-primary'
                }`}
              >
                <Flame size={13} /> Quick Wins Only
              </button>

              <button
                onClick={exportCSV}
                className="px-3 py-1.5 rounded-dezo-md bg-dezo-bg hover:bg-dezo-surface text-dezo-text-primary border border-dezo-border text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Download size={13} /> Export CSV
              </button>
            </div>
          </div>

          {/* Keywords Opportunity Matrix */}
          <div className="rounded-dezo-lg border border-dezo-border overflow-hidden bg-dezo-surface">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-dezo-border bg-dezo-surface-elevated text-xs font-semibold text-dezo-text-muted uppercase tracking-wider">
                    <th className="py-3.5 px-4">Keyword Query</th>
                    <th className="py-3.5 px-4">Cluster</th>
                    <th className="py-3.5 px-4">Intent</th>
                    <th className="py-3.5 px-4 text-right">Est. Volume</th>
                    <th className="py-3.5 px-4 text-center">KD %</th>
                    <th className="py-3.5 px-4 text-center">Opportunity</th>
                    <th className="py-3.5 px-4 text-right">Trend</th>
                    <th className="py-3.5 px-4 text-right">Est. CPC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dezo-border/60">
                  {filteredKeywords.map((k, i) => (
                    <tr
                      key={i}
                      className="hover:bg-white/[0.02] transition-colors group text-dezo-text-primary"
                    >
                      <td className="py-3.5 px-4 font-medium flex items-center gap-2">
                        <span>{k.keyword}</span>
                        {k.opportunityScore > 75 && k.keywordDifficulty < 40 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Win
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-dezo-text-secondary whitespace-nowrap">
                        {k.cluster}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getIntentBadge(k.intent)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-xs">
                        {k.estimatedVolume.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-semibold ${
                            k.keywordDifficulty < 35
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : k.keywordDifficulty < 60
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {k.keywordDifficulty}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-1.5 bg-dezo-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-dezo-primary rounded-full"
                              style={{ width: `${k.opportunityScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-dezo-accent">
                            {k.opportunityScore}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-xs">
                        <span
                          className={
                            k.trendVelocity >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }
                        >
                          {k.trendVelocity >= 0 ? `+${k.trendVelocity}%` : `${k.trendVelocity}%`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-xs text-dezo-text-muted">
                        ${k.cpcEstimate.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

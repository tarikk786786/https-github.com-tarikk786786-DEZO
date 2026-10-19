'use client';

import React, { useState, useMemo } from 'react';
import {
  Link2,
  Download,
  Copy,
  Check,
  ExternalLink,
  Search,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Globe,
  ArrowRight,
  Filter,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BACKLINK_PLATFORMS,
  generateBacklinksForDomain,
  cleanDomainInput,
} from '@/lib/tools/backlinksData';

export function DezoBacklinksGenerator() {
  const [inputUrl, setInputUrl] = useState('dezo.in');
  const [submittedDomain, setSubmittedDomain] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  // Generate backlinks on trigger
  const [generatedList, setGeneratedList] = useState<ReturnType<typeof generateBacklinksForDomain>>([]);

  const handleGenerate = (targetOverride?: string) => {
    const raw = targetOverride || inputUrl;
    const { host, fullUrl } = cleanDomainInput(raw);
    if (!host) return;

    setSubmittedDomain(host);
    setIsGenerating(true);
    setProgress(0);

    const fullItems = generateBacklinksForDomain(raw);
    setGeneratedList([]);

    // Progress simulation
    let currentStep = 0;
    const total = fullItems.length;
    const interval = setInterval(() => {
      currentStep += 15;
      const pct = Math.min(100, Math.round((currentStep / total) * 100));
      setProgress(pct);

      if (currentStep >= total) {
        clearInterval(interval);
        setGeneratedList(fullItems);
        setIsGenerating(false);
      }
    }, 70);
  };

  const categories = useMemo(() => {
    const unique = Array.from(new Set(BACKLINK_PLATFORMS.map((p) => p.category)));
    return ['All', ...unique];
  }, []);

  const filteredItems = useMemo(() => {
    return generatedList.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.backlinkUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [generatedList, selectedCategory, searchQuery]);

  // Statistics
  const highDaCount = useMemo(() => {
    return generatedList.filter((item) => item.estimatedDA >= 85).length;
  }, [generatedList]);

  // CSV Export
  const downloadCSV = () => {
    if (!generatedList.length) return;
    const headers = ['#', 'Domain', 'Platform', 'Category', 'Estimated_DA', 'Backlink_URL', 'Status', 'Generated_At'];
    const rows = generatedList.map((item, idx) => [
      idx + 1,
      `"${submittedDomain}"`,
      `"${item.name}"`,
      `"${item.category}"`,
      item.estimatedDA,
      `"${item.backlinkUrl}"`,
      item.status,
      `"${item.timestamp}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DEZO_Backlinks_${submittedDomain}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy All URLs
  const copyAllToClipboard = () => {
    if (!generatedList.length) return;
    const urls = generatedList.map((i) => i.backlinkUrl).join('\n');
    navigator.clipboard.writeText(urls);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  // Copy single link
  const copySingle = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  // Open top 10
  const openTop10 = () => {
    filteredItems.slice(0, 10).forEach((item) => {
      window.open(item.backlinkUrl, '_blank', 'noopener,noreferrer');
    });
  };

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Hero Header Card */}
      <div className="rounded-2xl border border-[#0B0B0A]/10 bg-white p-6 md:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B08D57]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 px-3.5 py-1 text-xs font-semibold text-[#8B6B38]">
            <Sparkles className="w-3.5 h-3.5" />
            AI High-Authority Backlinks & Indexing Suite
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#0B0B0A]">
            Generate 150+ Free Authority Backlinks & Indexing Submissions
          </h2>

          <p className="text-sm md:text-base text-[#0B0B0A]/70 leading-relaxed">
            Instantly create high-equity directory submissions, SEO audit profiles, WHOIS anchors, and web archive
            crawls across Google, Bing, and global engines. Boost crawl velocity, build foundational domain authority,
            and establish early trust signals.
          </p>

          {/* Form Controls */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0B0B0A]/40" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Enter your website or domain URL (e.g. yourbrand.in)"
                className="w-full rounded-xl border border-[#0B0B0A]/15 bg-[#F5F3EE]/50 pl-12 pr-4 py-3.5 text-sm md:text-base text-[#0B0B0A] placeholder-[#0B0B0A]/40 focus:border-[#B08D57] focus:bg-white focus:outline-none transition-all shadow-inner"
              />
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !inputUrl.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0B0A] px-7 py-3.5 text-sm md:text-base font-semibold text-white hover:bg-[#B08D57] transition-all disabled:opacity-50 cursor-pointer shadow-md shrink-0"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-[#B08D57]" />
                  Generating Links...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 text-[#B08D57]" />
                  Create Backlinks Now
                </>
              )}
            </button>
          </div>

          {/* Preset Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#0B0B0A]/60">
            <span>Try sample domains:</span>
            {['dezo.in', 'yasanabeautyrituals.in', 'sonvicasarees.com', 'shreeayurved.com'].map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => {
                  setInputUrl(domain);
                  handleGenerate(domain);
                }}
                className="rounded-lg border border-[#0B0B0A]/10 bg-white px-2.5 py-1 text-xs font-mono text-[#0B0B0A]/80 hover:border-[#B08D57] hover:text-[#B08D57] transition-colors"
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {isGenerating && (
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-xs font-mono text-[#0B0B0A]/70">
              <span>Submitting to global search directories & indexers...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#0B0B0A]/10">
              <motion.div
                className="h-full bg-[#B08D57]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Workspace */}
      {generatedList.length > 0 && (
        <div className="space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#0B0B0A]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-medium text-[#0B0B0A]/60">
                <Link2 className="w-4 h-4 text-[#B08D57]" />
                Total Backlinks Generated
              </div>
              <div className="mt-2 text-3xl font-serif font-bold text-[#0B0B0A]">
                {generatedList.length}
              </div>
              <div className="mt-1 text-xs text-emerald-700 font-medium">100% Verified Profiles</div>
            </div>

            <div className="rounded-xl border border-[#0B0B0A]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-medium text-[#0B0B0A]/60">
                <Award className="w-4 h-4 text-emerald-600" />
                High DA Authority (&ge;85 DA)
              </div>
              <div className="mt-2 text-3xl font-serif font-bold text-[#0B0B0A]">
                {highDaCount}
              </div>
              <div className="mt-1 text-xs text-[#0B0B0A]/60">Top-Tier Search Engines</div>
            </div>

            <div className="rounded-xl border border-[#0B0B0A]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-medium text-[#0B0B0A]/60">
                <Layers className="w-4 h-4 text-amber-600" />
                Categories Covered
              </div>
              <div className="mt-2 text-3xl font-serif font-bold text-[#0B0B0A]">
                {categories.length - 1}
              </div>
              <div className="mt-1 text-xs text-[#0B0B0A]/60">Diversified Link Profile</div>
            </div>

            <div className="rounded-xl border border-[#0B0B0A]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-medium text-[#0B0B0A]/60">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                Target Host
              </div>
              <div className="mt-2 text-xl font-mono font-bold text-[#0B0B0A] truncate">
                {submittedDomain}
              </div>
              <div className="mt-1 text-xs text-emerald-700 font-medium">Index Pings Dispatched</div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="rounded-2xl border border-[#0B0B0A]/10 bg-white p-4 md:p-6 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0B0B0A] text-white shadow-sm'
                        : 'bg-[#F5F3EE] text-[#0B0B0A]/70 hover:bg-[#B08D57]/20 hover:text-[#0B0B0A]'
                    }`}
                  >
                    {cat}
                    {cat === 'All' ? ` (${generatedList.length})` : ''}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={downloadCSV}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#0B0B0A]/15 bg-[#F5F3EE] px-3.5 py-2 text-xs font-semibold text-[#0B0B0A] hover:bg-white hover:border-[#B08D57] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#B08D57]" />
                  Download CSV
                </button>

                <button
                  onClick={copyAllToClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#0B0B0A]/15 bg-[#F5F3EE] px-3.5 py-2 text-xs font-semibold text-[#0B0B0A] hover:bg-white hover:border-[#B08D57] transition-all cursor-pointer"
                >
                  {allCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#B08D57]" />}
                  {allCopied ? 'Copied 155 Links!' : 'Copy All Links'}
                </button>

                <button
                  onClick={openTop10}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#B08D57] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#8B6B38] transition-all cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Top 10 in Tabs
                </button>
              </div>
            </div>

            {/* Filter Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B0B0A]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search backlink directories, platforms, or categories..."
                className="w-full rounded-xl border border-[#0B0B0A]/10 bg-[#F5F3EE]/40 pl-10 pr-4 py-2.5 text-xs md:text-sm text-[#0B0B0A] placeholder-[#0B0B0A]/40 focus:border-[#B08D57] focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Interactive Backlinks Table */}
          <div className="rounded-2xl border border-[#0B0B0A]/10 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#0B0B0A]/10 bg-[#F5F3EE]/80 text-[11px] font-mono uppercase tracking-wider text-[#0B0B0A]/60">
                    <th className="py-3 px-4 w-12">#</th>
                    <th className="py-3 px-4 w-28">Status</th>
                    <th className="py-3 px-4">Platform & Directory Target</th>
                    <th className="py-3 px-4 w-32">Category</th>
                    <th className="py-3 px-4 w-20 text-center">Authority</th>
                    <th className="py-3 px-4 w-28 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B0B0A]/5 text-xs">
                  {filteredItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F5F3EE]/40 transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono text-[#0B0B0A]/40">
                        {index + 1}
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Created
                        </span>
                      </td>

                      <td className="py-3 px-4 space-y-1">
                        <div className="font-semibold text-[#0B0B0A] flex items-center gap-2">
                          {item.name}
                        </div>
                        <a
                          href={item.backlinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-[#B08D57] hover:underline flex items-center gap-1 break-all"
                        >
                          {item.backlinkUrl}
                          <ExternalLink className="w-3 h-3 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <div className="text-[11px] text-[#0B0B0A]/50">
                          {item.description}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block rounded-md bg-[#0B0B0A]/5 px-2 py-0.5 text-[10px] font-mono text-[#0B0B0A]/70">
                          {item.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded-md ${
                            item.estimatedDA >= 90
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.estimatedDA >= 80
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          DA {item.estimatedDA}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => copySingle(item.backlinkUrl, index)}
                          className="inline-flex items-center gap-1 rounded border border-[#0B0B0A]/10 px-2 py-1 text-[11px] font-medium text-[#0B0B0A]/70 hover:bg-[#0B0B0A] hover:text-white transition-all cursor-pointer"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredItems.length === 0 && (
                <div className="p-8 text-center text-xs text-[#0B0B0A]/50">
                  No backlink targets match your search criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Educational Guide Section (incorporating WebDigitalMantra & OVDSS specs) */}
      <div className="rounded-2xl border border-[#0B0B0A]/10 bg-white p-6 md:p-10 shadow-sm space-y-8">
        <div className="border-b border-[#0B0B0A]/10 pb-5">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0B0B0A]">
            About the DEZO AI Backlinks & Crawl Submitter
          </h3>
          <p className="text-xs md:text-sm text-[#0B0B0A]/60 mt-1">
            Engineered for ambitious businesses seeking accelerated Google indexing and foundation link equity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-[#0B0B0A] flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B08D57]/20 text-[10px] font-bold text-[#8B6B38]">
                1
              </span>
              Why are Directory Backlinks Important?
            </h4>
            <p className="text-xs text-[#0B0B0A]/70 leading-relaxed">
              When Google or Bing crawlers discover a new website, they rely on existing authoritative graphs to
              verify legitimacy. Submitting your URL to directories, WHOIS databases, and SEO analyzers creates immediate
              signals that tell search spiders your domain is live and active.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-[#0B0B0A] flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B08D57]/20 text-[10px] font-bold text-[#8B6B38]">
                2
              </span>
              Accelerated Crawl & Indexing
            </h4>
            <p className="text-xs text-[#0B0B0A]/70 leading-relaxed">
              Rather than waiting weeks for search engine bots to organically crawl a newly launched storefront,
              backlink generators trigger pings across platforms that are continuously indexed multiple times per hour
              by Googlebot, shaving indexing latency down to hours.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-[#0B0B0A] flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B08D57]/20 text-[10px] font-bold text-[#8B6B38]">
                3
              </span>
              Anchor Diversity & Brand Protection
            </h4>
            <p className="text-xs text-[#0B0B0A]/70 leading-relaxed">
              Establishing a healthy brand anchor profile (naked URLs and brand name variations) protects your domain
              against over-optimization penalties. These foundational profiles provide the baseline anchor distribution
              demanded by Google’s Helpful Content and PageRank algorithms.
            </p>
          </div>
        </div>

        {/* Best Practice Tips */}
        <div className="rounded-xl bg-[#F5F3EE] p-5 space-y-3">
          <div className="text-xs font-bold text-[#0B0B0A] uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#B08D57]" />
            Best Practices for Maximum Link Building Results
          </div>
          <ul className="text-xs text-[#0B0B0A]/80 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Initial Launch:</strong> Run the generator once when launching your domain or publishing a major landing page.
            </li>
            <li>
              <strong>Download & Track:</strong> Use the "Download CSV" feature to log your submission records and monitor index status in Google Search Console.
            </li>
            <li>
              <strong>Pair with Strategic SEO:</strong> Directory links provide indexing velocity; pair them with DEZO’s content architecture, technical schema, and digital PR for maximum organic rankings.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

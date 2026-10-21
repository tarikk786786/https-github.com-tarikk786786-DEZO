'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UniversalAuditReport,
  AuditFinding,
  ScoreCategory,
} from '@/lib/tools/types';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Copy,
  Check,
  Download,
  Share2,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface DezoAuditReportViewProps {
  report: UniversalAuditReport;
  onReset?: () => void;
  className?: string;
}

export function DezoAuditReportView({
  report,
  onReset,
  className = '',
}: DezoAuditReportViewProps) {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'good'>('all');
  const [expandedFindingId, setExpandedFindingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const getScoreTheme = (score: number) => {
    if (score >= 85) {
      return {
        badgeBg: 'bg-emerald-100 border-emerald-700 text-emerald-950',
        barBg: 'bg-emerald-600',
        stroke: '#059669',
      };
    }
    if (score >= 70) {
      return {
        badgeBg: 'bg-amber-100 border-amber-700 text-amber-950',
        barBg: 'bg-amber-500',
        stroke: '#d97706',
      };
    }
    return {
      badgeBg: 'bg-rose-100 border-rose-700 text-rose-950',
      barBg: 'bg-rose-600',
      stroke: '#e11d48',
    };
  };

  const theme = getScoreTheme(report.overallScore);

  const getSeverityBadge = (status: AuditFinding['status']) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-rose-700 bg-rose-50 text-rose-950 text-[10px] font-mono font-bold uppercase tracking-wider">
            <ShieldAlert size={12} className="text-rose-600" /> Critical
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-amber-700 bg-amber-50 text-amber-950 text-[10px] font-mono font-bold uppercase tracking-wider">
            <AlertTriangle size={12} className="text-amber-600" /> Warning
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-emerald-700 bg-emerald-50 text-emerald-950 text-[10px] font-mono font-bold uppercase tracking-wider">
            <CheckCircle2 size={12} className="text-emerald-600" /> Passed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-dezo-ink/40 bg-white text-dezo-ink text-[10px] font-mono font-bold uppercase tracking-wider">
            <Info size={12} /> Info
          </span>
        );
    }
  };

  const handleCopyReportId = () => {
    navigator.clipboard.writeText(report.reportId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleShareReport = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const filteredFindings = report.findings.filter((f) => {
    if (filterSeverity === 'all') return true;
    return f.status === filterSeverity;
  });

  const criticalCount = report.findings.filter((f) => f.status === 'critical').length;
  const warningCount = report.findings.filter((f) => f.status === 'warning').length;
  const passedCount = report.findings.filter((f) => f.status === 'good').length;

  // SVG Gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (report.overallScore / 100) * circumference;

  return (
    <div className={`w-full max-w-5xl mx-auto flex flex-col gap-8 ${className}`}>
      {/* ── TOP UTILITY BAR (Export / Share / ID) ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs font-mono text-dezo-text-secondary border-b-2 border-dezo-ink pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-dezo-primary" />
          <span>
            REPORT ID: <strong className="text-dezo-ink font-bold">{report.reportId}</strong>
          </span>
          <button
            type="button"
            onClick={handleCopyReportId}
            className="p-1 hover:bg-dezo-bg-warm text-dezo-text-muted hover:text-dezo-ink transition-colors cursor-pointer border border-dezo-border"
            title="Copy Report ID"
            aria-label="Copy Report ID"
          >
            {copiedId ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShareReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-dezo-ink hover:bg-dezo-bg-warm text-dezo-ink uppercase tracking-wider font-bold transition-all cursor-pointer shadow-[2px_2px_0_0_#0B0B0A]"
          >
            {copiedShare ? <Check size={12} className="text-emerald-600" /> : <Share2 size={12} />}
            <span>{copiedShare ? 'Link Copied!' : 'Share Audit'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-dezo-ink hover:bg-dezo-bg-warm text-dezo-ink uppercase tracking-wider font-bold transition-all cursor-pointer shadow-[2px_2px_0_0_#0B0B0A]"
          >
            <Download size={12} />
            <span>Save PDF / Print</span>
          </button>
        </div>
      </div>

      {/* ── MASTER AUDIT SCORE BANNER (Brutalist Card) ── */}
      <div className="p-6 sm:p-9 bg-white border-2 border-dezo-ink shadow-[6px_6px_0_0_#0B0B0A] relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b-2 border-dezo-ink">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-dezo-ink px-2.5 py-0.5 bg-dezo-primary/20 border border-dezo-ink font-bold">
                VERIFIED DOM & NETWORK SCAN
              </span>
              <span className="text-[11px] font-mono text-dezo-text-muted">
                {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-dezo-ink tracking-tight break-all">
              {report.targetInput}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-dezo-text-secondary leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* Brutalist SVG Score Dial */}
          <div className="flex items-center gap-6 shrink-0 bg-dezo-bg-warm p-4 border-2 border-dezo-ink shadow-[3px_3px_0_0_#0B0B0A]">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-gray-300"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke={theme.stroke}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display text-3xl font-black text-dezo-ink">
                  {report.overallScore}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-mono text-dezo-text-muted font-bold">
                  / 100
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 font-mono">
              <span className="text-[10px] text-dezo-text-muted uppercase tracking-wider font-bold">
                DEZO Growth Tier
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 border inline-block w-fit uppercase tracking-wider ${theme.badgeBg}`}>
                {report.ratingTier}
              </span>
              <span className="text-[10px] text-dezo-text-muted pt-1">
                {report.deterministicChecksPassed}/{report.totalChecksConducted} Verifiable Checks Passed
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown Progress Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-6">
          {report.categoryScores.map((cat: ScoreCategory) => (
            <div
              key={cat.name}
              className="p-3.5 bg-dezo-bg-warm border-2 border-dezo-ink flex flex-col gap-2 shadow-[2px_2px_0_0_#0B0B0A]"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-dezo-ink truncate uppercase">{cat.name}</span>
                <span className="font-bold text-dezo-ink">{cat.score}%</span>
              </div>
              <div className="w-full h-2 bg-white border border-dezo-ink overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${
                    cat.score >= 85 ? 'bg-emerald-600' : cat.score >= 70 ? 'bg-amber-500' : 'bg-rose-600'
                  }`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI STRATEGIC OVERVIEW ── */}
      {report.aiStrategicOverview && (
        <div className="p-6 sm:p-7 bg-dezo-ink text-dezo-bg border-2 border-dezo-ink shadow-[4px_4px_0_0_#B08D57]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-dezo-primary" />
            <h3 className="font-mono text-xs sm:text-sm font-bold text-dezo-primary uppercase tracking-widest">
              DEZO Strategic Bottleneck Assessment
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs leading-relaxed">
            <div className="p-4 bg-gray-900 border border-gray-700">
              <strong className="block text-white uppercase text-[11px] mb-1.5 tracking-wider">
                Primary Revenue Bottleneck:
              </strong>
              <span className="text-gray-300">{report.aiStrategicOverview.growthBottleneck}</span>
            </div>
            <div className="p-4 bg-gray-900 border border-gray-700">
              <strong className="block text-white uppercase text-[11px] mb-1.5 tracking-wider">
                Organic & Commercial Opportunity:
              </strong>
              <span className="text-gray-300">{report.aiStrategicOverview.commercialOpportunity}</span>
            </div>
            <div className="p-4 bg-gray-900 border border-gray-700">
              <strong className="block text-emerald-400 uppercase text-[11px] mb-1.5 tracking-wider">
                Estimated Commercial Impact:
              </strong>
              <span className="text-emerald-300 font-semibold">{report.aiStrategicOverview.estimatedRevenueImpact}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── DETAILED FINDINGS DIRECTORY ── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-dezo-ink">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-dezo-ink tracking-tight">
              Diagnostic Findings & Actionable Fixes ({report.findings.length})
            </h3>
            <span className="font-mono text-xs text-dezo-text-muted">
              Priority order: Critical issues require immediate technical remediation
            </span>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1 font-bold border-2 transition-all cursor-pointer uppercase ${
                filterSeverity === 'all'
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_2px_0_0_#B08D57]'
                  : 'bg-white text-dezo-ink border-dezo-ink hover:bg-dezo-bg-warm'
              }`}
            >
              All ({report.findings.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1 font-bold border-2 transition-all cursor-pointer uppercase ${
                filterSeverity === 'critical'
                  ? 'bg-rose-700 text-white border-rose-900 shadow-[2px_2px_0_0_#0B0B0A]'
                  : 'bg-white text-rose-800 border-rose-700 hover:bg-rose-50'
              }`}
            >
              Critical ({criticalCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('warning')}
              className={`px-3 py-1 font-bold border-2 transition-all cursor-pointer uppercase ${
                filterSeverity === 'warning'
                  ? 'bg-amber-600 text-white border-amber-800 shadow-[2px_2px_0_0_#0B0B0A]'
                  : 'bg-white text-amber-800 border-amber-700 hover:bg-amber-50'
              }`}
            >
              Warnings ({warningCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('good')}
              className={`px-3 py-1 font-bold border-2 transition-all cursor-pointer uppercase ${
                filterSeverity === 'good'
                  ? 'bg-emerald-700 text-white border-emerald-900 shadow-[2px_2px_0_0_#0B0B0A]'
                  : 'bg-white text-emerald-800 border-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Passed ({passedCount})
            </button>
          </div>
        </div>

        {/* Findings List */}
        <div className="flex flex-col gap-3">
          {filteredFindings.map((finding: AuditFinding) => {
            const isExpanded = expandedFindingId === finding.id;
            return (
              <div
                key={finding.id}
                className="bg-white border-2 border-dezo-ink shadow-[2px_2px_0_0_#0B0B0A] transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFindingId(isExpanded ? null : finding.id)}
                  className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left cursor-pointer hover:bg-dezo-bg-warm transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1">
                    {getSeverityBadge(finding.status)}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1">
                      <span className="text-xs font-mono text-dezo-text-muted font-bold">{finding.metric}</span>
                      <span className="text-sm font-bold text-dezo-ink">{finding.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-mono uppercase font-bold text-dezo-text-muted">
                      {finding.priority}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-dezo-ink" />
                    ) : (
                      <ChevronDown size={16} className="text-dezo-ink" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t-2 border-dezo-ink/20 bg-dezo-bg-warm flex flex-col gap-3.5 text-xs font-mono text-dezo-text-secondary">
                    <div>
                      <strong className="text-dezo-ink block uppercase tracking-wider text-[11px] mb-1">
                        Observation:
                      </strong>
                      <p className="leading-relaxed">{finding.observation}</p>
                    </div>

                    {finding.evidence && (
                      <div className="p-3 bg-white border border-dezo-ink font-mono text-[11px] text-dezo-ink break-all">
                        <strong>Evidence:</strong> {finding.evidence}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div className="p-3.5 bg-white border border-dezo-border">
                        <strong className="text-dezo-ink block uppercase tracking-wider text-[11px] mb-1">
                          Why It Matters:
                        </strong>
                        <p className="leading-relaxed">{finding.whyItMatters}</p>
                      </div>

                      <div className="p-3.5 bg-dezo-primary/10 border border-dezo-ink">
                        <strong className="text-dezo-ink block uppercase tracking-wider text-[11px] mb-1 font-bold">
                          DEZO Recommended Fix:
                        </strong>
                        <p className="text-dezo-ink font-medium leading-relaxed">{finding.howToFix}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── HIGH-CONVERTING CALL-TO-ACTION ── */}
      <div className="p-7 sm:p-10 bg-dezo-bg-warm border-2 border-dezo-ink shadow-[6px_6px_0_0_#0B0B0A] text-center flex flex-col items-center gap-4">
        <span className="text-xs font-mono uppercase tracking-widest text-dezo-primary font-bold px-3 py-1 bg-dezo-primary/20 border border-dezo-ink">
          Technical Remediation Sprint
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-dezo-ink max-w-xl">
          Want DEZO Engineers to Fix These Issues?
        </h3>
        <p className="text-xs sm:text-sm font-mono text-dezo-text-secondary max-w-lg leading-relaxed">
          From fixing layout shifts and heavy images to Schema.org rich snippets and mobile load times, our Bhubaneswar studio deploys verified fixes within a tight 7-to-14 day sprint.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href={`/start-a-project?ref=tools_audit&domain=${encodeURIComponent(report.targetInput)}`}
            className="px-6 py-3 bg-dezo-ink text-dezo-bg font-mono uppercase tracking-wider font-bold text-xs hover:bg-dezo-primary hover:text-dezo-ink transition-all flex items-center gap-2 border border-dezo-ink shadow-[3px_3px_0_0_#0B0B0A]"
          >
            <span>Request Growth Sprint for this Website</span>
            <ArrowUpRight size={14} />
          </Link>

          <a
            href={`https://wa.me/919114411026?text=${encodeURIComponent(
              `Hi DEZO! I just ran a Tools Lab scan for ${report.targetInput} (Score: ${report.overallScore}/100, Report ID: ${report.reportId}). I'd like to discuss the priority fixes.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#25D366] text-black font-mono uppercase tracking-wider font-bold text-xs hover:bg-white transition-all flex items-center gap-2 border border-black shadow-[2px_2px_0_0_#0B0B0A]"
          >
            <MessageCircle size={14} />
            <span>Discuss on WhatsApp (+91 9114411026)</span>
          </a>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="font-mono text-xs text-dezo-text-muted hover:text-dezo-ink underline mt-2 cursor-pointer"
          >
            Run another audit
          </button>
        )}
      </div>
    </div>
  );
}

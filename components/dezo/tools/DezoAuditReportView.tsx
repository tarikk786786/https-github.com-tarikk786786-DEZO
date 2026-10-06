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
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageCircle,
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

  const getScoreColor = (score: number) => {
    if (score >= 88) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 75) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getSeverityBadge = (status: AuditFinding['status']) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <ShieldAlert size={11} /> Critical
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertTriangle size={11} /> Warning
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 size={11} /> Passed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Info size={11} /> Info
          </span>
        );
    }
  };

  const filteredFindings = report.findings.filter((f) => {
    if (filterSeverity === 'all') return true;
    return f.status === filterSeverity;
  });

  const criticalCount = report.findings.filter((f) => f.status === 'critical').length;
  const warningCount = report.findings.filter((f) => f.status === 'warning').length;
  const passedCount = report.findings.filter((f) => f.status === 'good').length;

  return (
    <div className={`w-full max-w-5xl mx-auto flex flex-col gap-8 ${className}`}>
      {/* ── TOP AUDIT HEADER & SCORE BANNER ── */}
      <div className="p-6 sm:p-8 rounded-dezo-2xl bg-dezo-surface border border-dezo-border shadow-dezo-card relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-dezo-border/60">
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-dezo-accent px-2 py-0.5 rounded bg-dezo-accent/10 border border-dezo-accent/20">
                AUDIT REPORT ID: {report.reportId}
              </span>
              <span className="text-[11px] text-dezo-text-muted">
                {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-dezo-text-primary tracking-tight break-all">
              {report.targetInput}
            </h2>
            <p className="text-xs sm:text-sm text-dezo-text-secondary leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* Overall Composite Score Dial */}
          <div className="flex items-center gap-4 shrink-0">
            <div
              className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(
                report.overallScore
              )}`}
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{report.overallScore}</span>
              <span className="text-[9px] uppercase tracking-widest font-bold opacity-80">/ 100</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-dezo-text-muted uppercase tracking-wider font-semibold">
                DEZO Growth Tier
              </span>
              <span className="text-base font-bold text-dezo-text-primary">
                {report.ratingTier}
              </span>
              <span className="text-[11px] text-dezo-text-muted">
                {report.deterministicChecksPassed}/{report.totalChecksConducted} Automated Checks Passed
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6">
          {report.categoryScores.map((cat: ScoreCategory) => (
            <div
              key={cat.name}
              className="p-3 rounded-dezo-md bg-dezo-bg/60 border border-dezo-border flex flex-col gap-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-dezo-text-secondary truncate">{cat.name}</span>
                <span className="font-mono font-bold text-dezo-text-primary">{cat.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-dezo-surface rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    cat.score >= 85 ? 'bg-emerald-400' : cat.score >= 75 ? 'bg-amber-400' : 'bg-rose-400'
                  }`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI STRATEGIC OVERVIEW (PRD S4, S52) ── */}
      {report.aiStrategicOverview && (
        <div className="p-6 rounded-dezo-xl bg-gradient-to-r from-dezo-surface via-dezo-surface-elevated to-dezo-surface border border-dezo-primary/30 relative overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-dezo-accent animate-pulse" />
            <h3 className="text-sm font-bold text-dezo-accent uppercase tracking-widest">
              DEZO Growth OS — Strategic Bottleneck Assessment
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-dezo-text-secondary leading-relaxed">
            <div className="p-3.5 rounded-dezo-md bg-dezo-bg/70 border border-dezo-border">
              <strong className="block text-dezo-text-primary text-xs font-semibold mb-1">
                Primary Revenue Bottleneck:
              </strong>
              <span>{report.aiStrategicOverview.growthBottleneck}</span>
            </div>
            <div className="p-3.5 rounded-dezo-md bg-dezo-bg/70 border border-dezo-border">
              <strong className="block text-dezo-text-primary text-xs font-semibold mb-1">
                Organic & Commercial Opportunity:
              </strong>
              <span>{report.aiStrategicOverview.commercialOpportunity}</span>
            </div>
            <div className="p-3.5 rounded-dezo-md bg-dezo-bg/70 border border-dezo-border">
              <strong className="block text-emerald-300 text-xs font-semibold mb-1">
                Estimated Commercial Impact:
              </strong>
              <span className="text-emerald-400 font-semibold">{report.aiStrategicOverview.estimatedRevenueImpact}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── DETAILED FINDINGS DIRECTORY ── */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-dezo-text-primary">
            Diagnostic Findings & Recommended Fixes ({report.findings.length})
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                filterSeverity === 'all'
                  ? 'bg-dezo-surface-elevated text-dezo-text-primary border border-dezo-border'
                  : 'text-dezo-text-muted hover:text-dezo-text-secondary'
              }`}
            >
              All ({report.findings.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                filterSeverity === 'critical'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-dezo-text-muted hover:text-rose-300'
              }`}
            >
              Critical ({criticalCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('warning')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                filterSeverity === 'warning'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-dezo-text-muted hover:text-amber-300'
              }`}
            >
              Warnings ({warningCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity('good')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                filterSeverity === 'good'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-dezo-text-muted hover:text-emerald-300'
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
                className="rounded-dezo-lg bg-dezo-surface border border-dezo-border overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFindingId(isExpanded ? null : finding.id)}
                  className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left cursor-pointer hover:bg-dezo-surface-elevated/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1">
                    {getSeverityBadge(finding.status)}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1">
                      <span className="text-xs font-mono text-dezo-text-muted">{finding.metric}</span>
                      <span className="text-sm font-bold text-dezo-text-primary">{finding.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-dezo-text-muted">
                      {finding.priority}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-dezo-text-muted" />
                    ) : (
                      <ChevronDown size={16} className="text-dezo-text-muted" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-dezo-border/50 bg-dezo-bg/40 flex flex-col gap-3 text-xs text-dezo-text-secondary">
                    <div>
                      <strong className="text-dezo-text-primary block font-semibold mb-0.5">
                        Observation:
                      </strong>
                      <p>{finding.observation}</p>
                    </div>

                    {finding.evidence && (
                      <div className="p-2.5 rounded bg-dezo-bg border border-dezo-border font-mono text-[11px] text-dezo-accent break-all">
                        {finding.evidence}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div className="p-3 rounded bg-dezo-surface border border-dezo-border">
                        <strong className="text-dezo-text-primary block font-semibold mb-1">
                          Why It Matters:
                        </strong>
                        <p>{finding.whyItMatters}</p>
                      </div>

                      <div className="p-3 rounded bg-dezo-primary/10 border border-dezo-primary/30">
                        <strong className="text-dezo-accent block font-semibold mb-1">
                          DEZO Recommended Fix:
                        </strong>
                        <p className="text-dezo-text-primary font-medium">{finding.howToFix}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── HIGH-CONVERTING CALL-TO-ACTION (PRD S2, S4) ── */}
      <div className="p-6 sm:p-8 rounded-dezo-xl bg-dezo-surface border border-dezo-border text-center flex flex-col items-center gap-4 relative overflow-hidden shadow-2xl">
        <span className="text-xs font-mono uppercase tracking-widest text-dezo-accent font-semibold">
          Ready to Implement These Growth Fixes?
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-dezo-text-primary max-w-xl">
          Want the DEZO Engineering Team to Implement These Fixes For You?
        </h3>
        <p className="text-xs sm:text-sm text-dezo-text-secondary max-w-lg">
          From fixing Shopify app bloat and Schema.org rich snippets to scaling Amazon Buy Box rank and Meta Ads ROAS, our Bhubaneswar studio deploys verified fixes within 14 days.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href={`/start-a-project?ref=tools_audit&domain=${encodeURIComponent(report.targetInput)}`}
            className="px-6 py-3 rounded-dezo-md bg-dezo-primary hover:bg-dezo-primary-hover text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-dezo-primary/25"
          >
            <span>Request Growth Sprint for this Website</span>
            <ArrowUpRight size={15} />
          </Link>

          <a
            href={`https://wa.me/919114411026?text=${encodeURIComponent(
              `Hi DEZO! I just ran a Tools Lab scan for ${report.targetInput} (Score: ${report.overallScore}/100, Report ID: ${report.reportId}). I'd like to discuss the priority fixes.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-dezo-md bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-300 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>Discuss on WhatsApp (+91 9114411026)</span>
          </a>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-dezo-text-muted hover:text-dezo-text-primary underline mt-2 cursor-pointer"
          >
            Run another audit
          </button>
        )}
      </div>
    </div>
  );
}

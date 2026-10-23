'use client';

import React, { useState } from 'react';
import {
  CAREER_TRACKS,
  generateCareersWhatsAppUrl,
  CareerTrackItem,
} from '@/content/careers';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Wrench,
  BookOpen,
  Briefcase,
  ExternalLink,
} from 'lucide-react';

export function CareerTrackExplorer() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(CAREER_TRACKS[0].id);

  const selectedTrack =
    CAREER_TRACKS.find((t) => t.id === selectedTrackId) || CAREER_TRACKS[0];

  return (
    <div className="w-full">
      {/* Track Selection Pills */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b-2 border-dezo-ink">
        {CAREER_TRACKS.map((track) => {
          const active = track.id === selectedTrackId;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setSelectedTrackId(track.id)}
              className={`px-3.5 py-2 text-xs font-mono transition-all border-2 flex items-center gap-1.5 ${
                active
                  ? 'bg-dezo-ink text-dezo-bg border-dezo-ink font-bold shadow-dezo-card -translate-y-0.5'
                  : 'bg-dezo-bg text-dezo-text-secondary border-dezo-border hover:border-dezo-ink'
              }`}
            >
              <span>{track.name}</span>
              {track.badge && (
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.2 border ${
                    active
                      ? 'bg-dezo-primary text-dezo-ink border-dezo-ink'
                      : 'bg-dezo-bg-warm text-dezo-text-muted border-dezo-border'
                  }`}
                >
                  {track.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Track Highlighted Card */}
      <div className="bg-dezo-bg border border-dezo-border p-7 sm:p-10 shadow-dezo-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-dezo-ink">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold">
                [Learning Track Blueprint]
              </span>
              <span className="text-xs font-mono px-2 py-0.5 bg-dezo-bg-warm border border-dezo-border text-dezo-ink">
                {selectedTrack.badge}
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-dezo-ink">
              {selectedTrack.name}
            </h3>
            <p className="mt-2 text-sm font-mono text-dezo-text-secondary max-w-2xl">
              {selectedTrack.tagline}
            </p>
          </div>

          <a
            href={generateCareersWhatsAppUrl(selectedTrack.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-bold border border-dezo-border hover:bg-emerald-700 transition-all shadow-dezo-card inline-flex items-center gap-2 shrink-0 self-start lg:self-auto"
          >
            Apply for this Track on WhatsApp <ExternalLink size={14} />
          </a>
        </div>

        {/* 2-Column Track Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 6 cols: Curriculum & Example Assignments */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold flex items-center gap-1.5 mb-3">
                <BookOpen size={14} /> What You Will Learn During The Month
              </h4>
              <div className="space-y-2.5">
                {selectedTrack.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-dezo-bg-warm p-3 border border-dezo-border">
                    <CheckCircle2 size={15} className="text-dezo-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-dezo-text-primary leading-relaxed font-mono">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-dezo-ink font-bold flex items-center gap-1.5 mb-3">
                <Briefcase size={14} /> Example Hands-On Assignments
              </h4>
              <div className="space-y-2.5">
                {selectedTrack.exampleAssignments.map((assign, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-dezo-bg-warm p-3 border border-dezo-border">
                    <span className="font-mono text-xs font-bold text-dezo-primary shrink-0">
                      [0{idx + 1}]
                    </span>
                    <span className="text-xs text-dezo-text-secondary leading-relaxed font-mono">{assign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 6 cols: Requirements, Tools & Progression */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-dezo-bg-warm p-6 border border-dezo-border">
              <h4 className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold mb-3">
                Basic Requirements for this Track:
              </h4>
              <ul className="space-y-2 text-xs font-mono text-dezo-text-secondary mb-4">
                {selectedTrack.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-dezo-ink font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold mb-2 flex items-center gap-1.5">
                <Wrench size={13} /> Tools You’ll Use (Free / Standard)
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedTrack.relevantTools.map((tool, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-dezo-bg border border-dezo-border text-xs font-mono text-dezo-ink">
                    {tool}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-dezo-border">
                <span className="font-mono text-[11px] uppercase tracking-wider text-dezo-text-muted block mb-1">
                  Potential Career Progression:
                </span>
                <span className="font-mono text-xs font-bold text-dezo-primary">
                  {selectedTrack.possibleProgression}
                </span>
              </div>
            </div>

            {/* Note on Software */}
            <div className="p-4 bg-dezo-bg border border-dezo-ink text-[11px] font-mono text-dezo-text-muted">
              <strong>Free Software Guarantee:</strong> All fundamental training exercises utilize free, open-source, or
              standard web tools. You will never be asked to purchase paid software subscriptions to complete assignments.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

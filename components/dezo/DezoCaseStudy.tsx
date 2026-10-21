'use client';

import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '@/content/projects';
import { DezoHoverLift } from '@/lib/motion/MotionAdapter';
import { cleanHost } from './LiveSitePreview';
import { WorkSitePreview } from './WorkSitePreview';

interface DezoCaseStudyProps {
  project: ProjectItem;
  className?: string;
}

export function DezoCaseStudy({ project, className = '' }: DezoCaseStudyProps) {
  const isClickable = project.url && project.url !== '#';
  const host = cleanHost(project.url);

  return (
    <DezoHoverLift className={className}>
      <article className="group relative flex flex-col justify-between h-full rounded-none bg-white border-2 border-dezo-ink p-5 sm:p-6 shadow-[4px_4px_0_0_#0B0B0A] hover:shadow-[7px_7px_0_0_#B08D57] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
        <div>
          {/* Browser frame preview container */}
          <div className="relative w-full h-48 sm:h-56 mb-5 rounded-none overflow-hidden bg-white border-2 border-dezo-ink shadow-[2px_2px_0_0_#0B0B0A]">
            <WorkSitePreview url={project.url} title={project.title} pan="none" />
            {project.isLive && (
              <span className="absolute top-9 left-2 z-20 inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-600 text-white px-2 py-0.5 rounded-none shadow-[2px_2px_0_0_#0B0B0A]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                VERIFIED LIVE
              </span>
            )}
          </div>

          {/* Category Tag & Result Metric */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-dezo-ink bg-dezo-primary/20 border border-dezo-primary/60 px-2 py-0.5 rounded-none">
              {project.category}
            </span>
            {project.metric && (
              <span className="font-mono text-[10px] font-bold text-dezo-primary text-right line-clamp-1">
                {project.metric}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Clean Domain Anchor */}
          <p className="text-xs font-mono text-dezo-text-muted mt-1.5 truncate">
            https://{host}
          </p>

          {/* Optional Short Description */}
          {project.description && (
            <p className="text-xs text-dezo-text-secondary mt-2.5 line-clamp-2 leading-relaxed border-l-2 border-dezo-ink/20 pl-2.5">
              {project.description}
            </p>
          )}
        </div>

        {/* Card Footer with Direct External Link */}
        <div className="mt-5 pt-4 border-t-2 border-dezo-ink/10 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary transition-colors">
            Visit Production //
          </span>
          {isClickable ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live site of ${project.title}`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-none bg-white border-2 border-dezo-ink text-dezo-ink group-hover:text-white group-hover:bg-dezo-primary group-hover:border-dezo-primary shadow-[2px_2px_0_0_#0B0B0A] transition-all"
            >
              <ExternalLink size={14} />
            </a>
          ) : (
            <span className="font-mono text-xs text-dezo-text-muted">Archive</span>
          )}
        </div>
      </article>
    </DezoHoverLift>
  );
}

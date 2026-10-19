'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
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

  return (
    <DezoHoverLift className={className}>
      <article className="group relative flex flex-col justify-between h-full rounded-none bg-white border-2 border-dezo-ink p-5 sm:p-6 shadow-[4px_4px_0_0_#0B0B0A] hover:shadow-[6px_6px_0_0_#B08D57] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
        <div>
          <div className="relative w-full h-44 sm:h-52 mb-5 rounded-none overflow-hidden bg-dezo-bg-warm border-2 border-dezo-ink">
            <WorkSitePreview url={project.url} title={project.title} pan="auto" />
            {project.isLive && (
              <span className="absolute top-2 left-2 z-20 text-[9px] font-mono font-bold uppercase tracking-widest bg-dezo-ink text-white px-2 py-0.5 rounded-none border border-white/20">
                LIVE
              </span>
            )}
          </div>

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

          <h3 className="font-display text-xl font-bold tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-xs font-mono text-dezo-text-muted mt-1.5 truncate">
            {cleanHost(project.url)}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t-2 border-dezo-ink/10 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary transition-colors">
            View Live //
          </span>
          {isClickable ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live site of ${project.title}`}
              className="w-8 h-8 rounded-none bg-white border-2 border-dezo-ink flex items-center justify-center text-dezo-ink group-hover:text-white group-hover:bg-dezo-primary group-hover:border-dezo-primary shadow-[2px_2px_0_0_#0B0B0A] transition-all"
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

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProjectItem } from '@/content/projects';
import { DezoHoverLift } from '@/lib/motion/MotionAdapter';

interface DezoCaseStudyProps {
  project: ProjectItem;
  className?: string;
}

export function DezoCaseStudy({ project, className = '' }: DezoCaseStudyProps) {
  const cleanUrl = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const isClickable = project.url && project.url !== '#';

  return (
    <DezoHoverLift className={className}>
      <article className="group relative flex flex-col justify-between h-full rounded-dezo-lg bg-dezo-surface border border-dezo-border p-5 sm:p-6 transition-colors duration-200 hover:border-dezo-primary/35">
        <div>
          <div className="relative w-full h-44 sm:h-52 mb-5 rounded-dezo-md overflow-hidden bg-dezo-bg-warm border border-dezo-border/60">
            <img
              src={`https://image.thum.io/get/width/900/crop/650/noanimate/${project.url}`}
              alt={`${project.title} live website preview`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {project.isLive && (
              <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-dezo-primary px-2 py-0.5 rounded-dezo-sm">
                Live
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-dezo-primary bg-dezo-accent-soft px-2 py-1 rounded-dezo-sm">
              {project.category}
            </span>
            {project.metric && (
              <span className="text-[10px] font-semibold text-dezo-text-muted text-right line-clamp-1">
                {project.metric}
              </span>
            )}
          </div>

          <h3 className="font-display text-lg font-bold tracking-tight text-dezo-text-primary group-hover:text-dezo-primary transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-xs font-mono text-dezo-text-muted mt-1 truncate">{cleanUrl}</p>
        </div>

        <div className="mt-5 pt-4 border-t border-dezo-border flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-dezo-text-secondary group-hover:text-dezo-text-primary transition-colors">
            View live
          </span>
          {isClickable ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live site of ${project.title}`}
              className="w-8 h-8 rounded-dezo-md bg-dezo-bg border border-dezo-border flex items-center justify-center text-dezo-text-muted group-hover:text-white group-hover:bg-dezo-primary group-hover:border-dezo-primary transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          ) : (
            <span className="text-xs text-dezo-text-muted">Showcase</span>
          )}
        </div>
      </article>
    </DezoHoverLift>
  );
}

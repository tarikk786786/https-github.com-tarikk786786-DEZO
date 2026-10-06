import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProjectItem } from '@/content/projects';

interface DezoCaseStudyProps {
  project: ProjectItem;
  className?: string;
}

export function DezoCaseStudy({ project, className = '' }: DezoCaseStudyProps) {
  const cleanUrl = project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const isClickable = project.url && project.url !== '#';

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-dezo-lg bg-dezo-surface border border-dezo-border p-6 transition-all duration-300 hover:border-dezo-primary/40 hover:bg-dezo-surface-hover hover:-translate-y-1 ${className}`}
    >
      <div>
        {/* Preview Thumbnail Container */}
        <div className="relative w-full h-44 sm:h-48 mb-6 rounded-dezo-md overflow-hidden bg-dezo-surface-elevated border border-dezo-border/60">
          <img
            src={`https://image.thum.io/get/width/800/crop/600/${project.url}`}
            alt={`${project.title} live website preview`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dezo-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Metadata Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-dezo-accent bg-dezo-surface-elevated px-2.5 py-1 rounded-full border border-dezo-border">
            {project.category}
          </span>
          {project.metric && (
            <span className="text-[10px] font-bold text-dezo-success bg-dezo-success/10 px-2 py-0.5 rounded-full">
              {project.metric}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-dezo-text-primary group-hover:text-dezo-accent transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Clean Domain */}
        <p className="text-xs font-mono text-dezo-text-muted mt-1 truncate">
          {cleanUrl}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-dezo-border/60 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-dezo-text-secondary group-hover:text-dezo-text-primary transition-colors">
          View Live Website
        </span>
        {isClickable ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit live site of ${project.title}`}
            className="w-8 h-8 rounded-full bg-dezo-surface-elevated border border-dezo-border flex items-center justify-center text-dezo-text-muted group-hover:text-white group-hover:bg-dezo-primary group-hover:border-dezo-primary transition-all duration-300"
          >
            <ExternalLink size={14} />
          </a>
        ) : (
          <span className="text-xs text-dezo-text-muted">Showcase</span>
        )}
      </div>
    </article>
  );
}

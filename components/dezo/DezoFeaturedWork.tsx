'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '@/content/projects';
import { DezoStagger, DezoStaggerItem, DezoHoverLift } from '@/lib/motion/MotionAdapter';
import { DezoButton } from './DezoButton';
import { cleanHost } from './LiveSitePreview';
import { WorkSitePreview } from './WorkSitePreview';

export function DezoFeaturedWork({
  projects,
}: {
  projects: ProjectItem[];
}) {
  if (!projects.length) return null;

  const [lead, ...rest] = projects;

  return (
    <div className="w-full flex flex-col gap-8 lg:gap-10">
      <DezoHoverLift>
        <a
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden border-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A] hover:shadow-[8px_8px_0_0_#B08D57] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px] lg:min-h-[420px]">
            <div className="lg:col-span-7 relative bg-dezo-bg-warm overflow-hidden min-h-[260px] border-b-2 lg:border-b-0 lg:border-r-2 border-dezo-ink">
              <WorkSitePreview url={lead.url} title={lead.title} eager pan="auto" />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center p-8 sm:p-11 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-dezo-ink px-2.5 py-1 shadow-[2px_2px_0_0_#B08D57]">
                  FEATURED // {lead.category}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-black text-dezo-text-primary tracking-tight group-hover:text-dezo-primary transition-colors">
                {lead.title}
              </h3>
              {lead.description && (
                <p className="text-sm text-dezo-text-secondary leading-relaxed border-l-2 border-dezo-primary pl-3">
                  {lead.description}
                </p>
              )}
              <p className="font-mono text-xs font-bold text-dezo-text-muted">{cleanHost(lead.url)}</p>
              {lead.metric && (
                <p className="font-mono text-xs font-bold text-dezo-primary bg-dezo-bg-warm p-2 border border-dezo-border">
                  PROVEN RESULT: {lead.metric}
                </p>
              )}
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary mt-2">
                Visit Live Production Website{' '}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </div>
          </div>
        </a>
      </DezoHoverLift>

      {rest.length > 0 && (
        <DezoStagger className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.1}>
          {rest.map((project) => (
            <DezoStaggerItem key={project.url}>
              <DezoHoverLift>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full overflow-hidden border-2 border-dezo-ink bg-white shadow-[4px_4px_0_0_#0B0B0A] hover:shadow-[6px_6px_0_0_#B08D57] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-dezo-bg-warm border-b-2 border-dezo-ink">
                    <WorkSitePreview url={project.url} title={project.title} pan="auto" />
                  </div>
                  <div className="flex flex-col flex-1 p-6 gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dezo-ink bg-dezo-primary/20 border border-dezo-primary px-2 py-0.5">
                        {project.category}
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-dezo-text-muted group-hover:text-dezo-primary transition-colors"
                      />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-dezo-text-muted truncate">
                      {cleanHost(project.url)}
                    </p>
                    {project.metric && (
                      <p className="font-mono text-xs font-semibold text-dezo-primary mt-auto pt-2 border-t border-dezo-border">
                        {project.metric}
                      </p>
                    )}
                  </div>
                </a>
              </DezoHoverLift>
            </DezoStaggerItem>
          ))}
        </DezoStagger>
      )}

      <div className="flex justify-center pt-2">
        <DezoButton href="/work" variant="outline" size="md" icon={<ArrowUpRight size={16} />}>
          Browse full live archive
        </DezoButton>
      </div>
    </div>
  );
}

export function DezoCaseStudyStrip({
  studies,
}: {
  studies: Array<{
    title: string;
    industry: string;
    challenge: string;
    result: string;
    url: string;
    stack: readonly string[] | string[];
  }>;
}) {
  return (
    <DezoStagger className="grid grid-cols-1 lg:grid-cols-2 gap-6" stagger={0.09}>
      {studies.map((study) => (
        <DezoStaggerItem key={study.title}>
          <DezoHoverLift>
            <article className="flex flex-col h-full overflow-hidden rounded-dezo-lg border border-dezo-border bg-dezo-surface">
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-44 sm:h-52 overflow-hidden bg-dezo-bg-warm group"
              >
                <WorkSitePreview url={study.url} title={study.title} pan="auto" />
                <span className="absolute top-3 left-3 z-20 text-[10px] font-semibold uppercase tracking-wider bg-dezo-surface/95 text-dezo-primary border border-dezo-border px-2 py-0.5">
                  Live case study
                </span>
              </a>
              <div className="flex flex-col flex-1 gap-3 p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-dezo-text-muted">
                  {study.industry}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-dezo-text-primary">
                  {study.title}
                </h3>
                <dl className="grid gap-2.5 text-sm">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-dezo-text-muted mb-0.5">
                      Challenge
                    </dt>
                    <dd className="text-dezo-text-secondary leading-relaxed">{study.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-dezo-text-muted mb-0.5">
                      Result
                    </dt>
                    <dd className="text-dezo-text-secondary leading-relaxed">{study.result}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {study.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-0.5 bg-dezo-accent-soft text-dezo-primary rounded-dezo-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary hover:underline mt-auto pt-2"
                >
                  View live site <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          </DezoHoverLift>
        </DezoStaggerItem>
      ))}
    </DezoStagger>
  );
}

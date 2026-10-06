'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '@/content/projects';
import { DezoStagger, DezoStaggerItem, DezoHoverLift } from '@/lib/motion/MotionAdapter';
import { DezoButton } from './DezoButton';

function previewUrl(url: string, width = 1200, crop = 750) {
  return `https://image.thum.io/get/width/${width}/crop/${crop}/noanimate/${url}`;
}

function cleanHost(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function DezoFeaturedWork({
  projects,
}: {
  projects: ProjectItem[];
}) {
  if (!projects.length) return null;

  const [lead, ...rest] = projects;

  return (
    <div className="w-full flex flex-col gap-8 lg:gap-10">
      {/* Lead featured — large live preview */}
      <DezoHoverLift>
        <a
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-dezo-xl overflow-hidden border border-dezo-border bg-dezo-surface shadow-dezo-soft"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px] lg:min-h-[380px]">
            <div className="lg:col-span-7 relative bg-dezo-bg-warm overflow-hidden min-h-[220px]">
              <img
                src={previewUrl(lead.url, 1400, 900)}
                alt={`${lead.title} live website`}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dezo-ink/25 via-transparent to-transparent opacity-60" />
              <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-dezo-primary px-2.5 py-1 rounded-dezo-sm">
                Live site
              </span>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center p-7 sm:p-10 gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary">
                Featured · {lead.category}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-dezo-text-primary tracking-tight group-hover:text-dezo-primary transition-colors">
                {lead.title}
              </h3>
              {lead.description && (
                <p className="text-sm text-dezo-text-secondary leading-relaxed">
                  {lead.description}
                </p>
              )}
              <p className="font-mono text-xs text-dezo-text-muted">{cleanHost(lead.url)}</p>
              {lead.metric && (
                <p className="text-sm font-medium text-dezo-text-primary">{lead.metric}</p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-dezo-primary mt-2">
                Visit live website <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </a>
      </DezoHoverLift>

      {/* Secondary featured grid */}
      {rest.length > 0 && (
        <DezoStagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
          {rest.map((project) => (
            <DezoStaggerItem key={project.url}>
              <DezoHoverLift>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full rounded-dezo-lg overflow-hidden border border-dezo-border bg-dezo-surface"
                >
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-dezo-bg-warm">
                    <img
                      src={previewUrl(project.url)}
                      alt={`${project.title} live preview`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-dezo-primary px-2 py-0.5 rounded-dezo-sm">
                      Live
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5 sm:p-6 gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-dezo-text-muted">
                        {project.category}
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-dezo-text-muted group-hover:text-dezo-primary transition-colors"
                      />
                    </div>
                    <h3 className="font-display text-xl font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[11px] text-dezo-text-muted truncate">
                      {cleanHost(project.url)}
                    </p>
                    {project.metric && (
                      <p className="text-xs text-dezo-text-secondary mt-auto pt-2">
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
                <img
                  src={previewUrl(study.url)}
                  alt={`${study.title} live website`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-dezo-primary px-2 py-0.5 rounded-dezo-sm">
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

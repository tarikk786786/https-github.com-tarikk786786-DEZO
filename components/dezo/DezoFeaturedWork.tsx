'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
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
      {/* Lead Showcase Hero Card */}
      <DezoHoverLift>
        <div className="group block overflow-hidden border-2 border-dezo-ink bg-white shadow-[6px_6px_0_0_#0B0B0A] hover:shadow-[8px_8px_0_0_#B08D57] transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px] lg:min-h-[440px]">
            {/* Live website preview pane */}
            <div className="lg:col-span-7 relative bg-[#FAF8F5] overflow-hidden min-h-[300px] border-b-2 lg:border-b-0 lg:border-r-2 border-dezo-ink">
              <WorkSitePreview url={lead.url} title={lead.title} eager pan="none" />
              <div className="absolute top-10 left-3 z-20 inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest bg-emerald-600 text-white px-2.5 py-1 shadow-[2px_2px_0_0_#0B0B0A]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                VERIFIED PRODUCTION STOREFRONT
              </div>
            </div>

            {/* Case study metadata pane */}
            <div className="lg:col-span-5 flex flex-col justify-center p-8 sm:p-11 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-dezo-ink px-2.5 py-1 shadow-[2px_2px_0_0_#B08D57]">
                  FEATURED CASE // {lead.category}
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-dezo-text-primary tracking-tight group-hover:text-dezo-primary transition-colors">
                {lead.title}
              </h3>
              {lead.description && (
                <p className="text-sm text-dezo-text-secondary leading-relaxed border-l-2 border-dezo-primary pl-3.5">
                  {lead.description}
                </p>
              )}
              <p className="font-mono text-xs font-bold text-dezo-text-muted">
                https://{cleanHost(lead.url)}
              </p>
              {lead.metric && (
                <div className="font-mono text-xs font-bold text-dezo-primary bg-dezo-bg-warm p-3 border border-dezo-border flex items-center gap-2">
                  <Zap size={14} className="shrink-0 text-dezo-primary" />
                  <span>PROVEN RESULT: {lead.metric}</span>
                </div>
              )}
              <div className="pt-2">
                <a
                  href={lead.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink group-hover:text-dezo-primary transition-colors border-2 border-dezo-ink bg-white px-4 py-2.5 shadow-[3px_3px_0_0_#0B0B0A] hover:shadow-[3px_3px_0_0_#B08D57]"
                >
                  Visit Live Production Website{' '}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DezoHoverLift>

      {/* Supporting Featured Case Studies */}
      {rest.length > 0 && (
        <DezoStagger className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.08}>
          {rest.map((project) => (
            <DezoStaggerItem key={project.url}>
              <DezoHoverLift>
                <div className="group flex flex-col h-full overflow-hidden border-2 border-dezo-ink bg-white shadow-[4px_4px_0_0_#0B0B0A] hover:shadow-[6px_6px_0_0_#B08D57] transition-all">
                  <div className="relative h-60 sm:h-72 overflow-hidden bg-[#FAF8F5] border-b-2 border-dezo-ink">
                    <WorkSitePreview url={project.url} title={project.title} pan="none" />
                    <span className="absolute top-10 left-3 z-20 inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider bg-dezo-ink text-white px-2 py-0.5 shadow-[2px_2px_0_0_#B08D57]">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6 sm:p-7 gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dezo-text-muted">
                        PRODUCTION DEPLOYMENT
                      </span>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live site of ${project.title}`}
                        className="text-dezo-text-muted hover:text-dezo-primary transition-colors p-1"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-dezo-text-primary group-hover:text-dezo-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-dezo-text-muted truncate">
                      https://{cleanHost(project.url)}
                    </p>
                    {project.description && (
                      <p className="text-xs text-dezo-text-secondary leading-relaxed border-l-2 border-dezo-ink/15 pl-2.5 my-1">
                        {project.description}
                      </p>
                    )}
                    {project.metric && (
                      <p className="font-mono text-xs font-semibold text-dezo-primary mt-auto pt-3 border-t border-dezo-border">
                        PROVEN RESULT: {project.metric}
                      </p>
                    )}
                  </div>
                </div>
              </DezoHoverLift>
            </DezoStaggerItem>
          ))}
        </DezoStagger>
      )}

      {/* Link to Archive */}
      <div className="flex justify-center pt-4">
        <DezoButton href="/work#archive" variant="outline" size="lg" icon={<ArrowUpRight size={16} />}>
          Browse Full 181+ Live Archive
        </DezoButton>
      </div>
    </div>
  );
}

import React from 'react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoReveal } from '@/lib/motion/MotionAdapter';
import { accountabilityDemo } from '@/content/promises';

export function AccountabilityPreview() {
  const { deliverables, completedPercent, pendingApproval, inProgress } = accountabilityDemo;

  return (
    <DezoSection spacing="normal">
      <DezoContainer size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <DezoReveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dezo-primary mb-3">
                Accountability
              </p>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-dezo-text-primary leading-[1.12]">
                Work status you can actually read
              </h2>
              <p className="mt-5 text-sm text-dezo-text-secondary leading-relaxed max-w-md">
                {accountabilityDemo.disclaimer}
              </p>
            </DezoReveal>
          </div>
          <div className="lg:col-span-7">
            <div
              className="border border-dezo-border bg-dezo-surface p-6 sm:p-8"
              role="img"
              aria-label="Sample project status panel with illustrative data"
            >
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-dezo-border">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dezo-text-muted">
                    {accountabilityDemo.label}
                  </p>
                  <p className="font-display text-xl text-dezo-text-primary mt-1">
                    {accountabilityDemo.projectName}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-dezo-primary border border-dezo-border px-2 py-1">
                  SAMPLE
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="text-dezo-text-muted text-xs uppercase tracking-wider mb-1">
                    Deliverables
                  </dt>
                  <dd className="font-display text-2xl text-dezo-text-primary tabular-nums">
                    {deliverables.done} / {deliverables.total}
                  </dd>
                </div>
                <div>
                  <dt className="text-dezo-text-muted text-xs uppercase tracking-wider mb-1">
                    Completed
                  </dt>
                  <dd className="font-display text-2xl text-dezo-text-primary tabular-nums">
                    {completedPercent}%
                  </dd>
                </div>
                <div>
                  <dt className="text-dezo-text-muted text-xs uppercase tracking-wider mb-1">
                    Pending approval
                  </dt>
                  <dd className="font-display text-2xl text-dezo-text-primary tabular-nums">
                    {pendingApproval}
                  </dd>
                </div>
                <div>
                  <dt className="text-dezo-text-muted text-xs uppercase tracking-wider mb-1">
                    In progress
                  </dt>
                  <dd className="font-display text-2xl text-dezo-text-primary tabular-nums">
                    {inProgress}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 pt-5 border-t border-dezo-border grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-dezo-text-muted uppercase tracking-wider mb-1">
                    Last update
                  </p>
                  <p className="text-dezo-text-primary">{accountabilityDemo.lastUpdate}</p>
                </div>
                <div>
                  <p className="text-xs text-dezo-text-muted uppercase tracking-wider mb-1">
                    Next milestone
                  </p>
                  <p className="text-dezo-text-primary">{accountabilityDemo.nextMilestone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DezoContainer>
    </DezoSection>
  );
}

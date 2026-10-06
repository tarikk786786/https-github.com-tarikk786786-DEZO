import React from 'react';
import type { Metadata } from 'next';
import { Cpu, Terminal, Shield, Activity } from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoLabCanvas } from '@/components/dezo/DezoLabCanvas';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'DEZO LAB — Systems R&D',
  description:
    'Experimental playground exploring distributed networks, forensic web telemetry, and high-assurance real-time visualizations.',
  canonicalUrl: 'https://dezo.in/lab',
});

export default function LabPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-12">
            <DezoHeading
              badge="DEZO LAB"
              as="h1"
              subtitle="Where we stress-test new browser primitives, canvas telemetry, and distributed network architectures before bringing them into client production."
            >
              Interactive Systems & Research
            </DezoHeading>
          </div>

          {/* Interactive Canvas Demo */}
          <div className="mb-16">
            <DezoLabCanvas />
          </div>

          {/* Research Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DezoCard interactive={false}>
              <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                <Cpu size={20} />
              </div>
              <h3 className="text-lg font-bold text-dezo-text-primary mb-2">
                Sub-Millisecond Rendering
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed">
                Profiling browser compositing layers and off-main-thread Web Workers to achieve 120fps motion while keeping CPU idle time above 85%.
              </p>
            </DezoCard>

            <DezoCard interactive={false}>
              <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-bold text-dezo-text-primary mb-2">
                Forensic Web Telemetry
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed">
                Applying forensic security analysis to client-side inputs, bot detection, and tamper-evident event logging without violating end-user privacy.
              </p>
            </DezoCard>

            <DezoCard interactive={false}>
              <div className="w-10 h-10 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-4">
                <Activity size={20} />
              </div>
              <h3 className="text-lg font-bold text-dezo-text-primary mb-2">
                Predictive Load Pipelines
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed">
                Pre-fetching and warming network routes based on user cursor velocity and viewport intent vectors to render next pages instantaneously.
              </p>
            </DezoCard>
          </div>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

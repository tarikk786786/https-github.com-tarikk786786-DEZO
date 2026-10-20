import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CAREERS_CONFIG,
  INTERNSHIP_TIMELINE,
  SERVICE_TRAINING_AREAS,
  HIRING_PROCESS_STEPS,
  CAREERS_FAQS,
  generateCareersWhatsAppUrl,
} from '@/content/careers';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { CareerTrackExplorer } from '@/components/dezo/careers/CareerTrackExplorer';
import { CareersApplicationForm } from '@/components/dezo/careers/CareersApplicationForm';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateFaqSchema } from '@/lib/seo/jsonld';
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Laptop,
  Wifi,
  Users,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Careers at DEZO | Digital Marketing Internship in Odisha',
  description:
    'Explore digital marketing internship and work-from-home-first career opportunities at DEZO in Odisha. Learn through guided tasks, practical training and performance-based career opportunities.',
  canonicalUrl: 'https://dezo.in/careers',
});

export default function CareersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
  ]);

  const faqSchema = generateFaqSchema(
    CAREERS_FAQS.map((f) => ({ question: f.q, answer: f.a }))
  );

  const defaultWhatsAppDataUrl = generateCareersWhatsAppUrl('General Trainee Pathway');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-dezo-bg-warm border-b-2 border-dezo-ink pt-32 pb-16">
        <DezoContainer size="wide">
          <div className="max-w-4xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dezo-primary/20 border border-dezo-ink text-xs font-mono uppercase tracking-wider text-dezo-ink mb-6">
              <span className="w-2 h-2 bg-dezo-primary rounded-full animate-pulse" />
              <span>Digital Marketing Trainee &amp; Guided Internship Pathway</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-dezo-ink tracking-tight uppercase leading-[0.95]">
              {CAREERS_CONFIG.headline}
            </h1>
            <p className="mt-4 text-lg sm:text-2xl font-mono text-dezo-primary font-bold">
              {CAREERS_CONFIG.supportingHeadline}
            </p>
            <p className="mt-6 text-base sm:text-lg text-dezo-text-secondary leading-relaxed max-w-3xl">
              {CAREERS_CONFIG.heroCopy}
            </p>

            {/* Concise Information Chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CAREERS_CONFIG.chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-dezo-bg border-2 border-dezo-ink font-mono text-xs font-bold text-dezo-ink shadow-[2px_2px_0_0_#0B0B0A]"
                >
                  ✓ {chip}
                </span>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={defaultWhatsAppDataUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-emerald-700 transition-all shadow-[4px_4px_0_0_#0B0B0A] inline-flex items-center gap-2"
              >
                <MessageSquare size={16} /> Apply on WhatsApp <ExternalLink size={14} />
              </a>
              <a
                href="#internship"
                className="px-8 py-4 bg-dezo-bg text-dezo-ink font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-bg-warm transition-all shadow-[4px_4px_0_0_#0B0B0A] inline-flex items-center gap-2"
              >
                Explore the Internship <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </DezoContainer>
      </section>

      {/* Eligibility & Remote-First Work Model Grid */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 cols: Basic Eligibility */}
            <div className="lg:col-span-6 bg-dezo-bg-warm border-2 border-dezo-ink p-7 sm:p-9 shadow-[4px_4px_0_0_#0B0B0A] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold block mb-2">
                  Criteria
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink mb-6">
                  Who Can Apply (Basic Eligibility)
                </h2>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex items-start gap-3 bg-dezo-bg p-3.5 border border-dezo-border">
                    <CheckCircle2 size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-dezo-ink block">Minimum Qualification:</strong>
                      <span className="text-dezo-text-secondary">{CAREERS_CONFIG.eligibility.education}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-dezo-bg p-3.5 border border-dezo-border">
                    <CheckCircle2 size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-dezo-ink block">Age Range:</strong>
                      <span className="text-dezo-text-secondary">{CAREERS_CONFIG.eligibility.ageRange}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-dezo-bg p-3.5 border border-dezo-border">
                    <CheckCircle2 size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-dezo-ink block">Diversity &amp; Inclusivity:</strong>
                      <span className="text-dezo-text-secondary">{CAREERS_CONFIG.eligibility.gender}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-dezo-bg p-3.5 border border-dezo-border">
                    <Laptop size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-dezo-ink block">Hardware Setup:</strong>
                      <span className="text-dezo-text-secondary">{CAREERS_CONFIG.eligibility.hardware}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-dezo-bg p-3.5 border border-dezo-border">
                    <Wifi size={16} className="text-dezo-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-dezo-ink block">Internet Connectivity:</strong>
                      <span className="text-dezo-text-secondary">{CAREERS_CONFIG.eligibility.internet}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dezo-ink/15 text-[11px] font-mono text-dezo-text-muted">
                <strong>No Experience Needed:</strong> Prior digital marketing experience is NOT mandatory for our trainee
                pathway. We look for curiosity, reliability, and communication.
              </div>
            </div>

            {/* Right 6 cols: Work Model Transparency */}
            <div className="lg:col-span-6 bg-dezo-bg-warm border-2 border-dezo-ink p-7 sm:p-9 shadow-[4px_4px_0_0_#0B0B0A] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold block mb-2">
                  Operating Model
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-dezo-ink mb-6">
                  Transparent Working Arrangement
                </h2>

                <div className="space-y-5 text-xs font-mono">
                  <div className="p-4 bg-dezo-bg border-2 border-dezo-ink">
                    <span className="font-bold text-dezo-primary uppercase block mb-1">
                      1. Remote-First / Work From Home
                    </span>
                    <p className="text-dezo-text-secondary leading-relaxed">
                      {CAREERS_CONFIG.workModel.primaryDesc}
                    </p>
                  </div>

                  <div className="p-4 bg-dezo-bg border-2 border-dezo-ink">
                    <span className="font-bold text-dezo-ink uppercase block mb-1">
                      2. Occasional In-Person Collaboration
                    </span>
                    <p className="text-dezo-text-secondary leading-relaxed">
                      {CAREERS_CONFIG.workModel.occasionalDesc}
                    </p>
                  </div>

                  <div className="p-4 bg-dezo-bg border border-dezo-border">
                    <span className="font-bold text-dezo-text-muted uppercase block mb-1">
                      3. Working Hours &amp; Communication
                    </span>
                    <p className="text-dezo-text-secondary leading-relaxed">
                      {CAREERS_CONFIG.workModel.hoursExpectation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dezo-ink/15 text-[11px] font-mono text-dezo-text-muted flex items-center gap-1.5">
                <MapPin size={13} className="text-dezo-primary" />
                <span>Founding Studio: Phase 2, Patia, Bhubaneswar, Odisha</span>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 4-Week Internship Timeline */}
      <DezoSection id="internship" spacing="normal" className="bg-dezo-bg-warm border-y-2 border-dezo-ink">
        <DezoContainer size="wide">
          <DezoHeading
            badge="Curriculum"
            as="h2"
            subtitle="Four structured weeks of practical exercises, tool walkthroughs, and constructive mentor feedback."
          >
            The One-Month Internship &amp; Training
          </DezoHeading>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTERNSHIP_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[4px_4px_0_0_#0B0B0A] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-dezo-border">
                    <span className="font-mono text-xs font-bold text-dezo-primary">{item.week}</span>
                    <Clock size={14} className="text-dezo-text-muted" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-dezo-ink mb-2">{item.title}</h3>
                  <p className="text-xs font-mono text-dezo-text-secondary leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-dezo-border">
                    {item.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="text-[11px] font-mono text-dezo-text-secondary flex items-start gap-1.5">
                        <span className="text-dezo-primary font-bold">›</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Prominent Disclosure Banner */}
          <div className="mt-10 p-5 bg-dezo-bg border-2 border-dezo-ink shadow-[3px_3px_0_0_#0B0B0A] flex items-start gap-3">
            <AlertCircle size={18} className="text-dezo-primary shrink-0 mt-0.5" />
            <div className="text-xs font-mono text-dezo-text-secondary leading-relaxed">
              <strong className="text-dezo-ink uppercase block mb-1">Clear Terms &amp; Expectations Disclosure:</strong>
              {CAREERS_CONFIG.compensationPolicy.disclaimer}
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Services Training Syllabus */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <DezoHeading
            badge="Service Ecosystem"
            as="h2"
            subtitle="You will be exposed to DEZO's complete digital growth infrastructure."
          >
            Skills &amp; Service Training Areas
          </DezoHeading>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_TRAINING_AREAS.map((area, idx) => (
              <div
                key={idx}
                className="bg-dezo-bg-warm border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A]"
              >
                <span className="font-mono text-[10px] uppercase font-bold text-dezo-primary block mb-2">
                  [Track 0{idx + 1}]
                </span>
                <h3 className="font-display text-lg font-bold text-dezo-ink mb-3 pb-2 border-b border-dezo-border">
                  {area.category}
                </h3>
                <ul className="space-y-1.5 text-xs font-mono text-dezo-text-secondary">
                  {area.topics.map((t, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-dezo-ink rounded-full" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Interactive Career Learning Tracks Explorer */}
      <DezoSection spacing="normal" className="bg-dezo-surface border-y-2 border-dezo-ink">
        <DezoContainer size="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <DezoHeading
              badge="Tracks"
              as="h2"
              subtitle="Choose the specific area of digital marketing you are most excited to develop."
            >
              Career Pathways &amp; Learning Tracks
            </DezoHeading>
            <span className="font-mono text-xs text-dezo-text-muted">
              11 specialized tracks available
            </span>
          </div>

          <CareerTrackExplorer />
        </DezoContainer>
      </DezoSection>

      {/* Transparent Compensation Section */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <div className="bg-dezo-ink text-dezo-bg border-2 border-dezo-ink p-8 sm:p-12 shadow-[6px_6px_0_0_#B08D57]">
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary block mb-2 font-bold">
                Standards &amp; Accountability
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white mb-6">
                {CAREERS_CONFIG.compensationPolicy.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-mono leading-relaxed whitespace-pre-line mb-8">
                {CAREERS_CONFIG.compensationPolicy.statement}
              </p>

              <div className="p-4 bg-white/10 border border-white/20 text-xs font-mono text-dezo-primary font-bold flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>{CAREERS_CONFIG.compensationPolicy.noFeesNote}</span>
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* 5-Step Recruitment Process */}
      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-y-2 border-dezo-ink">
        <DezoContainer size="wide">
          <DezoHeading
            badge="Hiring Process"
            as="h2"
            subtitle="Straightforward 5-step journey from application to potential engagement."
          >
            How the Hiring Process Works
          </DezoHeading>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {HIRING_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-dezo-bg border-2 border-dezo-ink p-5 shadow-[3px_3px_0_0_#0B0B0A] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-dezo-primary block mb-2">
                    STEP // {step.step}
                  </span>
                  <h3 className="font-display text-base font-bold text-dezo-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-dezo-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Application Form Section (Option A: WhatsApp, Option B: Form) */}
      <DezoSection spacing="normal" className="bg-dezo-bg">
        <DezoContainer size="wide">
          <CareersApplicationForm />
        </DezoContainer>
      </DezoSection>

      {/* Comprehensive FAQs Section (18 Questions) */}
      <DezoSection spacing="normal" className="bg-dezo-bg-warm border-t-2 border-dezo-ink">
        <DezoContainer size="default">
          <DezoHeading
            badge="Honest FAQs"
            as="h2"
            subtitle="Clear, candid answers regarding training, compensation, work model, and applications."
          >
            Frequently Asked Questions
          </DezoHeading>

          <div className="mt-10 space-y-4">
            {CAREERS_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-dezo-bg border-2 border-dezo-ink p-6 shadow-[3px_3px_0_0_#0B0B0A]"
              >
                <h3 className="font-display text-lg font-bold text-dezo-ink flex items-start gap-2.5">
                  <span className="font-mono text-dezo-primary font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-3 text-sm text-dezo-text-secondary leading-relaxed pl-6 border-l-2 border-dezo-primary/40 font-mono">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* Bottom Sticky-style Recruitment CTA */}
      <section className="bg-emerald-700 text-white border-t-2 border-dezo-ink py-16">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-200 block mb-2 font-bold">
                Applications open year-round
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                Start Your One-Month Internship
              </h2>
              <p className="mt-3 text-sm text-emerald-100 leading-relaxed font-mono">
                Click below to open our official WhatsApp application chat (+91 9114411026). Remember to attach your
                CV manually before sending.
              </p>
            </div>
            <a
              href={defaultWhatsAppDataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-emerald-800 font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-emerald-50 transition-all shadow-[4px_4px_0_0_#0B0B0A] inline-flex items-center gap-2 shrink-0"
            >
              <MessageSquare size={16} /> Apply on WhatsApp Now <ExternalLink size={14} />
            </a>
          </div>
        </DezoContainer>
      </section>
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoButton } from '@/components/dezo/DezoButton';
import { constructMetadata } from '@/lib/seo/metadata';
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateSnapSolveSoftwareSchema,
} from '@/lib/seo/jsonld';

const DOWNLOAD_URL =
  'https://github.com/tarikk786786/https-github.com-tarikk786786-DEZO/raw/cursor/snapsolve-ai-extension-f701/snapsolve-ai/snapsolve-ai-extension.zip';

const FAQS = [
  {
    question: 'Is SnapSolve free?',
    answer:
      'Yes. SnapSolve Free includes free LLM routing (OpenRouter free models, Groq, Hugging Face, Ollama) and sample answers offline. SnapSolve Pro unlocks paid cloud providers and higher daily limits.',
  },
  {
    question: 'Which AI providers can I connect?',
    answer:
      'OpenAI, Google Gemini, Anthropic Claude, OpenRouter, Groq, Mistral, DeepSeek, Together, Fireworks, Cerebras, Cohere, Hugging Face, Ollama, LM Studio, and custom OpenAI-compatible endpoints.',
  },
  {
    question: 'Does SnapSolve watch my screen in the background?',
    answer:
      'No. Capture only runs when you click Capture or use a shortcut. Nothing is recorded while you browse normally.',
  },
  {
    question: 'Where are API keys stored?',
    answer:
      'Locally in Chrome extension storage, encrypted at rest. Keys are never injected into websites and are stripped from exports.',
  },
];

export const metadata: Metadata = constructMetadata({
  title: 'SnapSolve — Free AI Chrome Extension for Studying Questions',
  description:
    'SnapSolve captures on-screen questions and answers them with free LLMs or your connected AI (OpenAI, Gemini, Claude, Groq). Chrome extension by Tarik Islam — privacy-first study companion.',
  canonicalUrl: 'https://dezo.in/snapsolve',
});

export default function SnapSolvePage() {
  const softwareSchema = generateSnapSolveSoftwareSchema();
  const faqSchema = generateFaqSchema(FAQS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'SnapSolve', path: '/snapsolve' },
  ]);

  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <DezoSection spacing="compact">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-10">
            <DezoHeading
              badge="Chrome extension · Free LLM default"
              as="h1"
              subtitle="Capture a question from your screen. Study the answer. Connect every major AI provider — or start with a free model. Made by Tarik Islam."
            >
              SnapSolve
            </DezoHeading>
            <div className="mt-8 flex flex-wrap gap-3">
              <DezoButton href={DOWNLOAD_URL} size="lg">
                Download for Chrome
              </DezoButton>
              <DezoButton href="https://tarikislam.in/#snapsolve-pro" variant="outline" size="lg">
                SnapSolve Pro
              </DezoButton>
              <DezoButton href="https://tarikislam.in" variant="ghost" size="lg">
                tarikislam.in
              </DezoButton>
            </div>
            <p className="mt-4 text-xs text-dezo-text-secondary">
              Unzip → chrome://extensions → Developer mode → Load unpacked. Public zip from the open
              GitHub branch.
            </p>
          </div>

          <div className="dezo-section-rule mb-14" />

          <section className="mb-16" aria-labelledby="how-heading">
            <h2 id="how-heading" className="font-display text-2xl sm:text-3xl tracking-tight mb-4">
              How it works
            </h2>
            <ol className="grid gap-6 sm:grid-cols-3 text-sm text-dezo-text-secondary">
              <li>
                <p className="font-semibold text-dezo-text-primary mb-1">1. Capture</p>
                Select text, capture a region, or paste a question into the popup.
              </li>
              <li>
                <p className="font-semibold text-dezo-text-primary mb-1">2. Connect free AI</p>
                Default routing uses OpenRouter free LLMs. Or run Ollama locally — no paid API
                required.
              </li>
              <li>
                <p className="font-semibold text-dezo-text-primary mb-1">3. Study the answer</p>
                Step-by-step explanations in the workspace. Built for learning, not live exam
                cheating.
              </li>
            </ol>
          </section>

          <section className="mb-16" aria-labelledby="connect-heading">
            <h2 id="connect-heading" className="font-display text-2xl sm:text-3xl tracking-tight mb-4">
              Connect every AI in Settings
            </h2>
            <p className="text-sm text-dezo-text-secondary max-w-2xl mb-6">
              Sign in at the provider, create an API key, paste it under Settings → Connect AI. Free
              plan solves with free LLM hosts; Pro unlocks paid cloud providers.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-dezo-text-secondary">
              {[
                'OpenAI',
                'Gemini',
                'Claude',
                'OpenRouter',
                'Groq',
                'Mistral',
                'DeepSeek',
                'Together',
                'Fireworks',
                'Cerebras',
                'Cohere',
                'Hugging Face',
                'Ollama',
                'LM Studio',
                'Custom',
              ].map((name) => (
                <li key={name} className="border border-dezo-border px-3 py-1.5">
                  {name}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16 grid gap-8 md:grid-cols-2" aria-labelledby="plans-heading">
            <div>
              <h2 id="plans-heading" className="font-display text-2xl tracking-tight mb-3">
                Free
              </h2>
              <ul className="space-y-2 text-sm text-dezo-text-secondary list-disc pl-5">
                <li>Default free LLM (OpenRouter)</li>
                <li>Groq, Hugging Face, Ollama, LM Studio</li>
                <li>Sample answers offline</li>
                <li>8 solves per day</li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl tracking-tight mb-3">Pro</h2>
              <ul className="space-y-2 text-sm text-dezo-text-secondary list-disc pl-5">
                <li>OpenAI, Claude, Gemini, and other paid clouds</li>
                <li>Higher daily limits</li>
                <li>Second-model verification</li>
                <li>Custom endpoints · floating toolbar</li>
              </ul>
              <p className="mt-3 text-sm">
                <Link
                  href="https://tarikislam.in/#snapsolve-pro"
                  className="text-dezo-primary underline-offset-2 hover:underline"
                >
                  Get SnapSolve Pro
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-16" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-display text-2xl sm:text-3xl tracking-tight mb-6">
              FAQ
            </h2>
            <dl className="space-y-6 max-w-3xl">
              {FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-dezo-text-primary mb-1">{faq.question}</dt>
                  <dd className="text-sm text-dezo-text-secondary leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="border border-dezo-border p-6 sm:p-8 max-w-3xl">
            <h2 className="font-display text-xl tracking-tight mb-2">Public download</h2>
            <p className="text-sm text-dezo-text-secondary mb-4">
              Open-source packaging on GitHub. Privacy and security docs ship with the extension.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={DOWNLOAD_URL} className="text-dezo-primary hover:underline">
                snapsolve-ai-extension.zip
              </Link>
              <span className="text-dezo-text-secondary">·</span>
              <Link href="/privacy" className="text-dezo-primary hover:underline">
                Site privacy
              </Link>
              <span className="text-dezo-text-secondary">·</span>
              <a
                href="https://github.com/tarikk786786/https-github.com-tarikk786786-DEZO/tree/cursor/snapsolve-ai-extension-f701/snapsolve-ai"
                className="text-dezo-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source on GitHub
              </a>
            </div>
          </section>
        </DezoContainer>
      </DezoSection>
    </div>
  );
}

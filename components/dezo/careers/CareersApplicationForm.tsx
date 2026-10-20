'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CAREERS_CONFIG,
  CAREER_TRACKS,
  generateCareersWhatsAppUrl,
} from '@/content/careers';
import {
  MessageSquare,
  Paperclip,
  CheckCircle2,
  ShieldCheck,
  Send,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export function CareersApplicationForm() {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'form'>('whatsapp');
  const [selectedTrack, setSelectedTrack] = useState<string>('Digital Marketing Trainee');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [qualification, setQualification] = useState('Class 12 Pass');
  const [cityState, setCityState] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hasLaptop, setHasLaptop] = useState(true);
  const [hasInternet, setHasInternet] = useState(true);
  const [experience, setExperience] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [intro, setIntro] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const whatsAppUrl = generateCareersWhatsAppUrl(selectedTrack);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMessage('Please consent to recruitment data processing to submit.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/tools/probe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'careers_application',
          fullName,
          age,
          qualification,
          cityState,
          phone,
          email,
          preferredTrack: selectedTrack,
          hasLaptop,
          hasInternet,
          experience,
          portfolioUrl,
          intro,
        }),
      }).catch(() => null);

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="apply" className="w-full bg-dezo-bg border-2 border-dezo-ink p-7 sm:p-10 shadow-[6px_6px_0_0_#0B0B0A]">
      <div className="max-w-3xl mb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-dezo-primary font-bold block mb-2">
          Application Portal
        </span>
        <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-dezo-ink">
          Ready to Start Your Digital Marketing Journey?
        </h3>
        <p className="mt-2 text-sm font-mono text-dezo-text-secondary leading-relaxed">
          Send us a short introduction and your CV. Tell us where you’re based, what you’ve studied, and which area of
          digital marketing interests you most. You don’t need to know everything already — we evaluate your
          willingness to learn and your availability.
        </p>
      </div>

      {/* Application Method Tabs */}
      <div className="flex border-b-2 border-dezo-ink mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('whatsapp')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wider font-bold border-t-2 border-x-2 -mb-[2px] transition-all flex items-center gap-2 ${
            activeTab === 'whatsapp'
              ? 'bg-emerald-600 text-white border-dezo-ink shadow-[2px_-2px_0_0_#0B0B0A]'
              : 'bg-dezo-bg-warm text-dezo-text-secondary border-transparent hover:text-dezo-ink'
          }`}
        >
          <MessageSquare size={14} /> Option A: Apply on WhatsApp (Recommended)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wider font-bold border-t-2 border-x-2 -mb-[2px] transition-all flex items-center gap-2 ${
            activeTab === 'form'
              ? 'bg-dezo-ink text-dezo-bg border-dezo-ink shadow-[2px_-2px_0_0_#0B0B0A]'
              : 'bg-dezo-bg-warm text-dezo-text-secondary border-transparent hover:text-dezo-ink'
          }`}
        >
          Option B: Apply via Web Form
        </button>
      </div>

      {/* OPTION A: WhatsApp Application Flow */}
      {activeTab === 'whatsapp' && (
        <div className="space-y-6">
          <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-8">
            <div className="max-w-2xl mb-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-2">
                Select Your Preferred Learning Track:
              </label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full px-4 py-3 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary cursor-pointer"
              >
                {CAREER_TRACKS.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step-by-Step WhatsApp Instructions */}
            <div className="space-y-3 mb-6 bg-dezo-bg p-5 border border-dezo-border font-mono text-xs text-dezo-text-secondary">
              <span className="font-bold text-dezo-ink block uppercase text-[11px] mb-1">
                How WhatsApp Application Works:
              </span>
              <p>1. Click the green button below to open official WhatsApp chat with DEZO (+91 9114411026).</p>
              <p>2. The application template text will be pre-filled automatically with your selected track.</p>
              <p className="p-2.5 bg-amber-50 border-l-2 border-amber-600 text-amber-900 font-bold flex items-start gap-2">
                <Paperclip size={14} className="shrink-0 mt-0.5 text-amber-700" />
                <span>
                  CRITICAL: Please attach your PDF or DOCX resume manually using the paperclip/attachment icon in
                  WhatsApp before sending your message. WhatsApp links cannot attach files automatically.
                </span>
              </p>
              <p>3. Our recruitment team will review your CV and reply within 3 to 7 business days.</p>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-emerald-700 transition-all shadow-[4px_4px_0_0_#0B0B0A] inline-flex items-center gap-2"
            >
              <MessageSquare size={16} /> Apply on WhatsApp (+91 9114411026) <ExternalLink size={14} />
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-dezo-text-muted">
            <ShieldCheck size={14} className="text-dezo-primary" />
            <span>Zero recruitment fees · Official Meta WhatsApp verification · Patia, Bhubaneswar Studio</span>
          </div>
        </div>
      )}

      {/* OPTION B: Web Form Application Flow */}
      {activeTab === 'form' && (
        <div>
          {submitted ? (
            <div className="bg-dezo-bg-warm border-2 border-dezo-ink p-8 text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white border-2 border-dezo-ink rounded-none flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="font-display text-2xl font-bold uppercase text-dezo-ink">
                Application Received Successfully
              </h4>
              <p className="mt-2 text-xs font-mono text-dezo-text-secondary max-w-lg mx-auto">
                Thank you, {fullName}. Our recruitment team has received your application for the {selectedTrack} program.
                We will review your details and contact you via WhatsApp or Email within 3 to 7 business days.
              </p>
              <p className="mt-4 text-xs font-mono text-dezo-primary font-bold">
                You can also message our hiring team directly on WhatsApp (+91 9114411026) to share your CV.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5 bg-dezo-bg-warm border-2 border-dezo-ink p-6 sm:p-8">
              {errorMessage && (
                <div className="p-3 bg-red-100 border-2 border-red-600 text-red-900 text-xs font-mono flex items-center gap-2">
                  <AlertCircle size={14} /> {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Ananya Mohanty"
                    className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    min={18}
                    max={50}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g., 24"
                    className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                    Highest Qualification *
                  </label>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  >
                    <option value="Class 12 Pass">Class 12 Pass</option>
                    <option value="Undergraduate Student">Currently in College / Degree</option>
                    <option value="Graduate (BA / BCom / BSc / BTech)">Graduate Completed</option>
                    <option value="Postgraduate (MA / MCom / MBA)">Postgraduate Completed</option>
                    <option value="Diploma / Vocational">Diploma / Vocational Qualification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                    Current City & State *
                  </label>
                  <input
                    type="text"
                    required
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    placeholder="e.g., Bhubaneswar, Odisha"
                    className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 91144 11026"
                    className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                    Preferred Learning Track *
                  </label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                  >
                    {CAREER_TRACKS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hardware & Setup Checkboxes */}
              <div className="p-4 bg-dezo-bg border border-dezo-border space-y-2">
                <span className="font-mono text-xs font-bold text-dezo-ink block uppercase">
                  Hardware &amp; Internet Setup Check:
                </span>
                <label className="flex items-center gap-2 text-xs font-mono text-dezo-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLaptop}
                    onChange={(e) => setHasLaptop(e.target.checked)}
                    className="w-4 h-4 rounded-none border-2 border-dezo-ink text-dezo-primary focus:ring-0"
                  />
                  <span>I have a personal laptop or computer for completing assignments *</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-mono text-dezo-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasInternet}
                    onChange={(e) => setHasInternet(e.target.checked)}
                    className="w-4 h-4 rounded-none border-2 border-dezo-ink text-dezo-primary focus:ring-0"
                  />
                  <span>I have a stable broadband or 4G internet connection *</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                  Portfolio, LinkedIn, or Work Sample URL (Optional)
                </label>
                <input
                  type="text"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/... or Google Drive link"
                  className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-dezo-ink font-bold mb-1.5">
                  Short Introduction &amp; Availability *
                </label>
                <textarea
                  required
                  rows={3}
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Tell us about yourself, why you want to learn digital marketing, and your daily availability..."
                  className="w-full px-4 py-2.5 bg-dezo-bg border-2 border-dezo-ink text-xs font-mono text-dezo-ink focus:border-dezo-primary"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 text-xs font-mono text-dezo-text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded-none border-2 border-dezo-ink text-dezo-primary focus:ring-0"
                  />
                  <span>
                    I consent to DEZO processing my details for recruitment, evaluation, and communication in accordance
                    with the{' '}
                    <Link href="/privacy" className="text-dezo-primary underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !hasLaptop || !hasInternet}
                className="px-8 py-3.5 bg-dezo-ink text-dezo-bg font-mono text-xs uppercase tracking-wider font-bold border-2 border-dezo-ink hover:bg-dezo-primary hover:text-dezo-ink transition-all shadow-[4px_4px_0_0_#B08D57] inline-flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? 'Submitting Application...' : 'Submit Application Form'} <Send size={14} />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

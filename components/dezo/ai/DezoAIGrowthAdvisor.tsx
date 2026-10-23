'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  ShieldAlert,
  Loader2,
  RefreshCw,
  Building,
  Target,
  MapPin,
  Banknote,
} from 'lucide-react';
import { DezoButton } from '../DezoButton';

interface AdvisoryResult {
  recommendedPackage: string;
  estimatedStartingPrice: string;
  rationale: string;
  keyActionPlan: string[];
  suggestedServices: string[];
}

const PRESETS = [
  {
    label: 'Sambalpuri Handloom Brand',
    businessType: 'Authentic Handloom & Ethnic Wear',
    goal: 'Launch pan-India D2C store & Amazon Brand Registry',
    location: 'Bhubaneswar, Odisha',
    budget: '₹50,000 - ₹1,00,000',
  },
  {
    label: 'Real Estate Developer',
    businessType: 'Residential & Commercial Real Estate',
    goal: 'Generate qualified buyer inquiries & project walkthrough site',
    location: 'Cuttack / Bhubaneswar',
    budget: '₹1,00,000 - ₹2,50,000',
  },
  {
    label: 'Healthcare Clinic / Doctor',
    businessType: 'Multi-speciality Dental / Medical Clinic',
    goal: 'Local Google Maps #1 rank & patient booking site',
    location: 'Bhubaneswar, Odisha',
    budget: 'Under ₹50,000',
  },
  {
    label: 'Organic Spices & Packaged Food',
    businessType: 'FSSAI Certified Spices Manufacturer',
    goal: 'Amazon & Flipkart seller launch with A+ content',
    location: 'Odisha / Pan-India',
    budget: '₹50,000 - ₹1,00,000',
  },
];

export function DezoAIGrowthAdvisor() {
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'chat'>('diagnostic');

  // Diagnostic State
  const [businessType, setBusinessType] = useState('Handloom & Artisanal Goods');
  const [primaryGoal, setPrimaryGoal] = useState('Build high-converting online store & scale marketplace sales');
  const [location, setLocation] = useState('Bhubaneswar, Odisha');
  const [budget, setBudget] = useState('₹50,000 - ₹1,00,000');
  const [loadingDiagnostic, setLoadingDiagnostic] = useState(false);
  const [advisoryResult, setAdvisoryResult] = useState<AdvisoryResult | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content:
        'Hello! I am DEZO AI, your digital growth consultant. Ask me about our website packages (from ₹7,999), Amazon/Flipkart launch frameworks, local SEO in Odisha, or technical architecture.',
    },
  ]);
  const [loadingChat, setLoadingChat] = useState(false);

  const runDiagnostic = async () => {
    setLoadingDiagnostic(true);
    setAdvisoryResult(null);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'diagnostic',
          businessType,
          primaryGoal,
          location,
          currentBudget: budget,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAdvisoryResult(data.advisory);
        setWhatsappUrl(data.whatsappHandoffUrl);
      } else {
        throw new Error(data.error || 'Failed to generate advisory');
      }
    } catch {
      // Deterministic client fallback matching DEZO standards
      setAdvisoryResult({
        recommendedPackage: 'BUSINESS Website & Local Growth Foundation',
        estimatedStartingPrice: 'Starting from ₹14,999',
        rationale: `For ${businessType} based in ${location}, establishing a high-speed Next.js web presence with direct WhatsApp lead capture delivers the highest commercial return.`,
        keyActionPlan: [
          'Deploy sub-second responsive website with Scope Lock guarantee',
          'Implement direct WhatsApp click-to-chat (+91 9114411026)',
          'Complete local Google Business Profile optimization for regional searches',
          'Configure Google Analytics 4 and conversion tracking funnels',
        ],
        suggestedServices: ['Custom Web Development', 'SEO & Organic Growth', 'Conversion Funnel Optimization'],
      });
      setWhatsappUrl(
        `https://wa.me/919114411026?text=${encodeURIComponent(
          `Hello DEZO Team! I ran the AI Growth Diagnostic for ${businessType} in ${location} and would like to discuss next steps.`
        )}`
      );
    } finally {
      setLoadingDiagnostic(false);
    }
  };

  const sendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || loadingChat) return;

    const query = chatInput.trim();
    setChatInput('');
    const newHistory = [...chatMessages, { role: 'user' as const, content: query }];
    setChatMessages(newHistory);
    setLoadingChat(true);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          message: query,
          history: newHistory.slice(-4),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.reply) {
        setChatMessages([...newHistory, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error(data.error || 'Chat failed');
      }
    } catch {
      setChatMessages([
        ...newHistory,
        {
          role: 'assistant',
          content:
            'DEZO specializes in building robust digital infrastructure. Our website packages start from ₹7,999 (LAUNCH) up to ₹79,999+ (SCALE), all featuring our written 30-Day Covered-Defect Warranty, 100% source-code ownership, and zero surprise fees. Connect with Tarik Islam directly on WhatsApp (+91 9114411026) for custom specifications.',
        },
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <div className="w-full bg-white border border-dezo-border shadow-dezo-soft">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-dezo-ink bg-dezo-ink px-5 py-3 text-dezo-paper">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-dezo-gold animate-pulse" />
          <span className="font-mono text-sm font-bold tracking-wider uppercase">
            DEZO AI Growth Intelligence Engine
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 uppercase tracking-widest font-bold">
            Live v2.5
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-3 py-1 font-bold transition-colors ${
              activeTab === 'diagnostic'
                ? 'bg-dezo-gold text-dezo-ink'
                : 'text-dezo-paper/70 hover:text-dezo-paper'
            }`}
          >
            [ Strategic Diagnostic ]
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1 font-bold transition-colors ${
              activeTab === 'chat'
                ? 'bg-dezo-gold text-dezo-ink'
                : 'text-dezo-paper/70 hover:text-dezo-paper'
            }`}
          >
            [ Ask DEZO AI ]
          </button>
        </div>
      </div>

      {/* Tab 1: Diagnostic Mode */}
      {activeTab === 'diagnostic' && (
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <div className="font-mono text-xs uppercase tracking-wider text-dezo-text-muted mb-2 font-bold">
              ⚡ Quick Scenario Presets:
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setBusinessType(p.businessType);
                    setPrimaryGoal(p.goal);
                    setLocation(p.location);
                    setBudget(p.budget);
                  }}
                  className="px-3 py-1.5 text-xs font-mono bg-dezo-bg border border-dezo-border hover:border-dezo-gold hover:bg-dezo-gold/10 transition-colors text-left"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink flex items-center gap-1.5">
                <Building size={14} /> Business Type / Industry
              </label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-white border border-dezo-border p-3 font-mono text-xs sm:text-sm focus:outline-none focus:border-dezo-gold shadow-xs"
                placeholder="e.g. Retail Jewellery, Clinic, D2C Apparel"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink flex items-center gap-1.5">
                <Target size={14} /> Primary Growth Objective
              </label>
              <input
                type="text"
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full bg-white border border-dezo-border p-3 font-mono text-xs sm:text-sm focus:outline-none focus:border-dezo-gold shadow-xs"
                placeholder="e.g. Launch Amazon store, scale local inquiries"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink flex items-center gap-1.5">
                <MapPin size={14} /> Geographic Location / Base
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-dezo-border p-3 font-mono text-xs sm:text-sm focus:outline-none focus:border-dezo-gold shadow-xs"
                placeholder="e.g. Bhubaneswar, Cuttack, Mumbai"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink flex items-center gap-1.5">
                <Banknote size={14} /> Target Budget Range
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-white border border-dezo-border p-3 font-mono text-xs sm:text-sm focus:outline-none focus:border-dezo-gold shadow-xs cursor-pointer"
              >
                <option value="Under ₹25,000">Under ₹25,000 (Fast Launch)</option>
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Business Core)</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (eCommerce Growth)</option>
                <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000 (Multi-Channel Scale)</option>
                <option value="₹2,50,000+">₹2,50,000+ (Custom Enterprise)</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <DezoButton
              onClick={runDiagnostic}
              disabled={loadingDiagnostic}
              icon={loadingDiagnostic ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              size="lg"
            >
              {loadingDiagnostic ? 'Synthesizing Strategic Blueprint...' : 'Generate AI Growth Diagnostic //'}
            </DezoButton>
          </div>

          {/* Diagnostic Result Container */}
          {advisoryResult && (
            <div className="p-6 bg-dezo-bg border border-dezo-border animate-fade-in shadow-dezo-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-dezo-border">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-dezo-gold font-bold">
                    DEZO Strategic Recommendation:
                  </span>
                  <h3 className="font-mono text-lg sm:text-xl font-bold text-dezo-ink mt-0.5">
                    {advisoryResult.recommendedPackage}
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 bg-dezo-gold/20 border border-dezo-gold font-mono text-sm font-bold text-dezo-ink">
                  {advisoryResult.estimatedStartingPrice}
                </div>
              </div>

              <p className="font-mono text-xs sm:text-sm text-dezo-text-primary mb-6 leading-relaxed">
                {advisoryResult.rationale}
              </p>

              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-dezo-ink font-bold mb-3">
                  📋 Prioritized 4-Step Action Plan:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {advisoryResult.keyActionPlan.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-dezo-border text-xs font-mono text-dezo-text-primary">
                      <span className="font-bold text-dezo-gold shrink-0">0{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dezo-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-dezo-text-muted font-bold">Relevant Services:</span>
                  {advisoryResult.suggestedServices.map((svc, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white border border-dezo-border text-[11px] font-mono">
                      {svc}
                    </span>
                  ))}
                </div>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-dezo-ink text-dezo-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-dezo-gold hover:text-dezo-ink transition-colors shadow-xs"
                  >
                    <MessageSquare size={14} /> Discuss Scope on WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Interactive Chat Mode */}
      {activeTab === 'chat' && (
        <div className="p-6 sm:p-8 flex flex-col h-[520px]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 font-mono text-xs sm:text-sm">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-dezo-md bg-dezo-ink text-dezo-gold flex items-center justify-center shrink-0 border border-dezo-ink">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 border-2 ${
                    msg.role === 'user'
                      ? 'bg-dezo-ink text-dezo-paper border-dezo-ink shadow-xs'
                      : 'bg-dezo-bg text-dezo-text-primary border-dezo-border shadow-xs'
                  } whitespace-pre-wrap leading-relaxed`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loadingChat && (
              <div className="flex items-center gap-2 text-dezo-text-muted font-mono text-xs italic">
                <Loader2 size={14} className="animate-spin text-dezo-gold" /> DEZO AI is formulating response...
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={sendChatMessage} className="flex gap-2 pt-3 border-t border-dezo-border">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about website packages, Amazon seller onboarding, local SEO in Odisha..."
              className="flex-1 bg-white border border-dezo-border px-4 py-3 font-mono text-xs sm:text-sm focus:outline-none focus:border-dezo-gold shadow-xs"
            />
            <DezoButton type="submit" disabled={loadingChat || !chatInput.trim()} icon={<Send size={15} />}>
              Send
            </DezoButton>
          </form>
        </div>
      )}
    </div>
  );
}

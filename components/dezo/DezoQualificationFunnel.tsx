'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
  ShieldCheck,
  Building2,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { qualifyLead, QualifiedLeadResult } from '@/lib/crm/leadScoring';
import { trackEvent } from '@/lib/analytics/adapter';
import { DezoButton } from './DezoButton';

export function DezoQualificationFunnel() {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [productType, setProductType] = useState('');
  const [channelsActive, setChannelsActive] = useState<string[]>([]);
  const [pillarsNeeded, setPillarsNeeded] = useState<string[]>([]);
  const [currentTurnover, setCurrentTurnover] = useState<any>('Under ₹5L/mo');
  const [timeline, setTimeline] = useState<any>('Within 1 month');
  const [budgetTier, setBudgetTier] = useState<any>('₹50k - ₹1L');
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    city: '',
    projectGoals: '',
  });
  const [result, setResult] = useState<QualifiedLeadResult | null>(null);

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    trackEvent('form_started', { step });
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();

    const qualification = qualifyLead({
      name: contactData.name,
      phone: contactData.phone,
      email: contactData.email,
      businessName: contactData.businessName,
      city: contactData.city,
      currentTurnover,
      channelsActive,
      servicesRequested: pillarsNeeded,
      budgetTier,
      timeline,
      projectGoals: contactData.projectGoals,
    });

    setResult(qualification);
    trackEvent('form_completed', {
      score: qualification.leadScore,
      classification: qualification.classification,
    });

    // Generate WhatsApp handoff payload
    const text =
      `*DEZO PROJECT QUALIFICATION INTAKE* 🚀\n\n` +
      `👤 *Name:* ${contactData.name}\n` +
      `📞 *Phone:* ${contactData.phone}\n` +
      `📧 *Email:* ${contactData.email}\n` +
      `🏢 *Company:* ${contactData.businessName || 'N/A'}\n` +
      `📍 *City:* ${contactData.city || 'N/A'}\n\n` +
      `📊 *Business Type:* ${businessType}\n` +
      `🛒 *Selling Channels:* ${channelsActive.join(', ') || 'None'}\n` +
      `🛠️ *Required Pillars:* ${pillarsNeeded.join(', ')}\n` +
      `💰 *Budget Tier:* ${budgetTier}\n` +
      `⏳ *Timeline:* ${timeline}\n` +
      `📈 *Current Scale:* ${currentTurnover}\n\n` +
      `🎯 *Goals & Brief:*\n${contactData.projectGoals}\n\n` +
      `⚡ *Diagnostic Score:* ${qualification.leadScore}/100 (${qualification.classification})`;

    const whatsappUrl = `https://wa.me/919114411026?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full rounded-dezo-xl bg-dezo-surface border border-dezo-border p-6 sm:p-10 shadow-dezo-card">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-dezo-text-muted mb-2">
          <span>Project Diagnostic: Step {step} of 4</span>
          <span>{step === 1 ? 'Business Identity' : step === 2 ? 'Channels & Needs' : step === 3 ? 'Scale & Budget' : 'Direct Contacts'}</span>
        </div>
        <div className="w-full h-1.5 bg-dezo-surface-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-dezo-primary transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {result ? (
        <div className="py-8 flex flex-col items-center text-center gap-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-dezo-success/10 border border-dezo-success/30 flex items-center justify-center text-dezo-success">
            <CheckCircle2 size={32} />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-dezo-accent">
              Diagnostic Complete · Score: {result.leadScore}/100
            </span>
            <h3 className="text-2xl font-black text-dezo-text-primary mt-1 mb-2">
              {result.classification}
            </h3>
            <p className="text-sm text-dezo-text-secondary max-w-md mx-auto">
              {result.recommendedNextAction}
            </p>
          </div>

          <div className="p-4 rounded-dezo-md bg-dezo-surface-elevated border border-dezo-border max-w-md w-full text-xs text-left flex flex-col gap-1.5 text-dezo-text-muted">
            <div className="text-dezo-text-primary font-bold mb-1">Scoring Breakdown:</div>
            <div>Commercial Intent: {result.scoringBreakdown.intent}/30</div>
            <div>Budget Alignment: {result.scoringBreakdown.budgetFit}/30</div>
            <div>Channel Maturity: {result.scoringBreakdown.channelMaturity}/20</div>
            <div>Timeline Urgency: {result.scoringBreakdown.timelineUrgency}/20</div>
          </div>

          <p className="text-xs text-dezo-success font-semibold">
            Opening WhatsApp with your qualified intake summary...
          </p>
        </div>
      ) : (
        <div>
          {/* STEP 1: Business Profile */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-1">
                  What kind of business are you scaling?
                </h3>
                <p className="text-xs text-dezo-text-secondary">
                  Select your primary operating model.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'D2C Consumer Brand',
                  'Amazon / Flipkart Marketplace Seller',
                  'Retailer or Local Institution (Odisha / Regional)',
                  'Manufacturing / B2B Industrial Enterprise',
                  'Healthcare / Wellness Clinic',
                  'Education Institute / Academy',
                  'High-Growth Tech Startup',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBusinessType(type)}
                    className={`p-4 rounded-dezo-md text-left text-xs font-semibold border transition-all cursor-pointer ${
                      businessType === type
                        ? 'bg-dezo-primary/10 border-dezo-primary text-dezo-text-primary'
                        : 'bg-dezo-surface-elevated border-dezo-border text-dezo-text-secondary hover:text-dezo-text-primary'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <DezoButton
                  disabled={!businessType}
                  onClick={handleNext}
                  icon={<ArrowRight size={14} />}
                >
                  Continue
                </DezoButton>
              </div>
            </div>
          )}

          {/* STEP 2: Channels & Pillars */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-1">
                  Where do you sell, and what do you need?
                </h3>
                <p className="text-xs text-dezo-text-secondary">
                  Select all that apply.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-dezo-text-muted block mb-2">
                  Active Selling Channels:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Own Website (Shopify/Next)', 'Amazon India', 'Flipkart', 'Offline Stores', 'Social Media (Instagram/WhatsApp)', 'Just Starting Out'].map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => toggleItem(channelsActive, setChannelsActive, ch)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
                        channelsActive.includes(ch)
                          ? 'bg-dezo-accent/10 border-dezo-accent text-dezo-accent'
                          : 'bg-dezo-surface-elevated border-dezo-border text-dezo-text-secondary'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-dezo-text-muted block mb-2">
                  Pillars Required:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'BUILD: High-Speed Website or Custom Ecommerce',
                    'BRAND: Brand Identity, Packaging & A+ Content',
                    'MARKETPLACE: Amazon & Flipkart Growth (PPC/Listings)',
                    'GROW: Meta & Google Performance Ads',
                    'GROW: Technical SEO & Local Search Dominance',
                    'INTELLIGENCE: AI Automation & WhatsApp Routing',
                  ].map((pil) => (
                    <button
                      key={pil}
                      type="button"
                      onClick={() => toggleItem(pillarsNeeded, setPillarsNeeded, pil)}
                      className={`p-3 rounded-dezo-md text-left text-xs font-medium border cursor-pointer transition-all ${
                        pillarsNeeded.includes(pil)
                          ? 'bg-dezo-primary/10 border-dezo-primary text-dezo-text-primary font-bold'
                          : 'bg-dezo-surface-elevated border-dezo-border text-dezo-text-secondary'
                      }`}
                    >
                      {pil}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <DezoButton variant="ghost" onClick={handlePrev} icon={<ArrowLeft size={14} />} iconPosition="left">
                  Back
                </DezoButton>
                <DezoButton
                  disabled={pillarsNeeded.length === 0}
                  onClick={handleNext}
                  icon={<ArrowRight size={14} />}
                >
                  Continue
                </DezoButton>
              </div>
            </div>
          )}

          {/* STEP 3: Scale & Budget */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-1">
                  Scale, Timeline & Commercial Scope
                </h3>
                <p className="text-xs text-dezo-text-secondary">
                  Helps us assign the right strategic specialists to your account.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-dezo-text-muted">
                    Monthly Revenue Scale:
                  </label>
                  <select
                    value={currentTurnover}
                    onChange={(e) => setCurrentTurnover(e.target.value as any)}
                    className="w-full bg-dezo-surface-elevated border border-dezo-border rounded-dezo-md p-3 text-xs text-dezo-text-primary focus:outline-none"
                  >
                    <option value="Pre-revenue">Pre-revenue / Planning Phase</option>
                    <option value="Under ₹5L/mo">Under ₹5 Lakhs / month</option>
                    <option value="₹5L - ₹25L/mo">₹5 Lakhs – ₹25 Lakhs / month</option>
                    <option value="₹25L - ₹1Cr/mo">₹25 Lakhs – ₹1 Crore / month</option>
                    <option value="₹1Cr+/mo">₹1 Crore+ / month (Enterprise)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-dezo-text-muted">
                    Execution Timeline:
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value as any)}
                    className="w-full bg-dezo-surface-elevated border border-dezo-border rounded-dezo-md p-3 text-xs text-dezo-text-primary focus:outline-none"
                  >
                    <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1-3 months">1 – 3 months</option>
                    <option value="Exploratory">Exploratory / Discovery</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-dezo-text-muted">
                  Allocated Project Budget:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Under ₹50k', '₹50k - ₹1L', '₹1L - ₹2.5L', '₹2.5L - ₹5L', '₹5L+'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudgetTier(b as any)}
                      className={`p-3 rounded-dezo-md text-xs font-semibold border cursor-pointer transition-all ${
                        budgetTier === b
                          ? 'bg-dezo-primary/10 border-dezo-primary text-dezo-text-primary'
                          : 'bg-dezo-surface-elevated border-dezo-border text-dezo-text-secondary'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <DezoButton variant="ghost" onClick={handlePrev} icon={<ArrowLeft size={14} />} iconPosition="left">
                  Back
                </DezoButton>
                <DezoButton onClick={handleNext} icon={<ArrowRight size={14} />}>
                  Final Step
                </DezoButton>
              </div>
            </div>
          )}

          {/* STEP 4: Contact & Finish */}
          {step === 4 && (
            <form onSubmit={handleFinish} className="flex flex-col gap-5">
              <div>
                <h3 className="text-xl font-bold text-dezo-text-primary mb-1">
                  Where should we send your strategic audit?
                </h3>
                <p className="text-xs text-dezo-text-secondary">
                  Direct connection with Director Tarik Islam & CEO Rohan Sanap.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="bg-dezo-surface-elevated border border-dezo-border rounded-dezo-md p-3 text-xs text-dezo-text-primary focus:border-dezo-primary focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp Number *"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="bg-dezo-surface-elevated border border-dezo-border rounded-dezo-md p-3 text-xs text-dezo-text-primary focus:border-dezo-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  placeholder="Official Email *"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="bg-dezo-surface-elevated border border-dezo-border rounded-dezo-md p-3 text-xs text-dezo-text-primary focus:border-dezo-primary focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Business / Brand Name"
                  value={contactData.businessName}
                  onChange={(e) => setContactData({ ...contactData, businessName: e.target.value })}
                  className="bg-dezo-surface-elevated border border-dezo-border rounded-dezo-md p-3 text-xs text-dezo-text-primary focus:border-dezo-primary focus:outline-none"
                />
              </div>

              <textarea
                rows={3}
                required
                placeholder="Briefly describe your current primary business bottleneck or milestone goal *"
                value={contactData.projectGoals}
                onChange={(e) => setContactData({ ...contactData, projectGoals: e.target.value })}
                className="bg-dezo-surface-elevated border border-dezo-border rounded-dezo-md p-3 text-xs text-dezo-text-primary focus:border-dezo-primary focus:outline-none resize-none"
              />

              <div className="flex justify-between pt-4">
                <DezoButton variant="ghost" type="button" onClick={handlePrev} icon={<ArrowLeft size={14} />} iconPosition="left">
                  Back
                </DezoButton>
                <DezoButton type="submit" size="md" icon={<Send size={14} />}>
                  Run Diagnostic & Connect
                </DezoButton>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

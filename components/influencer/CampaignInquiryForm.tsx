'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import {
  campaignInquirySchema,
  type CampaignInquiryData,
  buildCampaignWhatsAppUrl,
} from '@/lib/validation/campaign';
import { DezoButton } from '@/components/dezo/DezoButton';

const inputBase =
  'w-full bg-white border border-dezo-border rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none focus:border-dezo-primary focus:ring-2 focus:ring-dezo-primary/20';

export function CampaignInquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CampaignInquiryData>({
    resolver: zodResolver(campaignInquirySchema),
    defaultValues: {
      brandName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      industry: '',
      productOrService: '',
      targetMarket: '',
      platforms: '',
      creatorCategories: '',
      approximateCreators: '',
      objective: '',
      budgetRange: 'To be scoped',
      collaborationModel: 'Mixed / unsure',
      deliverables: '',
      timeline: '',
      shippingRequired: 'Not sure',
      usageRights: '',
      notes: '',
    },
  });

  const onSubmit = async (data: CampaignInquiryData) => {
    setStatus('submitting');
    const direct = buildCampaignWhatsAppUrl(data);
    setFallbackUrl(direct);
    try {
      const res = await fetch('/api/campaigns/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, botField: '' }),
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result?.success) {
        setLeadId(result.leadId || null);
        window.open(result.whatsappHandoffUrl || direct, '_blank', 'noopener,noreferrer');
      } else {
        window.open(direct, '_blank', 'noopener,noreferrer');
      }
      setStatus('success');
      reset();
    } catch {
      window.open(direct, '_blank', 'noopener,noreferrer');
      setStatus('success');
      reset();
    }
  };

  const fieldErr = (key: keyof CampaignInquiryData) =>
    errors[key] ? (
      <span className="font-mono text-xs text-red-500 font-bold">{errors[key]?.message}</span>
    ) : null;

  return (
    <div className="w-full">
      {status === 'success' && (
        <div
          role="status"
          className="mb-6 p-5 rounded-dezo-md bg-emerald-50 border border-emerald-600 flex flex-col sm:flex-row gap-4 justify-between"
        >
          <div className="flex gap-3">
            <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-sm font-bold">
                Campaign inquiry logged {leadId ? `[${leadId}]` : ''}
              </p>
              <p className="font-mono text-xs text-dezo-text-muted mt-1">
                We will qualify the brief and reply within 24 business hours. WhatsApp opens with your brief.
              </p>
            </div>
          </div>
          {fallbackUrl && (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-dezo-ink text-white font-mono text-xs font-bold uppercase tracking-wider"
            >
              <MessageSquare size={14} /> Open WhatsApp
            </a>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="brandName" className="font-mono text-xs font-bold uppercase tracking-wider">
              Brand / company *
            </label>
            <input id="brandName" className={inputBase} {...register('brandName')} />
            {fieldErr('brandName')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contactName" className="font-mono text-xs font-bold uppercase tracking-wider">
              Contact person *
            </label>
            <input id="contactName" className={inputBase} {...register('contactName')} />
            {fieldErr('contactName')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-wider">
              Business email *
            </label>
            <input id="email" type="email" className={inputBase} {...register('email')} />
            {fieldErr('email')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-mono text-xs font-bold uppercase tracking-wider">
              Phone / WhatsApp *
            </label>
            <input id="phone" type="tel" className={inputBase} {...register('phone')} />
            {fieldErr('phone')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="website" className="font-mono text-xs font-bold uppercase tracking-wider">
              Website
            </label>
            <input id="website" placeholder="https://" className={inputBase} {...register('website')} />
            {fieldErr('website')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="industry" className="font-mono text-xs font-bold uppercase tracking-wider">
              Industry *
            </label>
            <input id="industry" className={inputBase} {...register('industry')} />
            {fieldErr('industry')}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="productOrService" className="font-mono text-xs font-bold uppercase tracking-wider">
            Product or service *
          </label>
          <textarea id="productOrService" rows={2} className={inputBase} {...register('productOrService')} />
          {fieldErr('productOrService')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="targetMarket" className="font-mono text-xs font-bold uppercase tracking-wider">
              Target market / locations *
            </label>
            <input id="targetMarket" className={inputBase} {...register('targetMarket')} />
            {fieldErr('targetMarket')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="platforms" className="font-mono text-xs font-bold uppercase tracking-wider">
              Preferred platforms *
            </label>
            <input
              id="platforms"
              placeholder="Instagram, YouTube, Shorts…"
              className={inputBase}
              {...register('platforms')}
            />
            {fieldErr('platforms')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="creatorCategories" className="font-mono text-xs font-bold uppercase tracking-wider">
              Creator categories *
            </label>
            <input
              id="creatorCategories"
              placeholder="Beauty, food, tech, Odia…"
              className={inputBase}
              {...register('creatorCategories')}
            />
            {fieldErr('creatorCategories')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="approximateCreators" className="font-mono text-xs font-bold uppercase tracking-wider">
              Approx. creator count *
            </label>
            <input id="approximateCreators" className={inputBase} {...register('approximateCreators')} />
            {fieldErr('approximateCreators')}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="objective" className="font-mono text-xs font-bold uppercase tracking-wider">
            Campaign objective *
          </label>
          <textarea id="objective" rows={3} className={inputBase} {...register('objective')} />
          {fieldErr('objective')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="budgetRange" className="font-mono text-xs font-bold uppercase tracking-wider">
              Budget range *
            </label>
            <select id="budgetRange" className={`${inputBase} cursor-pointer`} {...register('budgetRange')}>
              <option value="To be scoped">To be scoped</option>
              <option value="Under ₹50,000">Under ₹50,000</option>
              <option value="₹50,000 – ₹1,50,000">₹50,000 – ₹1,50,000</option>
              <option value="₹1,50,000 – ₹5,00,000">₹1,50,000 – ₹5,00,000</option>
              <option value="₹5,00,000+">₹5,00,000+</option>
            </select>
            {fieldErr('budgetRange')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="collaborationModel" className="font-mono text-xs font-bold uppercase tracking-wider">
              Collaboration model *
            </label>
            <select
              id="collaborationModel"
              className={`${inputBase} cursor-pointer`}
              {...register('collaborationModel')}
            >
              <option value="Mixed / unsure">Mixed / unsure</option>
              <option value="Paid collaboration">Paid collaboration</option>
              <option value="Barter / product exchange">Barter / product exchange</option>
              <option value="Free product">Free product</option>
              <option value="Affiliate / commission">Affiliate / commission</option>
              <option value="Hybrid (fee + commission)">Hybrid (fee + commission)</option>
              <option value="UGC-only">UGC-only</option>
              <option value="Brand ambassador">Brand ambassador</option>
            </select>
            {fieldErr('collaborationModel')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="deliverables" className="font-mono text-xs font-bold uppercase tracking-wider">
              Deliverables required *
            </label>
            <textarea id="deliverables" rows={2} className={inputBase} {...register('deliverables')} />
            {fieldErr('deliverables')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="timeline" className="font-mono text-xs font-bold uppercase tracking-wider">
              Campaign timing *
            </label>
            <input id="timeline" placeholder="Start / end window" className={inputBase} {...register('timeline')} />
            {fieldErr('timeline')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="shippingRequired" className="font-mono text-xs font-bold uppercase tracking-wider">
              Product shipping required *
            </label>
            <select id="shippingRequired" className={`${inputBase} cursor-pointer`} {...register('shippingRequired')}>
              <option value="Not sure">Not sure</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="usageRights" className="font-mono text-xs font-bold uppercase tracking-wider">
              Usage / ad rights notes
            </label>
            <input id="usageRights" className={inputBase} {...register('usageRights')} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="font-mono text-xs font-bold uppercase tracking-wider">
            Additional instructions
          </label>
          <textarea id="notes" rows={3} className={inputBase} {...register('notes')} />
        </div>

        <p className="text-xs text-dezo-text-muted leading-relaxed">
          Barter and affiliate-only campaigns are never labeled as paid jobs unless a fixed payment is confirmed in
          writing. DEZO does not invent creator counts or guaranteed results.
        </p>

        <DezoButton
          type="submit"
          size="lg"
          disabled={isSubmitting || status === 'submitting'}
          className="w-full sm:w-auto"
          icon={<Send size={16} />}
        >
          {status === 'submitting' || isSubmitting ? 'Submitting…' : 'Submit campaign brief'}
        </DezoButton>
      </form>
    </div>
  );
}

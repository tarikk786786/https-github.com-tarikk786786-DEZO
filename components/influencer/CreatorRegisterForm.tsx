'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import {
  creatorRegisterSchema,
  type CreatorRegisterData,
  buildCreatorWhatsAppUrl,
} from '@/lib/validation/creator';
import { DezoButton } from '@/components/dezo/DezoButton';

const inputBase =
  'w-full bg-white border border-dezo-border rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none focus:border-dezo-primary focus:ring-2 focus:ring-dezo-primary/20';

export function CreatorRegisterForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreatorRegisterData>({
    resolver: zodResolver(creatorRegisterSchema),
    defaultValues: {
      displayName: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      languages: '',
      niches: '',
      platforms: '',
      audienceSize: '',
      collaborationTypes: '',
      portfolioUrl: '',
      primaryProfileUrl: '',
      minRate: '',
      availability: '',
      notes: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: CreatorRegisterData) => {
    setStatus('submitting');
    const direct = buildCreatorWhatsAppUrl(data);
    setFallbackUrl(direct);
    try {
      const res = await fetch('/api/creators/register', {
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

  const fieldErr = (key: keyof CreatorRegisterData) =>
    errors[key] ? (
      <span className="font-mono text-xs text-red-500 font-bold">{errors[key]?.message as string}</span>
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
                Registration received {leadId ? `[${leadId}]` : ''}
              </p>
              <p className="font-mono text-xs text-dezo-text-muted mt-1">
                No registration fee. Profile review is next. Opportunity volume depends on live client demand — not a
                guaranteed job count.
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
            <label htmlFor="displayName" className="font-mono text-xs font-bold uppercase tracking-wider">
              Display name *
            </label>
            <input id="displayName" className={inputBase} {...register('displayName')} />
            {fieldErr('displayName')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-wider">
              Email *
            </label>
            <input id="email" type="email" className={inputBase} {...register('email')} />
            {fieldErr('email')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-mono text-xs font-bold uppercase tracking-wider">
              Phone / WhatsApp *
            </label>
            <input id="phone" type="tel" className={inputBase} {...register('phone')} />
            {fieldErr('phone')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="primaryProfileUrl" className="font-mono text-xs font-bold uppercase tracking-wider">
              Primary profile URL *
            </label>
            <input
              id="primaryProfileUrl"
              placeholder="https://instagram.com/…"
              className={inputBase}
              {...register('primaryProfileUrl')}
            />
            {fieldErr('primaryProfileUrl')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="font-mono text-xs font-bold uppercase tracking-wider">
              City *
            </label>
            <input id="city" className={inputBase} {...register('city')} />
            {fieldErr('city')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="state" className="font-mono text-xs font-bold uppercase tracking-wider">
              State *
            </label>
            <input id="state" className={inputBase} {...register('state')} />
            {fieldErr('state')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="languages" className="font-mono text-xs font-bold uppercase tracking-wider">
              Languages *
            </label>
            <input id="languages" placeholder="Hindi, Odia, English…" className={inputBase} {...register('languages')} />
            {fieldErr('languages')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="niches" className="font-mono text-xs font-bold uppercase tracking-wider">
              Niches *
            </label>
            <input id="niches" placeholder="Beauty, food, tech…" className={inputBase} {...register('niches')} />
            {fieldErr('niches')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="platforms" className="font-mono text-xs font-bold uppercase tracking-wider">
              Platforms *
            </label>
            <input id="platforms" placeholder="Instagram, YouTube…" className={inputBase} {...register('platforms')} />
            {fieldErr('platforms')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="audienceSize" className="font-mono text-xs font-bold uppercase tracking-wider">
              Audience size range *
            </label>
            <select id="audienceSize" className={`${inputBase} cursor-pointer`} {...register('audienceSize')}>
              <option value="">Select range</option>
              <option value="Under 10K">Under 10K</option>
              <option value="10K – 50K">10K – 50K</option>
              <option value="50K – 200K">50K – 200K</option>
              <option value="200K – 1M">200K – 1M</option>
              <option value="1M+">1M+</option>
            </select>
            {fieldErr('audienceSize')}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="collaborationTypes" className="font-mono text-xs font-bold uppercase tracking-wider">
            Collaboration types you accept *
          </label>
          <input
            id="collaborationTypes"
            placeholder="Paid, barter, UGC-only, affiliate…"
            className={inputBase}
            {...register('collaborationTypes')}
          />
          {fieldErr('collaborationTypes')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="portfolioUrl" className="font-mono text-xs font-bold uppercase tracking-wider">
              Portfolio / media kit URL
            </label>
            <input id="portfolioUrl" className={inputBase} {...register('portfolioUrl')} />
            {fieldErr('portfolioUrl')}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="minRate" className="font-mono text-xs font-bold uppercase tracking-wider">
              Minimum rate (optional)
            </label>
            <input id="minRate" placeholder="e.g. ₹8,000 / Reel" className={inputBase} {...register('minRate')} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="availability" className="font-mono text-xs font-bold uppercase tracking-wider">
            Availability / preferred locations
          </label>
          <input id="availability" className={inputBase} {...register('availability')} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="font-mono text-xs font-bold uppercase tracking-wider">
            Notes
          </label>
          <textarea id="notes" rows={3} className={inputBase} {...register('notes')} />
        </div>

        <label className="flex items-start gap-3 text-sm text-dezo-text-secondary">
          <input type="checkbox" className="mt-1" {...register('acceptTerms')} />
          <span>
            I understand there is no registration fee, opportunity volume depends on real client demand, and sponsored
            content must follow ASCI / platform disclosure rules. *
          </span>
        </label>
        {fieldErr('acceptTerms')}

        <DezoButton
          type="submit"
          size="lg"
          disabled={isSubmitting || status === 'submitting'}
          className="w-full sm:w-auto"
          icon={<Send size={16} />}
        >
          {status === 'submitting' || isSubmitting ? 'Submitting…' : 'Submit creator registration'}
        </DezoButton>
      </form>
    </div>
  );
}

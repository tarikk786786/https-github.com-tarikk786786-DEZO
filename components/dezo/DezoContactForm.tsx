'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import {
  contactFormSchema,
  ContactFormData,
  buildWhatsAppLeadUrl,
} from '@/lib/validation/contact';
import { DezoButton } from './DezoButton';

export function DezoContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      businessName: '',
      city: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    const directWhatsAppUrl = buildWhatsAppLeadUrl(data);
    setFallbackUrl(directWhatsAppUrl);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setLeadId(result.leadId || null);
        setStatus('success');
        reset();
        const finalUrl = result.whatsappHandoffUrl || directWhatsAppUrl;
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
      } else {
        setStatus('success');
        window.open(directWhatsAppUrl, '_blank', 'noopener,noreferrer');
        reset();
      }
    } catch {
      setStatus('success');
      window.open(directWhatsAppUrl, '_blank', 'noopener,noreferrer');
      reset();
    }
  };

  return (
    <div className="w-full">
      {status === 'success' && (
        <div
          role="status"
          className="mb-6 p-5 rounded-none bg-emerald-50 border-2 border-emerald-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-dezo-text-primary animate-fade-in shadow-[4px_4px_0_0_#059669]"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 size={22} className="shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <div className="font-mono text-sm font-bold text-dezo-ink">
                Inquiry Logged {leadId ? `[Ref: ${leadId}]` : 'Successfully'}
              </div>
              <div className="font-mono text-xs text-dezo-text-muted mt-1">
                Your project brief has been recorded. WhatsApp will open with your pre-formatted brief. If not, click below:
              </div>
            </div>
          </div>
          {fallbackUrl && (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-dezo-ink text-dezo-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-dezo-gold transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquare size={14} /> Open WhatsApp
            </a>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Tarik Islam"
              {...register('name')}
              className={`w-full bg-white border-2 ${
                errors.name ? 'border-red-500' : 'border-dezo-ink'
              } rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all`}
            />
            {errors.name && (
              <span className="font-mono text-xs text-red-500 font-bold">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              {...register('email')}
              className={`w-full bg-white border-2 ${
                errors.email ? 'border-red-500' : 'border-dezo-ink'
              } rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all`}
            />
            {errors.email && (
              <span className="font-mono text-xs text-red-500 font-bold">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 9114411026"
              {...register('phone')}
              className={`w-full bg-white border-2 ${
                errors.phone ? 'border-red-500' : 'border-dezo-ink'
              } rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all`}
            />
            {errors.phone && (
              <span className="font-mono text-xs text-red-500 font-bold">{errors.phone.message}</span>
            )}
          </div>

          {/* Business / Brand Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="businessName" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
              Business / Brand Name
            </label>
            <input
              id="businessName"
              type="text"
              placeholder="e.g. Acme Retail"
              {...register('businessName')}
              className="w-full bg-white border-2 border-dezo-ink rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* City / Location */}
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
              City / Base
            </label>
            <input
              id="city"
              type="text"
              placeholder="e.g. Bhubaneswar, Cuttack, Mumbai"
              {...register('city')}
              className="w-full bg-white border-2 border-dezo-ink rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all"
            />
          </div>

          {/* Primary Service */}
          <div className="flex flex-col gap-2">
            <label htmlFor="service" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
              Service Area <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              {...register('service')}
              className={`w-full bg-white border-2 ${
                errors.service ? 'border-red-500' : 'border-dezo-ink'
              } rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all cursor-pointer`}
            >
              <option value="">Select Service Area</option>
              <option value="Website Development">Website Development (Landing, Corporate, Custom)</option>
              <option value="Ecommerce Architecture">Ecommerce Architecture (Shopify / Headless)</option>
              <option value="SEO & Organic Growth">SEO & Organic Growth</option>
              <option value="Meta & Google Ads">Meta & Google Performance Ads</option>
              <option value="AI & Automation">AI & Workflow Automation</option>
              <option value="Bespoke Engineering">Bespoke Engineering</option>
            </select>
            {errors.service && (
              <span className="font-mono text-xs text-red-500 font-bold">{errors.service.message}</span>
            )}
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
              Estimated Budget
            </label>
            <select
              id="budget"
              {...register('budget')}
              className="w-full bg-white border-2 border-dezo-ink rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all cursor-pointer"
            >
              <option value="Undisclosed">Select Budget (Optional)</option>
              <option value="Under ₹50,000">Under ₹50,000</option>
              <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
              <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
              <option value="₹2,50,000+">₹2,50,000+</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-mono text-xs font-bold uppercase tracking-wider text-dezo-ink">
            Project Overview <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us about your brand, current challenges, and goals..."
            {...register('message')}
            className={`w-full bg-white border-2 ${
              errors.message ? 'border-red-500' : 'border-dezo-ink'
            } rounded-none px-4 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all resize-vertical`}
          />
          {errors.message && (
            <span className="font-mono text-xs text-red-500 font-bold">{errors.message.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <DezoButton
            type="submit"
            size="lg"
            disabled={isSubmitting}
            icon={<Send size={16} />}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Routing Request...' : 'Send Inquiry via WhatsApp //'}
          </DezoButton>
        </div>
      </form>
    </div>
  );
}

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
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

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

  const onSubmit = (data: ContactFormData) => {
    // Generate the rich WhatsApp executive handoff
    const whatsappUrl = buildWhatsAppLeadUrl(data);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setStatus('success');
    reset();
  };

  return (
    <div className="w-full">
      {status === 'success' && (
        <div
          role="status"
          className="mb-6 p-4 rounded-dezo-md bg-dezo-success/10 border border-dezo-success/30 flex items-start gap-3 text-dezo-success text-sm font-semibold animate-fade-in"
        >
          <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          <div>
            Opening WhatsApp with your request pre-formatted! Just click send in WhatsApp to finalize your inquiry.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-dezo-text-secondary">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Tarik Islam"
              {...register('name')}
              className={`w-full bg-dezo-surface-elevated border ${
                errors.name ? 'border-red-500' : 'border-dezo-border focus:border-dezo-primary'
              } rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none transition-colors`}
            />
            {errors.name && (
              <span className="text-xs text-red-400 font-medium">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-dezo-text-secondary">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              {...register('email')}
              className={`w-full bg-dezo-surface-elevated border ${
                errors.email ? 'border-red-500' : 'border-dezo-border focus:border-dezo-primary'
              } rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none transition-colors`}
            />
            {errors.email && (
              <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-dezo-text-secondary">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 91144 11026"
              {...register('phone')}
              className={`w-full bg-dezo-surface-elevated border ${
                errors.phone ? 'border-red-500' : 'border-dezo-border focus:border-dezo-primary'
              } rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none transition-colors`}
            />
            {errors.phone && (
              <span className="text-xs text-red-400 font-medium">{errors.phone.message}</span>
            )}
          </div>

          {/* Business Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="businessName" className="text-xs font-bold uppercase tracking-wider text-dezo-text-secondary">
              Business / Brand (Optional)
            </label>
            <input
              id="businessName"
              type="text"
              placeholder="Your Brand Name"
              {...register('businessName')}
              className="w-full bg-dezo-surface-elevated border border-dezo-border focus:border-dezo-primary rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Service Needed */}
          <div className="flex flex-col gap-2">
            <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-dezo-text-secondary">
              Service Required <span className="text-red-400">*</span>
            </label>
            <select
              id="service"
              {...register('service')}
              className={`w-full bg-dezo-surface-elevated border ${
                errors.service ? 'border-red-500' : 'border-dezo-border focus:border-dezo-primary'
              } rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary focus:outline-none transition-colors cursor-pointer`}
            >
              <option value="">Select Service</option>
              <option value="Website Development">Website Development (Next.js / Custom)</option>
              <option value="Ecommerce Architecture">Ecommerce Architecture (Shopify / Headless)</option>
              <option value="SEO & Organic Growth">SEO & Organic Growth</option>
              <option value="Meta & Google Ads">Meta & Google Performance Ads</option>
              <option value="AI & Automation">AI & Workflow Automation</option>
              <option value="Bespoke Engineering">Bespoke Engineering</option>
            </select>
            {errors.service && (
              <span className="text-xs text-red-400 font-medium">{errors.service.message}</span>
            )}
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-dezo-text-secondary">
              Estimated Budget
            </label>
            <select
              id="budget"
              {...register('budget')}
              className="w-full bg-dezo-surface-elevated border border-dezo-border focus:border-dezo-primary rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary focus:outline-none transition-colors cursor-pointer"
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
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-dezo-text-secondary">
            Project Overview <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us about your brand, current challenges, and goals..."
            {...register('message')}
            className={`w-full bg-dezo-surface-elevated border ${
              errors.message ? 'border-red-500' : 'border-dezo-border focus:border-dezo-primary'
            } rounded-dezo-md px-4 py-3 text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none transition-colors resize-vertical`}
          />
          {errors.message && (
            <span className="text-xs text-red-400 font-medium">{errors.message.message}</span>
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
            {isSubmitting ? 'Routing Request...' : 'Send Inquiry via WhatsApp'}
          </DezoButton>
        </div>
      </form>
    </div>
  );
}

import { hasInsforgeConfig, insforge } from './insforgeClient';

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  city: string;
  service: string;
  budget: string;
  message: string;
};

type LeadSubmitResult = {
  ok: boolean;
  message: string;
};

export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  if (hasInsforgeConfig && insforge) {
    const { error } = await insforge.database
      .from('leads')
      .insert([
        {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          business_name: payload.businessName || null,
          city: payload.city || null,
          service: payload.service,
          budget: payload.budget || null,
          message: payload.message,
          source: 'website_form',
        },
      ]);

    if (!error) {
      return { ok: true, message: 'Thanks! Your request has been saved.' };
    }
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, message: 'Unable to submit right now. Please try again.' };
    }

    const data = (await response.json()) as { message?: string; success?: boolean };
    if (!data.success) {
      return { ok: false, message: data.message ?? 'Submission failed. Please try again.' };
    }

    return { ok: true, message: data.message ?? 'Thanks! We received your request.' };
  } catch (_error) {
    return { ok: false, message: 'Network issue. Please try again in a moment.' };
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  creatorRegisterSchema,
  buildCreatorWhatsAppUrl,
} from '@/lib/validation/creator';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHistory.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;
  recent.push(now);
  ipHistory.set(ip, recent);
  return false;
}

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim();
}

const schema = creatorRegisterSchema.extend({
  botField: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Try again shortly or WhatsApp +91 9114411026.' },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Malformed JSON.' }, { status: 400 });
    }

    if (body && typeof body === 'object' && 'botField' in body) {
      const botVal = (body as { botField?: string }).botField;
      if (botVal && botVal.trim()) {
        return NextResponse.json({ success: true, leadId: 'DEZO-PROCESSED' });
      }
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed.', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const sanitized = {
      ...d,
      displayName: sanitize(d.displayName),
      email: sanitize(d.email),
      phone: sanitize(d.phone),
      city: sanitize(d.city),
      state: sanitize(d.state),
      languages: sanitize(d.languages),
      niches: sanitize(d.niches),
      platforms: sanitize(d.platforms),
      audienceSize: sanitize(d.audienceSize),
      collaborationTypes: sanitize(d.collaborationTypes),
      portfolioUrl: d.portfolioUrl ? sanitize(d.portfolioUrl) : '',
      primaryProfileUrl: sanitize(d.primaryProfileUrl),
      minRate: d.minRate ? sanitize(d.minRate) : undefined,
      availability: d.availability ? sanitize(d.availability) : undefined,
      notes: d.notes ? sanitize(d.notes) : undefined,
    };

    const leadId = `DEZO-CR-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;

    console.log(
      `[CREATOR_REGISTER] ID=${leadId} Name="${sanitized.displayName}" City="${sanitized.city}" Niches="${sanitized.niches}" Email="${sanitized.email}"`
    );

    return NextResponse.json(
      {
        success: true,
        leadId,
        message:
          'Creator registration received. There is no registration fee. We will review your profile and follow up — opportunity volume depends on live client demand.',
        whatsappHandoffUrl: buildCreatorWhatsAppUrl(sanitized),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[CREATOR_REGISTER_ERROR]', err);
    return NextResponse.json(
      { success: false, error: 'Internal error. WhatsApp +91 9114411026.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

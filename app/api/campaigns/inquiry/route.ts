import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  campaignInquirySchema,
  buildCampaignWhatsAppUrl,
} from '@/lib/validation/campaign';

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

const schema = campaignInquirySchema.extend({
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
      brandName: sanitize(d.brandName),
      contactName: sanitize(d.contactName),
      email: sanitize(d.email),
      phone: sanitize(d.phone),
      website: d.website ? sanitize(d.website) : '',
      industry: sanitize(d.industry),
      productOrService: sanitize(d.productOrService),
      targetMarket: sanitize(d.targetMarket),
      platforms: sanitize(d.platforms),
      creatorCategories: sanitize(d.creatorCategories),
      approximateCreators: sanitize(d.approximateCreators),
      objective: sanitize(d.objective),
      deliverables: sanitize(d.deliverables),
      timeline: sanitize(d.timeline),
      usageRights: d.usageRights ? sanitize(d.usageRights) : undefined,
      notes: d.notes ? sanitize(d.notes) : undefined,
    };

    const leadId = `DEZO-CMP-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;

    console.log(
      `[CAMPAIGN_INQUIRY] ID=${leadId} Brand="${sanitized.brandName}" Model="${sanitized.collaborationModel}" Budget="${sanitized.budgetRange}" Email="${sanitized.email}"`
    );

    return NextResponse.json(
      {
        success: true,
        leadId,
        message:
          'Campaign inquiry recorded. We will qualify the brief and reply within 24 business hours.',
        whatsappHandoffUrl: buildCampaignWhatsAppUrl(sanitized),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[CAMPAIGN_INQUIRY_ERROR]', err);
    return NextResponse.json(
      { success: false, error: 'Internal error. WhatsApp +91 9114411026.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

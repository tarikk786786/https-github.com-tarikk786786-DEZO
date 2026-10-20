import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, buildWhatsAppLeadUrl } from '@/lib/validation/contact';
import { z } from 'zod';

// Simple in-memory rate limiter: max 5 requests per 10 minutes per client IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  ipRequestHistory.set(ip, recent);
  return false;
}

// Clean old rate limit entries every 30 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of ipRequestHistory.entries()) {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        ipRequestHistory.delete(ip);
      } else {
        ipRequestHistory.set(ip, active);
      }
    }
  }, 30 * 60 * 1000).unref();
}

/**
 * Strips potential HTML and dangerous characters from user input strings.
 */
function sanitizeString(str: string): string {
  return str
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // remove control chars
    .trim();
}

const extendedContactSchema = contactFormSchema.extend({
  botField: z.string().optional(), // Honeypot field
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP resolution and rate limit check
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a few minutes before submitting another inquiry or reach out directly on WhatsApp at +91 9114411026.',
        },
        { status: 429 }
      );
    }

    // 2. Parse JSON body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    // 3. Honeypot check (anti-bot)
    if (body && typeof body === 'object' && 'botField' in body) {
      const botVal = (body as { botField?: string }).botField;
      if (botVal && botVal.trim().length > 0) {
        // Return 200 to trick bots without logging or storing
        return NextResponse.json({
          success: true,
          message: 'Inquiry received.',
          leadId: 'DEZO-PROCESSED',
        });
      }
    }

    // 4. Schema validation
    const parsed = extendedContactSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please verify your form inputs.',
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = parsed.data;

    // 5. Sanitize fields
    const sanitizedData = {
      name: sanitizeString(validData.name),
      email: sanitizeString(validData.email),
      phone: sanitizeString(validData.phone),
      businessName: validData.businessName ? sanitizeString(validData.businessName) : undefined,
      city: validData.city ? sanitizeString(validData.city) : undefined,
      service: validData.service,
      budget: validData.budget,
      message: sanitizeString(validData.message),
    };

    // 6. Generate Lead Reference ID
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const leadId = `DEZO-${timestamp}-${randomHex}`;

    // 7. Generate preformatted WhatsApp handoff URL
    const whatsappUrl = buildWhatsAppLeadUrl(sanitizedData);

    // 8. Log structured lead audit entry (safe for server logs)
    console.log(`[LEAD_SUBMISSION] ID=${leadId} Time=${new Date().toISOString()} Service="${sanitizedData.service}" City="${sanitizedData.city || 'N/A'}" Email="${sanitizedData.email}" Phone="${sanitizedData.phone.replace(/.(?=.{4})/g, '*')}"`);

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: 'Thank you! Your project inquiry has been recorded. Our team will review your requirements and respond within 24 business hours.',
        whatsappHandoffUrl: whatsappUrl,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('[LEAD_SUBMISSION_ERROR]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred while processing your request. Please message us directly on WhatsApp (+91 9114411026).',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Method Not Allowed. Use POST to submit project inquiries.',
    },
    { status: 405 }
  );
}

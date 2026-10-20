import { NextRequest, NextResponse } from 'next/server';
import { callLLM, generateGrowthAdvisory, LLMMessage } from '@/lib/ai/llm';
import { z } from 'zod';

// Rate limiting: max 12 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;
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

const advisoryInputSchema = z.object({
  mode: z.enum(['diagnostic', 'chat']).default('diagnostic'),
  // Diagnostic fields
  businessType: z.string().max(150).optional(),
  primaryGoal: z.string().max(250).optional(),
  location: z.string().max(100).optional(),
  currentBudget: z.string().max(100).optional(),
  currentChallenges: z.string().max(500).optional(),
  // Chat fields
  message: z.string().max(1000).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(1500),
      })
    )
    .max(10)
    .optional(),
});

function sanitizeString(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit reached. Please wait a moment or chat directly with our strategists on WhatsApp at +91 9114411026.',
        },
        { status: 429 }
      );
    }

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Malformed JSON payload.' }, { status: 400 });
    }

    const parseResult = advisoryInputSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input format.', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Mode 1: Diagnostic Structured Advisory
    if (data.mode === 'diagnostic' || (!data.message && data.businessType)) {
      const sanitized = {
        businessType: sanitizeString(data.businessType || 'General Business'),
        primaryGoal: sanitizeString(data.primaryGoal || 'Acquire more customers online'),
        location: data.location ? sanitizeString(data.location) : 'India',
        currentBudget: data.currentBudget ? sanitizeString(data.currentBudget) : 'Undisclosed',
        currentChallenges: data.currentChallenges ? sanitizeString(data.currentChallenges) : undefined,
      };

      const advisory = await generateGrowthAdvisory(sanitized);

      const whatsappText =
        `Hello DEZO Team! 👋\n\n` +
        `I ran the DEZO AI Growth Advisor for my business:\n` +
        `🏢 *Business:* ${sanitized.businessType}\n` +
        `🎯 *Goal:* ${sanitized.primaryGoal}\n` +
        `📍 *Location:* ${sanitized.location}\n` +
        `💡 *AI Recommended:* ${advisory.recommendedPackage} (${advisory.estimatedStartingPrice})\n\n` +
        `I would like to discuss this implementation.`;

      const whatsappUrl = `https://wa.me/919114411026?text=${encodeURIComponent(whatsappText)}`;

      return NextResponse.json({
        success: true,
        advisory,
        whatsappHandoffUrl: whatsappUrl,
      });
    }

    // Mode 2: Conversational Inquiry
    const userMessage = sanitizeString(data.message || 'What digital services does DEZO offer?');
    const systemInstruction = `You are DEZO AI, the digital growth consultant for DEZO (dezo.in), based in Bhubaneswar, Odisha.
Positioning: BUILD. MARKET. GROW.
Core offerings:
- Website Development: Starting from ₹7,999 (LAUNCH) to ₹79,999+ (SCALE), with written 30-Day Covered-Defect Warranty, 100% source-code ownership, and zero surprise fees.
- Marketplace Growth: Amazon India & Flipkart seller launch, Brand Registry, A+ catalog design, Sponsored Products advertising, and SP-API diagnostics.
- SEO & Organic Search: Local Google Maps dominance across Odisha (Bhubaneswar, Cuttack, Puri, Rourkela) and pan-India organic visibility.
- Founder & Studio: Tarik Islam, Patia, Bhubaneswar, Odisha (+91 9114411026).
Guidelines: Be concise, direct, helpful, and professional. Never hallucinate fake metrics or guarantee rankings. Encourage connecting on WhatsApp for custom roadmaps.`;

    const messages: LLMMessage[] = [{ role: 'system', content: systemInstruction }];

    if (data.history && data.history.length > 0) {
      for (const item of data.history) {
        messages.push({
          role: item.role === 'assistant' ? 'assistant' : 'user',
          content: sanitizeString(item.content),
        });
      }
    }

    messages.push({ role: 'user', content: userMessage });

    const reply = await callLLM(messages, { temperature: 0.4, maxTokens: 800 });

    const whatsappText = `Hello DEZO Team! I was chatting with DEZO AI regarding: "${userMessage.substring(0, 100)}..." and would like to speak with a strategist.`;
    const whatsappUrl = `https://wa.me/919114411026?text=${encodeURIComponent(whatsappText)}`;

    return NextResponse.json({
      success: true,
      reply,
      whatsappHandoffUrl: whatsappUrl,
    });
  } catch (err: unknown) {
    console.error('[AI_ADVISOR_ROUTE_ERROR]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'AI service temporarily unavailable. Please connect directly on WhatsApp (+91 9114411026).',
      },
      { status: 500 }
    );
  }
}

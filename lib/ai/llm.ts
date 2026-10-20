/**
 * DEZO Intelligent Multi-Provider LLM Engine
 * Resilient multi-provider cascade: Google Gemini 2.5 Flash -> Groq -> OpenRouter -> DeepSeek
 * Strictly server-side: all API credentials remain safely in environment variables.
 */

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  preferredProvider?: 'gemini' | 'groq' | 'openrouter' | 'deepseek';
}

/**
 * Call Google Gemini REST API (gemini-2.5-flash / gemini-1.5-flash)
 */
async function callGemini(
  messages: LLMMessage[],
  options: LLMCompletionOptions
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const model = options.model || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Extract system prompt if present
  const systemMsg = messages.find((m) => m.role === 'system');
  const chatMessages = messages.filter((m) => m.role !== 'system');

  const contents = chatMessages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const payload: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: options.temperature ?? 0.3,
      maxOutputTokens: options.maxTokens ?? 1500,
    },
  };

  if (systemMsg) {
    payload.systemInstruction = {
      parts: [{ text: systemMsg.content }],
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Gemini returned an empty candidate text response');
    }
    return candidateText;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Call Groq Ultra-Fast Inference Engine (openai/gpt-oss-120b or qwen/qwen3.8-27b)
 */
async function callGroq(
  messages: LLMMessage[],
  options: LLMCompletionOptions
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not set');

  const model = options.model || 'openai/gpt-oss-120b';
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 1200,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Groq HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Call OpenRouter Unified Router
 */
async function callOpenRouter(
  messages: LLMMessage[],
  options: LLMCompletionOptions
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set');

  const model = options.model || 'deepseek/deepseek-chat';
  const url = 'https://openrouter.ai/api/v1/chat/completions';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://dezo.in',
        'X-Title': 'DEZO Growth Platform',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 1200,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenRouter HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Call DeepSeek / OpenAI-compatible endpoint
 */
async function callDeepSeek(
  messages: LLMMessage[],
  options: LLMCompletionOptions
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY or OPENAI_API_KEY is not set');

  const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/chat/completions';
  const model = options.model || 'deepseek-chat';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 1200,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`DeepSeek HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Universal Multi-Provider LLM Caller with Automatic Resilient Failover
 */
export async function callLLM(
  messages: LLMMessage[],
  options: LLMCompletionOptions = {}
): Promise<string> {
  const providers = [
    { name: 'gemini', fn: () => callGemini(messages, options) },
    { name: 'groq', fn: () => callGroq(messages, options) },
    { name: 'openrouter', fn: () => callOpenRouter(messages, options) },
    { name: 'deepseek', fn: () => callDeepSeek(messages, options) },
  ];

  // If a specific provider was explicitly requested, try it first
  if (options.preferredProvider) {
    const idx = providers.findIndex((p) => p.name === options.preferredProvider);
    if (idx > -1) {
      const [preferred] = providers.splice(idx, 1);
      providers.unshift(preferred);
    }
  }

  const errors: string[] = [];

  for (const provider of providers) {
    try {
      const result = await provider.fn();
      if (result && result.trim().length > 0) {
        return result;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${provider.name}: ${msg}`);
      // Continue to next provider in cascade
    }
  }

  throw new Error(`All LLM providers failed:\n${errors.join('\n')}`);
}

/**
 * Generate high-converting, personalized outreach pitch for link building
 */
export async function generatePersonalizedPitch(params: {
  prospectDomain: string;
  articleTopic: string;
  publisherName?: string;
  targetDezoUrl: string;
  anchorText: string;
}): Promise<{ subject: string; body: string }> {
  const systemPrompt = `You are the Head of Editorial Communications for DEZO (dezo.in), a premier digital infrastructure and growth systems agency in Bhubaneswar, Odisha.
Your mission is to craft authentic, non-spammy, high-value editorial collaboration pitches for reputable publishers and websites.
Never write automated spam or generic blast emails. Highlight mutual value, specific content synergy, and genuine research.`;

  const userPrompt = `Draft an editorial pitch to:
Publisher / Domain: ${params.prospectDomain}
Contact / Editor: ${params.publisherName || 'Editor'}
Topic of interest: ${params.articleTopic}
Suggested link: ${params.targetDezoUrl}
Proposed anchor text: "${params.anchorText}"

Format your response as a JSON object with keys:
"subject": "Clear, compelling subject line",
"body": "Clean, professional email pitch in 3 short paragraphs with zero marketing fluff."`;

  try {
    const raw = await callLLM(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.4 }
    );

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      subject: `Editorial Collaboration: ${params.articleTopic} — DEZO Research`,
      body: raw,
    };
  } catch {
    // Graceful deterministic fallback
    return {
      subject: `Collaboration Opportunity on ${params.articleTopic} — DEZO`,
      body: `Hi ${params.publisherName || 'Team'},\n\nI noticed your recent coverage on ${params.articleTopic} on ${params.prospectDomain}. At DEZO (dezo.in), our engineering team published a practical case study that directly addresses this topic.\n\nWould you be open to reviewing a contribution or referencing this resource?\n\nBest regards,\nEditorial Team | DEZO Studio, Bhubaneswar`,
    };
  }
}

/**
 * AI Growth Advisory & Diagnostic Bot Engine
 */
export async function generateGrowthAdvisory(params: {
  businessType: string;
  primaryGoal: string;
  location?: string;
  currentBudget?: string;
  currentChallenges?: string;
}): Promise<{
  recommendedPackage: string;
  keyActionPlan: string[];
  rationale: string;
  suggestedServices: string[];
  estimatedStartingPrice: string;
}> {
  const systemPrompt = `You are the Principal Solutions Architect at DEZO (dezo.in), a premier digital growth agency in Bhubaneswar, Odisha, India.
Your positioning is BUILD. MARKET. GROW.
You give honest, transparent, commercially sound recommendations.
Reference DEZO's real services:
- Website Development: LAUNCH (₹7,999+), BUSINESS (₹14,999+), ECOMMERCE (₹24,999+), PERFORMANCE (₹39,999+), SCALE/CUSTOM (₹79,999+)
- 30-Day Covered-Defect Warranty, 100% Code Handover, Scope Lock Promise
- Marketplace Systems: Amazon & Flipkart Catalog, Ungating, Brand Registry, SP-API Ad Management (from ₹9,999)
- SEO & Organic Growth: Local Google Maps dominance in Odisha and national organic rankings.
Never promise unrealistic overnight riches or fabricated metrics.`;

  const userPrompt = `Client Details:
- Business / Category: ${params.businessType}
- Target Goal: ${params.primaryGoal}
- Location: ${params.location || 'India'}
- Budget Range: ${params.currentBudget || 'Undisclosed'}
- Current Challenges: ${params.currentChallenges || 'Scaling digital inquiries and sales'}

Provide your advice strictly in JSON format with these exact keys:
{
  "recommendedPackage": "Name of primary DEZO package or service",
  "estimatedStartingPrice": "e.g. Starting from ₹14,999",
  "rationale": "Clear 2-sentence explanation of why this fits their current stage",
  "keyActionPlan": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "suggestedServices": ["Service 1", "Service 2", "Service 3"]
}`;

  try {
    const raw = await callLLM(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.3 }
    );

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (err) {
    console.warn('[Advisory Fallback Triggered]:', err);
  }

  // Deterministic fallback matching PRD catalog
  return {
    recommendedPackage: 'BUSINESS Website & Local Growth Foundation',
    estimatedStartingPrice: 'Starting from ₹14,999',
    rationale: `For ${params.businessType} in ${params.location || 'India'}, establishing an authoritative mobile-responsive website with local SEO is the highest-ROI first move.`,
    keyActionPlan: [
      'Deploy modern Next.js/Tailwind business website with sub-second load times',
      'Configure direct WhatsApp inquiry routing and high-intent contact forms',
      'Optimize Google Business Profile for local Bhubaneswar/regional search terms',
      'Set up baseline analytics and tracking to measure inquiry volume',
    ],
    suggestedServices: ['Custom Web Development', 'SEO & Organic Growth', 'Conversion Funnel Optimization'],
  };
}

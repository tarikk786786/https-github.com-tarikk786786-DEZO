/**
 * LLM Client using DeepSeek / OpenAI-compatible API
 * Securely uses process.env.DEEPSEEK_API_KEY or process.env.OPENROUTER_API_KEY
 * Never exposes credentials to client-side code.
 */

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function callLLM(
  messages: LLMMessage[],
  options: LLMCompletionOptions = {}
): Promise<string> {
  const apiKey =
    process.env.DEEPSEEK_API_KEY ||
    process.env.OPENROUTER_API_KEY ||
    process.env.OPENAI_API_KEY ||
    '';

  if (!apiKey) {
    throw new Error('LLM API key is not configured. Please set DEEPSEEK_API_KEY or OPENROUTER_API_KEY in environment variables.');
  }

  const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/chat/completions';
  const model = options.model || (baseUrl.includes('deepseek') ? 'deepseek-chat' : 'openai/gpt-4o-mini');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

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
      throw new Error(`LLM API returned HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    const message = error instanceof Error ? error.message : String(error);
    console.error('[DEZO LLM Error]:', message);
    throw error;
  }
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
  const systemPrompt = `You are the Head of Editorial Communications for DEZO (dezo.in), a premier digital infrastructure and growth systems agency in India.
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
    // Graceful fallback
    return {
      subject: `Collaboration Opportunity on ${params.articleTopic} — DEZO`,
      body: `Hi ${params.publisherName || 'Team'},\n\nI noticed your recent coverage on ${params.articleTopic} on ${params.prospectDomain}. At DEZO (dezo.in), our engineering team published a case study that addresses this specifically.\n\nWould you be open to reviewing a contribution or referencing this resource?\n\nBest regards,\nEditorial Team | DEZO`,
    };
  }
}

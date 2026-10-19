import { NextRequest, NextResponse } from 'next/server';
import { generatePersonalizedPitch } from '@/lib/ai/llm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prospectDomain, articleTopic, publisherName, targetDezoUrl, anchorText } = body;

    if (!prospectDomain) {
      return NextResponse.json({ error: 'prospectDomain is required' }, { status: 400 });
    }

    const pitch = await generatePersonalizedPitch({
      prospectDomain,
      articleTopic: articleTopic || 'Digital Infrastructure & Commerce',
      publisherName,
      targetDezoUrl: targetDezoUrl || 'https://dezo.in',
      anchorText: anchorText || 'DEZO growth systems',
    });

    return NextResponse.json({
      success: true,
      pitch,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getGscConfiguration, getSearchPerformance } from '@/lib/google/searchConsole';

export async function GET(req: NextRequest) {
  const config = getGscConfiguration();

  // If not configured, return safe status and guidance without failing
  if (!config.configured) {
    return NextResponse.json({
      status: 'unconfigured',
      message: 'Google Search Console API credentials are not set in environment.',
      instructions: {
        step1: 'Create a Google Cloud Project and enable Google Search Console API.',
        step2: 'Create a Service Account and download its JSON key.',
        step3: 'In Google Search Console, add the service account email as a User (Full or Restricted) to sc-domain:dezo.in.',
        step4: 'Set GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL and GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY in your hosting environment.',
      },
      config,
    });
  }

  // Authorization check for actual query reporting (protect endpoint with an optional internal secret)
  const authHeader = req.headers.get('authorization');
  const internalSecret = process.env.INTERNAL_REPORTING_SECRET;
  if (internalSecret && authHeader !== `Bearer ${internalSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dimensionParam = req.nextUrl.searchParams.get('dimension') || 'query';
  const dimensions = dimensionParam === 'page' ? ['page' as const] : ['query' as const];

  const result = await getSearchPerformance({
    dimensions,
    rowLimit: 25,
  });

  return NextResponse.json(result);
}

import { NextRequest, NextResponse } from 'next/server';
import type { ProbeResult } from '@/lib/tools/probeTypes';
import { validateToolInput } from '@/lib/tools/urlValidator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export type { ProbeResult };

const INTERESTING_HEADERS = [
  'content-type',
  'server',
  'x-powered-by',
  'strict-transport-security',
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'cache-control',
  'cf-ray',
  'x-shopify-stage',
  'x-shopid',
];

export async function POST(req: NextRequest) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const validation = validateToolInput(body.url || '');
  if (!validation.isValid || !validation.sanitizedUrl || validation.isDomainOrKeyword) {
    return NextResponse.json(
      {
        ok: false,
        error: validation.errorMessage || 'A public http(s) URL is required for probing.',
      },
      { status: 400 }
    );
  }

  const target = validation.sanitizedUrl;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const started = Date.now();

  try {
    const res = await fetch(target, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'DEZO-ToolsLab-Probe/1.0 (+https://dezo.in/tools)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      cache: 'no-store',
    });

    const ttfbMs = Date.now() - started;
    const headers: Record<string, string> = {};
    for (const key of INTERESTING_HEADERS) {
      const val = res.headers.get(key);
      if (val) headers[key] = val.slice(0, 500);
    }

    const contentType = res.headers.get('content-type') || undefined;
    let title: string | undefined;
    let hasCanonical = false;
    let hasJsonLd = false;
    let hasViewport = false;
    let hasRobotsMeta = false;
    let htmlBytesSampled = 0;

    if (contentType?.includes('text/html')) {
      const buf = await res.arrayBuffer();
      const slice = buf.byteLength > 180_000 ? buf.slice(0, 180_000) : buf;
      htmlBytesSampled = slice.byteLength;
      const html = new TextDecoder('utf-8').decode(slice);
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      title = titleMatch?.[1]?.trim().slice(0, 180);
      hasCanonical = /rel=["']canonical["']/i.test(html);
      hasJsonLd = /application\/ld\+json/i.test(html);
      hasViewport = /name=["']viewport["']/i.test(html);
      hasRobotsMeta = /name=["']robots["']/i.test(html);
    }

    const result: ProbeResult = {
      ok: true,
      url: target,
      finalUrl: res.url,
      status: res.status,
      ttfbMs,
      contentType,
      server: res.headers.get('server') || undefined,
      headers,
      title,
      hasCanonical,
      hasJsonLd,
      hasViewport,
      hasRobotsMeta,
      htmlBytesSampled,
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const timedOut = err instanceof Error && err.name === 'AbortError';
    const result: ProbeResult = {
      ok: false,
      url: target,
      timedOut,
      ttfbMs: Date.now() - started,
      headers: {},
      error: timedOut
        ? 'Probe timed out after 8s.'
        : err instanceof Error
          ? err.message
          : 'Probe failed.',
    };
    return NextResponse.json(result, { status: 200 });
  } finally {
    clearTimeout(timeout);
  }
}

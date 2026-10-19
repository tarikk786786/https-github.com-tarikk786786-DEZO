import { NextRequest, NextResponse } from 'next/server';
import { generateBacklinksForDomain, cleanDomainInput, BACKLINK_PLATFORMS } from '@/lib/tools/backlinksData';

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url') || '';
  const format = req.nextUrl.searchParams.get('format') || 'json';

  if (!urlParam.trim()) {
    return NextResponse.json({
      success: true,
      totalPlatforms: BACKLINK_PLATFORMS.length,
      platforms: BACKLINK_PLATFORMS,
    });
  }

  const { host, fullUrl } = cleanDomainInput(urlParam);
  const items = generateBacklinksForDomain(urlParam);

  if (format === 'text') {
    const textOutput = items.map((i) => i.backlinkUrl).join('\n');
    return new NextResponse(textOutput, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return NextResponse.json({
    success: true,
    host,
    fullUrl,
    total: items.length,
    highAuthorityDA85Plus: items.filter((i) => i.estimatedDA >= 85).length,
    backlinks: items,
  });
}

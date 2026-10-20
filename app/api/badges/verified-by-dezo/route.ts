import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const theme = searchParams.get('theme') || 'dark'; // 'dark' | 'light'
  const metric = searchParams.get('metric') || '100% Core Web Vitals';
  const label = searchParams.get('label') || 'DEZO LAB VERIFIED';

  const isLight = theme === 'light';
  const bgColor = isLight ? '#ffffff' : '#0a0a0a';
  const borderColor = isLight ? '#e5e7eb' : '#262626';
  const textColor = isLight ? '#0a0a0a' : '#ffffff';
  const mutedTextColor = isLight ? '#059669' : '#34d399';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="34" viewBox="0 0 240 34" fill="none" role="img" aria-label="${label} · ${metric}">
  <title>${label} · ${metric}</title>
  <rect x="0.5" y="0.5" width="239" height="33" rx="17" fill="${bgColor}" stroke="${borderColor}"/>
  
  <!-- Security Shield & Check Icon -->
  <g transform="translate(10, 8)">
    <path d="M9 1L2 4V9C2 13.5 5 16.5 9 17.5C13 16.5 16 13.5 16 9V4L9 1Z" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.25"/>
    <path d="M6 9L8 11L12 7" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Divider -->
  <line x1="36" y1="9" x2="36" y2="25" stroke="${borderColor}" stroke-width="1"/>

  <!-- Text Hierarchy -->
  <text x="44" y="16.5" fill="${textColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="9.5" font-weight="700" letter-spacing="0.04em">
    ${label.toUpperCase()}
  </text>
  <text x="44" y="26.5" fill="${mutedTextColor}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="8.5" font-weight="600" letter-spacing="0.06em">
    ${metric.toUpperCase()}
  </text>

  <!-- DEZO Stamp -->
  <rect x="188" y="9" width="42" height="16" rx="3" fill="#ff4d00" fill-opacity="0.15" stroke="#ff4d00" stroke-width="0.75"/>
  <text x="209" y="20.5" fill="#ff4d00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="800" text-anchor="middle" letter-spacing="0.05em">
    DEZO
  </text>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
}

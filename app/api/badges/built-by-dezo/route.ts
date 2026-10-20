import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const theme = searchParams.get('theme') || 'dark'; // 'dark' | 'light' | 'brand'
  const text = searchParams.get('text') || 'Built by DEZO';
  const subtext = searchParams.get('subtext') || 'dezo.in';
  const style = searchParams.get('style') || 'pill'; // 'pill' | 'flat'

  const isLight = theme === 'light';
  const isBrand = theme === 'brand';

  const bgColor = isBrand ? '#ff4d00' : isLight ? '#ffffff' : '#0a0a0a';
  const borderColor = isBrand ? '#ff6a26' : isLight ? '#e5e7eb' : '#262626';
  const textColor = isBrand ? '#000000' : isLight ? '#0a0a0a' : '#ffffff';
  const mutedTextColor = isBrand ? '#261000' : isLight ? '#6b7280' : '#a3a3a3';
  const accentColor = isBrand ? '#000000' : '#ff4d00';
  const rx = style === 'pill' ? '14' : '4';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="34" viewBox="0 0 220 34" fill="none" role="img" aria-label="${text} · ${subtext}">
  <title>${text} · ${subtext}</title>
  <rect x="0.5" y="0.5" width="219" height="33" rx="${rx}" fill="${bgColor}" stroke="${borderColor}"/>
  
  <!-- DEZO Geometric Icon -->
  <g transform="translate(10, 8)">
    <rect width="18" height="18" rx="3" fill="${accentColor}"/>
    <path d="M5 5H10C12.2091 5 14 6.79086 14 9C14 11.2091 12.2091 13 10 13H5V5Z" fill="${isBrand ? '#ff4d00' : '#ffffff'}"/>
    <circle cx="8" cy="9" r="1.5" fill="${accentColor}"/>
  </g>

  <!-- Divider -->
  <line x1="38" y1="9" x2="38" y2="25" stroke="${borderColor}" stroke-width="1"/>

  <!-- Text Hierarchy -->
  <text x="46" y="17" fill="${textColor}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="0.02em">
    ${text.toUpperCase()}
  </text>
  <text x="46" y="27" fill="${mutedTextColor}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="8.5" font-weight="500" letter-spacing="0.08em">
    ${subtext.toUpperCase()}
  </text>

  <!-- Live Pulse Dot -->
  <circle cx="206" cy="17" r="3.5" fill="#10b981"/>
  <circle cx="206" cy="17" r="5" stroke="#10b981" stroke-width="0.75" stroke-opacity="0.4"/>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
}

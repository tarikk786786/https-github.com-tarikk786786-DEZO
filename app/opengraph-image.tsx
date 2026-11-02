import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DEZO | Digital Infrastructure & Performance Marketing';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0B0B0A',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          border: '12px solid #B08D57',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#B08D57',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0B0B0A',
                fontSize: '28px',
                fontWeight: 900,
              }}
            >
              D
            </div>
            <span style={{ color: '#FAF8F5', fontSize: '36px', fontWeight: 900, letterSpacing: '4px' }}>
              DEZO
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1C1B18',
              border: '2px solid #B08D57',
              padding: '8px 20px',
              color: '#B08D57',
              fontSize: '16px',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '2px',
            }}
          >
            181+ VERIFIED DEPLOYMENTS
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <div
            style={{
              color: '#FAF8F5',
              fontSize: '64px',
              fontWeight: 900,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            Digital Infrastructure.
            <br />
            <span style={{ color: '#B08D57' }}>Engineered for Growth.</span>
          </div>

          <p style={{ color: '#A09D95', fontSize: '24px', lineHeight: 1.4, margin: 0 }}>
            Next.js Web Applications · Technical SEO · Meta &amp; Google Ads · Amazon &amp; Flipkart Operations
          </p>
        </div>

        {/* Footer Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '2px solid #2A2824',
            paddingTop: '24px',
            color: '#FAF8F5',
            fontSize: '18px',
            fontFamily: 'monospace',
          }}
        >
          <span style={{ color: '#B08D57' }}>https://dezo.in</span>
          <span style={{ color: '#88857E' }}>Bhubaneswar Studio · Pan-India Commercial Execution</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

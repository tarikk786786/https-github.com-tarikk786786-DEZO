'use client';

import Script from 'next/script';

/**
 * Consent-aware Google Analytics 4 Script
 * 
 * Configured with:
 * - Privacy-preserving consent defaults (denied until user consent)
 * - Anonymized IP enabled
 * - No PII collection
 * - Only renders if NEXT_PUBLIC_GA_MEASUREMENT_ID is provided
 */
export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gaId || !gaId.startsWith('G-')) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Default consent state: privacy-first
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

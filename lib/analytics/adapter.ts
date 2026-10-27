/**
 * DEZO Analytics Provider Adapter (PRD Section 26)
 * Normalized event tracking for privacy-first analytics (Umami compatible).
 */

export type DezoAnalyticsEvent =
  | 'cta_click'
  | 'form_started'
  | 'form_completed'
  | 'case_study_open'
  | 'service_open'
  | 'pricing_open'
  | 'phone_click'
  | 'whatsapp_click'
  | 'marketplace_demo_interacted'
  | 'campaign_inquiry'
  | 'creator_apply';

export interface AnalyticsPayload {
  event: DezoAnalyticsEvent;
  data?: Record<string, string | number | boolean>;
}

export function trackEvent(event: DezoAnalyticsEvent, data?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  // Umami custom event tracking
  const windowWithAnalytics = window as unknown as {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  };

  if (windowWithAnalytics.umami && typeof windowWithAnalytics.umami.track === 'function') {
    windowWithAnalytics.umami.track(event, data);
  }

  // Google Analytics 4 event tracking (if GA4 is loaded)
  if (typeof windowWithAnalytics.gtag === 'function') {
    windowWithAnalytics.gtag('event', event, data);
  }

  // Console telemetry in dev mode
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEZO Telemetry] ${event}`, data);
  }
}

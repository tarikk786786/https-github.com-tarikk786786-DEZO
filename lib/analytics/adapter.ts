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
  | 'marketplace_demo_interacted';

export interface AnalyticsPayload {
  event: DezoAnalyticsEvent;
  data?: Record<string, string | number | boolean>;
}

export function trackEvent(event: DezoAnalyticsEvent, data?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  // Umami custom event tracking
  const windowWithUmami = window as unknown as {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  };

  if (windowWithUmami.umami && typeof windowWithUmami.umami.track === 'function') {
    windowWithUmami.umami.track(event, data);
  } else {
    // Console telemetry in dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEZO Telemetry] ${event}`, data);
    }
  }
}

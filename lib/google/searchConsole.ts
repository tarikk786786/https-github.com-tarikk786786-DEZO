/**
 * Google Search Console (Search Central) Reporting Integration
 * 
 * Provides secure server-side access to Google Search Console API.
 * Never executes on the client or exposes credentials to the browser.
 * 
 * Required Environment Variables (configure in production/Vercel/env):
 * - GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL: Service account email (e.g. gsc-reporter@project.iam.gserviceaccount.com)
 * - GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY: Service account private key PEM
 * - GOOGLE_SEARCH_CONSOLE_SITE_URL: Optional override (default: "sc-domain:dezo.in" or "https://dezo.in/")
 */

import { google } from 'googleapis';

export interface GscStatus {
  configured: boolean;
  siteUrl: string;
  authMethod: 'service_account' | 'none';
  clientEmail?: string;
  missingEnv: string[];
}

export function getGscConfiguration(): GscStatus {
  const clientEmail = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY;
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'sc-domain:dezo.in';

  const missing: string[] = [];
  if (!clientEmail) missing.push('GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL');
  if (!privateKey) missing.push('GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY');

  return {
    configured: missing.length === 0,
    siteUrl,
    authMethod: missing.length === 0 ? 'service_account' : 'none',
    clientEmail: clientEmail ? clientEmail.replace(/(.{4}).*(@.*)/, '$1***$2') : undefined,
    missingEnv: missing,
  };
}

export async function createGscClient() {
  const clientEmail = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Google Search Console service account credentials are not configured.');
  }

  // Handle newlines in environment variable PEM string
  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth,
  });

  return { searchconsole, auth };
}

export interface SearchAnalyticsQueryOptions {
  startDate?: string;
  endDate?: string;
  dimensions?: ('date' | 'query' | 'page' | 'country' | 'device')[];
  rowLimit?: number;
}

/**
 * Fetch top search queries, clicks, impressions, CTR, and position.
 */
export async function getSearchPerformance(options: SearchAnalyticsQueryOptions = {}) {
  const config = getGscConfiguration();
  if (!config.configured) {
    return {
      success: false,
      configured: false,
      message: 'GSC API is not configured. Provide service account credentials in environment.',
      data: null,
    };
  }

  try {
    const { searchconsole } = await createGscClient();
    const siteUrl = config.siteUrl;

    const today = new Date();
    const defaultEnd = new Date(today.setDate(today.getDate() - 3)).toISOString().split('T')[0];
    const defaultStart = new Date(today.setDate(today.getDate() - 28)).toISOString().split('T')[0];

    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: options.startDate || defaultStart,
        endDate: options.endDate || defaultEnd,
        dimensions: options.dimensions || ['query'],
        rowLimit: options.rowLimit || 25,
      },
    });

    return {
      success: true,
      configured: true,
      siteUrl,
      rows: response.data.rows || [],
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      configured: true,
      error: message,
      siteUrl: config.siteUrl,
    };
  }
}

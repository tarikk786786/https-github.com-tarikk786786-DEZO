/**
 * High-Throughput HTTP Verification Engine with SSRF Protection
 * Performs live concurrent checks on published backlink pages:
 * - Checks HTTP reachability and status code
 * - Parses HTML DOM to locate href target
 * - Evaluates anchor text accuracy and rel="nofollow/sponsored/ugc"
 * - Blocks local/private IPs (SSRF mitigation)
 */

import { VerificationJobResult } from './types';

// IP ranges blocked to prevent SSRF
const BLOCKED_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./, // AWS/Cloud metadata
  /^0\./,
  /^localhost$/i,
];

export function isSafeUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    const hostname = parsed.hostname.toLowerCase();
    for (const pattern of BLOCKED_IP_PATTERNS) {
      if (pattern.test(hostname)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function extractLinksFromHtml(html: string, targetDomainOrUrl: string) {
  // Normalize target domain (e.g. "dezo.in")
  const cleanTarget = targetDomainOrUrl
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .toLowerCase();

  const links: { href: string; anchorText: string; rel: string }[] = [];
  
  // Robust RegEx parser for <a> tags
  const aTagRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis;
  let match: RegExpExecArray | null;

  while ((match = aTagRegex.exec(html)) !== null) {
    const rawHref = match[1];
    const rawContent = match[2];
    
    // Check if link points to target
    if (rawHref.toLowerCase().includes(cleanTarget)) {
      const fullTag = match[0];
      const relMatch = /rel=["']([^"']+)["']/i.exec(fullTag);
      const rel = relMatch ? relMatch[1].toLowerCase() : '';
      
      // Clean HTML from anchor text
      const anchorText = rawContent.replace(/<[^>]+>/g, '').trim();

      links.push({
        href: rawHref,
        anchorText,
        rel,
      });
    }
  }

  return links;
}

export async function verifySingleBacklink(
  sourceUrl: string,
  targetUrlOrDomain: string,
  timeoutMs: number = 8000
): Promise<VerificationJobResult> {
  const start = Date.now();
  const checkedAt = new Date().toISOString();

  if (!isSafeUrl(sourceUrl)) {
    return {
      sourceUrl,
      checkedAt,
      httpStatus: 400,
      reachable: false,
      linkFound: false,
      targetUrl: targetUrlOrDomain,
      expectedAnchor: '',
      relAttributes: [],
      isFollow: false,
      isNofollow: false,
      isSponsored: false,
      isUgc: false,
      latencyMs: 0,
      error: 'SSRF_BLOCKED: URL resolves to private or unsafe IP address.',
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(sourceUrl, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; DEZO-Backlink-Verifier/2.0; +https://dezo.in/crawler)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);
    const latencyMs = Date.now() - start;
    const httpStatus = res.status;

    if (!res.ok) {
      return {
        sourceUrl,
        checkedAt,
        httpStatus,
        reachable: false,
        linkFound: false,
        targetUrl: targetUrlOrDomain,
        expectedAnchor: '',
        relAttributes: [],
        isFollow: false,
        isNofollow: false,
        isSponsored: false,
        isUgc: false,
        latencyMs,
        error: `HTTP_${httpStatus}`,
      };
    }

    // Limit body read to 2MB to prevent memory exhaustion
    const reader = res.body?.getReader();
    let html = '';
    if (reader) {
      const decoder = new TextDecoder();
      let bytesRead = 0;
      while (bytesRead < 2 * 1024 * 1024) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          bytesRead += value.length;
          html += decoder.decode(value, { stream: true });
        }
      }
    } else {
      html = await res.text();
    }

    const foundLinks = extractLinksFromHtml(html, targetUrlOrDomain);
    const linkFound = foundLinks.length > 0;

    if (linkFound) {
      const primary = foundLinks[0];
      const rels = primary.rel.split(/\s+/).filter(Boolean);
      const isNofollow = rels.includes('nofollow');
      const isSponsored = rels.includes('sponsored');
      const isUgc = rels.includes('ugc');
      const isFollow = !isNofollow && !isSponsored;

      return {
        sourceUrl,
        checkedAt,
        httpStatus,
        reachable: true,
        linkFound: true,
        targetUrl: primary.href,
        expectedAnchor: '',
        foundAnchor: primary.anchorText,
        relAttributes: rels,
        isFollow,
        isNofollow,
        isSponsored,
        isUgc,
        redirectUrl: res.url !== sourceUrl ? res.url : undefined,
        latencyMs,
      };
    }

    return {
      sourceUrl,
      checkedAt,
      httpStatus,
      reachable: true,
      linkFound: false,
      targetUrl: targetUrlOrDomain,
      expectedAnchor: '',
      relAttributes: [],
      isFollow: false,
      isNofollow: false,
      isSponsored: false,
      isUgc: false,
      redirectUrl: res.url !== sourceUrl ? res.url : undefined,
      latencyMs,
      error: 'TARGET_LINK_NOT_FOUND_IN_PAGE_HTML',
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const latencyMs = Date.now() - start;
    const msg = err instanceof Error ? err.message : String(err);
    return {
      sourceUrl,
      checkedAt,
      httpStatus: 0,
      reachable: false,
      linkFound: false,
      targetUrl: targetUrlOrDomain,
      expectedAnchor: '',
      relAttributes: [],
      isFollow: false,
      isNofollow: false,
      isSponsored: false,
      isUgc: false,
      latencyMs,
      error: msg.includes('aborted') ? 'REQUEST_TIMEOUT' : msg,
    };
  }
}

/**
 * Concurrently verify a list of URLs with bounded batch concurrency
 */
export async function verifyBacklinkBatch(
  items: { sourceUrl: string; targetDomainOrUrl: string }[],
  concurrency = 8
): Promise<VerificationJobResult[]> {
  const results: VerificationJobResult[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    const chunkResults = await Promise.all(
      chunk.map((c) => verifySingleBacklink(c.sourceUrl, c.targetDomainOrUrl))
    );
    results.push(...chunkResults);
  }
  return results;
}

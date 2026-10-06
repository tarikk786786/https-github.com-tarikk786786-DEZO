/**
 * DEZO Tools Lab multi-engine analyzer
 * Category-aware findings; uses optional public probe for URL tools.
 */

import {
  UniversalAuditReport,
  AuditFinding,
  ScoreCategory,
  ToolCategory,
  SeverityLevel,
} from './types';
import { validateToolInput } from './urlValidator';
import type { ProbeResult } from './probeTypes';

function finding(
  partial: Omit<AuditFinding, 'priority'> & { priority?: AuditFinding['priority'] }
): AuditFinding {
  return {
    priority: partial.priority || 'P2 - Moderate',
    ...partial,
  };
}

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function scoreFromFindings(findings: AuditFinding[]): number {
  const base = 92;
  const impact = findings.reduce((acc, f) => acc + (f.scoreImpact || 0), 0);
  return Math.max(28, Math.min(98, base + impact));
}

function tierFromScore(overallScore: number): UniversalAuditReport['ratingTier'] {
  if (overallScore >= 88) return 'Excellent';
  if (overallScore < 65) return 'Critical Issues Detected';
  if (overallScore < 78) return 'Needs Improvement';
  return 'Good';
}

function categoriesFrom(
  rows: Array<{ name: string; score: number; weight: number }>
): ScoreCategory[] {
  return rows.map((r) => ({
    ...r,
    status: r.score >= 85 ? 'optimal' : r.score >= 70 ? 'needs_work' : 'poor',
  }));
}

function extractAsin(input: string): string | null {
  const m = input.match(/(?:dp|gp\/product|asin=)\/?([A-Z0-9]{10})/i);
  return m?.[1]?.toUpperCase() || null;
}

async function probeUrl(url: string): Promise<ProbeResult | null> {
  try {
    const res = await fetch('/api/tools/probe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) return null;
    return (await res.json()) as ProbeResult;
  } catch {
    return null;
  }
}

function buildSeoFindings(target: string, probe: ProbeResult | null): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const titleLen = probe?.title?.length ?? 0;

  if (probe?.ok) {
    findings.push(
      finding({
        id: 'seo_http_status',
        metric: 'HTTP Status',
        status: probe.status && probe.status < 400 ? 'good' : 'critical',
        scoreImpact: probe.status && probe.status < 400 ? 0 : -18,
        title:
          probe.status && probe.status < 400
            ? `Responded ${probe.status}`
            : `Unhealthy status ${probe.status || 'unknown'}`,
        observation: `Public probe reached ${probe.finalUrl || target} with status ${probe.status}.`,
        whyItMatters: 'Crawl and conversion both fail if the primary URL is unreachable.',
        howToFix: 'Resolve redirects/errors so the canonical marketing URL returns 200.',
        priority: probe.status && probe.status < 400 ? 'P3 - Minor' : 'P0 - Immediate',
      })
    );
  }

  findings.push(
    finding({
      id: 'seo_canonical',
      metric: 'Canonical Tag',
      status: probe?.hasCanonical ? 'good' : 'warning',
      scoreImpact: probe?.hasCanonical ? 0 : -7,
      title: probe?.hasCanonical ? 'Canonical tag detected' : 'Canonical tag not detected in sample',
      observation: probe?.hasCanonical
        ? 'HTML sample includes a rel="canonical" declaration.'
        : 'No rel="canonical" found in the sampled HTML head.',
      whyItMatters: 'Canonicals protect index equity across tracking parameters.',
      howToFix: 'Add a self-referential canonical in the document head.',
      priority: probe?.hasCanonical ? 'P3 - Minor' : 'P1 - High',
    })
  );

  if (probe?.title) {
    findings.push(
      finding({
        id: 'seo_title_length',
        metric: 'Title Tag',
        status: titleLen > 60 ? 'warning' : titleLen < 12 ? 'warning' : 'good',
        scoreImpact: titleLen > 60 || titleLen < 12 ? -6 : 0,
        title: `Title length ${titleLen} characters`,
        observation: `Observed title: “${probe.title}”.`,
        evidence: probe.title,
        whyItMatters: 'Mobile SERPs truncate long titles and bury brand/intent.',
        howToFix: 'Keep primary titles near 50–60 characters with the intent keyword early.',
        priority: 'P1 - High',
      })
    );
  } else {
    findings.push(
      finding({
        id: 'seo_title_missing',
        metric: 'Title Tag',
        status: 'critical',
        scoreImpact: -12,
        title: 'Title tag not observed',
        observation: 'Probe could not extract a <title> from the HTML sample.',
        whyItMatters: 'Missing titles destroy CTR and ranking clarity.',
        howToFix: 'Ensure every indexable page emits a unique title tag.',
        priority: 'P0 - Immediate',
      })
    );
  }

  findings.push(
    finding({
      id: 'seo_schema',
      metric: 'Schema.org JSON-LD',
      status: probe?.hasJsonLd ? 'good' : 'warning',
      scoreImpact: probe?.hasJsonLd ? 0 : -8,
      title: probe?.hasJsonLd ? 'JSON-LD structured data present' : 'No JSON-LD detected in sample',
      observation: probe?.hasJsonLd
        ? 'application/ld+json script detected in HTML sample.'
        : 'No JSON-LD block found in the sampled HTML.',
      whyItMatters: 'Structured data unlocks rich results and clearer entity understanding.',
      howToFix: 'Add Organization/WebSite/Product/FAQ JSON-LD where commercially relevant.',
      priority: probe?.hasJsonLd ? 'P3 - Minor' : 'P0 - Immediate',
    })
  );

  findings.push(
    finding({
      id: 'seo_robots_meta',
      metric: 'Robots Meta',
      status: 'info',
      scoreImpact: 0,
      title: probe?.hasRobotsMeta ? 'Robots meta present' : 'No robots meta in sample',
      observation: probe?.hasRobotsMeta
        ? 'A robots meta tag was observed — verify it does not block indexing unintentionally.'
        : 'No robots meta tag in sample (often fine if robots.txt is correct).',
      whyItMatters: 'Accidental noindex is a common silent traffic killer.',
      howToFix: 'Confirm indexable templates are not emitting noindex.',
      priority: 'P2 - Moderate',
    })
  );

  return findings;
}

function buildSpeedFindings(probe: ProbeResult | null): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const ttfb = probe?.ttfbMs;

  findings.push(
    finding({
      id: 'perf_ttfb',
      metric: 'Time to First Byte (probe)',
      status: !ttfb ? 'warning' : ttfb < 800 ? 'good' : ttfb < 1800 ? 'warning' : 'critical',
      scoreImpact: !ttfb ? -5 : ttfb < 800 ? 0 : ttfb < 1800 ? -7 : -14,
      title: ttfb ? `Probe TTFB ≈ ${ttfb}ms` : 'TTFB unavailable',
      observation: ttfb
        ? `Server responded to DEZO probe in ${ttfb}ms (includes network from this region).`
        : 'Could not measure TTFB from probe.',
      whyItMatters: 'Slow origins cascade into poor LCP and bounce on Indian 4G.',
      howToFix: 'Use edge caching, optimize SSR/TTFB, and compress HTML.',
      priority: ttfb && ttfb >= 1800 ? 'P0 - Immediate' : 'P1 - High',
    })
  );

  findings.push(
    finding({
      id: 'perf_viewport',
      metric: 'Mobile Viewport',
      status: probe?.hasViewport ? 'good' : 'warning',
      scoreImpact: probe?.hasViewport ? 0 : -6,
      title: probe?.hasViewport ? 'Viewport meta present' : 'Viewport meta missing in sample',
      observation: probe?.hasViewport
        ? 'Mobile viewport declaration detected.'
        : 'No viewport meta in HTML sample — mobile layout risk.',
      whyItMatters: 'Missing viewport breaks mobile CWV and usability.',
      howToFix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
      priority: 'P1 - High',
    })
  );

  findings.push(
    finding({
      id: 'perf_payload_sample',
      metric: 'HTML Sample Size',
      status: (probe?.htmlBytesSampled || 0) > 120_000 ? 'warning' : 'good',
      scoreImpact: (probe?.htmlBytesSampled || 0) > 120_000 ? -5 : 0,
      title: `HTML sample ${probe?.htmlBytesSampled || 0} bytes`,
      observation: 'Sampled first HTML chunk size as a proxy for document weight.',
      whyItMatters: 'Heavy first documents delay parsing on mid-range Android devices.',
      howToFix: 'Defer non-critical scripts and reduce SSR HTML bloat.',
      priority: 'P2 - Moderate',
    })
  );

  findings.push(
    finding({
      id: 'perf_tech',
      metric: 'Tech Fingerprint',
      status: 'info',
      scoreImpact: 0,
      title: probe?.server ? `Server: ${probe.server}` : 'Server header not exposed',
      observation: probe?.headers['x-powered-by']
        ? `x-powered-by: ${probe.headers['x-powered-by']}`
        : probe?.headers['x-shopid']
          ? 'Shopify storefront signals detected.'
          : 'Limited public tech headers exposed (often intentional).',
      whyItMatters: 'Stack fingerprints inform performance and security hardening plans.',
      howToFix: 'Keep public headers minimal; optimize the actual delivery path.',
      priority: 'P3 - Minor',
    })
  );

  return findings;
}

function buildA11yFindings(probe: ProbeResult | null): AuditFinding[] {
  return [
    finding({
      id: 'a11y_title',
      metric: 'Document Title',
      status: probe?.title ? 'good' : 'warning',
      scoreImpact: probe?.title ? 0 : -6,
      title: probe?.title ? 'Page has a document title' : 'Document title missing',
      observation: probe?.title || 'Screen readers announce the title first.',
      whyItMatters: 'Titles orient assistive-tech users and improve SEO clarity.',
      howToFix: 'Provide unique, descriptive titles per page.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'a11y_viewport',
      metric: 'Zoom / Viewport',
      status: probe?.hasViewport ? 'good' : 'warning',
      scoreImpact: probe?.hasViewport ? 0 : -5,
      title: 'Viewport configuration',
      observation: 'Confirm maximum-scale is not locked; sampled HTML only checks presence.',
      whyItMatters: 'Locked zoom fails WCAG and alienates low-vision users.',
      howToFix: 'Allow user zoom; avoid user-scalable=no.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'a11y_contrast',
      metric: 'Contrast Heuristic',
      status: 'info',
      scoreImpact: -2,
      title: 'Manual contrast review recommended',
      observation:
        'Automated full-page contrast requires authorized crawl depth; run axe/Lighthouse on staging.',
      whyItMatters: 'Low contrast kills readability on bright outdoor mobile use in India.',
      howToFix: 'Target WCAG 2.1 AA 4.5:1 for body text; 3:1 for large text.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'a11y_touch',
      metric: 'Touch Targets',
      status: 'info',
      scoreImpact: -2,
      title: 'Verify 44×44px interactive targets',
      observation: 'Public HTML sample cannot measure computed hit areas reliably.',
      whyItMatters: 'Small CTAs drive mobile mis-taps and cart abandonment.',
      howToFix: 'Ensure primary buttons and nav links meet 44×44px minimum.',
      priority: 'P2 - Moderate',
    }),
  ];
}

function buildShopifyFindings(target: string, probe: ProbeResult | null): AuditFinding[] {
  const shopifySignal =
    /myshopify\.com|cdn\.shopify|x-shopid|x-shopify/i.test(target) ||
    !!probe?.headers['x-shopid'] ||
    !!probe?.headers['x-shopify-stage'] ||
    /shopify/i.test(probe?.server || '');

  return [
    finding({
      id: 'shopify_detect',
      metric: 'Shopify Signal',
      status: shopifySignal ? 'good' : 'warning',
      scoreImpact: shopifySignal ? 0 : -4,
      title: shopifySignal ? 'Shopify fingerprints observed' : 'Shopify not clearly detected',
      observation: shopifySignal
        ? 'Public headers/URL patterns suggest a Shopify storefront.'
        : 'No strong Shopify header/URL signal — audit still runs storefront heuristics.',
      whyItMatters: 'Confirms the right engine path for theme/app remediation.',
      howToFix: 'If this is Shopify, share the live myshopify or custom domain.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'shopify_https',
      metric: 'Checkout Trust',
      status: target.startsWith('https') ? 'good' : 'critical',
      scoreImpact: target.startsWith('https') ? 0 : -16,
      title: 'HTTPS storefront',
      observation: 'Checkout and payment trust require TLS on every commercial URL.',
      whyItMatters: 'Browsers and Indian payment gateways punish mixed content.',
      howToFix: 'Force HTTPS redirects and secure cookies.',
      priority: 'P0 - Immediate',
    }),
    finding({
      id: 'shopify_scripts',
      metric: 'App Script Risk',
      status: 'warning',
      scoreImpact: -8,
      title: 'Audit third-party app embeds',
      observation:
        'Public HTML sampling cannot enumerate all app embeds; treat script bloat as a default risk on mature Shopify shops.',
      whyItMatters: 'Abandoned apps are a top LCP/checkout killer.',
      howToFix: 'Remove unused app embeds; defer non-critical scripts in theme.liquid.',
      priority: 'P0 - Immediate',
    }),
    finding({
      id: 'shopify_cdn',
      metric: 'Image CDN',
      status: 'info',
      scoreImpact: 0,
      title: 'Prefer Shopify CDN responsive images',
      observation: 'Use width/format parameters and modern formats for catalog media.',
      whyItMatters: 'Image weight dominates mobile ecommerce CWV.',
      howToFix: 'Serve WebP/AVIF via CDN transforms; lazy-load below-fold media.',
      priority: 'P2 - Moderate',
    }),
  ];
}

function buildSecurityFindings(target: string, probe: ProbeResult | null): AuditFinding[] {
  const hsts = !!probe?.headers['strict-transport-security'];
  const csp = !!probe?.headers['content-security-policy'];
  const xfo = !!probe?.headers['x-frame-options'];
  const xcto = !!probe?.headers['x-content-type-options'];

  return [
    finding({
      id: 'sec_https',
      metric: 'HTTPS',
      status: target.startsWith('https') ? 'good' : 'critical',
      scoreImpact: target.startsWith('https') ? 0 : -20,
      title: target.startsWith('https') ? 'HTTPS URL' : 'Non-HTTPS URL',
      observation: `Target protocol evaluated from input: ${target.split(':')[0]}`,
      whyItMatters: 'TLS is table stakes for SEO, ads, and payments.',
      howToFix: 'Redirect all HTTP to HTTPS and renew certificates automatically.',
      priority: 'P0 - Immediate',
    }),
    finding({
      id: 'sec_hsts',
      metric: 'HSTS',
      status: hsts ? 'good' : 'warning',
      scoreImpact: hsts ? 0 : -7,
      title: hsts ? 'Strict-Transport-Security present' : 'HSTS header missing',
      observation: hsts
        ? probe!.headers['strict-transport-security']
        : 'No HSTS header observed on probe response.',
      whyItMatters: 'HSTS prevents SSL stripping after first visit.',
      howToFix: 'Add Strict-Transport-Security with a long max-age; preload when ready.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'sec_csp',
      metric: 'CSP',
      status: csp ? 'good' : 'warning',
      scoreImpact: csp ? 0 : -5,
      title: csp ? 'Content-Security-Policy present' : 'CSP not observed',
      observation: csp ? 'CSP header returned by origin.' : 'No CSP header in probe response.',
      whyItMatters: 'CSP reduces XSS blast radius on marketing and storefront pages.',
      howToFix: 'Start with report-only CSP, then enforce script sources.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'sec_clickjack',
      metric: 'Frame Protection',
      status: xfo || csp ? 'good' : 'warning',
      scoreImpact: xfo || csp ? 0 : -4,
      title: xfo ? 'X-Frame-Options present' : 'Frame busting not clearly configured',
      observation: xfo
        ? probe!.headers['x-frame-options']
        : 'Consider X-Frame-Options or CSP frame-ancestors.',
      whyItMatters: 'Clickjacking can hijack checkout and lead forms.',
      howToFix: 'Set X-Frame-Options: DENY/SAMEORIGIN or CSP frame-ancestors.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'sec_mime',
      metric: 'MIME Sniffing',
      status: xcto ? 'good' : 'info',
      scoreImpact: xcto ? 0 : -2,
      title: xcto ? 'X-Content-Type-Options nosniff' : 'Consider nosniff',
      observation: xcto
        ? probe!.headers['x-content-type-options']
        : 'Header not observed.',
      whyItMatters: 'Blocks MIME confusion attacks on static assets.',
      howToFix: 'Add X-Content-Type-Options: nosniff.',
      priority: 'P3 - Minor',
    }),
  ];
}

function buildCroFindings(target: string): AuditFinding[] {
  const path = target.toLowerCase();
  const looksCheckout = /cart|checkout|bag|basket/.test(path);

  return [
    finding({
      id: 'cro_cod',
      metric: 'COD Trust',
      status: 'warning',
      scoreImpact: -6,
      title: 'Surface Cash on Delivery assurances',
      observation:
        'Indian D2C conversion often hinges on visible COD / UPI trust near ATC and checkout.',
      whyItMatters: 'Hidden payment options increase bounce on first-time buyers.',
      howToFix: 'Show COD/UPI/Razorpay trust near sticky ATC on mobile.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'cro_shipping',
      metric: 'Shipping Clarity',
      status: 'warning',
      scoreImpact: -5,
      title: 'Make delivery windows explicit',
      observation: 'Ambiguous shipping timelines are a top cart abandon reason.',
      whyItMatters: 'Buyers need pin-code level expectation setting.',
      howToFix: 'Add estimated delivery / pin-code checker before payment.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'cro_cta',
      metric: 'Primary CTA',
      status: looksCheckout ? 'info' : 'warning',
      scoreImpact: looksCheckout ? -1 : -4,
      title: looksCheckout ? 'Checkout URL provided' : 'Audit ATC contrast & stickiness',
      observation: looksCheckout
        ? 'You pointed at a cart/checkout URL — validate step count and trust badges there.'
        : 'Product/collection pages need sticky high-contrast mobile CTAs.',
      whyItMatters: 'Weak CTAs kill conversion even with good traffic.',
      howToFix: 'Use sticky ATC, 44px targets, and clear primary color hierarchy.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'cro_returns',
      metric: 'Returns Policy',
      status: 'info',
      scoreImpact: -2,
      title: 'Expose returns/replacement window',
      observation: 'Policy clarity reduces post-click anxiety for first-time Indian shoppers.',
      whyItMatters: 'Return ambiguity suppresses AOV and conversion.',
      howToFix: 'Put return window near price and checkout summary.',
      priority: 'P2 - Moderate',
    }),
  ];
}

function buildKeywordFindings(seed: string): AuditFinding[] {
  const words = seed.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const commercial = /(buy|price|online|shop|best|near me|odisha|bhubaneswar|india|saree|oil|clinic)/i.test(
    seed
  );
  const longTail = words.length >= 3;
  const seedHash = hashSeed(seed);
  const difficulty = 35 + (seedHash % 45);

  return [
    finding({
      id: 'kw_intent',
      metric: 'Search Intent',
      status: commercial ? 'good' : 'warning',
      scoreImpact: commercial ? 0 : -5,
      title: commercial ? 'Commercial / local intent signals' : 'Informational-leaning seed',
      observation: `Seed “${seed}” classified with ${commercial ? 'commercial' : 'weaker commercial'} modifiers.`,
      whyItMatters: 'Commercial modifiers convert better for ads and marketplace SEO.',
      howToFix: 'Add buyer modifiers (buy, price, online, near me, city).',
      priority: 'P1 - High',
    }),
    finding({
      id: 'kw_longtail',
      metric: 'Long-tail Shape',
      status: longTail ? 'good' : 'warning',
      scoreImpact: longTail ? 0 : -4,
      title: longTail ? 'Long-tail phrase' : 'Short head term',
      observation: `${words.length} tokens — ${longTail ? 'good specificity' : 'likely high competition head term'}.`,
      whyItMatters: 'Long-tails win faster rankings for Odisha/India niche brands.',
      howToFix: 'Expand into 3–6 word phrases with product + benefit + geo.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'kw_difficulty',
      metric: 'Relative Difficulty (heuristic)',
      status: difficulty > 70 ? 'warning' : 'info',
      scoreImpact: difficulty > 70 ? -4 : 0,
      title: `Heuristic difficulty ~${difficulty}/100`,
      observation:
        'Client-side estimate only — not Google Ads Keyword Planner volume. Use for prioritization, not spend decisions.',
      whyItMatters: 'Prevents chasing unwinnable head terms early.',
      howToFix: 'Cluster into supporting long-tails and marketplace query variants.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'kw_geo',
      metric: 'India / Odisha Geo',
      status: /(odisha|bhubaneswar|cuttack|india|near me)/i.test(seed) ? 'good' : 'info',
      scoreImpact: /(odisha|bhubaneswar|cuttack|india|near me)/i.test(seed) ? 0 : -2,
      title: 'Geographic modifier check',
      observation: 'Local modifiers help regional acquisition and GBP alignment.',
      whyItMatters: 'DEZO Odisha clients win with hyperlocal intent.',
      howToFix: 'Add city/state modifiers where service area is local.',
      priority: 'P3 - Minor',
    }),
  ];
}

function buildLocalSeoFindings(input: string): AuditFinding[] {
  const hasCity = /(bhubaneswar|cuttack|rourkela|odisha|india)/i.test(input);
  return [
    finding({
      id: 'local_geo',
      metric: 'Geo Keywords',
      status: hasCity ? 'good' : 'warning',
      scoreImpact: hasCity ? 0 : -6,
      title: hasCity ? 'Geo terms present' : 'Add city / Odisha modifiers',
      observation: `Input: “${input}”`,
      whyItMatters: 'Local pack visibility needs explicit geo language.',
      howToFix: 'Include primary city + Odisha in titles, GBP, and on-page copy.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'local_nap',
      metric: 'NAP Consistency',
      status: 'info',
      scoreImpact: -2,
      title: 'Verify NAP across citations',
      observation: 'Public tool cannot read GBP privately — confirm Name/Address/Phone consistency.',
      whyItMatters: 'NAP mismatches suppress Maps ranking.',
      howToFix: 'Standardize NAP on site footer, GBP, and directories.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'local_schema',
      metric: 'LocalBusiness Schema',
      status: 'warning',
      scoreImpact: -5,
      title: 'Implement LocalBusiness JSON-LD',
      observation: 'Local entities convert better with structured address/geo/openingHours.',
      whyItMatters: 'Helps Google understand service area and store identity.',
      howToFix: 'Add LocalBusiness schema with geo coordinates where accurate.',
      priority: 'P1 - High',
    }),
  ];
}

function buildBrandFindings(input: string): AuditFinding[] {
  const hostish = input.includes('.');
  return [
    finding({
      id: 'brand_domain',
      metric: 'Domain Clarity',
      status: hostish ? 'good' : 'info',
      scoreImpact: hostish ? 0 : -2,
      title: hostish ? 'Domain-style input' : 'Brand name input',
      observation: `Evaluating footprint heuristics for “${input}”.`,
      whyItMatters: 'Consistent naming across web + marketplaces builds trust.',
      howToFix: 'Align brand string on Shopify, Amazon Brand Store, and social handles.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'brand_parity',
      metric: 'Channel Parity',
      status: 'warning',
      scoreImpact: -4,
      title: 'Check pricing & creative parity',
      observation: 'Public demo flags parity as a recurring D2C ↔ marketplace risk.',
      whyItMatters: 'Price mismatches destroy ROAS and Buy Box confidence.',
      howToFix: 'Sync offers and hero creative across web and marketplaces.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'brand_proof',
      metric: 'Social Proof Links',
      status: 'info',
      scoreImpact: -2,
      title: 'Link reviews & press',
      observation: 'Brand sites should surface verifiable reviews and marketplace ratings.',
      whyItMatters: 'Proof reduces first-purchase anxiety.',
      howToFix: 'Feature third-party reviews and marketplace star ratings honestly.',
      priority: 'P2 - Moderate',
    }),
  ];
}

function buildAmazonDemoFindings(input: string): AuditFinding[] {
  const asin = extractAsin(input);
  return [
    finding({
      id: 'amz_mode',
      metric: 'Data Mode',
      status: 'info',
      scoreImpact: 0,
      title: 'Public demo heuristics (not SP-API)',
      observation:
        'This engine does not call Amazon Selling Partner API. Findings are checklist heuristics from the URL/ASIN shape.',
      whyItMatters: 'Honest scoping prevents fake marketplace API claims.',
      howToFix: 'Connect authorized SP-API later for live SQP and Buy Box telemetry.',
      priority: 'P3 - Minor',
    }),
    finding({
      id: 'amz_asin',
      metric: 'ASIN Detection',
      status: asin ? 'good' : 'warning',
      scoreImpact: asin ? 0 : -5,
      title: asin ? `ASIN detected: ${asin}` : 'ASIN not detected in input',
      observation: asin
        ? `Parsed ASIN ${asin} from the provided URL/text.`
        : 'Provide an amazon.in product URL or 10-character ASIN for tighter demo scoring.',
      whyItMatters: 'ASIN is the unit of marketplace optimization.',
      howToFix: 'Paste a full amazon.in/dp/ASIN link.',
      priority: 'P1 - High',
    }),
    finding({
      id: 'amz_title',
      metric: 'Title Capacity',
      status: 'warning',
      scoreImpact: -8,
      title: 'Utilize near-full title length',
      observation: 'Demo checklist: most under-indexed listings leave title capacity unused.',
      whyItMatters: 'A9/A10 still heavily weights title tokens.',
      howToFix: 'Expand toward 180–195 characters with high-intent Indian queries.',
      priority: 'P0 - Immediate',
    }),
    finding({
      id: 'amz_images',
      metric: 'Gallery Depth',
      status: 'warning',
      scoreImpact: -6,
      title: 'Target 7 images + video',
      observation: 'Demo benchmark vs typical bestsellers.',
      whyItMatters: 'Image depth correlates with conversion and rank.',
      howToFix: 'Add infographic, size guide, and lifestyle frames.',
      priority: 'P1 - High',
    }),
  ];
}

function buildFlipkartDemoFindings(input: string): AuditFinding[] {
  const hasFk = /flipkart\.|\/p\/itm/i.test(input);
  return [
    finding({
      id: 'fk_mode',
      metric: 'Data Mode',
      status: 'info',
      scoreImpact: 0,
      title: 'Public demo heuristics (not seller API)',
      observation:
        'No Flipkart seller API connection. This is a readiness checklist for catalog quality.',
      whyItMatters: 'Keeps marketplace claims honest until authorized integrations exist.',
      howToFix: 'Add Flipkart seller API adapters in a later Growth OS phase.',
      priority: 'P3 - Minor',
    }),
    finding({
      id: 'fk_url',
      metric: 'Listing URL',
      status: hasFk ? 'good' : 'warning',
      scoreImpact: hasFk ? 0 : -4,
      title: hasFk ? 'Flipkart URL pattern detected' : 'Paste a Flipkart product URL',
      observation: `Input: “${input.slice(0, 120)}”`,
      whyItMatters: 'Correct URL targeting improves remediation specificity.',
      howToFix: 'Use the public product page URL from flipkart.com.',
      priority: 'P2 - Moderate',
    }),
    finding({
      id: 'fk_assured',
      metric: 'F-Assured Readiness',
      status: 'warning',
      scoreImpact: -8,
      title: 'Check F-Assured delivery eligibility',
      observation: 'Demo flag: Tier-2 delivery speed and FC placement usually gate the badge.',
      whyItMatters: 'F-Assured listings earn disproportionate impression share.',
      howToFix: 'Improve regional fulfillment so major pins hit 2-day windows.',
      priority: 'P0 - Immediate',
    }),
    finding({
      id: 'fk_attrs',
      metric: 'Attribute Completeness',
      status: 'warning',
      scoreImpact: -5,
      title: 'Complete mandatory + optional attributes',
      observation: 'Sparse attributes suppress browse-node ranking.',
      whyItMatters: 'Catalog quality is a ranking and conversion lever.',
      howToFix: 'Fill material, size, care, and regional attributes thoroughly.',
      priority: 'P1 - High',
    }),
  ];
}

export async function runUniversalAudit(
  rawInput: string,
  category: ToolCategory = 'seo'
): Promise<UniversalAuditReport> {
  const validation = validateToolInput(rawInput);
  if (!validation.isValid) {
    throw new Error(validation.errorMessage || 'Invalid input.');
  }

  const cleanTarget = validation.sanitizedUrl || rawInput;
  const needsProbe =
    !validation.isDomainOrKeyword &&
    ['seo', 'page-speed', 'accessibility', 'shopify', 'security', 'cro', 'brand'].includes(
      category
    );

  const probe = needsProbe ? await probeUrl(cleanTarget) : null;

  let findings: AuditFinding[] = [];
  switch (category) {
    case 'seo':
      findings = buildSeoFindings(cleanTarget, probe);
      break;
    case 'page-speed':
      findings = buildSpeedFindings(probe);
      break;
    case 'accessibility':
      findings = buildA11yFindings(probe);
      break;
    case 'shopify':
      findings = buildShopifyFindings(cleanTarget, probe);
      break;
    case 'security':
      findings = buildSecurityFindings(cleanTarget, probe);
      break;
    case 'cro':
      findings = buildCroFindings(cleanTarget);
      break;
    case 'keywords':
      findings = buildKeywordFindings(cleanTarget);
      break;
    case 'local-seo':
      findings = buildLocalSeoFindings(cleanTarget);
      break;
    case 'brand':
      findings = buildBrandFindings(cleanTarget);
      break;
    case 'amazon':
      findings = buildAmazonDemoFindings(cleanTarget);
      break;
    case 'flipkart':
      findings = buildFlipkartDemoFindings(cleanTarget);
      break;
    default:
      findings = buildSeoFindings(cleanTarget, probe);
  }

  const overallScore = scoreFromFindings(findings);
  const categoryScores = categoriesFrom([
    { name: 'Primary Engine', score: overallScore, weight: 45 },
    {
      name: 'Evidence Quality',
      score: probe?.ok ? 88 : category === 'keywords' || category === 'amazon' || category === 'flipkart' ? 72 : 70,
      weight: 25,
    },
    {
      name: 'Commercial Impact',
      score: Math.max(55, overallScore - 6),
      weight: 30,
    },
  ]);

  const criticalAndWarnings = findings.filter(
    (f) => f.status === 'critical' || f.status === 'warning'
  );

  const targetType: UniversalAuditReport['targetType'] =
    category === 'amazon'
      ? 'amazon_product'
      : category === 'flipkart'
        ? 'flipkart_product'
        : category === 'shopify'
          ? 'shopify_store'
          : category === 'keywords' || category === 'local-seo'
            ? validation.isDomainOrKeyword
              ? 'keyword'
              : 'local_business'
            : 'website';

  const modeNote =
    category === 'amazon' || category === 'flipkart'
      ? ' Demo mode — no marketplace seller APIs connected.'
      : probe?.ok
        ? ' Public probe evidence included.'
        : needsProbe
          ? ' Probe limited — heuristic findings still returned.'
          : ' Client-side heuristic analysis.';

  return {
    reportId: `dezo-rep-${Math.random().toString(36).substring(2, 9)}`,
    targetInput: cleanTarget,
    targetType,
    timestamp: new Date().toISOString(),
    overallScore,
    ratingTier: tierFromScore(overallScore),
    categoryScores,
    summary: `${category} engine finished ${findings.length} checks.${modeNote} Found ${criticalAndWarnings.length} priority issues.`,
    topPriorityFixes: criticalAndWarnings.map((f) => f.howToFix).slice(0, 4),
    findings,
    deterministicChecksPassed: findings.filter((f) => f.status === 'good').length,
    totalChecksConducted: findings.length,
    aiStrategicOverview: {
      growthBottleneck:
        criticalAndWarnings[0]?.title || 'No critical bottleneck flagged in this pass.',
      commercialOpportunity:
        'Resolve P0/P1 findings first, then re-run the same engine to track score movement.',
      estimatedRevenueImpact:
        category === 'keywords'
          ? 'Use clusters to brief content/ads — not as paid-media volume truth.'
          : 'Prioritized fixes typically unlock measurable CTR/CVR gains within a sprint.',
    },
  };
}

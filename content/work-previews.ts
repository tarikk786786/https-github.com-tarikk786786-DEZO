/**
 * Local JPEG previews of real live sites (captured for portfolio reliability).
 * Keyed by normalized hostname without www.
 * Full-page captures are chrome-cropped (client nav/search/widgets removed).
 * Hosts without a clean still omit here so LiveSitePreview uses the title card.
 */
export const workPreviewMap: Record<string, string> = {
  'yasanabeautyrituals.in': '/work-previews/yasana-beauty-rituals.jpg',
  'shreeayurved.com': '/work-previews/shree-ayurved.jpg',
  'nilkanthpaints.com': '/work-previews/nilkanth-paints.jpg',
  'thepaanluxe.com': '/work-previews/the-paan-luxe.jpg',
  'greatindiapublicschool.org': '/work-previews/great-india-public-school.jpg',
};

/** Hero-safe stills — product/atmosphere only (no client nav/search/widgets/CTAs) */
export const heroStillMap: Record<string, string> = {
  'yasanabeautyrituals.in': '/work-previews/yasana-beauty-rituals-hero.jpg',
};

/** Portrait crop for small viewports — intentional mobile framing */
export const heroStillMobileMap: Record<string, string> = {
  'yasanabeautyrituals.in': '/work-previews/yasana-beauty-rituals-hero-mobile.jpg',
};

export function previewPathForUrl(url: string): string | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return workPreviewMap[host] || null;
  } catch {
    return null;
  }
}

export function heroStillForUrl(url: string): string | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return heroStillMap[host] || workPreviewMap[host] || null;
  } catch {
    return null;
  }
}

export function heroStillMobileForUrl(url: string): string | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return heroStillMobileMap[host] || heroStillMap[host] || workPreviewMap[host] || null;
  } catch {
    return null;
  }
}

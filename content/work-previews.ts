/**
 * Local JPEG previews of real live sites (captured for portfolio reliability).
 * Keyed by normalized hostname without www.
 * Full-page captures are chrome-cropped (client nav/search/widgets removed).
 * Hosts without a clean still omit here so LiveSitePreview uses the stylized mock card.
 */
export const workPreviewMap: Record<string, string> = {
  // Education
  'greatindiapublicschool.org': '/work-previews/great-india-public-school.jpg',
  'sorobanabacusacademy.com': '/work-previews/sorobana-abacus-academy.jpg',
  'babusirsgrouptuitions.com': '/work-previews/babusirsgrouptuitions.jpg',
  'smartbankersinstitute.com': '/work-previews/smartbankersinstitute.jpg',

  // Beauty & Fashion
  'yasanabeautyrituals.in': '/work-previews/yasana-beauty-rituals.jpg',
  'auramantra.co': '/work-previews/aura-mantra.jpg',
  'zavique.in': '/work-previews/zavique.jpg',
  'sonvicasarees.com': '/work-previews/sonvica-sarees.jpg',
  'bloomblushbeauty.com': '/work-previews/bloom-blush-beauty.jpg',
  'vientro.co': '/work-previews/vientro.jpg',
  'glamifyra.co': '/work-previews/glamifyra.jpg',
  'vistaaar.in': '/work-previews/vistaaar.jpg',
  'yoyo.fashion': '/work-previews/yoyo-fashion.jpg',
  'kessawear.com': '/work-previews/kessawear.jpg',
  'cottonsjaipur.com': '/work-previews/cottons-jaipur.jpg',
  'beyoung.in': '/work-previews/beyoung.jpg',
  'cilory.com': '/work-previews/cilory.jpg',

  // Healthcare
  'shreeayurved.com': '/work-previews/shree-ayurved.jpg',
  'shreeayurveda.co.in': '/work-previews/shreeayurveda-clinics.jpg',

  // Corporate
  'nilkanthpaints.com': '/work-previews/nilkanth-paints.jpg',
  'afkadvisors.in': '/work-previews/afk-advisors.jpg',

  // Real Estate
  'dreamproperty.qa': '/work-previews/dream-property.jpg',
  'besthouseqatar.com': '/work-previews/best-house-qatar.jpg',

  // Ecommerce
  'thepaanluxe.com': '/work-previews/the-paan-luxe.jpg',
  'pradiyas.com': '/work-previews/pradiyas.jpg',

  // Food & Grocery
  'shitijasnacks.com': '/work-previews/shitija-snacks.jpg',
  'thethirstycrow.co': '/work-previews/the-thirsty-crow.jpg',

  // Photography
  '8kentertainmentmedia.com': '/work-previews/8k-entertainment.jpg',
  'mumbaifilms.in': '/work-previews/mumbai-films.jpg',

  // Hospitality
  'hoteldripinn.com': '/work-previews/hotel-drip-inn.jpg',

  // Travel
  'jaibhavani.in': '/work-previews/jai-bhavani-travels.jpg',
  'tourissimatours.in': '/work-previews/tourissima-tours.jpg',

  // International
  'bbsigns.co.nz': '/work-previews/bb-signs-nz.jpg',
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

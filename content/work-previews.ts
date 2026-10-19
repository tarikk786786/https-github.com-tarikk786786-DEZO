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
  'sonvicasarees.com': '/work-previews/sonvica-sarees.jpg',
  'auramantra.co': '/work-previews/aura-mantra.jpg',
  'beyoung.in': '/work-previews/beyoung.jpg',
  'bloomblushbeauty.com': '/work-previews/bloom-blush-beauty.jpg',
  'sorobanabacusacademy.com': '/work-previews/sorobana-abacus-academy.jpg',
  'vientro.co': '/work-previews/vientro.jpg',
  'zavique.in': '/work-previews/zavique.jpg',
  'afkadvisors.in': '/work-previews/afk-advisors.jpg',
  'cilory.com': '/work-previews/cilory.jpg',
  'cottonsjaipur.com': '/work-previews/cottons-jaipur.jpg',
  'glamifyra.co': '/work-previews/glamifyra.jpg',
  'kessawear.com': '/work-previews/kessawear.jpg',
  'shreeayurveda.co.in': '/work-previews/shreeayurveda-clinics.jpg',
  'vistaaar.in': '/work-previews/vistaaar.jpg',
  'yoyo.fashion': '/work-previews/yoyo-fashion.jpg',
  'dreamproperty.qa': '/work-previews/dream-property.jpg',
  'besthouseqatar.com': '/work-previews/best-house-qatar.jpg',
  'pradiyas.com': '/work-previews/pradiyas.jpg',
  'shitijasnacks.com': '/work-previews/shitija-snacks.jpg',
  'thethirstycrow.co': '/work-previews/the-thirsty-crow.jpg',
  '8kentertainmentmedia.com': '/work-previews/8k-entertainment.jpg',
  'mumbaifilms.in': '/work-previews/mumbai-films.jpg',
  'hoteldripinn.com': '/work-previews/hotel-drip-inn.jpg',
  'jaibhavani.in': '/work-previews/jai-bhavani-travels.jpg',
  'tourissimatours.in': '/work-previews/tourissima-tours.jpg',
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

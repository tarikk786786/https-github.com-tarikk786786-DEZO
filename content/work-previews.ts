/**
 * Local JPEG previews of real live sites (captured for portfolio reliability).
 * Keyed by normalized hostname without www.
 */
export const workPreviewMap: Record<string, string> = {
  'yasanabeautyrituals.in': '/work-previews/yasana-beauty-rituals.jpg',
  'sonvicasarees.com': '/work-previews/sonvica-sarees.jpg',
  'shreeayurved.com': '/work-previews/shree-ayurved.jpg',
  'nilkanthpaints.com': '/work-previews/nilkanth-paints.jpg',
  'thepaanluxe.com': '/work-previews/the-paan-luxe.jpg',
  'greatindiapublicschool.org': '/work-previews/great-india-public-school.jpg',
};

export function previewPathForUrl(url: string): string | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return workPreviewMap[host] || null;
  } catch {
    return null;
  }
}

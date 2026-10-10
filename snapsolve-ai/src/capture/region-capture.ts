/**
 * Region capture overlay helpers used by the content script.
 * The actual screenshot is taken by the service worker via chrome.tabs.captureVisibleTab,
 * then cropped in the content script / side panel using the selected rectangle.
 */

export interface CaptureRect {
  x: number;
  y: number;
  width: number;
  height: number;
  devicePixelRatio: number;
}

export async function cropDataUrl(
  dataUrl: string,
  rect: CaptureRect
): Promise<string> {
  const image = await loadImage(dataUrl);
  const scale = rect.devicePixelRatio || window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(rect.width * scale));
  canvas.height = Math.max(1, Math.round(rect.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context for crop.");
  ctx.drawImage(
    image,
    Math.round(rect.x * scale),
    Math.round(rect.y * scale),
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  return canvas.toDataURL("image/png");
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load captured screenshot."));
    img.src = dataUrl;
  });
}

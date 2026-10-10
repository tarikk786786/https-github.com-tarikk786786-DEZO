import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractPdfText(
  file: File,
  maxPages = 5
): Promise<{
  text: string;
  pageCount: number;
  warnings: string[];
}> {
  const warnings: string[] = [];
  const data = new Uint8Array(await file.arrayBuffer());

  // Disable worker in the extension to avoid remote script / CSP issues.
  const doc = await pdfjs.getDocument({
    data,
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
  }).promise;

  const pageCount = doc.numPages;
  const limit = Math.min(pageCount, maxPages);
  const parts: string[] = [];

  for (let i = 1; i <= limit; i += 1) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? String(item.str) : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (pageText) parts.push(pageText);
  }

  if (pageCount > maxPages) {
    warnings.push(`Only the first ${maxPages} pages were extracted.`);
  }
  if (!parts.length) {
    warnings.push(
      "No selectable text found. This may be a scanned PDF — upload page images for OCR instead."
    );
  }

  return { text: parts.join("\n\n"), pageCount, warnings };
}

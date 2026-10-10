import { createWorker } from "tesseract.js";
import { normalizeOcrText } from "@/capture/question-parser";

export interface OcrResult {
  text: string;
  confidence: number;
  warnings: string[];
}

function extensionUrl(path: string): string | undefined {
  try {
    if (typeof chrome !== "undefined" && chrome.runtime?.getURL) {
      return chrome.runtime.getURL(path);
    }
  } catch {
    /* non-extension test env */
  }
  return undefined;
}

export async function recognizeImage(
  image: string | File | Blob,
  language = "eng"
): Promise<OcrResult> {
  const warnings: string[] = [];
  const workerPath = extensionUrl("ocr/worker.min.js");
  const corePath = extensionUrl("ocr/tesseract-core-simd-lstm.wasm.js");
  const langPath = extensionUrl("ocr/lang-data");

  const worker = await createWorker(language, 1, {
    logger: () => undefined,
    ...(workerPath
      ? {
          workerPath,
          corePath,
          langPath,
          workerBlobURL: false,
        }
      : {}),
  });

  try {
    const result = await worker.recognize(image);
    const text = normalizeOcrText(result.data.text || "");
    const confidence = (result.data.confidence || 0) / 100;
    if (!text) warnings.push("OCR returned no readable text.");
    if (confidence < 0.55) {
      warnings.push(
        "OCR confidence is low. This reflects text-read quality, not answer correctness."
      );
    }
    return { text, confidence, warnings };
  } finally {
    await worker.terminate();
  }
}

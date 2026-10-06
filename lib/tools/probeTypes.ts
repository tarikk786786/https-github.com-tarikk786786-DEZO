export interface ProbeResult {
  ok: boolean;
  url: string;
  finalUrl?: string;
  status?: number;
  timedOut?: boolean;
  ttfbMs?: number;
  contentType?: string;
  server?: string;
  headers: Record<string, string>;
  title?: string;
  hasCanonical?: boolean;
  hasJsonLd?: boolean;
  hasViewport?: boolean;
  hasRobotsMeta?: boolean;
  htmlBytesSampled?: number;
  error?: string;
}

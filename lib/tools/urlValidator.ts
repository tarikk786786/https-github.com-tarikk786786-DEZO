/**
 * DEZO Tools Lab Security & SSRF Protection Guard
 * Validates and sanitizes public inputs before any scanning.
 * (PRD Section 46 & 47)
 */

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'metadata.google.internal',
  '169.254.169.254',
]);

const PRIVATE_IP_PREFIXES = [
  '10.',
  '192.168.',
  '172.16.',
  '172.17.',
  '172.18.',
  '172.19.',
  '172.20.',
  '172.21.',
  '172.22.',
  '172.23.',
  '172.24.',
  '172.25.',
  '172.26.',
  '172.27.',
  '172.28.',
  '172.29.',
  '172.30.',
  '172.31.',
  '169.254.',
  'fc00:',
  'fe80:',
];

export interface ValidationResult {
  isValid: boolean;
  sanitizedUrl?: string;
  errorMessage?: string;
  isDomainOrKeyword?: boolean;
}

export function validateToolInput(rawInput: string): ValidationResult {
  const trimmed = rawInput.trim();

  if (!trimmed || trimmed.length < 2) {
    return { isValid: false, errorMessage: 'Input cannot be empty.' };
  }

  // Check if it's a plain keyword or brand query (not a URL)
  if (!trimmed.includes('.') && !trimmed.includes('/')) {
    return { isValid: true, isDomainOrKeyword: true, sanitizedUrl: trimmed };
  }

  let testUrl = trimmed;
  if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
    testUrl = `https://${testUrl}`;
  }

  try {
    const parsed = new URL(testUrl);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { isValid: false, errorMessage: 'Only HTTP and HTTPS protocols are permitted.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Check blocked hostnames
    if (BLOCKED_HOSTNAMES.has(hostname)) {
      return { isValid: false, errorMessage: 'Internal and loopback addresses cannot be scanned.' };
    }

    // Check private IP ranges
    for (const prefix of PRIVATE_IP_PREFIXES) {
      if (hostname.startsWith(prefix)) {
        return { isValid: false, errorMessage: 'Scanning private or local networks is blocked.' };
      }
    }

    // Block non-standard internal ports
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
      return { isValid: false, errorMessage: 'Only standard web ports (80, 443) are allowed.' };
    }

    return {
      isValid: true,
      sanitizedUrl: parsed.toString(),
      isDomainOrKeyword: false,
    };
  } catch {
    // If not a valid URL, it can still be a multi-word keyword query
    return {
      isValid: true,
      sanitizedUrl: trimmed,
      isDomainOrKeyword: true,
    };
  }
}

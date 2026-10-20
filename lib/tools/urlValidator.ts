/**
 * DEZO Tools Lab Security & SSRF Protection Guard
 * Comprehensive defense-in-depth against Server-Side Request Forgery (SSRF),
 * loopback scanning, cloud metadata exfiltration, and protocol manipulation.
 * (PRD Section 46 & 47)
 */

export interface ValidationResult {
  isValid: boolean;
  sanitizedUrl?: string;
  errorMessage?: string;
  isDomainOrKeyword?: boolean;
}

const BLOCKED_DOMAINS = new Set([
  'localhost',
  'metadata.google.internal',
  'instance-data',
  'instance-data.ec2.internal',
]);

const BLOCKED_TLDS_AND_SUFFIXES = [
  '.localhost',
  '.local',
  '.internal',
  '.corp',
  '.lan',
  '.home',
  '.invalid',
  '.test',
  '.arpa',
];

/**
 * Checks if a 32-bit unsigned integer falls into private or non-routable IPv4 ranges.
 */
function isPrivateOrReservedIpv4(ipNum: number): boolean {
  // 0.0.0.0/8 (Current network)
  if ((ipNum >>> 24) === 0) return true;

  // 10.0.0.0/8 (Private network)
  if ((ipNum >>> 24) === 10) return true;

  // 100.64.0.0/10 (Shared address / CGNAT / Cloud internal)
  if ((ipNum >>> 22) === (100 << 2) + 1) return true;

  // 127.0.0.0/8 (Loopback)
  if ((ipNum >>> 24) === 127) return true;

  // 169.254.0.0/16 (Link-local / Cloud metadata service)
  if ((ipNum >>> 16) === (169 << 8) + 254) return true;

  // 172.16.0.0/12 (Private network: 172.16.0.0 - 172.31.255.255)
  if ((ipNum >>> 20) === (172 << 4) + 1) return true;

  // 192.0.0.0/24 (IETF protocol assignments)
  if ((ipNum >>> 8) === (192 << 8)) return true;

  // 192.0.2.0/24 (TEST-NET-1)
  if ((ipNum >>> 8) === (192 << 8) + 2) return true;

  // 192.168.0.0/16 (Private network)
  if ((ipNum >>> 16) === (192 << 8) + 168) return true;

  // 198.18.0.0/15 (Network benchmark tests)
  if ((ipNum >>> 17) === (198 << 7) + 9) return true;

  // 198.51.100.0/24 (TEST-NET-2)
  if ((ipNum >>> 8) === (198 << 8) + 51 * 256 + 100) return true;

  // 203.0.113.0/24 (TEST-NET-3)
  if ((ipNum >>> 8) === (203 << 8) + 113) return true;

  // 224.0.0.0/4 (Multicast) & 240.0.0.0/4 (Reserved)
  if ((ipNum >>> 28) >= 14) return true;

  // 255.255.255.255 (Broadcast)
  if (ipNum === 0xffffffff) return true;

  return false;
}

/**
 * Parses numeric IPv4 representations (standard dotted quad, octal, hex, or single decimal integer).
 * Returns the numeric 32-bit unsigned value, or null if not a valid IPv4 address.
 */
function parseIpv4ToNumber(rawHost: string): number | null {
  const host = rawHost.trim().toLowerCase();

  // Test single integer decimal / hex / octal (e.g., 2130706433 or 0x7f000001)
  if (/^0x[0-9a-f]+$/i.test(host)) {
    const num = parseInt(host, 16);
    if (!Number.isNaN(num) && num >= 0 && num <= 0xffffffff) {
      return num >>> 0;
    }
    return null;
  }

  if (/^\d+$/.test(host)) {
    // Single decimal representation
    const num = parseInt(host, 10);
    if (!Number.isNaN(num) && num >= 0 && num <= 0xffffffff) {
      return num >>> 0;
    }
    return null;
  }

  // Dotted notation (can have 1 to 4 parts)
  const parts = host.split('.');
  if (parts.length === 4) {
    let acc = 0;
    for (let i = 0; i < 4; i++) {
      const part = parts[i];
      let val: number;
      if (part.startsWith('0x') || part.startsWith('0X')) {
        val = parseInt(part, 16);
      } else if (part.length > 1 && part.startsWith('0') && /^[0-7]+$/.test(part)) {
        val = parseInt(part, 8); // Octal
      } else if (/^\d+$/.test(part)) {
        val = parseInt(part, 10);
      } else {
        return null;
      }

      if (Number.isNaN(val) || val < 0 || val > 255) {
        return null;
      }
      acc = (acc << 8) + val;
    }
    return acc >>> 0;
  }

  return null;
}

/**
 * Checks if an IPv6 address string is loopback, unique local, link-local, or IPv4-mapped private.
 */
function isPrivateOrReservedIpv6(rawHost: string): boolean {
  // Strip brackets: [::1] -> ::1
  let host = rawHost.replace(/^\[|\]$/g, '').trim().toLowerCase();

  // IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1 or ::ffff:7f00:1)
  const mappedMatch = host.match(/^(?:0*:)*ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
  if (mappedMatch) {
    const parsedIpv4 = parseIpv4ToNumber(mappedMatch[1]);
    if (parsedIpv4 !== null) {
      return isPrivateOrReservedIpv4(parsedIpv4);
    }
    return true;
  }

  // Loopback (::1 or 0:0:0:0:0:0:0:1)
  if (host === '::1' || host === '0:0:0:0:0:0:0:1' || host === '::' || host === '0:0:0:0:0:0:0:0') {
    return true;
  }

  // Link-local unicast (fe80::/10 -> prefixes fe8, fe9, fea, feb)
  if (/^fe[89ab][0-9a-f]?:/i.test(host)) {
    return true;
  }

  // Unique local addresses (fc00::/7 -> prefixes fc, fd)
  if (/^f[cd][0-9a-f]{2}:/i.test(host)) {
    return true;
  }

  // Cloud metadata IPv6 (e.g. AWS fd00:ec2::254)
  if (host.startsWith('fd00:ec2:')) {
    return true;
  }

  // Multicast (ff00::/8)
  if (/^ff[0-9a-f]{2}:/i.test(host)) {
    return true;
  }

  return false;
}

export function validateToolInput(rawInput: string): ValidationResult {
  const trimmed = rawInput.trim();

  if (!trimmed || trimmed.length < 2) {
    return { isValid: false, errorMessage: 'Input cannot be empty.' };
  }

  if (trimmed.length > 2048) {
    return { isValid: false, errorMessage: 'Input exceeds maximum allowed length (2048 characters).' };
  }

  const lowerTrimmed = trimmed.toLowerCase();
  if (lowerTrimmed === 'localhost' || lowerTrimmed.startsWith('localhost:') || BLOCKED_DOMAINS.has(lowerTrimmed)) {
    return { isValid: false, errorMessage: 'Internal and loopback addresses cannot be scanned.' };
  }

  // Check if it's a plain keyword or brand query (not a URL)
  if (!trimmed.includes('.') && !trimmed.includes('/') && !trimmed.includes(':')) {
    return { isValid: true, isDomainOrKeyword: true, sanitizedUrl: trimmed };
  }

  let testUrl = trimmed;
  if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
    testUrl = `https://${testUrl}`;
  }

  try {
    const parsed = new URL(testUrl);

    // Strictly enforce HTTP or HTTPS
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { isValid: false, errorMessage: 'Only HTTP and HTTPS protocols are permitted.' };
    }

    // Strip square brackets from IPv6 hostnames
    const rawHostname = parsed.hostname.toLowerCase();
    const cleanHostname = rawHostname.replace(/^\[|\]$/g, '');

    // Check exact blocked hostnames
    if (BLOCKED_DOMAINS.has(cleanHostname)) {
      return { isValid: false, errorMessage: 'Internal and loopback addresses cannot be scanned.' };
    }

    // Check blocked domain suffixes / internal TLDs
    for (const suffix of BLOCKED_TLDS_AND_SUFFIXES) {
      if (cleanHostname.endsWith(suffix)) {
        return { isValid: false, errorMessage: 'Internal or reserved domain names cannot be scanned.' };
      }
    }

    // Check IPv4 addresses (standard dotted quad, single-decimal, octal, hex)
    const ipv4Num = parseIpv4ToNumber(cleanHostname);
    if (ipv4Num !== null) {
      if (isPrivateOrReservedIpv4(ipv4Num)) {
        return { isValid: false, errorMessage: 'Private, loopback, and local network IP addresses are blocked.' };
      }
    }

    // Check IPv6 addresses
    if (cleanHostname.includes(':')) {
      if (isPrivateOrReservedIpv6(cleanHostname)) {
        return { isValid: false, errorMessage: 'Private, link-local, and loopback IPv6 addresses are blocked.' };
      }
    }

    // Block non-standard ports to prevent port scanning attacks
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
      return { isValid: false, errorMessage: 'Only standard web ports (80, 443) are allowed for scanning.' };
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

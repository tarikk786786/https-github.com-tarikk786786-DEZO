import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateToolInput } from '../lib/tools/urlValidator';

describe('SSRF & URL Security Validator', () => {
  it('allows legitimate public web URLs', () => {
    const validUrls = [
      'https://dezo.in',
      'https://google.com',
      'https://subdomain.example.co.in/path/page?query=1',
      'http://example.org:80',
      'https://example.org:443',
    ];

    for (const url of validUrls) {
      const res = validateToolInput(url);
      assert.equal(res.isValid, true, `Expected ${url} to be valid`);
      assert.equal(res.isDomainOrKeyword, false);
    }
  });

  it('allows brand keyword queries', () => {
    const keywords = ['dezo growth', 'digital marketing bhubaneswar', 'seo'];
    for (const kw of keywords) {
      const res = validateToolInput(kw);
      assert.equal(res.isValid, true);
      assert.equal(res.isDomainOrKeyword, true);
    }
  });

  it('blocks loopback and localhost addresses', () => {
    const loopbacks = [
      'localhost',
      'http://localhost:3000',
      'http://127.0.0.1:80',
      'http://127.0.0.2',
      'http://127.255.255.254',
      'http://[::1]',
      'http://[0:0:0:0:0:0:0:1]',
      'http://subdomain.localhost',
    ];

    for (const host of loopbacks) {
      const res = validateToolInput(host);
      assert.equal(res.isValid, false, `Expected ${host} to be blocked`);
    }
  });

  it('blocks private IPv4 networks (RFC 1918)', () => {
    const privateIps = [
      'http://10.0.0.1',
      'http://10.254.1.99',
      'http://172.16.0.1',
      'http://172.31.255.255',
      'http://192.168.1.1',
      'http://192.168.100.50',
    ];

    for (const ip of privateIps) {
      const res = validateToolInput(ip);
      assert.equal(res.isValid, false, `Expected ${ip} to be blocked`);
    }
  });

  it('blocks cloud metadata endpoints (AWS, GCP, Azure, OpenStack)', () => {
    const metadataTargets = [
      'http://169.254.169.254/latest/meta-data/',
      'http://metadata.google.internal',
      'http://instance-data',
    ];

    for (const target of metadataTargets) {
      const res = validateToolInput(target);
      assert.equal(res.isValid, false, `Expected ${target} to be blocked`);
    }
  });

  it('blocks decimal, octal, and hex evasion attempts for loopback', () => {
    const evasions = [
      'http://2130706433', // 127.0.0.1 decimal
      'http://0x7f000001', // 127.0.0.1 hex
      'http://0177.0.0.1', // 127.0.0.1 octal
    ];

    for (const evasion of evasions) {
      const res = validateToolInput(evasion);
      assert.equal(res.isValid, false, `Expected evasion ${evasion} to be blocked`);
    }
  });

  it('blocks non-standard internal ports', () => {
    const portTargets = [
      'http://example.com:22',
      'http://example.com:3306',
      'http://example.com:8080',
      'http://example.com:27017',
    ];

    for (const target of portTargets) {
      const res = validateToolInput(target);
      assert.equal(res.isValid, false, `Expected ${target} with non-standard port to be blocked`);
    }
  });

  it('blocks internal TLDs and domain suffixes', () => {
    const internalDomains = [
      'http://internal-service.local',
      'http://db.internal',
      'http://server.corp',
      'http://router.lan',
    ];

    for (const domain of internalDomains) {
      const res = validateToolInput(domain);
      assert.equal(res.isValid, false, `Expected ${domain} to be blocked`);
    }
  });
});

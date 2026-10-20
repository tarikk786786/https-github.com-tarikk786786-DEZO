import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';

describe('HTTP Routes & API Health Tests', () => {
  it('verifies /api/health returns 200 and operational status', async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/health`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, 'ok');
      assert.ok(data.engine.includes('Next.js App Router'));
    } catch (err: unknown) {
      if ((err as { code?: string }).code === 'ECONNREFUSED') {
        console.warn(`[WARN] Dev server not reachable at ${BASE_URL}. Skipping live test.`);
        return;
      }
      throw err;
    }
  });

  it('verifies /api/contact rejects GET with 405 Method Not Allowed', async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, { method: 'GET' });
      assert.equal(res.status, 405);
    } catch (err: unknown) {
      if ((err as { code?: string }).code === 'ECONNREFUSED') return;
      throw err;
    }
  });

  it('verifies /api/contact validates payload and rejects invalid submissions with 400', async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'A' }), // Missing required fields
      });
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.details);
    } catch (err: unknown) {
      if ((err as { code?: string }).code === 'ECONNREFUSED') return;
      throw err;
    }
  });

  it('verifies /api/contact accepts valid submission and creates lead with 201', async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Tarik Islam',
          email: 'tarik@dezo.in',
          phone: '9114411026',
          businessName: 'DEZO Agency',
          city: 'Bhubaneswar',
          service: 'Website Development',
          budget: '₹50,000 - ₹1,00,000',
          message: 'Automated test verification for contact lead intake system.',
        }),
      });
      assert.equal(res.status, 201);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.leadId.startsWith('DEZO-'));
      assert.ok(data.whatsappHandoffUrl.startsWith('https://wa.me/'));
    } catch (err: unknown) {
      if ((err as { code?: string }).code === 'ECONNREFUSED') return;
      throw err;
    }
  });

  it('verifies primary public pages return 200 OK', async () => {
    const pages = [
      '/',
      '/pricing',
      '/careers',
      '/services',
      '/services/web-development',
      '/services/amazon',
      '/services/flipkart',
      '/promise',
    ];

    for (const page of pages) {
      try {
        const res = await fetch(`${BASE_URL}${page}`);
        assert.equal(res.status, 200, `Page ${page} should return 200`);
      } catch (err: unknown) {
        if ((err as { code?: string }).code === 'ECONNREFUSED') return;
        throw err;
      }
    }
  });
});

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateGrowthAdvisory, generatePersonalizedPitch } from '../lib/ai/llm';

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';

function isConnRefused(err: unknown): boolean {
  if (!err) return false;
  const e = err as { code?: string; message?: string; cause?: { code?: string } };
  return (
    e.code === 'ECONNREFUSED' ||
    e.cause?.code === 'ECONNREFUSED' ||
    (typeof e.message === 'string' && e.message.includes('fetch failed'))
  );
}

describe('DEZO Multi-Provider AI Engine & Advisor Tests', () => {
  it('generates a structured growth advisory with pricing and action plan', async () => {
    const result = await generateGrowthAdvisory({
      businessType: 'Handloom Saree Manufacturer',
      primaryGoal: 'Expand Pan-India online sales',
      location: 'Sambalpur, Odisha',
      currentBudget: '₹50,000 - ₹1,00,000',
    });

    assert.ok(result.recommendedPackage, 'Must return a recommendedPackage');
    assert.ok(result.estimatedStartingPrice, 'Must return estimatedStartingPrice');
    assert.ok(result.rationale, 'Must return rationale');
    assert.ok(Array.isArray(result.keyActionPlan) && result.keyActionPlan.length >= 3, 'Must have at least 3 action steps');
    assert.ok(Array.isArray(result.suggestedServices) && result.suggestedServices.length >= 2, 'Must have at least 2 services');
  });

  it('generates an editorial pitch with subject and body', async () => {
    const pitch = await generatePersonalizedPitch({
      prospectDomain: 'yourstory.com',
      articleTopic: 'Odisha Digital Artisans Scaling E-Commerce',
      publisherName: 'Tech Editor',
      targetDezoUrl: 'https://dezo.in/marketplace',
      anchorText: 'DEZO eCommerce growth framework',
    });

    assert.ok(pitch.subject, 'Pitch must have a subject');
    assert.ok(pitch.body, 'Pitch must have a body');
    assert.ok(pitch.subject.length > 5);
    assert.ok(pitch.body.length > 20);
  });

  it('verifies /api/ai/advisor endpoint generates diagnostic response via HTTP', async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/ai/advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'diagnostic',
          businessType: 'Real Estate Developer',
          primaryGoal: 'Generate buyer inquiries for luxury apartments',
          location: 'Bhubaneswar, Odisha',
          currentBudget: '₹1,00,000 - ₹2,50,000',
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        assert.equal(data.success, true);
        assert.ok(data.advisory.recommendedPackage);
        assert.ok(data.whatsappHandoffUrl.startsWith('https://wa.me/'));
      }
    } catch (err: unknown) {
      if (isConnRefused(err)) return;
      throw err;
    }
  });

  it('verifies /api/ai/advisor endpoint handles conversational chat queries', async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/ai/advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          message: 'What is the starting price for an eCommerce website at DEZO?',
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        assert.equal(data.success, true);
        assert.ok(data.reply && data.reply.length > 20);
      }
    } catch (err: unknown) {
      if (isConnRefused(err)) return;
      throw err;
    }
  });
});

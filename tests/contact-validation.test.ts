import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { contactFormSchema, buildWhatsAppLeadUrl } from '../lib/validation/contact';

describe('Contact Validation & WhatsApp URL Builder', () => {
  it('validates a complete, legitimate contact payload', () => {
    const validData = {
      name: 'Tarik Islam',
      email: 'tarik@example.com',
      phone: '9114411026',
      businessName: 'DEZO Studio',
      city: 'Bhubaneswar',
      service: 'Website Development' as const,
      budget: '₹50,000 - ₹1,00,000' as const,
      message: 'We require a new high-speed web application for our brand.',
    };

    const result = contactFormSchema.safeParse(validData);
    assert.equal(result.success, true);
  });

  it('rejects payloads with missing required fields or invalid formats', () => {
    const invalidEmail = {
      name: 'John Doe',
      email: 'not-an-email',
      phone: '9114411026',
      service: 'Website Development',
      message: 'Valid message exceeding minimum length requirements.',
    };
    const resEmail = contactFormSchema.safeParse(invalidEmail);
    assert.equal(resEmail.success, false);

    const shortPhone = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123',
      service: 'Website Development',
      message: 'Valid message exceeding minimum length requirements.',
    };
    const resPhone = contactFormSchema.safeParse(shortPhone);
    assert.equal(resPhone.success, false);

    const shortMessage = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9114411026',
      service: 'Website Development',
      message: 'Hi',
    };
    const resMsg = contactFormSchema.safeParse(shortMessage);
    assert.equal(resMsg.success, false);
  });

  it('constructs a correctly formatted and encoded WhatsApp URL', () => {
    const data = {
      name: 'Aditya Dash',
      email: 'aditya@client.in',
      phone: '9876543210',
      businessName: 'Kalinga Exports',
      city: 'Cuttack',
      service: 'Ecommerce Architecture' as const,
      budget: '₹1,00,000 - ₹2,50,000' as const,
      message: 'Looking for a Shopify Plus setup for handicrafts.',
    };

    const url = buildWhatsAppLeadUrl(data);
    assert.match(url, /^https:\/\/wa\.me\/919114411026\?text=/);
    assert.equal(url.includes('Aditya%20Dash'), true);
    assert.equal(url.includes('Kalinga%20Exports'), true);
    assert.equal(url.includes('Cuttack'), true);
    assert.equal(url.includes('Ecommerce%20Architecture'), true);
  });
});

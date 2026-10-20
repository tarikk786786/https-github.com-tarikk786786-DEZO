import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { HIGH_AUTHORITY_CATALOG } from '../lib/backlink-pro/catalog';
import { backlinkStore, catalogItemToRecord } from '../lib/backlink-pro/store';
import { isSafeUrl, extractLinksFromHtml } from '../lib/backlink-pro/verifier';

describe('DEZO Backlink Pro & Authority Acquisition Engine', () => {
  describe('High-Authority Catalog Integrity', () => {
    it('contains at least 30 verified high-DA backlink platforms', () => {
      assert.ok(
        HIGH_AUTHORITY_CATALOG.length >= 30,
        `Expected >= 30 catalog items, found ${HIGH_AUTHORITY_CATALOG.length}`
      );
    });

    it('validates every catalog item has required schema properties', () => {
      const ids = new Set<string>();

      for (const item of HIGH_AUTHORITY_CATALOG) {
        assert.ok(item.id, 'Item must have an id');
        assert.ok(!ids.has(item.id), `Duplicate catalog id found: ${item.id}`);
        ids.add(item.id);

        assert.ok(item.name, `Item ${item.id} must have a name`);
        assert.ok(item.targetDomain, `Item ${item.id} must have a targetDomain`);
        assert.ok(item.domainAuthority >= 50 && item.domainAuthority <= 100, `Item ${item.id} DA must be between 50 and 100`);
        assert.ok(item.submissionUrl.startsWith('http'), `Item ${item.id} submissionUrl must be a valid http(s) URL`);
        assert.ok(item.targetDezoUrl.includes('dezo.in'), `Item ${item.id} targetDezoUrl must point to dezo.in`);
        assert.ok(item.recommendedAnchor.length > 0, `Item ${item.id} must have recommended anchor text`);
        assert.ok(item.instructions.length > 10, `Item ${item.id} must have actionable submission instructions`);
      }
    });

    it('covers all strategic backlink categories', () => {
      const categories = new Set(HIGH_AUTHORITY_CATALOG.map((i) => i.category));
      assert.ok(categories.has('web_infrastructure'), 'Must include web infrastructure');
      assert.ok(categories.has('developer_ecosystem'), 'Must include developer ecosystem');
      assert.ok(categories.has('startup_directories'), 'Must include startup directories');
      assert.ok(categories.has('indian_b2b_directories'), 'Must include Indian B2B directories');
      assert.ok(categories.has('content_publishing'), 'Must include content publishing');
      assert.ok(categories.has('social_authority'), 'Must include social authority');
    });
  });

  describe('Campaign Store & Ledger Operations', () => {
    it('initializes campaign targeting dezo.in with 10,000 backlink goal', () => {
      const campaign = backlinkStore.getCampaign();
      assert.equal(campaign.targetDomain, 'dezo.in');
      assert.equal(campaign.targetGoalCount, 10000);
      assert.ok(campaign.stats.totalRecords >= 30, 'Store must be populated with initial & catalog records');
    });

    it('correctly maps catalog items to backlink records', () => {
      const sampleItem = HIGH_AUTHORITY_CATALOG[0];
      const record = catalogItemToRecord(sampleItem);
      assert.equal(record.destinationUrl, sampleItem.targetDezoUrl);
      assert.equal(record.referringDomain, sampleItem.targetDomain);
      assert.equal(record.status, 'discovered');
    });

    it('deduplicates existing records on bulk add', () => {
      const existing = backlinkStore.getAllRecords()[0];
      const duplicateItem = {
        campaignId: 'camp-dezo-master',
        sourceUrl: existing.sourceUrl,
        referringDomain: existing.referringDomain,
        destinationUrl: existing.destinationUrl,
        anchorText: 'DEZO duplicate test',
        targetAnchorType: 'branded' as const,
        rel: 'follow' as const,
        category: existing.category,
        niche: existing.niche,
        status: 'discovered' as const,
        httpStatus: null,
        linkFoundInHtml: false,
        discoverySource: 'Unit Test',
      };

      const result = backlinkStore.addRecords([duplicateItem]);
      assert.equal(result.added, 0, 'Should not add duplicate');
      assert.equal(result.duplicates, 1, 'Should report 1 duplicate');
    });

    it('updates record status and updates campaign statistics', () => {
      const records = backlinkStore.getAllRecords();
      const target = records[0];
      const success = backlinkStore.updateRecordStatus(target.id, 'verified_live', {
        linkFoundInHtml: true,
        httpStatus: 200,
      });

      assert.ok(success, 'Status update must return true');
      const updated = backlinkStore.getRecordById(target.id);
      assert.equal(updated?.status, 'verified_live');
      assert.equal(updated?.httpStatus, 200);

      const campaign = backlinkStore.getCampaign();
      assert.ok(campaign.stats.verifiedLiveCount > 0, 'Verified count must be > 0');
    });
  });

  describe('Verifier SSRF Protection & Link Parsing', () => {
    it('permits valid public URLs', () => {
      assert.equal(isSafeUrl('https://validator.w3.org'), true);
      assert.equal(isSafeUrl('https://github.com/dezo'), true);
      assert.equal(isSafeUrl('https://similarweb.com/website/dezo.in'), true);
    });

    it('blocks internal and private IPv4 ranges to mitigate SSRF', () => {
      assert.equal(isSafeUrl('http://127.0.0.1:8080/admin'), false);
      assert.equal(isSafeUrl('http://localhost:3000'), false);
      assert.equal(isSafeUrl('http://169.254.169.254/latest/meta-data/'), false);
      assert.equal(isSafeUrl('http://192.168.1.1'), false);
      assert.equal(isSafeUrl('http://10.0.0.1'), false);
      assert.equal(isSafeUrl('ftp://example.com'), false);
    });

    it('extracts links and rel attributes accurately from HTML', () => {
      const mockHtml = `
        <html>
          <body>
            <p>Check out our growth partners at <a href="https://dezo.in" rel="follow">DEZO Growth Agency</a>.</p>
            <p>Another mention: <a href="https://dezo.in/growth-lab" rel="nofollow noopener">DEZO Lab</a>.</p>
            <p>Unrelated link: <a href="https://google.com">Search</a>.</p>
          </body>
        </html>
      `;

      const links = extractLinksFromHtml(mockHtml, 'dezo.in');
      assert.equal(links.length, 2, 'Must locate exactly 2 links to dezo.in');
      
      const link1 = links.find((l) => l.href === 'https://dezo.in');
      assert.ok(link1);
      assert.equal(link1?.anchorText, 'DEZO Growth Agency');
      assert.equal(link1?.rel, 'follow');

      const link2 = links.find((l) => l.href === 'https://dezo.in/growth-lab');
      assert.ok(link2);
      assert.equal(link2?.anchorText, 'DEZO Lab');
      assert.ok(link2?.rel.includes('nofollow'));
    });
  });
});

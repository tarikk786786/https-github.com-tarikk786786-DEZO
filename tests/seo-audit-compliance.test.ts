import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { siteConfig, constructMetadata } from '../lib/seo/metadata';
import { generateWorkPortfolioSchema } from '../lib/seo/jsonld';
import sitemap from '../app/sitemap';

describe('SEO Audit & Search Engine Compliance Tests', () => {
  it('verifies default site metadata and character bands', () => {
    const meta = constructMetadata();
    const title = meta.title as string;
    assert.ok(title, 'Default title must exist');
    assert.ok(title.length >= 40 && title.length <= 60, `Title "${title}" length (${title.length}) must be in 40-60 char band`);
    assert.strictEqual(siteConfig.ogImage, 'https://dezo.in/og-image.png');
  });

  it('verifies high-resolution og-image assets exist in public folder', () => {
    const pngPath = path.resolve(process.cwd(), 'public/og-image.png');
    const jpgPath = path.resolve(process.cwd(), 'public/og-image.jpg');
    assert.ok(fs.existsSync(pngPath), 'public/og-image.png must exist');
    assert.ok(fs.existsSync(jpgPath), 'public/og-image.jpg must exist');
    assert.ok(fs.statSync(pngPath).size > 1000, 'og-image.png must have non-trivial size');
  });

  it('verifies structured data Article/CaseStudy generator for /work', () => {
    const mockProjects = [
      { title: 'Yasana Beauty Rituals', url: 'https://yasanabeautyrituals.in', category: 'eCommerce' },
      { title: 'The Paan Luxe', url: 'https://thepaanluxe.com', category: 'Luxury Brand' },
    ];
    const schema = generateWorkPortfolioSchema(mockProjects) as any;
    assert.strictEqual(schema['@type'], 'CollectionPage');
    assert.strictEqual(schema.mainEntity['@type'], 'ItemList');
    assert.ok(Array.isArray(schema.mainEntity.itemListElement));
    assert.strictEqual(schema.mainEntity.itemListElement.length, 2);
    assert.strictEqual(schema.mainEntity.itemListElement[0].item['@type'], 'Article');
    assert.strictEqual(schema.mainEntity.itemListElement[0].item.name, 'Yasana Beauty Rituals');
  });

  it('verifies sitemap does not contain redirected /tools route and has unique URLs', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    assert.ok(!urls.includes('https://dezo.in/tools'), 'sitemap must not include redirected https://dezo.in/tools');
    assert.ok(urls.includes('https://dezo.in/growth-lab'), 'sitemap must include canonical https://dezo.in/growth-lab');
    assert.ok(urls.includes('https://dezo.in/marketplace'), 'sitemap must include https://dezo.in/marketplace');
    const uniqueUrls = new Set(urls);
    assert.strictEqual(uniqueUrls.size, urls.length, 'sitemap must not contain duplicate URLs');
  });

  it('verifies llms.txt and agents.md exist and conform to standards', () => {
    const llmsPath = path.resolve(process.cwd(), 'public/llms.txt');
    const agentsPath = path.resolve(process.cwd(), 'public/agents.md');
    assert.ok(fs.existsSync(llmsPath), 'public/llms.txt must exist');
    assert.ok(fs.existsSync(agentsPath), 'public/agents.md must exist');

    const llmsContent = fs.readFileSync(llmsPath, 'utf8');
    assert.ok(llmsContent.includes('# DEZO'), 'llms.txt must have title');
    assert.ok(llmsContent.includes('[Commercial Services]'), 'llms.txt must contain section markdown links');
    assert.ok(llmsContent.includes('[Marketplace Hub]'), 'llms.txt must contain marketplace hub link');

    const agentsContent = fs.readFileSync(agentsPath, 'utf8');
    assert.ok(agentsContent.includes('DEZO Agent Operating Guide'), 'agents.md must contain heading');
    assert.ok(agentsContent.includes('Machine-Readable Endpoints'), 'agents.md must declare machine-readable endpoints');
  });
});

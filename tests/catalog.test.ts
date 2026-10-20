import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  SERVICE_DEPARTMENTS,
  MASTER_SERVICES_CATALOG,
} from '../content/services-catalog';

import {
  WEBSITE_PRICING_CATALOG,
  WEBSITE_PACKAGES,
  WEBSITE_CONFIDENCE_PROMISES,
  BUDGET_BANDS,
} from '../content/website-pricing-catalog';

import {
  CAREER_TRACKS,
  CAREERS_FAQS,
  HIRING_PROCESS_STEPS,
  CAREERS_CONFIG,
} from '../content/careers';

import {
  SALES_GROWTH_STAGES,
  INDUSTRY_MARKETPLACE_SOLUTIONS,
  MARKETPLACE_ENGAGEMENT_TIERS,
} from '../content/ecommerce-catalog';

describe('DEZO Master Content & Catalog Integrity', () => {
  describe('Services Catalog', () => {
    it('contains all 12 core service departments (A through L)', () => {
      assert.equal(SERVICE_DEPARTMENTS.length, 12);
      const codes = SERVICE_DEPARTMENTS.map((d) => d.code);
      const expectedCodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
      assert.deepEqual(codes, expectedCodes);
    });

    it('ensures each master service has a unique slug and valid structure', () => {
      assert.ok(MASTER_SERVICES_CATALOG.length >= 12, 'Must have at least 12 services');
      const slugs = new Set<string>();

      for (const svc of MASTER_SERVICES_CATALOG) {
        assert.ok(svc.id, 'Service must have an id');
        assert.ok(svc.name, `Service ${svc.id} must have a name`);
        assert.ok(svc.slug, `Service ${svc.id} must have a slug`);
        assert.ok(svc.departmentCode, `Service ${svc.id} must have a departmentCode`);
        assert.ok(svc.departmentName, `Service ${svc.id} must have a departmentName`);
        assert.ok(svc.shortDescription, `Service ${svc.id} must have a shortDescription`);
        assert.ok(Array.isArray(svc.deliverables), `Service ${svc.id} deliverables must be array`);
        assert.ok(svc.deliverables.length > 0, `Service ${svc.id} must have at least 1 deliverable`);

        assert.equal(slugs.has(svc.slug), false, `Duplicate slug detected: ${svc.slug}`);
        slugs.add(svc.slug);
      }
    });
  });

  describe('Website Pricing Catalog', () => {
    it('contains comprehensive website types with positive starting prices', () => {
      assert.ok(WEBSITE_PRICING_CATALOG.length >= 25, 'Should have at least 25 website types');

      const slugs = new Set<string>();
      for (const site of WEBSITE_PRICING_CATALOG) {
        assert.ok(site.id, 'Website must have an id');
        assert.ok(site.name, `Website ${site.id} must have a name`);
        assert.ok(site.slug, `Website ${site.id} must have a slug`);
        assert.ok(typeof site.startingPrice === 'number' && site.startingPrice > 0, `${site.id} startingPrice must be positive`);
        assert.ok(site.typicalTimeline, `${site.id} must have a typicalTimeline`);
        assert.ok(site.recommendedPlatforms && site.recommendedPlatforms.length > 0, `${site.id} must have recommendedPlatforms`);
        assert.ok(site.includedDeliverables && site.includedDeliverables.length > 0, `${site.id} must have includedDeliverables`);

        assert.equal(slugs.has(site.slug), false, `Duplicate website slug detected: ${site.slug}`);
        slugs.add(site.slug);
      }
    });

    it('contains 5 standard packages from START to SCALE/CUSTOM', () => {
      assert.equal(WEBSITE_PACKAGES.length, 5);
      for (const pkg of WEBSITE_PACKAGES) {
        assert.ok(pkg.id);
        assert.ok(pkg.name);
        assert.ok(pkg.startingPriceNumeric > 0);
        assert.ok(pkg.keyFeatures.length >= 3);
      }
    });

    it('contains 10 written Website Confidence Promises with defined 30-day warranty', () => {
      assert.equal(WEBSITE_CONFIDENCE_PROMISES.length, 10);
      const warranty = WEBSITE_CONFIDENCE_PROMISES.find((p) => p.title.includes('30-Day'));
      assert.ok(warranty, 'Must include 30-day warranty promise');
      assert.ok(warranty?.concreteCommitment.includes('30 days') || warranty?.title.includes('30-Day'));
    });

    it('contains 6 defined budget bands covering under ₹25k to ₹5L+', () => {
      assert.equal(BUDGET_BANDS.length, 6);
    });
  });

  describe('Careers & Training Architecture', () => {
    it('defines 11 career and internship training tracks', () => {
      assert.equal(CAREER_TRACKS.length, 11);
      const trackIds = new Set<string>();

      for (const track of CAREER_TRACKS) {
        assert.ok(track.id);
        assert.ok(track.name);
        assert.ok(track.whatYouWillLearn.length >= 2, `Track ${track.id} must have at least 2 learning objectives`);

        assert.equal(trackIds.has(track.id), false, `Duplicate trackId: ${track.id}`);
        trackIds.add(track.id);
      }
    });

    it('outlines clear 5-step hiring pathway without false promises', () => {
      assert.equal(HIRING_PROCESS_STEPS.length, 5);
      assert.ok(CAREERS_FAQS.length >= 10, 'Must have at least 10 transparent FAQs');
      assert.equal(CAREERS_CONFIG.eligibility.ageRange, '23–30 years (configurable per role)');
      assert.ok(!CAREERS_CONFIG.eligibility.ageRange.includes('38'), 'Age range upper bound must be 30, not 38');
    });
  });

  describe('eCommerce & Marketplace Systems', () => {
    it('defines 6 stages of marketplace sales growth', () => {
      assert.equal(SALES_GROWTH_STAGES.length, 6);
      for (const stage of SALES_GROWTH_STAGES) {
        assert.ok(stage.number);
        assert.ok(stage.name);
        assert.ok(stage.keyActivities.length > 0);
      }
    });

    it('defines 8 specialized industry marketplace solutions', () => {
      assert.equal(INDUSTRY_MARKETPLACE_SOLUTIONS.length, 8);
      for (const sol of INDUSTRY_MARKETPLACE_SOLUTIONS) {
        assert.ok(sol.id);
        assert.ok(sol.industry);
        assert.ok(sol.keyChallenges.length > 0);
        assert.ok(sol.creativeRequirements.length > 0);
      }
    });

    it('defines 5 marketplace engagement tiers', () => {
      assert.equal(MARKETPLACE_ENGAGEMENT_TIERS.length, 5);
      for (const tier of MARKETPLACE_ENGAGEMENT_TIERS) {
        assert.ok(tier.id);
        assert.ok(tier.name);
        assert.ok(tier.deliverables.length > 0);
      }
    });
  });
});

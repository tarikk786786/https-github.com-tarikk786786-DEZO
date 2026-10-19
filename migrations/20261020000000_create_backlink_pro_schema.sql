-- ==============================================================================
-- DEZO Backlink Pro & SEO Engine Enterprise Database Schema
-- Migration: 20261020000000_create_backlink_pro_schema.sql
-- Description: Creates properly indexed relational tables for 10,000+ Backlinks,
--              Campaigns, Verification Jobs, Outreach CRM, Competitors & Audits.
-- ==============================================================================

-- 1. Organizations & Tenants (Multi-tenant ready)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Projects & Target Websites
CREATE TABLE IF NOT EXISTS public.websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  primary_url TEXT NOT NULL,
  target_niche TEXT,
  target_backlink_goal INT DEFAULT 10000,
  unique_domain_goal INT DEFAULT 2500,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_websites_domain ON public.websites (domain);

-- 3. Backlink Campaigns
CREATE TABLE IF NOT EXISTS public.backlink_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES public.websites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, paused, completed
  target_backlink_count INT DEFAULT 10000,
  unique_domains_count INT DEFAULT 2500,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Backlink Records (Core 10,000+ Backlinks Ledger)
CREATE TABLE IF NOT EXISTS public.backlink_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.backlink_campaigns(id) ON DELETE CASCADE,
  source_url TEXT NOT NULL,
  referring_domain TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  anchor_text TEXT NOT NULL,
  anchor_type TEXT NOT NULL DEFAULT 'branded', -- branded, naked_url, partial_match, generic, exact_match
  rel_attribute TEXT NOT NULL DEFAULT 'follow', -- follow, nofollow, sponsored, ugc
  category TEXT NOT NULL DEFAULT 'business_directory', -- editorial, guest_post, resource_page, business_directory, digital_pr
  niche TEXT,
  status TEXT NOT NULL DEFAULT 'discovered', -- discovered, approved, contacted, published, verified_live, lost, rejected, failed
  http_status INT,
  link_found_in_html BOOLEAN NOT NULL DEFAULT FALSE,
  actual_anchor_text TEXT,
  actual_rel TEXT,
  discovery_source TEXT,
  domain_authority INT DEFAULT 0,
  monthly_traffic BIGINT DEFAULT 0,
  spam_score INT DEFAULT 0,
  contact_email TEXT,
  contact_name TEXT,
  estimated_cost_usd NUMERIC(10, 2) DEFAULT 0.00,
  first_detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_checked_at TIMESTAMPTZ,
  last_verified_at TIMESTAMPTZ,
  notes TEXT,
  CONSTRAINT uq_backlink_source_destination UNIQUE (source_url, destination_url)
);

CREATE INDEX IF NOT EXISTS idx_backlinks_campaign ON public.backlink_records (campaign_id);
CREATE INDEX IF NOT EXISTS idx_backlinks_status ON public.backlink_records (status);
CREATE INDEX IF NOT EXISTS idx_backlinks_referring_domain ON public.backlink_records (referring_domain);
CREATE INDEX IF NOT EXISTS idx_backlinks_destination_url ON public.backlink_records (destination_url);
CREATE INDEX IF NOT EXISTS idx_backlinks_last_checked ON public.backlink_records (last_checked_at DESC);

-- 5. Verification Snapshot Log (Historical Evidence Tracking)
CREATE TABLE IF NOT EXISTS public.backlink_verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  backlink_id UUID REFERENCES public.backlink_records(id) ON DELETE CASCADE,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  http_status INT NOT NULL,
  reachable BOOLEAN NOT NULL,
  link_found BOOLEAN NOT NULL,
  found_anchor TEXT,
  found_rel TEXT,
  latency_ms INT,
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_verification_backlink_checked ON public.backlink_verification_logs (backlink_id, checked_at DESC);

-- 6. Link Outreach CRM (Prospective Contacts & Pipeline)
CREATE TABLE IF NOT EXISTS public.outreach_prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.backlink_campaigns(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  source_page_url TEXT,
  contact_name TEXT,
  contact_email TEXT NOT NULL,
  outreach_status TEXT NOT NULL DEFAULT 'new', -- new, queued, sent, replied, negotiating, published, declined
  category TEXT DEFAULT 'editorial',
  pitch_subject TEXT,
  pitch_body TEXT,
  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_outreach_domain ON public.outreach_prospects (domain);
CREATE INDEX IF NOT EXISTS idx_outreach_status ON public.outreach_prospects (outreach_status);

-- 7. Seed Initial DEZO Production Record
INSERT INTO public.organizations (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'DEZO Master', 'dezo-master')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.websites (id, org_id, domain, primary_url, target_niche)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'dezo.in',
  'https://dezo.in',
  'Digital Infrastructure & Ecommerce Growth'
)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS public.leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  city TEXT,
  service TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'website_form',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service ON public.leads (service);

INSERT INTO public.leads (name, email, phone, business_name, city, service, budget, message, source)
VALUES
  ('Amit Sharma', 'amit@example.com', '+919900001111', 'AS Retail', 'Bhubaneswar', 'Website Development', '₹50,000 - ₹1,00,000', 'Need a modern website for our retail chain.', 'sample_seed'),
  ('Neha Patel', 'neha@example.com', '+919900002222', 'NP Wellness', 'Pune', 'Digital Marketing', '₹1,00,000 - ₹2,00,000', 'Looking for SEO and paid ads support.', 'sample_seed'),
  ('Rahul Verma', 'rahul@example.com', '+919900003333', 'RV Foods', 'Delhi', 'Ecommerce', '₹2,00,000+', 'Planning to launch an ecommerce store in 6 weeks.', 'sample_seed')
ON CONFLICT DO NOTHING;

-- Add ticker settings columns
ALTER TABLE stores ADD COLUMN IF NOT EXISTS homepage_ticker_enabled BOOLEAN DEFAULT true;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS homepage_ticker_items JSONB DEFAULT '["Free Shipping Worldwide", "30-Day Money Back Guarantee", "24/7 Customer Support"]'::jsonb;

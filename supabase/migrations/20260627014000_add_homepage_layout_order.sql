-- Add homepage layout order column
ALTER TABLE stores ADD COLUMN IF NOT EXISTS homepage_layout_order JSONB DEFAULT '["ticker", "features", "products"]'::jsonb;

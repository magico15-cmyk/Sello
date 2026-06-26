-- Add express_checkout toggle to products (per-product setting)
ALTER TABLE products ADD COLUMN IF NOT EXISTS express_checkout boolean DEFAULT false;

-- Add features section title and subtitle columns
ALTER TABLE stores ADD COLUMN IF NOT EXISTS homepage_features_title TEXT DEFAULT 'Why Choose Us';
ALTER TABLE stores ADD COLUMN IF NOT EXISTS homepage_features_subtitle TEXT DEFAULT '✦ OUR BENEFITS ✦';

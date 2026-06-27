ALTER TABLE stores
ADD COLUMN IF NOT EXISTS header_desktop_bg_color VARCHAR(50) DEFAULT '#FFFFFF',
ADD COLUMN IF NOT EXISTS header_desktop_button_color VARCHAR(50) DEFAULT '#171717',
ADD COLUMN IF NOT EXISTS header_desktop_border_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS header_desktop_border_color VARCHAR(50) DEFAULT '#F0F0F0';
NOTIFY pgrst, 'reload schema';

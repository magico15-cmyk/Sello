-- Migration to add header and notice bar settings

ALTER TABLE stores 
ADD COLUMN IF NOT EXISTS header_desktop_layout JSONB DEFAULT '["menu", "logo", "search", "account", "cart"]',
ADD COLUMN IF NOT EXISTS header_mobile_layout JSONB DEFAULT '["menu", "logo", "cart"]',
ADD COLUMN IF NOT EXISTS header_bg_color VARCHAR(50) DEFAULT '#FFFFFF',
ADD COLUMN IF NOT EXISTS header_button_color VARCHAR(50) DEFAULT '#171717',
ADD COLUMN IF NOT EXISTS header_border_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS header_border_color VARCHAR(50) DEFAULT '#F0F0F0',
ADD COLUMN IF NOT EXISTS notice_bar_desktop_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS notice_bar_desktop_text TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS notice_bar_desktop_bg_color VARCHAR(50) DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS notice_bar_desktop_text_color VARCHAR(50) DEFAULT '#FFFFFF',
ADD COLUMN IF NOT EXISTS notice_bar_desktop_above_header BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notice_bar_mobile_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS notice_bar_mobile_text TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS notice_bar_mobile_bg_color VARCHAR(50) DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS notice_bar_mobile_text_color VARCHAR(50) DEFAULT '#FFFFFF',
ADD COLUMN IF NOT EXISTS notice_bar_mobile_above_header BOOLEAN DEFAULT true;

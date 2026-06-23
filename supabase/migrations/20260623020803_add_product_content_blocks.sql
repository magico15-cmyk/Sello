ALTER TABLE public.products ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]'::jsonb;

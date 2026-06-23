-- Drop the old table if it exists
DROP TABLE IF EXISTS public.products;

-- Create the new products table
CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    price NUMERIC(10, 2) NOT NULL,
    "originalPrice" NUMERIC(10, 2),
    image TEXT,
    category TEXT,
    gender TEXT,
    size TEXT,
    "isFavorite" BOOLEAN DEFAULT false,
    inventory TEXT DEFAULT 'Tracked',
    stock INTEGER DEFAULT 0,
    orders INTEGER DEFAULT 0,
    visibility TEXT DEFAULT 'Visible',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) but allow all for now since it's a local MVP
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.products FOR DELETE USING (true);

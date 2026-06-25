CREATE TABLE IF NOT EXISTS store_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(store_id, slug)
);

ALTER TABLE store_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON store_categories FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON store_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON store_categories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON store_categories FOR DELETE USING (true);
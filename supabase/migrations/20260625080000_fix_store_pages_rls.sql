-- Fix RLS policies to allow public access (since the local dashboard doesn't use Supabase Auth)
DROP POLICY IF EXISTS "Users can manage their store's pages" ON store_pages;
DROP POLICY IF EXISTS "Users can manage pages" ON store_pages;

-- Allow public insert, update, delete
CREATE POLICY "Allow public insert access on store_pages" ON store_pages
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update access on store_pages" ON store_pages
    FOR UPDATE
    USING (true);

CREATE POLICY "Allow public delete access on store_pages" ON store_pages
    FOR DELETE
    USING (true);

-- Ensure select is public
DROP POLICY IF EXISTS "Public can view published pages" ON store_pages;
CREATE POLICY "Allow public read access on store_pages" ON store_pages
    FOR SELECT
    USING (true);

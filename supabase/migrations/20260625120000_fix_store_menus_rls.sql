-- Fix RLS policies to allow public access (since the local dashboard doesn't use Supabase Auth)
DROP POLICY IF EXISTS "Store owners can insert menus" ON store_menus;
DROP POLICY IF EXISTS "Store owners can update menus" ON store_menus;
DROP POLICY IF EXISTS "Store owners can delete menus" ON store_menus;

-- Allow public insert, update, delete
CREATE POLICY "Allow public insert access on store_menus" ON store_menus
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update access on store_menus" ON store_menus
    FOR UPDATE
    USING (true);

CREATE POLICY "Allow public delete access on store_menus" ON store_menus
    FOR DELETE
    USING (true);

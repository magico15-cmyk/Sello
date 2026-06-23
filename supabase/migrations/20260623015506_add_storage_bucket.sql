-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read files
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'products');

-- Allow authenticated (or anon for local dev) to insert files
CREATE POLICY "Allow Insert" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'products');

-- Allow authenticated to update files
CREATE POLICY "Allow Update" ON storage.objects
FOR UPDATE USING (bucket_id = 'products');

-- Allow authenticated to delete files
CREATE POLICY "Allow Delete" ON storage.objects
FOR DELETE USING (bucket_id = 'products');

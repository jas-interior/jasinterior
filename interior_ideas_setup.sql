-- Run this in your Supabase SQL Editor

-- 1. Create Tables for Interior Ideas Gallery
CREATE TABLE IF NOT EXISTS interior_idea_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interior_idea_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES interior_idea_categories(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE interior_idea_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE interior_idea_images ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policies
CREATE POLICY "Allow public read categories" ON interior_idea_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read images" ON interior_idea_images FOR SELECT USING (true);

-- 4. Admin All Policies (Using anon key for MVP)
CREATE POLICY "Allow admin all categories" ON interior_idea_categories USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all images" ON interior_idea_images USING (true) WITH CHECK (true);

-- 5. Insert Initial Default Categories
INSERT INTO interior_idea_categories (name, slug, sort_order) VALUES
('Living Room Ideas', 'living-room-ideas', 1),
('Bedroom Ideas', 'bedroom-ideas', 2),
('Kitchen Ideas', 'kitchen-ideas', 3),
('Dining Room Ideas', 'dining-room-ideas', 4),
('Safety Door Ideas', 'safety-door-ideas', 5),
('Shoe Rack Ideas', 'shoe-rack-ideas', 6),
('Wardrobe Ideas', 'wardrobe-ideas', 7),
('Bed Ideas', 'bed-ideas', 8),
('False Ceiling Ideas', 'false-ceiling-ideas', 9),
('Curtain Ideas', 'curtain-ideas', 10),
('TV Unit Ideas', 'tv-unit-ideas', 11),
('Wall Colour Ideas', 'wall-colour-ideas', 12),
('Balcony Ideas', 'balcony-ideas', 13)
ON CONFLICT (slug) DO NOTHING;

-- 6. Create Storage Bucket for Interior Ideas Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('interior-ideas', 'interior-ideas', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage Policies
CREATE POLICY "Allow public read interior-ideas" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'interior-ideas');

CREATE POLICY "Allow all interior-ideas" 
ON storage.objects USING (bucket_id = 'interior-ideas') 
WITH CHECK (bucket_id = 'interior-ideas');

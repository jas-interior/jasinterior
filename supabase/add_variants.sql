-- Run this query in your Supabase SQL Editor to add support for size variants
ALTER TABLE products ADD COLUMN variants JSONB DEFAULT '[]'::jsonb;

-- JAS INTERIOR - Seed Data
INSERT INTO categories (name, slug, description, sort_order, active) VALUES
  ('Sofa', 'sofa', 'Premium custom sofas crafted to your comfort and style.', 1, true),
  ('Bed', 'bed', 'Luxurious custom beds designed for your bedroom.', 2, true),
  ('Wardrobe', 'wardrobe', 'Custom wardrobes built to maximize your space.', 3, true),
  ('Dining Table', 'dining-table', 'Elegant dining tables crafted for your dining space.', 4, true),
  ('TV Unit', 'tv-unit', 'Modern TV units and entertainment centers.', 5, true),
  ('Mattress', 'mattress', 'Premium quality mattresses for perfect sleep.', 6, true),
  ('T Table', 't-table', 'Stylish center and side tables for your living space.', 7, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('brand_name', 'JAS INTERIOR'),
  ('tagline', 'Premium Custom Furniture Manufacturer'),
  ('support_number', '8866531993'),
  ('contact_shahwaj', '9574285584'),
  ('contact_akash', '9173293129'),
  ('whatsapp_number', '918866531993'),
  ('email', ''),
  ('address', 'Shop No. 1, Maa Complex, Near Uma Char Rasta, Waghodiya Road, Vadodara, Gujarat, India'),
  ('city', 'Vadodara'),
  ('state', 'Gujarat'),
  ('service_area', 'All Gujarat'),
  ('homepage_headline', 'Premium Custom Furniture Manufacturer in Gujarat'),
  ('homepage_description', 'Designed to Your Space. Crafted to Your Style. Built with Premium Quality.'),
  ('seo_title', 'JAS INTERIOR | Premium Custom Furniture Manufacturer in Gujarat'),
  ('seo_description', 'JAS INTERIOR is a premium custom furniture manufacturer in Gujarat. We create made-to-order sofas, beds, wardrobes, dining tables, TV units, and more. Serving all of Gujarat from Vadodara.'),
  ('footer_text', 'Premium Custom Furniture Manufacturer | All Gujarat Service'),
  ('instagram_url', ''),
  ('facebook_url', ''),
  ('youtube_url', ''),
  ('google_maps_embed', ''),
  ('logo_url', '/logo.webp'),
  ('favicon_url', '/favicon.png')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

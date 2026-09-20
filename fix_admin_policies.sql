-- RUN THIS IN YOUR SUPABASE SQL EDITOR TO FIX ADMIN PANEL ACCESS

-- Allow Admin Panel to view all inquiries
CREATE POLICY "Allow admin read inquiries" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Allow admin update inquiries" ON inquiries FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete inquiries" ON inquiries FOR DELETE USING (true);

-- Allow Admin Panel to view and update all orders
CREATE POLICY "Allow admin read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow admin update orders" ON orders FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete orders" ON orders FOR DELETE USING (true);

-- Allow Admin Panel to view and update all customers
CREATE POLICY "Allow admin read customers" ON customers FOR SELECT USING (true);
CREATE POLICY "Allow admin update customers" ON customers FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete customers" ON customers FOR DELETE USING (true);

-- Allow Admin Panel to manage categories
CREATE POLICY "Allow admin read all categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow admin insert categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update categories" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete categories" ON categories FOR DELETE USING (true);

-- Allow Admin Panel to manage products
CREATE POLICY "Allow admin read all products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow admin insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete products" ON products FOR DELETE USING (true);

-- Allow Admin Panel to manage blog posts
CREATE POLICY "Allow admin read all blogs" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow admin insert blogs" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update blogs" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete blogs" ON blog_posts FOR DELETE USING (true);

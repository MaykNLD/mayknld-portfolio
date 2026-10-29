-- ============================================================
-- MaykNLD Portfolio - Supabase Schema
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (Admin users only - max 2)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'manager')),
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ILLUSTRATIONS (digital art, stickers, book pages, canva)
-- ============================================================
CREATE TABLE IF NOT EXISTS illustrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  category TEXT NOT NULL CHECK (category IN ('illustration', 'sticker', 'book', 'canva', 'logo')),
  image_url TEXT NOT NULL,
  image_original_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VIDEOS / REELS
-- ============================================================
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'instagram', 'tiktok', 'direct')),
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- WEB DESIGNS
-- ============================================================
CREATE TABLE IF NOT EXISTS web_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  preview_url TEXT,
  thumbnail_url TEXT,
  tech_stack TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GAMES
-- ============================================================
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_es TEXT,
  description_es TEXT,
  description_en TEXT,
  cover_url TEXT,
  platform TEXT,
  has_active_server BOOLEAN DEFAULT FALSE,
  server_info TEXT,
  game_id TEXT,
  discord_url TEXT,
  uses_discord BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  icon TEXT,
  category TEXT NOT NULL,
  fiverr_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  service_category TEXT,
  ip_address INET,
  user_agent TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_spam BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOCKED IPS
-- ============================================================
CREATE TABLE IF NOT EXISTS blocked_ips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address INET NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value_es TEXT,
  value_en TEXT,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (key, value_es, value_en) VALUES
  ('hero_title', '¡Hola! Soy MaykNLD', 'Hi! I am MaykNLD'),
  ('hero_subtitle', 'Ilustradora digital · Diseño web · Logos · Vídeos · Gaming', 'Digital illustrator · Web design · Logos · Videos · Gaming'),
  ('about_text_es', '¡Hola! Soy ilustradora y diseñadora digital: ilustraciones, logos, vídeos cortos y webs a medida de tu marca. Vengo de atención al cliente: comunico claro y entrego a tiempo. También ofrezco charla y sesiones de juego. ¡Cuéntame!', NULL),
  ('about_text_en', NULL, 'Hi! I am a digital illustrator and designer creating illustrations, logos, short videos and simple websites tailored to your brand. Coming from customer-facing work, I communicate clearly and deliver on time. I also offer friendly chat and gaming sessions. Tell me about your project!')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER illustrations_updated_at BEFORE UPDATE ON illustrations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER games_updated_at BEFORE UPDATE ON games FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_self" ON profiles FOR ALL USING (auth.uid() = id);

ALTER TABLE illustrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "illustrations_public_read" ON illustrations FOR SELECT USING (is_published = TRUE);
CREATE POLICY "illustrations_admin_all" ON illustrations FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','manager'))
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "videos_public_read" ON videos FOR SELECT USING (is_published = TRUE);
CREATE POLICY "videos_admin_all" ON videos FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','manager'))
);

ALTER TABLE web_designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "web_designs_public_read" ON web_designs FOR SELECT USING (is_published = TRUE);
CREATE POLICY "web_designs_admin_all" ON web_designs FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','manager'))
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "games_public_read" ON games FOR SELECT USING (is_published = TRUE);
CREATE POLICY "games_admin_all" ON games FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','manager'))
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_public_read" ON services FOR SELECT USING (is_published = TRUE);
CREATE POLICY "services_admin_all" ON services FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','manager'))
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact_insert" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "contact_admin_read" ON contact_messages FOR SELECT USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','manager'))
);
CREATE POLICY "contact_admin_update" ON contact_messages FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin','manager'))
);

ALTER TABLE blocked_ips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blocked_ips_admin_all" ON blocked_ips FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON site_settings FOR SELECT USING (TRUE);
CREATE POLICY "settings_admin_write" ON site_settings FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

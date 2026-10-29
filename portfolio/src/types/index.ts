// Supabase client types
export type Locale = 'es' | 'en'

export interface Illustration {
  id: string
  title_es: string
  title_en: string
  description_es?: string
  description_en?: string
  category: 'illustration' | 'sticker' | 'book' | 'canva' | 'logo'
  image_url: string
  image_original_url?: string
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  title_es: string
  title_en: string
  description_es?: string
  description_en?: string
  platform: 'youtube' | 'instagram' | 'tiktok' | 'direct'
  video_url: string
  thumbnail_url?: string
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface WebDesign {
  id: string
  title_es: string
  title_en: string
  description_es?: string
  description_en?: string
  preview_url?: string
  thumbnail_url?: string
  tech_stack?: string[]
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface Game {
  id: string
  name: string
  name_es?: string
  description_es?: string
  description_en?: string
  cover_url?: string
  platform?: string
  has_active_server: boolean
  server_info?: string
  game_id?: string
  discord_url?: string
  uses_discord: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title_es: string
  title_en: string
  description_es?: string
  description_en?: string
  icon?: string
  category: string
  fiverr_url?: string
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  service_category?: string
  ip_address?: string
  user_agent?: string
  is_read: boolean
  is_spam: boolean
  created_at: string
}

export interface Profile {
  id: string
  role: 'admin' | 'manager'
  display_name?: string
  created_at: string
}

export interface SiteSetting {
  key: string
  value_es?: string
  value_en?: string
  value?: string
  updated_at: string
}

// UI helpers
export interface NavItem {
  key: string
  href: string
  icon?: string
}

export interface ServiceCategory {
  id: string
  icon: string
  color: string
}

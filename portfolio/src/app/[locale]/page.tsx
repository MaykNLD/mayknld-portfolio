import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturedIllustrations from '@/components/sections/FeaturedIllustrations'
import FeaturedVideos from '@/components/sections/FeaturedVideos'
import GamingPreview from '@/components/sections/GamingPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const supabase = createClient()

  // Fetch featured content in parallel
  const [illustrationsRes, videosRes, gamesRes] = await Promise.all([
    supabase
      .from('illustrations')
      .select('*')
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('sort_order')
      .limit(6),
    supabase
      .from('videos')
      .select('*')
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('sort_order')
      .limit(3),
    supabase
      .from('games')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .limit(4),
  ])

  return (
    <>
      <HeroSection locale={locale} />
      <ServicesSection locale={locale} />
      {illustrationsRes.data && illustrationsRes.data.length > 0 && (
        <FeaturedIllustrations
          items={illustrationsRes.data}
          locale={locale}
        />
      )}
      {videosRes.data && videosRes.data.length > 0 && (
        <FeaturedVideos items={videosRes.data} locale={locale} />
      )}
      {gamesRes.data && gamesRes.data.length > 0 && (
        <GamingPreview items={gamesRes.data} locale={locale} />
      )}
      <ContactCTA locale={locale} />
    </>
  )
}

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import styles from './page.module.css'

export async function generateMetadata({
  params: { locale },
}: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'videos' })
  return { title: t('title'), description: t('desc') }
}

function getEmbedUrl(platform: string, url: string): string {
  if (platform === 'youtube') {
    const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1]
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : url
  }
  return url
}

export default async function VideosPage({
  params: { locale },
}: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'videos' })
  const supabase = createClient()
  const { data: items } = await supabase
    .from('videos')
    .select('*')
    .eq('is_published', true)
    .order('sort_order')

  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden />
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h1 className="section-title font-display">{t('title')}</h1>
          <p className="section-desc">{t('desc')}</p>
        </div>

        <div className={styles.grid}>
          {(items ?? []).map(video => (
            <div key={video.id} className={`${styles.videoCard} card`}>
              <div className={styles.videoWrap}>
                {video.platform === 'youtube' ? (
                  <iframe
                    src={getEmbedUrl(video.platform, video.video_url)}
                    title={locale === 'es' ? video.title_es : video.title_en}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.iframe}
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={video.video_url}
                    poster={video.thumbnail_url ?? undefined}
                    controls
                    className={styles.iframe}
                    preload="metadata"
                  />
                )}
              </div>
              <div className="card-body">
                <span className="badge badge-primary">{video.platform}</span>
                <h2 className={styles.videoTitle}>
                  {locale === 'es' ? video.title_es : video.title_en}
                </h2>
                {(locale === 'es' ? video.description_es : video.description_en) && (
                  <p className={styles.videoDesc}>
                    {locale === 'es' ? video.description_es : video.description_en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

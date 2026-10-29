import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { Video } from '@/types'
import styles from './FeaturedVideos.module.css'

interface Props {
  items: Video[]
  locale: string
}

function getEmbedUrl(video: Video): string {
  if (video.platform === 'youtube') {
    const id = video.video_url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1]
    return id ? `https://www.youtube.com/embed/${id}` : video.video_url
  }
  return video.video_url
}

export default function FeaturedVideos({ items, locale }: Props) {
  const t = useTranslations('videos')
  const tc = useTranslations('common')

  return (
    <section className="section" aria-labelledby="videos-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title font-display" id="videos-title">
            {t('title')}
          </h2>
          <p className="section-desc">{t('desc')}</p>
        </div>

        <div className={styles.grid}>
          {items.map(video => (
            <div key={video.id} className={`${styles.videoCard} card`}>
              <div className={styles.videoWrap}>
                {video.platform === 'youtube' ? (
                  <iframe
                    src={getEmbedUrl(video)}
                    title={locale === 'es' ? video.title_es : video.title_en}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.iframe}
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={video.video_url}
                    poster={video.thumbnail_url}
                    controls
                    className={styles.iframe}
                    preload="metadata"
                  />
                )}
              </div>
              <div className="card-body">
                <span className={`badge badge-primary ${styles.platform}`}>
                  {video.platform}
                </span>
                <h3 className={styles.videoTitle}>
                  {locale === 'es' ? video.title_es : video.title_en}
                </h3>
                {(locale === 'es' ? video.description_es : video.description_en) && (
                  <p className={styles.videoDesc}>
                    {locale === 'es' ? video.description_es : video.description_en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Link href={`/${locale}/videos`} className="btn btn-outline" id="videos-view-all">
            {tc('view_all')} →
          </Link>
        </div>
      </div>
    </section>
  )
}

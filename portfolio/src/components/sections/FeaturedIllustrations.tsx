import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Illustration } from '@/types'
import styles from './FeaturedIllustrations.module.css'

interface Props {
  items: Illustration[]
  locale: string
}

export default function FeaturedIllustrations({ items, locale }: Props) {
  const t = useTranslations('illustrations')
  const tc = useTranslations('common')

  return (
    <section className="section" aria-labelledby="illus-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title font-display" id="illus-title">
            {t('title')}
          </h2>
          <p className="section-desc">{t('desc')}</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.frame} artwork-frame`}
              style={{ gridArea: i === 0 ? 'featured' : undefined }}
            >
              <Image
                src={item.image_url}
                alt={locale === 'es' ? item.title_es : item.title_en}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
              <div className={styles.watermark} aria-hidden>MaykNLD</div>
              <div className="artwork-overlay" />
              <div className={styles.info}>
                <span className="badge badge-primary">{item.category}</span>
                <p className={styles.itemTitle}>
                  {locale === 'es' ? item.title_es : item.title_en}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link
            href={`/${locale}/ilustraciones`}
            className="btn btn-outline"
            id="illus-view-all"
          >
            {tc('view_all')} →
          </Link>
        </div>
      </div>
    </section>
  )
}

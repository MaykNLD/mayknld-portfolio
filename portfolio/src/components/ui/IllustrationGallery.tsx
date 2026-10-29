'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Illustration } from '@/types'
import styles from './IllustrationGallery.module.css'

type Category = 'all' | 'illustration' | 'sticker' | 'book' | 'canva' | 'logo'

interface Props {
  items: Illustration[]
  locale: string
}

export default function IllustrationGallery({ items, locale }: Props) {
  const t = useTranslations('illustrations')
  const tc = useTranslations('common')
  const [active, setActive] = useState<Category>('all')

  const filters: { key: Category; label: string }[] = [
    { key: 'all',          label: t('filter_all') },
    { key: 'illustration', label: t('filter_illustration') },
    { key: 'sticker',      label: t('filter_sticker') },
    { key: 'book',         label: t('filter_book') },
    { key: 'canva',        label: t('filter_canva') },
    { key: 'logo',         label: t('filter_logo') },
  ]

  const filtered = active === 'all' ? items : items.filter(i => i.category === active)

  return (
    <div className={styles.wrapper}>
      {/* Filter bar */}
      <div className={styles.filters} role="group" aria-label="Filtrar por categoría">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`${styles.filterBtn} ${active === f.key ? styles.filterActive : ''}`}
            id={`filter-${f.key}`}
            aria-pressed={active === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className={styles.empty}>{tc('empty')}</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(item => (
            <div key={item.id} className={`${styles.card} artwork-frame`}>
              <Image
                src={item.image_url}
                alt={locale === 'es' ? item.title_es : item.title_en}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
              {/* Watermark */}
              <div className={styles.watermark} aria-hidden>MaykNLD</div>
              <div className="artwork-overlay" />
              <div className={styles.info}>
                <span className="badge badge-primary">{item.category}</span>
                <p className={styles.title}>
                  {locale === 'es' ? item.title_es : item.title_en}
                </p>
                {item.is_featured && (
                  <span className="badge badge-warning">⭐</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

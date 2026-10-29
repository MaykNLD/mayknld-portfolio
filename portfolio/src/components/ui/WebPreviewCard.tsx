'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { WebDesign } from '@/types'
import styles from './WebPreviewCard.module.css'

interface Props {
  item: WebDesign
  locale: string
}

export default function WebPreviewCard({ item, locale }: Props) {
  const t = useTranslations('webs')
  const [previewOpen, setPreviewOpen] = useState(false)

  const title = locale === 'es' ? item.title_es : item.title_en
  const desc = locale === 'es' ? item.description_es : item.description_en

  return (
    <div className={`${styles.card} card`}>
      {/* Thumbnail / iframe preview */}
      <div className={styles.preview}>
        {previewOpen && item.preview_url ? (
          <iframe
            src={item.preview_url}
            title={`Preview: ${title}`}
            className={styles.iframe}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        ) : (
          <>
            {item.thumbnail_url ? (
              <Image
                src={item.thumbnail_url}
                alt={title}
                fill
                style={{ objectFit: 'cover' }}
                draggable={false}
              />
            ) : (
              <div className={styles.placeholder}>
                <span>🌐</span>
                <span>{title}</span>
              </div>
            )}
            {item.preview_url && (
              <button
                className={styles.previewBtn}
                onClick={() => setPreviewOpen(true)}
                id={`web-preview-${item.id}`}
                aria-label={`${t('preview')}: ${title}`}
              >
                <span className={styles.previewIcon}>▶</span>
                {t('preview')}
              </button>
            )}
          </>
        )}
      </div>

      {/* Info */}
      <div className="card-body">
        {item.is_featured && (
          <span className="badge badge-warning" style={{ marginBottom: 'var(--space-2)' }}>
            ⭐ Destacado
          </span>
        )}
        <h3 className={styles.title}>{title}</h3>
        {desc && <p className={styles.desc}>{desc}</p>}

        {item.tech_stack && item.tech_stack.length > 0 && (
          <div className={styles.stack}>
            {item.tech_stack.map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        )}

        {item.preview_url && (
          <a
            href={item.preview_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            id={`web-live-${item.id}`}
          >
            {t('view_live')} ↗
          </a>
        )}
      </div>
    </div>
  )
}

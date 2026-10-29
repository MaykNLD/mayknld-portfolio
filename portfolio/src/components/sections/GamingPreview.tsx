import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Game } from '@/types'
import styles from './GamingPreview.module.css'

interface Props {
  items: Game[]
  locale: string
}

export default function GamingPreview({ items, locale }: Props) {
  const t = useTranslations('gaming')
  const tc = useTranslations('common')

  return (
    <section className="section" aria-labelledby="gaming-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title font-display" id="gaming-title">
            {t('title')}
          </h2>
          <p className="section-desc">{t('desc')}</p>
        </div>

        <div className={styles.grid}>
          {items.map(game => (
            <div key={game.id} className={`${styles.gameCard} card`}>
              {game.cover_url && (
                <div className={styles.cover}>
                  <Image
                    src={game.cover_url}
                    alt={game.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    draggable={false}
                  />
                  <div className={styles.coverOverlay} />
                </div>
              )}

              <div className={`card-body ${styles.body}`}>
                <div className={styles.badges}>
                  {game.has_active_server && (
                    <span className="badge badge-success">
                      <span className={styles.activeDot} aria-hidden />
                      {t('active_server')}
                    </span>
                  )}
                  {game.platform && (
                    <span className="badge badge-primary">{game.platform}</span>
                  )}
                </div>

                <h3 className={styles.gameName}>
                  {(locale === 'es' && game.name_es) ? game.name_es : game.name}
                </h3>

                {(locale === 'es' ? game.description_es : game.description_en) && (
                  <p className={styles.gameDesc}>
                    {locale === 'es' ? game.description_es : game.description_en}
                  </p>
                )}

                <div className={styles.actions}>
                  {game.discord_url && (
                    <a
                      href={game.discord_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      id={`game-discord-${game.id}`}
                    >
                      Discord ↗
                    </a>
                  )}
                  {game.game_id && (
                    <span className={styles.gameId}>
                      ID: <code>{game.game_id}</code>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Link href={`/${locale}/gaming`} className="btn btn-outline" id="gaming-view-all">
            {tc('view_all')} →
          </Link>
        </div>
      </div>
    </section>
  )
}

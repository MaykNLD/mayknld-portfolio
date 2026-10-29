import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import styles from './page.module.css'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'gaming' })
  return {
    title: t('title'),
    description: t('desc'),
  }
}

export default async function GamingPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'gaming' })
  const supabase = createClient()

  const { data: games } = await supabase
    .from('games')
    .select('*')
    .eq('is_published', true)
    .order('sort_order')

  const activeGames = games?.filter(g => g.has_active_server) ?? []
  const allGames = games ?? []

  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden />
      <div className="container">

        <div className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h1 className="section-title font-display">{t('title')}</h1>
          <p className="section-desc">{t('desc')}</p>
        </div>

        {/* Active servers highlight */}
        {activeGames.length > 0 && (
          <section className={styles.activeSection} aria-labelledby="active-title">
            <h2 className={styles.sectionTitle} id="active-title">
              <span className={styles.liveDot} aria-hidden /> {t('active_server')}
            </h2>
            <div className={styles.activeGrid}>
              {activeGames.map(game => (
                <div key={game.id} className={`${styles.activeCard} glass`}>
                  {game.cover_url && (
                    <div className={styles.activeCover}>
                      <Image
                        src={game.cover_url}
                        alt={game.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        draggable={false}
                      />
                      <div className={styles.coverOverlay} />
                    </div>
                  )}
                  <div className={styles.activeBody}>
                    <div className={styles.activeBadges}>
                      <span className="badge badge-success">
                        <span className={styles.pulseDot} aria-hidden />
                        {t('active_server')}
                      </span>
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
                    {game.server_info && (
                      <div className={styles.serverInfo}>
                        <span className={styles.infoLabel}>{t('server_info')}:</span>
                        <code className={styles.infoCode}>{game.server_info}</code>
                      </div>
                    )}
                    {game.game_id && (
                      <div className={styles.serverInfo}>
                        <span className={styles.infoLabel}>{t('game_id')}:</span>
                        <code className={styles.infoCode}>{game.game_id}</code>
                      </div>
                    )}
                    {game.discord_url && (
                      <a
                        href={game.discord_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        id={`game-discord-${game.id}`}
                      >
                        {t('join_discord')} ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All games catalog */}
        <section aria-labelledby="catalog-title">
          <h2 className={styles.sectionTitle} id="catalog-title">
            {locale === 'es' ? 'Catálogo de juegos' : 'Games catalog'}
          </h2>
          <div className={styles.catalog}>
            {allGames.map(game => (
              <div key={game.id} className={`${styles.catalogCard} card`}>
                {game.cover_url && (
                  <div className={styles.catalogCover}>
                    <Image
                      src={game.cover_url}
                      alt={game.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      draggable={false}
                    />
                    <div className={styles.coverOverlay} />
                  </div>
                )}
                <div className={`card-body ${styles.catalogBody}`}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {game.has_active_server && (
                      <span className="badge badge-success">
                        <span className={styles.pulseDot} aria-hidden />
                        Live
                      </span>
                    )}
                    {game.platform && (
                      <span className="badge badge-primary">{game.platform}</span>
                    )}
                    {game.uses_discord && (
                      <span className="badge badge-primary">Discord</span>
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
                  {game.game_id && (
                    <p className={styles.gameId}>
                      ID: <code>{game.game_id}</code>
                    </p>
                  )}
                  {game.discord_url && (
                    <a
                      href={game.discord_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      id={`catalog-discord-${game.id}`}
                    >
                      Discord ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

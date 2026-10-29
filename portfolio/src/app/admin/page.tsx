import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import styles from './page.module.css'

export default async function AdminDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  // Fetch counts in parallel
  const [illus, videos, webs, games, msgs] = await Promise.all([
    supabase.from('illustrations').select('id', { count: 'exact', head: true }),
    supabase.from('videos').select('id', { count: 'exact', head: true }),
    supabase.from('web_designs').select('id', { count: 'exact', head: true }),
    supabase.from('games').select('id', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
  ])

  const stats = [
    { label: 'Ilustraciones', count: illus.count ?? 0, href: '/admin/ilustraciones', icon: '🎨' },
    { label: 'Vídeos', count: videos.count ?? 0, href: '/admin/videos', icon: '🎬' },
    { label: 'Webs', count: webs.count ?? 0, href: '/admin/webs', icon: '🌐' },
    { label: 'Juegos', count: games.count ?? 0, href: '/admin/gaming', icon: '🎮' },
    { label: 'Mensajes no leídos', count: msgs.count ?? 0, href: '/admin/mensajes', icon: '📩', highlight: true },
  ]

  async function handleLogout() {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>Panel Admin</h1>
            <p className={styles.subtitle}>Bienvenido, {user.email}</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/" className="btn btn-ghost btn-sm" target="_blank">
              Ver web ↗
            </Link>
            <form action={handleLogout}>
              <button type="submit" className="btn btn-outline btn-sm" id="admin-logout-btn">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Stats grid */}
        <section aria-label="Resumen">
          <h2 className={styles.sectionTitle}>Resumen</h2>
          <div className={styles.statsGrid}>
            {stats.map(stat => (
              <Link
                key={stat.label}
                href={stat.href}
                className={`${styles.statCard} card ${stat.highlight && (stat.count > 0) ? styles.highlighted : ''}`}
              >
                <span className={styles.statIcon}>{stat.icon}</span>
                <div>
                  <p className={styles.statCount}>{stat.count}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section aria-label="Acciones rápidas">
          <h2 className={styles.sectionTitle}>Acciones rápidas</h2>
          <div className={styles.actionsGrid}>
            {[
              { label: 'Subir ilustración', href: '/admin/ilustraciones/nueva', icon: '🎨' },
              { label: 'Añadir vídeo', href: '/admin/videos/nuevo', icon: '🎬' },
              { label: 'Añadir web', href: '/admin/webs/nueva', icon: '🌐' },
              { label: 'Añadir juego', href: '/admin/gaming/nuevo', icon: '🎮' },
              { label: 'Ver mensajes', href: '/admin/mensajes', icon: '📩' },
            ].map(action => (
              <Link
                key={action.label}
                href={action.href}
                className={`${styles.actionCard} glass-subtle`}
              >
                <span className={styles.actionIcon}>{action.icon}</span>
                <span className={styles.actionLabel}>{action.label}</span>
                <span className={styles.actionArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

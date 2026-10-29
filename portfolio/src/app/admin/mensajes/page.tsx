import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import styles from './page.module.css'

export default async function MessagesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const admin = createAdminClient()
  const { data: messages } = await admin
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  async function markRead(id: string, read: boolean) {
    'use server'
    const admin = createAdminClient()
    await admin.from('contact_messages').update({ is_read: read }).eq('id', id)
  }

  async function markSpam(id: string) {
    'use server'
    const admin = createAdminClient()
    await admin.from('contact_messages').update({ is_spam: true, is_read: true }).eq('id', id)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <Link href="/admin" className={styles.back}>← Admin</Link>
            <h1 className={styles.title}>Mensajes de contacto</h1>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {!messages || messages.length === 0 ? (
          <p className={styles.empty}>No hay mensajes aún.</p>
        ) : (
          <div className={styles.list}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`${styles.msgCard} ${msg.is_spam ? styles.spam : ''} ${!msg.is_read ? styles.unread : ''}`}
              >
                <div className={styles.msgHeader}>
                  <div className={styles.msgMeta}>
                    <strong className={styles.msgName}>{msg.name}</strong>
                    <a href={`mailto:${msg.email}`} className={styles.msgEmail}>{msg.email}</a>
                    {msg.service_category && (
                      <span className="badge badge-primary">{msg.service_category}</span>
                    )}
                    {msg.is_spam && <span className="badge badge-warning">SPAM</span>}
                    {!msg.is_read && <span className={styles.unreadDot} aria-label="No leído" />}
                  </div>
                  <time className={styles.msgDate}>
                    {new Date(msg.created_at).toLocaleDateString('es-ES', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </time>
                </div>

                {msg.subject && (
                  <p className={styles.msgSubject}><strong>Asunto:</strong> {msg.subject}</p>
                )}

                <p className={styles.msgBody}>{msg.message}</p>

                <div className={styles.msgActions}>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Tu mensaje'}`}
                    className="btn btn-primary btn-sm"
                    id={`reply-${msg.id}`}
                  >
                    Responder ✉
                  </a>
                  <form action={markRead.bind(null, msg.id, !msg.is_read)}>
                    <button type="submit" className="btn btn-outline btn-sm">
                      {msg.is_read ? 'Marcar no leído' : 'Marcar leído'}
                    </button>
                  </form>
                  {!msg.is_spam && (
                    <form action={markSpam.bind(null, msg.id)}>
                      <button type="submit" className="btn btn-ghost btn-sm">
                        🚫 Spam
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setStatus('error')
      setErrorMsg('Credenciales incorrectas. Inténtalo de nuevo.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden />

      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>M</span>
          <span>aykNLD</span>
        </div>

        <h1 className={styles.title}>Panel Admin</h1>
        <p className={styles.subtitle}>Acceso restringido</p>

        <form onSubmit={handleLogin} className={styles.form} noValidate>
          <div className="form-group">
            <label htmlFor="admin-email" className="form-label">Email</label>
            <input
              id="admin-email"
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@mayknld.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password" className="form-label">Contraseña</label>
            <input
              id="admin-password"
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          {status === 'error' && (
            <p className={styles.error} role="alert">{errorMsg}</p>
          )}

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={status === 'loading'}
            id="admin-login-btn"
          >
            {status === 'loading' ? (
              <><span className={styles.spinner} aria-hidden /> Entrando...</>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const serviceOptions = [
    'illustration', 'web', 'logo', 'video', 'gaming', 'canva', 'other'
  ] as const

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    const data = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          service_category: data.get('service_category'),
          website: data.get('website'), // honeypot
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error')
      }

      setStatus('success')
      formRef.current?.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles.form}
      noValidate
      aria-label="Formulario de contacto"
    >
      {/* Honeypot – invisible to humans, bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', opacity: 0, height: 0, pointerEvents: 'none' }}
        aria-hidden
      />

      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">
            {t('name')} <span aria-hidden className={styles.required}>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Tu nombre"
            required
            maxLength={100}
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            {t('email')} <span aria-hidden className={styles.required}>*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="form-input"
            placeholder="email@ejemplo.com"
            required
            maxLength={200}
            autoComplete="email"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="contact-service" className="form-label">{t('service')}</label>
          <select id="contact-service" name="service_category" className="form-select">
            <option value="">— {t('service')} —</option>
            {serviceOptions.map(opt => (
              <option key={opt} value={opt}>
                {t(`service_options.${opt}` as Parameters<typeof t>[0])}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contact-subject" className="form-label">{t('subject')}</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            className="form-input"
            placeholder="Ej: Logo para mi tienda"
            maxLength={200}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          {t('message')} <span aria-hidden className={styles.required}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-textarea"
          placeholder={t('message')}
          required
          maxLength={5000}
          rows={6}
        />
      </div>

      <div className={styles.submitRow}>
        <button
          type="submit"
          className={`btn btn-primary btn-lg ${styles.submitBtn}`}
          disabled={status === 'sending'}
          id="contact-submit-btn"
        >
          {status === 'sending' ? (
            <><span className={styles.spinner} aria-hidden /> {t('sending')}</>
          ) : (
            t('submit')
          )}
        </button>

        {status === 'success' && (
          <p className={styles.successMsg} role="status">{t('success')}</p>
        )}
        {status === 'error' && (
          <p className={styles.errorMsg} role="alert">{t('error')}</p>
        )}
      </div>
    </form>
  )
}

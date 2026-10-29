import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/ui/ContactForm'
import styles from './page.module.css'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('title'),
    description: t('desc'),
  }
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden />

      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{t('label')}</span>
          <h1 className="section-title font-display">{t('title')}</h1>
          <p className="section-desc">{t('desc')}</p>
        </div>

        <div className={styles.grid}>
          {/* Form */}
          <div className={`${styles.formCard} glass`}>
            <ContactForm />
          </div>

          {/* Sidebar info */}
          <aside className={styles.sidebar}>
            <div className={`${styles.infoCard} glass-subtle`}>
              <h2 className={styles.infoTitle}>Fiverr</h2>
              <p className={styles.infoText}>
                {locale === 'es'
                  ? 'Encuéntrame en Fiverr para hacer el pedido directamente.'
                  : 'Find me on Fiverr to place an order directly.'}
              </p>
              <a
                href="https://www.fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="contact-page-fiverr"
              >
                {t('fiverr_cta')} ↗
              </a>
            </div>

            <div className={`${styles.infoCard} glass-subtle`}>
              <h2 className={styles.infoTitle}>
                {locale === 'es' ? 'Tiempo de respuesta' : 'Response time'}
              </h2>
              <p className={styles.infoText}>
                {locale === 'es'
                  ? 'Normalmente respondo en 24-48 horas. Comunico claro y entrego a tiempo.'
                  : 'I usually reply within 24-48 hours. I communicate clearly and deliver on time.'}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

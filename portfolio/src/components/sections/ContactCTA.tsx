import Link from 'next/link'
import { useTranslations } from 'next-intl'
import styles from './ContactCTA.module.css'

interface Props { locale: string }

export default function ContactCTA({ locale }: Props) {
  const t = useTranslations('contact')

  return (
    <section className={`section ${styles.section}`} aria-labelledby="cta-title">
      <div className="container">
        <div className={`${styles.card} glass`}>
          <div className={styles.orb} aria-hidden />
          <div className={styles.content}>
            <span className="section-label">{t('label')}</span>
            <h2 className={`section-title font-display ${styles.title}`} id="cta-title">
              {t('title')}
            </h2>
            <p className={styles.desc}>{t('desc')}</p>
            <div className={styles.actions}>
              <Link
                href={`/${locale}/contacto`}
                className="btn btn-primary btn-lg"
                id="cta-contact-btn"
              >
                {t('submit')} →
              </Link>
              <a
                href="https://www.fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
                id="cta-fiverr-btn"
              >
                {t('fiverr_cta')} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

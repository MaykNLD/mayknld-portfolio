import Link from 'next/link'
import { useTranslations } from 'next-intl'
import styles from './ServicesSection.module.css'

interface ServicesSectionProps {
  locale: string
}

const services = [
  { key: 'illustration', icon: '🎨', href: 'ilustraciones', color: '#a78bfa' },
  { key: 'web',          icon: '🌐', href: 'webs',          color: '#60a5fa' },
  { key: 'logo',         icon: '✏️', href: 'logos',         color: '#f472b6' },
  { key: 'video',        icon: '🎬', href: 'videos',        color: '#34d399' },
  { key: 'gaming',       icon: '🎮', href: 'gaming',        color: '#fbbf24' },
  { key: 'canva',        icon: '🖼️', href: 'ilustraciones', color: '#fb923c' },
]

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('services')

  return (
    <section className="section" id="servicios" aria-labelledby="services-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title font-display" id="services-title">
            {t('title')}
          </h2>
          <p className="section-desc">{t('desc')}</p>
        </div>

        <div className={styles.grid}>
          {services.map((svc, i) => (
            <Link
              key={svc.key}
              href={`/${locale}/${svc.href}`}
              className={`${styles.card} card`}
              id={`service-card-${svc.key}`}
              style={{ '--svc-color': svc.color } as React.CSSProperties}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{svc.icon}</span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{t(`${svc.key}.title` as any)}</h3>
                <p className={styles.desc}>{t(`${svc.key}.desc` as any)}</p>
              </div>
              <span className={styles.arrow} aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

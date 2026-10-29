import Link from 'next/link'
import { useTranslations } from 'next-intl'
import styles from './ServicesSection.module.css'

interface ServicesSectionProps {
  locale: string
}

const services = [
  { key: 'illustration', num: '01', href: 'ilustraciones', color: '#a882ff' },
  { key: 'web',          num: '02', href: 'webs',          color: '#60a5fa' },
  { key: 'logo',         num: '03', href: 'logos',         color: '#f472b6' },
  { key: 'video',        num: '04', href: 'videos',        color: '#34d399' },
  { key: 'gaming',       num: '05', href: 'gaming',        color: '#fbbf24' },
  { key: 'canva',        num: '06', href: 'ilustraciones', color: '#fb923c' },
]

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('services')

  return (
    <section className={`section ${styles.section}`} id="servicios" aria-labelledby="services-title">
      <div className="container">
        <div className={`section-header ${styles.header}`}>
          <span className="section-label">{t('label')}</span>
          <h2 className="section-title font-display" id="services-title">
            {t('title')}
          </h2>
          <p className="section-desc">{t('desc')}</p>
        </div>

        <div className={styles.grid}>
          {services.map((svc) => (
            <Link
              key={svc.key}
              href={`/${locale}/${svc.href}`}
              className={styles.card}
              id={`service-card-${svc.key}`}
              style={{ '--svc-color': svc.color } as React.CSSProperties}
            >
              <span className={styles.number}>{svc.num}</span>
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{t(`${svc.key}.title` as Parameters<typeof t>[0])}</h3>
                <p className={styles.desc}>{t(`${svc.key}.desc` as Parameters<typeof t>[0])}</p>
              </div>
              <span className={styles.arrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

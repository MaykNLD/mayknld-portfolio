'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  locale: string
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero')

  return (
    <section className={styles.hero} aria-label="Presentación" id="hero">
      {/* Background orbs */}
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />
      <div className={styles.orb3} aria-hidden />

      {/* Grid decoration */}
      <div className={styles.grid} aria-hidden />

      <div className={`container ${styles.content}`}>
        {/* Label */}
        <div className={`${styles.label} animate-fade-in`} aria-hidden>
          <span className={styles.dot} />
          {t('label')}
        </div>

        {/* Heading */}
        <h1 className={`${styles.title} animate-fade-in delay-1`}>
          <span className={styles.titleLine1}>{t('title_1')}</span>
          <span className={`${styles.titleLine2} text-gradient`}>{t('title_2')}</span>
        </h1>

        {/* Subtitle */}
        <p className={`${styles.subtitle} animate-fade-in delay-2`}>
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className={`${styles.ctas} animate-fade-in delay-3`}>
          <Link
            href={`/${locale}#servicios`}
            className="btn btn-primary btn-lg"
            id="hero-cta-services"
          >
            {t('cta_primary')}
          </Link>
          <Link
            href={`/${locale}/contacto`}
            className="btn btn-outline btn-lg"
            id="hero-cta-contact"
          >
            {t('cta_secondary')}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className={`${styles.scroll} animate-fade-in delay-5`} aria-hidden>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>scroll</span>
        </div>
      </div>

      {/* Floating service cards */}
      <div className={`${styles.floatingCards} animate-fade-in-right delay-3`} aria-hidden>
        {[
          { icon: '🎨', label: locale === 'es' ? 'Ilustración' : 'Illustration' },
          { icon: '🌐', label: locale === 'es' ? 'Diseño web' : 'Web design' },
          { icon: '✏️', label: 'Logo' },
          { icon: '🎬', label: locale === 'es' ? 'Vídeo' : 'Video' },
          { icon: '🎮', label: 'Gaming' },
        ].map((item, i) => (
          <div key={i} className={`${styles.floatingCard} glass`} style={{ animationDelay: `${i * 0.15}s` }}>
            <span className={styles.floatingIcon}>{item.icon}</span>
            <span className={styles.floatingLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

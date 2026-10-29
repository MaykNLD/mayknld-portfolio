'use client'

import Image from 'next/image'
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
      {/* Noise texture overlay */}
      <div className={styles.noise} aria-hidden />
      
      {/* Decorative elements */}
      <div className={styles.gridLines} aria-hidden />
      <div className={styles.glowOrb1} aria-hidden />
      <div className={styles.glowOrb2} aria-hidden />

      <div className={`container ${styles.layout}`}>
        {/* LEFT — Typography */}
        <div className={styles.textSide}>
          {/* Status badge */}
          <div className={`${styles.statusBadge} animate-fade-in`}>
            <span className={styles.statusDot} />
            {t('label')}
          </div>

          {/* Giant title */}
          <h1 className={`${styles.title} animate-fade-in delay-1`}>
            <span className={styles.titleSmall}>
              {locale === 'es' ? 'Portafolio de' : 'Portfolio by'}
            </span>
            <span className={styles.titleBig}>
              <span className={styles.titleM}>M</span>ayk
            </span>
            <span className={styles.titleOutline}>NLD</span>
          </h1>

          {/* Badges */}
          <div className={`${styles.badges} animate-fade-in delay-2`}>
            <span className={styles.badge}>
              {locale === 'es' ? 'Ilustradora Digital' : 'Digital Illustrator'}
            </span>
            <span className={styles.badge}>
              {locale === 'es' ? 'Diseñadora' : 'Designer'}
            </span>
          </div>

          {/* Subtitle */}
          <p className={`${styles.subtitle} animate-fade-in delay-3`}>
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className={`${styles.ctas} animate-fade-in delay-4`}>
            <Link
              href={`/${locale}#servicios`}
              className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}
              id="hero-cta-services"
            >
              {t('cta_primary')}
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link
              href={`/${locale}/contacto`}
              className="btn btn-outline btn-lg"
              id="hero-cta-contact"
            >
              {t('cta_secondary')}
            </Link>
          </div>

          {/* Scroll */}
          <div className={`${styles.scrollHint} animate-fade-in delay-6`} aria-hidden>
            <div className={styles.scrollLine} />
            <span className={styles.scrollText}>scroll</span>
          </div>
        </div>

        {/* RIGHT — Avatar + art showcase */}
        <div className={`${styles.visualSide} animate-fade-in-scale delay-2`}>
          {/* Main avatar */}
          <div className={styles.avatarFrame}>
            <Image
              src="/images/hero/avatar.jpeg"
              alt="MaykNLD — Digital Illustrator avatar"
              width={480}
              height={480}
              className={styles.avatarImg}
              priority
            />
            <div className={styles.avatarGlow} aria-hidden />
          </div>

          {/* Mini showcase cards */}
          <div className={styles.showcase}>
            <div className={`${styles.miniCard} animate-fade-in delay-4`}>
              <Image
                src="/images/gallery/manga-panel.jpeg"
                alt="Manga panel art"
                width={80}
                height={80}
                className={styles.miniImg}
              />
            </div>
            <div className={`${styles.miniCard} animate-fade-in delay-5`}>
              <Image
                src="/images/gallery/dark-warrior.jpeg"
                alt="Dark warrior illustration"
                width={80}
                height={80}
                className={styles.miniImg}
              />
            </div>
            <div className={`${styles.miniCard} animate-fade-in delay-6`}>
              <Image
                src="/images/gallery/horus-dog.jpeg"
                alt="Dog illustration"
                width={80}
                height={80}
                className={styles.miniImg}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

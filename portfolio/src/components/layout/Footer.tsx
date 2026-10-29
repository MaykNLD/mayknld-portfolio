import Link from 'next/link'
import { useTranslations } from 'next-intl'
import styles from './Footer.module.css'

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const year = new Date().getFullYear()

  const links = [
    { key: 'illustrations', href: `/${locale}/ilustraciones` },
    { key: 'webs', href: `/${locale}/webs` },
    { key: 'logos', href: `/${locale}/logos` },
    { key: 'videos', href: `/${locale}/videos` },
    { key: 'gaming', href: `/${locale}/gaming` },
    { key: 'contact', href: `/${locale}/contacto` },
  ]

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href={`/${locale}`} className={styles.logo}>
            <span className={styles.logoMark}>M</span>
            <span>aykNLD</span>
          </Link>
          <p className={styles.tagline}>{t('tagline')}</p>
          <div className={styles.social}>
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Fiverr"
              id="footer-fiverr"
            >
              Fiverr
            </a>
          </div>
        </div>

        {/* Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          <span className={styles.linksTitle}>{t('links')}</span>
          {links.map(item => (
            <Link key={item.key} href={item.href} className={styles.link}>
              {tn(item.key as Parameters<typeof tn>[0])}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.rights}>
            © {year} MaykNLD · {t('rights')}
          </p>
          <p className={styles.made}>
            Made with <span aria-hidden>♥</span> by MaykNLD
          </p>
        </div>
      </div>
    </footer>
  )
}

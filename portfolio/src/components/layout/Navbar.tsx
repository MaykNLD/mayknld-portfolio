'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

interface NavbarProps {
  locale: string
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setIsMobileOpen(false), [pathname])

  const navItems = [
    { key: 'illustrations', href: `/${locale}/ilustraciones` },
    { key: 'webs', href: `/${locale}/webs` },
    { key: 'logos', href: `/${locale}/logos` },
    { key: 'videos', href: `/${locale}/videos` },
    { key: 'gaming', href: `/${locale}/gaming` },
    { key: 'contact', href: `/${locale}/contacto` },
  ]

  const switchLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es'
    // Swap locale prefix in pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href={`/${locale}`} className={styles.logo} aria-label="MaykNLD – Inicio">
          <span className={styles.logoMark}>M</span>
          <span className={styles.logoText}>aykNLD</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navItems.map(item => (
            <Link
              key={item.key}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {t(item.key as Parameters<typeof t>[0])}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.langBtn}
            onClick={switchLocale}
            aria-label={`Switch to ${locale === 'es' ? 'English' : 'Español'}`}
            id="lang-switch-btn"
          >
            {tc('lang_switch')}
          </button>

          <Link
            href={`/${locale}/contacto`}
            className="btn btn-primary btn-sm hide-mobile"
            id="nav-contact-btn"
          >
            {t('contact')}
          </Link>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${isMobileOpen ? styles.open : ''}`}
            onClick={() => setIsMobileOpen(prev => !prev)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            id="mobile-menu-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!isMobileOpen}
        id="mobile-nav"
      >
        <nav aria-label="Menú móvil">
          {navItems.map(item => (
            <Link
              key={item.key}
              href={item.href}
              className={`${styles.mobileLink} ${isActive(item.href) ? styles.mobileActive : ''}`}
            >
              {t(item.key as Parameters<typeof t>[0])}
            </Link>
          ))}
          <div className={styles.mobileDivider} />
          <Link
            href={`/${locale}/contacto`}
            className={`btn btn-primary ${styles.mobileContact}`}
          >
            {t('contact')}
          </Link>
        </nav>
      </div>
    </header>
  )
}

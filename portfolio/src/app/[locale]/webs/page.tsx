import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import WebPreviewCard from '@/components/ui/WebPreviewCard'
import styles from './page.module.css'

export async function generateMetadata({
  params: { locale },
}: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'webs' })
  return { title: t('title'), description: t('desc') }
}

export default async function WebsPage({
  params: { locale },
}: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'webs' })
  const supabase = createClient()
  const { data: items } = await supabase
    .from('web_designs')
    .select('*')
    .eq('is_published', true)
    .order('sort_order')

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
          {(items ?? []).map(item => (
            <WebPreviewCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  )
}

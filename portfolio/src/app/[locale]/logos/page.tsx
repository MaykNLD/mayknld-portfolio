import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import IllustrationGallery from '@/components/ui/IllustrationGallery'
import styles from '../ilustraciones/page.module.css'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'es' ? 'Logos · MaykNLD' : 'Logos · MaykNLD', description: locale === 'es' ? 'Logos personalizados con mi estilo único.' : 'Custom logos with my unique style.' }
}

export default async function LogosPage({ params: { locale } }: { params: { locale: string } }) {
  const supabase = createClient()
  const { data: items } = await supabase.from('illustrations').select('*').eq('is_published', true).eq('category', 'logo').order('sort_order')
  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden />
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{locale === 'es' ? 'Identidad visual' : 'Visual identity'}</span>
          <h1 className="section-title font-display">Logos</h1>
          <p className="section-desc">{locale === 'es' ? 'Logos originales y memorables diseñados con tu marca en mente.' : 'Original and memorable logos designed with your brand in mind.'}</p>
        </div>
        <IllustrationGallery items={items ?? []} locale={locale} />
      </div>
    </div>
  )
}

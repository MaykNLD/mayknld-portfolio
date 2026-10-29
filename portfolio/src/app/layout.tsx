import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'MaykNLD – Ilustración digital, diseño web & gaming',
    template: '%s | MaykNLD',
  },
  description:
    'Freelancer digital: ilustraciones, logos, diseño web, edición de vídeo y comunidad gaming. Calidad, comunicación clara y entrega a tiempo.',
  keywords: [
    'ilustración digital', 'diseño web', 'logos personalizados', 'edición vídeo',
    'reels', 'gaming', 'Minecraft', 'Mobile Legends', 'freelancer', 'MaykNLD',
    'stickers personalizados', 'diseño Canva',
  ],
  authors: [{ name: 'MaykNLD' }],
  creator: 'MaykNLD',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    siteName: 'MaykNLD Portfolio',
    title: 'MaykNLD – Ilustración digital, diseño web & gaming',
    description: 'Arte digital, webs, logos, vídeos y comunidad gaming. Todo con tu estilo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaykNLD – Freelancer digital',
    description: 'Arte digital, webs, logos, vídeos y comunidad gaming.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

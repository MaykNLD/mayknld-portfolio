/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://supabase.co",
              "media-src 'self' https://*.supabase.co https://www.youtube.com https://www.instagram.com",
              "frame-src 'self' https://www.youtube.com https://www.instagram.com https://player.vimeo.com",
              "connect-src 'self' https://*.supabase.co https://supabase.co wss://*.supabase.co",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Disable right-click save on served images (handled via API watermark)
    formats: ['image/webp'],
  },

  // Redirect www to non-www (adjust for your domain)
  async redirects() {
    return []
  },
}

module.exports = withNextIntl(nextConfig)

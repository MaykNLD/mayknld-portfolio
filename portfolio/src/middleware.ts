import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import createIntlMiddleware from 'next-intl/middleware'

const locales = ['es', 'en'] as const
const defaultLocale = 'es'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // /es/... or / for default
})

const adminRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Security headers ──────────────────────────────────────
  const response = NextResponse.next()

  // Block known bad bots / scrapers via User-Agent
  const ua = request.headers.get('user-agent') || ''
  const badBots = ['scrapy', 'semrushbot', 'ahrefsbot', 'dotbot', 'majestic']
  if (badBots.some(bot => ua.toLowerCase().includes(bot))) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ── Admin route protection ────────────────────────────────
  const isAdminRoute = adminRoutes.some(r => pathname.startsWith(r))

  if (isAdminRoute) {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    return supabaseResponse
  }

  // ── i18n routing ──────────────────────────────────────────
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf)).*)',
  ],
}

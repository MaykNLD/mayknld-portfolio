import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// ── In-memory rate limiter (resets on cold start) ─────────
// For production: use Upstash Redis or Vercel KV
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string, limit = 3, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false
  entry.count++
  return true
}

// ── Honeypot check ────────────────────────────────────────
// The form has a hidden field "website" that bots fill
function isBot(body: Record<string, string>): boolean {
  return !!body.website // humans leave this empty
}

export async function POST(request: NextRequest) {
  try {
    // Get real IP (Vercel sets x-forwarded-for)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Check blocked IPs
    const supabase = createAdminClient()
    const { data: blocked } = await supabase
      .from('blocked_ips')
      .select('id')
      .eq('ip_address', ip)
      .maybeSingle()

    if (blocked) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Rate limiting: max 3 messages per minute per IP
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot
    if (isBot(body)) {
      // Silently succeed to not reveal detection to bots
      return NextResponse.json({ success: true })
    }

    // Validate required fields
    const { name, email, message, subject, service_category } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Length limits (prevent huge payloads)
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Field too long' }, { status: 400 })
    }

    // Sanitize (basic — strip HTML tags)
    const sanitize = (str: string) => str.replace(/<[^>]*>/g, '').trim()

    const { error } = await supabase.from('contact_messages').insert({
      name: sanitize(name),
      email: sanitize(email),
      subject: subject ? sanitize(subject).slice(0, 200) : null,
      message: sanitize(message),
      service_category: service_category || null,
      ip_address: ip,
      user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Disallow GET on this endpoint
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

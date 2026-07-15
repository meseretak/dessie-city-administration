import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

    // Use count directly instead of groupBy/distinct (not supported in custom proxy)
    const [total, today, live, week, month] = await Promise.all([
      db.siteVisit.count({}),
      db.siteVisit.count({ where: { createdAt: { gte: startOfDay } } }),
      db.siteVisit.count({ where: { createdAt: { gte: fiveMinAgo } } }),
      db.siteVisit.count({ where: { createdAt: { gte: weekAgo } } }),
      db.siteVisit.count({ where: { createdAt: { gte: monthAgo } } }),
    ])

    return NextResponse.json({ total, today, live, week, month })
  } catch (error) {
    console.error('Visitor count error:', error)
    return NextResponse.json({ total: 0, today: 0, live: 0, week: 0, month: 0 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const page = body?.page || '/'
    const headers = req.headers
    const ip = headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
    const userAgent = headers.get('user-agent') || ''
    const referrer = headers.get('referer') || ''
    const today = new Date().toISOString().split('T')[0]
    const sessionId = `${ip}-${today}-${Math.random().toString(36).slice(2, 6)}`

    await db.siteVisit.create({
      data: {
        sessionId,
        page: page.substring(0, 100),
        ip: ip.substring(0, 45),
        userAgent: userAgent.substring(0, 200),
        referrer: referrer.substring(0, 300),
      },
    })
    return NextResponse.json({ tracked: true })
  } catch (error) {
    console.error('Visitor track error:', error)
    return NextResponse.json({ tracked: false })
  }
}

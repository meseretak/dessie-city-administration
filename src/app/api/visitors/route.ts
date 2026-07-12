import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// GET /api/visitors — return today's visitors, total visitors, and live count
export async function GET() {
  try {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

    // Total all-time visitors (unique sessions)
    const totalResult = await db.siteVisit.groupBy({
      by: ['sessionId'],
    })
    const totalVisitors = totalResult.length

    // Today's visitors (unique sessions today)
    const todayResult = await db.siteVisit.findMany({
      where: { createdAt: { gte: startOfDay } },
      select: { sessionId: true },
      distinct: ['sessionId'],
    })
    const todayVisitors = todayResult.length

    // Live visitors in last 5 minutes
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const liveResult = await db.siteVisit.findMany({
      where: { createdAt: { gte: fiveMinAgo } },
      select: { sessionId: true },
      distinct: ['sessionId'],
    })
    const liveVisitors = liveResult.length

    // This week
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const weekResult = await db.siteVisit.findMany({
      where: { createdAt: { gte: weekAgo } },
      select: { sessionId: true },
      distinct: ['sessionId'],
    })
    const weekVisitors = weekResult.length

    // This month
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const monthResult = await db.siteVisit.findMany({
      where: { createdAt: { gte: monthAgo } },
      select: { sessionId: true },
      distinct: ['sessionId'],
    })
    const monthVisitors = monthResult.length

    return NextResponse.json({
      total: totalVisitors,
      today: todayVisitors,
      live: liveVisitors,
      week: weekVisitors,
      month: monthVisitors,
    })
  } catch (error) {
    console.error('Visitor count error:', error)
    return NextResponse.json({ total: 0, today: 0, live: 0, week: 0, month: 0 })
  }
}

// POST /api/visitors — track a visit
export async function POST(req: Request) {
  try {
    const { page } = await req.json()

    const headers = req.headers
    const ip = headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || ''
    const userAgent = headers.get('user-agent') || ''
    const referrer = headers.get('referer') || ''

    // Create a simple session ID from IP + date (one visit per IP per day)
    const today = new Date().toISOString().split('T')[0]
    const sessionId = `${ip}-${today}`

    await db.siteVisit.create({
      data: {
        sessionId,
        page: page || '/',
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
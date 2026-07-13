import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const hasTursoUrl = !!process.env.TURSO_DATABASE_URL
    const hasTursoToken = !!process.env.TURSO_AUTH_TOKEN
    const tursoUrl = process.env.TURSO_DATABASE_URL?.trim().substring(0, 40) + '...'

    // Test DB connection
    let dbStatus = 'unknown'
    let adminCount = 0
    let vacancyCount = 0
    try {
      adminCount = await db.adminUser.count()
      vacancyCount = await db.vacancy.count()
      dbStatus = 'connected'
    } catch (e: any) {
      dbStatus = 'error: ' + e.message
    }

    return NextResponse.json({
      status: 'ok',
      env: {
        hasTursoUrl,
        hasTursoToken,
        tursoUrl: hasTursoUrl ? tursoUrl : 'NOT SET',
        nodeEnv: process.env.NODE_ENV,
      },
      db: {
        status: dbStatus,
        adminCount,
        vacancyCount,
      }
    })
  } catch (e: any) {
    return NextResponse.json({ status: 'error', message: e.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

export async function GET() {
  const tursoUrl = (process.env.TURSO_DATABASE_URL ?? '').trim()
  const tursoToken = (process.env.TURSO_AUTH_TOKEN ?? '').trim()

  let directTest = 'not tried'
  let dbTest = 'not tried'
  let adminCount = 0
  let vacancyCount = 0

  // Test 1: Direct HTTP to Turso
  try {
    const httpUrl = tursoUrl.replace('libsql://', 'https://')
    const res = await fetch(`${httpUrl}/v2/pipeline`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tursoToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT COUNT(*) as c FROM AdminUser', args: [] } },
          { type: 'execute', stmt: { sql: 'SELECT COUNT(*) as c FROM Vacancy', args: [] } },
          { type: 'close' }
        ]
      })
    })
    const data = await res.json()
    adminCount = parseInt(data.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value ?? 0)
    vacancyCount = parseInt(data.results?.[1]?.response?.result?.rows?.[0]?.[0]?.value ?? 0)
    directTest = `OK - ${adminCount} admins, ${vacancyCount} vacancies`
  } catch (e: any) {
    directTest = `ERROR: ${e.message}`
  }

  // Test 2: db proxy
  try {
    const { db } = await import('@/lib/db')
    const count = await (db as any).adminUser.count()
    dbTest = `OK - count=${count}`
  } catch (e: any) {
    dbTest = `ERROR: ${e.message?.substring(0, 100)}`
  }

  return NextResponse.json({
    env: {
      hasTursoUrl: !!tursoUrl,
      hasTursoToken: !!tursoToken,
      tursoUrl: tursoUrl.substring(0, 50),
      nodeEnv: process.env.NODE_ENV,
    },
    directHttp: directTest,
    dbProxy: dbTest,
    adminCount,
    vacancyCount,
  })
}

import { NextResponse } from 'next/server'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN
  const dbUrl = process.env.DATABASE_URL

  let libsqlTest = 'not tried'
  let adapterTest = 'not tried'
  let prismaTest = 'not tried'
  let adminCount = 0

  // Test 1: Can we import @libsql/client?
  try {
    const { createClient } = require('@libsql/client')
    libsqlTest = 'import ok'

    // Test 2: Can we create a client?
    const url = (tursoUrl ?? '').trim()
    const token = (tursoToken ?? '').trim()

    if (url && token) {
      const client = createClient({ url, authToken: token })
      // Test 3: Can we query?
      const result = await client.execute('SELECT COUNT(*) as count FROM AdminUser')
      adminCount = Number(result.rows[0][0])
      libsqlTest = `connected, adminCount=${adminCount}`
      await client.close()
    } else {
      libsqlTest = `url empty=${!url}, token empty=${!token}`
    }
  } catch (e: any) {
    libsqlTest = `error: ${e.message}`
  }

  // Test 4: Prisma adapter
  try {
    const { PrismaLibSQL } = require('@prisma/adapter-libsql')
    adapterTest = 'import ok'
    const { createClient } = require('@libsql/client')
    const url = (tursoUrl ?? '').trim()
    const token = (tursoToken ?? '').trim()
    if (url && token) {
      const libsql = createClient({ url, authToken: token })
      const adapter = new PrismaLibSQL(libsql)
      adapterTest = `adapter created: ${typeof adapter}`
    }
  } catch (e: any) {
    adapterTest = `error: ${e.message}`
  }

  // Test 5: Prisma client
  try {
    const { db } = await import('@/lib/db')
    adminCount = await db.adminUser.count()
    prismaTest = `ok, adminCount=${adminCount}`
  } catch (e: any) {
    prismaTest = `error: ${e.message?.substring(0, 100)}`
  }

  return NextResponse.json({
    env: {
      tursoUrl: tursoUrl ? tursoUrl.trim().substring(0, 50) + '...' : 'MISSING',
      tursoToken: tursoToken ? 'SET (' + tursoToken.trim().length + ' chars)' : 'MISSING',
      dbUrl: dbUrl ?? 'MISSING',
      nodeEnv: process.env.NODE_ENV,
    },
    tests: {
      libsqlClient: libsqlTest,
      prismaAdapter: adapterTest,
      prismaClient: prismaTest,
    },
    adminCount,
  })
}

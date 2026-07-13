import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function buildDatabaseUrl(): string {
  const tursoUrl = (process.env.TURSO_DATABASE_URL ?? '').trim()
  const tursoToken = (process.env.TURSO_AUTH_TOKEN ?? '').trim()

  if (tursoUrl.startsWith('libsql://') && tursoToken) {
    // Build libsql URL with embedded auth token
    const url = new URL(tursoUrl)
    url.searchParams.set('authToken', tursoToken)
    return url.toString()
  }

  return process.env.DATABASE_URL ?? 'file:./db/custom.db'
}

function createPrismaClient(): PrismaClient {
  const dbUrl = buildDatabaseUrl()
  console.log('[db] Connecting to:', dbUrl.substring(0, 60))

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createClient } = require('@libsql/client')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaLibSQL } = require('@prisma/adapter-libsql')

    const tursoUrl = (process.env.TURSO_DATABASE_URL ?? '').trim()
    const tursoToken = (process.env.TURSO_AUTH_TOKEN ?? '').trim()

    if (tursoUrl && tursoToken) {
      const libsql = createClient({ url: tursoUrl, authToken: tursoToken })
      const adapter = new PrismaLibSQL(libsql)
      return new PrismaClient({ adapter } as any)
    }
  } catch (e) {
    console.error('[db] LibSQL adapter error:', e)
  }

  return new PrismaClient({ log: ['error'] })
}

export const db: PrismaClient = global.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db
}

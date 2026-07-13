import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  // In production with Turso, use libsql adapter
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    try {
      // Trim any whitespace/newlines from env vars
      const url = process.env.TURSO_DATABASE_URL.trim()
      const token = process.env.TURSO_AUTH_TOKEN.trim()

      // Dynamic import to avoid build-time issues
      const { createClient } = require('@libsql/client')
      const { PrismaLibSQL } = require('@prisma/adapter-libsql')

      const libsql = createClient({ url, authToken: token })
      const adapter = new PrismaLibSQL(libsql)
      return new PrismaClient({ adapter } as any)
    } catch (e) {
      console.error('Failed to create Turso client, falling back to SQLite:', e)
    }
  }

  // Local development or fallback
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : [],
  })
}

export const db: PrismaClient = global.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db
}

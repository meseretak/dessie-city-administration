import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const tursoUrl = (process.env.TURSO_DATABASE_URL || '').trim()
  const tursoToken = (process.env.TURSO_AUTH_TOKEN || '').trim()

  if (tursoUrl && tursoToken && tursoUrl.startsWith('libsql://')) {
    const libsql = createClient({ url: tursoUrl, authToken: tursoToken })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter } as any)
  }

  // Fallback for local dev
  return new PrismaClient({
    log: ['error'],
  })
}

export const db: PrismaClient = global.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db
}

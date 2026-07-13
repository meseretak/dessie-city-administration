import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const tursoUrl = (process.env.TURSO_DATABASE_URL ?? '').trim()
  const tursoToken = (process.env.TURSO_AUTH_TOKEN ?? '').trim()

  // Only use Turso if both vars are properly set
  if (tursoUrl && tursoToken && tursoUrl.startsWith('libsql://')) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const libsqlClient = require('@libsql/client')
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const prismaLibsql = require('@prisma/adapter-libsql')

      const client = libsqlClient.createClient({
        url: tursoUrl,
        authToken: tursoToken,
      })
      const adapter = new prismaLibsql.PrismaLibSQL(client)
      return new PrismaClient({ adapter } as any)
    } catch (e) {
      console.error('[db] Turso connection failed:', e)
    }
  }

  // Fallback — used during build time static generation
  return new PrismaClient({ log: [] })
}

export const db: PrismaClient =
  global.prisma ??
  (() => {
    const client = createPrismaClient()
    if (process.env.NODE_ENV !== 'production') global.prisma = client
    return client
  })()

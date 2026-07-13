/**
 * Database client — uses Turso HTTP API in production, Prisma SQLite locally
 */
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const tursoUrl = (process.env.TURSO_DATABASE_URL ?? '').trim()
const tursoToken = (process.env.TURSO_AUTH_TOKEN ?? '').trim()
const isProduction = !!(tursoUrl && tursoToken && tursoUrl.startsWith('libsql://'))

// ── Turso HTTP client ──────────────────────────────────────────────
async function tursoQuery(sql: string, args: unknown[] = []) {
  const httpUrl = tursoUrl.replace('libsql://', 'https://')
  const res = await fetch(`${httpUrl}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tursoToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          type: 'execute',
          stmt: {
            sql,
            args: args.map((a) =>
              a === null || a === undefined
                ? { type: 'null' }
                : { type: 'text', value: String(a) }
            ),
          },
        },
        { type: 'close' },
      ],
    }),
  })
  const data = await res.json()
  if (data.results?.[0]?.type === 'error') {
    throw new Error(data.results[0].error.message)
  }
  return data.results?.[0]?.response?.result
}

function mapRows(result: any): Record<string, unknown>[] {
  if (!result?.rows || !result?.cols) return []
  return result.rows.map((row: any[]) => {
    const obj: Record<string, unknown> = {}
    result.cols.forEach((col: any, i: number) => {
      obj[col.name] = row[i]?.value ?? null
    })
    return obj
  })
}

// ── Prisma (local dev only) ────────────────────────────────────────
function createLocalPrisma() {
  return new PrismaClient({ log: [] })
}

export const db: PrismaClient = (() => {
  if (!isProduction) {
    return global.prisma ?? (() => {
      const p = createLocalPrisma()
      if (process.env.NODE_ENV !== 'production') global.prisma = p
      return p
    })()
  }
  // In production return a proxy that routes all calls to Turso HTTP
  return createTursoProxy()
})()

function createTursoProxy(): PrismaClient {
  const handler = {
    get(_: unknown, model: string) {
      return createModelProxy(model)
    },
  }
  return new Proxy({} as PrismaClient, handler)
}

function createModelProxy(model: string) {
  const table = modelToTable(model)
  return {
    async findMany(args?: any) {
      const { where, orderBy, take, select, skip } = args || {}
      let sql = `SELECT ${buildSelect(select)} FROM "${table}"`
      const params: unknown[] = []
      if (where) {
        const { clause, values } = buildWhere(where)
        if (clause) { sql += ` WHERE ${clause}`; params.push(...values) }
      }
      if (orderBy) sql += ` ORDER BY ${buildOrderBy(orderBy)}`
      if (take) sql += ` LIMIT ${take}`
      if (skip) sql += ` OFFSET ${skip}`
      const result = await tursoQuery(sql, params)
      return mapRows(result)
    },
    async findUnique(args: any) {
      const { where, select } = args
      let sql = `SELECT ${buildSelect(select)} FROM "${table}"`
      const { clause, values } = buildWhere(where)
      if (clause) sql += ` WHERE ${clause}`
      sql += ' LIMIT 1'
      const result = await tursoQuery(sql, values)
      const rows = mapRows(result)
      return rows[0] ?? null
    },
    async findFirst(args?: any) {
      const { where, orderBy, select } = args || {}
      let sql = `SELECT ${buildSelect(select)} FROM "${table}"`
      const params: unknown[] = []
      if (where) {
        const { clause, values } = buildWhere(where)
        if (clause) { sql += ` WHERE ${clause}`; params.push(...values) }
      }
      if (orderBy) sql += ` ORDER BY ${buildOrderBy(orderBy)}`
      sql += ' LIMIT 1'
      const result = await tursoQuery(sql, params)
      const rows = mapRows(result)
      return rows[0] ?? null
    },
    async count(args?: any) {
      const { where } = args || {}
      let sql = `SELECT COUNT(*) as cnt FROM "${table}"`
      const params: unknown[] = []
      if (where) {
        const { clause, values } = buildWhere(where)
        if (clause) { sql += ` WHERE ${clause}`; params.push(...values) }
      }
      const result = await tursoQuery(sql, params)
      const rows = mapRows(result)
      return parseInt(String(rows[0]?.cnt ?? 0))
    },
    async create(args: any) {
      const { data } = args
      const keys = Object.keys(data).filter(k => data[k] !== undefined)
      const cols = keys.map(k => `"${k}"`).join(', ')
      const placeholders = keys.map(() => '?').join(', ')
      const values = keys.map(k => data[k])
      const sql = `INSERT INTO "${table}" (${cols}) VALUES (${placeholders})`
      await tursoQuery(sql, values)
      return { ...data }
    },
    async createMany(args: any) {
      const { data } = args
      const items = Array.isArray(data) ? data : [data]
      let count = 0
      for (const item of items) {
        const keys = Object.keys(item).filter(k => item[k] !== undefined)
        const cols = keys.map(k => `"${k}"`).join(', ')
        const placeholders = keys.map(() => '?').join(', ')
        const values = keys.map(k => item[k])
        await tursoQuery(`INSERT INTO "${table}" (${cols}) VALUES (${placeholders})`, values)
        count++
      }
      return { count }
    },
    async update(args: any) {
      const { where, data } = args
      const keys = Object.keys(data).filter(k => data[k] !== undefined)
      const set = keys.map(k => `"${k}" = ?`).join(', ')
      const values = keys.map(k => data[k])
      const { clause, values: whereVals } = buildWhere(where)
      const sql = `UPDATE "${table}" SET ${set} WHERE ${clause}`
      await tursoQuery(sql, [...values, ...whereVals])
      const updated = await (createModelProxy(model) as any).findFirst({ where })
      return updated ?? {}
    },
    async updateMany(args: any) {
      const { where, data } = args
      const keys = Object.keys(data).filter(k => data[k] !== undefined)
      const set = keys.map(k => `"${k}" = ?`).join(', ')
      const values = keys.map(k => data[k])
      let sql = `UPDATE "${table}" SET ${set}`
      const params = [...values]
      if (where) {
        const { clause, values: whereVals } = buildWhere(where)
        if (clause) { sql += ` WHERE ${clause}`; params.push(...whereVals) }
      }
      await tursoQuery(sql, params)
      return { count: 1 }
    },
    async delete(args: any) {
      const { where } = args
      const { clause, values } = buildWhere(where)
      await tursoQuery(`DELETE FROM "${table}" WHERE ${clause}`, values)
      return {}
    },
    async deleteMany(args?: any) {
      const { where } = args || {}
      let sql = `DELETE FROM "${table}"`
      const params: unknown[] = []
      if (where) {
        const { clause, values } = buildWhere(where)
        if (clause) { sql += ` WHERE ${clause}`; params.push(...values) }
      }
      await tursoQuery(sql, params)
      return { count: 1 }
    },
    async upsert(args: any) {
      const { where, create, update } = args
      const existing = await (createModelProxy(model) as any).findFirst({ where })
      if (existing) {
        return (createModelProxy(model) as any).update({ where, data: update })
      }
      return (createModelProxy(model) as any).create({ data: create })
    },
  }
}

// ── Helpers ────────────────────────────────────────────────────────
function modelToTable(model: string): string {
  const map: Record<string, string> = {
    adminUser: 'AdminUser', auditLog: 'AuditLog', user: 'User',
    serviceRequest: 'ServiceRequest', newsletterSubscription: 'NewsletterSubscription',
    contactMessage: 'ContactMessage', quoteRequest: 'QuoteRequest',
    hotel: 'Hotel', newsArticle: 'NewsArticle', vacancy: 'Vacancy',
    bid: 'Bid', project: 'Project', announcement: 'Announcement',
    pageContent: 'PageContent', menuItem: 'MenuItem', sliderImage: 'SliderImage',
    cabinetMember: 'CabinetMember', siteSetting: 'SiteSetting', siteVisit: 'SiteVisit',
  }
  return map[model] ?? model
}

function buildSelect(select?: Record<string, boolean>): string {
  if (!select) return '*'
  const cols = Object.entries(select).filter(([, v]) => v).map(([k]) => `"${k}"`)
  return cols.length ? cols.join(', ') : '*'
}

function buildWhere(where: Record<string, unknown>): { clause: string; values: unknown[] } {
  const parts: string[] = []
  const values: unknown[] = []
  for (const [key, val] of Object.entries(where)) {
    if (key === 'AND' || key === 'OR') continue
    if (val === null) { parts.push(`"${key}" IS NULL`); continue }
    if (typeof val === 'object' && val !== null) {
      const op = val as Record<string, unknown>
      if ('equals' in op) { parts.push(`"${key}" = ?`); values.push(op.equals) }
      else if ('contains' in op) { parts.push(`"${key}" LIKE ?`); values.push(`%${op.contains}%`) }
      else if ('startsWith' in op) { parts.push(`"${key}" LIKE ?`); values.push(`${op.startsWith}%`) }
      else if ('in' in op && Array.isArray(op.in)) {
        parts.push(`"${key}" IN (${op.in.map(() => '?').join(',')})`)
        values.push(...op.in)
      }
      else if ('not' in op) { parts.push(`"${key}" != ?`); values.push(op.not) }
      else if ('gt' in op) { parts.push(`"${key}" > ?`); values.push(op.gt) }
      else if ('gte' in op) { parts.push(`"${key}" >= ?`); values.push(op.gte) }
      else if ('lt' in op) { parts.push(`"${key}" < ?`); values.push(op.lt) }
      else if ('lte' in op) { parts.push(`"${key}" <= ?`); values.push(op.lte) }
    } else {
      parts.push(`"${key}" = ?`)
      values.push(val)
    }
  }
  return { clause: parts.join(' AND '), values }
}

function buildOrderBy(orderBy: Record<string, string> | Record<string, string>[]): string {
  const orders = Array.isArray(orderBy) ? orderBy : [orderBy]
  return orders.map(o => {
    const [key, dir] = Object.entries(o)[0]
    return `"${key}" ${dir === 'desc' ? 'DESC' : 'ASC'}`
  }).join(', ')
}

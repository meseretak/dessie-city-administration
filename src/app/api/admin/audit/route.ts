export const dynamic = 'force-dynamic';
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_SESSION = 'dessie_admin_session'

async function getAdminUser(req?: NextRequest) {
  // First try headers (for client-side auth)
  if (req) {
    const adminId = req.headers.get('x-admin-id')
    if (adminId) {
      const admin = await db.adminUser.findUnique({ where: { id: adminId } })
      if (admin && admin.active) return admin
    }
  }
  // Fallback to cookie auth
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION)?.value
  if (!session) return null
  try {
    const user = JSON.parse(session)
    const admin = await db.adminUser.findUnique({ where: { id: user.id } })
    return admin
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          admin: { select: { name: true, username: true } },
        },
      }),
      db.auditLog.count(),
    ])

    return NextResponse.json({ logs, total })
  } catch (error) {
    console.error('Audit log error:', error)
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 })
  }
}
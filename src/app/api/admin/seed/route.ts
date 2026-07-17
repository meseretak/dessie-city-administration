export const revalidate = 60;
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'

const ADMIN_SESSION = 'dessie_admin_session'

function hashPassword(pw: string): string {
  return createHash('sha256').update(pw + 'dessie_salt_2025').digest('hex')
}

async function getAdminUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION)?.value
  if (!session) return null
  try {
    const user = JSON.parse(session)
    return await db.adminUser.findUnique({ where: { id: user.id } })
  } catch {
    return null
  }
}

export async function POST() {
  try {
    const existing = await db.adminUser.count()
    if (existing > 0) {
      return NextResponse.json({ message: 'Admin users already exist', count: existing })
    }

    const adminPw = hashPassword('admin123')
    const checkerPw = hashPassword('checker123')

    await db.adminUser.createMany({
      data: [
        { username: 'admin', password: adminPw, name: 'Content Manager', role: 'admin' },
        { username: 'checker', password: checkerPw, name: 'Content Approver', role: 'super_admin' },
      ],
    })

    await db.newsArticle.updateMany({ data: { approvalStatus: 'approved', approvedBy: 'system', approvedAt: new Date() } })
    await db.vacancy.updateMany({ data: { approvalStatus: 'approved', approvedBy: 'system', approvedAt: new Date() } })
    await db.bid.updateMany({ data: { approvalStatus: 'approved', approvedBy: 'system', approvedAt: new Date() } })

    return NextResponse.json({ success: true, message: 'Admin users created: admin/admin123 and checker/checker123' })
  } catch (error) {
    console.error('Seed admin error:', error)
    return NextResponse.json({ error: 'Failed to seed admin users' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const admin = await getAdminUser()
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const users = await db.adminUser.findMany({
      select: { id: true, username: true, name: true, role: true, active: true, lastLogin: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
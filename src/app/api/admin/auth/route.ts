import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'

const ADMIN_SESSION = 'dessie_admin_session'

function hashPassword(pw: string): string {
  return createHash('sha256').update(pw + 'dessie_salt_2025').digest('hex')
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }

    const admin = await db.adminUser.findUnique({ where: { username } })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (!admin.active) {
      return NextResponse.json({ error: 'Account is disabled' }, { status: 403 })
    }

    const hash = hashPassword(password)
    if (hash !== admin.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    await db.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    })

    const sessionData = {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
      loginAt: new Date().toISOString(),
    }

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return NextResponse.json(sessionData)
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(ADMIN_SESSION)?.value

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const user = JSON.parse(session)
    const admin = await db.adminUser.findUnique({ where: { id: user.id } })

    if (!admin || !admin.active) {
      const cookieStore2 = await cookies()
      cookieStore2.delete(ADMIN_SESSION)
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
    })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(ADMIN_SESSION)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
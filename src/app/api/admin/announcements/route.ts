import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const announcementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  priority: z.string().default('normal'),
  status: z.string().default('active'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export async function GET() {
  try {
    const announcements = await db.announcement.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(announcements)
  } catch (error) {
    console.error('Announcements GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = announcementSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : 'pending'

    const announcement = await db.announcement.create({
      data: {
        ...data,
        approvalStatus,
        createdBy: adminId || null,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(announcement, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Announcements POST error:', error)
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = announcementSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''

    const existing = await db.announcement.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })

    const approvalStatus = adminRole === 'super_admin' ? 'approved' : (existing.approvalStatus === 'approved' ? 'pending' : existing.approvalStatus)

    const announcement = await db.announcement.update({
      where: { id },
      data: {
        ...data,
        approvalStatus,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(announcement)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Announcements PUT error:', error)
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const existing = await db.announcement.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })

    await db.announcement.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Announcements DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 })
  }
}
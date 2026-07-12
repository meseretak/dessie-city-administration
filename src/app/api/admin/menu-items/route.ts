import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const menuItemSchema = z.object({
  label: z.string().min(1),
  pageId: z.string().min(1),
  parentId: z.string().nullable().optional(),
  order: z.number().int().default(0),
  icon: z.string().nullable().optional(),
  isVisible: z.boolean().default(true),
  isOpenInNew: z.boolean().default(false),
})

export async function GET() {
  try {
    const items = await db.menuItem.findMany({
      where: { parentId: null },
      orderBy: { order: 'asc' },
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
      },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('MenuItems GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = menuItemSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : 'pending'

    const item = await db.menuItem.create({
      data: {
        ...data,
        approvalStatus,
        createdBy: adminId || null,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('MenuItems POST error:', error)
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = menuItemSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''

    const existing = await db.menuItem.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })

    // If maker updates an approved record, set back to pending
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : (existing.approvalStatus === 'approved' ? 'pending' : existing.approvalStatus)

    const item = await db.menuItem.update({
      where: { id },
      data: {
        ...data,
        approvalStatus,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(item)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('MenuItems PUT error:', error)
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const existing = await db.menuItem.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })

    // Hard delete if approved, soft-delete concept via status check
    if (existing.approvalStatus === 'approved') {
      await db.menuItem.delete({ where: { id } })
    } else {
      await db.menuItem.delete({ where: { id } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('MenuItems DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}
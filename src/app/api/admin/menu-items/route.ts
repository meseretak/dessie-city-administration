import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const menuItemSchema = z.object({
  label: z.string().min(1),
  pageId: z.string().min(1),
  parentId: z.string().nullable().optional(),
  order: z.coerce.number().int().default(0),
  icon: z.string().nullable().optional(),
  isVisible: z.coerce.boolean().default(true),
  isOpenInNew: z.coerce.boolean().default(false),
})

export async function GET() {
  try {
    // Fetch all items (Turso proxy doesn't support include/joins)
    const all = await db.menuItem.findMany({ orderBy: { order: 'asc' } })

    // Build tree: top-level items + their children
    const parents = all.filter((i: any) => !i.parentId)
    const result = parents.map((parent: any) => ({
      ...parent,
      children: all.filter((c: any) => c.parentId === parent.id),
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('MenuItems GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = menuItemSchema.parse(body)

    const id = `menu-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    await db.menuItem.create({
      data: {
        id,
        label: data.label,
        pageId: data.pageId,
        parentId: data.parentId ?? null,
        order: data.order,
        icon: data.icon ?? null,
        isVisible: data.isVisible ? 1 : 0,
        isOpenInNew: data.isOpenInNew ? 1 : 0,
        approvalStatus: 'approved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({ success: true, id })
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

    await db.menuItem.update({
      where: { id },
      data: {
        label: data.label,
        pageId: data.pageId,
        parentId: data.parentId ?? null,
        order: data.order,
        icon: data.icon ?? null,
        isVisible: data.isVisible ? 1 : 0,
        isOpenInNew: data.isOpenInNew ? 1 : 0,
        updatedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({ success: true })
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

    // Delete children first
    await db.menuItem.deleteMany({ where: { parentId: id } })
    await db.menuItem.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('MenuItems DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}

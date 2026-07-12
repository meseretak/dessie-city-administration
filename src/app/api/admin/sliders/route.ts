import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const sliderSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  image: z.string().min(1),
  link: z.string().nullable().optional(),
  sliderType: z.enum(['hero', 'promo']).default('hero'),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  tag: z.string().nullable().optional(),
  accentColor: z.string().nullable().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sliderType = searchParams.get('sliderType')

    const where = sliderType ? { sliderType } : {}

    const sliders = await db.sliderImage.findMany({
      where,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(sliders)
  } catch (error) {
    console.error('Sliders GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = sliderSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : 'pending'

    const slider = await db.sliderImage.create({
      data: {
        ...data,
        approvalStatus,
        createdBy: adminId || null,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(slider, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Sliders POST error:', error)
    return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = sliderSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''

    const existing = await db.sliderImage.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Slider not found' }, { status: 404 })

    const approvalStatus = adminRole === 'super_admin' ? 'approved' : (existing.approvalStatus === 'approved' ? 'pending' : existing.approvalStatus)

    const slider = await db.sliderImage.update({
      where: { id },
      data: {
        ...data,
        approvalStatus,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(slider)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Sliders PUT error:', error)
    return NextResponse.json({ error: 'Failed to update slider' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const existing = await db.sliderImage.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Slider not found' }, { status: 404 })

    await db.sliderImage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sliders DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 })
  }
}
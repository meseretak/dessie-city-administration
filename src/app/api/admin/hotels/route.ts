import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const hotelSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  priceRange: z.string().min(1),
  description: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  image: z.string().optional(),
  amenities: z.string().default('[]'),
  featured: z.boolean().default(false),
  status: z.string().default('active'),
})

export async function GET() {
  try {
    const hotels = await db.hotel.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(hotels)
  } catch (error) {
    console.error('Hotels GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = hotelSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : 'pending'

    const hotel = await db.hotel.create({
      data: {
        ...data,
        approvalStatus,
        createdBy: adminId || null,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(hotel, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Hotels POST error:', error)
    return NextResponse.json({ error: 'Failed to create hotel' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = hotelSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''

    const existing = await db.hotel.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 })

    const approvalStatus = adminRole === 'super_admin' ? 'approved' : (existing.approvalStatus === 'approved' ? 'pending' : existing.approvalStatus)

    const hotel = await db.hotel.update({
      where: { id },
      data: {
        ...data,
        approvalStatus,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(hotel)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Hotels PUT error:', error)
    return NextResponse.json({ error: 'Failed to update hotel' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const existing = await db.hotel.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 })

    await db.hotel.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Hotels DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete hotel' }, { status: 500 })
  }
}
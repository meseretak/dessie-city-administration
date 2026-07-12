import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const bidSchema = z.object({
  title: z.string().min(1),
  reference: z.string().min(1),
  category: z.string().min(1),
  deadline: z.string().min(1),
  status: z.string().default('Open'),
  description: z.string().min(1),
  budget: z.string().min(1),
  requirements: z.string().default('[]'),
  awardedTo: z.string().optional(),
})

export async function GET() {
  try {
    const bids = await db.bid.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(bids)
  } catch (error) {
    console.error('Bids GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch bids' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = bidSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : 'pending'

    const bid = await db.bid.create({
      data: {
        ...data,
        approvalStatus,
        createdBy: adminId || null,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(bid, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Bids POST error:', error)
    return NextResponse.json({ error: 'Failed to create bid' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = bidSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''

    const existing = await db.bid.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Bid not found' }, { status: 404 })

    const approvalStatus = adminRole === 'super_admin' ? 'approved' : (existing.approvalStatus === 'approved' ? 'pending' : existing.approvalStatus)

    const bid = await db.bid.update({
      where: { id },
      data: {
        ...data,
        approvalStatus,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(bid)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Bids PUT error:', error)
    return NextResponse.json({ error: 'Failed to update bid' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await db.bid.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Bids DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete bid' }, { status: 500 })
  }
}
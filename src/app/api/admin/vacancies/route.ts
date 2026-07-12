import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const vacancySchema = z.object({
  title: z.string().min(1),
  department: z.string().min(1),
  type: z.string().min(1),
  salary: z.string().min(1),
  deadline: z.string().min(1),
  status: z.string().default('Open'),
  description: z.string().min(1),
  requirements: z.string().default('[]'),
})

export async function GET() {
  try {
    const vacancies = await db.vacancy.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(vacancies)
  } catch (error) {
    console.error('Vacancies GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch vacancies' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = vacancySchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : 'pending'

    const vacancy = await db.vacancy.create({
      data: {
        ...data,
        approvalStatus,
        createdBy: adminId || null,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(vacancy, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Vacancies POST error:', error)
    return NextResponse.json({ error: 'Failed to create vacancy' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = vacancySchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''

    const existing = await db.vacancy.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 })

    const approvalStatus = adminRole === 'super_admin' ? 'approved' : (existing.approvalStatus === 'approved' ? 'pending' : existing.approvalStatus)

    const vacancy = await db.vacancy.update({
      where: { id },
      data: {
        ...data,
        approvalStatus,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(vacancy)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Vacancies PUT error:', error)
    return NextResponse.json({ error: 'Failed to update vacancy' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await db.vacancy.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Vacancies DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete vacancy' }, { status: 500 })
  }
}
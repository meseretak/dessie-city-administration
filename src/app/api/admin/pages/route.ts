import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const pageContentSchema = z.object({
  page: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
})

export async function GET() {
  try {
    const pages = await db.pageContent.findMany({ orderBy: { page: 'asc' } })
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Pages GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = pageContentSchema.parse(body)
    const page = await db.pageContent.create({ data })
    return NextResponse.json(page, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Pages POST error:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = pageContentSchema.parse(body)
    const page = await db.pageContent.update({ where: { id }, data })
    return NextResponse.json(page)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Pages PUT error:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}
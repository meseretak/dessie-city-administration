import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  category: z.string().default('general'),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    const where = category ? { category } : {}

    const settings = await db.siteSetting.findMany({
      where,
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('SiteSettings GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { key, value, category } = siteSettingSchema.parse(body)

    // Upsert: find by key, update if exists, create if not
    const existing = await db.siteSetting.findUnique({ where: { key } })

    if (existing) {
      const setting = await db.siteSetting.update({
        where: { key },
        data: { value, category },
      })
      return NextResponse.json(setting)
    } else {
      const setting = await db.siteSetting.create({
        data: { key, value, category },
      })
      return NextResponse.json(setting, { status: 201 })
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('SiteSettings PUT error:', error)
    return NextResponse.json({ error: 'Failed to upsert site setting' }, { status: 500 })
  }
}
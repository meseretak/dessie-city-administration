export const revalidate = 60;
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const contacts = await db.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Contacts GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const contact = await db.contactMessage.update({
      where: { id },
      data: { status: body.status },
    })
    return NextResponse.json(contact)
  } catch (error) {
    console.error('Contacts PUT error:', error)
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await db.contactMessage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contacts DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}
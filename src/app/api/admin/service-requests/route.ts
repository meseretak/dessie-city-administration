export const revalidate = 60;
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const requests = await db.serviceRequest.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Service requests GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch service requests' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await db.serviceRequest.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Service requests DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete service request' }, { status: 500 })
  }
}
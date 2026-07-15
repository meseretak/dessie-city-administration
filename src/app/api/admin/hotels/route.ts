import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_SESSION = 'dessie_admin_session'
async function getAdminId() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION)?.value
  if (!session) return null
  try { return JSON.parse(session).id } catch { return null }
}

function parseHotelData(body: any) {
  return {
    name: String(body.name || '').substring(0, 200),
    location: String(body.location || '').substring(0, 200),
    rating: Math.min(5, Math.max(1, parseInt(String(body.rating || '3')) || 3)),
    priceRange: String(body.priceRange || '').substring(0, 100),
    description: String(body.description || '').substring(0, 2000),
    phone: body.phone ? String(body.phone).substring(0, 50) : null,
    email: body.email ? String(body.email).substring(0, 100) : null,
    image: body.image ? String(body.image).substring(0, 500) : null,
    amenities: body.amenities || '[]',
    featured: body.featured === true || body.featured === 'true' || body.featured === '1',
    status: body.status || 'active',
  }
}

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
    const adminId = await getAdminId()
    const body = await req.json()
    if (!body.name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

    const data = parseHotelData(body)
    const isSuperAdmin = adminId ? await db.adminUser.findUnique({ where: { id: adminId }, select: { role: true } }) : null
    const approvalStatus = isSuperAdmin?.role === 'super_admin' ? 'approved' : 'pending'

    const hotel = await db.hotel.create({
      data: { ...data, approvalStatus, createdBy: adminId || null },
    })
    return NextResponse.json(hotel, { status: 201 })
  } catch (error) {
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
    const data = parseHotelData(body)
    const adminId = await getAdminId()
    const isSuperAdmin = adminId ? await db.adminUser.findUnique({ where: { id: adminId }, select: { role: true } }) : null
    const approvalStatus = isSuperAdmin?.role === 'super_admin' ? 'approved' : 'pending'

    const hotel = await db.hotel.update({ where: { id }, data: { ...data, approvalStatus } })
    return NextResponse.json(hotel)
  } catch (error) {
    console.error('Hotels PUT error:', error)
    return NextResponse.json({ error: 'Failed to update hotel' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    await db.hotel.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Hotels DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete hotel' }, { status: 500 })
  }
}

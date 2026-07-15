import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, serviceType, message } = body

    if (!name || !email || !serviceType) {
      return NextResponse.json({ success: false, error: 'Name, email and service type are required' }, { status: 400 })
    }

    const serviceRequest = await db.serviceRequest.create({
      data: {
        name: String(name).substring(0, 100),
        email: String(email).substring(0, 200),
        phone: phone ? String(phone).substring(0, 50) : null,
        serviceType: String(serviceType).substring(0, 200),
        message: message ? String(message).substring(0, 2000) : null,
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, data: { id: serviceRequest.id } })
  } catch (error) {
    console.error('Service request error:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}

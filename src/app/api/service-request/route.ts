import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const serviceRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  serviceType: z.string().min(1, 'Service type is required'),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = serviceRequestSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const serviceRequest = await db.serviceRequest.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        serviceType: result.data.serviceType,
        message: result.data.message || null,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: serviceRequest.id,
      },
    })
  } catch (error) {
    console.error('Service request submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit service request. Please try again.' },
      { status: 500 }
    )
  }
}
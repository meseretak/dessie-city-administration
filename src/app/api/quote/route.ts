import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  company: z.string().min(1, 'Company name is required'),
  teamSize: z.string().min(1, 'Team size is required'),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = quoteSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const quote = await db.quoteRequest.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        company: result.data.company,
        teamSize: result.data.teamSize,
        message: result.data.message || null,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: quote.id,
        name: quote.name,
        company: quote.company,
        createdAt: quote.createdAt,
      },
    })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit quote request. Please try again.' },
      { status: 500 }
    )
  }
}
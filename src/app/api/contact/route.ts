import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, phone } = body

    if (!name || name.length < 2) return NextResponse.json({ success: false, error: 'Name required' }, { status: 400 })
    if (!email || !email.includes('@')) return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 })
    if (!subject || subject.length < 3) return NextResponse.json({ success: false, error: 'Subject required' }, { status: 400 })
    if (!message || message.length < 5) return NextResponse.json({ success: false, error: 'Message required' }, { status: 400 })

    const contactMessage = await db.contactMessage.create({
      data: {
        name: String(name).substring(0, 100),
        email: String(email).substring(0, 200),
        subject: String(subject).substring(0, 300),
        message: String(message).substring(0, 2000),
        status: 'unread',
      },
    })

    return NextResponse.json({ success: true, data: { id: contactMessage.id } })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
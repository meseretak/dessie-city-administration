import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const bids = await db.bid.findMany({
      where: { status: 'Open', approvalStatus: 'approved' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        reference: true,
        category: true,
        deadline: true,
        budget: true,
        createdAt: true,
      },
    })
    return NextResponse.json(bids)
  } catch (error) {
    console.error('Public bids GET error:', error)
    return NextResponse.json([], { status: 200 })
  }
}
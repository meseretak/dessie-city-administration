import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const vacancies = await db.vacancy.findMany({
      where: { status: 'Open', approvalStatus: 'approved' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        department: true,
        type: true,
        salary: true,
        deadline: true,
        createdAt: true,
      },
    })
    return NextResponse.json(vacancies)
  } catch (error) {
    console.error('Public vacancies GET error:', error)
    return NextResponse.json([], { status: 200 })
  }
}
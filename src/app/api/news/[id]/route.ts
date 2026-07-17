import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    // In db.ts proxy, we cannot natively include relations easily if it doesn't support nested includes for Turso.
    // Let's fetch article and comments separately.
    const article = await db.newsArticle.findUnique({ where: { id } })
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const comments = await db.newsComment.findMany({ 
      where: { articleId: id, status: 'approved' },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ ...article, comments })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

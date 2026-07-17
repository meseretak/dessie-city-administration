import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()
    const { action, name, text } = body

    const article = await db.newsArticle.findUnique({ where: { id } })
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (action === 'like') {
      await db.newsArticle.update({
        where: { id },
        data: { likes: (article.likes || 0) + 1 }
      })
      return NextResponse.json({ success: true, likes: (article.likes || 0) + 1 })
    }
    
    if (action === 'share') {
      await db.newsArticle.update({
        where: { id },
        data: { shares: (article.shares || 0) + 1 }
      })
      return NextResponse.json({ success: true, shares: (article.shares || 0) + 1 })
    }

    if (action === 'comment') {
      if (!name || !text) return NextResponse.json({ error: 'Name and text required' }, { status: 400 })
      const comment = await db.newsComment.create({
        data: {
          articleId: id,
          name,
          text,
          status: 'approved'
        }
      })
      return NextResponse.json({ success: true, comment })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

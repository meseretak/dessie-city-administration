import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * One-time data fix route.
 * Visit: https://dessie-city-administration.vercel.app/api/admin/fix-data
 * This inserts the library news and fixes articles with missing images.
 */
export async function GET() {
  const results: string[] = []

  try {
    // 1. Check/insert library news
    const existing = await db.newsArticle.findUnique({ where: { id: 'news-library-2025-hamle-07' } })

    if (!existing) {
      await db.newsArticle.create({
        data: {
          id: 'news-library-2025-hamle-07',
          title: 'Dessie City Public Library No.1 Renovated & Reopened — Hamle 7, 2018 E.C.',
          excerpt: 'The Dessie City Public Library No.1 building renovation has been completed and officially opened to readers today, Hamle 7, 2018 E.C. (July 14, 2025).',
          content: `Today, Hamle 7, 2018 E.C. (July 14, 2025), the Dessie City Administration marked a significant milestone — the completion of the renovation of Dessie City Public Library No. 1 and its grand reopening to the public.\n\nThe library has served the residents of Dessie and its surrounding areas for many years. Having undergone a comprehensive building renovation, it now offers a clean, well-organized space with well-stocked bookshelves, proper reading furniture, and improved lighting.\n\nSpeaking at the ribbon-cutting opening ceremony, Mr. Seyid Yusuf — Deputy Mayor of Dessie City and Head of the Health Department — emphasized the importance of knowledge.\n\n"A nation stands firm on a foundation of knowledge-enriched thinking. It is our responsibility as the city administration to invest in institutions that foster a reading culture, especially among the youth of Dessie," he stated.\n\nFuture plans include:\n• Digitizing library services and introducing modern catalog systems\n• Upgrading furniture including chairs, tables, and reading stations\n• Expanding the collection with new books in Amharic, English, and other subjects\n\nThe reopened library is now accessible to all residents of Dessie. Citizens are encouraged to visit, register as members, and make full use of the collection of books and educational materials available.`,
          category: 'Education',
          image: '/news-library-opening.jpg',
          author: 'Dessie City Communication Office',
          status: 'published',
          approvalStatus: 'approved',
          createdBy: 'admin',
        },
      })
      results.push('✓ Created library news article')
    } else {
      // Update image to single path (not JSON array) so it shows in list
      await db.newsArticle.update({
        where: { id: 'news-library-2025-hamle-07' },
        data: {
          image: '/news-library-opening.jpg',
          status: 'published',
          approvalStatus: 'approved',
        },
      })
      results.push('✓ Updated library news image to single path')
    }

    // 2. Fix all articles with no image
    const noImage = await db.newsArticle.findMany({
      where: { image: null },
    })
    for (const a of noImage) {
      await db.newsArticle.update({
        where: { id: a.id },
        data: { image: '/news-meeting.png' },
      })
      results.push(`✓ Added default image to: ${a.title?.substring(0, 40)}`)
    }

    // 3. Fix articles with JSON array images — convert to single URL for list display
    const allArticles = await db.newsArticle.findMany({})
    for (const a of allArticles) {
      if (a.image && String(a.image).trim().startsWith('[')) {
        try {
          const arr = JSON.parse(String(a.image))
          if (Array.isArray(arr) && arr.length > 0) {
            await db.newsArticle.update({
              where: { id: a.id },
              data: { image: arr[0] },
            })
            results.push(`✓ Fixed JSON image for: ${a.title?.substring(0, 40)}`)
          }
        } catch { /* skip */ }
      }
    }

    return NextResponse.json({ success: true, results, total: results.length })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, results }, { status: 500 })
  }
}

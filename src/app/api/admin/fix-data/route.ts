import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * Data fix + seed route — run once after deployment.
 * Visit: https://dessie-city-administration.vercel.app/api/admin/fix-data
 */
export async function GET() {
  const results: string[] = []

  try {
    // ═══ 1. REBUILD MENU ITEMS ═══════════════════════════════
    // Delete all existing menu items and rebuild with full structure
    await db.menuItem.deleteMany({})
    results.push('✓ Cleared old menu items')

    const now = new Date().toISOString()

    const topLevelMenus = [
      { id: 'menu-home', label: 'HOME', pageId: 'home', order: 1 },
      { id: 'menu-about', label: 'ABOUT', pageId: 'about', order: 2 },
      { id: 'menu-mayor', label: 'MAYOR', pageId: 'mayor', order: 3 },
      { id: 'menu-services', label: 'SERVICES', pageId: 'services', order: 4 },
      { id: 'menu-announcements', label: 'ANNOUNCEMENTS', pageId: 'announcements', order: 5 },
      { id: 'menu-contact', label: 'CONTACT', pageId: 'contact', order: 6 },
    ]

    for (const m of topLevelMenus) {
      await db.menuItem.create({
        data: { id: m.id, label: m.label, pageId: m.pageId, parentId: null, order: m.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now },
      })
    }
    results.push('✓ Created top-level menu items')

    // About sub-items
    const aboutSubs = [
      { id: 'menu-about-dessie', label: 'About Dessie', pageId: 'about', order: 1 },
      { id: 'menu-tourism', label: 'Tourism & Culture', pageId: 'tourism', order: 2 },
      { id: 'menu-projects', label: 'City Projects', pageId: 'projects', order: 3 },
      { id: 'menu-transparency', label: 'Transparency', pageId: 'transparency', order: 4 },
      { id: 'menu-hotels', label: 'Hotels & Stay', pageId: 'hotels', order: 5 },
    ]
    for (const s of aboutSubs) {
      await db.menuItem.create({ data: { id: s.id, label: s.label, pageId: s.pageId, parentId: 'menu-about', order: s.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now } })
    }
    results.push('✓ Created ABOUT sub-items')

    // Mayor sub-items
    const mayorSubs = [
      { id: 'menu-mayor-profile', label: "Mayor's Profile", pageId: 'mayor', order: 1 },
      { id: 'menu-mayor-cabinet', label: 'Cabinet Members', pageId: 'mayor', order: 2 },
    ]
    for (const s of mayorSubs) {
      await db.menuItem.create({ data: { id: s.id, label: s.label, pageId: s.pageId, parentId: 'menu-mayor', order: s.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now } })
    }
    results.push('✓ Created MAYOR sub-items')

    // Services sub-items — full categorized list
    const servicesSubs = [
      // Civil Services
      { id: 'svc-birth', label: 'Birth Registration', pageId: 'service-detail', order: 1 },
      { id: 'svc-marriage', label: 'Marriage Registration', pageId: 'service-detail', order: 2 },
      { id: 'svc-id', label: 'ID & Documents', pageId: 'service-detail', order: 3 },
      // Business
      { id: 'svc-biz', label: 'Business License', pageId: 'service-detail', order: 4 },
      { id: 'svc-permit', label: 'Building Permit', pageId: 'service-detail', order: 5 },
      { id: 'svc-land', label: 'Land Services', pageId: 'service-detail', order: 6 },
      { id: 'svc-tax', label: 'Tax Payment', pageId: 'service-detail', order: 7 },
      // Health & Education
      { id: 'svc-health', label: 'Health Services', pageId: 'service-detail', order: 8 },
      { id: 'svc-edu', label: 'Education', pageId: 'service-detail', order: 9 },
      // Infrastructure
      { id: 'svc-water', label: 'Water & Electricity', pageId: 'service-detail', order: 10 },
      { id: 'svc-transport', label: 'Transportation', pageId: 'service-detail', order: 11 },
      { id: 'svc-waste', label: 'Waste Management', pageId: 'service-detail', order: 12 },
      // Digital & Other
      { id: 'svc-digital', label: 'Digital Services', pageId: 'service-detail', order: 13 },
      { id: 'svc-complaint', label: 'Complaints & Feedback', pageId: 'service-detail', order: 14 },
      { id: 'svc-appt', label: 'Appointments', pageId: 'service-detail', order: 15 },
      // Tourism separator items
      { id: 'svc-sep-tourism', label: '── Tourism & Culture', pageId: 'tourism', order: 16 },
      { id: 'svc-sep-projects', label: '── City Projects', pageId: 'projects', order: 17 },
    ]
    for (const s of servicesSubs) {
      await db.menuItem.create({ data: { id: s.id, label: s.label, pageId: s.pageId, parentId: 'menu-services', order: s.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now } })
    }
    results.push(`✓ Created SERVICES sub-items (${servicesSubs.length} items)`)

    // Announcements sub-items
    const announceSubs = [
      { id: 'menu-news', label: 'News & Media', pageId: 'news', order: 1 },
      { id: 'menu-vacancy', label: 'Vacancies', pageId: 'vacancy', order: 2 },
      { id: 'menu-bids', label: 'Bids & Tenders', pageId: 'bids', order: 3 },
    ]
    for (const s of announceSubs) {
      await db.menuItem.create({ data: { id: s.id, label: s.label, pageId: s.pageId, parentId: 'menu-announcements', order: s.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now } })
    }
    results.push('✓ Created ANNOUNCEMENTS sub-items')

    // Contact sub-items
    const contactSubs = [
      { id: 'menu-contact-us', label: 'Contact Us', pageId: 'contact', order: 1 },
      { id: 'menu-request', label: 'Request Service', pageId: 'services', order: 2 },
    ]
    for (const s of contactSubs) {
      await db.menuItem.create({ data: { id: s.id, label: s.label, pageId: s.pageId, parentId: 'menu-contact', order: s.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now } })
    }
    results.push('✓ Created CONTACT sub-items')

    // ═══ 2. FIX LIBRARY NEWS ═══════════════════════════════
    const existing = await db.newsArticle.findUnique({ where: { id: 'news-library-2025-hamle-07' } })
    if (!existing) {
      await db.newsArticle.create({
        data: {
          id: 'news-library-2025-hamle-07',
          title: 'Dessie City Public Library No.1 Renovated & Reopened — Hamle 7, 2018 E.C.',
          excerpt: 'The Dessie City Public Library No.1 building renovation has been completed and officially opened to readers today, Hamle 7, 2018 E.C. (July 14, 2025).',
          content: `Today, Hamle 7, 2018 E.C. (July 14, 2025), the Dessie City Administration marked a significant milestone — the completion of the renovation of Dessie City Public Library No. 1 and its grand reopening to the public.\n\nThe library has served the residents of Dessie and its surrounding areas for many years. The renovated library now offers a clean, well-organized space with well-stocked bookshelves, proper reading furniture, and improved lighting.\n\nSpeaking at the ribbon-cutting opening ceremony, Mr. Seyid Yusuf — Deputy Mayor of Dessie City and Head of the Health Department — emphasized the importance of knowledge.\n\n"A nation stands firm on a foundation of knowledge-enriched thinking. It is our responsibility as the city administration to invest in institutions that foster a reading culture, especially among the youth of Dessie."\n\nFuture plans include:\n• Digitizing library services\n• Upgrading furniture including chairs, tables, and reading stations\n• Expanding the book collection in Amharic, English, and other subjects\n\nThe reopened library is now accessible to all residents of Dessie.`,
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
      await db.newsArticle.update({ where: { id: 'news-library-2025-hamle-07' }, data: { image: '/news-library-opening.jpg', status: 'published', approvalStatus: 'approved' } })
      results.push('✓ Updated library news')
    }

    // ═══ 3. FIX NEWS IMAGES ═══════════════════════════════
    const allArticles = await db.newsArticle.findMany({})
    const imageMap: Record<string, string> = {
      '/dessie-smart-center.png': '/news-smart-city.png',
      '/dessie-service-counter.png': '/news-meeting.png',
      '/dessie-city-hall.png': '/news-meeting.png',
      '/dessie-conference-hall.png': '/news-meeting.png',
      '/dessie-service-center.png': '/news-meeting.png',
      '/dessie-city-hall-day.png': '/news-meeting.png',
      '/dessie-city-hall-night.png': '/news-meeting.png',
    }
    for (const a of allArticles) {
      const img = String(a.image || '')
      // Fix JSON arrays
      if (img.trim().startsWith('[')) {
        try {
          const arr = JSON.parse(img)
          if (Array.isArray(arr) && arr.length > 0) {
            await db.newsArticle.update({ where: { id: a.id }, data: { image: arr[0] } })
            results.push(`✓ Fixed JSON img: ${a.title?.substring(0, 30)}`)
            continue
          }
        } catch { /* skip */ }
      }
      // Fix broken image paths
      if (imageMap[img]) {
        await db.newsArticle.update({ where: { id: a.id }, data: { image: imageMap[img] } })
        results.push(`✓ Fixed img ${img} → ${imageMap[img]}`)
      }
      // Fix missing images
      if (!img || img === 'null') {
        await db.newsArticle.update({ where: { id: a.id }, data: { image: '/news-meeting.png' } })
        results.push(`✓ Added default img: ${a.title?.substring(0, 30)}`)
      }
    }

    return NextResponse.json({ success: true, results, total: results.length })
  } catch (error: any) {
    console.error('fix-data error:', error)
    return NextResponse.json({ error: error.message, partial_results: results }, { status: 500 })
  }
}

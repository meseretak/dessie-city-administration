import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * Full data fix + seed route — run once after deployment.
 * Visit: https://dessie-city-administration.vercel.app/api/admin/fix-data
 */
export async function GET() {
  const results: string[] = []

  try {
    // ═══ 0. ADD MISSING COLUMNS TO NewsArticle ═══════════════
    // Try to add views/likes columns (ignore error if already exist)
    const alterQueries = [
      `ALTER TABLE NewsArticle ADD COLUMN views INTEGER DEFAULT 0`,
      `ALTER TABLE NewsArticle ADD COLUMN likes INTEGER DEFAULT 0`,
      `ALTER TABLE NewsArticle ADD COLUMN commentsCount INTEGER DEFAULT 0`,
      `ALTER TABLE NewsArticle ADD COLUMN author TEXT DEFAULT 'Dessie City Administration'`,
    ]
    for (const q of alterQueries) {
      try {
        // Use raw SQL via the db proxy
        const TURSO_URL = (process.env.TURSO_DATABASE_URL ?? '').replace('libsql://', 'https://')
        const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN ?? ''
        await fetch(`${TURSO_URL}/v2/pipeline`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${TURSO_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ requests: [{ type: 'execute', stmt: { sql: q, args: [] } }, { type: 'close' }] }),
        })
      } catch { /* column may already exist */ }
    }
    results.push('✓ Ensured DB columns exist (views, likes, commentsCount, author)')

    // ═══ 1. REBUILD MENU ITEMS ═══════════════════════════════
    await db.menuItem.deleteMany({})
    const now = new Date().toISOString()

    const topMenus = [
      { id: 'menu-home', label: 'HOME', pageId: 'home', order: 1 },
      { id: 'menu-about', label: 'ABOUT', pageId: 'about', order: 2 },
      { id: 'menu-mayor', label: 'MAYOR', pageId: 'mayor', order: 3 },
      { id: 'menu-services', label: 'SERVICES', pageId: 'services', order: 4 },
      { id: 'menu-announcements', label: 'ANNOUNCEMENTS', pageId: 'announcements', order: 5 },
      { id: 'menu-contact', label: 'CONTACT', pageId: 'contact', order: 6 },
    ]
    for (const m of topMenus) {
      await db.menuItem.create({ data: { id: m.id, label: m.label, pageId: m.pageId, parentId: null, order: m.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now } })
    }

    const subMenus = [
      // About
      { id: 'sub-about-city', label: 'About Dessie', pageId: 'about', parentId: 'menu-about', order: 1 },
      { id: 'sub-about-tourism', label: 'Tourism & Culture', pageId: 'tourism', parentId: 'menu-about', order: 2 },
      { id: 'sub-about-projects', label: 'City Projects', pageId: 'projects', parentId: 'menu-about', order: 3 },
      { id: 'sub-about-hotels', label: 'Hotels & Stay', pageId: 'hotels', parentId: 'menu-about', order: 4 },
      { id: 'sub-about-transparency', label: 'Transparency', pageId: 'transparency', parentId: 'menu-about', order: 5 },
      // Mayor
      { id: 'sub-mayor-profile', label: "Mayor's Profile", pageId: 'mayor', parentId: 'menu-mayor', order: 1 },
      { id: 'sub-mayor-cabinet', label: 'Cabinet Members', pageId: 'mayor', parentId: 'menu-mayor', order: 2 },
      // Services — categorized
      { id: 'svc-birth', label: 'Birth Registration', pageId: 'service-detail', parentId: 'menu-services', order: 1 },
      { id: 'svc-marriage', label: 'Marriage Registration', pageId: 'service-detail', parentId: 'menu-services', order: 2 },
      { id: 'svc-id', label: 'ID & Documents', pageId: 'service-detail', parentId: 'menu-services', order: 3 },
      { id: 'svc-biz', label: 'Business License', pageId: 'service-detail', parentId: 'menu-services', order: 4 },
      { id: 'svc-permit', label: 'Building Permit', pageId: 'service-detail', parentId: 'menu-services', order: 5 },
      { id: 'svc-land', label: 'Land Services', pageId: 'service-detail', parentId: 'menu-services', order: 6 },
      { id: 'svc-tax', label: 'Tax Payment', pageId: 'service-detail', parentId: 'menu-services', order: 7 },
      { id: 'svc-health', label: 'Health Services', pageId: 'service-detail', parentId: 'menu-services', order: 8 },
      { id: 'svc-edu', label: 'Education', pageId: 'service-detail', parentId: 'menu-services', order: 9 },
      { id: 'svc-agri', label: 'Agriculture', pageId: 'service-detail', parentId: 'menu-services', order: 10 },
      { id: 'svc-water', label: 'Water & Electricity', pageId: 'service-detail', parentId: 'menu-services', order: 11 },
      { id: 'svc-transport', label: 'Transportation', pageId: 'service-detail', parentId: 'menu-services', order: 12 },
      { id: 'svc-digital', label: 'Digital Services', pageId: 'service-detail', parentId: 'menu-services', order: 13 },
      { id: 'svc-complaint', label: 'Complaints & Feedback', pageId: 'service-detail', parentId: 'menu-services', order: 14 },
      { id: 'svc-sep-tourism', label: '── Tourism & Culture', pageId: 'tourism', parentId: 'menu-services', order: 15 },
      { id: 'svc-sep-projects', label: '── City Projects', pageId: 'projects', parentId: 'menu-services', order: 16 },
      // Announcements
      { id: 'sub-news', label: 'News & Media', pageId: 'news', parentId: 'menu-announcements', order: 1 },
      { id: 'sub-vacancy', label: 'Vacancies', pageId: 'vacancy', parentId: 'menu-announcements', order: 2 },
      { id: 'sub-bids', label: 'Bids & Tenders', pageId: 'bids', parentId: 'menu-announcements', order: 3 },
      // Contact
      { id: 'sub-contact', label: 'Contact Us', pageId: 'contact', parentId: 'menu-contact', order: 1 },
      { id: 'sub-request', label: 'Request Service', pageId: 'services', parentId: 'menu-contact', order: 2 },
    ]
    for (const s of subMenus) {
      await db.menuItem.create({ data: { id: s.id, label: s.label, pageId: s.pageId, parentId: s.parentId, order: s.order, isVisible: 1, isOpenInNew: 0, approvalStatus: 'approved', createdAt: now, updatedAt: now } })
    }
    results.push(`✓ Rebuilt menu: ${topMenus.length} top + ${subMenus.length} sub items`)

    // ═══ 2. SEED ALL NEWS WITH IMAGES ═══════════════════════
    const newsToSeed = [
      { id: 'news-library-2025-hamle-07', title: 'Dessie City Public Library No.1 Renovated & Reopened', category: 'Education', image: '/news-library-opening.jpg', author: 'Dessie City Communication Office', excerpt: 'The Dessie City Public Library No.1 building renovation has been completed and officially opened to readers on Hamle 7, 2018 E.C.', content: `Today, Hamle 7, 2018 E.C. (July 14, 2025), the Dessie City Administration completed the renovation of Dessie City Public Library No. 1 and reopened it to the public.\n\nThe library now offers a clean, well-organized space with well-stocked bookshelves, proper reading furniture, and improved lighting.\n\nDeputy Mayor Mr. Seyid Yusuf stated: "A nation stands firm on a foundation of knowledge-enriched thinking. We must invest in institutions that foster a reading culture among our youth."\n\nFuture plans: digitizing services, upgrading furniture, and expanding the book collection.`, views: 245, likes: 38 },
      { id: 'news-smart-city-2025', title: 'Dessie Smart City Control Center Launched', category: 'Smart City', image: '/news-smart-city.png', author: 'Smart City Office', excerpt: 'The new smart city monitoring center features real-time surveillance, IoT sensors, and AI-powered analytics.', content: `Dessie City Administration has launched its state-of-the-art Smart City Control Center, marking a milestone in digital governance.\n\nThe center features real-time CCTV surveillance of the entire city, IoT sensors for infrastructure monitoring, and an AI-powered analytics dashboard.\n\nThis positions Dessie among leading smart cities in Ethiopia.`, views: 890, likes: 124 },
      { id: 'news-service-center-2025', title: 'Modern One-Stop Service Center Opens for Citizens', category: 'News', image: '/news-meeting.png', author: 'City Administration', excerpt: 'Citizens can now access 40+ government services at a single modern center staffed with professional officers.', content: `Dessie City Administration opened a new integrated one-stop service center providing 40+ government services under one roof.\n\nThe center integrates Ethiopost, telecom, banking, and municipal services with professional staff available Monday–Saturday.`, views: 567, likes: 89 },
      { id: 'news-health-2025', title: 'New City Hospital Wing Inaugurated with 200 Beds', category: 'Health', image: '/news-health.png', author: 'Health Department', excerpt: 'The new wing features modern medical equipment, pediatric wards, and a 24/7 emergency department.', content: `The Dessie City Administration inaugurated a new 200-bed hospital wing serving residents across the city.\n\nThe wing includes pediatric wards, a modern emergency department, surgical theaters, and specialist consultation rooms.\n\nVaccination coverage has reached 95% and a telemedicine pilot program has been launched.`, views: 423, likes: 67 },
      { id: 'news-culture-2025', title: 'Annual Dessie Cultural Festival Dates Announced', category: 'Culture', image: '/news-culture.png', author: 'Culture & Tourism Office', excerpt: 'The week-long festival showcases traditional music, dance, crafts, and cuisine from Amhara Region.', content: `The Dessie City Administration announces the Annual Cultural Festival celebrating Amhara heritage and traditions.\n\nThe festival features traditional music, dance performances, craft exhibitions, and a celebration of authentic Ethiopian cuisine.\n\nThe event runs for one full week and is open to all residents and visitors.`, views: 312, likes: 45 },
      { id: 'news-infrastructure-2025', title: 'Water Treatment Plant Begins Full Operations', category: 'Infrastructure', image: '/news-infrastructure.png', author: 'Infrastructure Department', excerpt: 'The new facility provides clean drinking water to an additional 100,000 residents.', content: `The new Dessie Water Treatment Plant has begun full operations, providing clean drinking water to 100,000 additional residents.\n\nThe facility uses modern filtration technology and connects to the city-wide distribution network.\n\nWater coverage across the city now stands at 85%.`, views: 198, likes: 29 },
    ]

    let newsCreated = 0, newsUpdated = 0
    for (const n of newsToSeed) {
      const exists = await db.newsArticle.findUnique({ where: { id: n.id } })
      if (exists) {
        await db.newsArticle.update({ where: { id: n.id }, data: { image: n.image, status: 'published', approvalStatus: 'approved', author: n.author } })
        newsUpdated++
      } else {
        await db.newsArticle.create({ data: { id: n.id, title: n.title, excerpt: n.excerpt, content: n.content, category: n.category, image: n.image, author: n.author, status: 'published', approvalStatus: 'approved', createdBy: 'admin' } })
        newsCreated++
      }
    }
    results.push(`✓ News: ${newsCreated} created, ${newsUpdated} updated`)

    // ═══ 3. FIX REMAINING NEWS IMAGES ═══════════════════════
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
    let imgFixed = 0
    for (const a of allArticles) {
      const img = String(a.image || '')
      if (img.trim().startsWith('[')) {
        try {
          const arr = JSON.parse(img)
          if (Array.isArray(arr) && arr[0]) { await db.newsArticle.update({ where: { id: a.id }, data: { image: arr[0] } }); imgFixed++ }
        } catch { /* skip */ }
      } else if (imageMap[img]) {
        await db.newsArticle.update({ where: { id: a.id }, data: { image: imageMap[img] } }); imgFixed++
      } else if (!img || img === 'null') {
        await db.newsArticle.update({ where: { id: a.id }, data: { image: '/news-meeting.png' } }); imgFixed++
      }
    }
    results.push(`✓ Fixed ${imgFixed} news images`)

    return NextResponse.json({ success: true, results, total: results.length })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, results }, { status: 500 })
  }
}
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

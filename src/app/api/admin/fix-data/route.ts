import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * Full DB seed + fix route — call once after deployment:
 * https://dessie-city-administration.vercel.app/api/admin/fix-data
 */
export async function GET() {
  const results: string[] = []
  const now = new Date().toISOString()

  try {
    // ══════════════════════════════════════════════════
    // 1. REBUILD MENU ITEMS (full categorized structure)
    // ══════════════════════════════════════════════════
    await db.menuItem.deleteMany({})

    const allMenuItems = [
      // Top level
      { id: 'menu-home',          label: 'HOME',          pageId: 'home',          parentId: null,                  order: 1 },
      { id: 'menu-about',         label: 'ABOUT',         pageId: 'about',         parentId: null,                  order: 2 },
      { id: 'menu-mayor',         label: 'MAYOR',         pageId: 'mayor',         parentId: null,                  order: 3 },
      { id: 'menu-services',      label: 'SERVICES',      pageId: 'services',      parentId: null,                  order: 4 },
      { id: 'menu-announcements', label: 'ANNOUNCEMENTS', pageId: 'announcements', parentId: null,                  order: 5 },
      { id: 'menu-contact',       label: 'CONTACT',       pageId: 'contact',       parentId: null,                  order: 6 },
      // About sub-items
      { id: 'sub-about-city',         label: 'About Dessie',        pageId: 'about',          parentId: 'menu-about', order: 1 },
      { id: 'sub-about-tourism',      label: 'Tourism & Culture',   pageId: 'tourism',        parentId: 'menu-about', order: 2 },
      { id: 'sub-about-projects',     label: 'City Projects',       pageId: 'projects',       parentId: 'menu-about', order: 3 },
      { id: 'sub-about-hotels',       label: 'Hotels & Stay',       pageId: 'hotels',         parentId: 'menu-about', order: 4 },
      { id: 'sub-about-transparency', label: 'Transparency',        pageId: 'transparency',   parentId: 'menu-about', order: 5 },
      // Mayor sub-items
      { id: 'sub-mayor-profile', label: "Mayor's Profile",  pageId: 'mayor', parentId: 'menu-mayor', order: 1 },
      { id: 'sub-mayor-cabinet', label: 'Cabinet Members',  pageId: 'mayor', parentId: 'menu-mayor', order: 2 },
      // Services sub-items — full categorized list
      { id: 'svc-birth',         label: 'Birth Registration',    pageId: 'service-detail', parentId: 'menu-services', order: 1 },
      { id: 'svc-marriage',      label: 'Marriage Registration', pageId: 'service-detail', parentId: 'menu-services', order: 2 },
      { id: 'svc-id',            label: 'ID & Documents',        pageId: 'service-detail', parentId: 'menu-services', order: 3 },
      { id: 'svc-biz',           label: 'Business License',      pageId: 'service-detail', parentId: 'menu-services', order: 4 },
      { id: 'svc-permit',        label: 'Building Permit',       pageId: 'service-detail', parentId: 'menu-services', order: 5 },
      { id: 'svc-land',          label: 'Land Services',         pageId: 'service-detail', parentId: 'menu-services', order: 6 },
      { id: 'svc-tax',           label: 'Tax Payment',           pageId: 'service-detail', parentId: 'menu-services', order: 7 },
      { id: 'svc-health',        label: 'Health Services',       pageId: 'service-detail', parentId: 'menu-services', order: 8 },
      { id: 'svc-edu',           label: 'Education',             pageId: 'service-detail', parentId: 'menu-services', order: 9 },
      { id: 'svc-agri',          label: 'Agriculture',           pageId: 'service-detail', parentId: 'menu-services', order: 10 },
      { id: 'svc-water',         label: 'Water & Electricity',   pageId: 'service-detail', parentId: 'menu-services', order: 11 },
      { id: 'svc-transport',     label: 'Transportation',        pageId: 'service-detail', parentId: 'menu-services', order: 12 },
      { id: 'svc-digital',       label: 'Digital Services',      pageId: 'service-detail', parentId: 'menu-services', order: 13 },
      { id: 'svc-complaint',     label: 'Complaints & Feedback', pageId: 'service-detail', parentId: 'menu-services', order: 14 },
      { id: 'svc-sep-tourism',   label: '── Tourism & Culture',  pageId: 'tourism',        parentId: 'menu-services', order: 15 },
      { id: 'svc-sep-projects',  label: '── City Projects',      pageId: 'projects',       parentId: 'menu-services', order: 16 },
      // Announcements sub-items
      { id: 'sub-news',    label: 'News & Media',    pageId: 'news',    parentId: 'menu-announcements', order: 1 },
      { id: 'sub-vacancy', label: 'Vacancies',       pageId: 'vacancy', parentId: 'menu-announcements', order: 2 },
      { id: 'sub-bids',    label: 'Bids & Tenders',  pageId: 'bids',    parentId: 'menu-announcements', order: 3 },
      // Contact sub-items
      { id: 'sub-contact',  label: 'Contact Us',      pageId: 'contact',  parentId: 'menu-contact', order: 1 },
      { id: 'sub-request',  label: 'Request Service', pageId: 'services', parentId: 'menu-contact', order: 2 },
    ]

    for (const m of allMenuItems) {
      await db.menuItem.create({
        data: {
          id: m.id, label: m.label, pageId: m.pageId,
          parentId: m.parentId ?? null,
          order: m.order, isVisible: 1, isOpenInNew: 0,
          approvalStatus: 'approved', createdAt: now, updatedAt: now,
        },
      })
    }
    results.push(`✓ Rebuilt ${allMenuItems.length} menu items`)

    // ══════════════════════════════════════════════════
    // 2. SEED / FIX NEWS ARTICLES WITH IMAGES & AUTHOR
    // ══════════════════════════════════════════════════
    const newsToSeed = [
      {
        id: 'news-library-2025-hamle-07',
        title: 'Dessie City Public Library No.1 Renovated & Reopened',
        category: 'Education', image: '/news-library-opening.jpg',
        author: 'Dessie City Communication Office',
        excerpt: 'The Dessie City Public Library No.1 building renovation has been completed and officially opened to readers on Hamle 7, 2018 E.C.',
        content: 'Today, Hamle 7, 2018 E.C., the Dessie City Administration completed the renovation of Dessie City Public Library No. 1 and reopened it to the public.\n\nThe library now offers a clean, well-organized space with well-stocked bookshelves, proper reading furniture, and improved lighting.\n\nDeputy Mayor Mr. Seyid Yusuf stated: "A nation stands firm on a foundation of knowledge-enriched thinking. We must invest in institutions that foster a reading culture among our youth."\n\nFuture plans include digitizing services, upgrading furniture, and expanding the book collection in Amharic, English, and other subjects.',
      },
      {
        id: 'news-smart-city-2025',
        title: 'Dessie Smart City Control Center Launched',
        category: 'Smart City', image: '/news-smart-city.png',
        author: 'Smart City Office',
        excerpt: 'The new smart city monitoring center features real-time surveillance, IoT sensors, and AI-powered analytics.',
        content: 'Dessie City Administration launched its Smart City Control Center, featuring real-time CCTV, IoT infrastructure monitoring, and AI analytics.\n\nThis positions Dessie among leading smart cities in Ethiopia.',
      },
      {
        id: 'news-service-center-2025',
        title: 'Modern One-Stop Service Center Opens for Citizens',
        category: 'News', image: '/news-meeting.png',
        author: 'City Administration',
        excerpt: 'Citizens can now access 40+ government services at a single modern center.',
        content: 'Dessie opened a new integrated one-stop service center providing 40+ government services under one roof with professional staff available Monday through Saturday.',
      },
      {
        id: 'news-health-2025',
        title: 'New City Hospital Wing Inaugurated with 200 Beds',
        category: 'Health', image: '/news-health.png',
        author: 'Health Department',
        excerpt: 'The new wing features modern medical equipment, pediatric wards, and a 24/7 emergency department.',
        content: 'The new 200-bed hospital wing includes pediatric wards, a modern emergency department, surgical theaters, and specialist consultation rooms.\n\nVaccination coverage has reached 95% citywide.',
      },
      {
        id: 'news-culture-2025',
        title: 'Annual Dessie Cultural Festival Dates Announced',
        category: 'Culture', image: '/news-culture.png',
        author: 'Culture & Tourism Office',
        excerpt: 'The week-long festival showcases traditional music, dance, crafts, and Amhara cuisine.',
        content: 'The Annual Cultural Festival celebrates Amhara heritage and traditions with traditional music, dance performances, craft exhibitions, and authentic Ethiopian cuisine. The event runs for one full week.',
      },
      {
        id: 'news-infrastructure-2025',
        title: 'Water Treatment Plant Begins Full Operations',
        category: 'Infrastructure', image: '/news-infrastructure.png',
        author: 'Infrastructure Department',
        excerpt: 'The new facility provides clean drinking water to an additional 100,000 residents.',
        content: 'The new Dessie Water Treatment Plant provides clean drinking water to 100,000 additional residents using modern filtration technology. City water coverage now stands at 85%.',
      },
    ]

    let created = 0, updated = 0
    for (const n of newsToSeed) {
      const exists = await db.newsArticle.findUnique({ where: { id: n.id } })
      if (exists) {
        await db.newsArticle.update({
          where: { id: n.id },
          data: { image: n.image, status: 'published', approvalStatus: 'approved', author: n.author },
        })
        updated++
      } else {
        await db.newsArticle.create({
          data: {
            id: n.id, title: n.title, excerpt: n.excerpt, content: n.content,
            category: n.category, image: n.image, author: n.author,
            status: 'published', approvalStatus: 'approved', createdBy: 'admin',
          },
        })
        created++
      }
    }
    results.push(`✓ News: ${created} created, ${updated} updated`)

    // ══════════════════════════════════════════════════
    // 3. FIX REMAINING ARTICLES WITH BAD/MISSING IMAGES
    // ══════════════════════════════════════════════════
    const imageMap: Record<string, string> = {
      '/dessie-smart-center.png':  '/news-smart-city.png',
      '/dessie-service-counter.png': '/news-meeting.png',
      '/dessie-city-hall.png':     '/news-meeting.png',
      '/dessie-conference-hall.png': '/news-meeting.png',
      '/dessie-service-center.png': '/news-meeting.png',
      '/dessie-city-hall-day.png': '/news-meeting.png',
      '/dessie-city-hall-night.png': '/news-meeting.png',
    }

    const all = await db.newsArticle.findMany({})
    let imgFixed = 0
    for (const a of all) {
      const img = String(a.image || '')
      if (img.trim().startsWith('[')) {
        try {
          const arr = JSON.parse(img)
          if (Array.isArray(arr) && arr[0]) {
            await db.newsArticle.update({ where: { id: a.id }, data: { image: arr[0] } })
            imgFixed++
          }
        } catch { /* skip */ }
      } else if (imageMap[img]) {
        await db.newsArticle.update({ where: { id: a.id }, data: { image: imageMap[img] } })
        imgFixed++
      } else if (!img || img === 'null' || img === 'undefined') {
        await db.newsArticle.update({ where: { id: a.id }, data: { image: '/news-meeting.png' } })
        imgFixed++
      }
    }
    results.push(`✓ Fixed ${imgFixed} article images`)

    return NextResponse.json({ success: true, results, total: results.length })
  } catch (error: any) {
    console.error('fix-data error:', error)
    return NextResponse.json({ error: error.message, partial: results }, { status: 500 })
  }
}

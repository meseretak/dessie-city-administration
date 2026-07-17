export const revalidate = 60;
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [hotels, news, vacancies, bids, projects, contacts, serviceRequests, newsletter, announcements, users, menuItems, sliderImages, cabinetMembers] =
      await Promise.all([
        db.hotel.count(),
        db.newsArticle.count(),
        db.vacancy.count(),
        db.bid.count(),
        db.project.count(),
        db.contactMessage.count(),
        db.serviceRequest.count(),
        db.newsletterSubscription.count(),
        db.announcement.count(),
        db.user.count(),
        db.menuItem.count(),
        db.sliderImage.count(),
        db.cabinetMember.count(),
      ])

    const recentContacts = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, name: true, subject: true, status: true, createdAt: true },
    })

    const recentServiceRequests = await db.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, name: true, serviceType: true, status: true, createdAt: true },
    })

    return NextResponse.json({
      hotels,
      news,
      vacancies,
      bids,
      projects,
      contacts,
      serviceRequests,
      newsletter,
      announcements,
      users,
      menuItems,
      sliderImages,
      cabinetMembers,
      recentContacts,
      recentServiceRequests,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
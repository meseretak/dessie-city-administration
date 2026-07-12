import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Clear and re-seed cabinet members
    await db.cabinetMember.deleteMany({ where: { id: { startsWith: 'seed-' } } })

    await db.cabinetMember.createMany({
      data: [
        { id: 'seed-1', name: 'Ato Samuel Molalign', title: 'Chief Mayor (Mayor / ከንቲባ)', department: 'Mayor Office', bio: 'Overall city leadership, strategic planning, policy direction, executive decisions, municipal governance, budget approval, major infrastructure projects, regional and international partnerships.', order: 1, email: 'mayor@dessiecity.gov.et', approvalStatus: 'approved' },
        { id: 'seed-2', name: 'Ato Qasim Abera', title: 'Chief Manager (Managing Director / Deputy Mayor)', department: 'City Administration', bio: 'Day-to-day city administration, implementation of mayoral directives, municipal operations, infrastructure supervision, public service delivery, departmental coordination, performance monitoring.', order: 2, approvalStatus: 'approved' },
        { id: 'seed-3', name: 'Ato Ashenafi Alemayehu', title: 'Prosperity Party Branch Head', department: 'Political Affairs', bio: 'Political leadership, community mobilization, public participation, volunteer programs, civic engagement, peace and stability coordination.', order: 3, approvalStatus: 'approved' },
        { id: 'seed-4', name: 'Ato Mengistu Abebe', title: 'Deputy Manager of Infrastructure', department: 'Infrastructure', bio: 'Roads, bridges, municipal engineering, public infrastructure, heavy equipment management, asphalt projects, civil construction supervision.', order: 4, approvalStatus: 'approved' },
        { id: 'seed-5', name: 'Ato Wondwosen Abi', title: 'Director of Urban Services & Construction', department: 'Urban Services', bio: 'Urban planning, building permits, construction regulation, master plan implementation, housing development, building inspection and compliance.', order: 5, approvalStatus: 'approved' },
        { id: 'seed-6', name: 'Ato Natnael Kefyalew', title: 'Head of Smart City Project Office', department: 'Smart City', bio: 'Smart city initiatives, digital transformation, ICT infrastructure, e-government systems, GIS, city databases, teleconferencing systems, grievance management platform.', order: 6, approvalStatus: 'approved' },
        { id: 'seed-7', name: 'Land Development & Management Bureau', title: 'Bureau Head', department: 'Land Development & Management (DLD)', bio: 'Land administration, cadastral management, land registration, property boundaries, land lease administration, urban land development.', order: 7, approvalStatus: 'approved' },
        { id: 'seed-8', name: 'Ato Mohammed Marye', title: 'Chamber of Commerce Chairperson', department: 'Commerce & Investment', bio: 'Business development, investment promotion, private sector partnerships, commerce, entrepreneurship, trade facilitation, merchant services.', order: 8, approvalStatus: 'approved' },
        { id: 'seed-9', name: 'Finance & Economic Cooperation', title: 'Department Head', department: 'Finance & Economic Cooperation', bio: 'Municipal finance, budgeting, revenue collection, procurement, financial planning, accounting, economic development, donor coordination, project financing.', order: 9, approvalStatus: 'approved' },
      ],
    })

    // Seed site settings
    const settingsData = [
      { key: 'site_name', value: 'Dessie City Administration', category: 'general' },
      { key: 'site_email', value: 'info@dessiecity.gov.et', category: 'contact' },
      { key: 'site_phone', value: '+251-33-111-XXXX', category: 'contact' },
      { key: 'address', value: 'Dessie, Amhara Region, Ethiopia', category: 'contact' },
      { key: 'facebook_url', value: 'https://facebook.com/dessiecity', category: 'social' },
      { key: 'twitter_url', value: 'https://twitter.com/dessiecity', category: 'social' },
      { key: 'instagram_url', value: 'https://instagram.com/dessiecity', category: 'social' },
      { key: 'youtube_url', value: 'https://youtube.com/dessiecity', category: 'social' },
      { key: 'linkedin_url', value: 'https://linkedin.com/company/dessiecity', category: 'social' },
      { key: 'telegram_url', value: 'https://t.me/dessiecity', category: 'social' },
      { key: 'footer_text', value: '© 2025 Dessie City Administration. All rights reserved.', category: 'footer' },
      { key: 'footer_address', value: 'City Hall, Dessie, Amhara, Ethiopia', category: 'footer' },
      { key: 'mayor_name', value: 'Ato Samuel Molalign', category: 'mayor' },
      { key: 'mayor_title', value: 'Chief Mayor', category: 'mayor' },
    ]

    for (const s of settingsData) {
      await db.siteSetting.upsert({
        where: { key: s.key },
        update: { value: s.value },
        create: s,
      })
    }

    return NextResponse.json({ success: true, members: 9, settings: settingsData.length })
  } catch (error: any) {
    console.error('Seed content error:', error?.message || error)
    return NextResponse.json({ error: 'Failed to seed', detail: error?.message }, { status: 500 })
  }
}
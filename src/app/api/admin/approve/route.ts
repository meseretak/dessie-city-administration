export const revalidate = 60;
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_SESSION = 'dessie_admin_session'

async function getAdminUser(req?: NextRequest) {
  // First try headers (for client-side auth)
  if (req) {
    const adminId = req.headers.get('x-admin-id')
    const adminRole = req.headers.get('x-admin-role')
    if (adminId && adminRole === 'super_admin') {
      const admin = await db.adminUser.findUnique({ where: { id: adminId } })
      if (admin && admin.active) return admin
    }
  }
  // Fallback to cookie auth
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION)?.value
  if (!session) return null
  try {
    const user = JSON.parse(session)
    const admin = await db.adminUser.findUnique({ where: { id: user.id } })
    return admin
  } catch {
    return null
  }
}

type ApprovalModel = 'NewsArticle' | 'Vacancy' | 'Bid' | 'Hotel' | 'Project' | 'Announcement' | 'MenuItem' | 'SliderImage' | 'CabinetMember'

const VALID_MODELS: ApprovalModel[] = [
  'NewsArticle', 'Vacancy', 'Bid', 'Hotel', 'Project', 'Announcement', 'MenuItem', 'SliderImage', 'CabinetMember',
]

const MODELS_WITH_STATUS: ApprovalModel[] = ['NewsArticle', 'Vacancy', 'Bid', 'Announcement', 'Hotel']

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminUser(req)
    if (!admin || admin.role !== 'super_admin') {
      return NextResponse.json({ error: 'Unauthorized. Checker role required.' }, { status: 403 })
    }

    const { model, id, action } = await req.json()

    if (!model || !id || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
    if (!VALID_MODELS.includes(model)) {
      return NextResponse.json({ error: 'Invalid model' }, { status: 400 })
    }

    const approvalStatus = action === 'approve' ? 'approved' : 'rejected'
    const hasStatusField = MODELS_WITH_STATUS.includes(model)
    const status = hasStatusField ? (action === 'approve' ? 'published' : 'draft') : undefined

    const updateData: Record<string, unknown> = {
      approvalStatus,
      approvedBy: admin.id,
      approvedAt: new Date(),
    }
    if (status !== undefined) {
      updateData.status = status
    }

    // @ts-expect-error dynamic model access
    const updated = await db[model].update({
      where: { id },
      data: updateData,
    })

    await db.auditLog.create({
      data: {
        adminId: admin.id,
        action,
        model,
        recordId: id,
        details: JSON.stringify({ title: 'title' in updated ? updated.title : id, approvalStatus }),
      },
    })

    return NextResponse.json({ success: true, record: updated })
  } catch (error) {
    console.error('Approval error:', error)
    return NextResponse.json({ error: 'Approval failed' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [pendingNews, pendingVacancies, pendingBids, pendingHotels, pendingProjects, pendingAnnouncements, pendingMenuItems, pendingSliders, pendingCabinetMembers] = await Promise.all([
      db.newsArticle.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.vacancy.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.bid.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.hotel.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.project.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.announcement.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.menuItem.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.sliderImage.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
      db.cabinetMember.findMany({ where: { approvalStatus: 'pending' }, orderBy: { createdAt: 'desc' } }),
    ])

    return NextResponse.json({
      pending: {
        news: pendingNews.length,
        vacancies: pendingVacancies.length,
        bids: pendingBids.length,
        hotels: pendingHotels.length,
        projects: pendingProjects.length,
        announcements: pendingAnnouncements.length,
        menuItems: pendingMenuItems.length,
        sliders: pendingSliders.length,
        cabinetMembers: pendingCabinetMembers.length,
      },
      items: [
        ...pendingNews.map(n => ({ ...n, _model: 'NewsArticle' as const })),
        ...pendingVacancies.map(v => ({ ...v, _model: 'Vacancy' as const })),
        ...pendingBids.map(b => ({ ...b, _model: 'Bid' as const })),
        ...pendingHotels.map(h => ({ ...h, _model: 'Hotel' as const })),
        ...pendingProjects.map(p => ({ ...p, _model: 'Project' as const })),
        ...pendingAnnouncements.map(a => ({ ...a, _model: 'Announcement' as const })),
        ...pendingMenuItems.map(m => ({ ...m, _model: 'MenuItem' as const })),
        ...pendingSliders.map(s => ({ ...s, _model: 'SliderImage' as const })),
        ...pendingCabinetMembers.map(c => ({ ...c, _model: 'CabinetMember' as const })),
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    })
  } catch (error) {
    console.error('Pending items error:', error)
    return NextResponse.json({ error: 'Failed to fetch pending items' }, { status: 500 })
  }
}
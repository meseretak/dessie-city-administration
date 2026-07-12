import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

function matchIntent(msg: string): { intent: string; response: string } | null {
  const lower = msg.toLowerCase()

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('greetings')) {
    return { intent: 'greeting', response: 'Welcome to Dessie City Administration! 🏛️ How can I assist you today? I can help with services, news, vacancies, bids, tourism, or general information about the city.' }
  }

  if (lower.includes('service') || lower.includes('how to') || lower.includes('help')) {
    return { intent: 'services', response: 'Dessie City offers 12 citizen services: **Birth Registration**, **Business License**, **Building Permit**, **Land Services**, **Tax Payment**, **Marriage Registration**, **Health Services**, **Education**, **Transportation**, **Water & Electricity**, **Complaints**, and **Appointments**. Visit the Services section for detailed information on each, including requirements and procedures.' }
  }

  if (lower.includes('vacanc') || lower.includes('job') || lower.includes('career') || lower.includes('work') || lower.includes('employ')) {
    return { intent: 'vacancies', response: '__DYNAMIC_VACANCIES__' }
  }

  if (lower.includes('bid') || lower.includes('tender') || lower.includes('procurement')) {
    return { intent: 'bids', response: '__DYNAMIC_BIDS__' }
  }

  if (lower.includes('news') || lower.includes('latest') || lower.includes('update') || lower.includes('announcement')) {
    return { intent: 'news', response: '__DYNAMIC_NEWS__' }
  }

  if (lower.includes('mayor') || lower.includes('leadership') || lower.includes('administ')) {
    return { intent: 'mayor', response: '**Mayor**: Hon. Samuel Mollalign leads Dessie City Administration with a vision for smart city transformation. **Deputy Mayor**: Ato Getachew Hailu oversees cross-departmental coordination. Visit the Mayor section for full leadership profiles, organizational structure, and key priorities.' }
  }

  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('reach')) {
    return { intent: 'contact', response: 'You can reach us at:\n• **Helpline**: +251 33 111 0000\n• **Email**: info@dessiecity.gov.et\n• **Emergency**: Police 991 | Ambulance 902 | Fire 939\nVisit the Contact page for the full directory and a message form.' }
  }

  if (lower.includes('touris') || lower.includes('visit') || lower.includes('heritage') || lower.includes('attract')) {
    return { intent: 'tourism', response: 'Dessie offers rich tourism experiences! Key attractions include the **Dessie Fortress (Yekatit 12 Monument)**, **Tossa Mountain Heritage Site**, **Borkena River Valley**, **Kidane Mehret Church**, and the **Traditional Market (Merkato)**. Visit the Tourism & Culture section for detailed information, photos, and visitor guides.' }
  }

  if (lower.includes('about') || lower.includes('dessie') || lower.includes('what is') || lower.includes('city')) {
    return { intent: 'about', response: 'Dessie is a major city in the Amhara Region, Ethiopia with a population of 450,000+ residents across 254 km². It has 12 Kebeles and 8 Sub-Cities. The city is known for its heritage sites, highland landscapes, and growing economy. Visit the About Dessie section for a comprehensive overview including demographics, history, and key statistics.' }
  }

  if (lower.includes('emergency') || lower.includes('police') || lower.includes('ambulance') || lower.includes('fire')) {
    return { intent: 'emergency', response: '🚨 **Emergency Contacts**:\n• **Police**: 991\n• **Ambulance**: 902\n• **Fire**: 939\n• **City Helpline**: +251 33 111 0000\nPlease call these numbers immediately in case of emergency.' }
  }

  if (lower.includes('thank') || lower.includes('thanks')) {
    return { intent: 'thanks', response: 'You are welcome! If you need any further assistance, don\'t hesitate to ask. You can also visit us at the City Administration building or call +251 33 111 0000. Have a great day! 😊' }
  }

  if (lower.includes('project') || lower.includes('develop') || lower.includes('infrastructure')) {
    return { intent: 'projects', response: 'Dessie has several major development projects including a **Smart City Digital Platform**, a **500-hectare Industrial Zone** (attracting ETB 10B+ in investment), the **Dessie-Woldiya Highway Expansion**, and a **New Water Treatment Plant**. Visit the City Projects section for details on all ongoing infrastructure projects.' }
  }

  if (lower.includes('hotel') || lower.includes('accommodation') || lower.includes('stay') || lower.includes('lodge')) {
    return { intent: 'hotels', response: 'Dessie offers various accommodation options ranging from budget to luxury. Featured hotels include **Dessie Grand Hotel**, **Mountain View Lodge**, **Blue Nile Hotel**, **Tana International**, and the premium **Starlight Resort & Spa**. Visit the Hotels section for pricing, photos, and booking information.' }
  }

  return null
}

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId = 'default' } = await req.json()
    if (!message?.trim()) return NextResponse.json({ error: 'Message required' }, { status: 400 })

    const matched = matchIntent(message)
    let response: string

    if (matched) {
      // Handle dynamic data responses
      if (matched.response === '__DYNAMIC_VACANCIES__') {
        const vacancies = await db.vacancy.findMany({ where: { status: 'Open', approvalStatus: 'approved' }, take: 5, select: { title: true, department: true, type: true, deadline: true } })
        response = vacancies.length
          ? `**Current Open Vacancies** (${vacancies.length} shown):\n${vacancies.map((v, i) => `${i + 1}. **${v.title}** — ${v.department} (${v.type})\n   Deadline: ${v.deadline}`).join('\n\n')}\n\nVisit the Vacancies section in Announcements for more details and to apply.`
          : 'There are currently no open vacancies listed. Please check back soon or visit the Announcements section for updates.'
      } else if (matched.response === '__DYNAMIC_BIDS__') {
        const bids = await db.bid.findMany({ where: { status: 'Open', approvalStatus: 'approved' }, take: 5, select: { title: true, reference: true, budget: true, deadline: true } })
        response = bids.length
          ? `**Current Open Bids & Tenders** (${bids.length} shown):\n${bids.map((b, i) => `${i + 1}. **${b.title}** — Ref: ${b.reference}\n   Budget: ${b.budget} | Deadline: ${b.deadline}`).join('\n\n')}\n\nVisit the Bids & Tenders section for full details and submission requirements.`
          : 'There are currently no open bids listed. Please check the Announcements section for new procurement opportunities.'
      } else if (matched.response === '__DYNAMIC_NEWS__') {
        const news = await db.newsArticle.findMany({ where: { approvalStatus: 'approved' }, take: 5, select: { title: true, category: true, createdAt: true }, orderBy: { createdAt: 'desc' } })
        response = news.length
          ? `**Latest News from Dessie City**:\n${news.map((n, i) => `${i + 1}. **${n.title}** — ${n.category} (${n.createdAt.toLocaleDateString()})`).join('\n\n')}\n\nVisit the News & Media section for the full articles.`
          : 'No recent news articles found. Please check back soon!'
      } else {
        response = matched.response
      }
    } else {
      response = `Thank you for your message. I can help you with:\n• **Services** — Birth registration, business licenses, building permits, and more\n• **News & Updates** — Latest city news and announcements\n• **Vacancies** — Current job openings\n• **Bids & Tenders** — Active procurement opportunities\n• **Tourism** — Heritage sites and attractions\n• **Contact** — Phone numbers and office locations\n• **Emergency** — Police, ambulance, and fire contacts\n\nPlease ask about any of these topics!`
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ response: 'I apologize, I\'m experiencing technical difficulties. Please call +251 33 111 0000 for assistance.' })
  }
}
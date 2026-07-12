'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageId } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Newspaper, Calendar, MapPin, Clock, ChevronLeft, ChevronRight,
} from 'lucide-react'

interface NewsPageProps {
  navigateTo: (page: PageId, extra?: Record<string, string>) => void
}

const articles = [
  { id: 'n1', title: 'DESSIE CITY COUNCIL APPROVES ETB 2.8 BILLION ANNUAL BUDGET FOR 2025/26 FISCAL YEAR', excerpt: 'The Dessie City Council has unanimously approved the municipal budget of ETB 2.8 billion for the 2025/26 fiscal year, with significant allocations for infrastructure development, education, healthcare, and digital transformation initiatives across all 12 kebeles.', date: 'Jul 12, 2025', category: 'Press Release', image: '/news-meeting.png', author: 'Communication Department' },
  { id: 'n2', title: 'SMART CITY DIGITAL PLATFORM LAUNCHED TO ENHANCE PUBLIC SERVICE DELIVERY', excerpt: 'Mayor Samuel Mollalign officially launched the Dessie Smart City Digital Platform, enabling citizens to access over 40 government services online including tax payments, permit applications, and service requests through a unified portal.', date: 'Jul 10, 2025', category: 'News', image: '/news-smart-city.png', author: 'IT Department' },
  { id: 'n3', title: 'NEW 500-HECTARE INDUSTRIAL ZONE CONSTRUCTION BEGINS ON EASTERN OUTSKIRTS', excerpt: 'Construction has officially begun on the Dessie Industrial Zone, a 500-hectare development project expected to attract over ETB 10 billion in investment and create more than 5,000 permanent jobs for residents of Dessie and surrounding areas.', date: 'Jul 8, 2025', category: 'News', image: '/news-industry.png', author: 'Investment Office' },
  { id: 'n4', title: 'DESSIE-WOLDIYA HIGHWAY EXPANSION REACHES 75% COMPLETION MILESTONE', excerpt: 'The major highway expansion project connecting Dessie to Woldiya has reached 75% completion. The 45km road upgrade includes four-lane highways, modern bridges, and pedestrian pathways, expected to be fully operational by October 2025.', date: 'Jul 5, 2025', category: 'News', image: '/news-road.png', author: 'Engineering Department' },
  { id: 'n5', title: 'ANNUAL DESSIE CULTURAL FESTIVAL SCHEDULED FOR AUGUST 5-8 WITH REGIONAL PARTICIPATION', excerpt: 'The much-anticipated annual Dessie Cultural Festival will bring together performers and visitors from across the Amhara Region and beyond. The four-day event features traditional music, dance, art exhibitions, and a showcase of local cuisine and crafts.', date: 'Jul 3, 2025', category: 'Event', image: '/news-culture.png', author: 'Culture & Tourism Bureau' },
  { id: 'n6', title: 'NEW COMPREHENSIVE HEALTH CENTER INAUGURATED IN KEBELE 08', excerpt: 'A state-of-the-art health center has been inaugurated in Kebele 08, providing essential healthcare services including maternity care, pediatrics, laboratory testing, and pharmacy services to over 50,000 residents in the eastern part of the city.', date: 'Jun 30, 2025', category: 'News', image: '/news-health.png', author: 'Health Bureau' },
  { id: 'n7', title: 'CITY ADMINISTRATION SIGNS MOU WITH DESSIE UNIVERSITY FOR RESEARCH COLLABORATION', excerpt: 'Dessie City Administration and Dessie University have signed a Memorandum of Understanding to collaborate on urban planning research, digital governance solutions, and community development programs that will benefit both the city and academic community.', date: 'Jun 28, 2025', category: 'News', image: '/news-ceremony.png', author: 'Communication Department' },
  { id: 'n8', title: 'MAJOR URBAN INFRASTRUCTURE PROJECT INCLUDES 15KM WATER PIPELINE AND DRAINAGE SYSTEM', excerpt: 'The city has launched a comprehensive infrastructure project including a 15km water pipeline extension, modern stormwater drainage system, and road rehabilitation in six kebeles, funded through a partnership with the regional government and international development partners.', date: 'Jun 25, 2025', category: 'News', image: '/news-infrastructure.png', author: 'Engineering Department' },
  { id: 'n9', title: 'PUBLIC CONSULTATION FORUM ON NEW CITY MASTER PLAN ATTRACTS OVER 2,000 RESIDENTS', excerpt: 'More than 2,000 residents participated in the public consultation forum for Dessie\'s new 10-year comprehensive master plan, providing valuable input on zoning, transportation, public spaces, and environmental conservation priorities.', date: 'Jun 22, 2025', category: 'Announcement', image: '/news-meeting.png', author: 'Urban Planning Department' },
  { id: 'n10', title: 'DIGITAL LITERACY TRAINING PROGRAM LAUNCHED FOR 10,000 YOUTH ACROSS ALL KEBELES', excerpt: 'A comprehensive digital literacy training program has been launched targeting 10,000 young people across all 12 kebeles. The program covers basic computer skills, internet safety, e-government services, and entrepreneurial digital skills.', date: 'Jun 20, 2025', category: 'Announcement', image: '/news-smart-city.png', author: 'Youth & Sport Bureau' },
]

const events = [
  { title: 'City Development Forum', date: 'Jul 15, 2025', location: 'City Hall Conference Center', desc: 'Annual stakeholder forum on development strategy and progress review.' },
  { title: 'Cultural Festival', date: 'Aug 5-8, 2025', location: 'Dessie Stadium & City Square', desc: 'Four-day celebration of Amhara culture with music, dance, and art exhibitions.' },
  { title: 'Youth Entrepreneurship Summit', date: 'Aug 20, 2025', location: 'Dessie University', desc: 'Summit connecting young entrepreneurs with mentors and funding opportunities.' },
  { title: 'Environmental Cleanup Campaign', date: 'Jul 25, 2025', location: 'All Kebeles', desc: 'Citywide volunteer cleanup campaign to promote environmental awareness.' },
  { title: 'Health Screening Week', date: 'Aug 1-7, 2025', location: 'All Health Centers', desc: 'Free health screenings including blood pressure, diabetes, and eye tests.' },
  { title: 'Digital Literacy Workshop', date: 'Aug 12, 2025', location: 'Public Library', desc: 'Free workshops teaching basic computer and internet skills to citizens.' },
]

const categoryTabs = ['All', 'News', 'Press Release', 'Event', 'Announcement']

const ITEMS_PER_PAGE = 4

function Pagination({ total, perPage, current, onChange }: { total: number; perPage: number; current: number; onChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => onChange(current - 1)} disabled={current === 0} className="w-9 h-9 rounded-lg bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#155d33] transition-colors">
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => onChange(i)} className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors ${current === i ? 'bg-[#c62828] text-white' : 'bg-white text-[#333] border border-[#e2e8e0] hover:border-[#1a6b3c]'}`}>
          {i + 1}
        </button>
      ))}
      <button onClick={() => onChange(current + 1)} disabled={current >= totalPages - 1} className="w-9 h-9 rounded-lg bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#155d33] transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function NewsPage({ navigateTo }: NewsPageProps) {
  const [activeTab, setActiveTab] = useState('All')
  const [page, setPage] = useState(0)

  const filtered = activeTab === 'All' ? articles : articles.filter(a => {
    if (activeTab === 'Press Release') return a.category === 'Press Release'
    return a.category === activeTab
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setPage(0)
  }

  const pagedArticles = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Newspaper className="w-12 h-12 text-[#c8a415] mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider gov-heading-display">Latest News</h1>
            <p className="mt-4 text-green-200 text-lg">Latest updates, press releases, and announcements from Dessie City Administration</p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
            {categoryTabs.map(tab => (
              <button key={tab} onClick={() => handleTabChange(tab)} className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === tab ? 'bg-[#1a6b3c] text-white' : 'bg-[#f0f4f0] text-muted-foreground hover:bg-[#e8f5e9]'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News List */}
      <section className="bg-[#f8faf8] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground gov-section-title mb-6">
            {activeTab === 'All' ? 'All News' : activeTab} ({filtered.length})
          </h2>

          <div className="space-y-4">
            {pagedArticles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-xl border border-[#e2e8e0] hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigateTo('news-detail', { newsId: article.id })}
              >
                <img src={article.image} alt="" className="w-full sm:w-48 h-36 sm:h-32 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-[#1a6b3c] text-white text-xs">{article.category}</Badge>
                    <span className="text-xs text-gray-500">{article.date}</span>
                    <span className="text-xs text-gray-400 hidden sm:inline">• {article.author}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base uppercase leading-tight text-[#1a1a1a]">{article.title}</h3>
                  <div className="w-12 h-0.5 bg-[#c62828] my-2" />
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{article.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {pagedArticles.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Newspaper className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No articles found for this category</p>
            </div>
          )}

          <Pagination total={filtered.length} perPage={ITEMS_PER_PAGE} current={page} onChange={setPage} />
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Upcoming Events Sidebar */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground gov-section-title mb-8 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#c8a415]" /> Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="p-5 rounded-xl border border-[#e2e8e0] bg-[#f8faf8] hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-[#e8f5e9] flex items-center justify-center shrink-0">
                      <Calendar className="w-7 h-7 text-[#1a6b3c]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{e.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{e.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{e.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
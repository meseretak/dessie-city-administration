'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/LangContext'
import { FileText, Calendar, Briefcase, DollarSign, Clock, Building2, Gavel, ChevronRight, AlertTriangle } from 'lucide-react'

interface AnnouncementsPageProps {
  navigateTo: (page: import('@/lib/types').PageId, extra?: any) => void
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// --- News Data ---
const newsItems = [
  { id: 'smart-city-launch', title: 'Smart City Initiative Phase II Launch', date: 'Jul 10, 2025', category: 'Technology', excerpt: 'The city administration announces the second phase of the Smart City Initiative, bringing enhanced digital governance, IoT-enabled infrastructure monitoring, and expanded e-services for all residents.' },
  { id: 'industrial-zone', title: 'New Industrial Zone Approved for Kebele 08', date: 'Jul 8, 2025', category: 'Economy', excerpt: 'City council has approved the establishment of a new industrial zone in Kebele 08, expected to create over 5,000 jobs and attract significant investment to the region.' },
  { id: 'annual-budget', title: 'Annual Budget FY 2025/26 Released', date: 'Jul 5, 2025', category: 'Finance', excerpt: 'The municipal budget for the upcoming fiscal year has been published, with increased allocations for infrastructure, education, health services, and digital transformation.' },
  { id: 'road-construction', title: 'Major Road Construction Update', date: 'Jul 2, 2025', category: 'Infrastructure', excerpt: 'Progress report on the ongoing road construction projects across the city, including the Dessie-Woldiya highway expansion now 75% complete.' },
  { id: 'youth-program', title: 'Youth Employment Program Results', date: 'Jun 28, 2025', category: 'Social', excerpt: 'Over 5,000 youth have benefited from the city employment program, with 3,200 successfully placed in permanent positions across various departments.' },
  { id: 'digital-services', title: 'Digital Services Platform Expansion', date: 'Jun 25, 2025', category: 'Technology', excerpt: 'Five new government services are now available online through the citizen portal, including business license renewal and property tax payment.' },
]

// --- Vacancy Data ---
const vacancyItems = [
  { id: 'v1', title: 'Senior Urban Planner', department: 'Planning & Development', type: 'Full-Time', salary: 'ETB 25,000 - 35,000', deadline: 'Aug 15, 2025', status: 'Open' as const },
  { id: 'v2', title: 'IT Systems Administrator', department: 'Digital Services', type: 'Full-Time', salary: 'ETB 20,000 - 28,000', deadline: 'Aug 10, 2025', status: 'Open' as const },
  { id: 'v3', title: 'Civil Engineer', department: 'Infrastructure', type: 'Contract', salary: 'ETB 30,000 - 45,000', deadline: 'Jul 30, 2025', status: 'Open' as const },
  { id: 'v4', title: 'Public Relations Officer', department: 'Communication', type: 'Full-Time', salary: 'ETB 18,000 - 24,000', deadline: 'Jul 25, 2025', status: 'Closed' as const },
  { id: 'v5', title: 'Finance Analyst', department: 'Finance', type: 'Full-Time', salary: 'ETB 22,000 - 30,000', deadline: 'Aug 5, 2025', status: 'Open' as const },
]

// --- Bid Data ---
const bidItems = [
  { id: 'b1', title: 'Road Construction — Kebele 05 to 07', reference: 'DCA/PROC/2025/038', category: 'Construction', deadline: 'Aug 20, 2025', budget: 'ETB 45,000,000', status: 'Open' as const },
  { id: 'b2', title: 'Office Furniture Supply', reference: 'DCA/PROC/2025/039', category: 'Supply', deadline: 'Aug 5, 2025', budget: 'ETB 2,500,000', status: 'Open' as const },
  { id: 'b3', title: 'IT Equipment Procurement', reference: 'DCA/PROC/2025/040', category: 'Technology', deadline: 'Jul 28, 2025', budget: 'ETB 8,000,000', status: 'Closed' as const },
  { id: 'b4', title: 'Water Pipeline Extension Project', reference: 'DCA/PROC/2025/041', category: 'Construction', deadline: 'Sep 1, 2025', budget: 'ETB 62,000,000', status: 'Open' as const },
]

// --- Status Badge Helper ---
function StatusBadge({ status }: { status: 'Open' | 'Closed' | 'Awarded' }) {
  if (status === 'Open') {
    return <Badge className="bg-[#1a6b3c] text-white text-xs font-medium">● OPEN</Badge>
  }
  if (status === 'Closed') {
    return <Badge variant="secondary" className="bg-gray-100 text-gray-500 text-xs font-medium">● CLOSED</Badge>
  }
  return <Badge className="bg-[#c8a415] text-white text-xs font-medium">● AWARDED</Badge>
}

// --- Announcements Data ---
const staticAnnouncements = [
  { id: 'a1', title: 'City Council Meeting Next Week', date: 'Jul 20, 2025', category: 'Important', excerpt: 'The monthly city council meeting will be held next Tuesday to discuss the budget.' },
  { id: 'a2', title: 'Public Holiday Notice', date: 'Jul 15, 2025', category: 'General', excerpt: 'All city offices will be closed on Friday in observance of the national holiday.' },
  { id: 'a3', title: 'Water Supply Interruption', date: 'Jul 12, 2025', category: 'Important', excerpt: 'Temporary water supply interruption in Kebele 04 and 05 due to maintenance work.' },
]

export default function AnnouncementsPage({ navigateTo }: AnnouncementsPageProps) {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [dbNews, setDbNews] = useState<any[]>([])
  const [dbAnnouncements, setDbAnnouncements] = useState<any[]>([])

  useEffect(() => {
    // Fetch news from DB
    fetch('/api/admin/news')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data?.length > 0) setDbNews(data.filter(a => a.approvalStatus === 'approved' || a.status === 'published'))
      }).catch(() => {})
    // Fetch announcements from DB
    fetch('/api/admin/announcements')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data?.length > 0) setDbAnnouncements(data.filter(a => a.approvalStatus === 'approved' || a.status === 'active'))
      }).catch(() => {})
  }, [])

  const allNews = dbNews.length > 0 ? dbNews : newsItems
  const allAnnouncements = dbAnnouncements.length > 0 ? dbAnnouncements.map(a => ({
    id: a.id, title: a.title, date: a.startDate || a.createdAt || '', category: a.priority === 'high' ? 'Important' : 'General',
    excerpt: a.content?.substring(0, 150) || ''
  })) : staticAnnouncements

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider gov-heading-display">{isAm ? 'ማስታወቂያዎች' : 'Announcements'}</h1>
            <p className="mt-4 text-green-200 text-lg">{isAm ? 'ዜናዎች፣ ክፍት የስራ ቦታዎችና ጨረታዎች ከደሴ ከተማ አስተዳደር' : 'News, vacancies, and procurement opportunities from Dessie City Administration'}</p>
            <nav className="mt-3 text-green-300/70 text-sm">
              <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigateTo('home')}>Home</span>
              <span className="mx-2">/</span>
              <span className="text-white font-medium">Announcements</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="h-auto p-1 bg-[#f0f4f0] rounded-lg">
              <TabsTrigger value="news" className="data-[state=active]:bg-[#1a6b3c] data-[state=active]:text-white px-6 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-md transition-all">
                {isAm ? 'ዜናዎች' : 'News & Media'}
              </TabsTrigger>
              <TabsTrigger value="vacancies" className="data-[state=active]:bg-[#1a6b3c] data-[state=active]:text-white px-6 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-md transition-all">
                {isAm ? 'ክፍት ቦታዎች' : 'Vacancies'}
              </TabsTrigger>
              <TabsTrigger
                value="bids"
                className="data-[state=active]:bg-[#1a6b3c] data-[state=active]:text-white px-6 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-md transition-all"
              >
                Bids &amp; Tenders
              </TabsTrigger>
            </TabsList>

            {/* ===== NEWS TAB ===== */}
            <TabsContent value="news" className="mt-8 pb-12">
              <h2 className="text-2xl font-bold text-foreground gov-section-title mb-8">
                Latest News &amp; Media
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {newsItems.map((item) => (
                  <motion.div key={item.id} variants={fadeInUp} transition={{ duration: 0.4 }}>
                    <Card className="overflow-hidden border border-border hover:shadow-lg transition-shadow h-full flex flex-col group">
                      <div className="h-48 bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] flex items-center justify-center relative">
                        <FileText className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform" />
                        <Badge className="absolute top-3 left-3 bg-white/90 text-[#0d4a28] text-xs font-semibold">
                          {item.category}
                        </Badge>
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-[#1a6b3c] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                          <Button
                            variant="link"
                            className="text-[#1a6b3c] p-0 h-auto text-sm font-semibold"
                            onClick={() => navigateTo('news-detail', { newsId: item.id })}
                          >
                            READ MORE <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* ===== VACANCIES TAB ===== */}
            <TabsContent value="vacancies" className="mt-8 pb-12">
              <h2 className="text-2xl font-bold text-foreground gov-section-title mb-8">
                Current Vacancies
              </h2>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {vacancyItems.map((item) => (
                  <motion.div key={item.id} variants={fadeInUp} transition={{ duration: 0.4 }}>
                    <Card className="overflow-hidden border border-border hover:shadow-lg transition-shadow h-full flex flex-col">
                      <CardContent className="p-5 flex-1 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <StatusBadge status={item.status} />
                          <Badge variant="outline" className="border-[#c8a415] text-[#c8a415] font-medium text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                            <span>{item.department}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                            <span>{item.salary}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertTriangle className="w-4 h-4 text-[#c8a415] shrink-0" />
                            <span>Deadline: {item.deadline}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button
                            className={`w-full ${item.status === 'Open' ? 'bg-[#1a6b3c] hover:bg-[#0d4a28] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                            disabled={item.status === 'Closed'}
                            onClick={() => navigateTo('vacancy-detail', { vacancyId: item.id })}
                          >
                            VIEW DETAILS <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* ===== BIDS TAB ===== */}
            <TabsContent value="bids" className="mt-8 pb-12">
              <h2 className="text-2xl font-bold text-foreground gov-section-title mb-8">
                Bids &amp; Tenders
              </h2>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {bidItems.map((item) => (
                  <motion.div key={item.id} variants={fadeInUp} transition={{ duration: 0.4 }}>
                    <Card className="overflow-hidden border border-border hover:shadow-lg transition-shadow h-full flex flex-col">
                      <CardContent className="p-5 flex-1 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <StatusBadge status={item.status} />
                          <Badge variant="outline" className="border-[#1a6b3c] text-[#1a6b3c] font-medium text-xs bg-[#e8f5e9]">
                            {item.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs font-mono text-muted-foreground bg-gray-100">
                            {item.reference}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                            <span>Budget: {item.budget}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 text-[#c8a415] shrink-0" />
                            <span>Deadline: {item.deadline}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button
                            className={`w-full ${item.status === 'Open' ? 'bg-[#1a6b3c] hover:bg-[#0d4a28] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                            disabled={item.status !== 'Open'}
                            onClick={() => navigateTo('bids-detail', { bidId: item.id })}
                          >
                            VIEW DETAILS <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
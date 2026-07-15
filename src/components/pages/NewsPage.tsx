'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PageId } from '@/lib/types'
import type { Lang } from '@/lib/i18n'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Newspaper, Calendar, MapPin, Clock, ChevronLeft, ChevronRight,
  Search, ArrowRight, Eye,
} from 'lucide-react'

interface NewsPageProps {
  navigateTo: (page: PageId, extra?: Record<string, string>) => void
  lang?: Lang
}

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image?: string
  author?: string
  status: string
  approvalStatus: string
  createdAt: string
}

const categoryTabsEn = ['All', 'News', 'Smart City', 'Infrastructure', 'Press Release', 'Event', 'Health', 'Culture', 'Technology', 'Education']
const categoryTabsAm = ['ሁሉም', 'ዜና', 'ስማርት ሲቲ', 'መሠረተ ልማት', 'ፕሬስ ሪሊዝ', 'ዝግጅት', 'ጤና', 'ባህል', 'ቴክኖሎጂ', 'ትምህርት']
const categoryTabs = categoryTabsEn

/** Get the first image from a field that may be a single URL or a JSON array */
function getFirstImage(raw?: string, fallback = '/news-meeting.png'): string {
  if (!raw) return fallback
  const r = raw.trim()
  if (r.startsWith('[')) {
    try {
      const arr = JSON.parse(r)
      return Array.isArray(arr) && arr.length > 0 ? arr[0] : fallback
    } catch { /* fall through */ }
  }
  return r || fallback
}
const ITEMS_PER_PAGE = 6

const events = [
  { title: 'City Development Forum', date: 'Jul 15, 2025', location: 'City Hall', desc: 'Annual stakeholder forum on development strategy.' },
  { title: 'Cultural Festival', date: 'Aug 5-8, 2025', location: 'Dessie Stadium', desc: 'Four-day celebration of Amhara culture and heritage.' },
  { title: 'Youth Entrepreneurship Summit', date: 'Aug 20, 2025', location: 'Dessie University', desc: 'Connecting young entrepreneurs with mentors.' },
  { title: 'Environmental Cleanup', date: 'Jul 25, 2025', location: 'All Kebeles', desc: 'Citywide volunteer cleanup campaign.' },
  { title: 'Health Screening Week', date: 'Aug 1-7, 2025', location: 'All Health Centers', desc: 'Free health screenings for all residents.' },
  { title: 'Digital Literacy Workshop', date: 'Aug 12, 2025', location: 'Public Library', desc: 'Free computer and internet skills workshop.' },
]

export default function NewsPage({ navigateTo, lang = 'en' }: NewsPageProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/news')
      .then(r => r.ok ? r.json() : [])
      .then((data: Article[]) => {
        // Only show published/approved articles
        const published = data.filter(a => a.approvalStatus === 'approved' || a.status === 'published')
        setArticles(published)
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = articles.filter(a => {
    const matchTab = activeTab === 'All' || a.category === activeTab
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pagedArticles = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const handleTabChange = (tab: string) => { setActiveTab(tab); setPage(0) }
  const handleSearch = (q: string) => { setSearch(q); setPage(0) }

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Banner */}
      <section className="bg-[#0d4a28] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Newspaper className="w-6 h-6 text-[#c8a415]" />
                <span className="text-green-300 text-sm font-medium uppercase tracking-widest">{lang === 'am' ? 'ሚዲያ ማዕከል' : 'Media Center'}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">{lang === 'am' ? 'ዜናዎችና ማስታወቂያዎች' : 'NEWS & ANNOUNCEMENTS'}</h1>
              <p className="mt-2 text-green-200 text-sm">{lang === 'am' ? 'ከደሴ ከተማ አስተዳደር የቅርብ ጊዜ ዝማኔዎች' : 'Latest updates from Dessie City Administration'}</p>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder={lang === 'am' ? 'ዜናዎችን ፈልግ...' : 'Search news...'}
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#c8a415]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white border-b border-[#e2e8e0] sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {categoryTabs.map((tab, idx) => (
              <button key={tab} onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === tab ? 'bg-[#0d4a28] text-white shadow-sm' : 'bg-[#f0f4f0] text-[#555] hover:bg-[#e8f5e9] hover:text-[#0d4a28]'}`}>
                {lang === 'am' ? (categoryTabsAm[idx] || tab) : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* News Grid — 2/3 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold text-[#0d4a28]">
                {activeTab === 'All' ? 'All News' : activeTab}
                <span className="ml-2 text-sm font-normal text-[#9ca3af]">({filtered.length} articles)</span>
              </h2>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1,2,3,4].map(n => <Skeleton key={n} className="h-40 w-full rounded-xl" />)}
              </div>
            ) : pagedArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <Newspaper className="w-14 h-14 mx-auto mb-3 text-[#d1d5db]" />
                <p className="font-bold text-[#374151]">{lang === 'am' ? 'ምንም ጽሁፎች አልተገኙም' : 'No articles found'}</p>
                <p className="text-sm text-[#9ca3af] mt-1">{lang === 'am' ? 'ሌላ ምድብ ወይም ቃል ይሞክሩ' : 'Try a different category or search term'}</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={`${activeTab}-${page}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-5">
                  {pagedArticles.map((article, i) => (
                    <motion.div key={article.id}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="bg-white rounded-2xl border border-[#e2e8e0] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer group"
                      onClick={() => navigateTo('news-detail', { newsId: article.id })}>
                      <div className="flex flex-col sm:flex-row">
                        {/* Image — bigger */}
                        <div className="w-full sm:w-56 h-48 sm:h-44 shrink-0 overflow-hidden relative">
                          <img src={getFirstImage(article.image)} alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#c62828] text-white px-2 py-1 rounded">
                            {article.category}
                          </span>
                        </div>
                        {/* Content */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs text-[#9ca3af] font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                              {article.author && (
                                <span className="text-xs text-[#9ca3af]">• {article.author}</span>
                              )}
                            </div>
                            <h3 className="font-extrabold text-base text-[#1a1a1a] group-hover:text-[#c62828] transition-colors leading-snug mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            <div className="w-10 h-0.5 bg-[#c62828] rounded mb-2" />
                            <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-3">{article.excerpt}</p>
                          </div>
                          <div className="mt-4 flex items-center gap-1.5 text-sm font-bold text-[#c62828]">
                            <Eye className="w-4 h-4" /> {lang === 'am' ? 'ሙሉ ጽሁፍ አንብብ' : 'Read Full Article'} <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="w-9 h-9 rounded-xl border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${page === i ? 'bg-[#c62828] text-white shadow-md' : 'border border-[#e2e8e0] text-[#6b7280] hover:border-[#c62828] hover:text-[#c62828]'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                  className="w-9 h-9 rounded-xl border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar — 1/3 */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl border border-[#e2e8e0] overflow-hidden">
              <div className="bg-[#0d4a28] px-4 py-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#c8a415]" />
                <h3 className="font-bold text-white text-sm">UPCOMING EVENTS</h3>
              </div>
              <div className="divide-y divide-[#f0f0f0]">
                {events.map((e, i) => (
                  <div key={i} className="p-4 hover:bg-[#f8faf8] transition-colors cursor-pointer">
                    <h4 className="font-bold text-sm text-[#1a1a1a] mb-1">{e.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-[#9ca3af] mb-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                    </div>
                    <p className="text-xs text-[#6b7280]">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest 3 articles sidebar */}
            <div className="bg-white rounded-2xl border border-[#e2e8e0] overflow-hidden">
              <div className="bg-[#c62828] px-4 py-3 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-white" />
                <h3 className="font-bold text-white text-sm">MOST RECENT</h3>
              </div>
              <div className="divide-y divide-[#f0f0f0]">
                {articles.slice(0, 4).map((a, i) => (
                  <div key={i} className="p-3 flex gap-3 hover:bg-[#f8faf8] transition-colors cursor-pointer group"
                    onClick={() => navigateTo('news-detail', { newsId: a.id })}>
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <img src={getFirstImage(a.image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#1a1a1a] group-hover:text-[#c62828] transition-colors line-clamp-2">{a.title}</p>
                      <p className="text-[10px] text-[#9ca3af] mt-0.5">{new Date(a.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

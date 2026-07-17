'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PageId } from '@/lib/types'
import type { Lang } from '@/lib/i18n'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Newspaper, Calendar, MapPin, Clock, ChevronLeft, ChevronRight,
  Search, ArrowRight, Eye, Sparkles
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
]

export default function NewsPage({ navigateTo, lang = 'en' }: NewsPageProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const isAm = lang === 'am'
  const categoryTabs = isAm ? categoryTabsAm : categoryTabsEn

  useEffect(() => {
    fetch('/api/admin/news')
      .then(r => r.ok ? r.json() : [])
      .then((data: Article[]) => {
        const published = data.filter(a => a.approvalStatus === 'approved' || a.status === 'published')
        setArticles(published)
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = articles.filter(a => {
    const matchTab = activeTab === 'All' || activeTab === 'ሁሉም' || a.category === activeTab || (isAm && a.category === categoryTabsEn[categoryTabsAm.indexOf(activeTab)])
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const pagedArticles = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const handleTabChange = (tab: string) => { setActiveTab(tab); setPage(0) }
  const handleSearch = (q: string) => { setSearch(q); setPage(0) }

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Page Banner */}
      <section className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] py-12 text-center relative overflow-hidden">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full border-[20px] border-white/5 border-dashed" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full border-[15px] border-[#c8a415]/10 border-dashed" />
          <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border-2 border-white/20 animate-[ping_4s_ease-in-out_infinite]" />
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#c8a415] animate-pulse" />
            <p className="text-[#c8a415] text-xs tracking-widest font-bold uppercase">{isAm ? 'ሚዲያ ማዕከል' : 'Media Center'}</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">{isAm ? 'ዜናዎችና ማስታወቂያዎች' : 'NEWS & ANNOUNCEMENTS'}</h1>
          <Separator className="w-20 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1 mb-8 border-0 rounded-full" />
          
          {/* Search Box in Banner */}
          <div className="relative w-full max-w-md mx-auto shadow-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder={isAm ? 'ዜናዎችን ፈልግ...' : 'Search news...'}
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="pl-12 py-6 bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#c8a415] font-medium text-lg w-full shadow-lg"
            />
          </div>
        </motion.div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar items-center">
            {categoryTabs.map((tab, idx) => (
              <button key={tab} onClick={() => handleTabChange(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] text-white shadow-md transform -translate-y-0.5' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#0d4a28]'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* News Grid — 2/3 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-[#0d4a28] flex items-center gap-3">
                <Newspaper className="w-6 h-6 text-[#c8a415]" />
                {activeTab === 'All' || activeTab === 'ሁሉም' ? 'Latest Headlines' : activeTab}
              </h2>
              <span className="text-sm font-bold bg-white px-3 py-1 rounded-full text-gray-500 shadow-sm border border-gray-100">{filtered.length} {isAm ? 'ጽሁፎች' : 'Articles'}</span>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1,2,3,4].map(n => <Skeleton key={n} className="h-48 w-full rounded-2xl bg-gray-200/50" />)}
              </div>
            ) : pagedArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
                <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="font-extrabold text-gray-900 text-xl mb-2">{isAm ? 'ምንም ጽሁፎች አልተገኙም' : 'No articles found'}</p>
                <p className="text-sm text-gray-500 font-medium">{isAm ? 'ሌላ ምድብ ወይም ቃል ይሞክሩ' : 'Try a different category or search term'}</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={`${activeTab}-${page}`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-6">
                  {pagedArticles.map((article, i) => (
                    <motion.div key={article.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:shadow-[#1a6b3c]/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group relative"
                      onClick={() => navigateTo('news-detail', { newsId: article.id })}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex flex-col sm:flex-row p-4 gap-6 relative z-10">
                        {/* Image */}
                        <div className="w-full sm:w-72 h-64 sm:h-56 shrink-0 overflow-hidden relative rounded-[1.5rem] shadow-md">
                          <img src={getFirstImage(article.image)} alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          <span className="absolute bottom-4 left-4 text-xs font-black bg-[#c8a415] text-[#0d4a28] px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                            {article.category}
                          </span>
                        </div>
                        {/* Content */}
                        <div className="flex-1 py-2 pr-4 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs text-gray-500 font-bold flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md">
                                <Clock className="w-3.5 h-3.5 text-[#1a6b3c]" />
                                {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                              {article.author && (
                                <span className="text-xs text-gray-400 font-medium tracking-wide flex items-center gap-1">
                                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                                  {article.author}
                                </span>
                              )}
                            </div>
                            <h3 className="font-extrabold text-xl md:text-2xl text-gray-900 group-hover:text-[#1a6b3c] transition-colors leading-snug mb-3 line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 font-medium">{article.excerpt}</p>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-sm font-black text-[#0d4a28] group-hover:text-[#c8a415] transition-colors uppercase tracking-widest">
                            <Eye className="w-4 h-4" /> {isAm ? 'ሙሉ ጽሁፍ አንብብ' : 'Read Article'} <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
              <div className="flex items-center justify-center gap-2 mt-12">
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center disabled:opacity-30 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === i ? 'bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c]'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center disabled:opacity-30 hover:border-[#1a6b3c] hover:text-[#1a6b3c] transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar — 1/3 */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a415]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
              <div className="bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] px-6 py-5 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#c8a415]" />
                <h3 className="font-extrabold text-white text-sm tracking-widest uppercase">UPCOMING EVENTS</h3>
              </div>
              <div className="divide-y divide-gray-100 relative z-10 bg-white/80 backdrop-blur-sm">
                {events.map((e, i) => (
                  <div key={i} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group/item">
                    <h4 className="font-bold text-sm text-gray-900 mb-2 group-hover/item:text-[#1a6b3c] transition-colors">{e.title}</h4>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-bold text-gray-500 mb-2">
                      <span className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md"><Clock className="w-3.5 h-3.5 text-[#c8a415]" />{e.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#1a6b3c]" />{e.location}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest articles sidebar */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden relative">
              <div className="bg-gradient-to-r from-[#c8a415] to-[#a88810] px-6 py-5 flex items-center gap-3">
                <Newspaper className="w-5 h-5 text-[#0d4a28]" />
                <h3 className="font-extrabold text-[#0d4a28] text-sm tracking-widest uppercase">MOST RECENT</h3>
              </div>
              <div className="divide-y divide-gray-100 bg-white">
                {articles.slice(0, 4).map((a, i) => (
                  <div key={i} className="p-5 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => navigateTo('news-detail', { newsId: a.id })}>
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                      <img src={getFirstImage(a.image)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm font-extrabold text-gray-900 group-hover:text-[#1a6b3c] transition-colors line-clamp-2 leading-snug mb-1">{a.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(a.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

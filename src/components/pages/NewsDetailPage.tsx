'use client'

import { motion } from 'framer-motion'
import { PageId } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft, Calendar, User, ChevronRight, FileText, Share2, Twitter,
  Facebook, Linkedin, Mail, Eye, Clock, MapPin, Building2, TrendingUp,
  Globe, Award, Heart, Star, ArrowRight
} from 'lucide-react'

interface NewsDetailPageProps {
  newsId: string | null
  navigateTo: (page: PageId, extra?: Record<string, string>) => void
}

const articleData: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  n1: {
    title: 'Smart City Platform Launch', category: 'News', date: 'Jul 10, 2025',
    content: [
      'Dessie City Administration has officially launched its state-of-the-art Smart City Platform, marking a significant milestone in the city\'s digital transformation journey. The platform integrates real-time data from transportation networks, utility systems, and public service delivery points to provide city administrators with comprehensive dashboards and analytics tools.',
      'The platform, developed in partnership with leading Ethiopian technology firms, features modules for traffic management, waste collection optimization, water distribution monitoring, and citizen complaint tracking. Mayor Alemayehu stated that this initiative represents the administration\'s commitment to leveraging technology for better governance and improved service delivery to the 200,000+ residents of Dessie.',
      'Key features include a citizen-facing mobile application that allows residents to report issues, pay bills, and access city services directly from their smartphones. The platform also incorporates IoT sensors installed at critical infrastructure points to monitor performance and predict maintenance needs before failures occur.',
      'The Smart City Platform is expected to save the city an estimated ETB 15 million annually through optimized resource allocation and reduced emergency response times. Training programs for city staff on the new system are already underway, with full operational capability expected by September 2025.',
      'This launch positions Dessie as one of the leading smart cities in Ethiopia, alongside Addis Ababa and Hawassa. The administration plans to expand the platform with additional modules for education, healthcare, and environmental monitoring in the next fiscal year.',
    ]
  },
  n2: {
    title: 'Industrial Zone Approved by Council', category: 'News', date: 'Jul 8, 2025',
    content: [
      'The Dessie City Council has unanimously approved the establishment of a new industrial zone on 500 hectares of land on the eastern outskirts of the city. The project, which has been in the planning stages for over two years, is expected to transform Dessie into a major manufacturing hub for the Amhara region.',
      'The industrial zone will feature purpose-built facilities for textile manufacturing, agro-processing, and construction materials production. Infrastructure development, including roads, water supply, and electrical connections, is expected to begin in Q1 2026, with the first factories operational by mid-2027.',
      'Economic projections indicate that the industrial zone will create over 5,000 direct jobs and an additional 15,000 indirect employment opportunities in supply chain and services. The city administration has already received expressions of interest from 23 domestic and international companies.',
      'Mayor Alemayehu emphasized that the project includes strong environmental safeguards, with dedicated waste treatment facilities and green buffer zones. The administration is working with the Environmental Protection Authority to ensure all operations meet national and international environmental standards.',
    ]
  }
}

const getArticle = (id: string) => articleData[id] || {
  title: id ? `Article #${id}` : 'Article Not Found', category: 'News', date: 'Jul 2025',
  content: [
    'This article contains detailed information about the latest developments at Dessie City Administration. The administration continues to work tirelessly to improve services and infrastructure for all residents.',
    'Key initiatives underway include infrastructure modernization, digital transformation, and community development programs. These efforts are aligned with the city\'s five-year strategic development plan.',
    'Citizens are encouraged to stay informed through official channels and participate in community engagement activities. The administration values public feedback and continues to strengthen its communication with residents.',
    'For more information about this topic, please contact the Dessie City Communication Office or visit the city administration headquarters during business hours.',
  ]
}

const relatedArticles = [
  { id: 'n2', title: 'Industrial Zone Approved by Council', date: 'Jul 8, 2025', category: 'News' },
  { id: 'n3', title: 'FY2025/26 Annual Budget Released', date: 'Jul 5, 2025', category: 'Press Release' },
  { id: 'n4', title: 'Major Road Expansion 75% Complete', date: 'Jul 2, 2025', category: 'News' },
]

export default function NewsDetailPage({ newsId, navigateTo }: NewsDetailPageProps) {
  const article = getArticle(newsId || '')

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
              <FileText className="w-4 h-4" />
              <span>NEWS & MEDIA</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{article.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider gov-heading-display leading-tight">{article.title}</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigateTo('news')} className="mb-8 text-[#1a6b3c] hover:bg-[#e8f5e9]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
        </Button>

        {/* Article Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline" className="border-[#1a6b3c] text-[#1a6b3c]">{article.category}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Calendar className="w-4 h-4" />{article.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Dessie City Communication Office</span>
          </div>
        </motion.div>

        <Separator className="mb-8" />

        {/* Article Body */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="prose max-w-none">
          {article.content.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-6 text-base">{p}</p>
          ))}
        </motion.div>

        <Separator className="my-10" />

        {/* Share Section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-foreground flex items-center gap-1.5"><Share2 className="w-4 h-4" />Share:</span>
            <div className="flex gap-2">
              {[
                { icon: Twitter, label: 'Twitter', color: 'hover:bg-[#1a6b3c] hover:text-white' },
                { icon: Facebook, label: 'Facebook', color: 'hover:bg-[#1a6b3c] hover:text-white' },
                { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-[#1a6b3c] hover:text-white' },
                { icon: Mail, label: 'Email', color: 'hover:bg-[#1a6b3c] hover:text-white' },
              ].map(s => (
                <button key={s.label} className={`w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all ${s.color}`} aria-label={s.label}>
                  <s.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <Separator className="my-10" />

        {/* Related Articles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedArticles.map(a => (
              <Card key={a.id} className="border border-border hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigateTo('news-detail', { newsId: a.id })}>
                <CardContent className="p-5">
                  <Badge variant="outline" className="border-[#c8a415] text-[#c8a415] text-xs mb-3">{a.category}</Badge>
                  <h3 className="font-bold text-foreground text-sm line-clamp-2 mb-2 group-hover:text-[#1a6b3c] transition-colors">{a.title}</h3>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" />{a.date}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { PageId } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import type { Lang } from '@/lib/i18n'
import {
  ArrowLeft, Calendar, User, ChevronRight, FileText, Share2,
  Facebook, Linkedin, Mail, Heart, MessageCircle, Send, Copy,
  CheckCheck, Clock, Eye, Twitter, Loader2
} from 'lucide-react'

interface NewsDetailPageProps {
  newsId: string | null
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

interface Comment {
  id: string
  name: string
  text: string
  createdAt: string
}

const LIKE_KEY = (id: string) => `news_like_${id}`
const COMMENTS_KEY = (id: string) => `news_comments_${id}`

export default function NewsDetailPage({ newsId, navigateTo, lang = 'en' }: NewsDetailPageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [copied, setCopied] = useState(false)

  const isAm = lang === 'am'

  // Fetch article from DB
  useEffect(() => {
    if (!newsId) { setLoading(false); return }
    setLoading(true)
    fetch('/api/admin/news')
      .then(r => r.ok ? r.json() : [])
      .then((data: Article[]) => {
        const found = data.find(a => a.id === newsId)
        setArticle(found || null)
        // Related: other articles, same category or latest 3
        const others = data.filter(a => a.id !== newsId && (a.approvalStatus === 'approved' || a.status === 'published'))
        const sameCat = others.filter(a => a.category === found?.category).slice(0, 3)
        setRelated(sameCat.length >= 2 ? sameCat : others.slice(0, 3))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [newsId])

  // Likes & comments from localStorage (client-side persistence)
  useEffect(() => {
    if (!newsId) return
    const storedLike = localStorage.getItem(LIKE_KEY(newsId))
    const storedLikeCount = parseInt(localStorage.getItem(`${LIKE_KEY(newsId)}_count`) || '0')
    setLiked(storedLike === '1')
    setLikeCount(storedLikeCount)
    const storedComments = localStorage.getItem(COMMENTS_KEY(newsId))
    if (storedComments) {
      try { setComments(JSON.parse(storedComments)) } catch { setComments([]) }
    }
  }, [newsId])

  const handleLike = () => {
    if (!newsId) return
    const newLiked = !liked
    const newCount = newLiked ? likeCount + 1 : Math.max(0, likeCount - 1)
    setLiked(newLiked)
    setLikeCount(newCount)
    localStorage.setItem(LIKE_KEY(newsId), newLiked ? '1' : '0')
    localStorage.setItem(`${LIKE_KEY(newsId)}_count`, String(newCount))
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || !commentName.trim() || !newsId) return
    setSubmittingComment(true)
    await new Promise(r => setTimeout(r, 600))
    const newComment: Comment = {
      id: Date.now().toString(),
      name: commentName.trim(),
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
    }
    const updated = [newComment, ...comments]
    setComments(updated)
    localStorage.setItem(COMMENTS_KEY(newsId), JSON.stringify(updated))
    setCommentText('')
    setCommentName('')
    setSubmittingComment(false)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = article?.title || 'Dessie City News'

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    }
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
      return
    }
    if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-56 w-full rounded-2xl" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-600 mb-2">{isAm ? 'ጽሁፉ አልተገኘም' : 'Article not found'}</h2>
        <Button onClick={() => navigateTo('news')} className="mt-4 bg-[#0d4a28] text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> {isAm ? 'ወደ ዜናዎች ተመለስ' : 'Back to News'}
        </Button>
      </div>
    )
  }

  // Split content into paragraphs
  const paragraphs = article.content
    ? article.content.split(/\n\n|\n/).filter(p => p.trim().length > 0)
    : [article.content || '']

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Banner */}
      <section className="bg-[#0d4a28] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-green-300 text-sm mb-3 flex-wrap">
              <FileText className="w-4 h-4" />
              <button onClick={() => navigateTo('news')} className="hover:text-white transition-colors">
                {isAm ? 'ዜናዎች' : 'NEWS & MEDIA'}
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white truncate max-w-xs">{article.title}</span>
            </div>
            <Badge className="bg-[#c62828] text-white border-0 mb-3 text-xs">{article.category}</Badge>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-green-200 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {new Date(article.createdAt).toLocaleDateString(isAm ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {article.author || (isAm ? 'የደሴ ከተማ አስተዳደር' : 'Dessie City Administration')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigateTo('news')} className="mb-6 text-[#1a6b3c] hover:bg-[#e8f5e9] -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" /> {isAm ? 'ወደ ዜናዎች ተመለስ' : 'Back to News'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero Image */}
            {article.image && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden shadow-lg">
                <img src={article.image} alt={article.title} className="w-full h-64 md:h-80 object-cover" />
              </motion.div>
            )}

            {/* Article Body */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-[#e2e8e0] p-6 md:p-8 shadow-sm">
              {/* Excerpt lead */}
              {article.excerpt && (
                <p className="text-base md:text-lg font-semibold text-[#1a6b3c] border-l-4 border-[#c8a415] pl-4 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
              )}
              <div className="space-y-5">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-[#374151] leading-relaxed text-sm md:text-base">{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Like & Share Bar */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-[#e2e8e0] p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Like */}
                <button onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${liked ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-red-200 hover:text-red-400'}`}>
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span>{liked ? (isAm ? 'ወደዱ' : 'Liked') : (isAm ? 'ወደዱ' : 'Like')}</span>
                  {likeCount > 0 && <span className="bg-red-100 text-red-600 rounded-full px-1.5 py-0 text-xs font-bold">{likeCount}</span>}
                </button>

                {/* Share buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" /> {isAm ? 'አጋራ:' : 'Share:'}
                  </span>
                  {[
                    { key: 'facebook', icon: Facebook, label: 'Facebook', color: 'hover:bg-[#1877F2] hover:text-white', bg: 'bg-[#e7f3ff]', fg: 'text-[#1877F2]' },
                    { key: 'twitter', icon: Twitter, label: 'X / Twitter', color: 'hover:bg-black hover:text-white', bg: 'bg-gray-100', fg: 'text-gray-700' },
                    { key: 'telegram', icon: Send, label: 'Telegram', color: 'hover:bg-[#2CA5E0] hover:text-white', bg: 'bg-[#e3f6fd]', fg: 'text-[#2CA5E0]' },
                    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-[#0A66C2] hover:text-white', bg: 'bg-[#e8f3fb]', fg: 'text-[#0A66C2]' },
                    { key: 'email', icon: Mail, label: 'Email', color: 'hover:bg-[#0d4a28] hover:text-white', bg: 'bg-[#e8f5e9]', fg: 'text-[#0d4a28]' },
                  ].map(s => (
                    <button key={s.key} onClick={() => handleShare(s.key)}
                      className={`w-9 h-9 rounded-xl ${s.bg} ${s.fg} flex items-center justify-center transition-all ${s.color} hover:scale-110`}
                      title={s.label}>
                      <s.icon className="w-4 h-4" />
                    </button>
                  ))}
                  <button onClick={() => handleShare('copy')}
                    className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#0d4a28] hover:text-white transition-all hover:scale-110"
                    title={isAm ? 'አገናኝ ቅዳ' : 'Copy Link'}>
                    {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-[#e2e8e0] p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#0d4a28]" />
                <h3 className="font-bold text-[#0d4a28]">
                  {isAm ? 'አስተያየቶች' : 'Comments'}
                  {comments.length > 0 && <span className="ml-2 text-sm font-normal text-gray-500">({comments.length})</span>}
                </h3>
              </div>

              {/* Add comment form */}
              <form onSubmit={handleComment} className="space-y-3">
                <Input
                  value={commentName}
                  onChange={e => setCommentName(e.target.value)}
                  placeholder={isAm ? 'ስምዎ...' : 'Your name...'}
                  className="border-[#e2e8e0] focus:border-[#1a6b3c]"
                  required
                />
                <Textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder={isAm ? 'አስተያየትዎን ይጻፉ...' : 'Write a comment...'}
                  rows={3}
                  className="border-[#e2e8e0] focus:border-[#1a6b3c] resize-none"
                  required
                />
                <Button type="submit" disabled={submittingComment || !commentText.trim() || !commentName.trim()}
                  className="bg-[#0d4a28] text-white hover:bg-[#1a6b3c]">
                  {submittingComment ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  {isAm ? 'አስገባ' : 'Post Comment'}
                </Button>
              </form>

              {/* Comments list */}
              {comments.length > 0 && (
                <div className="space-y-4 pt-2">
                  <Separator />
                  {comments.map(c => (
                    <div key={c.id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0d4a28]/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[#0d4a28]" />
                      </div>
                      <div className="flex-1 bg-[#f8faf8] rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm text-[#0d4a28]">{c.name}</span>
                          <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {comments.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  {isAm ? 'ገና አስተያየት የለም። የመጀመሪያው ይሁኑ!' : 'No comments yet. Be the first to comment!'}
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author card */}
            <div className="bg-white rounded-2xl border border-[#e2e8e0] p-5 shadow-sm">
              <h4 className="font-bold text-sm text-[#0d4a28] mb-3 uppercase tracking-wider">
                {isAm ? 'ጸሐፊ' : 'Author'}
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0d4a28]/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#0d4a28]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{article.author || (isAm ? 'የደሴ ከተማ' : 'Dessie City Admin')}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString(isAm ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#e2e8e0] overflow-hidden shadow-sm">
                <div className="bg-[#0d4a28] px-4 py-3">
                  <h4 className="font-bold text-white text-sm">{isAm ? 'ተዛማጅ ዜናዎች' : 'RELATED NEWS'}</h4>
                </div>
                <div className="divide-y divide-[#f0f0f0]">
                  {related.map(a => (
                    <div key={a.id}
                      className="p-3 flex gap-3 hover:bg-[#f8faf8] transition-colors cursor-pointer group"
                      onClick={() => navigateTo('news-detail', { newsId: a.id })}>
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <img src={a.image || '/news-meeting.png'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-[#c62828] transition-colors line-clamp-2">{a.title}</p>
                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{new Date(a.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social share repeat for sidebar */}
            <div className="bg-white rounded-2xl border border-[#e2e8e0] p-5 shadow-sm">
              <h4 className="font-bold text-sm text-[#0d4a28] mb-3 uppercase tracking-wider">
                {isAm ? 'ዜናውን አጋሩ' : 'Share This Article'}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'facebook', label: 'Facebook', icon: Facebook, bg: '#1877F2' },
                  { key: 'twitter', label: 'X / Twitter', icon: Twitter, bg: '#000' },
                  { key: 'telegram', label: 'Telegram', icon: Send, bg: '#2CA5E0' },
                  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, bg: '#0A66C2' },
                  { key: 'email', label: 'Email', icon: Mail, bg: '#0d4a28' },
                  { key: 'copy', label: isAm ? 'ቅዳ' : 'Copy', icon: copied ? CheckCheck : Copy, bg: '#6b7280' },
                ].map(s => (
                  <button key={s.key} onClick={() => handleShare(s.key)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:opacity-90 transition-all text-white text-[10px] font-medium"
                    style={{ backgroundColor: s.bg }}>
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

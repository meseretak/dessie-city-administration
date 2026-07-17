'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  CheckCheck, Clock, Twitter, Loader2, ChevronLeft, X, ZoomIn,
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

interface ArticleWithRelations extends Article {
  likes: number
  shares: number
  comments: Comment[]
}


const LIKE_KEY = (id: string) => `news_like_${id}`
const COMMENTS_KEY = (id: string) => `news_comments_${id}`

/** Parse image field — can be a single URL string or JSON array of URLs */
function parseImages(raw?: string): string[] {
  if (!raw) return []
  raw = raw.trim()
  if (raw.startsWith('[')) {
    try { return JSON.parse(raw).filter(Boolean) } catch { /* fall through */ }
  }
  return [raw]
}

export default function NewsDetailPage({ newsId, navigateTo, lang = 'en' }: NewsDetailPageProps) {
  const [article, setArticle] = useState<ArticleWithRelations | null>(null)
  const [related, setRelated] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [shareCount, setShareCount] = useState(0)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const isAm = lang === 'am'

  useEffect(() => {
    if (!newsId) { setLoading(false); return }
    setLoading(true)

    // Fetch related news from admin list
    fetch('/api/admin/news')
      .then(r => r.ok ? r.json() : [])
      .then((data: Article[]) => {
        const others = data.filter(a => a.id !== newsId && (a.approvalStatus === 'approved' || a.status === 'published'))
        const currentCategory = data.find(a => a.id === newsId)?.category
        const sameCat = others.filter(a => a.category === currentCategory).slice(0, 3)
        setRelated(sameCat.length >= 2 ? sameCat : others.slice(0, 3))
      })
      .catch(() => {})

    // Fetch the specific article with comments, likes, and shares
    fetch(`/api/news/${newsId}`)
      .then(r => r.ok ? r.json() : null)
      .then((data: ArticleWithRelations | null) => {
        if (data && !data.error) {
          setArticle(data)
          setLikeCount(data.likes || 0)
          setShareCount(data.shares || 0)
          setComments(data.comments || [])
        } else {
          setArticle(null)
        }
      })
      .catch(() => setArticle(null))
      .finally(() => setLoading(false))
  }, [newsId])

  useEffect(() => {
    if (!newsId) return
    const storedLike = localStorage.getItem(LIKE_KEY(newsId))
    setLiked(storedLike === '1')
  }, [newsId])

  const handleLike = async () => {
    if (!newsId || liked) return // Can only like once
    setLiked(true)
    setLikeCount(prev => prev + 1)
    localStorage.setItem(LIKE_KEY(newsId), '1')

    await fetch(`/api/news/${newsId}/interact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'like' })
    }).catch(console.error)
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || !commentName.trim() || !newsId) return
    setSubmittingComment(true)
    
    try {
      const res = await fetch(`/api/news/${newsId}/interact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'comment', name: commentName.trim(), text: commentText.trim() })
      })
      const data = await res.json()
      if (data.success && data.comment) {
        setComments([data.comment, ...comments])
        setCommentText('')
        setCommentName('')
      }
    } catch (error) {
      console.error('Failed to post comment', error)
    } finally {
      setSubmittingComment(false)
    }
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = article?.title || 'Dessie City News'

  const handleShare = async (platform: string) => {
    const eu = encodeURIComponent(shareUrl)
    const et = encodeURIComponent(shareTitle)
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${eu}`,
      twitter: `https://twitter.com/intent/tweet?text=${et}&url=${eu}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${eu}`,
      telegram: `https://t.me/share/url?url=${eu}&text=${et}`,
      email: `mailto:?subject=${et}&body=${eu}`,
    }
    
    // Increment share count
    if (newsId) {
      setShareCount(prev => prev + 1)
      fetch(`/api/news/${newsId}/interact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'share' })
      }).catch(console.error)
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
      return
    }
    if (urls[platform]) window.open(urls[platform], '_blank', 'width=620,height=440')
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-8 w-2/3" /><Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-600 mb-2">{isAm ? 'ጽሁፉ አልተገኘም' : 'Article not found'}</h2>
        <Button onClick={() => navigateTo('news')} className="mt-4 bg-[#0d4a28] text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />{isAm ? 'ወደ ዜናዎች ተመለስ' : 'Back to News'}
        </Button>
      </div>
    )
  }

  const images = parseImages(article.image)
  const mainImage = images[0]
  const galleryImages = images.length > 1 ? images : []
  const paragraphs = article.content ? article.content.split(/\n\n|\n/).filter(p => p.trim().length > 0) : [article.content || '']

  const shareButtons = [
    { key: 'facebook', icon: Facebook, label: 'Facebook', bg: '#1877F2', lightBg: '#e7f3ff', fg: '#1877F2' },
    { key: 'twitter', icon: Twitter, label: 'X / Twitter', bg: '#000', lightBg: '#f0f0f0', fg: '#333' },
    { key: 'telegram', icon: Send, label: 'Telegram', bg: '#2CA5E0', lightBg: '#e3f6fd', fg: '#2CA5E0' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', bg: '#0A66C2', lightBg: '#e8f3fb', fg: '#0A66C2' },
    { key: 'email', icon: Mail, label: 'Email', bg: '#0d4a28', lightBg: '#e8f5e9', fg: '#0d4a28' },
  ]

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}>
            <button className="absolute top-4 right-4 text-white bg-white/10 rounded-full p-2 hover:bg-white/20" onClick={() => setLightboxIdx(null)}>
              <X className="w-6 h-6" />
            </button>
            {lightboxIdx > 0 && (
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 rounded-full p-2 hover:bg-white/20"
                onClick={e => { e.stopPropagation(); setLightboxIdx(i => i! - 1) }}>
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={images[lightboxIdx]} alt="" className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
              onClick={e => e.stopPropagation()} />
            {lightboxIdx < images.length - 1 && (
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 rounded-full p-2 hover:bg-white/20"
                onClick={e => { e.stopPropagation(); setLightboxIdx(i => i! + 1) }}>
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
            <p className="absolute bottom-4 text-white/60 text-sm">{lightboxIdx + 1} / {images.length}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner */}
      <section className="bg-[#0d4a28] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-green-300 text-sm mb-3 flex-wrap">
              <FileText className="w-4 h-4" />
              <button onClick={() => navigateTo('news')} className="hover:text-white transition-colors">{isAm ? 'ዜናዎች' : 'NEWS & MEDIA'}</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white truncate max-w-xs">{article.title}</span>
            </div>
            <Badge className="bg-[#c62828] text-white border-0 mb-3 text-xs px-3">{article.category}</Badge>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-green-200 text-sm">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />
                {new Date(article.createdAt).toLocaleDateString(isAm ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />
                {article.author || (isAm ? 'የደሴ ከተማ አስተዳደር' : 'Dessie City Administration')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigateTo('news')} className="mb-6 text-[#1a6b3c] hover:bg-[#e8f5e9] -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />{isAm ? 'ወደ ዜናዎች ተመለስ' : 'Back to News'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main Hero Image */}
            {mainImage && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden shadow-xl cursor-pointer group relative"
                onClick={() => setLightboxIdx(0)}>
                <img src={mainImage} alt={article.title} className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                  {isAm ? 'ለማስፋት ጠቅ ያድርጉ' : 'Click to enlarge'}
                </div>
              </motion.div>
            )}

            {/* Photo Gallery Grid */}
            {galleryImages.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3 className="text-sm font-bold text-[#0d4a28] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />{isAm ? 'ፎቶ ጋለሪ' : 'Photo Gallery'} ({images.length})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, i) => (
                    <div key={i} onClick={() => setLightboxIdx(i)}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md">
                      <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Article Body */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl border border-[#e2e8e0] p-6 md:p-8 shadow-sm">
              {article.excerpt && (
                <p className="text-base md:text-lg font-semibold text-[#1a6b3c] border-l-4 border-[#c8a415] pl-4 mb-6 leading-relaxed italic">{article.excerpt}</p>
              )}
              <div className="space-y-5">
                {paragraphs.map((para, i) => (
                  <p key={i} className={`text-[#374151] leading-relaxed text-sm md:text-base ${para.startsWith('•') ? 'pl-4 border-l-2 border-[#1a6b3c]/20' : ''}`}>{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Like & Share Bar */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-[#e2e8e0] p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button onClick={handleLike} disabled={liked}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${liked ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-red-200 hover:text-red-400'}`}>
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span>{liked ? (isAm ? 'ወደዱ ✓' : 'Liked ✓') : (isAm ? 'ወደዱ' : 'Like')}</span>
                  {likeCount > 0 && <span className="bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-black">{likeCount}</span>}
                </button>
                <div className="flex items-center gap-2 flex-wrap">
                  {shareCount > 0 && <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">{shareCount} {isAm ? 'አጋራዎች' : 'Shares'}</span>}
                  <span className="text-xs text-gray-500 font-semibold flex items-center gap-1"><Share2 className="w-3.5 h-3.5" />{isAm ? 'አጋሩ:' : 'Share:'}</span>
                  {shareButtons.map(s => (
                    <button key={s.key} onClick={() => handleShare(s.key)} title={s.label}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: s.lightBg, color: s.fg }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = s.bg; (e.currentTarget as HTMLElement).style.color = 'white' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = s.lightBg; (e.currentTarget as HTMLElement).style.color = s.fg }}>
                      <s.icon className="w-4 h-4" />
                    </button>
                  ))}
                  <button onClick={() => handleShare('copy')} title={isAm ? 'አገናኝ ቅዳ' : 'Copy Link'}
                    className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#0d4a28] hover:text-white transition-all hover:scale-110">
                    {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Comments */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl border border-[#e2e8e0] p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#0d4a28]" />
                <h3 className="font-bold text-[#0d4a28]">{isAm ? 'አስተያየቶች' : 'Comments'}
                  {comments.length > 0 && <span className="ml-2 text-sm font-normal text-gray-400">({comments.length})</span>}
                </h3>
              </div>
              <form onSubmit={handleComment} className="space-y-3">
                <Input value={commentName} onChange={e => setCommentName(e.target.value)}
                  placeholder={isAm ? 'ስምዎ...' : 'Your name...'} className="border-[#e2e8e0] focus:border-[#1a6b3c]" required />
                <Textarea value={commentText} onChange={e => setCommentText(e.target.value)}
                  placeholder={isAm ? 'አስተያየትዎን ይጻፉ...' : 'Write a comment...'} rows={3}
                  className="border-[#e2e8e0] focus:border-[#1a6b3c] resize-none" required />
                <Button type="submit" disabled={submittingComment || !commentText.trim() || !commentName.trim()}
                  className="bg-[#0d4a28] text-white hover:bg-[#1a6b3c]">
                  {submittingComment ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  {isAm ? 'አስገባ' : 'Post Comment'}
                </Button>
              </form>
              {comments.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-3">{isAm ? 'ገና አስተያየት የለም። የመጀመሪያው ይሁኑ!' : 'No comments yet. Be the first!'}</p>
              ) : (
                <div className="space-y-3 pt-2">
                  <Separator />
                  {comments.map(c => (
                    <div key={c.id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0d4a28]/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[#0d4a28]" />
                      </div>
                      <div className="flex-1 bg-[#f8faf8] rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-[#0d4a28]">{c.name}</span>
                          <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-2xl border border-[#e2e8e0] p-5 shadow-sm">
              <h4 className="font-bold text-xs text-[#0d4a28] uppercase tracking-wider mb-3">{isAm ? 'ጸሐፊ' : 'Posted By'}</h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{article.author || (isAm ? 'የደሴ ከተማ አስተዳደር' : 'Dessie City Admin')}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.createdAt).toLocaleDateString(isAm ? 'am-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Share Sidebar */}
            <div className="bg-white rounded-2xl border border-[#e2e8e0] p-5 shadow-sm">
              <h4 className="font-bold text-xs text-[#0d4a28] uppercase tracking-wider mb-3">{isAm ? 'ዜናውን አጋሩ' : 'Share This Article'}</h4>
              <div className="grid grid-cols-3 gap-2">
                {[...shareButtons, { key: 'copy', label: isAm ? 'ቅዳ' : 'Copy', icon: copied ? CheckCheck : Copy, bg: '#6b7280', lightBg: '#f3f4f6', fg: '#374151' }].map(s => (
                  <button key={s.key} onClick={() => handleShare(s.key)}
                    className="flex flex-col items-center gap-1 py-2.5 rounded-xl text-white text-[10px] font-bold transition-all hover:opacity-90 hover:scale-105"
                    style={{ backgroundColor: s.bg }}>
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#e2e8e0] overflow-hidden shadow-sm">
                <div className="bg-[#0d4a28] px-4 py-3">
                  <h4 className="font-bold text-white text-sm">{isAm ? 'ተዛማጅ ዜናዎች' : 'RELATED NEWS'}</h4>
                </div>
                <div className="divide-y divide-[#f0f0f0]">
                  {related.map(a => {
                    const imgs = parseImages(a.image)
                    return (
                      <div key={a.id} className="p-3 flex gap-3 hover:bg-[#f8faf8] cursor-pointer group" onClick={() => navigateTo('news-detail', { newsId: a.id })}>
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          {imgs[0] && <img src={imgs[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 group-hover:text-[#c62828] line-clamp-2">{a.title}</p>
                          <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />{new Date(a.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

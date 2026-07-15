'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import {
  Search, X, Menu, ChevronDown, Bot, Send, Phone, Mail,
  Facebook, Twitter, Instagram, Youtube, Linkedin, FileText,
  ChevronRight, Sun, Moon, Shield, Loader2, Languages
} from 'lucide-react'
import type { PageId } from '@/lib/types'
import { NAV_ITEMS } from '@/lib/types'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'
import HomePage from '@/components/pages/HomePage'
import AboutPage from '@/components/pages/AboutPage'
import MayorPage from '@/components/pages/MayorPage'
import ServicesPage from '@/components/pages/ServicesPage'
import ServiceDetailPage from '@/components/pages/ServiceDetailPage'
import AnnouncementsPage from '@/components/pages/AnnouncementsPage'
import VacancyPage from '@/components/pages/VacancyPage'
import VacancyDetailPage from '@/components/pages/VacancyDetailPage'
import NewsPage from '@/components/pages/NewsPage'
import NewsDetailPage from '@/components/pages/NewsDetailPage'
import BidsPage from '@/components/pages/BidsPage'
import BidsDetailPage from '@/components/pages/BidsDetailPage'
import TourismPage from '@/components/pages/TourismPage'
import ProjectsPage from '@/components/pages/ProjectsPage'
import TransparencyPage from '@/components/pages/TransparencyPage'
import HotelsPage from '@/components/pages/HotelsPage'
import VisitorCounter from '@/components/VisitorCounter'
import ContactPage from '@/components/pages/ContactPage'
import dynamic from 'next/dynamic'
const AdminPanel = dynamic(() => import('@/components/pages/AdminPanel'), { ssr: false })

/* ==================== MAIN ROUTER SHELL ==================== */
export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null)
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null)
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { lang, toggle: toggleLang } = useLang()

  // Dynamic menu from DB (falls back to NAV_ITEMS if empty)
  const [dbMenuItems, setDbMenuItems] = useState<typeof NAV_ITEMS | null>(null)
  useEffect(() => {
    fetch('/api/admin/menu-items')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (!Array.isArray(data) || data.length === 0) return
        // Build NavItem structure from DB
        const built = data
          .filter((item: any) => !item.parentId && item.isVisible !== 0 && item.isVisible !== false)
          .map((item: any) => ({
            id: (item.pageId || 'home') as PageId,
            label: item.label,
            children: (item.children || [])
              .filter((c: any) => c.isVisible !== 0 && c.isVisible !== false)
              .map((c: any) => ({ id: (c.pageId || 'home') as PageId, label: c.label })),
          }))
        if (built.length > 0) setDbMenuItems(built)
      })
      .catch(() => {})
  }, [])

  const navItems = dbMenuItems ?? NAV_ITEMS

  // Chat widget state
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Welcome to Dessie City! 🏛️' },
    { role: 'bot', text: 'I can help you with services, news, vacancies, bids, tourism, and more. Ask me anything!' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  // Search dialog state
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Accent color state
  const [accentColor, setAccentColor] = useState('#1a6b3c')
  const accentColors = [
    { color: '#1a6b3c', label: 'Government Green' },
    { color: '#0d47a1', label: 'Royal Blue' },
    { color: '#c8a415', label: 'Golden' },
    { color: '#6b21a8', label: 'Royal Purple' },
    { color: '#c62828', label: 'Heritage Red' },
  ]
  const [colorPickerOpen, setColorPickerOpen] = useState(false)

  // Close color picker when clicking outside
  useEffect(() => {
    if (!colorPickerOpen) return
    const handler = () => setColorPickerOpen(false)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [colorPickerOpen])

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterLoading, setNewsletterLoading] = useState(false)

  // Dropdown state — supports multiple dropdowns by nav label
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null)

  // Navigation handler
  const navigateTo = (page: PageId, extra?: { serviceId?: string; vacancyId?: string; newsId?: string; bidId?: string }) => {
    if (extra?.serviceId) setSelectedServiceId(extra.serviceId)
    if (extra?.vacancyId) setSelectedVacancyId(extra.vacancyId)
    if (extra?.newsId) setSelectedNewsId(extra.newsId)
    if (extra?.bidId) setSelectedBidId(extra.bidId)
    setCurrentPage(page)
    setMobileMenuOpen(false)
    setOpenDropdown(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Page renderer
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage navigateTo={navigateTo} />
      case 'about': return <AboutPage />
      case 'mayor': return <MayorPage />
      case 'services': return <ServicesPage navigateTo={navigateTo} />
      case 'service-detail': return <ServiceDetailPage serviceId={selectedServiceId} navigateTo={navigateTo} />
      case 'announcements': return <AnnouncementsPage navigateTo={navigateTo} />
      case 'vacancy': return <VacancyPage navigateTo={navigateTo} />
      case 'vacancy-detail': return <VacancyDetailPage vacancyId={selectedVacancyId} navigateTo={navigateTo} />
      case 'news': return <NewsPage navigateTo={navigateTo} lang={lang} />
      case 'news-detail': return <NewsDetailPage newsId={selectedNewsId} navigateTo={navigateTo} lang={lang} />
      case 'bids': return <BidsPage navigateTo={navigateTo} />
      case 'bids-detail': return <BidsDetailPage bidId={selectedBidId} navigateTo={navigateTo} />
      case 'tourism': return <TourismPage />
      case 'projects': return <ProjectsPage />
      case 'transparency': return <TransparencyPage />
      case 'hotels': return <HotelsPage />
      case 'contact': return <ContactPage />
      case 'admin': return <AdminPanel />
      default: return <HomePage navigateTo={navigateTo} />
    }
  }

  // Send chat message
  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return
    const userMsg = chatInput.trim()
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setChatInput('')
    setChatLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId: 'main-chat' }),
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { role: 'bot', text: data.response || 'Sorry, I could not process that.' }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'I\'m having trouble connecting. Please call +251 33 111 0000 for assistance.' }])
    } finally {
      setChatLoading(false)
    }
  }

  // Newsletter submit
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      toast({ title: 'Subscribed!', description: 'You will receive the latest updates from Dessie City.' })
      setNewsletterEmail('')
    } catch {
      toast({ title: 'Error', description: 'Failed to subscribe. Please try again.', variant: 'destructive' })
    } finally {
      setNewsletterLoading(false)
    }
  }

  // Dropdown mouse handlers
  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(label)
  }
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  // Get breadcrumb label for current page
  const getBreadcrumbLabel = () => {
    const item = navItems.find(n => n.id === currentPage)
    if (item) return item.label
    // Check children
    for (const nav of navItems) {
      if (nav.children) {
        const child = nav.children.find(c => c.id === currentPage)
        if (child) return `${nav.label} / ${child.label}`
      }
    }
    return currentPage.toUpperCase().replace(/-/g, ' ')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ============ SOCIAL MEDIA TOP BAR ============ */}
      <div className="bg-[#0d4a28] text-white text-xs hidden md:block relative z-[55]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/60">
              <Phone className="w-3 h-3" />
              <span>+251-33-111-XXXX</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/60">
              <Mail className="w-3 h-3" />
              <span>info@dessiecity.gov.et</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-[0.65rem] tracking-wider uppercase font-medium mr-1">Follow Us</span>
            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <button
                key={i}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Social media"
              >
                <Icon className="w-3 h-3 text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ STICKY HEADER ============ */}
      <header className="sticky top-0 z-50 !bg-[#ffffff] shadow-sm">
        <div className="tricolor-stripe" />
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-3 flex items-center gap-4">
          {/* Left: Logo */}
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 shrink-0 cursor-pointer">
            <img
              src="/official-logo.png"
              alt="Dessie City Administration Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="leading-tight hidden sm:block">
              <span className="text-[#0d4a28] font-extrabold text-base md:text-lg tracking-wide">DESSIE</span>
              <br />
              <span className="text-[0.55rem] md:text-[0.6rem] tracking-[0.1em] text-[#555] uppercase font-semibold">City Administration</span>
            </div>
          </button>

          {/* Center: Desktop Nav — pushed right with ml-auto */}
          <nav className="hidden xl:flex items-center gap-0.5 ml-auto">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative mega-nav-trigger"
                onMouseEnter={() => item.children ? handleDropdownEnter(item.label) : undefined}
                onMouseLeave={() => item.children ? handleDropdownLeave() : undefined}
              >
                <button
                  onClick={() => navigateTo(item.id)}
                  className={`gov-nav-link px-3 py-2 rounded-md text-[0.78rem] font-medium flex items-center gap-1 transition-all ${
                    currentPage === item.id
                      ? 'text-white bg-[#1a6b3c] shadow-md shadow-[#1a6b3c]/20'
                      : 'text-[#333] hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </button>

                {/* Dropdown for Services / Announcements */}
                {item.children && openDropdown === item.label && (
                  <div
                    className="mega-nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-background border border-border rounded-xl shadow-2xl p-5 z-[70]"
                    style={{ width: item.label === 'SERVICES' ? '600px' : '280px' }}
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={() => handleDropdownLeave()}
                  >
                    {item.label === 'SERVICES' ? (
                      <div>
                        <button
                          onClick={() => { navigateTo('services'); setOpenDropdown(null) }}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#1a6b3c] dark:text-green-400 hover:bg-[#1a6b3c]/5 mb-2"
                        >
                          View All Services →
                        </button>
                        <div className="grid grid-cols-3 gap-1">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => {
                              if (child.label.startsWith('──')) {
                                // Separator-like items: Tourism & Projects
                                const label = child.label.replace('── ', '').trim()
                                navigateTo(child.id as PageId)
                              } else if (child.id === 'services') {
                                navigateTo('services')
                              } else {
                                navigateTo('service-detail', { serviceId: child.label })
                              }
                              setOpenDropdown(null)
                            }}
                            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              child.label.startsWith('──')
                                ? 'text-[#1a6b3c] dark:text-green-400 font-semibold hover:bg-[#1a6b3c]/5 mt-2'
                                : 'text-muted-foreground hover:text-[#1a6b3c] dark:hover:text-green-400 hover:bg-muted/50'
                            }`}
                          >
                            {child.label.replace('── ', '')}
                          </button>
                        ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => {
                              navigateTo(child.id as PageId)
                              setOpenDropdown(null)
                            }}
                            className="w-full text-left px-3 py-3 rounded-lg text-sm text-muted-foreground hover:text-[#1a6b3c] dark:hover:text-green-400 hover:bg-muted/50 transition-colors flex items-center gap-2"
                          >
                            {child.label}
                            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Search className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Search className="w-5 h-5 text-[#0d4a28]" /> Search Dessie City
                        </h3>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && searchQuery.trim()) {
                                const q = searchQuery.toLowerCase()
                                setSearchOpen(false)
                                if (q.includes('news') || q.includes('press') || q.includes('media')) navigateTo('news')
                                else if (q.includes('job') || q.includes('vacancy') || q.includes('career') || q.includes('work')) navigateTo('vacancy')
                                else if (q.includes('bid') || q.includes('tender') || q.includes('procurement')) navigateTo('bids')
                                else if (q.includes('hotel') || q.includes('stay') || q.includes('accommodation')) navigateTo('hotels')
                                else if (q.includes('service') || q.includes('license') || q.includes('permit') || q.includes('tax') || q.includes('birth') || q.includes('registration')) navigateTo('services')
                                else if (q.includes('mayor') || q.includes('cabinet') || q.includes('leader')) navigateTo('mayor')
                                else if (q.includes('project') || q.includes('construction') || q.includes('infrastructure')) navigateTo('projects')
                                else if (q.includes('about') || q.includes('history') || q.includes('dessie')) navigateTo('about')
                                else if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address')) navigateTo('contact')
                                else if (q.includes('tourism') || q.includes('heritage') || q.includes('culture') || q.includes('visit')) navigateTo('tourism')
                                else if (q.includes('announcement') || q.includes('notice')) navigateTo('announcements')
                                else navigateTo('services')
                              }
                            }}
                            placeholder="Search services, news, vacancies, bids..."
                            className="pl-10 h-12 text-base"
                            autoFocus
                          />
                        </div>
                        {/* Quick links */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Quick Search</p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: '🏛️ Services', page: 'services' as const },
                              { label: '📰 News', page: 'news' as const },
                              { label: '💼 Vacancies', page: 'vacancy' as const },
                              { label: '📋 Bids', page: 'bids' as const },
                              { label: '🏨 Hotels', page: 'hotels' as const },
                              { label: '🏔️ Tourism', page: 'tourism' as const },
                              { label: '📢 Announcements', page: 'announcements' as const },
                              { label: '📞 Contact', page: 'contact' as const },
                            ].map(item => (
                              <button key={item.page} onClick={() => { setSearchOpen(false); navigateTo(item.page) }}
                                className="px-3 py-1.5 text-xs font-medium bg-[#f0fdf4] hover:bg-[#0d4a28] hover:text-white text-[#0d4a28] rounded-lg border border-[#1a6b3c]/20 transition-all">
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">Press Enter to search or click a quick link above</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Language Toggle — triggers Google Translate */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs font-semibold gap-1"
                    onClick={() => {
                      // Click the Google Translate dropdown to toggle language
                      const el = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
                      if (el) {
                        const current = el.value
                        el.value = current === 'am' ? 'en' : 'am'
                        el.dispatchEvent(new Event('change'))
                      }
                    }}
                    aria-label="Toggle language"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">አማ / EN</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Switch to Amharic / English</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Dark Mode Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label="Toggle dark mode"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-[#c8a415]" /> : <Moon className="w-4 h-4 text-[#1a6b3c]" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Theme</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Mobile Hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden h-11 w-11">
                  <Menu className="w-6 h-6" style={{ color: accentColor }} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 pt-10">
                {/* Mobile Accent Color Picker */}
                <div className="mb-4 px-1">
                  <p className="text-xs font-semibold text-[#888] mb-2 tracking-wider uppercase">Theme Color</p>
                  <div className="flex gap-2">
                    {accentColors.map((ac) => (
                      <button
                        key={ac.color}
                        onClick={() => { setAccentColor(ac.color); document.documentElement.style.setProperty('--accent-color', ac.color) }}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 shadow-sm ${accentColor === ac.color ? 'border-[#1a1a1a] scale-110 ring-2 ring-offset-1' : 'border-transparent'}`}
                        style={{ backgroundColor: ac.color }}
                        aria-label={ac.label}
                      >
                        {accentColor === ac.color && <span className="flex items-center justify-center w-full h-full">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <Separator className="mb-4" />
                {/* Language toggle mobile */}
                <button
                  onClick={() => {
                    const el = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
                    if (el) {
                      el.value = el.value === 'am' ? 'en' : 'am'
                      el.dispatchEvent(new Event('change'))
                    }
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 mb-2 rounded-md bg-[#f0fdf4] text-[#0d4a28] text-sm font-semibold"
                >
                  <Languages className="w-4 h-4" />
                  አማርኛ / English
                </button>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <button
                        onClick={() => {
                          if (item.children) {
                            setOpenDropdown(openDropdown === item.label ? null : item.label)
                          } else {
                            navigateTo(item.id)
                          }
                        }}
                        className={`gov-nav-link w-full px-4 py-3 text-left flex items-center justify-between rounded-md transition-colors ${
                          currentPage === item.id
                            ? 'text-[#1a6b3c] dark:text-green-400 bg-[#1a6b3c]/5 font-medium'
                            : 'text-muted-foreground hover:text-[#1a6b3c] dark:hover:text-green-400 hover:bg-muted/50'
                        }`}
                      >
                        {item.label}
                        {item.children && <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                      </button>
                      {/* Mobile dropdown children */}
                      {item.children && openDropdown === item.label && (
                        <div className="pl-6 space-y-0.5 mt-1 mb-2">
                          {item.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => {
                                if (child.label.startsWith('──')) {
                                  navigateTo(child.id as PageId)
                                } else if (child.id === 'services') {
                                  navigateTo('services')
                                } else if (child.id === 'service-detail') {
                                  navigateTo('service-detail', { serviceId: child.label })
                                } else {
                                  navigateTo(child.id as PageId)
                                }
                              }}
                              className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                                child.label.startsWith('──')
                                  ? 'text-[#1a6b3c] dark:text-green-400 font-semibold hover:bg-[#1a6b3c]/5'
                                  : 'text-muted-foreground hover:text-[#1a6b3c] dark:hover:text-green-400 hover:bg-muted/50'
                              }`}
                            >
                              {child.label.replace('── ', '')}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Separator className="my-3" />
                </nav>
                {/* Mobile bottom accent color indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: accentColor }} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ============ BREADCRUMB ============ */}
      {currentPage !== 'home' && (
        <div className="bg-[#f0f4f0] dark:bg-[#0a1a0e] border-b border-border px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
            <button onClick={() => navigateTo('home')} className="text-muted-foreground hover:text-[#1a6b3c] dark:hover:text-green-400 transition-colors">
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-[#1a6b3c] dark:text-green-400 font-medium">
              {getBreadcrumbLabel()}
            </span>
          </div>
        </div>
      )}

      {/* ============ MAIN CONTENT ============ */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ============ VISITOR COUNTER ============ */}
      <VisitorCounter />

      {/* ============ FOOTER ============ */}
      <footer className="mt-auto bg-[#0d4a28] dark:bg-[#060e06]">
        <div className="tricolor-stripe" />
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Column 1: Logo */}
            <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/official-logo.png"
                  alt="Dessie City Administration Logo"
                  className="h-14 w-auto object-contain"
                />
                <div className="leading-tight">
                  <span className="text-green-400 font-bold text-xl tracking-wide">DESSIE</span>
                  <br />
                  <span className="text-[0.6rem] tracking-[0.12em] text-white/50 uppercase font-medium">City Administration</span>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Dessie, Amhara Region<br />
                Ethiopia
              </p>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="w-3.5 h-3.5" />
                <span>+251-33-111-XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50 mt-1">
                <Mail className="w-3.5 h-3.5" />
                <span>info@dessiecity.gov.et</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{lang === 'am' ? 'ፈጣን አገናኞች' : 'Quick Links'}</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', page: 'home' as PageId },
                  { label: 'About Dessie', page: 'about' as PageId },
                  { label: "Mayor's Office", page: 'mayor' as PageId },
                  { label: 'All Services', page: 'services' as PageId },
                  { label: 'Announcements', page: 'announcements' as PageId },
                  { label: 'Contact Us', page: 'contact' as PageId },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-sm text-white/50 hover:text-green-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Services</h4>
              <ul className="space-y-2">
                {['Birth Registration', 'Business License', 'Building Permit', 'Land Services', 'Tax Payment'].map((svc) => (
                  <li key={svc}>
                    <button
                      onClick={() => navigateTo('service-detail', { serviceId: svc })}
                      className="text-sm text-white/50 hover:text-green-400 transition-colors"
                    >
                      {svc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Resources</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Proclamations', icon: FileText },
                  { label: 'Regulations', icon: FileText },
                  { label: 'Official Documents', icon: FileText },
                  { label: 'Application Forms', icon: FileText },
                  { label: 'Annual Reports', icon: FileText },
                  { label: 'City Plans', icon: FileText },
                ].map((res) => (
                  <li key={res.label}>
                    <button
                      onClick={() => {
                        document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="text-sm text-white/50 hover:text-green-400 transition-colors flex items-center gap-1.5"
                    >
                      <res.icon className="w-3 h-3" /> {res.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Connect */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Connect</h4>
              <div className="flex gap-2 mb-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Social media"
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </button>
                ))}
              </div>
              <p className="text-sm text-white/50 mb-3">Get updates via email</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/30 h-9 text-xs"
                />
                <Button type="submit" size="sm" className="bg-[#c8a415] hover:bg-[#b08e10] text-white text-xs h-9 px-3 shrink-0">
                  <Send className="w-3 h-3" />
                </Button>
              </form>
            </div>
          </div>
          {/* Bottom bar spacer */}
          <div className="mt-6" />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/40 leading-relaxed">
              © 2025 Dessie City Administration. All Rights Reserved. | Amhara Region, Federal Democratic Republic of Ethiopia
            </p>
            <div className="flex items-center gap-3">
              <p className="text-xs text-white/40">
                Developed by{' '}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c8a415] via-[#f0c040] to-[#c8a415] hover:from-white hover:via-[#c8a415] hover:to-white transition-all duration-500 cursor-default">
                  Meseret Akalu
                </span>
                <span className="text-[#c8a415]"> | Tel: +251 912 465 247 </span>
              </p>
              <button
                onClick={() => navigateTo('admin')}
                className="text-xs text-white/10 hover:text-white/30 transition-colors flex items-center gap-1 opacity-0 hover:opacity-100"
              >
                <Shield className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ AI CHAT ASSISTANT ============ */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass chat-widget w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-white/20"
            >
              {/* Chat Header */}
              <div className="bg-[#1a6b3c] p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold text-sm">Dessie City AI Assistant</span>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1a6b3c] text-white rounded-br-md'
                          : 'bg-white/10 dark:bg-white/5 text-foreground rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-border/30 flex gap-2 shrink-0">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Type a message..."
                  className="h-9 text-sm"
                />
                <Button
                  size="icon"
                  className="h-9 w-9 bg-[#1a6b3c] hover:bg-[#0d4a28] shrink-0 disabled:opacity-50"
                  onClick={sendChat}
                  disabled={chatLoading}
                  aria-label="Send message"
                >
                  {chatLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Chat Button */}
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-14 h-14 rounded-full bg-[#1a6b3c] hover:bg-[#0d4a28] text-white shadow-lg shadow-[#1a6b3c]/30 flex items-center justify-center animate-chat-bounce transition-colors"
            onClick={() => setChatOpen(true)}
            aria-label="Open AI assistant"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  )
}
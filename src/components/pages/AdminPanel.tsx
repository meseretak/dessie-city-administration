'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  LayoutDashboard, Newspaper, Briefcase, FileText, CheckCircle2,
  XCircle, Clock, LogOut, Menu, Loader2, Plus, Pencil, Trash2,
  Shield, User, Mail, Phone, MessageSquare, AlertTriangle, Eye,
  ChevronDown, Search, RefreshCw, Building2, FolderOpen, Bell,
  Users, Settings, Star, MapPin,
} from 'lucide-react'

/* ========================= TYPES ========================= */
interface AdminUser {
  id: string
  username: string
  name: string
  role: string
}

interface NewsItem {
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

interface VacancyItem {
  id: string
  title: string
  department: string
  type: string
  salary: string
  deadline: string
  status: string
  approvalStatus: string
  description: string
  requirements: string
  createdAt: string
}

interface BidItem {
  id: string
  title: string
  reference: string
  category: string
  deadline: string
  status: string
  approvalStatus: string
  description: string
  budget: string
  requirements: string
  createdAt: string
}

interface PendingItem {
  id: string
  _model: string
  title: string
  approvalStatus: string
  createdAt: string
  [key: string]: unknown
}

interface AuditLogEntry {
  id: string
  action: string
  model: string
  recordId: string
  details: string
  createdAt: string
  admin?: { name: string; username: string } | null
}

interface Stats {
  news: number
  vacancies: number
  bids: number
  contacts: number
  serviceRequests: number
  hotels: number
  projects: number
  recentContacts: { id: string; name: string; subject: string; status: string; createdAt: string }[]
  recentServiceRequests: { id: string; name: string; serviceType: string; status: string; createdAt: string }[]
}

type ActiveSection = 'dashboard' | 'news' | 'vacancies' | 'bids' | 'approvals' | 'audit' | 'hotels' | 'projects' | 'announcements' | 'cabinet' | 'contacts' | 'service-requests' | 'settings' | 'users' | 'sliders' | 'menu'

/* ========================= MAIN COMPONENT ========================= */
export default function AdminPanel() {
  const { toast } = useToast()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [initialCheck, setInitialCheck] = useState(true)

  // Check existing session on mount
  useEffect(() => {
    fetch('/api/admin/auth')
      .then(r => r.json())
      .then(data => {
        if (data.authenticated && data.user) {
          setUser(data.user)
        }
        setInitialCheck(false)
      })
      .catch(() => setInitialCheck(false))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })
      const data = await res.json()
      if (res.ok && data.user) {
        setUser(data.user)
        toast({ title: 'Welcome back!', description: `Logged in as ${data.user.name}` })
      } else {
        setLoginError(data.error || 'Login failed')
      }
    } catch {
      setLoginError('Network error. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    setUser(null)
    setActiveSection('dashboard')
    toast({ title: 'Logged out', description: 'Session ended successfully.' })
  }

  const isChecker = user?.role === 'super_admin'

  // Show loading spinner while checking session
  if (initialCheck) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#0d4a28' }} />
      </div>
    )
  }

  // ==================== LOGIN SCREEN ====================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#0d4a28' }}
            >
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold" style={{ color: '#0d4a28' }}>
              Admin Portal
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Dessie City Administration
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {loginError}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={loginForm.username}
                  onChange={e => setLoginForm(p => ({ ...p, username: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full text-white"
                style={{ backgroundColor: '#0d4a28' }}
                disabled={loginLoading}
              >
                {loginLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Sign In
              </Button>
            </form>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-xs text-amber-800">
                <strong>Demo:</strong> <code>admin</code>/<code>admin123</code> (Maker) or{' '}
                <code>checker</code>/<code>checker123</code> (Checker)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ==================== SIDEBAR NAV ITEMS ====================
  const navItems: { id: ActiveSection; label: string; icon: React.ReactNode; group?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, group: 'Main' },
    { id: 'news', label: 'News', icon: <Newspaper className="h-4 w-4" />, group: 'Content' },
    { id: 'vacancies', label: 'Vacancies', icon: <Briefcase className="h-4 w-4" />, group: 'Content' },
    { id: 'bids', label: 'Bids & Tenders', icon: <FileText className="h-4 w-4" />, group: 'Content' },
    { id: 'announcements', label: 'Announcements', icon: <Bell className="h-4 w-4" />, group: 'Content' },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="h-4 w-4" />, group: 'Content' },
    { id: 'hotels', label: 'Hotels', icon: <Building2 className="h-4 w-4" />, group: 'Content' },
    { id: 'sliders', label: 'Hero Sliders', icon: <Star className="h-4 w-4" />, group: 'Content' },
    { id: 'menu', label: 'Menu Items', icon: <Menu className="h-4 w-4" />, group: 'Content' },
    { id: 'cabinet', label: 'Cabinet Members', icon: <Users className="h-4 w-4" />, group: 'People' },
    { id: 'contacts', label: 'Contact Messages', icon: <Mail className="h-4 w-4" />, group: 'Inbox' },
    { id: 'service-requests', label: 'Service Requests', icon: <MessageSquare className="h-4 w-4" />, group: 'Inbox' },
    { id: 'approvals', label: 'Approval Queue', icon: <CheckCircle2 className="h-4 w-4" />, group: 'Admin' },
    { id: 'users', label: 'Admin Users', icon: <User className="h-4 w-4" />, group: 'Admin' },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="h-4 w-4" />, group: 'Admin' },
    { id: 'audit', label: 'Audit Log', icon: <Eye className="h-4 w-4" />, group: 'Admin' },
  ]

  const handleNav = (id: ActiveSection) => {
    setActiveSection(id)
    setSidebarOpen(false)
  }

  // ==================== DASHBOARD LAYOUT ====================
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex flex-col border-r transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#0d4a28' }}
      >
        {/* Sidebar header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-white" />
            <div>
              <p className="text-white font-bold text-sm">Dessie Admin</p>
              <Badge
                className="text-[10px] px-1.5 py-0"
                style={{
                  backgroundColor: isChecker ? '#c8a415' : '#1a6b3c',
                  color: 'white',
                  borderColor: 'transparent',
                }}
              >
                {isChecker ? 'Checker' : 'Maker'}
              </Badge>
            </div>
          </div>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <Separator className="bg-white/20" />

        {/* Nav items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-white/20">
          <div className="flex items-center gap-2 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.name}</p>
              <p className="text-white/50 text-[10px] truncate">{user.username}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 text-sm"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold" style={{ color: '#0d4a28' }}>
            {navItems.find(n => n.id === activeSection)?.label || 'Dashboard'}
          </h1>
        </header>

        <div className="p-4 md:p-6">
          {activeSection === 'dashboard' && <DashboardSection isChecker={isChecker} />}
          {activeSection === 'news' && <NewsSection isChecker={isChecker} />}
          {activeSection === 'vacancies' && <VacancySection isChecker={isChecker} />}
          {activeSection === 'bids' && <BidSection isChecker={isChecker} />}
          {activeSection === 'announcements' && <SimpleSection model="announcements" label="Announcement" isChecker={isChecker} fields={['title','content','priority','status']} />}
          {activeSection === 'projects' && <SimpleSection model="projects" label="Project" isChecker={isChecker} fields={['title','category','status','description','budget','progress']} />}
          {activeSection === 'hotels' && <SimpleSection model="hotels" label="Hotel" isChecker={isChecker} fields={['name','location','rating','priceRange','description','phone','email','image']} />}
          {activeSection === 'cabinet' && <SimpleSection model="cabinet-members" label="Cabinet Member" isChecker={isChecker} fields={['name','title','department','bio','email','phone','photo']} />}
          {activeSection === 'sliders' && <SimpleSection model="sliders" label="Slider Image" isChecker={isChecker} fields={['title','subtitle','image','sliderType','tag','link']} />}
          {activeSection === 'menu' && <SimpleSection model="menu-items" label="Menu Item" isChecker={isChecker} fields={['label','pageId','order','icon']} />}
          {activeSection === 'contacts' && <InboxSection model="contacts" label="Contact Messages" />}
          {activeSection === 'service-requests' && <InboxSection model="service-requests" label="Service Requests" />}
          {activeSection === 'approvals' && <ApprovalSection isChecker={isChecker} />}
          {activeSection === 'users' && <UsersSection />}
          {activeSection === 'settings' && <SettingsSection />}
          {activeSection === 'audit' && <AuditSection />}
        </div>
      </main>
    </div>
  )
}

/* ========================= APPROVAL BADGE ========================= */
function ApprovalBadge({ status }: { status: string }) {
  const s = status || 'pending'
  const styleMap: Record<string, React.CSSProperties> = {
    pending: { backgroundColor: '#fbbf24', color: '#78350f', borderColor: 'transparent' },
    approved: { backgroundColor: '#22c55e', color: '#052e16', borderColor: 'transparent' },
    rejected: { backgroundColor: '#ef4444', color: '#fff', borderColor: 'transparent' },
  }
  const style = styleMap[s] || styleMap.pending
  return (
    <Badge className="text-[10px] px-2 py-0.5 font-medium" style={style}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </Badge>
  )
}

/* ========================= LOADING SKELETON ========================= */
function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-8 rounded bg-gray-200 animate-pulse flex-1"
              style={{ animationDelay: `${(r * cols + c) * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ========================= DASHBOARD SECTION ========================= */
function DashboardSection({ isChecker }: { isChecker: boolean }) {
  const { toast } = useToast()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      } else {
        toast({ title: 'Error', description: 'Failed to load stats', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Network error', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => { fetchStats() }, [fetchStats])

  const statCards = stats
    ? [
        { label: 'Total News', value: stats.news, icon: <Newspaper className="h-5 w-5" /> },
        { label: 'Vacancies', value: stats.vacancies, icon: <Briefcase className="h-5 w-5" /> },
        { label: 'Bids & Tenders', value: stats.bids, icon: <FileText className="h-5 w-5" /> },
        { label: 'Contact Messages', value: stats.contacts, icon: <Mail className="h-5 w-5" /> },
        { label: 'Service Requests', value: stats.serviceRequests, icon: <MessageSquare className="h-5 w-5" /> },
      ]
    : []

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4"><div className="h-24 bg-gray-200 animate-pulse rounded" /></Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map(card => (
          <Card key={card.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
                <div className="p-1.5 rounded-md" style={{ backgroundColor: '#0d4a2815' }}>
                  <span style={{ color: '#0d4a28' }}>{card.icon}</span>
                </div>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#0d4a28' }}>
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent contacts and service requests */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: '#0d4a28' }}>
              <Phone className="h-4 w-4" /> Recent Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentContacts && stats.recentContacts.length > 0 ? (
              <div className="space-y-3">
                {stats.recentContacts.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.subject}</p>
                    </div>
                    <Badge variant={c.status === 'read' ? 'secondary' : 'default'} className="text-[10px] ml-2">
                      {c.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No contact messages yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: '#0d4a28' }}>
              <MessageSquare className="h-4 w-4" /> Recent Service Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentServiceRequests && stats.recentServiceRequests.length > 0 ? (
              <div className="space-y-3">
                {stats.recentServiceRequests.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.serviceType}</p>
                    </div>
                    <Badge variant={s.status === 'resolved' ? 'secondary' : 'default'} className="text-[10px] ml-2">
                      {s.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No service requests yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Role info banner */}
      <Card className="border-0 shadow-sm" style={{ backgroundColor: isChecker ? '#0d4a2808' : '#c8a41508' }}>
        <CardContent className="p-4 flex items-center gap-3">
          <Shield className="h-5 w-5" style={{ color: isChecker ? '#0d4a28' : '#c8a415' }} />
          <p className="text-sm">
            You are logged in as a <strong>{isChecker ? 'Checker' : 'Maker'}</strong>.
            {isChecker
              ? ' You can create content (auto-approved) and approve/reject items from makers.'
              : ' You can create content, which will require checker approval before publishing.'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

/* ========================= NEWS SECTION ========================= */
function NewsSection({ isChecker }: { isChecker: boolean }) {
  const { toast } = useToast()
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'General', image: '', author: '' })

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/news')
      if (res.ok) setItems(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const openCreate = () => {
    setEditingItem(null)
    setForm({ title: '', excerpt: '', content: '', category: 'General', image: '', author: '' })
    setDialogOpen(true)
  }

  const openEdit = (item: NewsItem) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      image: item.image || '',
      author: item.author || '',
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editingItem ? `/api/admin/news?id=${editingItem.id}` : '/api/admin/news'
      const method = editingItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) {
        toast({
          title: isChecker ? 'Content saved and published.' : 'Content created. Waiting for approval.',
          description: isChecker ? 'Content approved and published.' : 'A checker will review your submission.',
        })
        setDialogOpen(false)
        fetchItems()
      } else {
        const data = await res.json()
        toast({ title: 'Error', description: data.error || 'Failed to save', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Network error', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: 'Deleted', description: 'News article deleted.' })
        fetchItems()
      }
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} article(s) total</p>
        <Button
          onClick={openCreate}
          className="text-white"
          style={{ backgroundColor: '#0d4a28' }}
        >
          <Plus className="h-4 w-4 mr-2" /> Add News
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#0d4a2808' }}>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6}><TableSkeleton rows={4} cols={5} /></TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No news articles yet</TableCell></TableRow>
              ) : (
                items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">{item.title}</TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant="outline">{item.category}</Badge></TableCell>
                    <TableCell className="hidden sm:table-cell"><Badge variant="secondary">{item.status}</Badge></TableCell>
                    <TableCell><ApprovalBadge status={item.approvalStatus} /></TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {(item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(item)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: '#0d4a28' }}>
              {editingItem ? 'Edit News Article' : 'Add News Article'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Article title" />
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Brief summary" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Full article content" rows={5} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['General', 'Politics', 'Economy', 'Culture', 'Sports', 'Technology', 'Health', 'Education'].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} placeholder="Author name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSave}
              disabled={saving || !form.title || !form.content}
              className="text-white"
              style={{ backgroundColor: '#0d4a28' }}
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ========================= VACANCY SECTION ========================= */
function VacancySection({ isChecker }: { isChecker: boolean }) {
  const { toast } = useToast()
  const [items, setItems] = useState<VacancyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<VacancyItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', department: '', type: 'Full-time', salary: '', deadline: '', description: '', requirements: '',
  })

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/vacancies')
      if (res.ok) setItems(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const openCreate = () => {
    setEditingItem(null)
    setForm({ title: '', department: '', type: 'Full-time', salary: '', deadline: '', description: '', requirements: '' })
    setDialogOpen(true)
  }

  const openEdit = (item: VacancyItem) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      department: item.department,
      type: item.type,
      salary: item.salary,
      deadline: item.deadline,
      description: item.description,
      requirements: item.requirements,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editingItem ? `/api/admin/vacancies?id=${editingItem.id}` : '/api/admin/vacancies'
      const method = editingItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) {
        toast({
          title: isChecker ? 'Content saved and published.' : 'Content created. Waiting for approval.',
          description: isChecker ? 'Content approved and published.' : 'A checker will review your submission.',
        })
        setDialogOpen(false)
        fetchItems()
      } else {
        const data = await res.json()
        toast({ title: 'Error', description: data.error || 'Failed to save', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Network error', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vacancy?')) return
    try {
      const res = await fetch(`/api/admin/vacancies?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: 'Deleted', description: 'Vacancy deleted.' })
        fetchItems()
      }
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} vacancy/vacancies</p>
        <Button onClick={openCreate} className="text-white" style={{ backgroundColor: '#0d4a28' }}>
          <Plus className="h-4 w-4 mr-2" /> Add Vacancy
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#0d4a2808' }}>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Salary</TableHead>
                <TableHead className="hidden sm:table-cell">Deadline</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7}><TableSkeleton rows={4} cols={6} /></TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No vacancies yet</TableCell></TableRow>
              ) : (
                items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-[180px] truncate">{item.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.department}</TableCell>
                    <TableCell className="hidden lg:table-cell"><Badge variant="outline">{item.type}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">{item.salary}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs">{item.deadline}</TableCell>
                    <TableCell><ApprovalBadge status={item.approvalStatus} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(item)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: '#0d4a28' }}>
              {editingItem ? 'Edit Vacancy' : 'Add Vacancy'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Job title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Input value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="Department" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Salary</Label>
                <Input value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} placeholder="e.g. ETB 15,000" />
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Job description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Requirements (comma-separated)</Label>
              <Textarea value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder="BA Degree, 3 years experience, ..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !form.title || !form.department} className="text-white" style={{ backgroundColor: '#0d4a28' }}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ========================= BID SECTION ========================= */
function BidSection({ isChecker }: { isChecker: boolean }) {
  const { toast } = useToast()
  const [items, setItems] = useState<BidItem[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<BidItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', reference: '', category: 'Construction', budget: '', deadline: '', description: '', requirements: '',
  })

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bids')
      if (res.ok) setItems(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const openCreate = () => {
    setEditingItem(null)
    setForm({ title: '', reference: '', category: 'Construction', budget: '', deadline: '', description: '', requirements: '' })
    setDialogOpen(true)
  }

  const openEdit = (item: BidItem) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      reference: item.reference,
      category: item.category,
      budget: item.budget,
      deadline: item.deadline,
      description: item.description,
      requirements: item.requirements,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editingItem ? `/api/admin/bids?id=${editingItem.id}` : '/api/admin/bids'
      const method = editingItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) {
        toast({
          title: isChecker ? 'Content saved and published.' : 'Content created. Waiting for approval.',
          description: isChecker ? 'Content approved and published.' : 'A checker will review your submission.',
        })
        setDialogOpen(false)
        fetchItems()
      } else {
        const data = await res.json()
        toast({ title: 'Error', description: data.error || 'Failed to save', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Network error', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this bid?')) return
    try {
      const res = await fetch(`/api/admin/bids?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: 'Deleted', description: 'Bid deleted.' })
        fetchItems()
      }
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} bid(s) total</p>
        <Button onClick={openCreate} className="text-white" style={{ backgroundColor: '#0d4a28' }}>
          <Plus className="h-4 w-4 mr-2" /> Add Bid
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#0d4a2808' }}>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Reference</TableHead>
                <TableHead className="hidden lg:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Budget</TableHead>
                <TableHead className="hidden sm:table-cell">Deadline</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7}><TableSkeleton rows={4} cols={6} /></TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No bids yet</TableCell></TableRow>
              ) : (
                items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-[180px] truncate">{item.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs">{item.reference}</TableCell>
                    <TableCell className="hidden lg:table-cell"><Badge variant="outline">{item.category}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">{item.budget}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs">{item.deadline}</TableCell>
                    <TableCell><ApprovalBadge status={item.approvalStatus} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(item)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: '#0d4a28' }}>
              {editingItem ? 'Edit Bid / Tender' : 'Add Bid / Tender'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Bid title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Reference Number</Label>
                <Input value={form.reference} onChange={e => setForm(p => ({ ...p, reference: e.target.value }))} placeholder="e.g. DCA/BID/2025/001" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Construction', 'Consultancy', 'Supply', 'Service', 'Technology', 'Infrastructure', 'Other'].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Budget</Label>
                <Input value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} placeholder="e.g. ETB 5,000,000" />
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Bid description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Requirements (comma-separated)</Label>
              <Textarea value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder="License, 5 years experience, ..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !form.title || !form.reference} className="text-white" style={{ backgroundColor: '#0d4a28' }}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ========================= APPROVAL SECTION ========================= */
function ApprovalSection({ isChecker }: { isChecker: boolean }) {
  const { toast } = useToast()
  const [items, setItems] = useState<PendingItem[]>([])
  const [pendingCounts, setPendingCounts] = useState<{ news: number; vacancies: number; bids: number }>({ news: 0, vacancies: 0, bids: 0 })
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)

  const fetchPending = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/approve')
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || [])
        setPendingCounts(data.pending || { news: 0, vacancies: 0, bids: 0 })
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchPending() }, [fetchPending])

  const handleAction = async (model: string, id: string, action: 'approve' | 'reject') => {
    setActing(`${id}-${action}`)
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, id, action }),
      })
      if (res.ok) {
        toast({
          title: action === 'approve' ? 'Content approved and published.' : 'Content rejected.',
          description: action === 'approve' ? 'The item is now live.' : 'The item has been rejected.',
        })
        fetchPending()
      } else {
        const data = await res.json()
        toast({ title: 'Error', description: data.error || 'Action failed', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Network error', variant: 'destructive' })
    } finally {
      setActing(null)
    }
  }

  const modelBadgeColor: Record<string, React.CSSProperties> = {
    NewsArticle: { backgroundColor: '#e0f2fe', color: '#0369a1', borderColor: 'transparent' },
    Vacancy: { backgroundColor: '#fef3c7', color: '#92400e', borderColor: 'transparent' },
    Bid: { backgroundColor: '#ede9fe', color: '#5b21b6', borderColor: 'transparent' },
  }

  if (!isChecker) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <Clock className="h-12 w-12 mx-auto mb-4 text-amber-500" />
          <h3 className="text-lg font-semibold mb-2">Your items are pending approval</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            As a Maker, your created content requires approval from a Checker before it can be published. Please check back later or contact a Checker.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Pending counts */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'News', count: pendingCounts.news, color: '#0369a1' },
          { label: 'Vacancies', count: pendingCounts.vacancies, color: '#92400e' },
          { label: 'Bids', count: pendingCounts.bids, color: '#5b21b6' },
        ].map(c => (
          <Card key={c.label} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: c.color }}>{c.count}</p>
              <p className="text-xs text-muted-foreground">{c.label} pending</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending items list */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base" style={{ color: '#0d4a28' }}>Pending Items</CardTitle>
            <Button variant="outline" size="sm" onClick={fetchPending}>
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-500" />
              <p className="text-sm text-muted-foreground">All caught up! No pending items.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="text-[10px] px-1.5 py-0" style={modelBadgeColor[item._model] || modelBadgeColor.NewsArticle}>
                        {item._model === 'NewsArticle' ? 'News' : item._model}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {(item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A")}
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate">{item.title}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="text-white text-xs"
                      style={{ backgroundColor: '#16a34a' }}
                      disabled={acting === `${item.id}-approve`}
                      onClick={() => handleAction(item._model, item.id, 'approve')}
                    >
                      {acting === `${item.id}-approve` ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <CheckCircle2 className="h-3 w-3 mr-1" />}
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs text-red-600 border-red-300 hover:bg-red-50"
                      disabled={acting === `${item.id}-reject`}
                      onClick={() => handleAction(item._model, item.id, 'reject')}
                    >
                      {acting === `${item.id}-reject` ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/* ========================= AUDIT SECTION ========================= */
function AuditSection() {
  const { toast } = useToast()
  const [logs, setLogs] = useState<AuditLogEntry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/audit?limit=50')
        if (res.ok) {
          const data = await res.json()
          setLogs(data.logs || [])
          setTotal(data.total || 0)
        } else {
          toast({ title: 'Error', description: 'Failed to load audit logs', variant: 'destructive' })
        }
      } catch {
        toast({ title: 'Network error', variant: 'destructive' })
      } finally {
        setLoading(false)
      }
    })()
  }, [toast])

  const actionColor: Record<string, React.CSSProperties> = {
    create: { backgroundColor: '#dcfce7', color: '#166534', borderColor: 'transparent' },
    update: { backgroundColor: '#dbeafe', color: '#1e40af', borderColor: 'transparent' },
    delete: { backgroundColor: '#fee2e2', color: '#991b1b', borderColor: 'transparent' },
    approve: { backgroundColor: '#d1fae5', color: '#065f46', borderColor: 'transparent' },
    reject: { backgroundColor: '#fee2e2', color: '#991b1b', borderColor: 'transparent' },
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{total} log entries total (showing latest 50)</p>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#0d4a2808' }}>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5}><TableSkeleton rows={6} cols={4} /></TableCell></TableRow>
              ) : logs.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No audit logs yet</TableCell></TableRow>
              ) : (
                logs.map(log => {
                  let details = ''
                  try { details = (() => { try { return JSON.parse(log.details || '{}').title || log.details || '' } catch { return log.details || '' } })() } catch { details = log.details }
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="text-xs whitespace-nowrap">
                        {(log.createdAt ? new Date(log.createdAt).toLocaleString() : "N/A")}
                      </TableCell>
                      <TableCell className="text-sm">{(log.admin?.name || 'Unknown')}</TableCell>
                      <TableCell>
                        <Badge className="text-[10px] px-2 py-0.5 capitalize" style={actionColor[log.action] || actionColor.update}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.model}</TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground max-w-[250px] truncate">
                        {details}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

/* ========================= SIMPLE CRUD SECTION (Hotels, Projects, Announcements, Cabinet) ========================= */
function SimpleSection({ model, label, isChecker, fields }: { model: string; label: string; isChecker: boolean; fields: string[] }) {
  const { toast } = useToast()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Record<string, string>>({})

  const endpoint = `/api/admin/${model}`

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(endpoint)
      if (res.ok) setItems(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [endpoint])

  useEffect(() => { fetchItems() }, [fetchItems])

  const openCreate = () => {
    setEditingItem(null)
    const empty: Record<string, string> = {}
    fields.forEach(f => { empty[f] = '' })
    setForm(empty)
    setDialogOpen(true)
  }

  const openEdit = (item: any) => {
    setEditingItem(item)
    const filled: Record<string, string> = {}
    fields.forEach(f => { filled[f] = String(item[f] ?? '') })
    setForm(filled)
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editingItem ? `${endpoint}?id=${editingItem.id}` : endpoint
      const method = editingItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) {
        toast({ title: isChecker ? 'Saved & published' : 'Created — awaiting approval' })
        setDialogOpen(false)
        fetchItems()
      } else {
        const d = await res.json()
        toast({ title: 'Error', description: d.error || 'Save failed', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Network error', variant: 'destructive' })
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete this ${label}?`)) return
    try {
      const res = await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' })
      if (res.ok) { toast({ title: 'Deleted' }); fetchItems() }
    } catch { toast({ title: 'Error', variant: 'destructive' }) }
  }

  const titleField = fields[0]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} {label}(s)</p>
        <Button onClick={openCreate} className="text-white" style={{ backgroundColor: '#0d4a28' }}>
          <Plus className="h-4 w-4 mr-2" /> Add {label}
        </Button>
      </div>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: '#0d4a2808' }}>
                <TableHead>{titleField.charAt(0).toUpperCase() + titleField.slice(1)}</TableHead>
                {fields[1] && <TableHead className="hidden md:table-cell">{fields[1]}</TableHead>}
                {fields[2] && <TableHead className="hidden lg:table-cell">{fields[2]}</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4}><TableSkeleton rows={3} cols={3} /></TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No {label}s yet</TableCell></TableRow>
              ) : items.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{item[titleField]}</TableCell>
                  {fields[1] && <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{item[fields[1]]}</TableCell>}
                  {fields[2] && <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{item[fields[2]]}</TableCell>}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle style={{ color: '#0d4a28' }}>{editingItem ? `Edit ${label}` : `Add ${label}`}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {fields.map(f => (
              <div key={f} className="space-y-1.5">
                <Label>{f.charAt(0).toUpperCase() + f.slice(1)}</Label>
                {f === 'content' || f === 'description' || f === 'bio' ? (
                  <Textarea value={form[f] || ''} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} rows={3} />
                ) : (f === 'photo' || f === 'image') ? (
                  <div className="space-y-2">
                    {form[f] && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#e2e8e0]">
                        <img src={form[f]} alt="preview" className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).src = '/dessie-logo.png' }} />
                      </div>
                    )}
                    <Input value={form[f] || ''} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} placeholder="Enter image URL (e.g. /mayor-photo.png)" />
                    <div className="flex flex-wrap gap-1.5">
                      <p className="w-full text-[10px] text-muted-foreground font-semibold uppercase">Quick select:</p>
                      {['/mayor-photo.png','/official-logo.png','/dessie-city-hall.png','/dessie-smart-center.png','/dessie-service-center.png','/news-meeting.png','/news-smart-city.png','/news-health.png','/news-culture.png','/heritage-landscape.png'].map(img => (
                        <button key={img} type="button" onClick={() => setForm(p => ({ ...p, [f]: img }))}
                          className={`w-10 h-10 rounded overflow-hidden border-2 transition-all ${form[f] === img ? 'border-[#0d4a28] scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                          <img src={img} alt="" className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display='none' }} />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Input value={form[f] || ''} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} placeholder={f} />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="text-white" style={{ backgroundColor: '#0d4a28' }}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}{editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ========================= INBOX SECTION (Contacts, Service Requests) ========================= */
function InboxSection({ model, label }: { model: string; label: string }) {
  const { toast } = useToast()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/admin/${model}`).then(r => r.ok ? r.json() : []).then(setItems).catch(() => {}).finally(() => setLoading(false))
  }, [model])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      const res = await fetch(`/api/admin/${model}?id=${id}`, { method: 'DELETE' })
      if (res.ok) { toast({ title: 'Deleted' }); setItems(p => p.filter(i => i.id !== id)); setSelected(null) }
    } catch { toast({ title: 'Error', variant: 'destructive' }) }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{items.length} {label}</p>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow style={{ backgroundColor: '#0d4a2808' }}>
                <TableHead>From</TableHead>
                <TableHead className="hidden sm:table-cell">Subject/Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {loading ? <TableRow><TableCell colSpan={3}><TableSkeleton rows={4} cols={3} /></TableCell></TableRow>
                : items.length === 0 ? <TableRow><TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No messages</TableCell></TableRow>
                : items.map(item => (
                  <TableRow key={item.id} className={`cursor-pointer ${selected?.id === item.id ? 'bg-[#0d4a2810]' : ''}`} onClick={() => setSelected(item)}>
                    <TableCell className="font-medium text-sm truncate max-w-[120px]">{item.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground truncate max-w-[120px]">{item.subject || item.serviceType || ''}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{item.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {selected && (
          <Card className="border-0 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm" style={{ color: '#0d4a28' }}>Message Details</h3>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => handleDelete(selected.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-semibold text-muted-foreground text-xs">FROM:</span><p>{selected.name}</p></div>
              <div><span className="font-semibold text-muted-foreground text-xs">EMAIL:</span><p>{selected.email}</p></div>
              {selected.phone && <div><span className="font-semibold text-muted-foreground text-xs">PHONE:</span><p>{selected.phone}</p></div>}
              {selected.subject && <div><span className="font-semibold text-muted-foreground text-xs">SUBJECT:</span><p>{selected.subject}</p></div>}
              {selected.serviceType && <div><span className="font-semibold text-muted-foreground text-xs">SERVICE:</span><p>{selected.serviceType}</p></div>}
              <div><span className="font-semibold text-muted-foreground text-xs">MESSAGE:</span><p className="mt-1 text-muted-foreground leading-relaxed">{selected.message}</p></div>
              <div><span className="font-semibold text-muted-foreground text-xs">DATE:</span><p>{new Date(selected.createdAt).toLocaleString()}</p></div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

/* ========================= USERS SECTION ========================= */
function UsersSection() {
  const { toast } = useToast()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/seed').then(r => r.ok ? r.json() : []).then(data => { if (Array.isArray(data)) setUsers(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{users.length} admin user(s)</p>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow style={{ backgroundColor: '#0d4a2808' }}>
              <TableHead>Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {loading ? <TableRow><TableCell colSpan={5}><TableSkeleton rows={3} cols={4} /></TableCell></TableRow>
              : users.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No admin users</TableCell></TableRow>
              : users.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-mono text-sm">{u.username}</TableCell>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell><Badge style={{ backgroundColor: u.role === 'super_admin' ? '#c8a415' : '#1a6b3c', color: 'white', borderColor: 'transparent' }} className="text-[10px]">{u.role === 'super_admin' ? 'Checker' : 'Maker'}</Badge></TableCell>
                  <TableCell><Badge variant={u.active ? 'default' : 'secondary'} className="text-[10px]">{u.active ? 'Active' : 'Inactive'}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{(u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

/* ========================= SETTINGS SECTION ========================= */
function SettingsSection() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/admin/site-settings').then(r => r.ok ? r.json() : []).then(data => {
      if (Array.isArray(data)) {
        setSettings(data)
        const vals: Record<string, string> = {}
        data.forEach((s: any) => { vals[s.key] = s.value })
        setEditValues(vals)
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSave = async (key: string) => {
    setSaving(key)
    try {
      const res = await fetch('/api/admin/site-settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value: editValues[key] }) })
      if (res.ok) toast({ title: 'Setting saved' })
      else toast({ title: 'Error', variant: 'destructive' })
    } catch { toast({ title: 'Network error', variant: 'destructive' }) }
    finally { setSaving(null) }
  }

  if (loading) return <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}</div>

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{settings.length} setting(s)</p>
      <div className="grid gap-3">
        {settings.map(s => (
          <Card key={s.key} className="border-0 shadow-sm">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">{s.key.replace(/_/g, ' ')}</Label>
                <Input value={editValues[s.key] || ''} onChange={e => setEditValues(p => ({ ...p, [s.key]: e.target.value }))} className="mt-1 h-8 text-sm" />
              </div>
              <Button size="sm" className="text-white shrink-0" style={{ backgroundColor: '#0d4a28' }} onClick={() => handleSave(s.key)} disabled={saving === s.key}>
                {saving === s.key ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Save'}
              </Button>
            </CardContent>
          </Card>
        ))}
        {settings.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No settings configured yet</p>}
      </div>
    </div>
  )
}

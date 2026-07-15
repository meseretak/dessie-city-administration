'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PageId } from '@/lib/types'
import { useLang } from '@/lib/LangContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Gavel, Search, Filter, Clock, DollarSign, ChevronLeft, ChevronRight, AlertTriangle,
  FileCheck, Download, Users, ArrowRight, Shield, CheckCircle,
  ClipboardList, UserCheck, CircleCheckBig, Briefcase, Trophy,
  LayoutGrid, List, X, ChevronDown, ChevronUp, Tag, CalendarDays,
  TrendingUp, FolderOpen, Timer,
} from 'lucide-react'

interface BidsPageProps {
  navigateTo: (page: PageId, extra?: Record<string, string>) => void
}

// ─── Category color config ───────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { accent: string; bg: string; text: string; border: string }> = {
  Construction: { accent: 'bg-[#1a6b3c]', bg: 'bg-[#1a6b3c]/10', text: 'text-[#1a6b3c]', border: 'border-[#1a6b3c]/30' },
  IT: { accent: 'bg-[#2563eb]', bg: 'bg-[#2563eb]/10', text: 'text-[#2563eb]', border: 'border-[#2563eb]/30' },
  Consulting: { accent: 'bg-[#7c3aed]', bg: 'bg-[#7c3aed]/10', text: 'text-[#7c3aed]', border: 'border-[#7c3aed]/30' },
  Supplies: { accent: 'bg-[#d97706]', bg: 'bg-[#d97706]/10', text: 'text-[#d97706]', border: 'border-[#d97706]/30' },
  Services: { accent: 'bg-[#0d9488]', bg: 'bg-[#0d9488]/10', text: 'text-[#0d9488]', border: 'border-[#0d9488]/30' },
}

// ─── Tender data ─────────────────────────────────────────────────────
const tenders = [
  {
    id: 'b1', title: 'CONSTRUCTION OF KEBELE 05 COMMUNITY CENTER AND RECREATIONAL FACILITIES',
    reference: 'DCA/PROC/2025/042', category: 'Construction', budget: 'ETB 15,000,000',
    budgetNum: 15000000, deadline: 'Aug 20, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Construction of a modern community center including meeting halls, administrative offices, library, indoor sports facilities, and outdoor recreational areas in Kebele 05.',
    requirements: [
      'Minimum 5 years construction experience',
      'Valid Grade 4+ contractor license',
      'Experience with community facility projects',
      'Financial capacity of at least ETB 10M',
      'Registered with the city procurement office',
    ],
  },
  {
    id: 'b2', title: 'COMPREHENSIVE IT INFRASTRUCTURE UPGRADE FOR CITY ADMINISTRATION',
    reference: 'DCA/PROC/2025/043', category: 'IT', budget: 'ETB 8,500,000',
    budgetNum: 8500000, deadline: 'Aug 10, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Supply and installation of servers, networking equipment, security systems, and software licenses for the city administration\'s 15 office buildings.',
    requirements: [
      'Certified IT infrastructure partner',
      'Minimum 3 enterprise deployment references',
      '24/7 technical support capability',
      'ISO 27001 or equivalent certification',
      'Experience with government IT projects',
    ],
  },
  {
    id: 'b3', title: 'CONSULTING SERVICES FOR COMPREHENSIVE URBAN MASTER PLAN DEVELOPMENT',
    reference: 'DCA/PROC/2025/044', category: 'Consulting', budget: 'ETB 3,200,000',
    budgetNum: 3200000, deadline: 'Aug 25, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Professional consulting services for the development of Dessie\'s 10-year comprehensive urban master plan including land use, transportation, and infrastructure planning.',
    requirements: [
      'Registered consulting firm with 10+ years experience',
      'Urban planning expertise with similar projects',
      'Multidisciplinary team of at least 8 professionals',
      'Experience with Ethiopian urban planning standards',
      'GIS and spatial analysis capabilities',
    ],
  },
  {
    id: 'b4', title: 'SUPPLY AND DELIVERY OF OFFICE FURNITURE FOR NEW ADMINISTRATION BUILDING',
    reference: 'DCA/PROC/2025/045', category: 'Supplies', budget: 'ETB 2,500,000',
    budgetNum: 2500000, deadline: 'Aug 5, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Supply and delivery of modern office furniture including desks, chairs, filing cabinets, and conference room equipment for the newly constructed administration building.',
    requirements: [
      'Furniture manufacturer or authorized distributor',
      'Minimum 3 years supply experience',
      'Warranty of at least 3 years on all items',
      'Showroom available for product inspection',
      'Delivery and installation capability',
    ],
  },
  {
    id: 'b5', title: 'ANNUAL ROAD MAINTENANCE AND REPAIR SERVICES FOR ALL CITY ROADS',
    reference: 'DCA/PROC/2025/046', category: 'Services', budget: 'ETB 12,000,000',
    budgetNum: 12000000, deadline: 'Aug 15, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Annual road maintenance and repair services including pothole filling, resurfacing, shoulder repair, and drainage maintenance for all city roads.',
    requirements: [
      'Road construction Grade 3+ license',
      'Own asphalt mixing plant or reliable supplier',
      'Fleet of road maintenance equipment',
      'Minimum 20 qualified technical staff',
      'Experience with municipal road projects',
    ],
  },
  {
    id: 'b6', title: 'SOLAR PANEL INSTALLATION ON 20 CITY ADMINISTRATION BUILDINGS',
    reference: 'DCA/PROC/2025/047', category: 'Construction', budget: 'ETB 6,500,000',
    budgetNum: 6500000, deadline: 'Sep 1, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Design, supply, and installation of grid-tied solar photovoltaic systems on 20 city administration buildings to reduce energy costs and promote renewable energy.',
    requirements: [
      'Solar installation certification',
      'Minimum 5 similar installation references',
      'Grid-tied system design experience',
      '25-year panel performance warranty',
      'Local maintenance and support team',
    ],
  },
  {
    id: 'b7', title: 'WATER PIPELINE EXTENSION PROJECT FOR EASTERN RESIDENTIAL AREAS',
    reference: 'DCA/PROC/2025/048', category: 'Construction', budget: 'ETB 22,000,000',
    budgetNum: 22000000, deadline: 'Aug 30, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Construction of 15km water pipeline extension, pumping stations, and reservoir to serve newly developed residential areas on the eastern outskirts of Dessie.',
    requirements: [
      'Grade 3+ water works contractor license',
      'Experience with pipeline projects over 10km',
      'Own heavy earth-moving equipment',
      'Environmental impact assessment capability',
      'Minimum ETB 15M financial capacity',
    ],
  },
  {
    id: 'b8', title: 'SECURITY SERVICES FOR ALL CITY ADMINISTRATION BUILDINGS AND FACILITIES',
    reference: 'DCA/PROC/2025/039', category: 'Services', budget: 'ETB 5,500,000',
    budgetNum: 5500000, deadline: 'Jun 30, 2025', status: 'Awarded' as const,
    awardedTo: 'Ethiopian Federal Security Services PLC',
    description: 'Comprehensive security services including guarding, access control, CCTV monitoring, and emergency response for all city administration buildings.',
    requirements: [
      'Licensed security services provider',
      'Minimum 200 trained security personnel',
      'CCTV monitoring center capability',
      '24/7 emergency response protocol',
      'Government security clearance',
    ],
  },
  {
    id: 'b9', title: 'SUPPLY OF MEDICAL EQUIPMENT FOR NEW HEALTH CENTER IN KEBELE 08',
    reference: 'DCA/PROC/2025/049', category: 'Supplies', budget: 'ETB 4,000,000',
    budgetNum: 4000000, deadline: 'Aug 18, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Supply and installation of medical equipment including diagnostic machines, laboratory equipment, and patient monitoring systems for the new health center.',
    requirements: [
      'Medical equipment supplier license',
      'ISO 13485 quality management certification',
      'After-sales service and calibration',
      'Spare parts availability commitment',
      'Training for health center staff included',
    ],
  },
  {
    id: 'b10', title: 'URBAN GREEN SPACE DEVELOPMENT AND LANDSCAPING SERVICES',
    reference: 'DCA/PROC/2025/050', category: 'Services', budget: 'ETB 3,800,000',
    budgetNum: 3800000, deadline: 'Sep 5, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Development of public parks, green spaces, street landscaping, and tree planting programs across 8 kebeles to enhance the city\'s green infrastructure.',
    requirements: [
      'Landscape architecture certification',
      'Nursery and plant supply capability',
      'Experience with public park projects',
      'Irrigation system design and installation',
      '12-month maintenance plan included',
    ],
  },
  {
    id: 'b11', title: 'STREET LIGHTING SYSTEM INSTALLATION ON MAJOR ROADS',
    reference: 'DCA/PROC/2025/051', category: 'Construction', budget: 'ETB 9,000,000',
    budgetNum: 9000000, deadline: 'Aug 22, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Installation of energy-efficient LED street lighting systems on 30km of major roads including poles, wiring, control systems, and solar backup power.',
    requirements: [
      'Electrical contractor Grade 2+ license',
      'LED lighting system installation experience',
      'Solar power integration capability',
      'Smart control system experience',
      '2-year comprehensive warranty',
    ],
  },
  {
    id: 'b12', title: 'WASTE MANAGEMENT AND SANITATION SERVICES FOR CITYWIDE OPERATIONS',
    reference: 'DCA/PROC/2025/052', category: 'Services', budget: 'ETB 7,200,000',
    budgetNum: 7200000, deadline: 'Aug 28, 2025', status: 'Open' as const, awardedTo: '',
    description: 'Comprehensive waste collection, transportation, disposal, and recycling services covering all 12 kebeles with a minimum of twice-weekly collection frequency.',
    requirements: [
      'Waste management license',
      'Fleet of specialized collection vehicles',
      'Recycling and composting facility access',
      'Minimum 3 years municipal experience',
      'Health and safety compliance certification',
    ],
  },
]

const categories = ['All', 'Construction', 'IT', 'Consulting', 'Supplies', 'Services']
const statuses = ['All', 'Open', 'Awarded']
const budgetRanges = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Under ETB 5M', min: 0, max: 5000000 },
  { label: 'ETB 5M – 10M', min: 5000000, max: 10000000 },
  { label: 'ETB 10M – 20M', min: 10000000, max: 20000000 },
  { label: 'Over ETB 20M', min: 20000000, max: Infinity },
]

const ITEMS_PER_PAGE = 6

// ─── Helpers ─────────────────────────────────────────────────────────
function parseBudget(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0
}

function isDeadlineSoon(deadline: string): boolean {
  const d = new Date(deadline)
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  return diff > 0 && diff <= 7 * 24 * 60 * 60 * 1000
}

function isDeadlinePassed(deadline: string): boolean {
  return new Date(deadline).getTime() < Date.now()
}

function formatBudgetShort(num: number): string {
  if (num >= 1000000) return `ETB ${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `ETB ${(num / 1000).toFixed(0)}K`
  return `ETB ${num}`
}

function getCatColors(cat: string) {
  return CATEGORY_COLORS[cat] || { accent: 'bg-[#1a6b3c]', bg: 'bg-[#1a6b3c]/10', text: 'text-[#1a6b3c]', border: 'border-[#1a6b3c]/30' }
}

// ─── Pagination ──────────────────────────────────────────────────────
function Pagination({ total, perPage, current, onChange }: { total: number; perPage: number; current: number; onChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 0}
        className="w-9 h-9 rounded-lg bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0d4a28] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors ${current === i ? 'bg-[#c8a415] text-white' : 'bg-white text-[#333] border border-[#e2e8e0] hover:border-[#1a6b3c]'}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current >= totalPages - 1}
        className="w-9 h-9 rounded-lg bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0d4a28] transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

// ─── Status Badge ────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === 'Awarded') {
    return <Badge className="bg-[#c8a415] text-white text-xs font-semibold">● AWARDED</Badge>
  }
  return <Badge className="bg-[#1a6b3c] text-white text-xs font-semibold">● OPEN</Badge>
}

// ─── Stats Banner ────────────────────────────────────────────────────
function StatsBanner({ tenders: items }: { tenders: typeof tenders }) {
  const openTenders = items.filter(t => t.status === 'Open')
  const totalBudget = openTenders.reduce((sum, t) => sum + (t.budgetNum || 0), 0)
  const uniqueCategories = new Set(items.map(t => t.category)).size

  // Find nearest deadline among open tenders
  const now = Date.now()
  const futureOpen = openTenders
    .map(t => ({ deadline: t.deadline, date: new Date(t.deadline).getTime() }))
    .filter(t => t.date > now)
    .sort((a, b) => a.date - b.date)
  const nearestDeadline = futureOpen.length > 0 ? futureOpen[0].deadline : 'N/A'

  const stats = [
    { icon: FolderOpen, label: 'Open Tenders', value: openTenders.length.toString(), color: 'text-[#1a6b3c]' },
    { icon: TrendingUp, label: 'Total Budget Value', value: formatBudgetShort(totalBudget), color: 'text-[#c8a415]' },
    { icon: Tag, label: 'Categories', value: uniqueCategories.toString(), color: 'text-[#0d9488]' },
    { icon: Timer, label: 'Nearest Deadline', value: nearestDeadline, color: 'text-[#d97706]' },
  ]

  return (
    <section className="bg-[#f0f7f1] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white rounded-xl p-5 border border-[#e2e8e0] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-[#f0f7f1] flex items-center justify-center shrink-0 ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{s.label}</p>
                  <p className={`text-lg font-bold mt-0.5 ${s.color}`}>{s.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Active Filter Chip ──────────────────────────────────────────────
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c] text-xs font-medium border border-[#1a6b3c]/20"
    >
      {label}
      <button onClick={onRemove} className="w-4 h-4 rounded-full hover:bg-[#1a6b3c]/20 flex items-center justify-center transition-colors">
        <X className="w-3 h-3" />
      </button>
    </motion.span>
  )
}

// ─── Tender Card (Grid View) ─────────────────────────────────────────
function TenderCardGrid({
  tender,
  expanded,
  onToggleExpand,
  onNavigate,
}: {
  tender: (typeof tenders)[0]
  expanded: boolean
  onToggleExpand: () => void
  onNavigate: () => void
}) {
  const catColors = getCatColors(tender.category)
  const soon = isDeadlineSoon(tender.deadline)
  const passed = isDeadlinePassed(tender.deadline)

  return (
    <motion.div
      layout
      className="bg-white rounded-xl border border-[#e2e8e0] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="flex">
        {/* Left accent bar */}
        <div className={`w-1 shrink-0 ${catColors.accent}`} />

        <div className="flex-1 p-5">
          {/* Top row: status + reference */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <StatusBadge status={tender.status} />
            <span className="font-mono text-xs text-muted-foreground tracking-wide">{tender.reference}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base uppercase leading-tight text-[#1a1a1a] mb-2">{tender.title}</h3>

          {/* Category badge */}
          <div className="mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${catColors.bg} ${catColors.text} border ${catColors.border}`}>
              {tender.category}
            </span>
          </div>

          {/* Budget - prominent */}
          <div className="flex items-center gap-1.5 mb-3">
            <DollarSign className="w-5 h-5 text-[#c8a415]" />
            <span className="text-lg font-bold text-[#c8a415]">{tender.budget}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">{tender.description}</p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs mb-4">
            {tender.status === 'Open' && (
              <span className={`flex items-center gap-1 ${soon ? 'text-red-600 font-semibold' : passed ? 'text-red-500' : 'text-muted-foreground'}`}>
                <CalendarDays className="w-3.5 h-3.5" />
                {passed ? 'Deadline Passed' : soon ? `Deadline: ${tender.deadline} (SOON!)` : `Deadline: ${tender.deadline}`}
              </span>
            )}
            {tender.awardedTo && (
              <span className="flex items-center gap-1 text-[#c8a415] font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                {tender.awardedTo}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleExpand() }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#e2e8e0] text-xs font-medium text-[#333] hover:bg-[#f0f7f1] hover:border-[#1a6b3c]/30 transition-colors"
            >
              {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> See Less</> : <><ChevronDown className="w-3.5 h-3.5" /> See More</>}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate() }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1a6b3c] text-white text-xs font-medium hover:bg-[#0d4a28] transition-colors"
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0 ml-1 border-t border-[#e2e8e0] mt-0">
              <div className="pt-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0d4a28] mb-2">Full Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{tender.description}</p>

                {tender.requirements.length > 0 && (
                  <>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0d4a28] mb-2">Key Requirements</h4>
                    <ul className="space-y-1.5 mb-4">
                      {tender.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#1a6b3c] shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate() }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a6b3c] hover:text-[#0d4a28] transition-colors"
                >
                  Download Documents <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Tender Row (List View) ──────────────────────────────────────────
function TenderRowList({
  tender,
  expanded,
  onToggleExpand,
  onNavigate,
}: {
  tender: (typeof tenders)[0]
  expanded: boolean
  onToggleExpand: () => void
  onNavigate: () => void
}) {
  const catColors = getCatColors(tender.category)
  const soon = isDeadlineSoon(tender.deadline)
  const passed = isDeadlinePassed(tender.deadline)

  return (
    <motion.div
      layout
      className="bg-white rounded-xl border border-[#e2e8e0] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="flex">
        {/* Left accent bar */}
        <div className={`w-1 shrink-0 ${catColors.accent}`} />

        <div className="flex-1">
          {/* Main row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 p-4 lg:px-5">
            {/* Status + Ref */}
            <div className="flex items-center gap-2 lg:w-36 shrink-0">
              <StatusBadge status={tender.status} />
              <span className="font-mono text-[10px] text-muted-foreground hidden xl:block">{tender.reference}</span>
            </div>

            {/* Title + Category */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xs sm:text-sm uppercase leading-tight text-[#1a1a1a] mb-1 line-clamp-1">{tender.title}</h3>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${catColors.bg} ${catColors.text}`}>
                {tender.category}
              </span>
            </div>

            {/* Budget */}
            <div className="flex items-center gap-1 lg:w-40 shrink-0">
              <DollarSign className="w-4 h-4 text-[#c8a415]" />
              <span className="text-sm font-bold text-[#c8a415]">{tender.budget}</span>
            </div>

            {/* Deadline */}
            <div className={`flex items-center gap-1 text-xs lg:w-36 shrink-0 ${soon ? 'text-red-600 font-semibold' : passed ? 'text-red-500' : 'text-muted-foreground'}`}>
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">
                {tender.status === 'Awarded' ? 'Awarded' : passed ? 'Passed' : tender.deadline}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onToggleExpand}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#e2e8e0] text-xs font-medium text-[#333] hover:bg-[#f0f7f1] transition-colors"
              >
                {expanded ? <><ChevronUp className="w-3 h-3" /> Less</> : <><ChevronDown className="w-3 h-3" /> More</>}
              </button>
              <button
                onClick={onNavigate}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#1a6b3c] text-white text-xs font-medium hover:bg-[#0d4a28] transition-colors"
              >
                Details
              </button>
            </div>
          </div>

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 pt-0 ml-1 border-t border-[#e2e8e0]">
                  <div className="pt-3">
                    <p className="text-xs text-muted-foreground mb-1 font-mono">{tender.reference}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{tender.description}</p>

                    {tender.awardedTo && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Trophy className="w-4 h-4 text-[#c8a415]" />
                        <span className="text-sm font-semibold text-[#c8a415]">Awarded to: {tender.awardedTo}</span>
                      </div>
                    )}

                    {tender.requirements.length > 0 && (
                      <>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0d4a28] mb-2">Key Requirements</h4>
                        <ul className="space-y-1 mb-3">
                          {tender.requirements.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0 mt-0.5" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <button
                      onClick={onNavigate}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a6b3c] hover:text-[#0d4a28] transition-colors"
                    >
                      Download Documents <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────
export default function BidsPage({ navigateTo }: BidsPageProps) {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [budgetRange, setBudgetRange] = useState(0)
  const [page, setPage] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [dbBids, setDbBids] = useState<any[]>([])

  // Fetch bids from DB
  useEffect(() => {
    fetch('/api/admin/bids')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const mapped = data
            .filter(b => b.approvalStatus === 'approved' || !b.approvalStatus)
            .map(b => ({
              id: b.id,
              title: b.title || '',
              reference: b.reference || '',
              category: b.category || 'Other',
              budget: b.budget || 'See details',
              budgetNum: parseInt((b.budget || '0').replace(/[^0-9]/g, '')) || 0,
              deadline: b.deadline || 'See details',
              status: (b.status || 'Open') as 'Open' | 'Closed' | 'Awarded',
              awardedTo: b.awardedTo || '',
              description: b.description || '',
              requirements: (() => { try { return JSON.parse(b.requirements || '[]') } catch { return [b.requirements || ''] } })(),
            }))
          setDbBids(mapped)
        }
      })
      .catch(() => {})
  }, [])

  const allTenders = dbBids.length > 0 ? dbBids : tenders

  const updateCategory = useCallback((value: string) => { setCategory(value); setPage(0) }, [])
  const updateStatus = useCallback((value: string) => { setStatus(value); setPage(0) }, [])
  const updateSearch = useCallback((value: string) => { setSearch(value); setPage(0) }, [])
  const updateBudgetRange = useCallback((value: string) => { setBudgetRange(Number(value)); setPage(0) }, [])

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const clearCategory = useCallback(() => { setCategory('All'); setPage(0) }, [])
  const clearStatus = useCallback(() => { setStatus('All'); setPage(0) }, [])
  const clearBudget = useCallback(() => { setBudgetRange(0); setPage(0) }, [])
  const clearSearch = useCallback(() => { setSearch(''); setPage(0) }, [])

  const filtered = useMemo(() => {
    const range = budgetRanges[budgetRange]
    return allTenders.filter(t => {
      if (category !== 'All' && t.category !== category) return false
      if (status !== 'All' && t.status !== status) return false
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.reference.toLowerCase().includes(search.toLowerCase())) return false
      if (t.budgetNum < range.min || t.budgetNum > range.max) return false
      return true
    })
  }, [category, status, search, budgetRange])

  const pagedItems = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const activeFilters: { label: string; onRemove: () => void }[] = []
  if (category !== 'All') activeFilters.push({ label: `Category: ${category}`, onRemove: clearCategory })
  if (status !== 'All') activeFilters.push({ label: `Status: ${status}`, onRemove: clearStatus })
  if (budgetRange !== 0) activeFilters.push({ label: `Budget: ${budgetRanges[budgetRange].label}`, onRemove: clearBudget })
  if (search) activeFilters.push({ label: `Search: "${search}"`, onRemove: clearSearch })

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Gavel className="w-12 h-12 text-[#c8a415] mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider gov-heading-display">{isAm ? 'ጨረታዎችና ግዢዎች' : 'Bids & Tenders'}</h1>
            <p className="mt-4 text-green-200 text-lg max-w-2xl mx-auto">Procurement opportunities and tender announcements from Dessie City Administration</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <StatsBanner tenders={tenders} />

      {/* Filter Bar */}
      <div className="bg-white sticky top-16 z-30 shadow-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Filter controls */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0d4a28] shrink-0">
              <Filter className="w-4 h-4" />
              <span className="uppercase tracking-wider text-xs">Filters</span>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              <Select value={category} onValueChange={updateCategory}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c === 'All' ? 'All Categories' : c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={updateStatus}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  {statuses.map(s => <SelectItem key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={String(budgetRange)} onValueChange={updateBudgetRange}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Budget Range" /></SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((r, i) => <SelectItem key={i} value={String(i)}>{r.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tenders..."
                  value={search}
                  onChange={e => updateSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>
          </div>

          {/* Active filter chips + result count + view toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.length > 0 && (
                <AnimatePresence mode="popLayout">
                  {activeFilters.map(f => (
                    <FilterChip key={f.label} label={f.label} onRemove={f.onRemove} />
                  ))}
                </AnimatePresence>
              )}
              <span className="text-xs text-muted-foreground font-medium">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-[#f0f7f1] rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-white text-[#0d4a28] shadow-sm' : 'text-muted-foreground hover:text-[#0d4a28]'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-[#0d4a28] shadow-sm' : 'text-muted-foreground hover:text-[#0d4a28]'}`}
              >
                <List className="w-3.5 h-3.5" /> List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tender Listings */}
      <section className="bg-[#f8faf8] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground gov-section-title flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-[#c8a415]" /> Available Tenders
            </h2>
          </div>

          {pagedItems.length > 0 ? (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
              : 'space-y-3'
            }>
              {pagedItems.map((t, i) => {
                const props = {
                  key: t.id,
                  tender: t,
                  expanded: expandedIds.has(t.id),
                  onToggleExpand: () => toggleExpand(t.id),
                  onNavigate: () => navigateTo('bids-detail', { bidId: t.id }),
                }
                return viewMode === 'grid'
                  ? <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}><TenderCardGrid {...props} /></motion.div>
                  : <motion.div key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}><TenderRowList {...props} /></motion.div>
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              <Gavel className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No tenders match your filters</p>
              <p className="text-sm mt-1">Try adjusting your search criteria or clearing some filters</p>
            </motion.div>
          )}

          <Pagination total={filtered.length} perPage={ITEMS_PER_PAGE} current={page} onChange={setPage} />
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* How to Participate */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground gov-section-title mb-2 text-center"
          >
            How to Participate
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mb-10 max-w-xl mx-auto"
          >
            Follow these simple steps to submit your bid and participate in Dessie City procurement opportunities.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, icon: UserCheck, title: 'Register as Vendor', desc: 'Create a vendor account with the city procurement office and submit your company profile.' },
              { step: 2, icon: Download, title: 'Download Tender Document', desc: 'Access and download the full tender document, bill of quantities, and terms of reference.' },
              { step: 3, icon: FileCheck, title: 'Submit Bid', desc: 'Prepare your technical and financial proposals and submit before the stated deadline.' },
              { step: 4, icon: Shield, title: 'Attend Opening', desc: 'Attend the public bid opening session where proposals are reviewed and evaluated.' },
            ].map(s => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: s.step * 0.1 }}
                className="text-center group"
              >
                <div className="relative mx-auto mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#1a6b3c] text-white flex items-center justify-center mx-auto text-xl font-bold group-hover:bg-[#0d4a28] transition-colors">
                    {s.step}
                  </div>
                </div>
                <s.icon className="w-7 h-7 text-[#c8a415] mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Vendor Registration CTA */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] text-white rounded-xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">Become a Vendor</h2>
                    <p className="text-green-200 mb-6 leading-relaxed">
                      Register your company with Dessie City Administration to receive notifications about new procurement opportunities and participate in bidding processes.
                    </p>
                    <div className="space-y-3 mb-6">
                      {[
                        'Early notification of new tenders',
                        'Access to all procurement documents',
                        'Priority consideration for small contracts',
                        'Direct communication with procurement team',
                      ].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-green-100">
                          <CircleCheckBig className="w-4 h-4 text-[#c8a415] shrink-0" />
                          <span className="text-sm">{b}</span>
                        </div>
                      ))}
                    </div>
                    <button className="bg-[#c8a415] hover:bg-[#b08f10] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
                      REGISTER NOW <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-4 border-white/20 flex items-center justify-center">
                      <Briefcase className="w-20 h-20 text-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageId } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Briefcase,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
  Filter,
  DollarSign,
  MapPin,
  X,
  LayoutGrid,
  List,
  TrendingUp,
  CalendarClock,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileCheck,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface VacancyPageProps {
  navigateTo: (page: PageId, extra?: any) => void
}

interface Vacancy {
  id: string
  title: string
  department: string
  type: 'Permanent' | 'Contract'
  salary: string
  salaryMid: number
  deadline: string
  status: 'Open' | 'Closed'
  description: string
  requirements: string[]
  location: string
}

type ViewMode = 'grid' | 'list'

type SalaryRange = 'all' | 'under15k' | '15k-25k' | '25k-35k' | 'over35k'

// ─── Data ────────────────────────────────────────────────────────────────────

const vacancies: Vacancy[] = [
  {
    id: 'v1',
    title: 'Senior Urban Planner',
    department: 'Engineering & Infrastructure',
    type: 'Permanent',
    salary: 'ETB 25,000 – 35,000',
    salaryMid: 30000,
    deadline: 'Aug 15, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      "Lead urban planning initiatives for Dessie's expansion areas including the new industrial zone and residential developments. The role involves comprehensive land use analysis, community consultation, and coordination with multiple government agencies to ensure sustainable growth that aligns with the city's master plan.",
    requirements: [
      'MSc in Urban Planning or related field',
      '5+ years experience in urban planning',
      'Knowledge of Ethiopian urban development policies',
      'Proficiency in GIS and CAD software',
      'Strong project management skills',
    ],
  },
  {
    id: 'v2',
    title: 'IT Systems Administrator',
    department: 'IT & Digital Services',
    type: 'Permanent',
    salary: 'ETB 20,000 – 28,000',
    salaryMid: 24000,
    deadline: 'Aug 10, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      "Manage and maintain the city's IT infrastructure including servers, networks, and the smart city digital platform. Ensure 99.9% uptime for critical government services and implement cybersecurity measures to protect citizen data.",
    requirements: [
      'BSc in Computer Science or IT',
      '3+ years in systems administration',
      'Linux/Windows server management',
      'Network security certifications preferred',
      'Experience with cloud platforms',
    ],
  },
  {
    id: 'v3',
    title: 'Public Health Officer',
    department: 'Health Bureau',
    type: 'Permanent',
    salary: 'ETB 22,000 – 30,000',
    salaryMid: 26000,
    deadline: 'Aug 20, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Oversee public health programs across all kebeles including disease prevention, maternal health, and health education. Coordinate with regional health authorities and manage health data reporting systems.',
    requirements: [
      'MPH or BSc in Public Health',
      '4+ years public health experience',
      'Knowledge of Ethiopian health policies',
      'Data analysis and reporting skills',
      'Community health program management',
    ],
  },
  {
    id: 'v4',
    title: 'Civil Engineer',
    department: 'Engineering & Infrastructure',
    type: 'Contract',
    salary: 'ETB 30,000 – 45,000',
    salaryMid: 37500,
    deadline: 'Aug 5, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Supervise major infrastructure projects including road construction, water systems, and building inspections. Ensure all construction meets national building codes and quality standards.',
    requirements: [
      'BSc in Civil Engineering',
      'PE license or equivalent',
      '5+ years in construction supervision',
      'Knowledge of Ethiopian building codes',
      'AutoCAD and project management tools',
    ],
  },
  {
    id: 'v5',
    title: 'Revenue Collection Officer',
    department: 'Finance & Revenue',
    type: 'Permanent',
    salary: 'ETB 12,000 – 18,000',
    salaryMid: 15000,
    deadline: 'Aug 25, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Manage tax collection, revenue tracking, and financial reporting for city revenue sources. Work with local businesses and citizens to ensure timely and accurate revenue collection.',
    requirements: [
      'BA in Accounting or Finance',
      '2+ years in revenue/tax collection',
      'Knowledge of Ethiopian tax law',
      'Strong analytical and communication skills',
      'Experience with financial software',
    ],
  },
  {
    id: 'v6',
    title: 'Environmental Protection Specialist',
    department: 'Environment & Green Development',
    type: 'Permanent',
    salary: 'ETB 18,000 – 25,000',
    salaryMid: 21500,
    deadline: 'Aug 18, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Develop and implement environmental protection policies, waste management programs, and green city initiatives. Monitor environmental impact of city projects and enforce environmental regulations.',
    requirements: [
      'BSc in Environmental Science',
      '3+ years environmental management experience',
      'Knowledge of EPA regulations',
      'EIA report preparation skills',
      'Community engagement experience',
    ],
  },
  {
    id: 'v7',
    title: 'Social Worker',
    department: 'Social & Labor Affairs',
    type: 'Permanent',
    salary: 'ETB 15,000 – 22,000',
    salaryMid: 18500,
    deadline: 'Aug 12, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Provide social support services, conduct needs assessments, and coordinate community development programs. Support vulnerable populations and connect them with available government services.',
    requirements: [
      'BA in Social Work or Sociology',
      '2+ years social work experience',
      'Case management skills',
      'Knowledge of social protection programs',
      'Strong interpersonal skills',
    ],
  },
  {
    id: 'v8',
    title: 'Accountant',
    department: 'Finance & Revenue',
    type: 'Permanent',
    salary: 'ETB 16,000 – 24,000',
    salaryMid: 20000,
    deadline: 'Aug 22, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Handle financial accounting, budget preparation, audit coordination, and financial reporting for the administration. Ensure compliance with government accounting standards.',
    requirements: [
      'BA in Accounting',
      'CPA or ACCA preferred',
      '3+ years government accounting',
      'Knowledge of IFRS and GAAP',
      'Proficiency in accounting software',
    ],
  },
  {
    id: 'v9',
    title: 'Electrical Engineer',
    department: 'Engineering & Infrastructure',
    type: 'Contract',
    salary: 'ETB 28,000 – 40,000',
    salaryMid: 34000,
    deadline: 'Aug 8, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Oversee electrical infrastructure projects including street lighting, power distribution, and solar energy installations. Ensure all electrical work meets safety standards and building codes.',
    requirements: [
      'BSc in Electrical Engineering',
      '4+ years in electrical projects',
      'Licensed electrical engineer',
      'Experience with solar/renewable energy',
      'Project management certification',
    ],
  },
  {
    id: 'v10',
    title: 'Communications & PR Officer',
    department: 'Communication Department',
    type: 'Permanent',
    salary: 'ETB 14,000 – 20,000',
    salaryMid: 17000,
    deadline: 'Aug 28, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Manage public communications, media relations, social media, and citizen engagement initiatives. Develop communication strategies that promote transparency and trust in city governance.',
    requirements: [
      'BA in Communications or Journalism',
      '2+ years PR/communications experience',
      'Social media management skills',
      'Excellent Amharic and English writing',
      'Media relations experience',
    ],
  },
  {
    id: 'v11',
    title: 'Legal Advisor',
    department: 'Legal Affairs',
    type: 'Contract',
    salary: 'ETB 25,000 – 35,000',
    salaryMid: 30000,
    deadline: 'Aug 14, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Provide legal counsel on municipal governance, contract review, regulatory compliance, and citizen dispute resolution. Ensure all city operations comply with federal and regional laws.',
    requirements: [
      'LLB from accredited university',
      '5+ years legal practice',
      'Knowledge of municipal law',
      'Contract negotiation experience',
      'Court representation skills',
    ],
  },
  {
    id: 'v12',
    title: 'Data Analyst',
    department: 'IT & Digital Services',
    type: 'Permanent',
    salary: 'ETB 18,000 – 26,000',
    salaryMid: 22000,
    deadline: 'Aug 30, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Analyze city data for governance insights, create dashboards, and support data-driven decision making across departments. Develop data collection systems and reporting frameworks.',
    requirements: [
      'BSc in Statistics, CS, or related',
      '2+ years data analysis experience',
      'Proficiency in Python/R and SQL',
      'Data visualization skills (Tableau/PowerBI)',
      'Knowledge of statistical methods',
    ],
  },
  {
    id: 'v13',
    title: 'Traffic Management Officer',
    department: 'Transport & Roads',
    type: 'Permanent',
    salary: 'ETB 12,000 – 17,000',
    salaryMid: 14500,
    deadline: 'Aug 16, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Plan and implement traffic management strategies, coordinate with police on enforcement, and manage parking systems. Develop long-term transportation plans for the growing city.',
    requirements: [
      'BA in Transport Management or related',
      '2+ years traffic management experience',
      'Knowledge of traffic engineering principles',
      'GIS mapping skills preferred',
      'Strong coordination abilities',
    ],
  },
  {
    id: 'v14',
    title: 'Tourism Development Officer',
    department: 'Culture & Tourism Bureau',
    type: 'Permanent',
    salary: 'ETB 15,000 – 22,000',
    salaryMid: 18500,
    deadline: 'Aug 20, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Develop tourism strategies, promote heritage sites, coordinate with hotel operators, and manage tourism events. Position Dessie as a premier cultural tourism destination in the Amhara region.',
    requirements: [
      'BA in Tourism Management or related',
      '3+ years tourism development experience',
      'Knowledge of Ethiopian heritage sites',
      'Event management skills',
      'Marketing and promotion experience',
    ],
  },
  {
    id: 'v15',
    title: 'Procurement Specialist',
    department: 'Procurement Office',
    type: 'Permanent',
    salary: 'ETB 16,000 – 23,000',
    salaryMid: 19500,
    deadline: 'Sep 1, 2025',
    status: 'Open',
    location: 'Dessie, Ethiopia',
    description:
      'Manage procurement processes, vendor evaluations, contract administration, and ensure compliance with procurement regulations. Drive transparency and efficiency in government purchasing.',
    requirements: [
      'BA in Procurement, Supply Chain, or related',
      '3+ years public procurement experience',
      'Knowledge of Ethiopian procurement law',
      'CIPS certification preferred',
      'Strong negotiation skills',
    ],
  },
]

const DEPARTMENTS = [
  'All',
  'Engineering & Infrastructure',
  'IT & Digital Services',
  'Health Bureau',
  'Finance & Revenue',
  'Environment & Green Development',
  'Social & Labor Affairs',
  'Communication Department',
  'Legal Affairs',
  'Transport & Roads',
  'Culture & Tourism Bureau',
  'Procurement Office',
]

const TYPES: Array<'All' | 'Permanent' | 'Contract'> = ['All', 'Permanent', 'Contract']

const SALARY_RANGES: { value: SalaryRange; label: string }[] = [
  { value: 'all', label: 'All Ranges' },
  { value: 'under15k', label: 'Under 15K' },
  { value: '15k-25k', label: '15K – 25K' },
  { value: '25k-35k', label: '25K – 35K' },
  { value: 'over35k', label: 'Over 35K' },
]

const ITEMS_PER_PAGE = 6

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseSalaryMid(salary: string): number {
  const nums = salary.match(/\d[\d,]*/g)
  if (!nums || nums.length === 0) return 0
  const values = nums.map((n) => parseInt(n.replace(/,/g, ''), 10))
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

function matchesSalaryRange(salaryMid: number, range: SalaryRange): boolean {
  switch (range) {
    case 'under15k':
      return salaryMid < 15000
    case '15k-25k':
      return salaryMid >= 15000 && salaryMid < 25000
    case '25k-35k':
      return salaryMid >= 25000 && salaryMid < 35000
    case 'over35k':
      return salaryMid >= 35000
    default:
      return true
  }
}

function isDeadlineSoon(deadlineStr: string): boolean {
  const deadline = new Date(deadlineStr)
  const now = new Date()
  const diffMs = deadline.getTime() - now.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays <= 7 && diffDays >= 0
}

function isDeadlineExpired(deadlineStr: string): boolean {
  return new Date(deadlineStr) < new Date()
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function PulsingDot() {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
    </span>
  )
}

function StatsBanner({ items }: { items: Vacancy[] }) {
  const openCount = items.filter((v) => v.status === 'Open').length
  const uniqueDepts = new Set(items.filter((v) => v.status === 'Open').map((v) => v.department)).size
  const avgSalary =
    items.length > 0
      ? Math.round(items.reduce((sum, v) => sum + v.salaryMid, 0) / items.length)
      : 0
  const latestDeadline = items
    .filter((v) => v.status === 'Open')
    .sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())[0]?.deadline ?? 'N/A'

  const stats = [
    {
      icon: Briefcase,
      label: 'Open Positions',
      value: openCount.toString(),
      color: 'text-[#1a6b3c]',
      bg: 'bg-[#1a6b3c]/10',
    },
    {
      icon: Building2,
      label: 'Departments Hiring',
      value: uniqueDepts.toString(),
      color: 'text-[#c8a415]',
      bg: 'bg-[#c8a415]/10',
    },
    {
      icon: TrendingUp,
      label: 'Avg. Salary',
      value: `ETB ${avgSalary.toLocaleString()}`,
      color: 'text-[#0d4a28]',
      bg: 'bg-[#0d4a28]/10',
    },
    {
      icon: CalendarClock,
      label: 'Latest Deadline',
      value: latestDeadline,
      color: 'text-[#1a6b3c]',
      bg: 'bg-[#1a6b3c]/10',
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative -mt-8 z-10 max-w-7xl mx-auto px-4"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-xl shadow-md border-[#e2e8e0] overflow-hidden">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`${stat.bg} p-2.5 rounded-lg shrink-0`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium truncate">
                    {stat.label}
                  </p>
                  <p className="text-base md:text-lg font-bold text-foreground truncate">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1a6b3c]/10 text-[#0d4a28] border border-[#1a6b3c]/20"
    >
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-[#1a6b3c]/20 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </motion.span>
  )
}

function Pagination({
  total,
  perPage,
  current,
  onChange,
}: {
  total: number
  perPage: number
  current: number
  onChange: (p: number) => void
}) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 0}
        className="w-9 h-9 rounded-lg bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0d4a28] transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors ${
            current === i
              ? 'bg-[#0d4a28] text-white'
              : 'bg-white text-[#333] border border-[#e2e8e0] hover:border-[#1a6b3c] hover:text-[#0d4a28]'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current >= totalPages - 1}
        className="w-9 h-9 rounded-lg bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0d4a28] transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function VacancyCardGrid({
  vacancy,
  isExpanded,
  onToggleExpand,
  onViewDetails,
  index,
}: {
  vacancy: Vacancy
  isExpanded: boolean
  onToggleExpand: () => void
  onViewDetails: () => void
  index: number
}) {
  const accentColor = vacancy.type === 'Permanent' ? 'bg-[#1a6b3c]' : 'bg-[#c8a415]'
  const typeBadgeStyle =
    vacancy.type === 'Permanent'
      ? 'border-[#1a6b3c] text-[#1a6b3c] bg-[#1a6b3c]/5'
      : 'border-[#c8a415] text-[#b8920e] bg-[#c8a415]/5'
  const deadlineSoon = isDeadlineSoon(vacancy.deadline)
  const deadlineExpired = isDeadlineExpired(vacancy.deadline)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <Card className="overflow-hidden rounded-xl border-[#e2e8e0] shadow-sm hover:shadow-lg transition-all duration-300 group">
        {/* Left Accent Bar + Content */}
        <div className="flex">
          <div className={`w-1 shrink-0 ${accentColor}`} />
          <div className="flex-1 p-4 sm:p-5">
            {/* Top row: Status + Type badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {vacancy.status === 'Open' && <PulsingDot />}
              <Badge variant="outline" className={`text-[11px] font-semibold ${typeBadgeStyle}`}>
                {vacancy.type}
              </Badge>
              <Badge
                variant="outline"
                className="text-[11px] border-[#1a6b3c]/30 text-[#1a6b3c] bg-[#1a6b3c]/5"
              >
                <Building2 className="w-3 h-3 mr-1" />
                {vacancy.department}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-[#0d4a28] leading-tight mb-2 group-hover:text-[#0d4a28]/80 transition-colors">
              {vacancy.title}
            </h3>

            {/* Salary */}
            <div className="flex items-center gap-1.5 mb-3">
              <DollarSign className="w-4.5 h-4.5 text-[#c8a415] shrink-0" />
              <span className="text-base font-bold text-[#c8a415]">{vacancy.salary}</span>
            </div>

            {/* Description (2-line preview) */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {vacancy.description.length > 120 && !isExpanded
                ? vacancy.description.slice(0, 120) + '...'
                : vacancy.description}
            </p>

            {/* See More / See Less */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleExpand()
              }}
              className="text-xs font-semibold text-[#1a6b3c] hover:text-[#0d4a28] transition-colors flex items-center gap-1 mb-3"
            >
              {isExpanded ? (
                <>
                  See Less <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  See More <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Expanded Section */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[#e2e8e0] pt-3 mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0d4a28] mb-2 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" />
                      Key Requirements
                    </h4>
                    <ul className="space-y-1.5">
                      {vacancy.requirements.slice(0, 5).map((req, ri) => (
                        <li key={ri} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-[#c8a415] mt-0.5 shrink-0">&#9679;</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewDetails()
                    }}
                    className="bg-[#1a6b3c] hover:bg-[#0d4a28] text-white w-full sm:w-auto"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom row: Deadline + Location + View Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e2e8e0] mt-1">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                <span
                  className={`flex items-center gap-1 font-medium ${
                    deadlineExpired
                      ? 'text-gray-400 line-through'
                      : deadlineSoon
                        ? 'text-red-600'
                        : 'text-muted-foreground'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {deadlineExpired ? 'Closed' : `Deadline: ${vacancy.deadline}`}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  {vacancy.location}
                </span>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails()
                }}
                variant="outline"
                size="sm"
                className="border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white text-xs font-semibold"
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function VacancyCardList({
  vacancy,
  isExpanded,
  onToggleExpand,
  onViewDetails,
  index,
}: {
  vacancy: Vacancy
  isExpanded: boolean
  onToggleExpand: () => void
  onViewDetails: () => void
  index: number
}) {
  const accentColor = vacancy.type === 'Permanent' ? 'bg-[#1a6b3c]' : 'bg-[#c8a415]'
  const typeBadgeStyle =
    vacancy.type === 'Permanent'
      ? 'border-[#1a6b3c] text-[#1a6b3c] bg-[#1a6b3c]/5'
      : 'border-[#c8a415] text-[#b8920e] bg-[#c8a415]/5'
  const deadlineSoon = isDeadlineSoon(vacancy.deadline)
  const deadlineExpired = isDeadlineExpired(vacancy.deadline)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
    >
      <Card className="overflow-hidden rounded-xl border-[#e2e8e0] shadow-sm hover:shadow-lg transition-all duration-300 group">
        <div className="flex">
          <div className={`w-1 shrink-0 ${accentColor}`} />
          <div className="flex-1 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Left info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {vacancy.status === 'Open' && <PulsingDot />}
                  <Badge variant="outline" className={`text-[11px] font-semibold ${typeBadgeStyle}`}>
                    {vacancy.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[11px] border-[#1a6b3c]/30 text-[#1a6b3c] bg-[#1a6b3c]/5"
                  >
                    {vacancy.department}
                  </Badge>
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-[#0d4a28] leading-tight mb-2 group-hover:text-[#0d4a28]/80 transition-colors">
                  {vacancy.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-[#c8a415]">
                    <DollarSign className="w-3.5 h-3.5" />
                    {vacancy.salary}
                  </span>
                  <span
                    className={`flex items-center gap-1 font-medium ${
                      deadlineExpired
                        ? 'text-gray-400 line-through'
                        : deadlineSoon
                          ? 'text-red-600'
                          : ''
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {deadlineExpired ? 'Closed' : vacancy.deadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {vacancy.location}
                  </span>
                </div>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onToggleExpand}
                  className="text-xs font-semibold text-[#1a6b3c] hover:text-[#0d4a28] transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#1a6b3c]/5"
                >
                  {isExpanded ? (
                    <>
                      See Less <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      See More <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <Button
                  onClick={onViewDetails}
                  className="bg-[#1a6b3c] hover:bg-[#0d4a28] text-white text-xs font-semibold"
                  size="sm"
                >
                  View Full Details
                </Button>
              </div>
            </div>

            {/* Expanded Section */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-[#e2e8e0]">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {vacancy.description}
                    </p>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0d4a28] mb-2 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" />
                      Key Requirements
                    </h4>
                    <ul className="space-y-1.5 mb-4">
                      {vacancy.requirements.slice(0, 5).map((req, ri) => (
                        <li key={ri} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-[#c8a415] mt-0.5 shrink-0">&#9679;</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={onViewDetails}
                      className="bg-[#c8a415] hover:bg-[#b8920e] text-[#0d4a28] font-bold"
                      size="sm"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function EmptyState({ hasActiveFilters }: { hasActiveFilters: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20 px-4"
    >
      <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center">
        <Search className="w-10 h-10 text-[#1a6b3c]/40" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No Vacancies Found</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        {hasActiveFilters
          ? 'No vacancies match your current filter selections. Try adjusting or removing some filters to see more results.'
          : 'There are currently no open positions available. Please check back later for new opportunities.'}
      </p>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function VacancyPage({ navigateTo }: VacancyPageProps) {
  const [department, setDepartment] = useState('All')
  const [type, setType] = useState<'All' | 'Permanent' | 'Contract'>('All')
  const [salaryRange, setSalaryRange] = useState<SalaryRange>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [dbVacancies, setDbVacancies] = useState<any[]>([])
  const [loadingDb, setLoadingDb] = useState(true)

  // Fetch vacancies from DB on mount
  useEffect(() => {
    fetch('/api/admin/vacancies')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          // Map DB vacancies to the Vacancy interface
          const mapped = data
            .filter(v => v.approvalStatus === 'approved' || !v.approvalStatus)
            .map(v => ({
              id: v.id,
              title: v.title || '',
              department: v.department || '',
              type: (v.type === 'Contract' ? 'Contract' : 'Permanent') as 'Permanent' | 'Contract',
              salary: v.salary || 'Competitive',
              salaryMid: 20000,
              deadline: v.deadline || 'See details',
              status: (v.status === 'Open' ? 'Open' : 'Closed') as 'Open' | 'Closed',
              description: v.description || '',
              requirements: (() => { try { return JSON.parse(v.requirements || '[]') } catch { return [v.requirements || ''] } })(),
              location: 'Dessie, Ethiopia',
            }))
          setDbVacancies(mapped)
        }
      })
      .catch(() => {})
      .finally(() => setLoadingDb(false))
  }, [])

  // Use DB data if available, fall back to hardcoded
  const allVacancies: Vacancy[] = dbVacancies.length > 0 ? dbVacancies : vacancies

  const updateDepartment = useCallback((value: string) => {
    setDepartment(value)
    setPage(0)
  }, [])

  const updateType = useCallback((value: string) => {
    setType(value as 'All' | 'Permanent' | 'Contract')
    setPage(0)
  }, [])

  const updateSalaryRange = useCallback((value: string) => {
    setSalaryRange(value as SalaryRange)
    setPage(0)
  }, [])

  const updateSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(0)
  }, [])

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    return allVacancies.filter((v) => {
      if (department !== 'All' && v.department !== department) return false
      if (type !== 'All' && v.type !== type) return false
      if (salaryRange !== 'all' && !matchesSalaryRange(v.salaryMid, salaryRange)) return false
      if (
        search &&
        !v.title.toLowerCase().includes(search.toLowerCase()) &&
        !v.department.toLowerCase().includes(search.toLowerCase()) &&
        !v.description.toLowerCase().includes(search.toLowerCase())
      )
        return false
      return true
    })
  }, [department, type, salaryRange, search])

  const pagedItems = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const hasActiveFilters =
    department !== 'All' || type !== 'All' || salaryRange !== 'all' || search.trim() !== ''

  const activeChips: { label: string; onRemove: () => void }[] = []
  if (department !== 'All') {
    activeChips.push({ label: department, onRemove: () => updateDepartment('All') })
  }
  if (type !== 'All') {
    activeChips.push({ label: `Type: ${type}`, onRemove: () => updateType('All') })
  }
  if (salaryRange !== 'all') {
    const rangeLabel = SALARY_RANGES.find((r) => r.value === salaryRange)?.label ?? salaryRange
    activeChips.push({ label: `Salary: ${rangeLabel}`, onRemove: () => updateSalaryRange('all') })
  }
  if (search.trim()) {
    activeChips.push({ label: `Search: "${search}"`, onRemove: () => updateSearch('') })
  }

  const clearAllFilters = useCallback(() => {
    setDepartment('All')
    setType('All')
    setSalaryRange('all')
    setSearch('')
    setPage(0)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-[#0d4a28] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c8a415]/20 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-[#c8a415]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider gov-heading-display">
              Job Vacancies
            </h1>
            <p className="mt-4 text-green-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Current employment opportunities at Dessie City Administration. Browse open
              positions and apply before the deadline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <StatsBanner items={allVacancies} />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white sticky top-16 z-30 shadow-md border-b border-[#e2e8e0]"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-[#f0f7f2] rounded-xl p-4">
            {/* Filter row */}
            <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0d4a28] shrink-0 uppercase tracking-wider">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                <Select value={department} onValueChange={updateDepartment}>
                  <SelectTrigger className="w-full bg-white border-[#e2e8e0]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d === 'All' ? 'All Departments' : d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={type} onValueChange={updateType}>
                  <SelectTrigger className="w-full bg-white border-[#e2e8e0]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t === 'All' ? 'All Types' : t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={salaryRange} onValueChange={updateSalaryRange}>
                  <SelectTrigger className="w-full bg-white border-[#e2e8e0]">
                    <SelectValue placeholder="Salary Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {SALARY_RANGES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vacancies..."
                    value={search}
                    onChange={(e) => updateSearch(e.target.value)}
                    className="pl-9 bg-white border-[#e2e8e0]"
                  />
                </div>
              </div>
            </div>

            {/* Active filter chips + result count */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#0d4a28] uppercase tracking-wider">
                  {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
                </span>
                <AnimatePresence>
                  {activeChips.map((chip) => (
                    <FilterChip key={chip.label} label={chip.label} onRemove={chip.onRemove} />
                  ))}
                </AnimatePresence>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#1a6b3c] hover:text-[#0d4a28] font-semibold transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white rounded-lg border border-[#e2e8e0] p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#1a6b3c] text-white'
                      : 'text-muted-foreground hover:text-[#0d4a28]'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#1a6b3c] text-white'
                      : 'text-muted-foreground hover:text-[#0d4a28]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vacancy Listings */}
      <section className="bg-[#f8faf8] py-10 px-4 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#c8a415] rounded-full" />
              <h2 className="text-2xl font-bold text-foreground gov-section-title">
                Available Positions
              </h2>
              <Badge className="bg-[#1a6b3c] text-white text-xs font-bold">
                {filtered.length}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:block">
              Page {page + 1} of {Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))}
            </span>
          </motion.div>

          {pagedItems.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {pagedItems.map((v, i) => (
                    <VacancyCardGrid
                      key={v.id}
                      vacancy={v}
                      isExpanded={expandedIds.has(v.id)}
                      onToggleExpand={() => toggleExpanded(v.id)}
                      onViewDetails={() => navigateTo('vacancy-detail', { vacancyId: v.id })}
                      index={i}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {pagedItems.map((v, i) => (
                    <VacancyCardList
                      key={v.id}
                      vacancy={v}
                      isExpanded={expandedIds.has(v.id)}
                      onToggleExpand={() => toggleExpanded(v.id)}
                      onViewDetails={() => navigateTo('vacancy-detail', { vacancyId: v.id })}
                      index={i}
                    />
                  ))}
                </div>
              )}
              <Pagination
                total={filtered.length}
                perPage={ITEMS_PER_PAGE}
                current={page}
                onChange={setPage}
              />
            </>
          ) : (
            <EmptyState hasActiveFilters={hasActiveFilters} />
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#0d4a28] py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Users className="w-10 h-10 text-[#c8a415] mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white mb-2">Don&apos;t See the Right Fit?</h3>
          <p className="text-green-200/80 mb-5">
            Submit your resume for general consideration. We&apos;ll reach out when a matching
            position opens up.
          </p>
          <Button
            onClick={() => navigateTo('contact')}
            className="bg-[#c8a415] hover:bg-[#b8920e] text-[#0d4a28] font-bold px-8"
            size="lg"
          >
            Submit General Application <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  )
}
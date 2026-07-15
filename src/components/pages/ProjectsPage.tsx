'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  Wrench,
  Building2,
  Droplets,
  Bus,
  TreePine,
  Zap,
  Landmark,
  Lightbulb,
  Truck,
  Hospital,
  Dumbbell,
  GraduationCap,
  Monitor,
  ArrowRight,
  Factory,
  MapPin,
  Users,
  BarChart3,
  HardHat,
  Target,
  Rocket,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
}

const stats = [
  { icon: Wrench, value: '23', label: 'Ongoing' },
  { icon: CheckCircle, value: '45', label: 'Completed' },
  { icon: Target, value: '12', label: 'Planned' },
  { icon: DollarSign, value: 'ETB 8.5B', label: 'Total Investment' },
]

const filters = ['All', 'Ongoing', 'Completed', 'Planned', 'Mega Projects'] as const
type Filter = (typeof filters)[number]

const ongoingProjects = [
  { icon: Monitor, title: 'Smart City Platform', progress: 85, budget: 'ETB 120M', start: 'Jan 2024', end: 'Dec 2025', desc: 'Digital infrastructure for smart governance, including IoT sensors, data analytics, and citizen-facing digital services platform.' },
  { icon: Truck, title: 'Road Network Expansion', progress: 75, budget: 'ETB 350M', start: 'Mar 2023', end: 'Jun 2025', desc: 'Expanding and upgrading 120 km of city roads, including new arterial routes, pedestrian walkways, and drainage systems.' },
  { icon: Factory, title: 'Industrial Zone Phase 1', progress: 60, budget: 'ETB 500M', start: 'Jun 2023', end: 'Dec 2025', desc: 'Developing a 200-hectare industrial zone with modern infrastructure to attract manufacturing and processing industries.' },
  { icon: Droplets, title: 'Water Treatment Plant', progress: 45, budget: 'ETB 280M', start: 'Sep 2023', end: 'Mar 2026', desc: 'State-of-the-art water treatment facility to serve 150,000 residents, ensuring clean and reliable water supply.' },
  { icon: Bus, title: 'City Bus System', progress: 40, budget: 'ETB 95M', start: 'Jan 2024', end: 'Jun 2026', desc: 'Modern public transit system with dedicated bus lanes, smart stops, and electronic ticketing across 15 routes.' },
  { icon: TreePine, title: 'Public Park Development', progress: 30, budget: 'ETB 45M', start: 'Apr 2024', end: 'Dec 2025', desc: 'Creating green spaces including Central Park, riverside walks, playgrounds, and community recreation areas.' },
]

const completedProjects = [
  { title: 'City Hall Renovation', date: 'December 2023', summary: 'Complete renovation of the historic City Hall building, preserving heritage while modernizing facilities for efficient public service delivery.', impact: 'Serves 5,000+ citizens monthly' },
  { title: 'Street Lighting Project', date: 'September 2023', summary: 'Installation of 2,500 energy-efficient LED streetlights across all major roads and residential neighborhoods.', impact: '45% reduction in energy costs' },
  { title: 'Digital Payment System', date: 'June 2023', summary: 'Implementation of a comprehensive digital payment platform for all city services including taxes, permits, and fees.', impact: '78% adoption rate by businesses' },
  { title: 'Market Renovation', date: 'March 2023', summary: 'Modernization of the main city market with improved sanitation, covered walkways, and organized vendor zones.', impact: '1,200+ vendors accommodated' },
]

const plannedProjects = [
  { icon: Hospital, title: 'New Hospital Construction', desc: 'A 300-bed modern hospital to serve the growing population with emergency, surgical, and maternal health services.' },
  { icon: Wrench, title: 'Waste Management System', desc: 'Comprehensive solid waste management including collection, recycling center, and sanitary landfill development.' },
  { icon: Dumbbell, title: 'Sports Complex', desc: 'Multi-purpose sports facility with Olympic-size swimming pool, indoor arena, and outdoor athletics track.' },
  { icon: GraduationCap, title: 'Digital Learning Centers', desc: '10 community digital learning centers equipped with computers, internet access, and vocational training tools.' },
]

const megaProjects = [
  {
    title: 'Dessie Smart City Initiative',
    budget: 'ETB 500M',
    timeline: '2024 – 2028',
    desc: 'A transformative multi-year initiative to digitize city governance and services. The Smart City Platform integrates IoT sensors for real-time infrastructure monitoring, an AI-powered urban management dashboard, digital citizen service portals, automated permitting and licensing, and a comprehensive geographic information system. Phase 1 focuses on core platform and pilot neighborhoods, Phase 2 expands citywide, and Phase 3 adds advanced analytics and predictive capabilities.',
    milestones: ['Core Platform (2024)', 'IoT Deployment (2025)', 'Citywide Expansion (2026)', 'AI Analytics (2027-2028)'],
  },
  {
    title: 'Greater Dessie Industrial Corridor',
    budget: 'ETB 2B',
    timeline: '2023 – 2027',
    desc: 'A strategic industrial development program establishing a 500-hectare industrial corridor connecting Dessie to surrounding communities. The corridor will feature specialized zones for agro-processing, textile manufacturing, construction materials, and technology startups. Includes dedicated power supply, water treatment, road networks, and customs facilities to attract both domestic and international investors, targeting 15,000 new jobs and significant export revenue.',
    milestones: ['Zone 1 Complete (2024)', 'Infrastructure (2025)', 'Zone 2-3 (2026)', 'Full Operation (2027)'],
  },
]

function getProgressColor(p: number) {
  if (p >= 70) return 'bg-[#1a6b3c]'
  if (p >= 40) return 'bg-[#c8a415]'
  return 'bg-orange-500'
}

type DbProject = {
  id: string
  title: string
  category: string
  status: string
  description: string
  budget?: string | null
  startDate?: string | null
  endDate?: string | null
  progress: number
  image?: string | null
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [dbProjects, setDbProjects] = useState<DbProject[]>([])

  useEffect(() => {
    fetch('/api/admin/projects')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setDbProjects(data) })
      .catch(() => {})
  }, [])

  // Merge: DB projects take priority, fall back to hardcoded if DB is empty
  const activeOngoing = dbProjects.length > 0
    ? dbProjects.filter(p => (p.status || '').toLowerCase().includes('progress') || (p.status || '').toLowerCase().includes('ongoing'))
    : ongoingProjects
  const activeCompleted = dbProjects.length > 0
    ? dbProjects.filter(p => (p.status || '').toLowerCase().includes('complet'))
    : completedProjects
  const activePlanned = dbProjects.length > 0
    ? dbProjects.filter(p => (p.status || '').toLowerCase().includes('plan'))
    : plannedProjects

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white tracking-wide">CITY PROJECTS</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-green-200 mt-4 text-lg md:text-xl max-w-2xl mx-auto">Transforming Dessie through strategic infrastructure investments</motion.p>
      </section>

      {/* Project Stats */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
              <Card className="stat-card border-0 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <s.icon className="w-8 h-8 text-[#1a6b3c] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#0d4a28]">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="bg-[#c8a415]" />

      {/* Filter Tabs */}
      <section className="bg-white py-4 px-4 sticky top-16 z-20 border-b">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1">
          {filters.map(f => (
            <Button
              key={f}
              variant={activeFilter === f ? 'default' : 'outline'}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap text-xs font-semibold tracking-wide ${activeFilter === f ? 'bg-[#1a6b3c] hover:bg-[#0d4a28] text-white' : 'border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c]/5'}`}
            >
              {f.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>

      {/* Ongoing Projects */}
      {(activeFilter === 'All' || activeFilter === 'Ongoing') && (
        <section className="bg-[#f8faf8] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">ONGOING PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(dbProjects.length > 0 ? activeOngoing : ongoingProjects).map((p: any, i) => (
                <motion.div key={p.id || p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-0">
                    <div className="h-28 bg-gradient-to-br from-[#1a6b3c] to-[#0d4a28] flex items-center justify-center">
                      {p.icon ? <p.icon className="w-12 h-12 text-white/80" /> : <HardHat className="w-12 h-12 text-white/80" />}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground text-sm">{p.title}</h3>
                        <Badge className="bg-[#1a6b3c] text-white text-[10px]">ONGOING</Badge>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-4">{p.description || p.desc}</p>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-[#1a6b3c]">{p.progress || 0}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.progress || 0}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className={`h-full rounded-full ${getProgressColor(p.progress || 0)}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                        {(p.budget) && <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{p.budget}</span>}
                        {(p.start || p.startDate) && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.start || p.startDate} – {p.end || p.endDate || '—'}</span>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Completed Projects */}
      {(activeFilter === 'All' || activeFilter === 'Completed') && (
        <section className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">COMPLETED PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="grid md:grid-cols-2 gap-6">
              {(dbProjects.length > 0 ? activeCompleted : completedProjects).map((p: any, i) => (
                <motion.div key={p.id || p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow border border-gray-200 bg-gray-50/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground">{p.title}</h3>
                        <Badge variant="outline" className="text-xs text-[#1a6b3c] border-[#1a6b3c]">COMPLETED</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date || p.endDate || p.startDate || '—'}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{p.description || p.summary}</p>
                      {p.impact && (
                        <div className="flex items-center gap-2 text-xs text-[#1a6b3c] font-semibold">
                          <TrendingUp className="w-3.5 h-3.5" />{p.impact}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Planned Projects */}
      {(activeFilter === 'All' || activeFilter === 'Planned') && (
        <section className="bg-[#f8faf8] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">PLANNED PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(dbProjects.length > 0 ? activePlanned : plannedProjects).map((p: any, i) => (
                <motion.div key={p.id || p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow border border-dashed border-gray-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center mx-auto mb-4">
                        {p.icon ? <p.icon className="w-6 h-6 text-[#1a6b3c]" /> : <Target className="w-6 h-6 text-[#1a6b3c]" />}
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{p.description || p.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mega Projects */}
      {(activeFilter === 'All' || activeFilter === 'Mega Projects') && (
        <section className="bg-[#0d4a28] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-white mb-2 text-center">MEGA PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="space-y-8">
              {megaProjects.map((p, i) => (
                <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="glass border border-white/10 overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-green-300">
                            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{p.budget}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{p.timeline}</span>
                          </div>
                        </div>
                        <Badge className="bg-[#c8a415] text-white mt-2 md:mt-0 text-xs shrink-0">MEGA PROJECT</Badge>
                      </div>
                      <p className="text-green-100/80 text-sm leading-relaxed mb-6">{p.desc}</p>
                      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {p.milestones.map((m, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-green-200">
                            <Rocket className="w-4 h-4 text-[#c8a415] shrink-0" />
                            {m}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
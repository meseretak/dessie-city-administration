'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { fetcherArray } from '@/lib/fetcher'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/lib/LangContext'
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
  { icon: Monitor, title: 'Smart City Platform', progress: 85, budget: 'ETB 120M', start: 'Jan 2024', end: 'Dec 2025', desc: 'Digital infrastructure for smart governance, including IoT sensors, data analytics, and citizen-facing digital services platform.', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop' },
  { icon: Truck, title: 'Road Network Expansion', progress: 75, budget: 'ETB 350M', start: 'Mar 2023', end: 'Jun 2025', desc: 'Expanding and upgrading 120 km of city roads, including new arterial routes, pedestrian walkways, and drainage systems.', image: 'https://images.unsplash.com/photo-1541888086925-920a0b7cb8b5?q=80&w=800&auto=format&fit=crop' },
  { icon: Factory, title: 'Industrial Zone Phase 1', progress: 60, budget: 'ETB 500M', start: 'Jun 2023', end: 'Dec 2025', desc: 'Developing a 200-hectare industrial zone with modern infrastructure to attract manufacturing and processing industries.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop' },
  { icon: Droplets, title: 'Water Treatment Plant', progress: 45, budget: 'ETB 280M', start: 'Sep 2023', end: 'Mar 2026', desc: 'State-of-the-art water treatment facility to serve 150,000 residents, ensuring clean and reliable water supply.', image: 'https://images.unsplash.com/photo-1534015605230-6e4695eb07e4?q=80&w=800&auto=format&fit=crop' },
  { icon: Bus, title: 'City Bus System', progress: 40, budget: 'ETB 95M', start: 'Jan 2024', end: 'Jun 2026', desc: 'Modern public transit system with dedicated bus lanes, smart stops, and electronic ticketing across 15 routes.', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop' },
  { icon: TreePine, title: 'Public Park Development', progress: 30, budget: 'ETB 45M', start: 'Apr 2024', end: 'Dec 2025', desc: 'Creating green spaces including Central Park, riverside walks, playgrounds, and community recreation areas.', image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=800&auto=format&fit=crop' },
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
    image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Greater Dessie Industrial Corridor',
    budget: 'ETB 2B',
    timeline: '2023 – 2027',
    desc: 'A strategic industrial development program establishing a 500-hectare industrial corridor connecting Dessie to surrounding communities. The corridor will feature specialized zones for agro-processing, textile manufacturing, construction materials, and technology startups. Includes dedicated power supply, water treatment, road networks, and customs facilities to attract both domestic and international investors, targeting 15,000 new jobs and significant export revenue.',
    milestones: ['Zone 1 Complete (2024)', 'Infrastructure (2025)', 'Zone 2-3 (2026)', 'Full Operation (2027)'],
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop',
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
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const { data: rawProjects } = useSWR('/api/admin/projects', fetcherArray)
  
  const dbProjects = useMemo(() => {
    return Array.isArray(rawProjects) ? rawProjects : []
  }, [rawProjects])

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
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white tracking-wide">{isAm ? 'የከተማ ፕሮጀክቶች' : 'CITY PROJECTS'}</motion.h1>
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
        <section className="bg-[#f8faf8] py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">ONGOING PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(dbProjects.length > 0 ? activeOngoing : ongoingProjects).map((p: any, i) => (
                <motion.div key={p.id || p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="h-full hover:shadow-xl transition-shadow border-gray-100 overflow-hidden flex flex-col group">
                    <div className="h-40 relative overflow-hidden bg-gray-200">
                      {p.image && <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                      {!p.image && <div className="absolute inset-0 bg-gradient-to-br from-[#1a6b3c] to-[#0d4a28] flex items-center justify-center">
                        {p.icon ? <p.icon className="w-12 h-12 text-white/80" /> : <HardHat className="w-12 h-12 text-white/80" />}
                      </div>}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                         <Badge className="bg-[#1a6b3c] text-white text-[10px] font-bold border-0">ONGOING</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                        {p.icon && <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20"><p.icon className="w-4 h-4 text-white" /></div>}
                        <h3 className="font-bold text-white text-base leading-tight drop-shadow-md">{p.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-grow">{p.description || p.desc}</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground font-medium">Progress</span>
                          <span className="font-bold text-[#1a6b3c]">{p.progress || 0}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.progress || 0}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className={`h-full rounded-full ${getProgressColor(p.progress || 0)}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto bg-gray-50 p-2 rounded-lg border border-gray-100">
                        {(p.budget) && <span className="flex items-center gap-1.5 font-medium"><DollarSign className="w-3.5 h-3.5 text-[#c8a415]" />{p.budget}</span>}
                        {(p.start || p.startDate) && <span className="flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5 text-[#1a6b3c]" />{p.start || p.startDate} – {p.end || p.endDate || '—'}</span>}
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
        <section className="bg-white py-12 px-4 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">COMPLETED PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="grid md:grid-cols-2 gap-6">
              {(dbProjects.length > 0 ? activeCompleted : completedProjects).map((p: any, i) => (
                <motion.div key={p.id || p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground">{p.title}</h3>
                        <Badge variant="outline" className="text-xs text-[#1a6b3c] border-[#1a6b3c] font-bold">COMPLETED</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-400" />{p.date || p.endDate || p.startDate || '—'}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.description || p.summary}</p>
                      {p.impact && (
                        <div className="flex items-center gap-2 text-xs text-[#1a6b3c] font-bold bg-[#1a6b3c]/5 p-3 rounded-lg border border-[#1a6b3c]/10">
                          <TrendingUp className="w-4 h-4" />{p.impact}
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
        <section className="bg-[#f8faf8] py-12 px-4 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">PLANNED PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(dbProjects.length > 0 ? activePlanned : plannedProjects).map((p: any, i) => (
                <motion.div key={p.id || p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border border-gray-200 group bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 border border-gray-100 group-hover:scale-110 transition-transform duration-300 group-hover:border-[#c8a415]/30">
                        {p.icon ? <p.icon className="w-6 h-6 text-[#1a6b3c]" /> : <Target className="w-6 h-6 text-[#1a6b3c]" />}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{p.description || p.desc}</p>
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
        <section className="bg-white py-12 px-4 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">MEGA PROJECTS</motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
            <div className="space-y-8">
              {(dbProjects.length > 0 && dbProjects.some(p => (p.category || '').toLowerCase().includes('mega')) 
                ? dbProjects.filter(p => (p.category || '').toLowerCase().includes('mega')) 
                : megaProjects).map((p: any, i: number) => (
                <motion.div key={p.id || p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                  <Card className="border border-gray-100 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden bg-gray-100">
                         {p.image && <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                         {!p.image && <div className="absolute inset-0 bg-[#0d4a28]/10 flex items-center justify-center"><Building2 className="w-16 h-16 text-[#0d4a28]/30" /></div>}
                      </div>
                      <CardContent className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-[#c8a415]" />{p.budget}</span>
                              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#1a6b3c]" />{p.timeline || `${p.startDate || ''} - ${p.endDate || ''}`}</span>
                            </div>
                          </div>
                          <Badge className="bg-[#0d4a28] text-white mt-3 md:mt-0 text-[10px] font-bold shrink-0 self-start">MEGA PROJECT</Badge>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{p.description || p.desc}</p>
                        {p.milestones && (
                          <div className="grid sm:grid-cols-2 gap-3 mt-auto">
                            {p.milestones.map((m: any, j: number) => (
                              <div key={j} className="flex items-center gap-2 text-xs text-gray-700 font-medium bg-gray-50 p-2 rounded border border-gray-100">
                                <Rocket className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                                {m}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </div>
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
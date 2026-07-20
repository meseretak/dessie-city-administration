'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { fetcherArray } from '@/lib/fetcher'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLang } from '@/lib/LangContext'
import {
  TrendingUp, CheckCircle, Clock, DollarSign, Calendar, Building2,
  MapPin, Users, Target, Rocket, Search, Filter, Wrench, ChevronRight
} from 'lucide-react'

// Dynamically import the map to prevent SSR issues with Leaflet
const ProjectMap = dynamic(() => import('./ProjectMap'), { ssr: false, loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl" /> })

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
}

function getProgressColor(p: number) {
  if (p >= 70) return 'bg-[#1a6b3c]'
  if (p >= 40) return 'bg-[#c8a415]'
  return 'bg-orange-500'
}

export default function ProjectsPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [deptFilter, setDeptFilter] = useState('All')

  const { data: rawProjects, isLoading } = useSWR('/api/admin/projects', fetcherArray)
  
  const dbProjects = useMemo(() => Array.isArray(rawProjects) ? rawProjects : [], [rawProjects])

  // Derive Statistics
  const stats = useMemo(() => {
    if (!dbProjects.length) return { total: 0, ongoing: 0, completed: 0, benefited: 0, budget: '0 ETB' }
    return {
      total: dbProjects.length,
      ongoing: dbProjects.filter(p => p.status.toLowerCase().includes('progress')).length,
      completed: dbProjects.filter(p => p.status.toLowerCase().includes('complet')).length,
      benefited: dbProjects.reduce((acc, p) => acc + (p.citizensBenefited || 0), 0),
      budget: 'ETB ' + (dbProjects.reduce((acc, p) => acc + parseInt((p.budget || '0').replace(/\D/g, '') || '0'), 0) / 1000000).toFixed(1) + 'M' // Mock formatting
    }
  }, [dbProjects])

  // Extract Departments for Filter
  const departments = useMemo(() => {
    const depts = new Set(dbProjects.map(p => p.department).filter(Boolean))
    return ['All', ...Array.from(depts)]
  }, [dbProjects])

  // Filter Projects
  const filteredProjects = useMemo(() => {
    return dbProjects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || p.status.toLowerCase() === statusFilter.toLowerCase()
      const matchesDept = deptFilter === 'All' || p.department === deptFilter
      return matchesSearch && matchesStatus && matchesDept
    })
  }, [dbProjects, searchTerm, statusFilter, deptFilter])

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
          {isAm ? 'የከተማ ፕሮጀክቶች' : 'CITY PROJECTS'}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-green-100 text-lg md:text-2xl max-w-3xl mx-auto font-light">
          Explore development projects currently being implemented by Dessie City Administration.
        </motion.p>
      </section>

      {/* Dashboard Stats */}
      <section className="bg-white px-4 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-4 shadow-xl rounded-2xl bg-white border border-gray-100 p-4">
          <div className="p-4 text-center border-r border-gray-100 last:border-0">
            <Target className="w-6 h-6 text-[#1a6b3c] mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{stats.total || '-'}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Projects</p>
          </div>
          <div className="p-4 text-center border-r border-gray-100 last:border-0">
            <Wrench className="w-6 h-6 text-[#c8a415] mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{stats.ongoing || '-'}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Ongoing</p>
          </div>
          <div className="p-4 text-center border-r border-gray-100 last:border-0">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{stats.completed || '-'}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Completed</p>
          </div>
          <div className="p-4 text-center border-r border-gray-100 last:border-0 hidden lg:block">
            <DollarSign className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{stats.total ? stats.budget : '-'}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Budget</p>
          </div>
          <div className="p-4 text-center hidden lg:block">
            <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">{stats.benefited ? stats.benefited.toLocaleString() : '-'}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Citizens Benefited</p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Filter className="w-5 h-5 text-[#1a6b3c]" /> Filters</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Project name..." 
                      className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-[#1a6b3c]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Department</label>
                  <Select value={deptFilter} onValueChange={setDeptFilter}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d: any) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(searchTerm || statusFilter !== 'All' || deptFilter !== 'All') && (
                  <Button 
                    variant="ghost" 
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 text-sm font-medium mt-2"
                    onClick={() => { setSearchTerm(''); setStatusFilter('All'); setDeptFilter('All'); }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Project Map */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hidden lg:block">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#1a6b3c]" /> Project Map</h3>
              <ProjectMap projects={filteredProjects} />
            </div>
          </div>

          {/* Project List */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm || statusFilter !== 'All' ? 'Search Results' : 'All Projects'}
                <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredProjects.length} found</span>
              </h2>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="animate-pulse border border-gray-100">
                    <div className="h-48 bg-gray-200 rounded-t-xl" />
                    <CardContent className="p-6 space-y-4">
                      <div className="h-6 w-3/4 bg-gray-200 rounded" />
                      <div className="h-4 w-full bg-gray-200 rounded" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded" />
                      <div className="h-8 w-1/2 bg-gray-200 rounded mt-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or searching for something else.</p>
                <Button onClick={() => { setSearchTerm(''); setStatusFilter('All'); setDeptFilter('All'); }} className="bg-[#1a6b3c] hover:bg-[#0d4a28]">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredProjects.map((p: any, i) => (
                    <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden group bg-white">
                        <div className="h-48 relative overflow-hidden bg-gray-100">
                          {p.image ? (
                            <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 bg-[#0d4a28]/5 flex items-center justify-center">
                              <Building2 className="w-12 h-12 text-[#1a6b3c]/20" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Badge className={`${p.status.toLowerCase().includes('complet') ? 'bg-green-600' : 'bg-[#1a6b3c]'} text-white text-[10px] font-bold border-0`}>
                              {p.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6 flex flex-col flex-grow">
                          <div className="mb-2">
                            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#1a6b3c] transition-colors line-clamp-2">{p.title}</h3>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-medium mb-4">
                            {p.department && <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5 text-[#1a6b3c]" /> {p.department}</span>}
                            {p.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#c8a415]" /> {p.location}</span>}
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">{p.description}</p>
                          
                          <div className="mt-auto space-y-5">
                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1.5">
                                <span className="text-gray-700">Progress</span>
                                <span className="text-[#1a6b3c]">{p.progress || 0}%</span>
                              </div>
                              <Progress value={p.progress || 0} className="h-2 bg-gray-100" indicatorColor={getProgressColor(p.progress || 0)} />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <div className="flex flex-col gap-1">
                                <span className="text-gray-500 uppercase tracking-wider text-[10px]">Budget</span>
                                <span className="text-gray-900 flex items-center gap-1"><DollarSign className="w-3 h-3 text-[#c8a415]" /> {p.budget || 'N/A'}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-gray-500 uppercase tracking-wider text-[10px]">Timeline</span>
                                <span className="text-gray-900 flex items-center gap-1"><Calendar className="w-3 h-3 text-[#1a6b3c]" /> {p.startDate ? p.startDate.substring(0,4) : ''} - {p.endDate ? p.endDate.substring(0,4) : 'TBA'}</span>
                              </div>
                            </div>

                            <Link href={`/projects/${p.id}`} className="block mt-2">
                              <Button className="w-full bg-white hover:bg-[#1a6b3c] text-[#1a6b3c] hover:text-white border-2 border-[#1a6b3c] font-bold transition-all group/btn">
                                View Details <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

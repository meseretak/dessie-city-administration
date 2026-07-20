'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import Link from 'next/link'
import { fetcherArray } from '@/lib/fetcher'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useLang } from '@/lib/LangContext'
import { 
  ArrowLeft, Calendar, MapPin, DollarSign, Users, Building2, 
  FileText, Download, CheckCircle, Clock, Info, Target, Wrench
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
}

function getProgressColor(p: number) {
  if (p >= 70) return 'bg-[#1a6b3c]'
  if (p >= 40) return 'bg-[#c8a415]'
  return 'bg-orange-500'
}

export default function ProjectDetailsPage({ id }: { id: string }) {
  const { lang } = useLang()
  const isAm = lang === 'am'
  
  const { data: rawProjects, isLoading } = useSWR('/api/admin/projects', fetcherArray)
  
  const project = useMemo(() => {
    if (!rawProjects || !Array.isArray(rawProjects)) return null
    return rawProjects.find((p: any) => p.id === id)
  }, [rawProjects, id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8faf8] py-12 px-4 animate-pulse">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
          <div className="h-8 w-3/4 bg-gray-200 rounded mt-4"></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="h-40 bg-gray-200 rounded-xl"></div>
              <div className="h-40 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8faf8] px-4">
        <Target className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h1>
        <p className="text-gray-500 mb-6 text-center max-w-md">The project you are looking for does not exist or may have been removed.</p>
        <Link href="/projects">
          <Button className="bg-[#1a6b3c] hover:bg-[#0d4a28]">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Button>
        </Link>
      </div>
    )
  }

  // Parse JSON fields safely
  const parseJson = (val: any) => {
    if (!val) return []
    if (typeof val === 'string') {
      try { return JSON.parse(val) } catch(e) { return [] }
    }
    return val
  }

  const photos = parseJson(project.photos)
  const documents = parseJson(project.documents)
  const faqs = parseJson(project.faqs)
  const budgetBreakdown = parseJson(project.budgetBreakdown)

  return (
    <div className="min-h-screen bg-[#f8faf8] pb-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] bg-gray-900 flex flex-col justify-end">
        {project.image ? (
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 bg-[#0d4a28] opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 pb-8 md:pb-12">
          <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isAm ? 'ወደ ፕሮጀክቶች ተመለስ' : 'Back to Projects'}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-[#c8a415] hover:bg-[#a68811] text-white border-0 font-bold px-3 py-1 text-xs">
              {project.category || 'General'}
            </Badge>
            <Badge variant="outline" className="border-white/40 text-white font-medium bg-white/10 backdrop-blur-sm px-3 py-1 text-xs">
              {project.status || 'In Progress'}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
            {project.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl leading-relaxed drop-shadow">
            {project.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[#0d4a28] mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#c8a415]" /> Project Overview
                  </h2>
                  <div className="space-y-6">
                    {project.objectives && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Key Objectives</h3>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{project.objectives}</p>
                      </div>
                    )}
                    
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <h3 className="font-semibold text-gray-900">Completion Progress</h3>
                        <span className="font-bold text-xl text-[#1a6b3c]">{project.progress || 0}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${project.progress || 0}%` }} 
                          transition={{ duration: 1, delay: 0.5 }} 
                          className={`h-full rounded-full ${getProgressColor(project.progress || 0)}`} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Photo Gallery */}
            {photos.length > 0 && (
              <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-[#0d4a28] mb-4">Progress Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {photos.map((photo: any, idx: number) => (
                        <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                          <img src={photo.url || photo} alt={`Progress photo ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
              <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-[#0d4a28] mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-[#c8a415]" /> Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq: any, idx: number) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                          <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-[#1a6b3c]">{faq.q || faq.question}</AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed">
                            {faq.a || faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-[#1a6b3c]/5 border-b border-[#1a6b3c]/10 pb-4">
                  <CardTitle className="text-lg text-[#0d4a28]">Project Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Budget</p>
                      <p className="font-bold text-gray-900">{project.budget || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Timeline</p>
                      <p className="font-medium text-gray-900 text-sm">Start: {project.startDate || 'TBA'}</p>
                      <p className="font-medium text-gray-900 text-sm">End: {project.endDate || 'TBA'}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Location</p>
                      <p className="font-medium text-gray-900 text-sm">{project.location || 'Dessie City'}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Contractor</p>
                      <p className="font-medium text-gray-900 text-sm">{project.contractor || 'TBA'}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Citizens Benefited</p>
                      <p className="font-bold text-gray-900">{project.citizensBenefited?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Documents Section */}
            {documents.length > 0 && (
              <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-[#0d4a28] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#c8a415]" /> Project Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pb-5">
                    {documents.map((doc: any, idx: number) => (
                      <a key={idx} href={doc.url || doc} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#1a6b3c]/5 border border-gray-100 transition-colors group">
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#1a6b3c]">{doc.title || `Document ${idx + 1}`}</span>
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-[#1a6b3c]" />
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Contact / Feedback */}
            <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
              <Card className="bg-[#0d4a28] border-0 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Wrench className="w-24 h-24" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <h3 className="font-bold text-lg mb-2">Have questions?</h3>
                  <p className="text-green-100 text-sm mb-5 leading-relaxed">
                    Contact the {project.department || 'City Administration'} regarding this project or provide your feedback.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-[#c8a415] hover:bg-[#a68811] text-white font-bold">
                      Contact Department
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <div className="text-center text-xs text-gray-400 pt-2">
              Last updated: {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : 'N/A'}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

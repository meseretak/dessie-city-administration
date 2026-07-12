'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageId } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft, ArrowRight, CheckCircle, Clock, MapPin, DollarSign, Building2,
  Briefcase, GraduationCap, Heart, Home, Bus, BookOpen, Award, Shield, Star,
  CalendarDays, Upload, Send, Users, FileText, Target, ChevronRight
} from 'lucide-react'

interface VacancyDetailPageProps {
  vacancyId: string | null
  navigateTo: (page: PageId, extra?: Record<string, string>) => void
}

const vacancyData: Record<string, {
  title: string; department: string; type: string; salary: string; deadline: string; status: string; postedDate: string;
  description: string; requirements: string[]; responsibilities: string[]
}> = {
  v1: {
    title: 'Senior Urban Planner', department: 'Engineering', type: 'Permanent', salary: 'ETB 25,000-35,000', deadline: 'Jul 30, 2025', status: 'Open', postedDate: 'Jun 15, 2025',
    description: 'Dessie City Administration is seeking an experienced Senior Urban Planner to lead the strategic planning and development of our rapidly growing city. This critical role involves developing comprehensive land use plans, updating zoning regulations, and coordinating with various departments to ensure sustainable urban growth.\n\nThe successful candidate will work closely with the Mayor\'s office, engineering teams, and community stakeholders to create livable, accessible, and environmentally responsible urban spaces. You will be responsible for conducting feasibility studies, preparing master plans, and presenting recommendations to the City Council.\n\nThis is an exceptional opportunity for a passionate urban planner to make a lasting impact on one of Ethiopia\'s most dynamic cities. The role offers competitive compensation, professional development opportunities, and the chance to shape the future of Dessie for generations to come.\n\nThe ideal candidate brings a blend of technical expertise, creative vision, and collaborative leadership. You should be comfortable working in a fast-paced government environment while maintaining the highest standards of professional integrity and public service.',
    requirements: ['Master\'s degree in Urban Planning, Architecture, or related field', 'Minimum 8 years of progressive urban planning experience', 'Proficiency in AutoCAD, ArcGIS, and planning software', 'Strong knowledge of Ethiopian urban development policies', 'Excellent project management and leadership skills', 'Ability to present complex plans to diverse audiences', 'Fluency in Amharic and English (written and spoken)', 'Professional registration with relevant body'],
    responsibilities: ['Develop and update the city\'s comprehensive master plan', 'Review and recommend changes to zoning regulations', 'Conduct land use studies and feasibility assessments', 'Coordinate infrastructure planning with engineering departments', 'Present planning proposals to City Council and stakeholders', 'Supervise junior planners and review their work products', 'Engage with community groups on development projects', 'Monitor compliance with approved plans and regulations']
  }
}

const getVacancy = (id: string) => vacancyData[id] || {
  title: id ? `Position #${id}` : 'Position Not Found', department: 'General', type: 'N/A', salary: 'N/A', deadline: 'N/A', status: 'N/A', postedDate: 'N/A',
  description: 'Detailed job description will be available here. Please check back later or contact the HR department for more information about this position.',
  requirements: ['Relevant educational qualification', 'Professional experience in the field', 'Strong communication skills', 'Commitment to public service', 'Ability to work in a team environment'],
  responsibilities: ['Perform duties as assigned by the department head', 'Collaborate with cross-functional teams', 'Prepare reports and documentation', 'Participate in departmental meetings', 'Contribute to organizational goals']
}

const benefits = [
  { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage for employee and dependents' },
  { icon: Shield, title: 'Pension Plan', desc: 'Government pension scheme with employer contributions' },
  { icon: CalendarDays, title: 'Annual Leave', desc: '30 days paid annual leave plus public holidays' },
  { icon: BookOpen, title: 'Training & Development', desc: 'Professional development programs and workshops' },
  { icon: Home, title: 'Housing Allowance', desc: 'Monthly housing allowance for eligible positions' },
  { icon: Bus, title: 'Transport Allowance', desc: 'Monthly transport allowance for commuting expenses' },
]

export default function VacancyDetailPage({ vacancyId, navigateTo }: VacancyDetailPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cover, setCover] = useState('')
  const v = getVacancy(vacancyId || '')

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
              <Briefcase className="w-4 h-4" />
              <span>VACANCIES</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{v.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider gov-heading-display">{v.title}</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigateTo('vacancy')} className="mb-6 text-[#1a6b3c] hover:bg-[#e8f5e9]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Vacancies
        </Button>

        {/* Job Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass p-6 mb-8">
            <CardContent className="p-0">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className={v.status === 'Open' ? 'bg-[#1a6b3c] text-white' : 'bg-red-600 text-white'}>{v.status === 'Open' ? '● OPEN' : '● CLOSED'}</Badge>
                <Badge variant="outline" className="border-[#c8a415] text-[#c8a415]">{v.type}</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Building2, label: 'Department', value: v.department },
                  { icon: Briefcase, label: 'Employment Type', value: v.type },
                  { icon: DollarSign, label: 'Salary Range', value: v.salary },
                  { icon: Clock, label: 'Deadline', value: v.deadline },
                  { icon: CalendarDays, label: 'Posted Date', value: v.postedDate },
                  { icon: MapPin, label: 'Location', value: 'Dessie, Amhara' },
                  { icon: Users, label: 'Reports To', value: 'Department Head' },
                  { icon: Target, label: 'Level', value: 'Senior' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-[#1a6b3c] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Job Description</h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                {v.description.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            <Separator />

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Requirements</h2>
              <div className="space-y-3">
                {v.requirements.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1a6b3c] mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{r}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <Separator />

            {/* Responsibilities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Key Responsibilities</h2>
              <div className="space-y-3">
                {v.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-[#c8a415] mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{r}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Benefits & Perks</h2>
              <div className="grid gap-3">
                {benefits.map((b, i) => (
                  <Card key={i} className="border border-border">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                        <b.icon className="w-5 h-5 text-[#1a6b3c]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{b.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* How to Apply */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card className="bg-[#0d4a28] text-white border-0">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-[#c8a415]" /> How to Apply</h3>
                  <ol className="space-y-3 text-sm text-green-100">
                    <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">1</span>Review all requirements carefully</li>
                    <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">2</span>Prepare your CV and certificates</li>
                    <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">3</span>Fill out the application form below</li>
                    <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">4</span>Submit before the deadline</li>
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Apply Now Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-foreground gov-section-title mb-8">Apply Now</h2>
          <Card className="p-6 md:p-8">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+251 9XX XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Upload CV *</Label>
                  <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-[#1a6b3c] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC (Max 5MB)</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="cover">Cover Letter</Label>
                  <Textarea id="cover" placeholder="Write your cover letter here..." rows={5} value={cover} onChange={e => setCover(e.target.value)} className="mt-1.5" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button className="bg-[#1a6b3c] hover:bg-[#0d4a28] text-white px-8">
                  <Send className="w-4 h-4 mr-2" /> SUBMIT APPLICATION
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
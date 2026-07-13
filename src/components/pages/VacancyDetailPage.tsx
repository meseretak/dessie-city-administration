'use client'

import { useState, useRef, useEffect } from 'react'
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
  Briefcase, Heart, Home, Bus, BookOpen, Shield, Star,
  CalendarDays, Upload, Send, Users, FileText, Target, ChevronRight,
  Loader2, CheckCircle2, X, AlertCircle
} from 'lucide-react'

interface VacancyDetailPageProps {
  vacancyId: string | null
  navigateTo: (page: PageId, extra?: Record<string, string>) => void
}

interface VacancyFromDB {
  id: string
  title: string
  department: string
  type: string
  salary: string
  deadline: string
  status: string
  description: string
  requirements: string
  createdAt: string
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
  const [vacancy, setVacancy] = useState<VacancyFromDB | null>(null)
  const [loading, setLoading] = useState(true)

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cover, setCover] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch vacancy from DB
  useEffect(() => {
    if (!vacancyId) { setLoading(false); return }
    fetch('/api/admin/vacancies')
      .then(r => r.json())
      .then((all: VacancyFromDB[]) => {
        const found = all.find(v => v.id === vacancyId || v.title === vacancyId)
        setVacancy(found || null)
      })
      .catch(() => setVacancy(null))
      .finally(() => setLoading(false))
  }, [vacancyId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size must be under 5MB')
        return
      }
      const allowed = ['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowed.includes(file.type)) {
        setSubmitError('Only PDF or DOC/DOCX files allowed')
        return
      }
      setCvFile(file)
      setSubmitError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setSubmitError('Please fill in all required fields (Name, Email, Phone)')
      return
    }
    if (!cvFile) {
      setSubmitError('Please upload your CV')
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('email', email.trim())
      formData.append('phone', phone.trim())
      formData.append('cover', cover.trim())
      formData.append('vacancyId', vacancyId || '')
      formData.append('vacancyTitle', vacancy?.title || vacancyId || '')
      formData.append('cv', cvFile)

      const res = await fetch('/api/vacancy-apply', { method: 'POST', body: formData })
      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setName(''); setEmail(''); setPhone(''); setCover(''); setCvFile(null)
      } else {
        setSubmitError(data.error || 'Submission failed. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a6b3c]" />
      </div>
    )
  }

  const title = vacancy?.title || (vacancyId ? vacancyId : 'Position Not Found')
  const department = vacancy?.department || 'General'
  const type = vacancy?.type || 'N/A'
  const salary = vacancy?.salary || 'N/A'
  const deadline = vacancy?.deadline || 'N/A'
  const status = vacancy?.status || 'Open'
  const description = vacancy?.description || 'Please contact HR for more details about this position.'
  const requirements: string[] = (() => {
    if (!vacancy?.requirements) return ['Relevant qualification', 'Professional experience', 'Strong communication skills']
    try { return JSON.parse(vacancy.requirements) } catch { return [vacancy.requirements] }
  })()
  const postedDate = vacancy?.createdAt ? new Date(vacancy.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="bg-[#0d4a28] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
              <Briefcase className="w-4 h-4" />
              <span>VACANCIES</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">{title}</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigateTo('vacancy')} className="mb-6 text-[#1a6b3c] hover:bg-[#e8f5e9]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Vacancies
        </Button>

        {/* Overview card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 mb-8">
            <CardContent className="p-0">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className={status === 'Open' ? 'bg-[#1a6b3c] text-white' : 'bg-red-600 text-white'}>
                  {status === 'Open' ? '● OPEN' : '● CLOSED'}
                </Badge>
                <Badge variant="outline" className="border-[#c8a415] text-[#c8a415]">{type}</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Building2, label: 'Department', value: department },
                  { icon: Briefcase, label: 'Employment Type', value: type },
                  { icon: DollarSign, label: 'Salary Range', value: salary },
                  { icon: Clock, label: 'Deadline', value: deadline },
                  { icon: CalendarDays, label: 'Posted Date', value: postedDate },
                  { icon: MapPin, label: 'Location', value: 'Dessie, Amhara' },
                  { icon: Users, label: 'Reports To', value: 'Department Head' },
                  { icon: Target, label: 'Level', value: 'Professional' },
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Job Description</h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                {description.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            <Separator />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Requirements</h2>
              <div className="space-y-3">
                {requirements.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1a6b3c] mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{r}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="text-xl font-bold text-foreground gov-section-title mb-4">Benefits & Perks</h2>
              <div className="grid gap-3">
                {benefits.map((b, i) => (
                  <Card key={i} className="border border-border">
                    <CardContent className="p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                        <b.icon className="w-4 h-4 text-[#1a6b3c]" />
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

            <Card className="bg-[#0d4a28] text-white border-0">
              <CardContent className="p-5">
                <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#c8a415]" /> How to Apply
                </h3>
                <ol className="space-y-2 text-sm text-green-100">
                  {['Review all requirements carefully', 'Prepare your CV (PDF/DOC, max 5MB)', 'Fill out the application form below', 'Submit before the deadline'].map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Apply Now Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-foreground gov-section-title mb-8">Apply Now</h2>

          {submitted ? (
            <Card className="border-0 bg-[#e8f5e9]">
              <CardContent className="p-10 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#1a6b3c] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1a6b3c] mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for applying. We have received your application and will contact you at your provided email address.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="border-[#1a6b3c] text-[#1a6b3c]">
                  Submit Another Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 md:p-8">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="app-name">Full Name *</Label>
                      <Input
                        id="app-name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="app-email">Email Address *</Label>
                      <Input
                        id="app-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="app-phone">Phone Number *</Label>
                      <Input
                        id="app-phone"
                        placeholder="+251 9XX XXX XXXX"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="mt-1.5"
                        required
                      />
                    </div>

                    {/* CV File Upload */}
                    <div>
                      <Label>Upload CV * (PDF or DOC, max 5MB)</Label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`mt-1.5 border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
                          cvFile ? 'border-[#1a6b3c] bg-[#e8f5e9]' : 'border-border hover:border-[#1a6b3c] hover:bg-[#f0faf4]'
                        }`}
                      >
                        {cvFile ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="w-5 h-5 text-[#1a6b3c]" />
                            <span className="text-sm font-medium text-[#1a6b3c] truncate max-w-[180px]">{cvFile.name}</span>
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Click to upload your CV</p>
                            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="app-cover">Cover Letter (Optional)</Label>
                      <Textarea
                        id="app-cover"
                        placeholder="Write a brief cover letter explaining why you are a good fit for this position..."
                        rows={5}
                        value={cover}
                        onChange={e => setCover(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#1a6b3c] hover:bg-[#0d4a28] text-white px-8"
                    >
                      {submitting
                        ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                        : <><Send className="w-4 h-4 mr-2" /> SUBMIT APPLICATION</>
                      }
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}

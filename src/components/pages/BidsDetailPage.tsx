'use client'

import { motion } from 'framer-motion'
import { PageId } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft, Gavel, ChevronRight, DollarSign, Clock, CalendarDays, MapPin,
  Phone, Mail, Building2, FileText, Download, User, CheckCircle, Shield,
  AlertTriangle, Globe, Award, CircleCheckBig, Briefcase, Printer, ArrowRight
} from 'lucide-react'

interface BidsDetailPageProps {
  bidId: string | null
  navigateTo: (page: PageId, extra?: Record<string, string>) => void
}

const tenderData: Record<string, {
  title: string; reference: string; category: string; status: string; budget: string;
  deadline: string; postedDate: string; contactPerson: string;
  description: string; requirements: string[]; submissionGuidelines: string[]
}> = {
  b1: {
    title: 'Construction of Kebele 05 Community Center', reference: 'DCA/PROC/2025/042', category: 'Construction', status: 'Open', budget: 'ETB 15,000,000', deadline: 'Aug 20, 2025', postedDate: 'Jul 10, 2025', contactPerson: 'Ato Mekonnen Haile',
    description: 'Dessie City Administration invites qualified contractors to submit bids for the construction of a modern community center in Kebele 05. The facility will include a 500-seat meeting hall, administrative offices, a library, recreational facilities, and outdoor spaces for community gatherings.\n\nThe project scope encompasses the complete construction from foundation to finishing, including electrical, plumbing, and HVAC installations. The building must comply with Ethiopian building codes and accessibility standards. The estimated construction period is 18 months from the commencement date.\n\nThe community center is part of the city\'s broader social infrastructure development program aimed at providing accessible public spaces for community engagement, cultural activities, and social services delivery to the residents of Kebele 05 and surrounding areas.',
    requirements: [
      'Valid Grade 4 or higher construction contractor license from Ethiopian government',
      'Minimum 5 years of experience in similar public building construction projects',
      'Demonstrated financial capacity with minimum annual turnover of ETB 20 million',
      'Valid tax clearance certificate from the Ethiopian Revenue and Customs Authority',
      'Registered with the Public Procurement and Property Administration Agency',
      'At least 3 completed projects of similar scale and complexity with reference letters',
      'Professional technical staff with relevant qualifications and licenses',
      'No record of contract termination or legal disputes in the past 5 years',
    ],
    submissionGuidelines: [
      'Submit two sealed envelopes: one for technical proposal and one for financial proposal',
      'Technical proposal must include company profile, experience, staff CVs, and methodology',
      'Financial proposal must include detailed bill of quantities and unit rates',
      'All documents must be signed and stamped by authorized company representative',
      'Bid security of 2% of the total bid amount in the form of CPO or bank guarantee',
      'Bids must be submitted in person or by registered courier to the Procurement Office',
      'Late submissions will not be accepted under any circumstances',
      'Bid opening will be conducted publicly on the date specified in the tender document',
    ]
  }
}

const getTender = (id: string) => tenderData[id] || {
  title: id ? `Tender #${id}` : 'Tender Not Found', reference: 'N/A', category: 'General', status: 'N/A', budget: 'N/A', deadline: 'N/A', postedDate: 'N/A', contactPerson: 'N/A',
  description: 'Detailed tender information will be available here. Please contact the Procurement Office for more information about this tender opportunity.',
  requirements: ['Valid business license', 'Tax clearance certificate', 'Relevant experience', 'Financial capacity', 'Technical capability'],
  submissionGuidelines: ['Submit sealed bids to the Procurement Office', 'Include all required documents', 'Meet the stated deadline', 'Attend the bid opening session']
}

const documents = [
  { icon: FileText, name: 'Tender Document', size: '2.4 MB', format: 'PDF' },
  { icon: Printer, name: 'Bill of Quantities', size: '1.8 MB', format: 'XLSX' },
  { icon: Globe, name: 'Terms of Reference', size: '890 KB', format: 'PDF' },
  { icon: Award, name: 'Evaluation Criteria', size: '520 KB', format: 'PDF' },
]

export default function BidsDetailPage({ bidId, navigateTo }: BidsDetailPageProps) {
  const t = getTender(bidId || '')

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
              <Gavel className="w-4 h-4" />
              <span>BIDS & TENDERS</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{t.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider gov-heading-display leading-tight">{t.title}</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigateTo('bids')} className="mb-6 text-[#1a6b3c] hover:bg-[#e8f5e9]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tenders
        </Button>

        {/* Tender Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass p-6 mb-8">
            <CardContent className="p-0">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-[#1a6b3c] text-white text-xs font-mono">{t.reference}</Badge>
                <Badge variant="outline" className="border-[#c8a415] text-[#c8a415]">{t.category}</Badge>
                <Badge className={t.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>● {t.status.toUpperCase()}</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: DollarSign, label: 'Budget', value: t.budget },
                  { icon: Clock, label: 'Deadline', value: t.deadline },
                  { icon: CalendarDays, label: 'Posted Date', value: t.postedDate },
                  { icon: User, label: 'Contact Person', value: t.contactPerson },
                  { icon: MapPin, label: 'Location', value: 'Dessie, Amhara' },
                  { icon: Building2, label: 'Issuing Office', value: 'Procurement Office' },
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

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Tender Description</h2>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            {t.description.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Requirements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
          <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Eligibility Requirements</h2>
          <div className="space-y-3">
            {t.requirements.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#f8faf8]">
                <CheckCircle className="w-5 h-5 text-[#1a6b3c] mt-0.5 shrink-0" />
                <p className="text-muted-foreground text-sm">{r}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Submission Guidelines */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Submission Guidelines</h2>
          <div className="space-y-3">
            {t.submissionGuidelines.map((g, i) => (
              <div key={i} className="flex items-start gap-3">
                <CircleCheckBig className="w-5 h-5 text-[#c8a415] mt-0.5 shrink-0" />
                <p className="text-muted-foreground text-sm">{g}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Documents */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8">
          <h2 className="text-xl font-bold text-foreground gov-section-title mb-6">Downloadable Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((d, i) => (
              <Card key={i} className="border border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#e8f5e9] flex items-center justify-center shrink-0">
                    <d.icon className="w-6 h-6 text-[#1a6b3c]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.format} • {d.size}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-[#1a6b3c] hover:bg-[#e8f5e9] shrink-0">
                    <Download className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-[#0d4a28] text-white border-0">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Phone className="w-5 h-5 text-[#c8a415]" /> Contact for Inquiries</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: 'Office', value: 'City Procurement Office' },
                  { icon: User, label: 'Contact Person', value: t.contactPerson },
                  { icon: Phone, label: 'Phone', value: '+251 33 111 2233' },
                  { icon: Mail, label: 'Email', value: 'procurement@dessiecity.gov.et' },
                  { icon: MapPin, label: 'Address', value: 'City Hall, 2nd Floor, Dessie' },
                  { icon: Clock, label: 'Office Hours', value: 'Mon-Fri, 8:30 AM - 5:00 PM' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <c.icon className="w-5 h-5 text-[#c8a415] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-green-300 uppercase tracking-wider">{c.label}</p>
                      <p className="font-semibold text-white">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
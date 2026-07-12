'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion'
import { PageId } from '@/lib/types'
import {
  ArrowLeft, MapPin, Clock, Phone, FileText, CheckCircle, ChevronRight,
  Download, CreditCard, Building2, Banknote, Smartphone, CircleDot,
  Baby, FileCheck, Building as BuildingIcon, Map, Receipt, Heart,
  Stethoscope, GraduationCap, Bus, Droplets, MessageSquareWarning, CalendarDays,
  HelpCircle, Mail, Send, ExternalLink
} from 'lucide-react'
import { useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

interface ServiceDetailPageProps {
  serviceId: string | null
  navigateTo: (page: PageId, extra?: { serviceId?: string; vacancyId?: string; newsId?: string; bidId?: string }) => void
}

const serviceIcons: Record<string, React.ElementType> = {
  'Birth Registration': Baby, 'Business License': FileCheck, 'Building Permit': BuildingIcon,
  'Land Services': Map, 'Tax Payment': Receipt, 'Marriage Registration': Heart,
  'Health Services': Stethoscope, 'Education': GraduationCap, 'Transportation': Bus,
  'Water & Electricity': Droplets, 'Complaints & Feedback': MessageSquareWarning, 'Appointments': CalendarDays,
}

const serviceDataMap: Record<string, {
  description: string
  requirements: string[]
  process: { title: string; desc: string }[]
  documents: { name: string; desc: string }[]
  fees: { type: string; fee: string; time: string }[]
  faqs: { q: string; a: string }[]
  office: string
  phone: string
  processingTime: string
  serviceFee: string
}> = {
  'Birth Registration': {
    description: 'The Birth Registration service allows parents and guardians to register newborns and obtain official birth certificates issued by the Dessie City Administration. Birth registration is a fundamental right and is required for school enrollment, passport applications, and access to government services. The service is available at all 12 kebele offices across the city and through our online portal for added convenience.',
    requirements: ['Child must be registered within 30 days of birth', 'Parent or legal guardian must present valid identification', 'Hospital or health center birth notification letter required', 'Two passport-size photographs of the child', 'Parents\' marriage certificate (if applicable)'],
    process: [
      { title: 'Visit Kebele Office or Go Online', desc: 'Go to your nearest kebele sub-city office or visit the online portal to begin registration.' },
      { title: 'Submit Required Documents', desc: 'Present the birth notification, parent IDs, photographs, and any supporting documents.' },
      { title: 'Information Verification', desc: 'The registration officer verifies all information and enters it into the national registry system.' },
      { title: 'Certificate Issuance', desc: 'An official birth certificate is printed and issued within 3 working days.' },
    ],
    documents: [
      { name: 'Birth Notification Form', desc: 'Hospital-issued birth notification letter' },
      { name: 'Parent ID Copy', desc: 'Photocopy of parent/guardian national ID' },
      { name: 'Application Form', desc: 'Completed birth registration application' },
      { name: 'Photo Template', desc: 'Passport-size photo specification guide' },
      { name: 'Affidavit Template', desc: 'For late registration (after 30 days)' },
      { name: 'Marriage Certificate Copy', desc: 'Optional, if parents are married' },
    ],
    fees: [
      { type: 'Standard Registration (within 30 days)', fee: 'Free', time: '3 days' },
      { type: 'Late Registration', fee: 'ETB 100', time: '7 days' },
      { type: 'Replacement Certificate', fee: 'ETB 50', time: '5 days' },
    ],
    faqs: [
      { q: 'Is there a deadline for birth registration?', a: 'Births should be registered within 30 days. Late registration incurs a small fee and requires additional documentation.' },
      { q: 'What if I lost the birth notification?', a: 'You can obtain a replacement from the hospital where the birth occurred, or submit an affidavit at the kebele office.' },
      { q: 'Can I register a birth online?', a: 'Yes, the online portal allows you to start the process. You will still need to visit the kebele office for document verification and certificate pickup.' },
      { q: 'What documents does the child receive?', a: 'An official birth certificate issued by the city administration, which is recognized nationally.' },
    ],
    office: 'Kebele Civil Registry Office, Sub-City Hall', phone: '+251 33 111 2233', processingTime: '3 working days', serviceFee: 'Free (standard)',
  },
  'Business License': {
    description: 'Apply for new business licenses or renew existing ones through the Dessie City Trade and Industry Bureau. All types of businesses are supported including retail trade, manufacturing, professional services, and hospitality. The digital application system allows you to track your application status in real time.',
    requirements: ['Valid national identification card (ID)', 'Business plan or description of activities', 'Proof of business location (rental agreement or ownership)', 'Tax identification number (TIN)', 'Two passport-size photographs'],
    process: [
      { title: 'Submit Application', desc: 'Complete the business license application form online or at the Trade Bureau office.' },
      { title: 'Document Review', desc: 'The review committee examines your application and supporting documents.' },
      { title: 'Site Inspection', desc: 'A field officer inspects your business premises for compliance.' },
      { title: 'License Issuance', desc: 'Upon approval, your business license is issued and registered.' },
      { title: 'Annual Renewal', desc: 'Licenses must be renewed annually with updated documentation.' },
    ],
    documents: [
      { name: 'Business License Application', desc: 'Main application form for new licenses' },
      { name: 'Business Plan Template', desc: 'Standard business plan format' },
      { name: 'TIN Registration', desc: 'Tax identification registration form' },
      { name: 'Location Proof Template', desc: 'Rental agreement or ownership deed' },
      { name: 'Renewal Application', desc: 'For existing license renewal' },
      { name: 'Fee Schedule', desc: 'Current license fee structure' },
      { name: 'Compliance Checklist', desc: 'Pre-inspection requirements' },
    ],
    fees: [
      { type: 'Small Enterprise', fee: 'ETB 500 — 2,000', time: '10 days' },
      { type: 'Medium Enterprise', fee: 'ETB 2,000 — 10,000', time: '15 days' },
      { type: 'Large Enterprise', fee: 'ETB 10,000 — 50,000', time: '20 days' },
    ],
    faqs: [
      { q: 'How long does it take to get a business license?', a: 'Processing time depends on business size: 10 days for small, 15 days for medium, and 20 days for large enterprises.' },
      { q: 'Can I track my application online?', a: 'Yes, after submitting your application you receive a tracking number to monitor progress through our portal.' },
      { q: 'What types of businesses need a license?', a: 'All commercial, manufacturing, and service businesses operating within Dessie city limits require a municipal business license.' },
    ],
    office: 'Trade & Industry Bureau, City Hall 2nd Floor', phone: '+251 33 111 2244', processingTime: '10-20 working days', serviceFee: 'ETB 500 — 50,000',
  },
}

const defaultServiceData = {
  description: 'This municipal service is provided by the Dessie City Administration to serve citizens efficiently and transparently. Our goal is to make government services accessible to all residents through both online and in-person channels. Please visit the relevant office or use our digital portal to access this service.',
  requirements: ['Valid national identification card', 'Completed application form', 'Passport-size photographs (2)', 'Proof of residency in Dessie', 'Any service-specific supporting documents'],
  process: [
    { title: 'Visit Office or Go Online', desc: 'Access the service through our digital portal or visit the designated city office.' },
    { title: 'Submit Application', desc: 'Complete and submit the required application form with all supporting documents.' },
    { title: 'Application Review', desc: 'The responsible department reviews your application for completeness and eligibility.' },
    { title: 'Service Delivery', desc: 'Upon approval, the service is delivered and you receive official confirmation.' },
  ],
  documents: [
    { name: 'Application Form', desc: 'Main service application form' },
    { name: 'ID Copy Template', desc: 'Photocopy specification guide' },
    { name: 'Residence Proof', desc: 'Utility bill or kebele letter' },
    { name: 'Photo Specification', desc: 'Required photo format guide' },
    { name: 'Checklist', desc: 'Complete document checklist' },
    { name: 'Fee Schedule', desc: 'Current service fee structure' },
  ],
  fees: [
    { type: 'Standard Service', fee: 'ETB 50 — 500', time: '5-10 days' },
    { type: 'Expedited Service', fee: 'ETB 1,000', time: '1-2 days' },
  ],
  faqs: [
    { q: 'How do I access this service?', a: 'You can visit the designated city office during working hours or use our online portal for digital access.' },
    { q: 'What are the working hours?', a: 'Monday to Friday, 8:00 AM to 5:00 PM (local time). Closed on public holidays.' },
    { q: 'Can someone else apply on my behalf?', a: 'Yes, with a signed authorization letter and copies of both your ID and the representative\'s ID.' },
    { q: 'What if my application is rejected?', a: 'You will receive a written explanation. You may appeal the decision within 30 days.' },
  ],
  office: 'City Administration Main Office, City Hall', phone: '+251 33 111 2200', processingTime: '5-10 working days', serviceFee: 'ETB 50 — 500',
}

const relatedServices = [
  'Birth Registration', 'Business License', 'Building Permit', 'Tax Payment',
  'Marriage Registration', 'Health Services', 'Education', 'Land Services',
  'Water & Electricity', 'Complaints & Feedback', 'Appointments', 'Transportation',
]

function getServiceData(serviceId: string) {
  return serviceDataMap[serviceId] || defaultServiceData
}

export default function ServiceDetailPage({ serviceId, navigateTo }: ServiceDetailPageProps) {
  const [inquiryName, setInquiryName] = useState('')
  const [inquiryEmail, setInquiryEmail] = useState('')
  const [inquiryMsg, setInquiryMsg] = useState('')

  const title = serviceId || 'Service'
  const IconComp = serviceIcons[title] || FileText
  const data = getServiceData(title)

  const related = relatedServices.filter((s) => s !== title).slice(0, 4)

  return (
    <main>
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 text-center relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-4">{title}</h1>
          <Separator className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">Home / Services / {title}</p>
        </motion.div>
      </section>

      {/* Back Button */}
      <section className="bg-white py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigateTo('services')} className="flex items-center gap-2 text-[#1a6b3c] font-semibold text-sm hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </button>
        </div>
      </section>

      {/* Service Overview */}
      <section className="bg-white pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#1a6b3c] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <IconComp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <Badge className="bg-[#1a6b3c]/10 text-[#1a6b3c] border-[#1a6b3c]/20 mb-2">Municipal Service</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0d4a28]">{title}</h2>
                </div>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed">{data.description}</motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Card className="glass border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold text-[#0d4a28] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1a6b3c]" /> Quick Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#1a6b3c] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Office Location</p><p className="text-sm font-medium">{data.office}</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><Clock className="w-4 h-4 text-[#1a6b3c] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Working Hours</p><p className="text-sm font-medium">Mon–Fri 8AM–5PM</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><Phone className="w-4 h-4 text-[#1a6b3c] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Contact Phone</p><p className="text-sm font-medium">{data.phone}</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><CircleDot className="w-4 h-4 text-[#c8a415] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Avg. Processing</p><p className="text-sm font-medium">{data.processingTime}</p></div></div>
                  <Separator />
                  <div className="flex items-start gap-3"><Receipt className="w-4 h-4 text-[#c8a415] mt-0.5 flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Service Fee</p><p className="text-sm font-medium">{data.serviceFee}</p></div></div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">REQUIREMENTS & ELIGIBILITY</motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.requirements.map((req, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-[#1a6b3c] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{req}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">APPLICATION PROCESS</motion.h2>
            <div className="space-y-0">
              {data.process.map((step, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex gap-5 pb-8 last:pb-0 relative">
                  {i < data.process.length - 1 && <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-[#1a6b3c]/15" />}
                  <div className="w-10 h-10 rounded-full bg-[#1a6b3c] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 z-10 shadow">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-[#0d4a28] mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">REQUIRED DOCUMENTS</motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.documents.map((doc, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <FileText className="w-6 h-6 text-[#1a6b3c] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-[#0d4a28] text-sm mb-1">{doc.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{doc.desc}</p>
                          <button className="text-xs text-[#1a6b3c] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            <Download className="w-3 h-3" /> DOWNLOAD TEMPLATE
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fees & Timeline */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">FEES & TIMELINE</motion.h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-[#0d4a28]">Fee Structure</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
                        <span>Service Type</span><span className="text-center">Fee</span><span className="text-right">Processing</span>
                      </div>
                      {data.fees.map((f, i) => (
                        <div key={i} className="grid grid-cols-3 gap-2 py-3 border-b border-border/50 last:border-0 text-sm">
                          <span className="text-muted-foreground">{f.type}</span>
                          <span className="text-center font-semibold text-[#0d4a28]">{f.fee}</span>
                          <span className="text-right text-muted-foreground">{f.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="border-0 shadow-md h-full">
                  <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-[#0d4a28]">Payment Methods</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { icon: Banknote, label: 'Cash', desc: 'Pay directly at the city finance office counter' },
                      { icon: Building2, label: 'Bank Transfer', desc: 'Transfer to the Dessie City Administration account at any commercial bank' },
                      { icon: Smartphone, label: 'Mobile Payment', desc: 'Use Telebirr, CBE Birr, or other mobile money platforms' },
                    ].map((m) => (
                      <div key={m.label} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1a6b3c]/10 flex items-center justify-center flex-shrink-0">
                          <m.icon className="w-5 h-5 text-[#1a6b3c]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0d4a28] text-sm">{m.label}</p>
                          <p className="text-xs text-muted-foreground">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] inline-block">FREQUENTLY ASKED QUESTIONS</h2>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Accordion type="single" collapsible className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl shadow-sm px-5 border-0">
                    <AccordionTrigger className="text-sm font-semibold text-[#0d4a28] hover:no-underline py-4">
                      <span className="flex items-center gap-2 text-left"><HelpCircle className="w-4 h-4 text-[#1a6b3c] flex-shrink-0" /> {faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">RELATED SERVICES</motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((name) => {
                const RIcon = serviceIcons[name] || FileText
                return (
                  <motion.div key={name} variants={fadeInUp}>
                    <Card className="gov-service-card border-0 shadow-sm cursor-pointer h-full" onClick={() => navigateTo('service-detail', { serviceId: name })}>
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1a6b3c]/10 flex items-center justify-center flex-shrink-0">
                          <RIcon className="w-6 h-6 text-[#1a6b3c]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#0d4a28] text-sm truncate">{name}</h3>
                          <p className="text-xs text-[#1a6b3c] flex items-center gap-1 mt-1">View Details <ChevronRight className="w-3 h-3" /></p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact for This Service */}
      <section className="bg-[#f8faf8] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="gov-section-title text-xl md:text-2xl font-bold text-[#0d4a28] mb-8">CONTACT FOR THIS SERVICE</motion.h2>
            <motion.div variants={fadeInUp}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Office Address</p><p className="text-sm font-medium">{data.office}, Dessie, Amhara, Ethiopia</p></div></div>
                      <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{data.phone}</p></div></div>
                      <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium">services@dessiecity.gov.et</p></div></div>
                      <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-[#1a6b3c] mt-0.5" /><div><p className="text-xs text-muted-foreground">Hours</p><p className="text-sm font-medium">Mon–Fri, 8:00 AM – 5:00 PM</p></div></div>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="Your Name" value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} className="bg-[#f8faf8] border-border" />
                      <Input placeholder="Your Email" type="email" value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} className="bg-[#f8faf8] border-border" />
                      <Textarea placeholder="Your inquiry about this service..." value={inquiryMsg} onChange={(e) => setInquiryMsg(e.target.value)} rows={3} className="bg-[#f8faf8] border-border" />
                      <Button className="w-full bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-semibold">
                        <Send className="w-4 h-4 mr-2" /> SUBMIT INQUIRY
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
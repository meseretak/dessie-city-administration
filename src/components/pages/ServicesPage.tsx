'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { PageId } from '@/lib/types'
import { useLang } from '@/lib/LangContext'
import {
  Baby, FileCheck, Building, MapPin, Receipt, Heart, Stethoscope, GraduationCap,
  Bus, Droplets, MessageSquareWarning, CalendarDays, Search, ChevronRight,
  ArrowRight, CircleDot, FileText, ClipboardList, Shield
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
}

interface ServicesPageProps {
  navigateTo: (page: PageId, extra?: { serviceId?: string; vacancyId?: string; newsId?: string; bidId?: string }) => void
}

// Bilingual services data
const servicesData = {
  en: [
    { title: 'Birth Registration', icon: Baby, description: 'Register births within 30 days and obtain official birth certificates. Available at all kebele offices and online.', features: ['Online registration available', 'Certificate issued within 3 days', 'Free for all citizens'] },
    { title: 'Business License', icon: FileCheck, description: 'Apply for new business licenses or renew existing ones. All types of businesses supported.', features: ['New & renewal applications', 'All business types supported', 'Digital tracking system'] },
    { title: 'Building Permit', icon: Building, description: 'Submit building permit applications for residential, commercial, and industrial construction.', features: ['Online application tracking', 'Residential & commercial permits', 'Inspection scheduling'] },
    { title: 'Land Services', icon: MapPin, description: 'Access land registration, cadastral survey, title deed issuance, and land transfer services.', features: ['Cadastral survey services', 'Title deed issuance', 'Land transfer processing'] },
    { title: 'Tax Payment', icon: Receipt, description: 'Pay property taxes, business taxes, and municipal fees online or at payment centers.', features: ['Online & offline payment', 'Multiple payment methods', 'Instant receipt download'] },
    { title: 'Marriage Registration', icon: Heart, description: 'Register marriages and obtain official marriage certificates. Both civil and religious marriages supported.', features: ['Civil & religious marriages', 'Certificate in 5 days', 'Online appointment booking'] },
    { title: 'Health Services', icon: Stethoscope, description: 'Find hospitals, health centers, clinics, and pharmacies. Access health information and emergency services.', features: ['Facility directory & map', 'Emergency contact info', 'Health campaign schedules'] },
    { title: 'Education', icon: GraduationCap, description: 'Information about schools, colleges, TVET institutions, and universities in Dessie.', features: ['School enrollment info', 'Scholarship listings', 'TVET program directory'] },
    { title: 'Transportation', icon: Bus, description: 'Public transport routes, schedules, taxi services, and traffic information for Dessie.', features: ['Route maps & schedules', 'Real-time traffic updates', 'Taxi fare information'] },
    { title: 'Water & Electricity', icon: Droplets, description: 'New connections, billing inquiries, service interruptions, and payment services for utilities.', features: ['New connection requests', 'Billing & payment', 'Outage reporting'] },
    { title: 'Complaints & Feedback', icon: MessageSquareWarning, description: 'Submit service complaints, suggestions, and feedback. Track resolution status online.', features: ['Online submission form', 'Real-time status tracking', 'Anonymous option available'] },
    { title: 'Appointments', icon: CalendarDays, description: 'Book appointments with city offices, departments, and officials for in-person visits.', features: ['Choose date & time', 'Department selection', 'Email confirmation'] },
  ],
  am: [
    { title: 'የልደት ምዝገባ', icon: Baby, description: 'ልጅ ከተወለደ በ30 ቀናት ውስጥ ይመዝገቡ እና ይፋዊ የልደት ምስክር ወረቀት ያግኙ። ሁሉም ቀበሌ ቢሮዎችና ኦንላይን ይገኛል።', features: ['ኦንላይን ምዝገባ ይቻላል', 'ምስክር ወረቀት በ3 ቀናት', 'ለሁሉም ዜጎች ነፃ'] },
    { title: 'የንግድ ፈቃድ', icon: FileCheck, description: 'አዲስ የንግድ ፈቃድ ያመልክቱ ወይም ያለዎትን ያሳድሱ። ሁሉም ዓይነት ንግዶች ይደገፋሉ።', features: ['አዲስ እና ታደሻ ማመልከቻ', 'ሁሉም ዓይነት ንግዶች', 'ዲጂታል ክትትል ስርዓት'] },
    { title: 'የግንባታ ፈቃድ', icon: Building, description: 'ለቤት፣ ለንግድ እና ለኢንዱስትሪ ግንባታ ፈቃድ ያመልክቱ። ሁኔታዎን ኦንላይን ይከታተሉ።', features: ['ኦንላይን ክትትል', 'ቤት እና ንግድ ፈቃዶች', 'ፍተሻ ቀጠሮ'] },
    { title: 'የመሬት አገልግሎቶች', icon: MapPin, description: 'የመሬት ምዝገባ፣ ካዳስትራል ዳሰሳ፣ ሰነድ ማውጣት እና ማስተላለፍ አገልግሎቶች።', features: ['ካዳስትራል ዳሰሳ', 'ሰነድ ማውጣት', 'የመሬት ማስተላለፍ'] },
    { title: 'ግብር ክፍያ', icon: Receipt, description: 'የንብረት ግብር፣ የንግድ ግብር እና ሌሎች ክፍያዎችን ኦንላይን ወይም በቢሮ ይክፈሉ።', features: ['ኦንላይን እና ቢሮ ክፍያ', 'ብዙ የክፍያ ዘዴዎች', 'ፈጣን ደረሰኝ'] },
    { title: 'የጋብቻ ምዝገባ', icon: Heart, description: 'ጋብቻ ይመዝገቡ እና ይፋዊ ምስክር ወረቀት ያግኙ። ሲቪልና ሃይማኖታዊ ጋብቻ ይደገፋሉ።', features: ['ሲቪልና ሃይማኖታዊ ጋብቻ', 'ምስክር ወረቀት በ5 ቀናት', 'ቀጠሮ ኦንላይን'] },
    { title: 'የጤና አገልግሎቶች', icon: Stethoscope, description: 'ሆስፒታሎች፣ ጤና ጣቢያዎች፣ ክሊኒኮች ያግኙ። ድንገተኛ አገልግሎትና ጤና መረጃ።', features: ['የጤና ተቋም ዝርዝር', 'ድንገተኛ ጥሪ', 'የጤና ዘመቻ ቀኖች'] },
    { title: 'ትምህርት', icon: GraduationCap, description: 'ስለ ትምህርት ቤቶች፣ ኮሌጆች፣ TVET እና ዩኒቨርሲቲዎች ደሴ ከተማ ውስጥ መረጃ።', features: ['የትምህርት ቤት ምዝገባ', 'ስኮላርሺፕ ዝርዝር', 'TVET መርሃ ግብሮች'] },
    { title: 'ትራንስፖርት', icon: Bus, description: 'የሕዝብ ትራንስፖርት መስመሮች፣ ፕሮግራሞች፣ ታክሲ አገልግሎት እና የትራፊክ መረጃ።', features: ['የመስመር ካርታ', 'የትራፊክ ዝማኔ', 'የታክሲ ታሪፍ'] },
    { title: 'ውሃና ኤሌክትሪክ', icon: Droplets, description: 'አዲስ ግንኙነት፣ ቢሊንግ፣ የአገልግሎት ማቋረጥና ክፍያ አገልግሎቶች።', features: ['አዲስ ግንኙነት ጥያቄ', 'ቢሊንግ እና ክፍያ', 'ማቋረጥ ሪፖርት'] },
    { title: 'ቅሬታዎችና አስተያየቶች', icon: MessageSquareWarning, description: 'የአገልግሎት ቅሬታ፣ ሀሳቦችና አስተያየቶች ያስገቡ። ሁኔታ ኦንላይን ይከታተሉ።', features: ['ኦንላይን ማስገቢያ', 'ፈጣን ክትትል', 'ስም ሳይጠቀሱ ይቻላል'] },
    { title: 'ቀጠሮዎች', icon: CalendarDays, description: 'ከከተማ ቢሮዎች፣ ክፍሎችና ባለስልጣናት ጋር ቀጠሮ ያዙ።', features: ['ቀንና ሰዓት ምረጥ', 'ዲፓርትመንት ምረጥ', 'ኢሜይል ማረጋገጫ'] },
  ]
}

const steps = [
  { num: 1, title: 'Select Service', titleAm: 'አገልግሎት ምረጥ', desc: 'Browse our comprehensive list of municipal services and choose what you need.', descAm: 'የህዝብ አገልግሎቶች ዝርዝር ይመልከቱ እና የሚፈልጉትን ይምረጡ።', icon: ClipboardList },
  { num: 2, title: 'Fill Application', titleAm: 'ማመልከቻ ይሙሉ', desc: 'Complete the required forms with your information and upload necessary documents.', descAm: 'አስፈላጊ ቅጾችን ይሙሉ እና ሰነዶቹን ይጭኑ።', icon: FileText },
  { num: 3, title: 'Receive Confirmation', titleAm: 'ማረጋገጫ ያግኙ', desc: 'Get instant confirmation and track your application status online in real time.', descAm: 'ፈጣን ማረጋገጫ ያግኙ እና ሁኔታዎን ኦንላይን ይከታተሉ።', icon: Shield },
]

export default function ServicesPage({ navigateTo }: ServicesPageProps) {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [searchQuery, setSearchQuery] = useState('')

  const services = servicesData[isAm ? 'am' : 'en']

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main>
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 left-1/3 w-36 h-36 rounded-full border border-white/20" />
          <div className="absolute bottom-4 right-1/4 w-28 h-28 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#c8a415] text-sm tracking-[0.2em] font-semibold mb-3 uppercase">{isAm ? 'የህዝብ አገልግሎቶች' : 'Municipal Services'}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-4">{isAm ? 'የዜጎች አገልግሎቶች' : 'CITIZEN SERVICES'}</h1>
          <Separator className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">{isAm ? 'ዋና ገጽ / አገልግሎቶች' : 'Home / Services'}</p>
          <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">{isAm ? 'ሁሉም የመንግስት አገልግሎቶች በዲጂታልና በቢሮ ይገኛሉ' : 'All government services available online and at city offices'}</p>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-8 px-4 -mt-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={isAm ? 'አገልግሎቶችን ፈልግ... (ለምሳሌ፡ የልደት ምዝገባ፣ ታክስ)' : 'Search services... (e.g., birth registration, tax, license)'}
              className="pl-12 pr-4 py-6 h-14 text-base rounded-xl border-[#1a6b3c]/20 focus:border-[#1a6b3c] shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            {filteredServices.length === 0 ? (
              <motion.div variants={fadeInUp} className="text-center py-16">
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground">{isAm ? 'አገልግሎቶች አልተገኙም' : 'No services found'}</h3>
                <p className="text-sm text-muted-foreground mt-1">{isAm ? 'ሌላ ቃል ይሞክሩ' : 'Try a different search term'}</p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <motion.div key={service.title} variants={fadeInUp}>
                    <Card className="h-full border border-gray-100 hover:border-[#c8a415]/40 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer bg-white overflow-hidden relative flex flex-col" onClick={() => navigateTo('service-detail', { serviceId: service.title })}>
                      {/* Hover background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0d4a28]/[0.02] to-[#c8a415]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Top colored accent line */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                      <CardContent className="p-7 flex flex-col h-full relative z-10">
                        {/* Icon & Title Header */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-[#f8faf8] border border-[#e5e7eb] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#0d4a28] group-hover:to-[#1a6b3c] group-hover:border-transparent transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-[#1a6b3c]/30 group-hover:-translate-y-1">
                            <service.icon className="w-7 h-7 text-[#0d4a28] group-hover:text-white transition-colors duration-500" />
                          </div>
                          <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#0d4a28] transition-colors duration-300 pt-1 leading-snug">{service.title}</h3>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
                        
                        {/* Features List */}
                        <ul className="space-y-3 mb-8">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-[13px] text-gray-500 group-hover:text-gray-600 transition-colors duration-300 font-medium">
                              <div className="w-5 h-5 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1a6b3c]/10 transition-colors">
                                <CircleDot className="w-3 h-3 text-[#1a6b3c]" />
                              </div>
                              {f}
                            </li>
                          ))}
                        </ul>
                        
                        {/* Footer Action */}
                        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c8a415] group-hover:animate-pulse" />
                            Official Service
                          </span>
                          <div className="flex items-center gap-1.5 text-[#0d4a28] text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#f0fdf4] group-hover:bg-[#0d4a28] group-hover:text-white transition-all duration-300 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 border border-[#0d4a28]/10 group-hover:border-[#0d4a28]">
                            <span>{isAm ? 'አገልግሎቱን ይጠቀሙ' : 'ACCESS SERVICE'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">{isAm ? 'እንዴት እንደሚሰራ' : 'HOW IT WORKS'}</h2>
              <p className="text-muted-foreground mt-4">{isAm ? 'የከተማ አገልግሎቶችን ማግኘት ቀላልና ቀጥተኛ ነው' : 'Accessing city services is simple and straightforward'}</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <motion.div key={step.num} variants={fadeInUp} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a6b3c] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-[#0d4a28] mb-2">{isAm ? step.titleAm : step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{isAm ? step.descAm : step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
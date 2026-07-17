'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import type { PageId } from '@/lib/types'
import { useLang } from '@/lib/LangContext'
import {
  Baby, FileCheck, Building, MapPin, Receipt, Heart, Stethoscope, GraduationCap,
  Bus, Droplets, MessageSquareWarning, CalendarDays, Search,
  ArrowRight, CircleDot, FileText, ClipboardList, Shield, Globe
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
    <main className="bg-gray-50/50">
      {/* Page Banner */}
      <section className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-1/4 w-32 h-32 rounded-full border border-white/20 animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute bottom-8 right-1/3 w-48 h-48 rounded-full border border-white/20 animate-pulse" />
          <div className="absolute top-8 right-16 w-20 h-20 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20 shadow-lg">
            <Globe className="w-4 h-4 text-[#c8a415]" />
            <p className="text-[#c8a415] text-sm tracking-widest font-semibold uppercase">{isAm ? 'የህዝብ አገልግሎቶች' : 'Municipal Services'}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wide mb-6 drop-shadow-lg">{isAm ? 'የዜጎች አገልግሎቶች' : 'CITIZEN SERVICES'}</h1>
          <Separator className="w-24 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1 mb-6 border-0" />
          <p className="text-white/80 text-sm tracking-widest uppercase font-medium">{isAm ? 'ዋና ገጽ / አገልግሎቶች' : 'Home / Services'}</p>
          <p className="text-white/70 text-lg mt-6 max-w-2xl mx-auto font-medium">{isAm ? 'ሁሉም የመንግስት አገልግሎቶች በዲጂታልና በቢሮ ይገኛሉ' : 'All government services available seamlessly online and at city offices'}</p>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-10 px-4 -mt-10 relative z-10 mx-4 md:mx-auto max-w-4xl rounded-2xl shadow-xl border border-gray-100">
        <div className="w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#1a6b3c]" />
            <Input
              placeholder={isAm ? 'አገልግሎቶችን ፈልግ... (ለምሳሌ፡ የልደት ምዝገባ፣ ታክስ)' : 'Search services... (e.g., birth registration, tax, license)'}
              className="pl-16 pr-6 py-8 h-16 text-lg rounded-xl border-[#1a6b3c]/20 focus:border-[#1a6b3c] shadow-inner bg-gray-50 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            {filteredServices.length === 0 ? (
              <motion.div variants={fadeInUp} className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
                <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-400">{isAm ? 'አገልግሎቶች አልተገኙም' : 'No services found'}</h3>
                <p className="text-lg text-gray-400 mt-2">{isAm ? 'ሌላ ቃል ይሞክሩ' : 'Try a different search term'}</p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <motion.div key={service.title} variants={fadeInUp}>
                    <Card className="h-full border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer bg-white/80 backdrop-blur-md overflow-hidden relative flex flex-col hover:-translate-y-2" onClick={() => navigateTo('service-detail', { serviceId: service.title })}>
                      {/* Top colored accent line full on hover */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                      
                      {/* Abstract Background for Card */}
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-[#c8a415]/10 to-transparent rounded-full blur-2xl group-hover:bg-[#c8a415]/20 transition-colors" />

                      <CardContent className="p-8 flex flex-col h-full relative z-10">
                        {/* Icon & Title Header */}
                        <div className="flex flex-col gap-6 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#0d4a28] group-hover:to-[#1a6b3c] group-hover:border-transparent transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-[#1a6b3c]/30 group-hover:scale-110">
                            <service.icon className="w-8 h-8 text-[#0d4a28] group-hover:text-white transition-colors duration-500" />
                          </div>
                          <h3 className="text-2xl font-extrabold text-[#0d4a28] group-hover:text-[#1a6b3c] transition-colors duration-300 leading-snug">{service.title}</h3>
                        </div>
                        
                        {/* Description */}
                        <p className="text-base text-gray-600 leading-relaxed mb-8 flex-grow font-medium">{service.description}</p>
                        
                        {/* Features List */}
                        <ul className="space-y-4 mb-10">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-sm text-gray-600 font-semibold group-hover:text-gray-800 transition-colors duration-300">
                              <div className="w-6 h-6 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#c8a415]/20 transition-colors">
                                <CircleDot className="w-3.5 h-3.5 text-[#1a6b3c] group-hover:text-[#c8a415]" />
                              </div>
                              {f}
                            </li>
                          ))}
                        </ul>
                        
                        {/* Footer Action */}
                        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#c8a415]" />
                            Official Service
                          </span>
                          
                          <div className="flex items-center gap-2 text-white text-xs font-bold px-4 py-2 rounded-full bg-[#0d4a28] shadow-md group-hover:bg-[#c8a415] group-hover:scale-105 transition-all duration-300">
                            <span>{isAm ? 'ይጠቀሙ' : 'ACCESS'}</span>
                            <ArrowRight className="w-4 h-4" />
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
      <section className="bg-[#0d4a28] py-10 px-4 relative overflow-hidden text-white">
        {/* Abstract Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="#ffffff" /></svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-20">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-3 block">Simple Process</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">{isAm ? 'እንዴት እንደሚሰራ' : 'HOW IT WORKS'}</h2>
              <div className="w-24 h-1 bg-[#c8a415] mx-auto rounded-full" />
              <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">{isAm ? 'የከተማ አገልግሎቶችን ማግኘት ቀላልና ቀጥተኛ ነው' : 'Accessing city services is simple, straightforward, and fully digitized for your convenience.'}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/4 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-[#c8a415]/50 to-transparent -translate-y-1/2 z-0" />

              {steps.map((step) => (
                <motion.div key={step.num} variants={fadeInUp} className="relative z-10 text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#c8a415] to-[#a88810] text-white flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-[#0d4a28] transform hover:scale-110 transition-transform duration-300 group">
                    <step.icon className="w-10 h-10 group-hover:animate-bounce" />
                  </div>
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/20 transition-colors duration-300 text-center">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{isAm ? step.titleAm : step.title}</h3>
                      <p className="text-gray-300 text-lg leading-relaxed">{isAm ? step.descAm : step.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

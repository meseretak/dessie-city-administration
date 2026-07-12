'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PageId } from '@/lib/types'
import {
  Baby, FileCheck, Building, MapPin, Receipt, Heart, Stethoscope, GraduationCap,
  Bus, Droplets, MessageSquareWarning, CalendarDays, Search, ChevronRight,
  ArrowRight, CircleDot, FileText, ClipboardList, Shield
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
}

interface ServicesPageProps {
  navigateTo: (page: PageId, extra?: { serviceId?: string; vacancyId?: string; newsId?: string; bidId?: string }) => void
}

const services = [
  {
    title: 'Birth Registration',
    icon: Baby,
    description: 'Register births within 30 days and obtain official birth certificates. The service is available at all kebele offices and online.',
    features: ['Online registration available', 'Certificate issued within 3 days', 'Free for all citizens']
  },
  {
    title: 'Business License',
    icon: FileCheck,
    description: 'Apply for new business licenses or renew existing ones. All types of businesses supported including trade, manufacturing, and services.',
    features: ['New & renewal applications', 'All business types supported', 'Digital tracking system']
  },
  {
    title: 'Building Permit',
    icon: Building,
    description: 'Submit building permit applications for residential, commercial, and industrial construction. Track your application status online.',
    features: ['Online application tracking', 'Residential & commercial permits', 'Inspection scheduling']
  },
  {
    title: 'Land Services',
    icon: MapPin,
    description: 'Access land registration, cadastral survey, title deed issuance, and land transfer services.',
    features: ['Cadastral survey services', 'Title deed issuance', 'Land transfer processing']
  },
  {
    title: 'Tax Payment',
    icon: Receipt,
    description: 'Pay property taxes, business taxes, and municipal fees online or at designated payment centers.',
    features: ['Online & offline payment', 'Multiple payment methods', 'Instant receipt download']
  },
  {
    title: 'Marriage Registration',
    icon: Heart,
    description: 'Register marriages and obtain official marriage certificates. Both civil and religious marriages supported.',
    features: ['Civil & religious marriages', 'Certificate in 5 days', 'Online appointment booking']
  },
  {
    title: 'Health Services',
    icon: Stethoscope,
    description: 'Find hospitals, health centers, clinics, and pharmacies. Access health information and emergency services.',
    features: ['Facility directory & map', 'Emergency contact info', 'Health campaign schedules']
  },
  {
    title: 'Education',
    icon: GraduationCap,
    description: 'Information about schools, colleges, TVET institutions, and universities in Dessie.',
    features: ['School enrollment info', 'Scholarship listings', 'TVET program directory']
  },
  {
    title: 'Transportation',
    icon: Bus,
    description: 'Public transport routes, schedules, taxi services, and traffic information for navigating Dessie.',
    features: ['Route maps & schedules', 'Real-time traffic updates', 'Taxi fare information']
  },
  {
    title: 'Water & Electricity',
    icon: Droplets,
    description: 'New connections, billing inquiries, service interruptions, and payment services for utilities.',
    features: ['New connection requests', 'Billing & payment', 'Outage reporting']
  },
  {
    title: 'Complaints & Feedback',
    icon: MessageSquareWarning,
    description: 'Submit service complaints, suggestions, and feedback. Track resolution status online.',
    features: ['Online submission form', 'Real-time status tracking', 'Anonymous option available']
  },
  {
    title: 'Appointments',
    icon: CalendarDays,
    description: 'Book appointments with city offices, departments, and officials for in-person visits.',
    features: ['Choose date & time', 'Department selection', 'Email confirmation']
  },
]

const steps = [
  { num: 1, title: 'Select Service', desc: 'Browse our comprehensive list of municipal services and choose what you need.', icon: ClipboardList },
  { num: 2, title: 'Fill Application', desc: 'Complete the required forms with your information and upload necessary documents.', icon: FileText },
  { num: 3, title: 'Receive Confirmation', desc: 'Get instant confirmation and track your application status online in real time.', icon: Shield },
]

export default function ServicesPage({ navigateTo }: ServicesPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

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
          <p className="text-[#c8a415] text-sm tracking-[0.2em] font-semibold mb-3 uppercase">Municipal Services</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-4">CITIZEN SERVICES</h1>
          <Separator className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">Home / Services</p>
          <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">All government services available online and at city offices</p>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-8 px-4 -mt-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search services... (e.g., birth registration, tax, license)"
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
                <h3 className="text-lg font-semibold text-muted-foreground">No services found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <motion.div key={service.title} variants={fadeInUp}>
                    <Card className="gov-service-card h-full border-0 shadow-md flex flex-col cursor-pointer group" onClick={() => navigateTo('service-detail', { serviceId: service.title })}>
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="w-14 h-14 rounded-full bg-[#1a6b3c] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                          <service.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0d4a28] mb-3">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">{service.description}</p>
                        <ul className="space-y-2 mb-5">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CircleDot className="w-3.5 h-3.5 text-[#1a6b3c] mt-0.5 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant="ghost"
                          className="text-[#1a6b3c] font-semibold text-sm p-0 h-auto hover:text-[#0d4a28] justify-start group-hover:gap-2 transition-all"
                          onClick={(e) => { e.stopPropagation(); navigateTo('service-detail', { serviceId: service.title }) }}
                        >
                          ACCESS SERVICE <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
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
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">HOW IT WORKS</h2>
              <p className="text-muted-foreground mt-4">Accessing city services is simple and straightforward</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <motion.div key={step.num} variants={fadeInUp} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a6b3c] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-[#0d4a28] mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
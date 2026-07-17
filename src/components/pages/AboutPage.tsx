'use client'

import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/lib/LangContext'
import {
  Users, Mountain, MapPin, Building2, Calendar, Globe, Languages, CloudSun,
  Eye, Target, Heart, Shield, Lightbulb, Scale, Handshake,
  Flag, Landmark, Clock, Cpu, Monitor, TrendingUp, Banknote, Briefcase, BarChart3,
  Thermometer, Droplets, Sun, Compass, ChevronRight, History, Award, BookOpen,
  Sprout, Users2, Building, TreePine, Leaf
} from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

function AnimatedStat({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000 
      const steps = 60
      const increment = value / steps
      const stepTime = Math.abs(Math.floor(duration / steps))
      
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, stepTime)
      
      return () => clearInterval(timer)
    }
  }, [value, isInView])
  
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function AboutPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'

  const keyFacts = [
    { icon: Users, label: isAm ? 'ህዝብ' : 'Population', val: 450000, suffix: '+', color: '#1a6b3c' },
    { icon: Mountain, label: isAm ? 'ከፍታ' : 'Elevation', val: 2470, suffix: 'm', color: '#c8a415' },
    { icon: MapPin, label: isAm ? 'ስፋት' : 'Area', val: 25, suffix: '.4 km²', color: '#1a6b3c' },
    { icon: Building2, label: isAm ? 'ቀበሌዎች' : 'Kebeles', val: 12, suffix: '', color: '#c8a415' },
  ]

  const otherFacts = [
    { icon: Clock, label: isAm ? 'የተመሰረተበት' : 'Founded', value: isAm ? 'የ19ኛው ክ/ዘ መገባደጃ' : 'Late 19th Century', color: '#1a6b3c' },
    { icon: Globe, label: isAm ? 'ክልል' : 'Region', value: isAm ? 'አማራ' : 'Amhara', color: '#c8a415' },
    { icon: Languages, label: isAm ? 'ቋንቋ' : 'Language', value: isAm ? 'አማርኛ' : 'Amharic', color: '#1a6b3c' },
    { icon: CloudSun, label: isAm ? 'የአየር ፀባይ' : 'Climate', value: isAm ? 'ሞቃታማ ደጋ' : 'Subtropical Highland', color: '#c8a415' },
  ]

  const coreValues = [
    { label: isAm ? 'ግልጽነት' : 'Transparency', icon: Eye },
    { label: isAm ? 'ተጠያቂነት' : 'Accountability', icon: Shield },
    { label: isAm ? 'ዜጋ ቅድሚያ' : 'Citizen First', icon: Heart },
    { label: isAm ? 'ፈጠራ' : 'Innovation', icon: Lightbulb },
    { label: isAm ? 'ታማኝነት' : 'Integrity', icon: Scale },
    { label: isAm ? 'አካታችነት' : 'Inclusiveness', icon: Handshake },
  ]

  const timeline = [
    { year: '1882', desc: 'Founded as a garrison town by Emperor Yohannes IV, serving as a strategic military outpost along the trade routes between the Ethiopian highlands.' },
    { year: '1941', desc: 'Became a major administrative center following the liberation of Ethiopia, establishing municipal governance structures.' },
    { year: '1991', desc: 'Established as an official city administration under the new federal system, gaining greater autonomy in local governance.' },
    { year: '2010', desc: 'Population exceeded 200,000, triggering expanded urban planning initiatives and infrastructure development programs.' },
    { year: '2018', desc: 'Smart city initiative launched, introducing digital governance, e-services, and technology-driven urban management.' },
    { year: '2025', desc: 'Digital citizen portal launched, providing comprehensive online access to all municipal services and information.' },
  ]

  const economyStats = [
    { icon: Banknote, val: 2, prefix: 'ETB ', suffix: '.8B', label: 'Annual Budget', color: '#1a6b3c' },
    { icon: Briefcase, val: 15000, prefix: '', suffix: '+', label: 'Registered Businesses', color: '#c8a415' },
    { icon: BarChart3, val: 85, prefix: '', suffix: '%', label: 'Employment Rate', color: '#1a6b3c' },
  ]

  const climateData = [
    { icon: Thermometer, label: 'Avg Temperature', value: '16°C' },
    { icon: Droplets, label: 'Rainy Season', value: 'Jun — Sep' },
    { icon: Sun, label: 'Dry Season', value: 'Oct — May' },
    { icon: TreePine, label: 'Altitude', value: '2,470m' },
  ]

  return (
    <main className="bg-gray-50/50">
      {/* Page Banner */}
      <section className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-1/4 w-32 h-32 rounded-full border border-white/20 animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute bottom-8 right-1/3 w-48 h-48 rounded-full border border-white/20 animate-pulse" />
          <div className="absolute top-8 right-16 w-20 h-20 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20">
            <Globe className="w-4 h-4 text-[#c8a415]" />
            <p className="text-[#c8a415] text-sm tracking-widest font-semibold uppercase">{isAm ? 'ከተማችንን ያውቁ' : 'Discover Our City'}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wide mb-6 drop-shadow-lg">{isAm ? 'ስለ ደሴ ከተማ' : 'ABOUT DESSIE CITY'}</h1>
          <Separator className="w-24 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1 mb-6 border-0" />
          <p className="text-white/80 text-sm tracking-widest uppercase font-medium">Home / About</p>
        </motion.div>
      </section>

      {/* City Profile */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1a6b3c]/5 to-[#c8a415]/5 rounded-3xl -z-10 blur-xl"></div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] mb-6 flex items-center gap-3">
                <Landmark className="w-8 h-8 text-[#c8a415]" />
                CITY PROFILE
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                Dessie is a vibrant and strategically located city in the Amhara Region of Ethiopia, situated along the vital Addis Ababa–Debre Markos corridor. At an elevation of 2,470 meters above sea level, the city enjoys a pleasant subtropical highland climate that has made it a favored destination for trade, education, and administration.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in the late 19th century as a garrison town, Dessie has grown into one of Ethiopia&apos;s most important commercial and educational centers. The city serves as a gateway between the northern and central regions of the country, making it a hub for transportation, commerce, and cultural exchange.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-[#c8a415] pl-4 italic bg-white/50 py-2 rounded-r-lg">
                Today, Dessie is home to over 450,000 residents and continues to experience rapid urbanization. The city administration is committed to transforming Dessie into a model smart city, leveraging technology to improve governance, service delivery, and quality of life for all citizens.
              </p>
            </div>
            <motion.div variants={fadeInUp} className="order-1 md:order-2 relative group rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
              <div className="absolute inset-0 bg-[#0d4a28]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image src="/dessie-city-hall.png" alt="Dessie City Hall" width={600} height={450} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d4a28]/90 via-[#0d4a28]/50 to-transparent p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-[#c8a415] rounded-full">
                    <Flag className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl tracking-wide shadow-black">Dessie City Administration</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Key Facts */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-2 block">By The Numbers</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">STATISTICAL OVERVIEW</h2>
              <div className="w-24 h-1 bg-[#1a6b3c] mx-auto mt-4 rounded-full" />
            </div>

            {/* Numerical Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {keyFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp}>
                  <Card className="bg-white/80 backdrop-blur-sm border-white shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c8a415]/10 to-[#1a6b3c]/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-[#c8a415]/20 transition-colors" />
                    <CardContent className="p-8 flex flex-col items-center text-center gap-3 relative z-10">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white to-gray-100 shadow-inner border border-gray-100">
                        <fact.icon className="w-8 h-8 drop-shadow-sm" style={{ color: fact.color }} />
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] drop-shadow-sm my-2">
                        <AnimatedStat value={fact.val} suffix={fact.suffix} />
                      </div>
                      <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">{fact.label}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Other Text Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {otherFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp}>
                  <Card className="bg-white/50 backdrop-blur-sm border-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${fact.color}10` }}>
                        <fact.icon className="w-5 h-5" style={{ color: fact.color }} />
                      </div>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{fact.label}</span>
                      <span className="text-md font-semibold text-gray-800">{fact.value}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="bg-[#0d4a28] py-24 px-4 text-white relative overflow-hidden">
        {/* Abstract Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="#ffffff" /></svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-2 block">Our Ideology</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">THE CITY'S FOUNDATION</h2>
              <div className="w-24 h-1 bg-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/20 transition-colors duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c8a415] to-[#a88810] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Vision</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      To make Dessie a model smart city in Ethiopia, known for good governance, sustainable development, and an unparalleled quality of life for all its residents.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/20 transition-colors duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a6b3c] to-[#114a29] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Mission</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Provide efficient, transparent, and citizen-centered municipal services while actively promoting local economic growth, social equity, and cultural preservation.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/20 transition-colors duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-8 h-8 text-[#0d4a28]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Core Values</h3>
                    <div className="space-y-4">
                      {coreValues.map((v) => (
                        <div key={v.label} className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/5 hover:bg-black/40 transition-colors">
                          <v.icon className="w-5 h-5 text-[#c8a415] flex-shrink-0" />
                          <span className="text-md font-semibold text-white tracking-wide">{v.label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-gray-50 py-24 px-4 overflow-hidden relative">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#c8a415]/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-[#1a6b3c]/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#1a6b3c] font-bold tracking-widest uppercase text-sm mb-2 block">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">HISTORICAL MILESTONES</h2>
              <div className="w-24 h-1 bg-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1a6b3c]/50 via-[#c8a415]/50 to-[#1a6b3c]/5 transform md:-translate-x-1/2 rounded-full" />
              
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} variants={fadeInUp} className={`relative flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content Box */}
                    <div className={`w-full ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <Card className="border-0 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                        <div className={`absolute top-0 ${i % 2 === 0 ? 'right-0' : 'left-0'} w-2 h-full bg-[#c8a415]`} />
                        <CardContent className="p-6 md:p-8">
                          <span className="inline-block md:hidden text-2xl font-black text-[#1a6b3c] mb-2">{item.year}</span>
                          <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#1a6b3c] shadow-lg transform -translate-x-1/2 z-10 flex items-center justify-center group">
                      <span className="hidden md:block text-[#1a6b3c] font-black text-sm absolute -top-8 w-20 text-center -ml-4">{item.year}</span>
                      <History className="w-5 h-5 text-[#c8a415]" />
                    </div>

                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Economy */}
      <section className="bg-white py-24 px-4 border-t border-gray-100 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-2 block">Growth & Prosperity</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">ECONOMY & COMMERCE</h2>
              <div className="w-24 h-1 bg-[#1a6b3c] mx-auto mt-4 rounded-full" />
            </div>
            
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg text-center max-w-4xl mx-auto mb-16 leading-relaxed font-medium">
              Dessie&apos;s economy is diverse and rapidly growing, driven by trade, agriculture, manufacturing, and services. As a major commercial crossroads, the city connects producers from the surrounding highlands with markets across Ethiopia. The city&apos;s strategic location on the Addis–Debre Markos corridor has attracted significant investment in retail, hospitality, and light industry.
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {economyStats.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <Card className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                      <stat.icon className="w-48 h-48" />
                    </div>
                    <CardContent className="p-10 text-center relative z-10">
                      <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-white shadow-md border border-gray-100 group-hover:border-[#c8a415] transition-colors">
                        <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] drop-shadow-sm mb-3">
                         <AnimatedStat value={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <div className="text-md text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
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
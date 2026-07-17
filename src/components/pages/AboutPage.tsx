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
  Sprout, Users2, Building, TreePine, Leaf, Sparkles, Navigation, CheckCircle2
} from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
    { icon: Clock, label: isAm ? 'የተመሰረተበት' : 'Founded', value: isAm ? 'የ19ኛው ክ/ዘ' : 'Late 19th C.', color: '#0d4a28' },
    { icon: Globe, label: isAm ? 'ክልል' : 'Region', value: isAm ? 'አማራ' : 'Amhara', color: '#1a6b3c' },
    { icon: Languages, label: isAm ? 'ቋንቋ' : 'Language', value: isAm ? 'አማርኛ' : 'Amharic', color: '#c8a415' },
    { icon: CloudSun, label: isAm ? 'የአየር ፀባይ' : 'Climate', value: isAm ? 'ሞቃታማ ደጋ' : 'Subtropical', color: '#0d4a28' },
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

  return (
    <main className="bg-gray-50/50">
      {/* Page Banner */}
      <section className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] py-32 text-center relative overflow-hidden">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full border-[40px] border-white/5 border-dashed" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full border-[30px] border-[#c8a415]/10 border-dashed" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-white/20 animate-[ping_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full border-2 border-[#c8a415]/20 animate-pulse" />
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-xl mb-8 border border-white/30 shadow-2xl">
            <Sparkles className="w-5 h-5 text-[#c8a415] animate-pulse" />
            <p className="text-[#c8a415] text-sm tracking-widest font-bold uppercase">{isAm ? 'ከተማችንን ያውቁ' : 'Discover Our Heritage'}</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">{isAm ? 'ስለ ደሴ ከተማ' : 'ABOUT DESSIE CITY'}</h1>
          <Separator className="w-32 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1.5 mb-8 border-0 rounded-full" />
          <p className="text-white/80 text-sm tracking-widest uppercase font-bold bg-black/20 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm">Home / About</p>
        </motion.div>
      </section>

      {/* City Profile - Elevated Design */}
      <section className="py-24 px-4 relative z-20 -mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-10 bg-gradient-to-br from-[#1a6b3c]/10 to-[#c8a415]/10 rounded-full -z-10 blur-3xl opacity-70"></div>
              
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-[#c8a415]/10 mb-6">
                <Landmark className="w-6 h-6 text-[#c8a415]" />
                <span className="text-[#c8a415] font-black tracking-widest uppercase text-sm">City Profile</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                The Heart of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c]">Amhara Highlands</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] flex items-center justify-center shrink-0 shadow-lg text-white">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    Dessie is a vibrant and strategically located city in the Amhara Region of Ethiopia, situated along the vital Addis Ababa–Debre Markos corridor.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8a415] to-[#a88810] flex items-center justify-center shrink-0 shadow-lg text-white">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    At an elevation of 2,470 meters, the city enjoys a pleasant subtropical highland climate that has made it a favored destination for trade, education, and administration.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0 shadow-lg text-white">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    Today, Dessie is home to over 450,000 residents and continues to experience rapid urbanization. The city administration is committed to transforming Dessie into a model smart city.
                  </p>
                </div>
              </div>
            </div>
            
            <motion.div variants={fadeInUp} className="order-1 lg:order-2 relative group rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-white/50 backdrop-blur-xl bg-white/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0d4a28]/40 to-transparent group-hover:from-transparent transition-all duration-700 z-10" />
              <Image src="/dessie-city-hall.png" alt="Dessie City Hall" width={800} height={600} className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out" />
              <div className="absolute inset-0 border-4 border-white/20 rounded-[2.5rem] z-30 pointer-events-none" />
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 z-30 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 transform group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
                <Award className="w-6 h-6 text-[#c8a415]" />
                <span className="font-extrabold text-[#0d4a28]">Established 1882</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d4a28] via-[#0d4a28]/80 to-transparent p-10 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4 text-white">
                  <div className="p-3 bg-gradient-to-br from-[#c8a415] to-[#a88810] rounded-xl shadow-lg shadow-[#c8a415]/30">
                    <Flag className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="block font-black text-2xl tracking-wide">Dessie City Administration</span>
                    <span className="text-[#c8a415] font-semibold text-sm">Official Headquarters</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Key Facts */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-4 relative">
        {/* Background Graphic */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#c8a415]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-20">
              <span className="text-[#c8a415] font-black tracking-widest uppercase text-sm mb-3 block">By The Numbers</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d4a28]">STATISTICAL OVERVIEW</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-6 rounded-full" />
            </div>

            {/* Numerical Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {keyFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp} whileHover={{ y: -10 }} className="h-full">
                  <Card className="h-full bg-white border border-gray-100 shadow-xl hover:shadow-2xl hover:border-[#1a6b3c]/20 transition-all duration-300 relative overflow-hidden group rounded-3xl">
                    <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl transition-colors duration-500 opacity-20 group-hover:opacity-40" style={{ backgroundColor: fact.color }} />
                    <CardContent className="p-8 flex flex-col items-center text-center gap-4 relative z-10">
                      <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center bg-gray-50 border-2 border-gray-100 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:border-transparent" style={{ color: fact.color }}>
                        <fact.icon className="w-10 h-10 group-hover:animate-bounce" style={{ color: fact.color }} />
                      </div>
                      <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] drop-shadow-sm mt-2">
                        <AnimatedStat value={fact.val} suffix={fact.suffix} />
                      </div>
                      <span className="text-sm text-gray-500 font-extrabold uppercase tracking-widest">{fact.label}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Other Text Facts */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {otherFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-100 shadow-md hover:shadow-xl transition-all rounded-2xl group">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-white shadow-md border border-gray-100 group-hover:rotate-12 transition-transform duration-300">
                        <fact.icon className="w-7 h-7" style={{ color: fact.color }} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{fact.label}</span>
                        <span className="text-lg font-black text-gray-800 leading-none">{fact.value}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission - Clean UI */}
      <section className="bg-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-20">
              <span className="text-[#c8a415] font-black tracking-widest uppercase text-sm mb-3 block">Our Ideology</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d4a28]">THE CITY'S FOUNDATION</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-6 rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 shadow-2xl hover:shadow-[0_20px_50px_rgba(200,164,21,0.15)] hover:-translate-y-2 transition-all duration-500 rounded-3xl overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#c8a415] to-[#e8c435]" />
                  <CardContent className="p-12 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                      <Eye className="w-64 h-64" />
                    </div>
                    <div className="w-24 h-24 mx-auto rounded-[2rem] bg-gradient-to-br from-[#c8a415] to-[#a88810] flex items-center justify-center mb-8 shadow-xl shadow-[#c8a415]/30 group-hover:scale-110 transition-transform duration-500">
                      <Eye className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#0d4a28] mb-6 tracking-wide">Our Vision</h3>
                    <p className="text-gray-600 leading-relaxed text-xl font-medium relative z-10">
                      To make Dessie a model smart city in Ethiopia, known for good governance, sustainable development, and an unparalleled quality of life for all its residents.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 shadow-2xl hover:shadow-[0_20px_50px_rgba(26,107,60,0.15)] hover:-translate-y-2 transition-all duration-500 rounded-3xl overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c]" />
                  <CardContent className="p-12 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                      <Target className="w-64 h-64" />
                    </div>
                    <div className="w-24 h-24 mx-auto rounded-[2rem] bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] flex items-center justify-center mb-8 shadow-xl shadow-[#1a6b3c]/30 group-hover:scale-110 transition-transform duration-500">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#0d4a28] mb-6 tracking-wide">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed text-xl font-medium relative z-10">
                      Provide efficient, transparent, and citizen-centered municipal services while actively promoting local economic growth, social equity, and cultural preservation.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-32 px-4 overflow-hidden relative">
        <div className="absolute left-0 top-1/4 w-[800px] h-[800px] bg-[#1a6b3c]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-24">
              <span className="text-[#1a6b3c] font-black tracking-widest uppercase text-sm mb-3 block">Our Journey</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d4a28]">HISTORICAL MILESTONES</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-6 rounded-full" />
            </div>
            
            <div className="relative">
              {/* Glowing Center Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1.5 md:-translate-x-1/2 rounded-full overflow-hidden bg-gray-200">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  transition={{ duration: 3, ease: "linear" }}
                  viewport={{ once: true }}
                  className="w-full bg-gradient-to-b from-[#1a6b3c] via-[#c8a415] to-[#1a6b3c]"
                />
              </div>
              
              <div className="space-y-16">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} variants={fadeInUp} className={`relative flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content Box */}
                    <div className={`w-full ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                      <Card className="border-0 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group rounded-2xl">
                        <div className={`absolute top-0 ${i % 2 === 0 ? 'right-0' : 'left-0'} w-3 h-full bg-gradient-to-b from-[#1a6b3c] to-[#c8a415]`} />
                        <CardContent className="p-8 md:p-10">
                          <span className="inline-block text-3xl font-black text-[#1a6b3c] mb-4 bg-[#1a6b3c]/10 px-4 py-1.5 rounded-xl">{item.year}</span>
                          <p className="text-gray-600 text-lg leading-relaxed font-medium">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 w-14 h-14 rounded-full bg-white border-[5px] border-[#1a6b3c] shadow-[0_0_20px_rgba(26,107,60,0.3)] transform -translate-x-1/2 z-10 flex items-center justify-center group hover:scale-125 transition-transform duration-300 hover:border-[#c8a415]">
                      <History className="w-6 h-6 text-[#1a6b3c] group-hover:text-[#c8a415] transition-colors" />
                    </div>

                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Economy */}
      <section className="bg-gradient-to-tr from-[#0d4a28] to-[#1a6b3c] py-32 px-4 relative overflow-hidden text-white">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-20">
              <span className="text-[#c8a415] font-black tracking-widest uppercase text-sm mb-3 block drop-shadow-md">Growth & Prosperity</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">ECONOMY & COMMERCE</h2>
              <div className="w-32 h-1.5 bg-[#c8a415] mx-auto mt-6 rounded-full" />
            </div>
            
            <motion.p variants={fadeInUp} className="text-white/90 text-xl text-center max-w-4xl mx-auto mb-20 leading-relaxed font-medium drop-shadow-sm">
              Dessie&apos;s economy is diverse and rapidly growing, driven by trade, agriculture, manufacturing, and services. As a major commercial crossroads, the city connects producers from the surrounding highlands with markets across Ethiopia. The city&apos;s strategic location on the Addis–Debre Markos corridor has attracted significant investment in retail, hospitality, and light industry.
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-10">
              {economyStats.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeInUp} whileHover={{ y: -15 }}>
                  <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden group rounded-3xl h-full">
                    <CardContent className="p-12 text-center relative z-10">
                      <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center bg-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] group-hover:rotate-12 transition-transform duration-500">
                        <stat.icon className="w-12 h-12" style={{ color: stat.color }} />
                      </div>
                      <div className="text-5xl font-black text-white drop-shadow-lg mb-4 tracking-tight">
                         <AnimatedStat value={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <div className="text-lg text-[#c8a415] font-black uppercase tracking-widest">{stat.label}</div>
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
'use client'

import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/lib/LangContext'
import {
  Users, Mountain, MapPin, Building2, Globe, Languages, CloudSun,
  Eye, Target, History, Flag, Landmark, Clock, Banknote, Briefcase, BarChart3,
  TreePine, Users2, Sparkles, Navigation, Award
} from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
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
    { icon: Clock, label: isAm ? 'የተመሰረተበት' : 'Founded', value: isAm ? 'የ19ኛው ክ/ዘ' : 'Late 19th C.', color: '#0d4a28' },
    { icon: Globe, label: isAm ? 'ክልል' : 'Region', value: isAm ? 'አማራ' : 'Amhara', color: '#1a6b3c' },
    { icon: Languages, label: isAm ? 'ቋንቋ' : 'Language', value: isAm ? 'አማርኛ' : 'Amharic', color: '#c8a415' },
    { icon: CloudSun, label: isAm ? 'የአየር ፀባይ' : 'Climate', value: isAm ? 'ሞቃታማ ደጋ' : 'Subtropical', color: '#0d4a28' },
  ]

  const timeline = [
    { year: '1882', desc: 'Founded as a garrison town by Emperor Yohannes IV, serving as a strategic military outpost.' },
    { year: '1941', desc: 'Became a major administrative center following the liberation of Ethiopia, establishing municipal governance.' },
    { year: '1991', desc: 'Established as an official city administration under the new federal system, gaining greater autonomy.' },
    { year: '2010', desc: 'Population exceeded 200,000, triggering expanded urban planning initiatives.' },
    { year: '2018', desc: 'Smart city initiative launched, introducing digital governance and e-services.' },
    { year: '2025', desc: 'Digital citizen portal launched, providing comprehensive online access to all municipal services.' },
  ]

  const economyStats = [
    { icon: Banknote, val: 2, prefix: 'ETB ', suffix: '.8B', label: 'Annual Budget', color: '#1a6b3c' },
    { icon: Briefcase, val: 15000, prefix: '', suffix: '+', label: 'Registered Businesses', color: '#c8a415' },
    { icon: BarChart3, val: 85, prefix: '', suffix: '%', label: 'Employment Rate', color: '#1a6b3c' },
  ]

  return (
    <main className="bg-gray-50/50">
      {/* Page Banner */}
      <section className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] py-20 text-center relative overflow-hidden">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full border-[20px] border-white/5 border-dashed" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full border-[15px] border-[#c8a415]/10 border-dashed" />
          <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border-2 border-white/20 animate-[ping_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full border-2 border-[#c8a415]/20 animate-pulse" />
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#c8a415] animate-pulse" />
            <p className="text-[#c8a415] text-xs tracking-widest font-bold uppercase">{isAm ? 'ከተማችንን ያውቁ' : 'Discover Our Heritage'}</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">{isAm ? 'ስለ ደሴ ከተማ' : 'ABOUT DESSIE CITY'}</h1>
          <Separator className="w-20 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1 mb-4 border-0 rounded-full" />
          <p className="text-white/80 text-xs tracking-widest uppercase font-bold bg-black/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Home / About</p>
        </motion.div>
      </section>

      {/* City Profile - Elevated Design */}
      <section className="py-16 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid lg:grid-cols-2 gap-10 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-10 bg-gradient-to-br from-[#1a6b3c]/5 to-[#c8a415]/5 rounded-full -z-10 blur-2xl opacity-70"></div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#c8a415]/10 mb-4">
                <Landmark className="w-5 h-5 text-[#c8a415]" />
                <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs">City Profile</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                The Heart of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c]">Amhara Highlands</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] flex items-center justify-center shrink-0 shadow-md text-white">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Dessie is a vibrant and strategically located city in the Amhara Region of Ethiopia, situated along the vital Addis Ababa–Debre Markos corridor.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-gradient-to-br from-[#c8a415] to-[#a88810] flex items-center justify-center shrink-0 shadow-md text-white">
                    <TreePine className="w-4 h-4" />
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    At an elevation of 2,470 meters, the city enjoys a pleasant subtropical highland climate that has made it a favored destination for trade, education, and administration.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0 shadow-md text-white">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Today, Dessie is home to over 450,000 residents and continues to experience rapid urbanization. The city administration is committed to transforming Dessie into a model smart city.
                  </p>
                </div>
              </div>
            </div>
            
            <motion.div variants={fadeInUp} className="order-1 lg:order-2 relative group rounded-3xl overflow-hidden shadow-xl ring-4 ring-white/50 bg-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0d4a28]/20 to-transparent group-hover:from-transparent transition-all duration-500 z-10" />
              <Image src="/dessie-city-hall.png" alt="Dessie City Hall" width={600} height={400} className="w-full h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 border-2 border-white/20 rounded-3xl z-30 pointer-events-none" />
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 z-30 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 transform group-hover:-translate-y-1 transition-all duration-300">
                <Award className="w-4 h-4 text-[#c8a415]" />
                <span className="font-bold text-sm text-[#0d4a28]">Est. 1882</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d4a28] via-[#0d4a28]/80 to-transparent p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-gradient-to-br from-[#c8a415] to-[#a88810] rounded-lg shadow-md">
                    <Flag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block font-bold text-lg tracking-wide shadow-sm">Dessie City Administration</span>
                    <span className="text-[#c8a415] font-medium text-xs">Official Headquarters</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Key Facts */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 relative">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#c8a415]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">By The Numbers</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">STATISTICAL OVERVIEW</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>

            {/* Numerical Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {keyFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-gray-200 transition-all duration-300 relative overflow-hidden group rounded-2xl">
                    <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl transition-colors duration-500 opacity-10 group-hover:opacity-20" style={{ backgroundColor: fact.color }} />
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3 relative z-10">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gray-50 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300" style={{ color: fact.color }}>
                        <fact.icon className="w-7 h-7" style={{ color: fact.color }} />
                      </div>
                      <div className="text-3xl font-black text-gray-800 drop-shadow-sm mt-1">
                        <AnimatedStat value={fact.val} suffix={fact.suffix} />
                      </div>
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{fact.label}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Other Text Facts */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {otherFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
                  <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl group">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-50 shadow-sm border border-gray-100 group-hover:rotate-6 transition-transform duration-300">
                        <fact.icon className="w-5 h-5" style={{ color: fact.color }} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{fact.label}</span>
                        <span className="text-sm font-bold text-gray-800 leading-none">{fact.value}</span>
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
      <section className="bg-white py-16 px-4 relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Our Ideology</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">THE CITY'S FOUNDATION</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#c8a415] to-[#e8c435]" />
                  <CardContent className="p-8 text-center relative">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#c8a415] to-[#a88810] flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0d4a28] mb-3 tracking-wide">Our Vision</h3>
                    <p className="text-gray-600 leading-relaxed text-sm relative z-10">
                      To make Dessie a model smart city in Ethiopia, known for good governance, sustainable development, and an unparalleled quality of life for all its residents.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c]" />
                  <CardContent className="p-8 text-center relative">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0d4a28] mb-3 tracking-wide">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed text-sm relative z-10">
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
      <section className="bg-gray-50 py-20 px-4 overflow-hidden relative">
        <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-[#1a6b3c]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#1a6b3c] font-bold tracking-widest uppercase text-xs mb-2 block">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">HISTORICAL MILESTONES</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="relative">
              {/* Glowing Center Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 rounded-full overflow-hidden bg-gray-200">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  transition={{ duration: 2, ease: "linear" }}
                  viewport={{ once: true }}
                  className="w-full bg-gradient-to-b from-[#1a6b3c] via-[#c8a415] to-[#1a6b3c]"
                />
              </div>
              
              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} variants={fadeInUp} className={`relative flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content Box */}
                    <div className={`w-full ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <Card className="border-0 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group rounded-xl bg-white">
                        <div className={`absolute top-0 ${i % 2 === 0 ? 'right-0' : 'left-0'} w-1.5 h-full bg-gradient-to-b from-[#1a6b3c] to-[#c8a415]`} />
                        <CardContent className="p-6">
                          <span className="inline-block text-xl font-bold text-[#1a6b3c] mb-2">{item.year}</span>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-[#1a6b3c] shadow-md transform -translate-x-1/2 z-10 flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                      <History className="w-4 h-4 text-[#1a6b3c] group-hover:text-[#c8a415] transition-colors" />
                    </div>

                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Economy */}
      <section className="bg-gradient-to-tr from-[#0d4a28] to-[#1a6b3c] py-20 px-4 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block drop-shadow-md">Growth & Prosperity</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">ECONOMY & COMMERCE</h2>
              <div className="w-24 h-1 bg-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>
            
            <motion.p variants={fadeInUp} className="text-white/90 text-sm md:text-base text-center max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-sm">
              Dessie&apos;s economy is diverse and rapidly growing, driven by trade, agriculture, manufacturing, and services. As a major commercial crossroads, the city connects producers from the surrounding highlands with markets across Ethiopia.
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {economyStats.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden group rounded-2xl h-full">
                    <CardContent className="p-8 text-center relative z-10">
                      <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-white shadow-md group-hover:rotate-6 transition-transform duration-300">
                        <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                      </div>
                      <div className="text-3xl font-black text-white drop-shadow-md mb-2">
                         <AnimatedStat value={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-[#c8a415] font-bold uppercase tracking-widest">{stat.label}</div>
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
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
      <section className="bg-white py-16 text-center relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0d4a28 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a6b3c]/5 mb-4 border border-[#1a6b3c]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#c8a415]" />
            <p className="text-[#1a6b3c] text-[10px] tracking-widest font-bold uppercase">{isAm ? 'ከተማችንን ያውቁ' : 'Discover Our Heritage'}</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28] tracking-tight mb-4">{isAm ? 'ስለ ደሴ ከተማ' : 'ABOUT DESSIE CITY'}</h1>
          <Separator className="w-16 mx-auto bg-[#c8a415] h-1 mb-4 rounded-full" />
          <p className="text-gray-500 text-[10px] tracking-widest uppercase font-semibold">Home / About</p>
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
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5 w-6 h-6 rounded-md bg-[#1a6b3c]/10 flex items-center justify-center shrink-0 text-[#1a6b3c]">
                    <Navigation className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Dessie is a vibrant and strategically located city in the Amhara Region of Ethiopia, situated along the vital Addis Ababa–Debre Markos corridor.
                  </p>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5 w-6 h-6 rounded-md bg-[#c8a415]/10 flex items-center justify-center shrink-0 text-[#c8a415]">
                    <TreePine className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    At an elevation of 2,470 meters, the city enjoys a pleasant subtropical highland climate that has made it a favored destination for trade, education, and administration.
                  </p>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5 w-6 h-6 rounded-md bg-blue-600/10 flex items-center justify-center shrink-0 text-blue-600">
                    <Users2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
      <section className="bg-gray-50/50 py-12 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-8">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-[10px] mb-1 block">By The Numbers</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0d4a28]">STATISTICAL OVERVIEW</h2>
            </div>

            {/* Numerical Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {keyFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp} whileHover={{ y: -3 }}>
                  <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                    <CardContent className="p-4 text-center">
                      <fact.icon className="w-5 h-5 mx-auto mb-2 opacity-80" style={{ color: fact.color }} />
                      <div className="text-2xl font-black text-gray-800 drop-shadow-sm mb-1 leading-none">
                        <AnimatedStat value={fact.val} suffix={fact.suffix} />
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{fact.label}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Other Text Facts */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {otherFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
                  <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100">
                        <fact.icon className="w-4 h-4 opacity-80" style={{ color: fact.color }} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{fact.label}</span>
                        <span className="text-xs font-bold text-gray-800 leading-tight">{fact.value}</span>
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
      <section className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-8">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-[10px] mb-1 block">Our Ideology</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0d4a28]">THE CITY'S FOUNDATION</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Eye className="w-6 h-6 text-[#1a6b3c] mb-3 opacity-80" />
                    <h3 className="text-lg font-bold text-[#0d4a28] mb-2">Our Vision</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      To make Dessie a model smart city in Ethiopia, known for good governance, sustainable development, and an unparalleled quality of life for all its residents.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Target className="w-6 h-6 text-[#c8a415] mb-3 opacity-80" />
                    <h3 className="text-lg font-bold text-[#0d4a28] mb-2">Our Mission</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
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
      <section className="bg-white py-20 px-4 relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Growth & Prosperity</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">ECONOMY & COMMERCE</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>
            
            <motion.p variants={fadeInUp} className="text-gray-600 text-sm md:text-base text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Dessie&apos;s economy is diverse and rapidly growing, driven by trade, agriculture, manufacturing, and services. As a major commercial crossroads, the city connects producers from the surrounding highlands with markets across Ethiopia.
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {economyStats.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Card className="bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-[#1a6b3c]/20 transition-all overflow-hidden group rounded-2xl h-full relative">
                    {/* Abstract gradient on hover */}
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-xl transition-colors duration-500 opacity-10 group-hover:opacity-20" style={{ backgroundColor: stat.color }} />
                    <CardContent className="p-8 text-center relative z-10">
                      <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-gray-50 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                      </div>
                      <div className="text-3xl font-black text-gray-800 drop-shadow-sm mb-2">
                         <AnimatedStat value={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
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
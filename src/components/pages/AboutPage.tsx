'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/lib/LangContext'
import {
  Users, Mountain, MapPin, Building2, Globe, Sparkles, Navigation, Award, Eye, Target, Briefcase, Landmark
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

// Temporary hook to simulate dynamic site settings fetch
function useSiteSettings() {
  const [data, setData] = useState({ population: '450,000+', elevation: '2,470m', area: '25.4 km²', budget: 'ETB 2.8B' })
  useEffect(() => {
    // In a real scenario, this would fetch from /api/admin/site-settings
    // fetch('/api/admin/site-settings').then(...)
  }, [])
  return data
}

export default function AboutPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const settings = useSiteSettings()

  const keyFacts = [
    { icon: Users, label: isAm ? 'ህዝብ' : 'Population', val: settings.population, color: 'text-[#1a6b3c]', bg: 'bg-[#1a6b3c]/10' },
    { icon: Mountain, label: isAm ? 'ከፍታ' : 'Elevation', val: settings.elevation, color: 'text-[#c8a415]', bg: 'bg-[#c8a415]/10' },
    { icon: MapPin, label: isAm ? 'ስፋት' : 'Area', val: settings.area, color: 'text-[#0d4a28]', bg: 'bg-[#0d4a28]/10' },
    { icon: Building2, label: isAm ? 'ቀበሌዎች' : 'Kebeles', val: '12', color: 'text-[#1a6b3c]', bg: 'bg-[#1a6b3c]/10' },
  ]

  const ideologies = [
    {
      title: isAm ? 'ራዕይ' : 'Our Vision',
      desc: isAm ? 'ደሴን በኢትዮጵያ ውስጥ የዘመናዊ ከተማ ሞዴል ማድረግ።' : 'To make Dessie a model smart city in Ethiopia, known for good governance, sustainable development, and an unparalleled quality of life for all its residents.',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1547471080-7fc2caa6f561?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: isAm ? 'ተልዕኮ' : 'Our Mission',
      desc: isAm ? 'ግልጽ እና ቀልጣፋ የአስተዳደር አገልግሎት በመስጠት የኢኮኖሚ ዕድገትን ማምጣት።' : 'Provide efficient, transparent, and citizen-centered municipal services while actively promoting local economic growth, social equity, and cultural preservation.',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1523805009056-11f810b4976c?q=80&w=2000&auto=format&fit=crop'
    }
  ]

  return (
    <main className="bg-[#f8faf8]">
      {/* Hero Section with International Standard Image */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=2069&auto=format&fit=crop" 
            alt="Dessie City Administration" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0d4a28]/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d4a28] to-transparent opacity-90" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20">
              <Globe className="w-4 h-4 text-[#c8a415]" />
              <p className="text-white text-xs tracking-widest font-bold uppercase">{isAm ? 'ከተማችንን ያውቁ' : 'Discover Our Heritage'}</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-xl">{isAm ? 'ስለ ደሴ ከተማ' : 'ABOUT DESSIE CITY'}</h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              The heart of the Amhara Highlands. A vibrant, strategically located city committed to smart transformation and sustainable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* City Profile - Reduced redundant text, added polished cards */}
      <section className="py-20 px-4 relative z-20 -mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#c8a415]/10 mb-6 w-fit">
                    <Landmark className="w-5 h-5 text-[#c8a415]" />
                    <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs">City Profile</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    The Heart of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c]">Amhara Highlands</span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Dessie is a major administrative and commercial center founded in 1882. Positioned at an elevation of 2,470 meters, it boasts a pleasant subtropical highland climate. Today, the administration is driving forward a comprehensive smart city initiative to enhance the lives of its diverse residents.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1a6b3c]/10 flex items-center justify-center shrink-0">
                        <Navigation className="w-6 h-6 text-[#1a6b3c]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Strategic Hub</p>
                        <p className="font-bold text-gray-900">Trade & Commerce</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#c8a415]/10 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-[#c8a415]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Established</p>
                        <p className="font-bold text-gray-900">1882</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[400px] lg:min-h-full">
                  <Image src="/dessie-city-hall.png" alt="Dessie City Hall" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/90 lg:bg-gradient-to-r lg:from-white/10 lg:to-transparent" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Data Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFacts.map((fact, i) => (
              <motion.div key={fact.label} variants={fadeInUp} whileHover={{ y: -5 }}>
                <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white relative">
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-colors ${fact.bg}`} />
                  <CardContent className="p-8 relative z-10 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${fact.bg}`}>
                      <fact.icon className={`w-8 h-8 ${fact.color}`} />
                    </div>
                    <div className="text-3xl font-black text-gray-900 mb-2">
                      {fact.val}
                    </div>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{fact.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission (Replaced text with Image Cards) */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Our Ideology</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">THE CITY'S FOUNDATION</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-6 rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {ideologies.map((item, i) => (
                <motion.div key={item.title} variants={fadeInUp} className="group cursor-pointer">
                  <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-lg mb-6">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-wide">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed px-2">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/lib/LangContext'
import {
  Mountain, Landmark, ShoppingBag, TreePine, Church, Eye, Star,
  UtensilsCrossed, Car, Bus, Footprints, Calendar, Banknote, Languages,
  ShieldCheck, HeartPulse, FileCheck, Coffee, Globe, Sun, ChevronRight, Sparkles, Navigation, MapPin
} from 'lucide-react'
import Image from 'next/image'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const attractions = [
  { icon: Mountain, title: 'Mount Tossa', category: 'Nature', desc: 'The iconic mountain overlooking Dessie, offering panoramic views and hiking trails for adventurers of all levels.', color: '#1a6b3c' },
  { icon: Landmark, title: 'Dessie Museum', category: 'Cultural', desc: 'Home to artifacts from the region\'s rich history spanning centuries, showcasing Amhara heritage and traditions.', color: '#c8a415' },
  { icon: ShoppingBag, title: 'Historic Market', category: 'Cultural', desc: 'One of the largest traditional markets in Amhara Region, vibrant with local crafts, spices, and textiles.', color: '#0d4a28' },
  { icon: TreePine, title: 'Borkena River Valley', category: 'Nature', desc: 'Scenic valley perfect for nature walks and bird watching, with lush vegetation along the riverbanks.', color: '#1a6b3c' },
  { icon: Church, title: 'Saint Mary Church', category: 'Historical', desc: 'A beautiful historic church with unique architectural features and deep spiritual significance in the community.', color: '#c8a415' },
  { icon: Eye, title: 'Tossa Viewpoint', category: 'Nature', desc: 'The best vantage point to see the city and surrounding landscape, especially stunning at sunrise and sunset.', color: '#0d4a28' },
]

const defaultHotels = [
  { name: 'Dessie Palace Hotel', stars: 4, desc: 'Premium accommodation with conference facilities and modern amenities in a central location.', amenities: ['WiFi', 'Restaurant', 'Parking', 'Pool'] },
  { name: 'Tossa Lodge', stars: 3, desc: 'Mountain lodge with stunning views of the highlands, perfect for nature lovers and explorers.', amenities: ['WiFi', 'Restaurant', 'Garden', 'Tour Desk'] },
  { name: 'City Center Hotel', stars: 3, desc: 'Conveniently located in the heart of the city, close to markets and government offices.', amenities: ['WiFi', 'Restaurant', 'Room Service', 'Laundry'] },
  { name: 'Budget Inn', stars: 2, desc: 'Affordable clean accommodation for travelers, offering great value without compromising comfort.', amenities: ['WiFi', 'Parking', 'Security'] },
]

const restaurants = [
  { icon: UtensilsCrossed, name: 'Traditional Ethiopian', desc: 'Authentic injera, doro wot, and regional Amhara specialties.', badge: 'Local Cuisine' },
  { icon: Globe, name: 'International Cuisine', desc: 'A selection of restaurants offering Italian and Middle Eastern dishes.', badge: 'International' },
  { icon: Coffee, name: 'Cafes & Bakeries', desc: 'Enjoy traditional Ethiopian coffee ceremonies and fresh pastries.', badge: 'Coffee & Pastry' },
  { icon: Sun, name: 'Street Food', desc: 'Sambusa, kitfo, and other beloved street foods found in bustling market areas.', badge: 'Street Food' },
]

const transport = [
  { icon: Bus, title: 'Bus Services', desc: 'Regular intercity buses connect Dessie to Addis Ababa, Bahir Dar, and other major cities.' },
  { icon: Car, title: 'Taxi Services', desc: 'Local taxi and ride-hailing services available throughout the city for convenient travel.' },
  { icon: Car, title: 'Car Rental', desc: 'Several agencies offer vehicle rentals for exploring the surrounding highlands at your own pace.' },
  { icon: Footprints, title: 'Walking Tours', desc: 'Guided walking tours available for exploring the city\'s historic sites and cultural landmarks.' },
]

const tips = [
  { icon: Calendar, title: 'Best Time to Visit', value: 'Oct – Mar', desc: 'Dry season with pleasant temperatures.' },
  { icon: Banknote, title: 'Currency', value: 'Ethiopian Birr (ETB)', desc: 'ATMs are available in the city center.' },
  { icon: Languages, title: 'Language', value: 'Amharic', desc: 'English is understood in tourist areas.' },
  { icon: ShieldCheck, title: 'Safety', value: 'Generally Safe', desc: 'Exercise normal precautions.' },
  { icon: HeartPulse, title: 'Health', value: 'Vaccinations', desc: 'Recommended: yellow fever, typhoid.' },
  { icon: FileCheck, title: 'Visa', value: 'On Arrival', desc: 'Available at Bole International Airport.' },
]

import { useState, useEffect } from 'react'

export default function TourismPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [hotels, setHotels] = useState<any[]>(defaultHotels)

  useEffect(() => {
    fetch('/api/admin/hotels')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.filter((h: any) => h.approvalStatus === 'approved').map((h: any) => ({
            name: h.name,
            stars: h.starRating || 3,
            desc: h.description,
            amenities: h.amenities ? (typeof h.amenities === 'string' ? JSON.parse(h.amenities) : h.amenities) : ['WiFi', 'Restaurant']
          }))
          setHotels(mapped)
        }
      })
      .catch(console.error)
  }, [])
  
  return (
    <main className="bg-gray-50/50 min-h-screen">
      {/* Page Banner */}
      <section className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] py-20 text-center relative overflow-hidden">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full border-[20px] border-white/5 border-dashed" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full border-[15px] border-[#c8a415]/10 border-dashed" />
          <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border-2 border-white/20 animate-[ping_4s_ease-in-out_infinite]" />
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#c8a415] animate-pulse" />
            <p className="text-[#c8a415] text-xs tracking-widest font-bold uppercase">{isAm ? 'የቱሪስት መዳረሻዎች' : 'Tourism & Culture'}</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">{isAm ? 'ደሴን ያስሱ' : 'DISCOVER DESSIE'}</h1>
          <Separator className="w-20 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1 mb-4 border-0 rounded-full" />
          <p className="text-white/80 text-xs tracking-widest uppercase font-bold bg-black/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Home / Tourism</p>
        </motion.div>
      </section>

      {/* Welcome */}
      <section className="py-16 px-4 relative z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid md:grid-cols-12 gap-8 items-center bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <div className="md:col-span-5 relative h-full flex flex-col justify-center">
              <div className="absolute -inset-10 bg-gradient-to-br from-[#1a6b3c]/5 to-[#c8a415]/5 rounded-full -z-10 blur-2xl opacity-70"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a6b3c]/10 mb-4 w-fit">
                <MapPin className="w-5 h-5 text-[#1a6b3c]" />
                <span className="text-[#1a6b3c] font-bold tracking-widest uppercase text-xs">Welcome</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Gateway to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c]">Highlands</span>
              </h2>
            </div>
            
            <div className="md:col-span-7 space-y-4">
              <p className="text-gray-600 text-base leading-relaxed">
                Nestled in the Ethiopian highlands at an elevation of 2,470 meters, Dessie serves as a strategic gateway between the capital Addis Ababa and the historic wonders of the north. 
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                The city&apos;s cool climate, breathtaking mountain scenery, and warm Amhara hospitality make it an ideal stop for both domestic and international travelers seeking an authentic Ethiopian experience.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                From the towering peak of Mount Tossa to the vibrant historic market, every corner of the city tells a story of resilience, tradition, and progress that dates back centuries.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tourist Attractions */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 relative">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#c8a415]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Must See</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">TOP ATTRACTIONS</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((a, i) => (
                <motion.div key={a.title} variants={fadeInUp}>
                  <Card className="group h-full hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden rounded-2xl bg-white hover:-translate-y-1">
                    <div className="h-40 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${a.color} 0%, transparent 100%)` }} />
                      <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-sm z-0" />
                      <a.icon className="w-16 h-16 relative z-10 drop-shadow-sm transition-transform duration-500 group-hover:scale-110" style={{ color: a.color }} />
                    </div>
                    <CardContent className="p-6 relative z-10 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-extrabold text-xl text-gray-900">{a.title}</h3>
                        <Badge variant="outline" className="text-xs font-bold" style={{ borderColor: a.color, color: a.color }}>{a.category}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{a.desc}</p>
                      <span className="inline-flex items-center font-bold text-sm hover:underline cursor-pointer transition-colors" style={{ color: a.color }}>LEARN MORE <ChevronRight className="w-4 h-4 ml-1" /></span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hotels & Accommodation */}
      <section className="bg-[#1a6b3c] py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block drop-shadow-md">Accommodation</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">WHERE TO STAY</h2>
              <div className="w-24 h-1 bg-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hotels.map((h, i) => (
                <motion.div key={h.name} variants={fadeInUp}>
                  <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-2xl group overflow-hidden">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg text-white mb-1">{h.name}</h3>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`w-3.5 h-3.5 ${s < h.stars ? 'text-[#c8a415] fill-[#c8a415]' : 'text-white/30'}`} />)}
                        </div>
                      </div>
                      <p className="text-white/80 text-sm mb-6 flex-grow">{h.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {h.amenities.map(a => <Badge key={a} variant="secondary" className="text-[10px] bg-white/10 text-white border-0 hover:bg-white/20">{a}</Badge>)}
                      </div>
                      <Button className="w-full bg-[#c8a415] hover:bg-[#a88810] text-[#0d4a28] font-bold text-xs py-2 h-auto">BOOK NOW</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restaurants & Dining */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Gastronomy</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">RESTAURANTS & DINING</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {restaurants.map((r, i) => (
                <motion.div key={r.name} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Card className="h-full text-center border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl group bg-gray-50/50">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100 group-hover:scale-110 transition-transform duration-300 group-hover:border-[#c8a415]/30">
                        <r.icon className="w-6 h-6 text-[#1a6b3c]" />
                      </div>
                      <Badge className="bg-[#1a6b3c]/10 text-[#1a6b3c] hover:bg-[#1a6b3c]/20 mb-3 text-[10px] font-bold border-0">{r.badge}</Badge>
                      <h3 className="font-extrabold text-gray-900 mb-2">{r.name}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Getting Around */}
      <section className="bg-gray-50 py-16 px-4 border-t border-gray-100 relative">
        <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-[#1a6b3c]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#1a6b3c] font-bold tracking-widest uppercase text-xs mb-2 block">Transportation</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">GETTING AROUND</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {transport.map((t, i) => (
                <motion.div key={t.title} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Card className="h-full bg-white hover:shadow-md transition-shadow border-gray-100 rounded-xl">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 border border-gray-100">
                        <t.icon className="w-5 h-5 text-[#c8a415]" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-sm">{t.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-white py-16 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Essential Info</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">TRAVEL TIPS</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((t, i) => (
                <motion.div key={t.title} variants={fadeInUp}>
                  <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl group hover:border-[#1a6b3c]/20">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#1a6b3c]/5 transition-colors">
                        <t.icon className="w-5 h-5 text-[#1a6b3c]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">{t.title}</h3>
                        </div>
                        <p className="text-[#c8a415] font-black text-sm mb-0.5">{t.value}</p>
                        <p className="text-gray-500 text-[10px] leading-snug">{t.desc}</p>
                      </div>
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
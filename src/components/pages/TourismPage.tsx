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
  { icon: Mountain, title: 'Mount Tossa', category: 'Nature', desc: 'The iconic mountain overlooking Dessie, offering panoramic views and hiking trails for adventurers of all levels.', color: '#1a6b3c', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop' },
  { icon: Landmark, title: 'Dessie Museum', category: 'Cultural', desc: 'Home to artifacts from the region\'s rich history spanning centuries, showcasing Amhara heritage and traditions.', color: '#c8a415', image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=800&auto=format&fit=crop' },
  { icon: ShoppingBag, title: 'Historic Market', category: 'Cultural', desc: 'One of the largest traditional markets in Amhara Region, vibrant with local crafts, spices, and textiles.', color: '#0d4a28', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop' },
  { icon: TreePine, title: 'Borkena River Valley', category: 'Nature', desc: 'Scenic valley perfect for nature walks and bird watching, with lush vegetation along the riverbanks.', color: '#1a6b3c', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop' },
  { icon: Church, title: 'Saint Mary Church', category: 'Historical', desc: 'A beautiful historic church with unique architectural features and deep spiritual significance in the community.', color: '#c8a415', image: 'https://images.unsplash.com/photo-1548625361-ec853c2b184e?q=80&w=800&auto=format&fit=crop' },
  { icon: Eye, title: 'Tossa Viewpoint', category: 'Nature', desc: 'The best vantage point to see the city and surrounding landscape, especially stunning at sunrise and sunset.', color: '#0d4a28', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop' },
]

const defaultHotels = [
  { name: 'Dessie Palace Hotel', stars: 4, desc: 'Premium accommodation with conference facilities and modern amenities in a central location.', amenities: ['WiFi', 'Restaurant', 'Parking', 'Pool'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
  { name: 'Tossa Lodge', stars: 3, desc: 'Mountain lodge with stunning views of the highlands, perfect for nature lovers and explorers.', amenities: ['WiFi', 'Restaurant', 'Garden', 'Tour Desk'], image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop' },
  { name: 'City Center Hotel', stars: 3, desc: 'Conveniently located in the heart of the city, close to markets and government offices.', amenities: ['WiFi', 'Restaurant', 'Room Service', 'Laundry'], image: 'https://images.unsplash.com/photo-1618773928120-2c1473659eb0?q=80&w=800&auto=format&fit=crop' },
  { name: 'Budget Inn', stars: 2, desc: 'Affordable clean accommodation for travelers, offering great value without compromising comfort.', amenities: ['WiFi', 'Parking', 'Security'], image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop' },
]

const restaurants = [
  { icon: UtensilsCrossed, name: 'Traditional Ethiopian', desc: 'Authentic injera, doro wot, and regional Amhara specialties.', badge: 'Local Cuisine', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=800&auto=format&fit=crop' },
  { icon: Globe, name: 'International Cuisine', desc: 'A selection of restaurants offering Italian and Middle Eastern dishes.', badge: 'International', image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=800&auto=format&fit=crop' },
  { icon: Coffee, name: 'Cafes & Bakeries', desc: 'Enjoy traditional Ethiopian coffee ceremonies and fresh pastries.', badge: 'Coffee & Pastry', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop' },
  { icon: Sun, name: 'Street Food', desc: 'Sambusa, kitfo, and other beloved street foods found in bustling market areas.', badge: 'Street Food', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop' },
]

const transport = [
  { icon: Bus, title: 'Bus Services', desc: 'Regular intercity buses connect Dessie to Addis Ababa, Bahir Dar, and other major cities.', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d597a?q=80&w=800&auto=format&fit=crop' },
  { icon: Car, title: 'Taxi Services', desc: 'Local taxi and ride-hailing services available throughout the city for convenient travel.', image: 'https://images.unsplash.com/photo-1502877338593-d29b00eb81ec?q=80&w=800&auto=format&fit=crop' },
  { icon: Car, title: 'Car Rental', desc: 'Several agencies offer vehicle rentals for exploring the surrounding highlands at your own pace.', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop' },
  { icon: Footprints, title: 'Walking Tours', desc: 'Guided walking tours available for exploring the city\'s historic sites and cultural landmarks.', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop' },
]

const tips = [
  { icon: Calendar, title: 'Best Time to Visit', value: 'Oct – Mar', desc: 'Dry season with pleasant temperatures.' },
  { icon: Banknote, title: 'Currency', value: 'Ethiopian Birr (ETB)', desc: 'ATMs are available in the city center.' },
  { icon: Languages, title: 'Language', value: 'Amharic', desc: 'English is understood in tourist areas.' },
  { icon: ShieldCheck, title: 'Safety', value: 'Generally Safe', desc: 'Exercise normal precautions.' },
  { icon: HeartPulse, title: 'Health', value: 'Vaccinations', desc: 'Recommended: yellow fever, typhoid.' },
  { icon: FileCheck, title: 'Visa', value: 'On Arrival', desc: 'Available at Bole International Airport.' },
]

import { useMemo } from 'react'
import useSWR from 'swr'
import { fetcherArray } from '@/lib/fetcher'
export default function TourismPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const { data: dbData } = useSWR('/api/admin/hotels', fetcherArray)

  const hotels = useMemo(() => {
    if (dbData && dbData.length > 0) {
      const mapped = dbData.filter((h: any) => h.approvalStatus === 'approved').map((h: any) => ({
        name: h.name,
        stars: h.starRating || 3,
        desc: h.description,
        amenities: h.amenities ? (typeof h.amenities === 'string' ? JSON.parse(h.amenities) : h.amenities) : ['WiFi', 'Restaurant'],
        image: h.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
      }))
      if (mapped.length > 0) return mapped;
    }
    return defaultHotels;
  }, [dbData]);
  return (
    <main className="bg-gray-50/50 min-h-screen">
      {/* Page Banner */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1548625361-ec853c2b184e?q=80&w=2000&auto=format&fit=crop" 
            alt="Dessie Tourism" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#f8faf8] opacity-90" />
        </div>
        
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full border-[20px] border-white/10 border-dashed" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full border-[15px] border-[#c8a415]/20 border-dashed" />
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-20 text-center px-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#c8a415] animate-pulse" />
            <p className="text-[#c8a415] text-xs tracking-widest font-bold uppercase">{isAm ? 'የቱሪስት መዳረሻዎች' : 'Tourism & Culture'}</p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">{isAm ? 'ደሴን ያስሱ' : 'DISCOVER DESSIE'}</h1>
          <Separator className="w-20 mx-auto bg-[#c8a415] h-1 mb-6 border-0 rounded-full" />
          <p className="text-white/90 text-xs tracking-widest uppercase font-bold bg-black/30 inline-block px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">Home / Tourism</p>
        </motion.div>
      </section>

      {/* Welcome */}
      <section className="py-10 px-4 relative z-20">
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
      <section className="bg-gradient-to-b from-gray-50 to-white py-10 px-4 relative">
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
                    <div className="h-56 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gray-200" />
                      {a.image && <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                      <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-xl">
                        <a.icon className="w-6 h-6 text-white drop-shadow-sm" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                         <h3 className="font-extrabold text-2xl text-white drop-shadow-md mb-1">{a.title}</h3>
                         <Badge variant="outline" className="text-xs font-bold bg-white/20 text-white border-white/40 backdrop-blur-md">{a.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 relative z-10 bg-white">
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
      <section className="bg-gray-50 py-10 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block drop-shadow-md">Accommodation</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">WHERE TO STAY</h2>
              <div className="w-24 h-1 bg-[#c8a415] mx-auto mt-4 rounded-full" />
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">From luxury hotels to cozy mountain lodges, find the perfect place to rest during your visit to the highlands.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotels.map((h, i) => (
                <motion.div key={h.name} variants={fadeInUp}>
                  <Card className="h-full bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 rounded-2xl group overflow-hidden flex flex-col">
                    <div className="h-48 relative overflow-hidden">
                      {h.image && <img src={h.image} alt={h.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex gap-0.5">
                         {Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`w-3.5 h-3.5 ${s < h.stars ? 'text-[#c8a415] fill-[#c8a415]' : 'text-white/40'}`} />)}
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <div className="mb-2 flex-grow">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{h.name}</h3>
                        <p className="text-gray-600 text-sm">{h.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-5 mt-3">
                        {h.amenities.map((a: string) => <Badge key={a} variant="secondary" className="text-[10px] bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200">{a}</Badge>)}
                      </div>
                      <Button className="w-full bg-[#0d4a28] hover:bg-[#1a6b3c] text-white font-bold text-xs py-2 h-auto">BOOK NOW</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restaurants & Dining */}
      <section className="bg-white py-10 px-4">
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
                  <Card className="h-full text-center border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl group bg-white overflow-hidden flex flex-col">
                    <div className="h-40 relative overflow-hidden">
                      {r.image && <img src={r.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <Badge className="bg-[#c8a415] text-white hover:bg-[#a88810] text-[10px] font-bold border-0">{r.badge}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col items-center justify-center">
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
      <section className="bg-gray-50 py-10 px-4 border-t border-gray-100 relative">
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
                  <Card className="h-full bg-white hover:shadow-xl transition-shadow border-gray-100 rounded-2xl overflow-hidden group">
                    <div className="h-36 relative overflow-hidden">
                      {t.image && <img src={t.image} alt={t.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <t.icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-white text-sm">{t.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-5 text-left">
                      <p className="text-gray-600 text-xs leading-relaxed">{t.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-white py-10 px-4 border-t border-gray-100">
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

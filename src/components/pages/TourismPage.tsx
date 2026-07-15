'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/lib/LangContext'
import {
  Mountain,
  Landmark,
  ShoppingBag,
  TreePine,
  Church,
  Eye,
  Star,
  Wifi,
  UtensilsCrossed,
  Car,
  Bus,
  Footprints,
  Calendar,
  Banknote,
  Languages,
  ShieldCheck,
  HeartPulse,
  FileCheck,
  MapPin,
  Coffee,
  Globe,
  Sun,
  ChevronRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
}

const attractions = [
  { icon: Mountain, title: 'Mount Tossa', category: 'Nature', desc: 'The iconic mountain overlooking Dessie, offering panoramic views and hiking trails for adventurers of all levels.' },
  { icon: Landmark, title: 'Dessie Museum', category: 'Cultural', desc: 'Home to artifacts from the region\'s rich history spanning centuries, showcasing Amhara heritage and traditions.' },
  { icon: ShoppingBag, title: 'Historic Market', category: 'Cultural', desc: 'One of the largest traditional markets in Amhara Region, vibrant with local crafts, spices, and textiles.' },
  { icon: TreePine, title: 'Borkena River Valley', category: 'Nature', desc: 'Scenic valley perfect for nature walks and bird watching, with lush vegetation along the riverbanks.' },
  { icon: Church, title: 'Saint Mary Church', category: 'Historical', desc: 'A beautiful historic church with unique architectural features and deep spiritual significance in the community.' },
  { icon: Eye, title: 'Tossa Viewpoint', category: 'Nature', desc: 'The best vantage point to see the city and surrounding landscape, especially stunning at sunrise and sunset.' },
]

const hotels = [
  { name: 'Dessie Palace Hotel', stars: 4, desc: 'Premium accommodation with conference facilities and modern amenities in a central location.', amenities: ['WiFi', 'Restaurant', 'Parking', 'Conference', 'Pool'] },
  { name: 'Tossa Lodge', stars: 3, desc: 'Mountain lodge with stunning views of the highlands, perfect for nature lovers and explorers.', amenities: ['WiFi', 'Restaurant', 'Parking', 'Garden', 'Tour Desk'] },
  { name: 'City Center Hotel', stars: 3, desc: 'Conveniently located in the heart of the city, close to markets and government offices.', amenities: ['WiFi', 'Restaurant', 'Parking', 'Room Service', 'Laundry'] },
  { name: 'Budget Inn', stars: 2, desc: 'Affordable clean accommodation for travelers, offering great value without compromising comfort.', amenities: ['WiFi', 'Parking', 'Hot Water', 'Security'] },
]

const restaurants = [
  { icon: UtensilsCrossed, name: 'Traditional Ethiopian', desc: 'Authentic injera, doro wot, and regional Amhara specialties prepared with time-honored recipes.', badge: 'Local Cuisine' },
  { icon: Globe, name: 'International Cuisine', desc: 'A growing selection of restaurants offering Italian, Chinese, and Middle Eastern dishes.', badge: 'International' },
  { icon: Coffee, name: 'Cafes & Bakeries', desc: 'Enjoy traditional Ethiopian coffee ceremonies and fresh pastries at charming local cafes.', badge: 'Coffee & Pastry' },
  { icon: Sun, name: 'Street Food', desc: 'Sambusa, kitfo, and other beloved street foods found in bustling market areas.', badge: 'Street Food' },
]

const transport = [
  { icon: Bus, title: 'Bus Services', desc: 'Regular intercity buses connect Dessie to Addis Ababa, Bahir Dar, and other major cities.' },
  { icon: Car, title: 'Taxi Services', desc: 'Local taxi and ride-hailing services available throughout the city for convenient travel.' },
  { icon: Car, title: 'Car Rental', desc: 'Several agencies offer vehicle rentals for exploring the surrounding highlands at your own pace.' },
  { icon: Footprints, title: 'Walking Tours', desc: 'Guided walking tours available for exploring the city\'s historic sites and cultural landmarks.' },
]

const tips = [
  { icon: Calendar, title: 'Best Time to Visit', value: 'October – March', desc: 'Dry season with pleasant temperatures and clear skies.' },
  { icon: Banknote, title: 'Currency', value: 'Ethiopian Birr (ETB)', desc: 'ATMs and exchange services available in the city center.' },
  { icon: Languages, title: 'Language', value: 'Amharic', desc: 'English is widely understood in hotels and tourist areas.' },
  { icon: ShieldCheck, title: 'Safety', value: 'Generally Safe', desc: 'Exercise normal precautions; local police are helpful.' },
  { icon: HeartPulse, title: 'Health', value: 'Vaccinations', desc: 'Recommended: yellow fever, typhoid, and hepatitis A.' },
  { icon: FileCheck, title: 'Visa', value: 'Available on Arrival', desc: 'Tourist visas can be obtained at Bole International Airport.' },
]

export default function TourismPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white tracking-wide">{isAm ? 'ደሴን ያስሱ' : 'DISCOVER DESSIE'}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-green-200 mt-4 text-lg md:text-xl max-w-2xl mx-auto">A city rich in history, culture, and natural beauty</motion.p>
      </section>

      {/* Welcome */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-8">Welcome to Dessie</motion.h2>
          {[
            'Nestled in the Ethiopian highlands at an elevation of 2,470 meters, Dessie serves as a strategic gateway between the capital Addis Ababa and the historic wonders of the north. The city\'s cool climate, breathtaking mountain scenery, and warm Amhara hospitality make it an ideal stop for both domestic and international travelers seeking an authentic Ethiopian experience.',
            'As the gateway to the Simien Mountains and the Lalibela highlands, Dessie offers visitors a unique blend of natural wonders and cultural treasures. From the towering peak of Mount Tossa to the vibrant historic market, every corner of the city tells a story of resilience, tradition, and progress that dates back centuries.',
            'The city\'s growing hospitality sector offers a range of accommodations from boutique mountain lodges to comfortable city-center hotels. Combined with excellent traditional cuisine, lively cultural events, and friendly locals eager to share their heritage, Dessie provides a memorable travel experience that captures the essence of Ethiopia\'s rich Amhara culture.',
          ].map((p, i) => (
            <motion.p key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4">{p}</motion.p>
          ))}
        </div>
      </section>

      <Separator className="bg-[#c8a415]" />

      {/* Tourist Attractions */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">TOP ATTRACTIONS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((a, i) => (
              <motion.div key={a.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="group h-full hover:shadow-lg transition-shadow border-0 overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-[#1a6b3c] to-[#0d4a28] flex items-center justify-center">
                    <a.icon className="w-14 h-14 text-white/80 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-foreground">{a.title}</h3>
                      <Badge variant="outline" className="text-xs border-[#1a6b3c] text-[#1a6b3c]">{a.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{a.desc}</p>
                    <span className="inline-flex items-center text-[#1a6b3c] font-semibold text-sm hover:underline cursor-pointer">LEARN MORE <ChevronRight className="w-4 h-4 ml-1" /></span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels & Accommodation */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">WHERE TO STAY</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid md:grid-cols-2 gap-6">
            {hotels.map((h, i) => (
              <motion.div key={h.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-foreground">{h.name}</h3>
                      <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`w-4 h-4 ${s < h.stars ? 'text-[#c8a415] fill-[#c8a415]' : 'text-gray-300'}`} />)}</div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{h.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {h.amenities.map(a => <Badge key={a} variant="secondary" className="text-xs bg-[#f8faf8] text-muted-foreground">{a}</Badge>)}
                    </div>
                    <Button className="bg-[#1a6b3c] hover:bg-[#0d4a28] text-white w-full">BOOK NOW</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants & Dining */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">RESTAURANTS & DINING</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((r, i) => (
              <motion.div key={r.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center mx-auto mb-4">
                      <r.icon className="w-7 h-7 text-[#1a6b3c]" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{r.name}</h3>
                    <Badge className="bg-[#c8a415] text-white mb-3 text-xs">{r.badge}</Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Around */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">GETTING AROUND</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {transport.map((t, i) => (
              <motion.div key={t.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center mx-auto mb-4">
                      <t.icon className="w-6 h-6 text-[#1a6b3c]" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{t.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">TRAVEL TIPS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((t, i) => (
              <motion.div key={t.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="stat-card h-full hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1a6b3c]/10 flex items-center justify-center shrink-0">
                        <t.icon className="w-5 h-5 text-[#1a6b3c]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm">{t.title}</h3>
                        <p className="text-[#1a6b3c] font-semibold text-sm mt-0.5">{t.value}</p>
                        <p className="text-muted-foreground text-xs mt-1">{t.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
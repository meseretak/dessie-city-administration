'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import {
  Star,
  MapPin,
  Wifi,
  BedDouble,
  Car,
  UtensilsCrossed,
  ChevronRight,
  Sparkles,
  Mountain,
  Phone,
  Clock,
  Award,
  Building,
  Dumbbell,
  Waves,
  Coffee,
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const galleryImages = [
  { src: '/hotel-building.png', label: 'Building' },
  { src: '/hotel-room.png', label: 'Rooms' },
  { src: '/hotel-food.png', label: 'Cuisine' },
  { src: '/hotel-lobby.png', label: 'Lobby' },
  { src: '/hotel-pool.png', label: 'Pool & Leisure' },
]

const amenityIcons: Record<string, React.ElementType> = {
  'Free WiFi': Wifi,
  'Room Service': Coffee,
  'Restaurant': UtensilsCrossed,
  'Parking': Car,
  'Pool': Waves,
  'Shuttle': Car,
  'Conference Hall': Building,
  'WiFi': Wifi,
  'Bar': Coffee,
  'Fitness': Dumbbell,
  'Airport Shuttle': Car,
  'Cultural Shows': Sparkles,
  'Garden': Mountain,
  'Spa': Sparkles,
  'VIP Lounge': Award,
}

// Fallback hotels if DB is empty
const fallbackHotels = [
  {
    name: 'Dessie Grand Hotel',
    rating: 4,
    image: '/hotel-building.png',
    description: 'The flagship luxury hotel in the heart of Dessie. Features 120 modern rooms, a rooftop restaurant with panoramic mountain views, conference facilities, and a full-service spa.',
    location: 'City Center',
    priceRange: 'ETB 3,500 - 8,000/night',
    amenities: '["Free WiFi","Room Service","Restaurant","Parking"]',
  },
  {
    name: 'Mountain View Lodge',
    rating: 4,
    image: '/hotel-pool.png',
    description: 'Perched on the hills overlooking Dessie, this boutique lodge offers breathtaking sunrise views, an infinity pool, and an intimate atmosphere perfect for relaxation.',
    location: 'Hillside, Kebele 02',
    priceRange: 'ETB 2,800 - 6,500/night',
    amenities: '["Pool","Free WiFi","Restaurant","Shuttle"]',
  },
  {
    name: 'Blue Nile Hotel',
    rating: 3,
    image: '/hotel-lobby.png',
    description: 'A well-established business hotel known for its warm Ethiopian hospitality. Located near government offices with excellent conference rooms and traditional restaurant.',
    location: 'Piazza Area',
    priceRange: 'ETB 1,800 - 4,000/night',
    amenities: '["Conference Hall","WiFi","Restaurant","Bar"]',
  },
  {
    name: 'Tana International',
    rating: 4,
    image: '/hotel-room.png',
    description: 'Modern international-standard hotel with 85 rooms, fitness center, and multiple dining options. Popular among business travelers and tourists visiting the Amhara region.',
    location: 'Bole Road',
    priceRange: 'ETB 2,500 - 5,500/night',
    amenities: '["Fitness","WiFi","Room Service","Airport Shuttle"]',
  },
  {
    name: 'Wollo Heritage Hotel',
    rating: 3,
    image: '/hotel-food.png',
    description: 'Experience authentic Ethiopian culture at this heritage boutique hotel. Features traditional architecture, cultural performances, and the best Ethiopian cuisine in the city.',
    location: 'Old Town, Kebele 04',
    priceRange: 'ETB 1,500 - 3,500/night',
    amenities: '["Cultural Shows","WiFi","Restaurant","Garden"]',
  },
  {
    name: 'Starlight Resort & Spa',
    rating: 5,
    image: '/hotel-building.png',
    description: "Dessie's premier 5-star resort featuring luxury spa treatments, Olympic-sized swimming pool, fine dining, and exclusive suites with private balconies overlooking the valley.",
    location: 'Outskirts, Kombolcha Road',
    priceRange: 'ETB 5,000 - 15,000/night',
    amenities: '["Spa","Pool","Restaurant","VIP Lounge"]',
  },
]

type HotelItem = {
  id?: string
  name: string
  rating: number
  image?: string | null
  description: string
  location: string
  priceRange: string
  amenities: string | string[]
}

const reasons = [
  {
    icon: MapPin,
    title: 'Strategic Location',
    description:
      'Dessie sits at the crossroads between Addis Ababa and the historic north, making it the perfect stopover for travelers exploring Ethiopia\'s famous route.',
  },
  {
    icon: Mountain,
    title: 'Mountain Scenery',
    description:
      'Surrounded by breathtaking highland landscapes, guests enjoy cool mountain air, stunning sunrise views over Mount Tossa, and easy access to hiking trails.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Ethiopian Cuisine',
    description:
      'From traditional injera and doro wot to rich coffee ceremonies, Dessie\'s hotels serve some of the finest Amhara regional cuisine in the country.',
  },
]

export default function HotelsPage() {
  const [hotels, setHotels] = useState<HotelItem[]>(fallbackHotels)

  useEffect(() => {
    fetch('/api/admin/hotels')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setHotels(data)
      })
      .catch(() => {})
  }, [])

  // Helper: parse amenities from string or array
  const getAmenities = (amenities: string | string[]): string[] => {
    if (Array.isArray(amenities)) return amenities
    try { return JSON.parse(amenities) } catch { return [] }
  }

  return (
    <div className="min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative w-full h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hotel-building.png"
          alt="Hotels in Dessie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(13,74,40,0.6)]" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold text-white tracking-wide"
          >
            HOTELS &amp; ACCOMMODATION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="text-lg text-white/80 mt-4"
          >
            Discover Premium Stays in Dessie City
          </motion.p>
        </div>
      </section>

      {/* 2. Photo Gallery Strip */}
      <section className="py-10 px-4 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } },
              }}
              className="w-72 h-48 flex-shrink-0 rounded-xl overflow-hidden relative snap-center rotate-1 hover:rotate-0 transition-transform duration-300 group"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-4 text-white text-sm font-medium">
                {img.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Separator className="bg-[#c8a415]" />

      {/* 3. Featured Hotels Grid */}
      <section className="py-16 px-4 bg-[#f8faf8]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center"
          >
            FEATURED HOTELS
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-16 h-1 bg-[#c8a415] mx-auto mb-10"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {hotels.map((hotel) => {
              const amenities = getAmenities(hotel.amenities)
              const stars = Number(hotel.rating) || 3
              const imgSrc = hotel.image || '/hotel-building.png'
              return (
              <motion.div key={hotel.id || hotel.name} variants={fadeInUp}>
                <Card className="group h-full border-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s < stars
                              ? 'text-[#c8a415] fill-[#c8a415]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {hotel.name}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
                      {hotel.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="text-xs border-[#1a6b3c] text-[#1a6b3c]"
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        {hotel.location}
                      </Badge>
                      {hotel.priceRange && (
                        <Badge variant="secondary" className="text-xs">
                          {hotel.priceRange}
                        </Badge>
                      )}
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-3 mb-4 mt-auto">
                      {amenities.slice(0, 4).map((amenity) => {
                        const AmenityIcon = amenityIcons[amenity] || BedDouble
                        return (
                          <div
                            key={amenity}
                            className="flex flex-col items-center gap-1"
                            title={amenity}
                          >
                            <div className="w-9 h-9 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center">
                              <AmenityIcon className="w-4 h-4 text-[#1a6b3c]" />
                            </div>
                            <span className="text-[10px] text-muted-foreground leading-tight text-center w-12 truncate">
                              {amenity}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Button */}
                    <Button
                      variant="outline"
                      className="w-full border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white transition-colors"
                    >
                      VIEW DETAILS
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              )
            })}
          </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Stay in Dessie */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center"
          >
            WHY STAY IN DESSIE
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-16 h-1 bg-[#c8a415] mx-auto mb-10"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {reasons.map((reason) => (
              <motion.div key={reason.title} variants={fadeInUp}>
                <Card className="h-full text-center border-0 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-[#1a6b3c] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                      <reason.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Book Your Stay CTA */}
      <section className="bg-[#0d4a28] py-16 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              PLAN YOUR VISIT TO DESSIE
            </h2>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Whether you&apos;re visiting for business, tourism, or transit, Dessie offers a
            welcoming range of hotels and lodges to suit every budget. Explore our tourism
            portal to plan your complete itinerary.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button className="bg-[#c8a415] hover:bg-[#b89412] text-white font-semibold px-8 py-3 text-base">
              EXPLORE TOURISM
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Users, Mountain, MapPin, Building2, Calendar, Globe, Languages, CloudSun,
  Eye, Target, Heart, Shield, Lightbulb, Scale, Handshake,
  Flag, Landmark, Clock, Cpu, Monitor, TrendingUp, Banknote, Briefcase, BarChart3,
  Thermometer, Droplets, Sun, Compass, ChevronRight, History, Award, BookOpen
} from 'lucide-react'
import Image from 'next/image'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function AboutPage() {
  const keyFacts = [
    { icon: Users, label: 'Population', value: '450,000+', color: '#1a6b3c' },
    { icon: Mountain, label: 'Elevation', value: '2,470m', color: '#c8a415' },
    { icon: MapPin, label: 'Area', value: '25.4 km²', color: '#1a6b3c' },
    { icon: Building2, label: 'Kebeles', value: '12', color: '#c8a415' },
    { icon: Clock, label: 'Founded', value: 'Late 19th Century', color: '#1a6b3c' },
    { icon: Globe, label: 'Region', value: 'Amhara', color: '#c8a415' },
    { icon: Languages, label: 'Language', value: 'Amharic', color: '#1a6b3c' },
    { icon: CloudSun, label: 'Climate', value: 'Subtropical Highland', color: '#c8a415' },
  ]

  const coreValues = [
    { label: 'Transparency', icon: Eye },
    { label: 'Accountability', icon: Shield },
    { label: 'Citizen First', icon: Heart },
    { label: 'Innovation', icon: Lightbulb },
    { label: 'Integrity', icon: Scale },
    { label: 'Inclusiveness', icon: Handshake },
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
    { icon: Banknote, value: 'ETB 2.8B', label: 'Annual Budget', color: '#1a6b3c' },
    { icon: Briefcase, value: '15,000+', label: 'Registered Businesses', color: '#c8a415' },
    { icon: BarChart3, value: '85%', label: 'Employment Rate', color: '#1a6b3c' },
  ]

  const climateData = [
    { icon: Thermometer, label: 'Avg Temperature', value: '16°C' },
    { icon: Droplets, label: 'Rainy Season', value: 'Jun — Sep' },
    { icon: Sun, label: 'Dry Season', value: 'Oct — May' },
    { icon: Mountain, label: 'Altitude', value: '2,470m' },
  ]

  return (
    <main>
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-1/4 w-32 h-32 rounded-full border border-white/20" />
          <div className="absolute bottom-8 right-1/3 w-48 h-48 rounded-full border border-white/20" />
          <div className="absolute top-8 right-16 w-20 h-20 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#c8a415] text-sm tracking-[0.2em] font-semibold mb-3 uppercase">Discover Our City</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-4">ABOUT DESSIE CITY</h1>
          <Separator className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">Home / About</p>
        </motion.div>
      </section>

      {/* City Profile */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] mb-6">CITY PROFILE</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dessie is a vibrant and strategically located city in the Amhara Region of Ethiopia, situated along the vital Addis Ababa–Debre Markos corridor. At an elevation of 2,470 meters above sea level, the city enjoys a pleasant subtropical highland climate that has made it a favored destination for trade, education, and administration.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in the late 19th century as a garrison town, Dessie has grown into one of Ethiopia&apos;s most important commercial and educational centers. The city serves as a gateway between the northern and central regions of the country, making it a hub for transportation, commerce, and cultural exchange.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Dessie is home to over 450,000 residents and continues to experience rapid urbanization. The city administration is committed to transforming Dessie into a model smart city, leveraging technology to improve governance, service delivery, and quality of life for all citizens.
              </p>
            </div>
            <motion.div variants={fadeInUp} className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image src="/dessie-city-hall.png" alt="Dessie City Hall" width={600} height={450} className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d4a28]/80 to-transparent p-6">
                <div className="flex items-center gap-2 text-white">
                  <Landmark className="w-5 h-5 text-[#c8a415]" />
                  <span className="font-semibold">Dessie City Administration</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-10">
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">KEY FACTS</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {keyFacts.map((fact, i) => (
                <motion.div key={fact.label} variants={fadeInUp}>
                  <Card className="stat-card bg-white border-0 shadow-md hover:shadow-lg transition-shadow p-0">
                    <CardContent className="p-5 flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${fact.color}15` }}>
                        <fact.icon className="w-6 h-6" style={{ color: fact.color }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{fact.label}</span>
                      <span className="text-lg md:text-xl font-bold text-foreground">{fact.value}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-10">
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">OUR FOUNDATIONS</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center mb-4">
                      <Eye className="w-7 h-7 text-[#1a6b3c]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0d4a28] mb-3 uppercase tracking-wide">Vision</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      To make Dessie a model smart city in Ethiopia, known for good governance, sustainable development, and quality of life.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#c8a415]/10 flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-[#c8a415]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0d4a28] mb-3 uppercase tracking-wide">Mission</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Provide efficient, transparent, and citizen-centered municipal services while promoting economic growth and social equity.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center mb-4">
                      <Award className="w-7 h-7 text-[#1a6b3c]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0d4a28] mb-3 uppercase tracking-wide">Core Values</h3>
                    <div className="space-y-3">
                      {coreValues.map((v) => (
                        <div key={v.label} className="flex items-center gap-3">
                          <v.icon className="w-4 h-4 text-[#1a6b3c] flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{v.label}</span>
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
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-12">
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">HISTORICAL MILESTONES</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#1a6b3c]/20 transform md:-translate-x-1/2" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} variants={fadeInUp} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <Card className="border-0 shadow-md">
                        <CardContent className="p-5">
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#1a6b3c] border-4 border-[#f8faf8] transform -translate-x-1/2 z-10 mt-2" />
                    <div className="hidden md:flex md:w-1/2 items-center justify-start">
                      {i % 2 === 0 ? <ChevronRight className="w-5 h-5 text-[#c8a415] -ml-1" /> : <ChevronRight className="w-5 h-5 text-[#c8a415] rotate-180 -mr-1" />}
                    </div>
                    <div className="md:hidden pl-10">
                      <Badge className="bg-[#1a6b3c] text-white font-bold text-base px-3 py-1 mb-2">{item.year}</Badge>
                      <Card className="border-0 shadow-md">
                        <CardContent className="p-4">
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Economy */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-10">
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">ECONOMY & COMMERCE</h2>
            </div>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              Dessie&apos;s economy is diverse and rapidly growing, driven by trade, agriculture, manufacturing, and services. As a major commercial crossroads, the city connects producers from the surrounding highlands with markets across Ethiopia. The city&apos;s strategic location on the Addis–Debre Markos corridor has attracted significant investment in retail, hospitality, and light industry.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-6">
              {economyStats.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <Card className="stat-card bg-gradient-to-br from-[#f8faf8] to-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                        <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-[#0d4a28] mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Geography & Climate */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] mb-6">GEOGRAPHY & CLIMATE</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nestled in the Ethiopian highlands of the South Wollo Zone, Dessie sits at an elevation of 2,470 meters above sea level. The city is surrounded by stunning mountain landscapes, fertile valleys, and the legendary Mount Tullu Dimtu to the east.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The subtropical highland climate provides mild temperatures year-round, with average highs of 22°C and lows of 8°C. The kiremt rainy season from June to September brings essential rainfall, while the dry season from October to May offers clear, sunny days ideal for outdoor activities and agricultural operations.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {climateData.map((item, i) => (
                  <motion.div key={item.label} variants={fadeInUp}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                      <CardContent className="p-5 text-center">
                        <item.icon className="w-8 h-8 text-[#1a6b3c] mx-auto mb-3" />
                        <div className="text-xl font-bold text-[#0d4a28] mb-1">{item.value}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
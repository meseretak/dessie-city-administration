"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, Cpu, ShieldCheck, Wifi, Activity, 
  MapPin, CheckCircle2, ChevronRight, Zap, 
  Smartphone, Database, Server, Camera
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { Button } from '@/components/ui/button';

export default function SmartCityPage() {
  const { lang } = useLang();
  const isAm = lang === 'am';

  const stats = [
    { value: '450K+', label: isAm ? 'ተጠቃሚዎች' : 'Connected Citizens', icon: Smartphone },
    { value: '40+', label: isAm ? 'ዲጂታል አገልግሎቶች' : 'Digital Services', icon: Monitor },
    { value: '24/7', label: isAm ? 'የደህንነት ክትትል' : 'Smart Surveillance', icon: Camera },
    { value: '99.9%', label: isAm ? 'የስርዓት አስተማማኝነት' : 'System Uptime', icon: Activity },
  ];

  const technologies = [
    {
      title: isAm ? 'ዘመናዊ የቁጥጥር ማዕከል (CCTV)' : 'Smart City Control Center',
      description: isAm 
        ? 'ለከተማዋ ደህንነት እና የትራፊክ ቁጥጥር የሚረዳ ዘመናዊ የካሜራ እና የመረጃ ማዕከል። የህብረተሰቡን ደህንነት ለማረጋገጥ 24 ሰዓት የሚሰራ።'
        : 'State-of-the-art surveillance and data center for city security, traffic management, and emergency response, operating 24/7 to ensure public safety.',
      image: '/smart-cctv.png',
      icon: Camera
    },
    {
      title: isAm ? 'ዘመናዊ የአገልግሎት መስጫ ማዕከል' : 'Smart Service Centers',
      description: isAm 
        ? 'ነዋሪዎች ፈጣን እና ቀልጣፋ አገልግሎት የሚያገኙበት በቴክኖሎጂ የታገዘ የአገልግሎት ማዕከል።'
        : 'Technology-driven citizen service centers providing fast, efficient, and transparent government services without the long queues.',
      image: '/smart-service-center.png',
      icon: Monitor
    },
    {
      title: isAm ? 'ዘመናዊ የስብሰባ አዳራሽ' : 'Digital Meeting & Conference Rooms',
      description: isAm 
        ? 'በከፍተኛ የቴክኖሎጂ ቁሶች የተገጠመለት፣ ለቪዲዮ ኮንፈረንስ እና ለውሳኔ አሰጣጥ የተዘጋጀ ዘመናዊ የስብሰባ ማዕከል።'
        : 'Equipped with high-tech communication tools, video conferencing systems, and digital boards for effective city administration and decision-making.',
      image: '/smart-meeting-room.jpg',
      icon: Database
    },
    {
      title: isAm ? 'ዘመናዊ መሠረተ ልማት እና የመዝናኛ ቦታዎች' : 'Smart Infrastructure & Recreation',
      description: isAm 
        ? 'ቴክኖሎጂን ከከተማ ውበት ጋር ያዋሃዱ ዘመናዊ ፏፏቴዎች፣ የህዝብ መዝናኛዎች እና የሜሶብ ህንፃዎች።'
        : 'Integrating technology with urban aesthetics, including smart water fountains, recreational parks, and the modern Mesob building complex.',
      image: '/smart-fountain.jpg',
      icon: Zap
    }
  ];

  const initiatives = [
    {
      title: isAm ? 'ዲጂታል የነዋሪዎች መታወቂያ' : 'Digital Citizen ID',
      desc: isAm ? 'ባዮሜትሪክን መሰረት ያደረገ እና ለሁሉም አገልግሎቶች የሚያገለግል ዲጂታል መታወቂያ።' : 'Biometric-based digital identification system streamlining access to all city services and local platforms.',
      icon: ShieldCheck
    },
    {
      title: isAm ? 'የመስመር ላይ ግብር ክፍያ' : 'Online Tax & Billing',
      desc: isAm ? 'ነዋሪዎች እና ነጋዴዎች ግብራቸውን በሞባይል ባንኪንግ በቀላሉ እንዲከፍሉ የሚያስችል ስርዓት።' : 'Seamless integration with local banks for mobile and online tax payments, reducing physical visits.',
      icon: Smartphone
    },
    {
      title: isAm ? 'የመሬት መረጃ ስርዓት (GIS)' : 'Smart GIS System',
      desc: isAm ? 'የመሬት አስተዳደርን ዲጂታል በማድረግ ህገወጥ ግንባታን መቆጣጠር እና ግልፅነትን ማስፈን።' : 'Advanced geographic information system for urban planning, land registration, and combating illegal construction.',
      icon: MapPin
    },
    {
      title: isAm ? 'ነፃ የህዝብ ዋይፋይ (Wi-Fi)' : 'Public Free Wi-Fi',
      desc: isAm ? 'በዋና ዋና የከተማዋ አደባባዮች እና መናፈሻዎች ነፃ የኢንተርኔት አገልግሎት መስጠት።' : 'Expanding internet access by providing free high-speed Wi-Fi in major public squares and recreational parks.',
      icon: Wifi
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/smart-mesob-building.png" 
            alt="Dessie Smart City" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4a28]/90 to-[#1a6b3c]/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Cpu className="w-5 h-5 text-[#c8a415]" />
              <span className="text-white font-semibold tracking-wider text-sm uppercase">
                {isAm ? 'ወደ ፊት መራመድ' : 'The Future of Urban Living'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {isAm ? 'ደሴ ስማርት ሲቲ' : 'Dessie Smart City'}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              {isAm 
                ? 'በቴክኖሎጂ የተደገፈ፣ ፈጣን አገልግሎት የሚሰጥ፣ ነዋሪውን ያማከለ እና ደህንነቱ የተጠበቀ ዘመናዊ ከተማን መገንባት። ቴክኖሎጂን በመጠቀም የህዝብን ህይወት ማቅለል።' 
                : 'Transforming Dessie into Ethiopia\'s leading digital hub. Leveraging IoT, data analytics, and modern infrastructure to create a connected, efficient, and citizen-centric urban environment.'}
            </p>
          </motion.div>
        </div>
        
        {/* Animated grid overlay for tech feel */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f0fdf4] text-[#1a6b3c] flex items-center justify-center mb-4 group-hover:bg-[#1a6b3c] group-hover:text-white transition-colors duration-300 shadow-sm border border-[#1a6b3c]/10">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 gov-section-title inline-block">
              {isAm ? 'የስማርት ሲቲ ቴክኖሎጂዎች' : 'Core Technologies & Infrastructure'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isAm 
                ? 'ከተማዋን ዘመናዊ ለማድረግ የተዘረጉ ቁልፍ የቴክኖሎጂ መሰረተ ልማቶች' 
                : 'Discover the advanced systems and physical infrastructure powering our digital transformation.'}
            </p>
          </div>

          <div className="space-y-16">
            {technologies.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1a6b3c]/20 to-transparent mix-blend-overlay z-10" />
                    <img 
                      src={tech.image} 
                      alt={tech.title}
                      className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 z-20 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                      <tech.icon className="w-6 h-6 text-[#1a6b3c]" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                    {tech.title}
                  </h3>
                  <div className="w-16 h-1 bg-[#c8a415] mb-6 rounded-full" />
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {tech.description}
                  </p>
                  <ul className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-[#1a6b3c] shrink-0" />
                        {isAm ? 'በከፍተኛ የቴክኖሎጂ ባለሙያዎች የሚመራ' : 'Driven by advanced AI and data analytics'}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Initiatives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a6b3c] mb-4">
              {isAm ? 'ቀጣይ ዲጂታል ዕቅዶች' : 'Digital Governance Initiatives'}
            </h2>
            <p className="text-gray-600">
              {isAm ? 'አገልግሎትን ለማሳለጥ በመተግበር ላይ ያሉ ፕሮጀክቶች' : 'Ongoing projects to digitize all aspects of city administration.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#c8a415]" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[400px] h-[400px] bg-[#c8a415]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Server className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isAm ? 'የስማርት ሲቲ አገልግሎቶችን ዛሬውኑ ይሞክሩ' : 'Experience the Smart City Today'}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            {isAm 
              ? 'ከቤትዎ ሳይወጡ ሁሉንም የከተማ አስተዳደር አገልግሎቶች በኦንላይን ያግኙ። ጊዜዎንና ጉልበትዎን ይቆጥቡ።' 
              : 'Access all Dessie City government services online. Save time, reduce paperwork, and enjoy seamless digital governance.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[#c8a415] hover:bg-[#a68710] text-white font-bold h-14 px-8 rounded-xl w-full sm:w-auto text-base shadow-lg">
              {isAm ? 'አገልግሎቶችን ጀምር' : 'Access E-Services'}
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-[#0d4a28] font-bold h-14 px-8 rounded-xl w-full sm:w-auto text-base">
              {isAm ? 'መተግበሪያ ያውርዱ' : 'Download Mobile App'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

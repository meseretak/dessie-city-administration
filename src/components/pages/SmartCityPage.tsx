'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, Cpu, ShieldCheck, Wifi, Activity, 
  MapPin, CheckCircle2, ChevronRight, Zap, 
  Smartphone, Database, Server, Camera, Sparkles
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

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
    <main className="min-h-screen bg-gray-50/50">
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
            <Cpu className="w-4 h-4 text-[#c8a415] animate-pulse" />
            <p className="text-[#c8a415] text-xs tracking-widest font-bold uppercase">{isAm ? 'ወደ ፊት መራመድ' : 'The Future of Urban Living'}</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">{isAm ? 'ደሴ ስማርት ሲቲ' : 'DESSIE SMART CITY'}</h1>
          <Separator className="w-20 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1 mb-4 border-0 rounded-full" />
          <p className="text-white/80 text-xs tracking-widest uppercase font-bold bg-black/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Home / Smart City</p>
        </motion.div>
      </section>

      {/* Intro section */}
      <section className="py-16 px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed bg-white p-8 rounded-3xl shadow-xl border border-gray-100 font-medium">
              {isAm 
                ? 'በቴክኖሎጂ የተደገፈ፣ ፈጣን አገልግሎት የሚሰጥ፣ ነዋሪውን ያማከለ እና ደህንነቱ የተጠበቀ ዘመናዊ ከተማን መገንባት። ቴክኖሎጂን በመጠቀም የህዝብን ህይወት ማቅለል።' 
                : 'Transforming Dessie into Ethiopia\'s leading digital hub. Leveraging IoT, data analytics, and modern infrastructure to create a connected, efficient, and citizen-centric urban environment.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white border-y border-gray-100 relative">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#1a6b3c]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -5 }}>
                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl hover:border-[#1a6b3c]/20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-white text-[#1a6b3c] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100 group-hover:border-[#1a6b3c]/30">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="text-center mb-16">
            <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Infrastructure</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28] mb-4">
              {isAm ? 'የስማርት ሲቲ ቴክኖሎጂዎች' : 'CORE TECHNOLOGIES'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              {isAm 
                ? 'ከተማዋን ዘመናዊ ለማድረግ የተዘረጉ ቁልፍ የቴክኖሎጂ መሰረተ ልማቶች' 
                : 'Discover the advanced systems and physical infrastructure powering our digital transformation.'}
            </p>
          </motion.div>

          <div className="space-y-12">
            {technologies.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0d4a28]/40 to-transparent mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
                    <img 
                      src={tech.image} 
                      alt={tech.title}
                      className="w-full h-[300px] md:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 z-20 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-500">
                      <tech.icon className="w-7 h-7 text-[#1a6b3c]" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-1/2 bg-white p-8 md:p-10 rounded-[2rem] shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug">
                    {tech.title}
                  </h3>
                  <div className="w-12 h-1 bg-[#c8a415] mb-4 rounded-full" />
                  <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">
                    {tech.description}
                  </p>
                  <ul className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                        <CheckCircle2 className="w-4 h-4 text-[#1a6b3c] shrink-0" />
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
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-2 block">Roadmap</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28] mb-4">
                {isAm ? 'ቀጣይ ዲጂታል ዕቅዶች' : 'DIGITAL INITIATIVES'}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto rounded-full mb-4" />
              <p className="text-gray-600 text-sm">
                {isAm ? 'አገልግሎትን ለማሳለጥ በመተግበር ላይ ያሉ ፕሮጀክቶች' : 'Ongoing projects to digitize all aspects of city administration.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {initiatives.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <div className="h-full bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-[#1a6b3c]/20 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#1a6b3c]/5 blur-xl group-hover:bg-[#1a6b3c]/10 transition-colors" />
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-[#1a6b3c]" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[300px] h-[300px] bg-[#c8a415]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Server className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {isAm ? 'የስማርት ሲቲ አገልግሎቶችን ዛሬውኑ ይሞክሩ' : 'Experience the Smart City Today'}
            </h2>
            <p className="text-white/90 text-sm md:text-base mb-8 max-w-2xl mx-auto">
              {isAm 
                ? 'ከቤትዎ ሳይወጡ ሁሉንም የከተማ አስተዳደር አገልግሎቶች በኦንላይን ያግኙ። ጊዜዎንና ጉልበትዎን ይቆጥቡ።' 
                : 'Access all Dessie City government services online. Save time, reduce paperwork, and enjoy seamless digital governance.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-[#c8a415] hover:bg-[#a68710] text-[#0d4a28] font-bold h-12 px-8 rounded-xl w-full sm:w-auto text-sm shadow-xl hover:scale-105 transition-transform">
                {isAm ? 'አገልግሎቶችን ጀምር' : 'Access E-Services'}
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-[#0d4a28] font-bold h-12 px-8 rounded-xl w-full sm:w-auto text-sm backdrop-blur-sm transition-colors">
                {isAm ? 'መተግበሪያ ያውርዱ' : 'Download Mobile App'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

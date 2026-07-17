'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Cpu, ShieldCheck, Wifi, Activity, 
  MapPin, CheckCircle2, ChevronRight, Zap, 
  Smartphone, Database, Server, Camera, Sparkles, FolderOpen, Calendar
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

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter to 'Smart City' or just take the first few
          const smartProjects = data.filter(p => p.category?.toLowerCase().includes('smart') || p.title?.toLowerCase().includes('smart') || p.category === 'Technology');
          setProjects(smartProjects.length > 0 ? smartProjects : data.slice(0, 4));
        }
      })
      .catch(console.error);
  }, []);

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

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* ═══ HERO: FUTURISTIC GLASSMORPHISM ═══ */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#0d4a28] via-[#10542e] to-[#0a351c] min-h-[70vh] flex items-center">
        {/* Animated Orbs & Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1a6b3c] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-[spin_20s_linear_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#c8a415] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6">
              <Sparkles className="w-4 h-4 text-[#c8a415] animate-pulse" />
              <span className="text-white/90 text-xs tracking-[0.2em] font-bold uppercase">{isAm ? 'የከተማዋ ዲጂታል ትራንስፎርሜሽን' : 'Digital Transformation'}</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e9] to-[#c8a415] tracking-tight mb-6 drop-shadow-sm">
              {isAm ? 'ደሴ ስማርት ሲቲ' : 'DESSIE SMART CITY'}
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed mb-10">
              {isAm 
                ? 'በቴክኖሎጂ የተደገፈ፣ ፈጣን አገልግሎት የሚሰጥ፣ ነዋሪውን ያማከለ እና ደህንነቱ የተጠበቀ ዘመናዊ ከተማን መገንባት።' 
                : 'Transforming Dessie into Ethiopia\'s leading digital hub. Leveraging IoT, data analytics, and modern infrastructure.'}
            </motion.p>
            
            {/* Glassmorphism Stats Cards */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-8">
              {stats.map((stat, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/5 rounded-2xl blur-sm transition-all group-hover:blur-md" />
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-[#c8a415] mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black text-white mb-1 drop-shadow-md">{stat.value}</h3>
                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DYNAMIC ONGOING PROJECTS (Glassmorphism) ═══ */}
      <section className="py-10 relative overflow-hidden bg-[#0a1f12]">
        {/* Deep background for contrast */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,#1a6b3c_0%,transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="text-center mb-16">
            <span className="text-[#c8a415] font-bold tracking-[0.2em] text-xs mb-3 block">Digital Roadmap</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              {isAm ? 'ቀጣይ ዲጂታል ፕሮጀክቶች' : 'ONGOING INITIATIVES'}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-[#c8a415] to-transparent mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {projects.map((project, idx) => (
                <motion.div key={project.id || idx} variants={fadeInUp} whileHover={{ y: -8 }}>
                  <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#c8a415]/50 rounded-3xl p-8 transition-all duration-300 group flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="px-3 py-1 bg-[#c8a415]/20 text-[#c8a415] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#c8a415]/30">
                        {project.status || 'In Progress'}
                      </div>
                    </div>
                    
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a6b3c] to-[#0d4a28] flex items-center justify-center mb-6 shadow-lg border border-white/10 group-hover:scale-110 transition-transform">
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c8a415] transition-colors">{project.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {project.description}
                    </p>
                    
                    {project.endDate && (
                      <div className="flex items-center gap-2 text-xs text-white/40 mt-auto pt-4 border-t border-white/5">
                        <Calendar className="w-4 h-4" />
                        <span>Target: {new Date(project.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {projects.length === 0 && (
                <motion.div variants={fadeInUp} className="col-span-full text-center py-12 text-white/50">
                  <p>No active smart city projects found in the database.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ CORE TECHNOLOGIES (Clean & Modern) ═══ */}
      <section className="py-10 bg-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="text-center mb-16">
            <span className="text-[#1a6b3c] font-bold tracking-widest uppercase text-xs mb-2 block">Infrastructure</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d4a28] mb-4">
              {isAm ? 'የስማርት ሲቲ ቴክኖሎጂዎች' : 'CORE TECHNOLOGIES'}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-20">
            {technologies.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-[#1a6b3c] rounded-[2.5rem] transform translate-x-4 translate-y-4 opacity-10" />
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">
                    <img 
                      src={tech.image} 
                      alt={tech.title}
                      className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* Floating Icon */}
                  <div className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-10 w-20 h-20 rounded-2xl bg-white shadow-2xl border-4 border-[#f8faf8] flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform z-10">
                    <tech.icon className="w-10 h-10 text-[#c8a415]" />
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a6b3c]/10 text-[#1a6b3c] mb-6">
                    <span className="font-black text-xl">0{idx + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28] mb-6 leading-tight">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {tech.description}
                  </p>
                  <ul className="space-y-4">
                    {[
                      isAm ? 'በከፍተኛ የቴክኖሎጂ ባለሙያዎች የሚመራ' : 'Driven by advanced AI and data analytics',
                      isAm ? '24/7 ያልተቋረጠ አገልግሎት' : '24/7 Uninterrupted operation',
                      isAm ? 'ደህንነቱ የተጠበቀ መረጃ' : 'Secure and encrypted data flow'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-gray-800 font-bold">
                        <div className="w-6 h-6 rounded-full bg-[#1a6b3c]/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[#1a6b3c]" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION (Glassmorphism) ═══ */}
      <section className="py-10 relative overflow-hidden bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c]">
        {/* Glassmorphism elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[400px] h-[400px] bg-[#c8a415]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-2xl">
              <Server className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-md">
              {isAm ? 'የስማርት ሲቲ አገልግሎቶችን ዛሬውኑ ይሞክሩ' : 'Experience the Smart City Today'}
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              {isAm 
                ? 'ከቤትዎ ሳይወጡ ሁሉንም የከተማ አስተዳደር አገልግሎቶች በኦንላይን ያግኙ። ጊዜዎንና ጉልበትዎን ይቆጥቡ።' 
                : 'Access all Dessie City government services online. Save time, reduce paperwork, and enjoy seamless digital governance.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button size="lg" className="bg-[#c8a415] hover:bg-white text-[#0d4a28] font-bold h-14 px-10 rounded-2xl w-full sm:w-auto text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                {isAm ? 'አገልግሎቶችን ጀምር' : 'Access E-Services'}
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white font-bold h-14 px-10 rounded-2xl w-full sm:w-auto text-base backdrop-blur-md transition-all">
                {isAm ? 'መተግበሪያ ያውርዱ' : 'Download Mobile App'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

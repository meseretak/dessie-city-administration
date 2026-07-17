'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Cpu, ShieldCheck, Wifi, Activity, 
  MapPin, CheckCircle2, ChevronRight, Zap, 
  Smartphone, Database, Server, Camera, Sparkles, FolderOpen, Calendar,
  Globe, LineChart, Users, Building, Fingerprint
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { Button } from '@/components/ui/button';

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
          const smartProjects = data.filter(p => p.category?.toLowerCase().includes('smart') || p.title?.toLowerCase().includes('smart') || p.category === 'Technology');
          setProjects(smartProjects.length > 0 ? smartProjects : data.slice(0, 4));
        }
      })
      .catch(console.error);
  }, []);

  const stats = [
    { value: '450K+', label: isAm ? 'ተጠቃሚዎች' : 'Connected Citizens', icon: Users },
    { value: '120+', label: isAm ? 'የካሜራ ቁጥጥር' : 'Smart Cameras', icon: Camera },
    { value: '50km', label: isAm ? 'የፋይበር መስመር' : 'Fiber Optics Network', icon: Globe },
    { value: '85%', label: isAm ? 'የአገልግሎት ፍጥነት' : 'Efficiency Increase', icon: LineChart },
  ];

  const technologies = [
    {
      title: isAm ? 'የባህልና ቴክኖሎጂ ውህደት (የመሶብ ማዕከል)' : 'Tradition Meets Tech: Smart Mesob Complex',
      description: isAm 
        ? 'የደሴን ባህላዊ የመሶብ ቅርጽ ከዘመናዊ ቴክኖሎጂ ጋር በማዋሃድ የተገነባው ማዕከል የከተማዋን ውበት ከመጠበቅ ባለፈ ሙሉ በሙሉ በስማርት ቴክኖሎጂ የሚመራ ነው።'
        : 'Blending Dessie\'s rich cultural heritage with cutting-edge technology. The iconic Mesob-inspired architecture houses state-of-the-art IoT sensors, automated climate control, and digital citizen interfaces.',
      image: '/smart-fountain.jpg', // Placeholder for Mesob/Culture image
      icon: Building,
      dataPoints: ['IoT Climate Control', 'Automated Lighting', 'Digital Information Kiosks']
    },
    {
      title: isAm ? 'የማዕከላዊ ዳታ እና ደህንነት ቁጥጥር' : 'Centralized Data & Security Hub',
      description: isAm 
        ? 'የከተማዋን ደህንነት እና የትራፊክ ፍሰት በ24 ሰዓት ካሜራዎች እና በአርቴፊሻል ኢንተለጀንስ የሚቆጣጠር ዘመናዊ ማዕከል።'
        : 'A 24/7 centralized command center utilizing AI-powered analytics to monitor traffic flow, public safety, and emergency response across Dessie city.',
      image: '/smart-cctv.png',
      icon: ShieldCheck,
      dataPoints: ['AI Traffic Analytics', 'Facial Recognition API', 'Real-time Emergency Dispatch']
    },
    {
      title: isAm ? 'ዲጂታል የነዋሪዎች አገልግሎት ማዕከል' : 'Digital E-Governance Services',
      description: isAm 
        ? 'ማንኛውንም የመንግስት አገልግሎት ወረቀት አልባ በሆነ መንገድ በስልክዎ ወይም በኮምፒውተርዎ በፍጥነት ያግኙ።'
        : 'Paperless, transparent, and ultra-fast citizen services. From biometric ID issuance to digital tax payments and automated building permit approvals.',
      image: '/smart-service-center.png',
      icon: Fingerprint,
      dataPoints: ['Biometric Verification', 'Zero-paper Workflows', 'Mobile Payment Integration']
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* ═══ HERO SECTION: Modern, Clean, Minimalist ═══ */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        {/* Subtle high-tech background pattern instead of heavy green */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#c8a415]/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
              <Activity className="w-4 h-4 text-[#c8a415]" />
              <span className="text-gray-800 text-[11px] font-bold tracking-[0.2em] uppercase">
                {isAm ? 'የደሴ ዲጂታል አብዮት' : 'Dessie Digital Revolution'}
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6">
              {isAm ? 'ደሴ ' : 'DESSIE '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a6b3c] to-[#c8a415]">
                {isAm ? 'ስማርት ሲቲ' : 'SMART CITY'}
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 max-w-3xl font-medium leading-relaxed mb-12">
              {isAm 
                ? 'በዘመናዊ ቴክኖሎጂ የተደገፈች፣ ነዋሪዎቿን በፍጥነት የምታገለግል እና ባህላዊ እሴቶቿን (እንደ መሶብ) ከዲጂታል ዓለም ጋር ያዋሃደች ከተማ።' 
                : 'Integrating cutting-edge IoT, AI, and big data with our rich cultural heritage (Mesob). Transforming Dessie into an efficient, safe, and highly connected metropolis.'}
            </motion.p>
            
            {/* Modern Data Stats Grid */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {stats.map((stat, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="relative group">
                  <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-full bg-[#f8faf8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <stat.icon className="w-6 h-6 text-[#1a6b3c]" />
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">{stat.value}</h3>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ═══ CORE TECHNOLOGIES & TRADITION BLEND ═══ */}
      <section className="py-24 bg-[#fafafa] relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {isAm ? 'ቴክኖሎጂ እና ባህል (መሶብ)' : 'Technology Meets Tradition'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {isAm 
                ? 'የከተማችንን ባህላዊ ውበት ጠብቀን በዘመናዊ መረጃ እና ግንኙነት (Data & Connectivity) አጠናክረነዋል።'
                : 'Preserving our aesthetic heritage while deploying advanced data networks, surveillance, and e-governance systems.'}
            </p>
          </motion.div>

          <div className="space-y-24">
            {technologies.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
              >
                {/* Image Side (Clean & Sharp) */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c8a415]/20 to-[#1a6b3c]/20 rounded-[2rem] transform translate-x-3 translate-y-3 -z-10 transition-transform group-hover:translate-x-5 group-hover:translate-y-5" />
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-white p-2">
                    <img 
                      src={tech.image} 
                      alt={tech.title}
                      className="w-full h-[350px] md:h-[400px] object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Floating Metric Badge */}
                  <div className="absolute top-8 -right-6 lg:-right-8 bg-white shadow-xl rounded-2xl p-4 border border-gray-100 flex items-center gap-4 animate-bounce-slow">
                    <div className="w-10 h-10 rounded-full bg-[#fcf9ee] flex items-center justify-center">
                      <tech.icon className="w-5 h-5 text-[#c8a415]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">System Status</p>
                      <p className="text-sm font-black text-[#1a6b3c]">Online / Active</p>
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest mb-6">
                    Integration 0{idx + 1}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {tech.description}
                  </p>
                  
                  {/* Tech Data Points Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tech.dataPoints.map((dp, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-[#f0fdf4] flex items-center justify-center shrink-0">
                          <Database className="w-4 h-4 text-[#1a6b3c]" />
                        </div>
                        <span className="text-sm font-bold text-gray-800">{dp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DYNAMIC ONGOING PROJECTS (Clean Cards) ═══ */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {isAm ? 'የስማርት ሲቲ ፕሮጀክቶች መረጃ' : 'Live Project Data'}
              </h2>
              <p className="text-gray-500 text-lg max-w-xl">
                {isAm ? 'በአሁኑ ሰዓት በመገንባት ላይ ያሉ ዲጂታል መሠረተ ልማቶች።' : 'Real-time tracking of ongoing smart infrastructure deployments across the city.'}
              </p>
            </div>
            <Button className="bg-gray-900 hover:bg-[#c8a415] text-white rounded-full px-8 shrink-0">
              {isAm ? 'ሁሉንም መረጃ እይ' : 'View Data Dashboard'} <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {projects.map((project, idx) => (
                <motion.div key={project.id || idx} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <div className="h-full bg-white border border-gray-200 hover:border-[#1a6b3c]/30 hover:shadow-xl rounded-3xl p-8 transition-all duration-300 group flex flex-col relative">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-[#1a6b3c] transition-colors">
                        <Cpu className="w-6 h-6 text-gray-400 group-hover:text-white" />
                      </div>
                      <div className="px-3 py-1 bg-[#f0fdf4] text-[#1a6b3c] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#bbf7d0]">
                        {project.status || 'Active Deployment'}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>
                    
                    {project.endDate && (
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mt-auto pt-5 border-t border-gray-100">
                        <Calendar className="w-4 h-4" />
                        <span>Est. Completion: {new Date(project.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {projects.length === 0 && (
                <motion.div variants={fadeInUp} className="col-span-full text-center py-12 text-gray-400">
                  <p>Initializing smart city live data stream...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION (Minimalist High-Tech) ═══ */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              {isAm ? 'ወደ ስማርት ሲቲው ይግቡ' : 'Connect to the Smart City'}
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {isAm 
                ? 'በዲጂታል አለም የደሴ ከተማን መረጃዎች በፍጥነት ያግኙ።' 
                : 'Access real-time data, fast-track your applications, and engage with your digital government.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white hover:bg-[#c8a415] text-gray-900 hover:text-white font-black h-14 px-10 rounded-full w-full sm:w-auto text-base shadow-xl transition-all">
                {isAm ? 'ዲጂታል መታወቂያ ያውጡ' : 'Create Digital ID'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

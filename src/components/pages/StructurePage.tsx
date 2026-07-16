'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import {
  Landmark, UserCog, Building, Users, FileCheck, Receipt, GraduationCap,
  HardHat, Stethoscope, Briefcase, HeartHandshake, Scale, Building2,
  Bus, Zap, Leaf, Music
} from 'lucide-react'
import { useLang } from '@/lib/LangContext'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const mayorInfo = {
  name: 'Samuel Molalign Desalegn',
  title: 'Mayor of Dessie City',
  photo: '/mayor-photo.png',
  bio: 'Brings over two decades of public service experience to the mayor\'s office. A dedicated leader and a native of Dessie, he has held various leadership positions in regional administration. His administration focuses on smart city transformation, youth empowerment, sustainable urban development, and transparent governance.',
}

const deputyInfo = {
  name: 'Ato Getachew Hailu',
  title: 'Deputy Mayor',
  photo: '/official-deputy.png',
  bio: 'Oversees cross-departmental coordination and represents the city in regional government affairs. Assists the Mayor in strategic decision-making and ensures implementation of council resolutions across all 12 kebeles.',
}

const orgStructure = {
  mayor: { title: 'Mayor', icon: Landmark, name: mayorInfo.name, bio: mayorInfo.bio, photo: mayorInfo.photo },
  deputy: { title: 'Deputy Mayor', icon: UserCog, name: deputyInfo.name, bio: deputyInfo.bio, photo: deputyInfo.photo },
  offices: [
    { title: "Mayor's Office", icon: Building, count: 15, desc: 'Executive support, protocol, communications, and strategic planning' },
    { title: 'City Council', icon: Users, count: 47, desc: 'Legislative body with elected representatives from all kebeles' },
    { title: "City Manager's Office", icon: FileCheck, count: 25, desc: 'Operational coordination, performance monitoring, and inter-departmental liaison' },
  ],
  departments: [
    { title: 'Finance & Revenue', icon: Receipt, head: 'Ato Abebe Kebede', staff: 120 },
    { title: 'Education', icon: GraduationCap, head: 'W/ro Hiwot Alemu', staff: 85 },
    { title: 'Infrastructure', icon: HardHat, head: 'Ato Dawit Assefa', staff: 200 },
    { title: 'Health', icon: Stethoscope, head: 'W/ro Mekdes Tadesse', staff: 150 },
    { title: 'Trade & Industry', icon: Briefcase, head: 'Ato Tadesse Girma', staff: 60 },
    { title: 'Social Affairs', icon: HeartHandshake, head: 'W/ro Selamawit Bekele', staff: 75 },
    { title: 'Legal Affairs', icon: Scale, head: 'Ato Fitsum Belete', staff: 35 },
    { title: 'Urban Planning', icon: Building2, head: 'W/ro Nardos Tadesse', staff: 45 },
    { title: 'Transport', icon: Bus, head: 'Ato Henok Mulugeta', staff: 90 },
    { title: 'Water & Energy', icon: Zap, head: 'W/ro Bethlehem Hailu', staff: 110 },
    { title: 'Agriculture', icon: Leaf, head: 'Ato Mulugeta Alemayehu', staff: 40 },
    { title: 'Culture & Tourism', icon: Music, head: 'W/ro Sara Hailu', staff: 30 },
  ],
  subCities: [
    { name: 'Sub-City 01 (Arada)', population: '45,000', kebeles: 4 },
    { name: 'Sub-City 02 (Piazza)', population: '52,000', kebeles: 4 },
    { name: 'Sub-City 03 (Mekelle Sefer)', population: '38,000', kebeles: 4 },
    { name: 'Sub-City 04 (Gofa Mazoria)', population: '48,000', kebeles: 4 },
    { name: 'Sub-City 05 (Tabor)', population: '42,000', kebeles: 4 },
    { name: 'Sub-City 06 (Bole)', population: '55,000', kebeles: 4 },
    { name: 'Sub-City 07 (Kazanchis)', population: '40,000', kebeles: 4 },
    { name: 'Sub-City 08 (Gulele)', population: '35,000', kebeles: 4 },
  ]
}

function OrgNode({ icon: Icon, title, subtitle, color = '#0d4a28', size = 'md', highlight = false }: {
  icon: any; title: string; subtitle?: string; color?: string; size?: 'sm' | 'md' | 'lg'; highlight?: boolean;
}) {
  const sizes = { sm: 'px-3 py-2', md: 'px-4 py-3', lg: 'px-6 py-4' }
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }
  const titleSizes = { sm: 'text-[10px]', md: 'text-xs', lg: 'text-sm' }
  return (
    <div
      className={`${sizes[size]} rounded-xl border-2 ${highlight ? 'border-[#c8a415] bg-[#c8a415]/5 shadow-md shadow-[#c8a415]/10' : `border-[#e2e8e0] bg-white`} transition-all flex items-center gap-2.5 w-full`}
    >
      <div className={`w-8 h-8 ${size === 'lg' ? 'w-10 h-10' : ''} rounded-lg flex items-center justify-center shrink-0`} style={{ backgroundColor: `${color}15` }}>
        <Icon className={`${iconSizes[size]}`} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className={`font-bold ${titleSizes[size]} ${highlight ? 'text-[#0d4a28]' : 'text-[#1a1a1a]'} truncate`}>{title}</p>
        {subtitle && <p className="text-[10px] text-[#6b7280] truncate">{subtitle}</p>}
      </div>
    </div>
  )
}

function VLine() {
  return <div className="w-px h-6 bg-[#1a6b3c]/20 mx-auto" />
}

export default function StructurePage() {
  const { lang } = useLang()
  const isAm = lang === 'am'

  return (
    <main className="bg-[#f8faf8] min-h-screen pb-20">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-1/4 w-40 h-40 rounded-full border border-white/20" />
          <div className="absolute bottom-6 left-1/3 w-24 h-24 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#c8a415] text-sm tracking-[0.2em] font-semibold mb-3 uppercase">{isAm ? 'አመራር' : 'Leadership'}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-4">{isAm ? 'አስተዳደራዊ መዋቅር' : 'ADMINISTRATION & STRUCTURE'}</h1>
          <div className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">{isAm ? 'ዋና ገጽ / መዋቅር' : 'Home / Structure'}</p>
        </motion.div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge className="bg-[#0d4a28] text-white mb-3 text-xs tracking-wider font-semibold px-3 py-1">GOVERNANCE</Badge>
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">ORGANIZATIONAL STRUCTURE</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">{isAm ? 'የደሴ ከተማ አስተዳደር ሙሉ ድርጅታዊ መዋቅር' : 'The complete organizational structure of Dessie City Administration'}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              {/* Level 1: Mayor */}
              <div className="w-full max-w-xs">
                <OrgNode icon={orgStructure.mayor.icon} title={orgStructure.mayor.title} subtitle={orgStructure.mayor.name} color="#0d4a28" size="lg" highlight />
              </div>
              <VLine />
              {/* Level 2: Deputy */}
              <div className="w-full max-w-xs">
                <OrgNode icon={orgStructure.deputy.icon} title={orgStructure.deputy.title} subtitle={orgStructure.deputy.name} color="#1a6b3c" size="md" />
              </div>
              <VLine />
              {/* Level 3: Three Offices */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-3xl">
                {orgStructure.offices.map((office) => (
                  <div key={office.title} className="flex-1">
                    <OrgNode icon={office.icon} title={office.title} subtitle={`${office.count} staff`} color="#1a6b3c" size="sm" />
                  </div>
                ))}
              </div>
              <VLine />
              {/* Level 4 Label */}
              <div className="flex items-center gap-3 my-2">
                <div className="h-px w-8 bg-[#1a6b3c]/20" />
                <span className="text-[10px] font-bold text-[#1a6b3c] tracking-[0.2em] uppercase">Municipal Departments</span>
                <div className="h-px w-8 bg-[#1a6b3c]/20" />
              </div>
              {/* Level 4: Departments */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {orgStructure.departments.map((dept, i) => {
                  const Icon = dept.icon
                  return (
                    <motion.div
                      key={dept.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                    >
                      <OrgNode
                        icon={Icon}
                        title={dept.title}
                        subtitle={dept.head}
                        color={i % 2 === 0 ? '#1a6b3c' : '#c8a415'}
                        size="sm"
                      />
                    </motion.div>
                  )
                })}
              </div>
              <VLine />
              {/* Level 5 Label */}
              <div className="flex items-center gap-3 my-2">
                <div className="h-px w-8 bg-[#1a6b3c]/20" />
                <span className="text-[10px] font-bold text-[#1a6b3c] tracking-[0.2em] uppercase">Sub-Cities & Kebeles</span>
                <div className="h-px w-8 bg-[#1a6b3c]/20" />
              </div>
              {/* Level 5: Sub-Cities */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                {orgStructure.subCities.map((sc, i) => (
                  <motion.div
                    key={sc.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="px-3 py-2.5 rounded-xl border border-[#e2e8e0] bg-white hover:shadow-sm transition-all text-center"
                  >
                    <p className="font-bold text-[10px] text-[#1a1a1a] leading-tight">{sc.name}</p>
                    <p className="text-[9px] text-[#6b7280] mt-1">{sc.population} pop.</p>
                    <p className="text-[9px] text-[#6b7280]">{sc.kebeles} kebeles</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

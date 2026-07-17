'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import {
  Landmark, UserCog, Building, Users, FileCheck, Receipt, GraduationCap,
  HardHat, Stethoscope, Briefcase, HeartHandshake, Scale, Building2,
  Bus, Zap, Leaf, Music, Map, Coins, Trophy, Megaphone, PersonStanding
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

const structureData = {
  top: { title: 'City Administration Council', icon: Building2 },
  mayor: { title: 'Mayor', icon: Landmark },
  committee: { title: 'City Mayoral Committee', icon: Users },
  offices: [
    { title: 'Finance', icon: Receipt },
    { title: 'Agriculture', icon: Leaf },
    { title: 'Justice', icon: Scale },
    { title: 'Trade', icon: Briefcase },
    { title: 'Investment', icon: Building },
    { title: 'Municipality Office', icon: Building2 },
    { title: 'Land', icon: Map },
    { title: 'Education', icon: GraduationCap },
    { title: 'Health', icon: Stethoscope },
    { title: 'Women', icon: PersonStanding },
    { title: 'Culture', icon: Music },
    { title: 'Job Creation', icon: HardHat },
    { title: 'Revenue', icon: Coins },
    { title: 'Youth & Sports', icon: Trophy },
    { title: 'Communication', icon: Megaphone }
  ],
  subCityStructure: { title: 'Sub-City Structure', icon: Building2 },
  cityCouncil: { title: 'City Council', icon: Users },
  subCities: [
    { name: 'Buanbua Wuha Subcity', kebeles: 5 },
    { name: 'Arada Subcity', kebeles: 5 },
    { name: 'Segno Gebeya Subcity', kebeles: 5 },
    { name: 'Hote Subcity', kebeles: 5 },
    { name: 'Menafesha Subcity', kebeles: 6 },
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
      className={`${sizes[size]} rounded-xl border-2 ${highlight ? 'border-[#0d4a28] bg-[#0d4a28]/5 shadow-md shadow-[#0d4a28]/10' : `border-[#e2e8e0] bg-[#e8efec]`} transition-all flex flex-col items-center text-center justify-center gap-2 w-full h-full min-h-[80px]`}
    >
      {Icon && (
        <div className={`w-8 h-8 ${size === 'lg' ? 'w-10 h-10' : ''} rounded-lg flex items-center justify-center shrink-0`} style={{ backgroundColor: `${color}15` }}>
          <Icon className={`${iconSizes[size]}`} style={{ color }} />
        </div>
      )}
      <div className="min-w-0 w-full">
        <p className={`font-bold ${titleSizes[size]} ${highlight ? 'text-[#0d4a28]' : 'text-[#1a1a1a]'} leading-tight`}>{title}</p>
        {subtitle && <p className="text-[10px] text-[#6b7280] truncate mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

function VLine() {
  return <div className="w-px h-8 bg-[#1a6b3c]/30 mx-auto" />
}

export default function StructurePage() {
  const { lang } = useLang()
  const isAm = lang === 'am'

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-1/4 w-40 h-40 rounded-full border border-white/20" />
          <div className="absolute bottom-6 left-1/3 w-24 h-24 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#c8a415] text-sm tracking-[0.2em] font-semibold mb-3 uppercase">{isAm ? 'አመራር' : 'Leadership'}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-4">{isAm ? 'አስተዳደራዊ መዋቅር' : 'ADMINISTRATION STRUCTURE'}</h1>
          <div className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">{isAm ? 'ዋና ገጽ / መዋቅር' : 'Home / Structure'}</p>
        </motion.div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge className="bg-[#0d4a28] text-white mb-3 text-xs tracking-wider font-semibold px-3 py-1">GOVERNANCE</Badge>
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block block">ORGANIZATIONAL STRUCTURE</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">{isAm ? 'የደሴ ከተማ አስተዳደር ሙሉ ድርጅታዊ መዋቅር' : 'The complete organizational structure of Dessie City Administration'}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              {/* Top Level */}
              <div className="w-full max-w-sm">
                <div className="px-6 py-4 rounded-xl border-2 border-[#0d4a28] bg-[#0d4a28] text-white shadow-lg shadow-[#0d4a28]/20 transition-all flex flex-col items-center text-center justify-center gap-2 w-full min-h-[80px]">
                  <p className="font-extrabold text-sm md:text-base leading-tight uppercase tracking-wide">{structureData.top.title}</p>
                </div>
              </div>
              <VLine />
              
              {/* Mayor */}
              <div className="w-full max-w-[250px]">
                <div className="px-6 py-4 rounded-xl border-2 border-[#c8a415] bg-[#e8efec] transition-all flex flex-col items-center text-center justify-center gap-2 w-full min-h-[70px]">
                  <p className="font-bold text-sm text-[#0d4a28] leading-tight uppercase">{structureData.mayor.title}</p>
                </div>
              </div>
              <VLine />

              {/* City Mayoral Committee */}
              <div className="w-full max-w-[300px] relative">
                <div className="px-6 py-4 rounded-xl border-2 border-[#1a6b3c]/30 bg-[#e8efec] transition-all flex flex-col items-center text-center justify-center gap-2 w-full min-h-[70px]">
                  <p className="font-bold text-sm text-[#1a1a1a] leading-tight">{structureData.committee.title}</p>
                </div>
                {/* Horizontal connection line for the grid below */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full md:w-[800px] max-w-[90vw] h-px bg-[#1a6b3c]/30 hidden sm:block" />
              </div>
              <VLine />

              {/* Offices Grid */}
              <div className="w-full relative mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3 mt-4 relative z-10">
                  {structureData.offices.map((office, i) => (
                    <motion.div
                      key={office.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                    >
                      <OrgNode
                        icon={null}
                        title={office.title}
                        color="#1a6b3c"
                        size="sm"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Huge spacing before Sub-City section to match the chart separation */}
              <div className="h-16 w-px bg-transparent mx-auto" />

              {/* Sub-City Structure Header */}
              <div className="w-full max-w-sm">
                <div className="px-6 py-4 rounded-xl border-2 border-[#0d4a28] bg-[#0d4a28] text-white shadow-lg shadow-[#0d4a28]/20 transition-all flex flex-col items-center text-center justify-center gap-2 w-full min-h-[80px]">
                  <p className="font-extrabold text-sm md:text-base leading-tight uppercase tracking-wide">{structureData.subCityStructure.title}</p>
                </div>
              </div>
              <VLine />

              {/* City Council */}
              <div className="w-full max-w-[250px] relative">
                <div className="px-6 py-4 rounded-xl border-2 border-[#1a6b3c]/30 bg-[#e8efec] transition-all flex flex-col items-center text-center justify-center gap-2 w-full min-h-[70px]">
                  <p className="font-bold text-sm text-[#1a1a1a] leading-tight">{structureData.cityCouncil.title}</p>
                </div>
                {/* Horizontal connection line for the grid below */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full md:w-[600px] max-w-[90vw] h-px bg-[#1a6b3c]/30 hidden sm:block" />
              </div>
              <VLine />

              {/* Sub-Cities Grid */}
              <div className="w-full flex justify-center mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4 w-full max-w-5xl relative z-10">
                  {structureData.subCities.map((sc, i) => (
                    <motion.div
                      key={sc.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="rounded-xl border border-[#e2e8e0] bg-[#e8efec] overflow-hidden hover:shadow-md transition-all text-center flex flex-col h-full"
                    >
                      <div className="bg-[#1a6b3c]/10 py-4 px-3 flex-grow flex items-center justify-center border-b border-[#e2e8e0]">
                        <p className="font-extrabold text-[11px] text-[#0d4a28] leading-snug">{sc.name}</p>
                      </div>
                      <div className="py-3 bg-white">
                        <p className="text-[11px] font-semibold text-[#6b7280]">{sc.kebeles} Kebeles</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

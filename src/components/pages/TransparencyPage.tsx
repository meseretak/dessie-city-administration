'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import {
  TrendingUp,
  ThumbsUp,
  PieChart,
  CheckCircle,
  DollarSign,
  Users,
  Clock,
  MessageSquare,
  FileText,
  Download,
  Database,
  ShieldCheck,
  Eye,
  UsersRound,
  Quote,
  BarChart3,
  Building2,
  Heart,
  Briefcase,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  BookOpen,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
}

const commitments = [
  { icon: Eye, label: 'Open Data', desc: 'All non-sensitive data is freely accessible to the public.' },
  { icon: ShieldCheck, label: 'Public Accountability', desc: 'Regular audits and performance reviews published publicly.' },
  { icon: UsersRound, label: 'Citizen Participation', desc: 'Community involvement in planning and decision-making processes.' },
]

const budgetBreakdown = [
  { label: 'Infrastructure', pct: 35, color: 'bg-[#1a6b3c]' },
  { label: 'Social Services', pct: 25, color: 'bg-[#c8a415]' },
  { label: 'Administration', pct: 15, color: 'bg-[#0d4a28]' },
  { label: 'Economic Dev', pct: 15, color: 'bg-emerald-400' },
  { label: 'Other', pct: 10, color: 'bg-gray-400' },
]

const reports = [
  { title: 'Annual Performance Report 2024', year: '2024', size: '4.2 MB' },
  { title: 'Financial Audit Report 2024', year: '2024', size: '2.8 MB' },
  { title: 'Citizen Satisfaction Survey', year: '2024', size: '1.5 MB' },
  { title: 'Development Plan Progress', year: '2024', size: '3.1 MB' },
]

const procurements = [
  { title: 'Road Construction Equipment', ref: 'PROC/2025/001', value: 'ETB 15M', status: 'Awarded', date: '2025-01-15' },
  { title: 'Office Furniture Supply', ref: 'PROC/2025/002', value: 'ETB 3.2M', status: 'Open', date: '2025-02-01' },
  { title: 'IT Infrastructure Upgrade', ref: 'PROC/2025/003', value: 'ETB 8.5M', status: 'Open', date: '2025-02-10' },
  { title: 'Water Pipeline Materials', ref: 'PROC/2025/004', value: 'ETB 12M', status: 'Evaluation', date: '2025-01-28' },
  { title: 'Street Lighting Contract', ref: 'PROC/2025/005', value: 'ETB 5.7M', status: 'Awarded', date: '2025-01-05' },
  { title: 'Waste Collection Vehicles', ref: 'PROC/2025/006', value: 'ETB 22M', status: 'Open', date: '2025-02-15' },
]

const kpis = [
  { icon: TrendingUp, label: 'Service Delivery Rate', value: '92%', trend: 'up' as const },
  { icon: ThumbsUp, label: 'Citizen Satisfaction', value: '87%', trend: 'up' as const },
  { icon: PieChart, label: 'Budget Utilization', value: '78%', trend: 'up' as const },
  { icon: CheckCircle, label: 'Project Completion', value: '85%', trend: 'up' as const },
  { icon: DollarSign, label: 'Revenue Collection', value: '95%', trend: 'up' as const },
  { icon: Users, label: 'Employee Performance', value: '88%', trend: 'up' as const },
  { icon: Clock, label: 'Response Time', value: '2.3 days', trend: 'down' as const },
  { icon: MessageSquare, label: 'Complaint Resolution', value: '94%', trend: 'up' as const },
]

const dataCategories = [
  { icon: UsersRound, title: 'Population Data', desc: 'Demographics, growth trends, and census data for Dessie and surrounding areas.', color: 'text-[#1a6b3c]', bg: 'bg-[#1a6b3c]/10' },
  { icon: DollarSign, title: 'Budget Data', desc: 'Detailed budget allocations, expenditures, and financial statements.', color: 'text-[#c8a415]', bg: 'bg-[#c8a415]/10' },
  { icon: Building2, title: 'Infrastructure Data', desc: 'Road networks, utilities, public facilities, and asset inventories.', color: 'text-[#0d4a28]', bg: 'bg-[#0d4a28]/10' },
  { icon: Heart, title: 'Service Data', desc: 'Service delivery metrics, response times, and citizen feedback data.', color: 'text-[#1a6b3c]', bg: 'bg-[#1a6b3c]/10' },
]

const auditReports = [
  { title: 'Internal Audit Q3 2024', date: 'Oct 2024', status: 'Completed' },
  { title: 'External Audit FY 2023/24', date: 'Sep 2024', status: 'Completed' },
  { title: 'Internal Audit Q2 2024', date: 'Jul 2024', status: 'Completed' },
  { title: 'Compliance Review 2024', date: 'Nov 2024', status: 'In Progress' },
]

function statusColor(s: string) {
  if (s === 'Awarded') return 'bg-[#1a6b3c] text-white'
  if (s === 'Open') return 'bg-[#c8a415] text-white'
  return 'bg-orange-100 text-orange-700'
}

export default function TransparencyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white tracking-wide">TRANSPARENCY & ACCOUNTABILITY</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-green-200 mt-4 text-lg md:text-xl max-w-2xl mx-auto">Open government, accountable leadership</motion.p>
      </section>

      {/* Transparency Commitment */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-8">
            <Quote className="w-10 h-10 text-[#c8a415] mx-auto mb-4" />
            <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
              &ldquo;Transparency is not just a policy — it is the foundation of trust between the city administration and the citizens we serve. We are committed to open governance in every decision we make.&rdquo;
            </blockquote>
            <p className="mt-4 font-semibold text-[#0d4a28]">— Office of the Mayor, Dessie City Administration</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {commitments.map((c, i) => (
              <motion.div key={c.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1} variants={fadeUp}>
                <Card className="stat-card border-0 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <c.icon className="w-8 h-8 text-[#1a6b3c] mx-auto mb-3" />
                    <h3 className="font-bold text-foreground mb-1">{c.label}</h3>
                    <p className="text-muted-foreground text-sm">{c.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-[#c8a415]" />

      {/* Annual Budget */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">FY 2025/26 BUDGET</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-4" />
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="text-center text-2xl font-bold text-[#1a6b3c] mb-10">Total Budget: ETB 2.8 Billion</motion.p>

          {/* Budget Bar Chart */}
          <div className="bg-white rounded-xl p-6 mb-8 border">
            <div className="flex rounded-lg overflow-hidden h-10 md:h-12">
              {budgetBreakdown.map(b => (
                <div key={b.label} className={`${b.color} flex items-center justify-center text-white text-xs font-semibold`} style={{ width: `${b.pct}%` }}>
                  {b.pct >= 15 && `${b.pct}%`}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {budgetBreakdown.map(b => (
                <div key={b.label} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-sm ${b.color}`} />
                  <span className="text-muted-foreground">{b.label}: <span className="font-semibold text-foreground">{b.pct}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">ANNUAL REPORTS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map((r, i) => (
              <motion.div key={r.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-5">
                    <FileText className="w-10 h-10 text-[#c8a415] mb-4" />
                    <h3 className="font-bold text-foreground text-sm mb-1">{r.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span>{r.year}</span>
                      <span>•</span>
                      <span>{r.size}</span>
                    </div>
                    <Button variant="outline" className="w-full text-xs border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white">
                      <Download className="w-3.5 h-3.5 mr-2" />DOWNLOAD PDF
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Procurement & Tenders */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">RECENT PROCUREMENTS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <Card className="border-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#0d4a28] hover:bg-[#0d4a28]">
                  <TableHead className="text-white text-xs font-semibold">TITLE</TableHead>
                  <TableHead className="text-white text-xs font-semibold hidden md:table-cell">REFERENCE</TableHead>
                  <TableHead className="text-white text-xs font-semibold">VALUE</TableHead>
                  <TableHead className="text-white text-xs font-semibold">STATUS</TableHead>
                  <TableHead className="text-white text-xs font-semibold hidden sm:table-cell">DATE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {procurements.map(p => (
                  <TableRow key={p.ref} className="hover:bg-[#f8faf8]">
                    <TableCell className="font-medium text-sm">{p.title}</TableCell>
                    <TableCell className="text-muted-foreground text-xs hidden md:table-cell">{p.ref}</TableCell>
                    <TableCell className="text-sm font-semibold">{p.value}</TableCell>
                    <TableCell><Badge className={`${statusColor(p.status)} text-[10px]`}>{p.status.toUpperCase()}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">{p.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <div className="text-center mt-6">
            <Button variant="outline" className="border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white text-sm">VIEW ALL TENDERS</Button>
          </div>
        </div>
      </section>

      {/* Performance Dashboard */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">KEY PERFORMANCE INDICATORS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {kpis.map((k, i) => (
              <motion.div key={k.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="stat-card h-full hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-5">
                    <k.icon className="w-6 h-6 text-[#1a6b3c] mb-3" />
                    <p className="text-2xl font-bold text-[#0d4a28]">{k.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {k.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 text-[#1a6b3c]" /> : <ArrowDownRight className="w-3.5 h-3.5 text-[#c8a415]" />}
                      <span className={`text-[10px] font-semibold ${k.trend === 'up' ? 'text-[#1a6b3c]' : 'text-[#c8a415]'}`}>
                        {k.trend === 'up' ? 'Trending up' : 'Improving'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Data */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">OPEN DATA</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-4" />
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">Our open data initiative makes city data freely available to researchers, journalists, developers, and citizens to promote transparency and innovation.</motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataCategories.map((d, i) => (
              <motion.div key={d.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} whileHover={{ y: -5 }}>
                <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white">
                  <div className={`h-2 transition-colors ${d.bg} group-hover:bg-opacity-100`} style={{ backgroundColor: d.color.replace('text-', '') }} />
                  <CardContent className="p-8 text-center flex flex-col h-full items-center justify-center relative">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${d.bg}`}>
                      <d.icon className={`w-10 h-10 ${d.color}`} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg mb-3 tracking-tight">{d.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{d.desc}</p>
                    <Button variant="outline" className={`w-full font-bold text-xs uppercase tracking-widest border-gray-200 hover:border-transparent ${d.color} hover:bg-gray-50 hover:shadow-md transition-all`}>
                      ACCESS DATA <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit & Compliance */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">AUDIT & COMPLIANCE</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-4" />
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">Regular internal and external audits ensure accountability, compliance with regulations, and efficient use of public resources.</motion.p>
          <Card className="max-w-3xl mx-auto border-0">
            <CardContent className="p-0">
              <div className="divide-y">
                {auditReports.map((a, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <BookOpen className="w-5 h-5 text-[#1a6b3c]" />
                      <div>
                        <p className="font-semibold text-sm text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${a.status === 'Completed' ? 'border-[#1a6b3c] text-[#1a6b3c]' : 'border-[#c8a415] text-[#c8a415]'}`}>
                      {a.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
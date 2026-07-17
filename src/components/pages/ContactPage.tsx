'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/lib/LangContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  HeartPulse,
  Scale,
  GraduationCap,
  Briefcase,
  Banknote,
  Wrench,
  UserCheck,
  Headset
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const contactInfo = [
  { icon: MapPin, title: 'Main Office', lines: ['Dessie City Administration', 'Main Street, Dessie, Amhara, Ethiopia'], color: '#1a6b3c' },
  { icon: Phone, title: 'Phone', lines: ['+251-33-111-XXXX', '+251-33-222-XXXX'], color: '#c8a415' },
  { icon: Mail, title: 'Email', lines: ['info@dessiecity.gov.et', 'support@dessiecity.gov.et'], color: '#1a6b3c' },
  { icon: Clock, title: 'Office Hours', lines: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 12:00 PM (Limited)'], color: '#c8a415' },
]

const departments = [
  { name: "Mayor's Office", person: 'Abebe Kebede', phone: '+251-33-111-1001', email: 'mayor@dessiecity.gov.et', icon: UserCheck },
  { name: 'Finance', person: 'Helen Tadesse', phone: '+251-33-111-1002', email: 'finance@dessiecity.gov.et', icon: Banknote },
  { name: 'Infrastructure', person: 'Dawit Assefa', phone: '+251-33-111-1003', email: 'infra@dessiecity.gov.et', icon: Wrench },
  { name: 'Social Affairs', person: 'Sara Mohammed', phone: '+251-33-111-1004', email: 'social@dessiecity.gov.et', icon: HeartPulse },
  { name: 'Legal', person: 'Yonas Haile', phone: '+251-33-111-1005', email: 'legal@dessiecity.gov.et', icon: Scale },
  { name: 'Health', person: 'Dr. Tigist Worku', phone: '+251-33-111-1006', email: 'health@dessiecity.gov.et', icon: HeartPulse },
  { name: 'Education', person: 'Mulugeta Abebe', phone: '+251-33-111-1007', email: 'education@dessiecity.gov.et', icon: GraduationCap },
  { name: 'Investment', person: 'Natnael Girma', phone: '+251-33-111-1008', email: 'investment@dessiecity.gov.et', icon: Briefcase },
]

const locations = [
  { title: 'Main Office', address: 'Main Street, Dessie', phone: '+251-33-111-0000', hours: 'Mon-Fri 8AM-5PM' },
  { title: 'Kebele Offices', address: 'Various locations across the city', phone: '+251-33-111-0099', hours: 'Mon-Fri 8:30AM-4:30PM' },
  { title: 'One-Stop Service Center', address: 'City Center, Dessie', phone: '+251-33-111-0050', hours: 'Mon-Sat 8AM-5PM' },
]

const faqs = [
  { q: 'How do I register a business?', a: 'Visit the One-Stop Service Center at City Center with your identification documents, business plan, and lease agreement. The process typically takes 3-5 business days. You can also begin the process online through our citizen portal.' },
  { q: 'Where can I pay my taxes?', a: 'Tax payments can be made at the Finance Department office on Main Street, at the One-Stop Service Center, or through our digital payment platform. Office hours are Monday to Friday, 8:00 AM to 5:00 PM.' },
  { q: 'How do I file a complaint?', a: 'Complaints can be filed in person at any city office, through our online complaint form, by calling +251-33-222-XXXX, or by emailing support@dessiecity.gov.et. All complaints are tracked and you will receive a reference number.' },
  { q: 'What are the office hours?', a: 'Standard office hours are Monday through Friday, 8:00 AM to 5:00 PM. Saturday services are available from 9:00 AM to 12:00 PM at the One-Stop Service Center for limited services.' },
  { q: 'How can I reach the Mayor\'s office?', a: 'You can contact the Mayor\'s office by calling +251-33-111-1001, emailing mayor@dessiecity.gov.et, or visiting the Main Office on Main Street. Appointments can be scheduled through the office secretary.' },
  { q: 'Where can I get a birth certificate?', a: 'Birth certificates are issued at the Civil Registry office located in the Main Administration building. Bring the child\'s hospital birth notification and parent identification. Processing takes 1-2 business days.' },
]

const deptOptions = ["Mayor's Office", 'Finance', 'Infrastructure', 'Social Affairs', 'Legal', 'Health', 'Education', 'Other']

export default function ContactPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const { toast } = useToast()
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.department || !form.subject || !form.message) {
      toast({ title: 'Error', description: 'Please fill all required fields.', variant: 'destructive' })
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast({ title: 'Message Sent', description: 'We will get back to you shortly.' })
      setForm({ name: '', email: '', phone: '', department: '', subject: '', message: '' })
    } catch {
      toast({ title: 'Error', description: 'Failed to send message. Please try again.', variant: 'destructive' })
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="bg-gray-50/50">
      {/* Page Banner */}
      <section className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-1/4 w-32 h-32 rounded-full border border-white/20 animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute bottom-8 right-1/3 w-48 h-48 rounded-full border border-white/20 animate-pulse" />
          <div className="absolute top-8 right-16 w-20 h-20 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20 shadow-lg">
            <Headset className="w-4 h-4 text-[#c8a415]" />
            <p className="text-[#c8a415] text-sm tracking-widest font-semibold uppercase">{isAm ? 'ያግኙን' : 'Get In Touch'}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wide mb-6 drop-shadow-lg">{isAm ? 'አድራሻዎቻችን' : 'CONTACT US'}</h1>
          <Separator className="w-24 mx-auto bg-gradient-to-r from-transparent via-[#c8a415] to-transparent h-1 mb-6 border-0" />
          <p className="text-white/80 text-sm tracking-widest uppercase font-medium">{isAm ? 'ዋና ገጽ / አድራሻ' : 'Home / Contact'}</p>
          <p className="text-white/70 text-lg mt-6 max-w-2xl mx-auto font-medium">{isAm ? 'ለማገልገል ዝግጁ ነን' : "We're here to serve you. Reach out to us through any of the channels below."}</p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((c) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <Card className="h-full bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -mr-8 -mt-8 opacity-50 group-hover:bg-[#c8a415]/10 transition-colors duration-500" />
                  <CardContent className="p-8 text-center relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <c.icon className="w-8 h-8" style={{ color: c.color }} />
                    </div>
                    <h3 className="font-extrabold text-xl text-[#0d4a28] mb-3">{c.title}</h3>
                    {c.lines.map((l, j) => <p key={j} className="text-gray-600 text-sm font-medium leading-relaxed">{l}</p>)}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Department Directory */}
      <section className="bg-white py-24 px-4 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="text-center mb-16">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-2 block">Direct Access</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">DEPARTMENT CONTACTS</h2>
              <div className="w-24 h-1 bg-[#1a6b3c] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((d, i) => (
                <motion.div key={d.name} variants={fadeInUp}>
                  <Card className="h-full border border-gray-100 bg-white hover:border-[#1a6b3c]/30 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#1a6b3c]/10 group-hover:bg-[#1a6b3c] transition-colors duration-300">
                          <d.icon className="w-5 h-5 text-[#1a6b3c] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="font-extrabold text-gray-900 leading-tight">{d.name}</h3>
                      </div>
                      <div className="space-y-2.5 text-sm font-medium text-gray-600">
                        <p className="flex items-center gap-2 group-hover:text-gray-900 transition-colors"><User className="w-4 h-4 text-[#c8a415]" />{d.person}</p>
                        <p className="flex items-center gap-2 group-hover:text-gray-900 transition-colors"><Phone className="w-4 h-4 text-[#c8a415]" />{d.phone}</p>
                        <p className="flex items-center gap-2 group-hover:text-gray-900 transition-colors"><Mail className="w-4 h-4 text-[#c8a415]" />{d.email}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Office Locations */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 px-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#c8a415]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#1a6b3c]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
          
          {/* Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="mb-10">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-2 block">Reach Out Online</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">{isAm ? 'መልዕክት ይላኩ' : 'SEND US A MESSAGE'}</h2>
              <div className="w-16 h-1 bg-[#1a6b3c] mt-4 rounded-full" />
            </div>

            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-gray-100 rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-2 block">{isAm ? 'ስም *' : 'Name *'}</Label>
                      <Input placeholder={isAm ? 'ሙሉ ስምዎ' : 'Your full name'} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="h-12 bg-gray-50/50 border-gray-200 focus:border-[#1a6b3c] focus:ring-[#1a6b3c]" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-2 block">{isAm ? 'ኢሜይል *' : 'Email *'}</Label>
                      <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="h-12 bg-gray-50/50 border-gray-200 focus:border-[#1a6b3c] focus:ring-[#1a6b3c]" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-2 block">{isAm ? 'ስልክ (አማራጭ)' : 'Phone (Optional)'}</Label>
                      <Input placeholder="+251-XX-XXX-XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="h-12 bg-gray-50/50 border-gray-200 focus:border-[#1a6b3c] focus:ring-[#1a6b3c]" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-2 block">{isAm ? 'ዲፓርትመንት *' : 'Department *'}</Label>
                      <Select value={form.department} onValueChange={v => setForm({ ...form, department: v })}>
                        <SelectTrigger className="h-12 bg-gray-50/50 border-gray-200 focus:border-[#1a6b3c] focus:ring-[#1a6b3c]">
                          <SelectValue placeholder={isAm ? 'ዲፓርትመንት ይምረጡ' : 'Select department'} />
                        </SelectTrigger>
                        <SelectContent>
                          {deptOptions.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">{isAm ? 'ርዕሰ ጉዳይ *' : 'Subject *'}</Label>
                    <Input placeholder={isAm ? 'ጉዳዩን በአጭሩ ይጻፉ' : 'Brief subject'} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="h-12 bg-gray-50/50 border-gray-200 focus:border-[#1a6b3c] focus:ring-[#1a6b3c]" />
                  </div>
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">{isAm ? 'መልዕክት *' : 'Message *'}</Label>
                    <Textarea placeholder={isAm ? 'መልዕክትዎን እዚህ ይጻፉ...' : 'Write your message here...'} rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="resize-none bg-gray-50/50 border-gray-200 focus:border-[#1a6b3c] focus:ring-[#1a6b3c]" />
                  </div>
                  <Button type="submit" disabled={sending} className="w-full h-14 bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] hover:from-[#1a6b3c] hover:to-[#0d4a28] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                    {sending ? (isAm ? 'እየተላከ ነው...' : 'Sending...') : (isAm ? 'መልዕክት ላክ' : 'SEND MESSAGE')} <Send className="w-5 h-5 ml-2" />
                  </Button>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Locations & FAQ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <div className="mb-10">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-2 block">Visit Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">OFFICE LOCATIONS</h2>
              <div className="w-16 h-1 bg-[#1a6b3c] mt-4 rounded-full" />
            </div>

            <div className="space-y-6 mb-16">
              {locations.map((l, i) => (
                <motion.div key={l.title} variants={fadeInUp}>
                  <Card className="border border-gray-100 bg-white hover:border-[#c8a415]/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6 flex gap-5 items-start">
                      <div className="p-3 rounded-xl bg-[#c8a415]/10 shrink-0 mt-1">
                        <MapPin className="w-6 h-6 text-[#c8a415]" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-[#0d4a28] mb-2">{l.title}</h3>
                        <div className="space-y-1.5 text-sm font-medium text-gray-600">
                          <p>{l.address}</p>
                          <p>{l.phone}</p>
                          <p className="text-[#1a6b3c]">{l.hours}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mb-8">
              <span className="text-[#c8a415] font-bold tracking-widest uppercase text-sm mb-2 block">Help Center</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4a28]">FAQS</h2>
            </div>

            <motion.div variants={fadeInUp}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-xl px-5 bg-white shadow-sm">
                    <AccordionTrigger className="text-base font-bold text-[#0d4a28] text-left hover:no-underline py-5">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm font-medium text-gray-600 leading-relaxed pb-5">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </main>
  )
}
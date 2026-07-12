'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
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
  Building2,
  Landmark,
  HeartPulse,
  Scale,
  GraduationCap,
  Briefcase,
  Banknote,
  Wrench,
  ChevronRight,
  HelpCircle,
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  UserCheck,
  Baby,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
}

const contactInfo = [
  { icon: MapPin, title: 'Main Office', lines: ['Dessie City Administration', 'Main Street, Dessie, Amhara, Ethiopia'] },
  { icon: Phone, title: 'Phone', lines: ['+251-33-111-XXXX', '+251-33-222-XXXX'] },
  { icon: Mail, title: 'Email', lines: ['info@dessiecity.gov.et', 'support@dessiecity.gov.et'] },
  { icon: Clock, title: 'Office Hours', lines: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 12:00 PM (Limited)'] },
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
    <div className="min-h-screen">
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white tracking-wide">CONTACT US</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-green-200 mt-4 text-lg md:text-xl">We&apos;re here to serve you</motion.p>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((c, i) => (
            <motion.div key={c.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
              <Card className="stat-card h-full hover:shadow-lg transition-shadow border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center mx-auto mb-4">
                    <c.icon className="w-6 h-6 text-[#1a6b3c]" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{c.title}</h3>
                  {c.lines.map((l, j) => <p key={j} className="text-muted-foreground text-sm">{l}</p>)}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="bg-[#c8a415]" />

      {/* Department Directory */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">DEPARTMENT CONTACTS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((d, i) => (
              <motion.div key={d.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <d.icon className="w-4 h-4 text-[#1a6b3c]" />
                      <h3 className="font-bold text-sm text-foreground">{d.name}</h3>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><User className="w-3 h-3 inline mr-1" />{d.person}</p>
                      <p><Phone className="w-3 h-3 inline mr-1" />{d.phone}</p>
                      <p><Mail className="w-3 h-3 inline mr-1" />{d.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">SEND US A MESSAGE</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Name *</Label>
                <Input placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Email *</Label>
                <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Phone (Optional)</Label>
                <Input placeholder="+251-XX-XXX-XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Department *</Label>
                <Select value={form.department} onValueChange={v => setForm({ ...form, department: v })}>
                  <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {deptOptions.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">Subject *</Label>
              <Input placeholder="Brief subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">Message *</Label>
              <Textarea placeholder="Write your message here..." rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <Button type="submit" disabled={sending} className="w-full bg-[#1a6b3c] hover:bg-[#0d4a28] text-white font-semibold">
              {sending ? 'Sending...' : 'SEND MESSAGE'} <Send className="w-4 h-4 ml-2" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-[#f8faf8] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">OFFICE LOCATIONS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <div className="grid sm:grid-cols-3 gap-6">
            {locations.map((l, i) => (
              <motion.div key={l.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[#1a6b3c]" />
                      <h3 className="font-bold text-foreground">{l.title}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" />{l.address}</p>
                      <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" />{l.phone}</p>
                      <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 shrink-0" />{l.hours}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="gov-section-title text-3xl font-bold text-[#0d4a28] mb-2 text-center">FREQUENTLY ASKED QUESTIONS</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="w-16 h-1 bg-[#c8a415] mx-auto mb-10" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
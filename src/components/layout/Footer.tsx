"use client"
import React from 'react';
import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube, FileText } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

export default function Footer() {
  const { lang } = useLang();
  
  return (
    <footer className="mt-auto bg-[#0d4a28] dark:bg-[#060e06]">
      <div className="tricolor-stripe" />
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/official-logo.png"
                alt="Dessie City Administration Logo"
                className="h-14 w-auto object-contain"
              />
              <div className="leading-tight">
                <span className="text-green-400 font-bold text-xl tracking-wide">DESSIE</span>
                <br />
                <span className="text-[0.6rem] tracking-[0.12em] text-white/50 uppercase font-medium">City Administration</span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Dessie, Amhara Region<br />
              Ethiopia
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Phone className="w-3.5 h-3.5" />
              <span>+251-33-111-XXXX</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/50 mt-1">
              <Mail className="w-3.5 h-3.5" />
              <span>info@dessiecity.gov.et</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{lang === 'am' ? 'ፈጣን አገናኞች' : 'Quick Links'}</h4>
            <ul className="space-y-2">
              {[
                { en: 'Home', am: 'ዋና ገጽ', href: '/' },
                { en: 'About Dessie', am: 'ስለ ደሴ', href: '/about' },
                { en: "Mayor's Office", am: 'የከንቲባ ቢሮ', href: '/mayor' },
                { en: 'All Services', am: 'ሁሉም አገልግሎቶች', href: '/services' },
                { en: 'Announcements', am: 'ማስታወቂያዎች', href: '/news' },
                { en: 'Contact Us', am: 'ያግኙን', href: '/contact' },
              ].map((link) => (
                <li key={link.en}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-green-400 transition-colors"
                  >
                    {lang === 'am' ? link.am : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{lang === 'am' ? 'አገልግሎቶች' : 'Services'}</h4>
            <ul className="space-y-2">
              {[
                { en: 'Birth Registration', am: 'የልደት ምዝገባ', id: 'Birth Registration' },
                { en: 'Business License', am: 'የንግድ ፈቃድ', id: 'Business License' },
                { en: 'Building Permit', am: 'የግንባታ ፈቃድ', id: 'Building Permit' },
                { en: 'Land Services', am: 'የመሬት አገልግሎቶች', id: 'Land Services' },
                { en: 'Tax Payment', am: 'ግብር ክፍያ', id: 'Tax Payment' },
              ].map((svc) => (
                <li key={svc.en}>
                  <Link
                    href={`/services/${encodeURIComponent(svc.id)}`}
                    className="text-sm text-white/50 hover:text-green-400 transition-colors"
                  >
                    {lang === 'am' ? svc.am : svc.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{lang === 'am' ? 'ሰነዶች' : 'Resources'}</h4>
            <ul className="space-y-2">
              {[
                { en: 'Proclamations', am: 'አዋጆች' },
                { en: 'Regulations', am: 'ደንቦች' },
                { en: 'Official Documents', am: 'ይፋዊ ሰነዶች' },
                { en: 'Application Forms', am: 'ማመልከቻ ቅጾች' },
                { en: 'Annual Reports', am: 'ዓመታዊ ሪፖርቶች' },
                { en: 'City Plans', am: 'የከተማ እቅዶች' },
              ].map((res) => (
                <li key={res.en}>
                  <button
                    onClick={() => { document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="text-sm text-white/50 hover:text-green-400 transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3 h-3" /> {lang === 'am' ? res.am : res.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{lang === 'am' ? 'ያግኙን' : 'Connect'}</h4>
            <div className="flex gap-2 mb-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Social media"
                >
                  <Icon className="w-3.5 h-3.5 text-white" />
                </button>
              ))}
            </div>
            <p className="text-sm text-white/50 mb-3">{lang === 'am' ? 'በኢሜይል ዝማኔዎችን ያግኙ' : 'Get updates via email'}</p>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); /* handled by parent or hook */ }}>
              <input
                type="email"
                placeholder={lang === 'am' ? 'የኢሜይል አድራሻ' : 'Email address'}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-400 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {lang === 'am' ? 'ይመዝገቡ' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center md:text-left">
            &copy; {new Date().getFullYear()} Dessie City Administration. All rights reserved.
          </p>
          <div className="text-xs text-white/40 text-center flex items-center gap-1.5">
            {lang === 'am' ? 'በመሰረት አቃሉ የተገነባ' : 'Developed by'} <span className="font-semibold text-white/70">Meseret Akalu</span> <span className="text-[#c8a415]">&bull;</span> <a href="tel:+251912465247" className="hover:text-green-400 transition-colors">0912465247</a>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-green-400 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

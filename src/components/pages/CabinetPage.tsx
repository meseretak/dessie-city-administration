"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useLang } from '@/lib/LangContext';

export default function CabinetPage() {
  const { lang } = useLang();
  const isAm = lang === 'am';

  // Placeholder data - this can be hooked up to DB later
  const cabinetMembers = [
    {
      name: isAm ? "አቶ መሀመድ ሰይድ" : "Mr. Mohammed Seid",
      role: isAm ? "የከተማው ከንቲባ" : "City Mayor",
      department: isAm ? "የከንቲባ ጽ/ቤት" : "Mayor's Office",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "mayor@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "ወ/ሮ ፋጡማ አሊ" : "Mrs. Fatuma Ali",
      role: isAm ? "ምክትል ከንቲባ" : "Deputy Mayor",
      department: isAm ? "የከተማ ልማት" : "Urban Development",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "deputy@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "አቶ ሀሰን አህመድ" : "Mr. Hassen Ahmed",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ትምህርት ቢሮ" : "Education Bureau",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "education@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "ዶ/ር ሰላም ተስፋዬ" : "Dr. Selam Tesfaye",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ጤና ጥበቃ" : "Health Bureau",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "health@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "አቶ ዳዊት በቀለ" : "Mr. Dawit Bekele",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ንግድና ኢንዱስትሪ" : "Trade & Industry",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "trade@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "ወ/ሪት ማክዳ ዮሴፍ" : "Ms. Makda Yoseph",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ሴቶችና ህፃናት" : "Women & Children",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "women@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/smart-meeting-room.jpg" 
            alt="Dessie Cabinet" 
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4a28]/90 to-[#1a6b3c]/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Users className="w-5 h-5 text-[#c8a415]" />
              <span className="text-white font-semibold tracking-wider text-sm uppercase">
                {isAm ? 'አስተዳደር' : 'Administration'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {isAm ? 'የከተማው ካቢኔ አባላት' : 'City Cabinet Members'}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              {isAm 
                ? 'ለደሴ ከተማ እድገትና ብልፅግና ሌት ተቀን የሚሰሩ አመራሮች። የህዝብን ጥያቄ ለመመለስ ቁርጠኛ የሆኑ።' 
                : 'Dedicated leaders working tirelessly for the development and prosperity of Dessie City.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cabinetMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Department Badge */}
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Briefcase className="w-3.5 h-3.5 text-[#1a6b3c]" />
                  <span className="text-xs font-bold text-[#1a6b3c]">{member.department}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#c8a415] font-semibold mb-6 uppercase tracking-wide text-sm">{member.role}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#1a6b3c]" />
                    </div>
                    <span className="text-sm">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#1a6b3c]" />
                    </div>
                    <span className="text-sm">{member.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

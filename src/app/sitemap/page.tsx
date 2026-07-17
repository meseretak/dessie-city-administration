import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Sitemap',
  description: 'Sitemap for Dessie City Administration',
};

export default function SitemapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sitemap</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-gray-700">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Main Navigation</h2>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Home</Link></li>
              <li><Link href="/about" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> About Dessie</Link></li>
              <li><Link href="/mayor" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Mayor's Office</Link></li>
              <li><Link href="/services" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Services</Link></li>
              <li><Link href="/news" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> News & Announcements</Link></li>
              <li><Link href="/contact" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Portals & Opportunities</h2>
            <ul className="space-y-3">
              <li><Link href="/vacancies" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Vacancies & Jobs</Link></li>
              <li><Link href="/bids" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Bids & Tenders</Link></li>
              <li><Link href="/projects" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> City Projects</Link></li>
              <li><Link href="/tourism" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Tourism & Culture</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Legal & Support</h2>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Terms of Service</Link></li>
              <li><Link href="/accessibility" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Accessibility</Link></li>
              <li><Link href="/faq" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> FAQ</Link></li>
              <li><Link href="/help" className="text-[#1a6b3c] hover:underline flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c8a415]"></span> Help Center</Link></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

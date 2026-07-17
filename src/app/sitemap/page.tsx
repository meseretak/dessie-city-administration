import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Sitemap',
  description: 'Sitemap for Dessie City Administration',
};

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sitemap</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm text-gray-700 space-y-6">
          <ul className="space-y-4">
            <li><Link href="/" className="text-[#1a6b3c] hover:underline">Home</Link></li>
            <li><Link href="/about" className="text-[#1a6b3c] hover:underline">About Dessie</Link></li>
            <li><Link href="/mayor" className="text-[#1a6b3c] hover:underline">Mayor's Office</Link></li>
            <li><Link href="/services" className="text-[#1a6b3c] hover:underline">Services</Link></li>
            <li><Link href="/news" className="text-[#1a6b3c] hover:underline">News & Media</Link></li>
            <li><Link href="/vacancies" className="text-[#1a6b3c] hover:underline">Vacancies</Link></li>
            <li><Link href="/bids" className="text-[#1a6b3c] hover:underline">Bids & Tenders</Link></li>
            <li><Link href="/contact" className="text-[#1a6b3c] hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}

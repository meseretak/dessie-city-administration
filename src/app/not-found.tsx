'use client';
import Link from 'next/link';
import { Home, Search, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#0d4a28]/10">
              <span className="text-6xl font-black text-[#0d4a28]">404</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#c8a415] rounded-full flex items-center justify-center border-4 border-gray-50 shadow-lg">
              <Search className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto px-8 py-3 bg-[#0d4a28] text-white font-semibold rounded-xl shadow-lg hover:bg-[#1a6b3c] transition-all flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link href="/services" className="w-full sm:w-auto px-8 py-3 bg-white text-[#0d4a28] font-semibold rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Help & Support',
  description: 'Help Center for Dessie City Administration',
};

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Help & Support</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm text-gray-700 space-y-6">
          <p>
            Need help navigating our website or services? We're here for you.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Phone: +251-33-111-XXXX</li>
            <li>Email: info@dessiecity.gov.et</li>
          </ul>
          <p className="mt-4">
            For technical issues with the website, please report them to our administration office.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

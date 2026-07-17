import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Dessie City Administration',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm text-gray-700 space-y-6">
          <p>
            Welcome to the Dessie City Administration website. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Information Collection</h2>
          <p>
            We may collect information when you use our digital services, subscribe to newsletters, or submit forms. This information is used solely for providing administrative services.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no data transmission over the internet is completely secure.
          </p>
          <p className="text-sm text-gray-500 mt-8">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

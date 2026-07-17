import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Dessie City Administration',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm text-gray-700 space-y-6">
          <p>
            Welcome to the Dessie City Administration portal. By accessing our services, you agree to comply with the following terms.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Use of Services</h2>
          <p>
            The digital services provided are intended for residents and businesses within Dessie City. You agree to use these services lawfully.
          </p>
          <h2 className="text-xl font-semibold text-gray-900">User Responsibilities</h2>
          <p>
            Users are responsible for ensuring the accuracy of information submitted through any online forms or portals.
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

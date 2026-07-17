import React from 'react';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently Asked Questions - Dessie City Administration',
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm text-gray-700 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">How do I contact the Mayor's Office?</h2>
        <p>
          You can reach the Mayor's Office via the contact information provided in the footer, or by navigating to the "Mayor's Office" section in the menu.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900">Where can I apply for jobs?</h2>
        <p>
          Check the "Vacancies" section on our main navigation. We regularly post open positions for the city administration.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900">How can I pay my taxes online?</h2>
        <p>
          Our digital services portal is currently being upgraded. Soon you will be able to process payments directly from the "Digital Services" section.
        </p>
      </div>
    </div>
  );
}

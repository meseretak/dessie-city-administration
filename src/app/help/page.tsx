import React from 'react';

export const metadata = {
  title: 'Help & Support',
  description: 'Help Center for Dessie City Administration',
};

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Help & Support</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-gray-700 space-y-6">
        <p className="lead text-lg text-gray-800">
          Welcome to the Dessie City Administration Help Center. We are dedicated to ensuring you can navigate our digital services with ease.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">1. Technical Assistance</h2>
        <p>
          If you are experiencing issues loading a page, submitting a form, or accessing your citizen account, please try the following troubleshooting steps:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ensure you are using a modern, updated web browser (e.g., Chrome, Firefox, Edge).</li>
          <li>Clear your browser cache and cookies, then reload the page.</li>
          <li>If an upload fails, ensure your documents are in PDF or JPEG format and do not exceed 5MB in size.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">2. Language Support</h2>
        <p>
          Our portal is fully bilingual. You can switch between Amharic (አማርኛ) and English using the language toggle located at the top right corner of the navigation bar.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">3. Direct Contact Information</h2>
        <p>
          If you still need assistance after reviewing our <a href="/faq" className="text-[#1a6b3c] hover:underline">FAQ section</a>, please reach out to our dedicated support teams:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>General Inquiries:</strong> info@dessiecity.gov.et | +251-33-111-XXXX</li>
          <li><strong>Technical Support:</strong> tech-support@dessiecity.gov.et</li>
          <li><strong>Emergency Municipal Services:</strong> +251-33-111-9999 (Available 24/7)</li>
        </ul>

        <p className="mt-4 p-4 bg-[#0d4a28]/5 rounded-lg border border-[#0d4a28]/20">
          <strong>Physical Office:</strong><br />
          Dessie City Hall, IT & Communications Department<br />
          Main Street, Dessie, Amhara Region, Ethiopia
        </p>

      </div>
    </div>
  );
}

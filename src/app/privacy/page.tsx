import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Dessie City Administration',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-gray-700 space-y-6">
        <p className="lead text-lg text-gray-800">
          The Dessie City Administration is committed to protecting your privacy and ensuring the security of the personal information you provide when using our digital services portal.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">1. Information We Collect</h2>
        <p>
          We collect information that you voluntarily provide to us when you register on the portal, express an interest in obtaining information about us or our services, or when you participate in activities on the platform. The personal information that we collect depends on the context of your interactions with us and the services you use.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Personal Details:</strong> Names, phone numbers, email addresses, mailing addresses, and national ID numbers for verification.</li>
          <li><strong>Service Data:</strong> Information related to service requests (e.g., land registry, business licensing, tax clearance).</li>
          <li><strong>Usage Data:</strong> We may automatically collect device information, IP addresses, and browsing patterns to improve our portal's usability.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">2. How We Use Your Information</h2>
        <p>
          We use personal information collected via our website for a variety of government and administrative purposes described below:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>To facilitate citizen account creation and logon process.</li>
          <li>To fulfill and manage your service requests, certificates, and applications.</li>
          <li>To send administrative information to you regarding policies, terms, or changes to our services.</li>
          <li>To protect our Services as part of our efforts to keep the portal safe and secure (e.g., fraud monitoring).</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">3. Information Sharing and Disclosure</h2>
        <p>
          As a government entity, we only share your information with other authorized regional or federal government agencies when required by law to process your specific service requests. We do <strong>not</strong> sell, rent, or trade your personal information to third parties for commercial purposes.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">4. Data Security</h2>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">5. Contact Us</h2>
        <p>
          If you have questions or comments about this policy, you may contact the Information Technology Department at the Dessie City Administration office or email us at <strong>privacy@dessiecity.gov.et</strong>.
        </p>

        <p className="text-sm text-gray-500 mt-8 pt-4 border-t">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

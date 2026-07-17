import React from 'react';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Dessie City Administration',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-gray-700 space-y-6">
        <p className="lead text-lg text-gray-800">
          Welcome to the official digital portal of the Dessie City Administration. By accessing or using our services, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">1. Agreement to Terms</h2>
        <p>
          By using this website, you agree to these Terms of Service and all applicable Ethiopian laws and regulations regarding online conduct and acceptable content. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">2. Use License and Restrictions</h2>
        <p>
          Permission is granted to temporarily access the materials and use the digital services on the Dessie City Administration website for personal, non-commercial transitory viewing only. Under this license you may not:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Modify or copy the materials for commercial purposes.</li>
          <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
          <li>Remove any copyright or other proprietary notations from the materials.</li>
          <li>Use the portal to submit fraudulent documents, false identities, or misleading information for government services.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">3. Citizen Account Responsibilities</h2>
        <p>
          If you create an account on this portal for digital services (such as tax payments or licensing), you are responsible for maintaining the confidentiality of your account credentials. The Administration reserves the right to suspend or terminate accounts that are found to be involved in fraudulent activities.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">4. Disclaimer of Warranties</h2>
        <p>
          The materials on the Dessie City Administration website are provided on an 'as is' basis. While we strive for accuracy, the Administration makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">5. Limitations of Liability</h2>
        <p>
          In no event shall the Dessie City Administration or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
        </p>

        <p className="text-sm text-gray-500 mt-8 pt-4 border-t">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

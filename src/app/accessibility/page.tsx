import React from 'react';

export const metadata = {
  title: 'Accessibility',
  description: 'Accessibility Statement for Dessie City Administration',
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Accessibility Statement</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm text-gray-700 space-y-6">
        <p>
          The Dessie City Administration is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone.
        </p>
        <h2 className="text-xl font-semibold text-gray-900">Measures to Support Accessibility</h2>
        <p>
          We take the following measures to ensure accessibility:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Include accessibility throughout our internal policies.</li>
          <li>Integrate accessibility into our procurement practices.</li>
          <li>Provide continual accessibility training for our staff.</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-900">Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of our services. Please let us know if you encounter any barriers.
        </p>
      </div>
    </div>
  );
}

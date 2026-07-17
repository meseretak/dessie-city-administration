import React from 'react';

export const metadata = {
  title: 'Accessibility',
  description: 'Accessibility Statement for Dessie City Administration',
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Accessibility Statement</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-gray-700 space-y-6">
        <p className="lead text-lg text-gray-800">
          The Dessie City Administration is firmly committed to ensuring digital accessibility for all citizens, including people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">1. Measures to Support Accessibility</h2>
        <p>We take the following active measures to ensure accessibility of our portal:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Internal Policies:</strong> We include accessibility as a core requirement throughout our internal policies and procurement practices.</li>
          <li><strong>Design Standards:</strong> We aim to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA standards.</li>
          <li><strong>Ongoing Training:</strong> Our content and development teams receive regular training on digital accessibility best practices.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">2. Features of Our Portal</h2>
        <p>This website includes the following features designed to improve accessibility:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Keyboard Navigation:</strong> The site can be navigated using a keyboard, ensuring interactive elements (buttons, links, forms) are accessible without a mouse.</li>
          <li><strong>Screen Reader Compatibility:</strong> We use ARIA labels and semantic HTML to ensure screen readers can accurately convey the structure and content of our pages.</li>
          <li><strong>Color Contrast:</strong> Text and background color combinations are designed to be readable for users with visual impairments.</li>
          <li><strong>Bilingual Support:</strong> The site is available in both Amharic and English to accommodate different language needs.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">3. Feedback and Assistance</h2>
        <p>
          Despite our best efforts to ensure accessibility of all pages, some content may not have yet been fully adapted to the strictest accessibility standards. We welcome your feedback on the accessibility of the Dessie City portal.
        </p>
        <p>
          If you encounter any barriers while using our digital services, please let us know:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Email:</strong> accessibility@dessiecity.gov.et</li>
          <li><strong>Phone:</strong> +251-33-111-XXXX</li>
          <li><strong>In-Person:</strong> Mayor's Office, Dessie City Hall, Main Street</li>
        </ul>
        <p>We aim to respond to accessibility feedback within 2 business days.</p>

        <p className="text-sm text-gray-500 mt-8 pt-4 border-t">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

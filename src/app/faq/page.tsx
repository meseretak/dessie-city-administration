import React from 'react';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently Asked Questions - Dessie City Administration',
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-gray-700 space-y-8">
        
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">General Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">What are the operating hours of the Dessie City Administration?</h3>
              <p className="text-gray-600 mt-1">Our offices are open Monday through Friday, from 8:00 AM to 12:00 PM, and 1:30 PM to 5:30 PM. We are closed on weekends and national public holidays.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How do I contact the Mayor's Office directly?</h3>
              <p className="text-gray-600 mt-1">You can reach the Mayor's Office via the "Contact Us" page, or by calling our direct citizen hotline at +251-33-111-XXXX. You can also visit City Hall during regular business hours.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Digital Services</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">How can I apply for a new business license?</h3>
              <p className="text-gray-600 mt-1">Navigate to the "Services" menu and select "Trade & Industry". From there, you can download the application forms and submit your initial documents digitally. Final verification may require an in-person visit.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Is it possible to pay city taxes online?</h3>
              <p className="text-gray-600 mt-1">Currently, online tax payments are in the beta testing phase for select businesses. A full rollout for all citizens is planned for the next fiscal quarter via our Smart City initiative.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How do I report an issue with public infrastructure (e.g., broken streetlights, potholes)?</h3>
              <p className="text-gray-600 mt-1">Please use the "Request Service" link under the Services tab, and select "Infrastructure Report". You can upload photos and drop a pin on the map to help our maintenance teams locate the issue.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Employment & Tenders</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Where can I find job vacancies within the administration?</h3>
              <p className="text-gray-600 mt-1">All official job postings are listed on the "Vacancies" page. We also post announcements on our official Facebook and Telegram channels.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How do I participate in city procurement bids?</h3>
              <p className="text-gray-600 mt-1">Check the "Bids & Tenders" section regularly. You must be a registered supplier with a valid TIN and renewed trade license to participate. Bid documents can often be downloaded directly from the portal.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}


import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const NoticesSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#062C25] mb-4">
            NOTICES
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest events, programs, and announcements
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button className="px-6 py-2 bg-yellow-500 text-black rounded-md font-medium">
              Upcoming
            </button>
            <button className="px-6 py-2 text-gray-600 hover:text-gray-800 rounded-md font-medium">
              Jumuah
            </button>
            <button className="px-6 py-2 text-gray-600 hover:text-gray-800 rounded-md font-medium">
              Info
            </button>
          </div>
        </div>

        {/* Notice Card - Single centered card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Notice Image */}
            <div className="relative h-64 bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">MEHBOOB-E-ILAAM</h3>
                <p className="text-sm opacity-90 mt-2">Dhul Hijjah Focus Event</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p>THURSDAY</p>
                  <p>6th Zul Hijjah 1446 | 5th June 2025</p>
                  <p>7pm</p>
                </div>
              </div>
            </div>

            {/* Notice Content */}
            <div className="p-6">
              <h4 className="font-bold text-lg text-teal-700 mb-2">
                Zul Hijjah Focus Event
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Mi Zubair Bayat
              </p>
              <p className="text-gray-700 text-sm">
                The ultimate day of mercy and forgiveness
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;

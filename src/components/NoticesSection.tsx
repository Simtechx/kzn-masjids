
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

        {/* Notice Card with Navigation */}
        <div className="relative max-w-lg mx-auto">
          {/* Left Arrow */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-10">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Notice Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <img 
                src="/lovable-uploads/0ac4d9a5-7f6f-4e68-bcee-bb2ed0759b3f.png" 
                alt="Eid-ul-Adha Notice" 
                className="w-full h-64 object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-10">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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

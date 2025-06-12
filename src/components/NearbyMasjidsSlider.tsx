
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const NearbyMasjidsSlider: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-8 md:py-12 px-4 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#062C25] mb-4">
            Nearby Masjids & Musallahs in KwaZulu-Natal
          </h2>
        </div>

        {/* Search Radius Control */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-[#062C25] text-white p-6 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">15km</div>
              <div className="text-sm opacity-80">Your search radius</div>
            </div>
            
            {/* Slider */}
            <div className="relative">
              <div className="w-full h-2 bg-gray-600 rounded-full">
                <div className="w-1/3 h-2 bg-yellow-500 rounded-full relative">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>1s km</span>
                <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                  30 mins away
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-sm overflow-hidden border">
            <button className="px-6 py-2 bg-[#062C25] text-white font-medium flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
              NEARBY
            </button>
            <button className="px-6 py-2 text-gray-600 hover:bg-gray-50 font-medium flex items-center">
              <span className="w-2 h-2 border border-gray-400 rounded-full mr-2"></span>
              UPCOMING
            </button>
            <button className="px-6 py-2 text-gray-600 hover:bg-gray-50 font-medium flex items-center">
              <span className="w-2 h-2 border border-gray-400 rounded-full mr-2"></span>
              INFO
            </button>
          </div>
        </div>

        {/* Nearby Masjids List */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center text-[#062C25] mb-4">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Nearby Masjids</span>
          </div>

          <div className="space-y-3">
            {/* Masjid Items */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">Masjid-E-Noor</h3>
                  <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Masjid</span>
                </div>
                <p className="text-sm text-gray-600">0.5 km • Overport Road</p>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-medium">2 mins away</div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">Durban Islamic Centre</h3>
                  <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Masjid</span>
                </div>
                <p className="text-sm text-gray-600">1.2 km • Grey Street</p>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-medium">2 mins away</div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">Al-Ansaar Musalla</h3>
                  <span className="ml-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">Musalla</span>
                </div>
                <p className="text-sm text-gray-600">1.5 km • Chatsworth</p>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-medium">3 mins away</div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">Masjid Al-Hidaya</h3>
                  <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Masjid</span>
                </div>
                <p className="text-sm text-gray-600">2.1 km • Pietermaritzburg</p>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-medium">4 mins away</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyMasjidsSlider;

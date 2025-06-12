
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Slider } from '@/components/ui/slider';

const NearbyMasjidsSlider: React.FC = () => {
  const isMobile = useIsMobile();
  const [radius, setRadius] = useState([15]);
  const [activeTab, setActiveTab] = useState('nearby');

  const masjids = [
    {
      name: "Masjid-e-Noor",
      type: "Masjid",
      distance: "0.8 km",
      location: "Overport Road",
      timeAway: "2 mins away"
    },
    {
      name: "Durban Islamic Centre",
      type: "Masjid", 
      distance: "1.2 km",
      location: "Grey Street",
      timeAway: "2 mins away"
    },
    {
      name: "Al-Ansaar Musalla",
      type: "Musalla",
      distance: "1.5 km", 
      location: "Chatsworth",
      timeAway: "3 mins away"
    },
    {
      name: "Masjid Al-Hidaya",
      type: "Masjid",
      distance: "2.1 km",
      location: "Pietermaritzburg", 
      timeAway: "4 mins away"
    }
  ];

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
              <div className="text-3xl font-bold">{radius[0]}km</div>
              <div className="text-sm opacity-80">Your search radius</div>
            </div>
            
            {/* Slider */}
            <div className="relative mb-4">
              <Slider
                value={radius}
                onValueChange={setRadius}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
                {radius[0]} km
              </span>
              <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium">
                30 mins away
              </span>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-sm overflow-hidden border">
            <button 
              onClick={() => setActiveTab('nearby')}
              className={`px-6 py-2 font-medium flex items-center ${
                activeTab === 'nearby' 
                  ? 'bg-[#062C25] text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                activeTab === 'nearby' ? 'bg-white' : 'border border-gray-400'
              }`}></span>
              NEARBY
            </button>
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 font-medium flex items-center ${
                activeTab === 'upcoming' 
                  ? 'bg-[#062C25] text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                activeTab === 'upcoming' ? 'bg-white' : 'border border-gray-400'
              }`}></span>
              UPCOMING
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className={`px-6 py-2 font-medium flex items-center ${
                activeTab === 'info' 
                  ? 'bg-[#062C25] text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                activeTab === 'info' ? 'bg-white' : 'border border-gray-400'
              }`}></span>
              INFO
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'nearby' && (
          <div className="max-w-md mx-auto">
            <div className="flex items-center text-[#062C25] mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Nearby Masjids</span>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              {masjids.map((masjid, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium text-gray-800">{masjid.name}</h3>
                      <span className={`ml-2 text-white text-xs px-2 py-1 rounded ${
                        masjid.type === 'Masjid' ? 'bg-green-600' : 'bg-amber-600'
                      }`}>
                        {masjid.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{masjid.distance} • {masjid.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-medium text-sm">{masjid.timeAway}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="max-w-md mx-auto text-center py-8">
            <p className="text-gray-600">No upcoming events at this time</p>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="max-w-md mx-auto text-center py-8">
            <p className="text-gray-600">Additional information will be displayed here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NearbyMasjidsSlider;

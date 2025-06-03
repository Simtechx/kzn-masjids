import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Info } from 'lucide-react';

interface MasjidData {
  id: number;
  name: string;
  distance: string;
  address?: string;
  type: 'Masjid' | 'Musalla';
  time?: string;
  prayer?: string;
  status?: string;
}

const mockNearbyData: MasjidData[] = [
  { id: 1, name: "Masjid-e-Noor", distance: "0.8 km", address: "Overport Road", type: "Masjid" },
  { id: 2, name: "Durban Islamic Centre", distance: "1.2 km", address: "Grey Street", type: "Masjid" },
  { id: 3, name: "Al-Ansaar Musalla", distance: "1.5 km", address: "Chatsworth", type: "Musalla" },
  { id: 4, name: "Masjid Al-Hidaya", distance: "2.1 km", address: "Pietermaritzburg", type: "Masjid" }
];

const mockUpcomingData: MasjidData[] = [
  { id: 1, name: "Masjid-e-Noor", distance: "0.8 km away", address: "Overport Road", type: "Masjid", time: "06:32 PM", prayer: "Isha" },
  { id: 2, name: "Durban Islamic Centre", distance: "1.2 km away", address: "Grey Street", type: "Masjid", time: "06:35 PM", prayer: "Isha" },
  { id: 3, name: "Al-Ansaar Musalla", distance: "1.5 km away", address: "Chatsworth", type: "Musalla", time: "06:33 PM", prayer: "Isha" },
  { id: 4, name: "Masjid Al-Hidaya", distance: "2.1 km away", address: "Pietermaritzburg", type: "Masjid", time: "06:30 PM", prayer: "Isha" }
];

const mockInfoData: MasjidData[] = [
  { id: 1, name: "Masjid Al-Hilal", distance: "1.0 km", address: "Fajr - 6:00 AM", type: "Masjid", status: "Now" },
  { id: 2, name: "Central Musalla", distance: "1.5 km", address: "Maghrib - 6:15 PM", type: "Musalla", status: "Today" },
  { id: 3, name: "Eastgate Masjid", distance: "2.0 km", address: "Asr - 4:30 PM", type: "Masjid", status: "Today" },
  { id: 4, name: "Southlands Musalla", distance: "0.5 km", address: "Zuhr - 1:15 PM", type: "Musalla", status: "Now" }
];

const NearbyMasjidsSlider = () => {
  const [distance, setDistance] = useState([15]);
  const [activeTab, setActiveTab] = useState<'nearby' | 'upcoming' | 'info'>('nearby');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'nearby':
        return mockNearbyData;
      case 'upcoming':
        return mockUpcomingData;
      case 'info':
        return mockInfoData;
      default:
        return mockNearbyData;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'nearby':
        return 'Nearby Mosques';
      case 'upcoming':
        return 'Upcoming Prayer Times';
      case 'info':
        return 'Prayer Time Updates';
      default:
        return 'Nearby Mosques';
    }
  };

  const getHeaderIcon = () => {
    switch (activeTab) {
      case 'nearby':
        return <MapPin className="h-5 w-5 text-teal-600" />;
      case 'upcoming':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-yellow-600" />;
      default:
        return <MapPin className="h-5 w-5 text-teal-600" />;
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Nearby Masjids & Musallahs in KwaZulu-Natal
        </h2>
        
        {/* Distance Slider */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 text-white">
            <div className="text-center mb-6">
              <h3 className="text-3xl md:text-4xl font-bold">{distance[0]}km</h3>
              <p className="text-blue-100">Your search radius</p>
            </div>
            
            <div className="relative">
              <Slider
                value={distance}
                onValueChange={setDistance}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-blue-100 mt-2">
                <span>5km</span>
                <span>50km+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
          <Button
            variant={activeTab === 'nearby' ? 'default' : 'outline'}
            onClick={() => setActiveTab('nearby')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base ${
              activeTab === 'nearby' 
                ? 'bg-gray-800 text-white hover:bg-gray-900' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <MapPin className="h-4 w-4" />
            NEARBY
          </Button>
          
          <Button
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base ${
              activeTab === 'upcoming' 
                ? 'bg-gray-800 text-white hover:bg-gray-900' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Clock className="h-4 w-4" />
            UPCOMING
          </Button>
          
          <Button
            variant={activeTab === 'info' ? 'default' : 'outline'}
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base ${
              activeTab === 'info' 
                ? 'bg-gray-800 text-white hover:bg-gray-900' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Info className="h-4 w-4" />
            INFO
          </Button>
        </div>

        {/* Content Area */}
        <div className={`rounded-2xl p-6 ${
          activeTab === 'nearby' ? 'bg-teal-50' : 
          activeTab === 'upcoming' ? 'bg-blue-50' : 
          'bg-yellow-50'
        }`}>
          <div className="flex items-center gap-2 mb-6">
            {getHeaderIcon()}
            <h3 className="text-xl font-semibold text-gray-800">{getHeaderTitle()}</h3>
          </div>

          <div className="space-y-4">
            {getCurrentData().map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.type === 'Masjid' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type}
                      </span>
                      {item.status && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'Now' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.address}</p>
                    {activeTab === 'upcoming' && item.prayer && (
                      <p className="text-xs text-blue-600 mt-1">{item.prayer}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {activeTab === 'upcoming' && item.time ? (
                      <span className="text-lg font-bold text-blue-600">{item.time}</span>
                    ) : (
                      <span className="text-sm font-medium text-teal-600">{item.distance}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyMasjidsSlider;

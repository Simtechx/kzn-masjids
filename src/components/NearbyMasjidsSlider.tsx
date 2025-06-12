import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  { id: 1, name: "Masjid-e-Noor", distance: "0.8 km", address: "Overport Road", type: "Masjid", time: "06:32 PM", prayer: "isha" },
  { id: 2, name: "Durban Islamic Centre", distance: "1.2 km", address: "Grey Street", type: "Masjid", time: "06:35 PM", prayer: "isha" },
  { id: 3, name: "Al-Ansaar Musalla", distance: "1.5 km", address: "Chatsworth", type: "Musalla", time: "06:33 PM", prayer: "isha" },
  { id: 4, name: "Masjid Al-Hidaya", distance: "2.1 km", address: "Pietermaritzburg", type: "Masjid", time: "06:30 PM", prayer: "isha" }
];

const mockInfoData: MasjidData[] = [
  { id: 1, name: "Masjid Al-Hilal", distance: "1.0 km", address: "23 Main Street", type: "Masjid", status: "Now", prayer: "fajr", time: "6:00 AM" },
  { id: 2, name: "Central Musalla", distance: "1.5 km", address: "45 Central Road", type: "Musalla", status: "Today", prayer: "maghrib", time: "6:15 PM" },
  { id: 3, name: "Eastgate Masjid", distance: "2.0 km", address: "78 East Avenue", type: "Masjid", status: "Today", prayer: "asr", time: "4:30 PM" },
  { id: 4, name: "Southlands Musalla", distance: "0.5 km", address: "12 South Street", type: "Musalla", status: "Now", prayer: "dhuhr", time: "1:15 PM" }
];

const NearbyMasjidsSlider = () => {
  const [distance, setDistance] = useState([15]);
  const [activeTab, setActiveTab] = useState<'nearby' | 'upcoming' | 'info'>('nearby');
  const isMobile = useIsMobile();

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
        return isMobile ? 'Nearby' : 'Nearby Masjids';
      case 'upcoming':
        return 'Upcoming Salaah Times';
      case 'info':
        return 'Salaah Time Updates';
      default:
        return 'Nearby Masjids';
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

  const getApproxTime = (distance: string) => {
    const km = parseFloat(distance.replace(/[^\d.]/g, ''));
    const minutes = Math.round(km * 2);
    return `${minutes} mins away`;
  };

  const getPrayerBadgeStyle = (prayer: string) => {
    switch (prayer?.toLowerCase()) {
      case 'fajr':
        return 'bg-pink-600 text-white';
      case 'dhuhr':
        return 'bg-amber-600 text-white';
      case 'asr':
        return 'bg-emerald-600 text-white';
      case 'isha':
        return 'bg-indigo-600 text-white';
      case 'maghrib':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 bg-white overflow-x-hidden">
      <div className="container mx-auto max-w-4xl">
        {isMobile ? (
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">Nearby</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">Masjids & Musallahs</h3>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">in KwaZulu-Natal</p>
          </div>
        ) : (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Nearby Masjids & Musallahs in KwaZulu-Natal
          </h2>
        )}
        
        {/* Distance Slider */}
        <div className="mb-8">
          <div 
            className={`${isMobile ? 'max-w-full' : 'max-w-4xl'} mx-auto rounded-2xl p-6 text-white shadow-lg`}
            style={{ backgroundColor: '#072c23' }}
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl md:text-4xl font-bold">{distance[0]}km</h3>
              <p className="text-green-200">Your search radius</p>
            </div>
            
            <div className="relative">
              <Slider
                value={distance}
                onValueChange={setDistance}
                max={100}
                min={0}
                step={1}
                className="w-full [&_.bg-primary]:bg-yellow-400 [&_.border-primary]:border-yellow-400 [&_.bg-background]:bg-white [&_.bg-secondary]:bg-white"
                style={{
                  '--slider-thumb-size': '20px',
                  '--slider-thumb-bg': '#FBBF24',
                  '--slider-thumb-border': '2px solid black'
                } as React.CSSProperties}
              />
            </div>

            {/* Km and time pills */}
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-between'} mt-6 px-2`}>
              {/* Km pill - only show on desktop */}
              {!isMobile && (
                <div 
                  className="rounded-full px-5 py-2 font-semibold flex items-center justify-center shadow-md w-max"
                  style={{ backgroundColor: 'white', color: 'black', border: '2px solid #FBBF24' }}
                >
                  {distance[0]} km
                </div>
              )}

              {/* Time away pill */}
              <div className={`bg-yellow-400 text-green-900 rounded-full font-semibold flex items-center gap-2 shadow-md w-max ${isMobile ? 'px-3 py-1' : 'px-4 py-1'}`}>
                <Clock className="h-4 w-4" />
                <span className={isMobile ? "text-base font-bold" : ""}>
                  {getApproxTime(`${distance[0]}km`)}
                </span>
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
                ? 'text-white hover:opacity-90' 
                : 'bg-white text-black border-black hover:bg-gray-100'
            }`}
            style={activeTab === 'nearby' ? { backgroundColor: '#072C23' } : {}}
          >
            <MapPin className="h-4 w-4" />
            NEARBY
          </Button>
          
          <Button
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base ${
              activeTab === 'upcoming' 
                ? 'text-white hover:opacity-90' 
                : 'bg-white text-black border-black hover:bg-gray-100'
            }`}
            style={activeTab === 'upcoming' ? { backgroundColor: '#072C23' } : {}}
          >
            <Clock className="h-4 w-4" />
            UPCOMING
          </Button>
          
          <Button
            variant={activeTab === 'info' ? 'default' : 'outline'}
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base ${
              activeTab === 'info' 
                ? 'text-white hover:opacity-90' 
                : 'bg-white text-black border-black hover:bg-gray-100'
            }`}
            style={activeTab === 'info' ? { backgroundColor: '#072C23' } : {}}
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
                {isMobile ? (
                  // Mobile layout - organized block view
                  <div>
                    {/* First line: Masjid name and badges */}
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-800 text-base">{item.name}</h4>
                      <Badge 
                        variant={item.type === 'Masjid' ? 'default' : 'secondary'}
                        className={`text-xs px-2 py-0.5 ${
                          item.type === 'Masjid' 
                            ? 'bg-green-600 text-white hover:bg-green-700 border-green-600' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                        }`}
                      >
                        {item.type}
                      </Badge>
                      {item.status && (
                        <Badge 
                          variant="outline"
                          className={`text-xs px-2 py-0.5 ${
                            item.status === 'Now' 
                              ? 'bg-red-100 text-red-700 border-red-300' 
                              : 'bg-green-100 text-green-700 border-green-300'
                          }`}
                        >
                          {item.status}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Second line */}
                    {activeTab === 'nearby' ? (
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">{item.distance}</span>
                        <span className="mx-2">•</span>
                        <span>{item.address}</span>
                      </div>
                    ) : activeTab === 'upcoming' ? (
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">{item.distance}</span>
                        <span className="mx-2">•</span>
                        <span>{item.address}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                        <span className="font-medium">{item.distance}</span>
                        <Badge 
                          className={`text-xs px-2 py-0.5 ${getPrayerBadgeStyle(item.prayer || '')}`}
                        >
                          {item.prayer?.charAt(0).toUpperCase() + item.prayer?.slice(1)}
                        </Badge>
                        <span className="font-medium">{item.time}</span>
                      </div>
                    )}
                    
                    {/* Third line: Prayer info (for upcoming only) */}
                    {activeTab === 'upcoming' && item.prayer && item.time && (
                      <div className="flex items-center gap-2 mb-3">
                        <Badge 
                          className={`text-xs px-2 py-0.5 ${getPrayerBadgeStyle(item.prayer)}`}
                        >
                          {item.prayer.charAt(0).toUpperCase() + item.prayer.slice(1)}
                        </Badge>
                        <span className="text-sm font-medium text-gray-800">{item.time}</span>
                      </div>
                    )}
                    
                    {/* Last line: Time away in yellow badge */}
                    <div className="flex justify-center">
                      <Badge className="bg-yellow-400 text-black font-medium text-sm px-2 py-1">
                        {getApproxTime(item.distance)}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  // Desktop layout
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <Badge 
                          variant={item.type === 'Masjid' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            item.type === 'Masjid' 
                              ? 'bg-green-600 text-white hover:bg-green-700 border-green-600' 
                              : 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                          }`}
                        >
                          {item.type}
                        </Badge>
                        {item.status && (
                          <Badge 
                            variant="outline"
                            className={`text-xs ${
                              item.status === 'Now' 
                                ? 'bg-red-100 text-red-700 border-red-300' 
                                : 'bg-green-100 text-green-700 border-green-300'
                            }`}
                          >
                            {item.status}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{item.distance}</span>
                        <span>•</span>
                        <span>{item.address}</span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      {activeTab === 'upcoming' && item.time ? (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#0f766e]" style={{ fontSize: '18px' }}>
                            {getApproxTime(item.distance)}
                          </span>
                          <Badge className={`${getPrayerBadgeStyle(item.prayer || '')}`}>
                            {item.prayer?.charAt(0).toUpperCase() + item.prayer?.slice(1)}
                          </Badge>
                          <span className="text-lg font-bold text-blue-600" style={{ fontSize: '24px' }}>
                            {item.time}
                          </span>
                        </div>
                      ) : activeTab === 'info' && item.prayer && item.time ? (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#0f766e]" style={{ fontSize: '18px' }}>
                            {getApproxTime(item.distance)}
                          </span>
                          <Badge className={`${getPrayerBadgeStyle(item.prayer)}`}>
                            {item.prayer.charAt(0).toUpperCase() + item.prayer.slice(1)}
                          </Badge>
                          <div className="text-lg font-bold text-yellow-600" style={{ fontSize: '24px' }}>
                            {item.time}
                          </div>
                        </div>
                      ) : (
                        <span className="font-medium text-[#0f766e]" style={{ fontSize: '24px' }}>
                          {getApproxTime(item.distance)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NearbyMasjidsSlider;

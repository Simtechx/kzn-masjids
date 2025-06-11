
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface MasjidInfo {
  id: number;
  name: string;
  address: string;
  distance: string;
  timeAway: string;
  type: 'MASJID' | 'MUSALLA';
  image: string;
  nextPrayer: {
    name: string;
    time: string;
  };
}

const mockNearbyMasjids: MasjidInfo[] = [
  {
    id: 1,
    name: "Masjid-E-Noor",
    address: "123 Masjid Road, Durban Central",
    distance: "0.5km",
    timeAway: "2 min",
    type: "MASJID",
    image: "https://drive.google.com/thumbnail?id=1nEMtOkRyD1WRt-f5pMaLDdW4IJ9Lbn7w&sz=w800",
    nextPrayer: { name: "Dhuhr", time: "12:45" }
  },
  {
    id: 2,
    name: "Westville Masjid",
    address: "25 Jan Hofmeyr Road, Westville",
    distance: "2.1km",
    timeAway: "7 min",
    type: "MASJID",
    image: "https://drive.google.com/thumbnail?id=1IdOKjQktjarpCt-PAN3Fpzgd5VYS1qSN&sz=w800",
    nextPrayer: { name: "Dhuhr", time: "13:00" }
  },
  {
    id: 3,
    name: "Asherville Musalla",
    address: "456 Community Center, Asherville",
    distance: "1.8km",
    timeAway: "5 min",
    type: "MUSALLA",
    image: "https://drive.google.com/thumbnail?id=1GqvGcUYqY-EnCyGDF3DeaASg3T-tVDC3&sz=w800",
    nextPrayer: { name: "Dhuhr", time: "12:30" }
  },
  {
    id: 4,
    name: "Central Masjid",
    address: "789 Smith Street, Durban CBD",
    distance: "3.2km",
    timeAway: "12 min",
    type: "MASJID",
    image: "https://drive.google.com/thumbnail?id=1HX9jUCSWAYz9QlTYnmedHc5SGfxMwj0G&sz=w800",
    nextPrayer: { name: "Dhuhr", time: "12:50" }
  },
  {
    id: 5,
    name: "Chatsworth Masjid",
    address: "321 Arena Park, Chatsworth",
    distance: "5.7km",
    timeAway: "18 min",
    type: "MASJID",
    image: "https://drive.google.com/thumbnail?id=1Nu7B5FSlUpaqYUDxTpzh-LVXJupbko8f&sz=w800",
    nextPrayer: { name: "Dhuhr", time: "12:55" }
  },
  {
    id: 6,
    name: "Phoenix Musalla",
    address: "654 Phoenix Drive, Phoenix",
    distance: "8.3km",
    timeAway: "25 min",
    type: "MUSALLA",
    image: "https://drive.google.com/thumbnail?id=1Af62pPaGoPtTWOzugrSMHtEfLc2jvdg5&sz=w800",
    nextPrayer: { name: "Dhuhr", time: "13:10" }
  }
];

const NearbyMasjidsSlider: React.FC = () => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 280 : 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#062C25] mb-2">
              Nearby Masjids & Musallahs
            </h2>
            <p className="text-gray-600">Find prayer spaces near your current location</p>
          </div>
          
          {!isMobile && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => scroll('left')}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => scroll('right')}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Scrollable Cards Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mockNearbyMasjids.map((masjid) => (
            <div 
              key={masjid.id}
              className={`flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                isMobile ? 'w-72' : 'w-80'
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={masjid.image} 
                  alt={masjid.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onLoad={() => console.log(`Image loaded successfully: ${masjid.image}`)}
                  onError={(e) => {
                    console.error(`Failed to load image: ${masjid.image}`);
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <Badge 
                    className={`${
                      masjid.type === 'MASJID' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-amber-600 text-white'
                    } shadow-md`}
                  >
                    {masjid.type}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-teal-700 mb-2 line-clamp-1">
                  {masjid.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {masjid.address}
                </p>

                {/* Distance and Time Away */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{masjid.distance}</span>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {masjid.timeAway} away
                  </div>
                </div>

                {/* Next Prayer Info */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Next Prayer:</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-teal-600 border-teal-600">
                      {masjid.nextPrayer.name}
                    </Badge>
                    <span className="font-semibold text-teal-700">{masjid.nextPrayer.time}</span>
                  </div>
                </div>

                {/* Directions Button */}
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  size="sm"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyMasjidsSlider;

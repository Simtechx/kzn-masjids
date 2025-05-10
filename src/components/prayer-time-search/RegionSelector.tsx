
import React from 'react';
import { prayerTimesData, subRegionsData } from '@/utils/prayerTimeUtils';
import { MapPin } from 'lucide-react';

interface RegionSelectorProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

// Region background images
const regionBackgrounds = {
  "North Coast": "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&q=80",
  "South Coast": "https://images.unsplash.com/photo-1602002418082-dd4a1f45daff?auto=format&fit=crop&q=80",
  "Midlands": "https://images.unsplash.com/photo-1536048810607-3dc7f86981cb?auto=format&fit=crop&q=80",
  "Northern Natal": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80",
  "Durban": "https://images.unsplash.com/photo-1618590067324-3f5135afd526?auto=format&fit=crop&q=80",
};

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onSelectRegion }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {Object.keys(prayerTimesData).filter(region => region !== 'Transkei').map((region) => {
        const subRegionCount = subRegionsData[region as keyof typeof subRegionsData]?.length || 0;
        const isSelected = selectedRegion === region;
        
        // Calculate counts for masjids and musallas
        const masjidCount = prayerTimesData[region as keyof typeof prayerTimesData]?.length || 0;
        // Mock musalla count - in real app, you'd get this from data
        const musallaCount = Math.floor(masjidCount * 0.6);
        
        return (
          <div
            key={region}
            className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
              isSelected ? "ring-4 ring-teal-700" : "hover:shadow-lg"
            }`}
            onClick={() => onSelectRegion(region)}
          >
            {/* Background Image */}
            <div 
              className="aspect-[4/3] bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${regionBackgrounds[region as keyof typeof regionBackgrounds] || "https://images.unsplash.com/photo-1616432043562-3671ea2e5242"})` 
              }}
            >
              {/* Overlay for text visibility */}
              <div className={`absolute inset-0 bg-black/50 flex flex-col justify-end p-4`}>
                <h3 className="text-white text-xl font-bold">{region}</h3>
                <div className="flex items-center text-white/90 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{subRegionCount} sub-regions</span>
                </div>
                <div className="text-white/80 text-sm mt-1">
                  {masjidCount} Masjids • {musallaCount} Musallas
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegionSelector;

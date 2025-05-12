
import React from 'react';
import { MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import regionBackgroundImages from '@/utils/regionBackgroundImages';

interface RegionTilesProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionTiles: React.FC<RegionTilesProps> = ({ selectedRegion, onSelectRegion }) => {
  const isMobile = useIsMobile();
  
  // Updated region data with correct counts
  const regions = [
    {
      name: 'Durban',
      subRegions: 5,
      masjids: 79,
      musallas: 59,
      total: 138,
      backgroundImage: regionBackgroundImages['Durban']
    },
    {
      name: 'Midlands',
      subRegions: 4,
      masjids: 39,
      musallas: 22,
      total: 61,
      backgroundImage: regionBackgroundImages['Midlands']
    },
    {
      name: 'North Coast',
      subRegions: 4,
      masjids: 37,
      musallas: 26,
      total: 63,
      backgroundImage: regionBackgroundImages['North Coast']
    },
    {
      name: 'South Coast',
      subRegions: 4,
      masjids: 19,
      musallas: 15,
      total: 34,
      backgroundImage: regionBackgroundImages['South Coast']
    },
    {
      name: 'Northern Natal',
      subRegions: 5,
      masjids: 20,
      musallas: 13,
      total: 33,
      backgroundImage: regionBackgroundImages['Northern Natal']
    }
  ];

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'}`}>
      {regions.map((regionData) => (
        <div
          key={regionData.name}
          className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
            selectedRegion === regionData.name ? 'ring-4 ring-yellow-500' : 'hover:shadow-lg'
          }`}
          onClick={() => onSelectRegion(regionData.name)}
        >
          <div 
            className="aspect-video bg-cover bg-center relative"
            style={{ backgroundImage: `url('${regionData.backgroundImage}')` }}
          >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Region name and details */}
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <h3 className="text-white text-xl font-bold drop-shadow-md">{regionData.name}</h3>
              
              <div className="flex flex-col space-y-1">
                <div className="flex items-center text-white/90">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{regionData.subRegions} sub-regions</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="bg-white/20 backdrop-blur-sm rounded p-1 text-center">
                    <span className="block text-white text-xs">Masjids</span>
                    <span className="block text-white font-bold">{regionData.masjids}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded p-1 text-center">
                    <span className="block text-white text-xs">Musallas</span>
                    <span className="block text-white font-bold">{regionData.musallas}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegionTiles;

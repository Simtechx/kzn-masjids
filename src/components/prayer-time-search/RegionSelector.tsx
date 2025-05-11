
import React from 'react';
import RegionCard from './RegionCard';
import regionBackgroundImages from '@/utils/regionBackgroundImages';
import { useIsMobile } from '@/hooks/use-mobile';

interface RegionSelectorProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onSelectRegion }) => {
  // Reorder regions according to the footer sequence
  const regions = [
    {
      name: 'Durban',
      subRegions: 5,
      masjids: 79,
      musallas: 59
    },
    {
      name: 'Midlands',
      subRegions: 4,
      masjids: 39,
      musallas: 22
    },
    {
      name: 'North Coast',
      subRegions: 4,
      masjids: 37,
      musallas: 26
    },
    {
      name: 'South Coast',
      subRegions: 4,
      masjids: 19,
      musallas: 15
    },
    {
      name: 'Northern Natal',
      subRegions: 5,
      masjids: 20,
      musallas: 13
    }
  ];
  
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'overflow-x-auto -mx-4 px-4' : ''} mb-6`}>
      <div className={`${isMobile ? 'flex flex-row min-w-max gap-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'}`}>
        {regions.map((region) => {
          const isSelected = selectedRegion === region.name;
          
          return (
            <div key={region.name} className={isMobile ? 'min-w-[180px] max-w-[220px]' : ''}>
              <RegionCard
                region={region.name}
                isSelected={isSelected}
                backgroundImage={regionBackgroundImages[region.name as keyof typeof regionBackgroundImages] || "https://images.unsplash.com/photo-1616432043562-3671ea2e5242"}
                subRegionCount={region.subRegions}
                masjidCount={region.masjids}
                musallaCount={region.musallas}
                onSelectRegion={onSelectRegion}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegionSelector;

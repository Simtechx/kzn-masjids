
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
      subRegions: 8,
      masjids: 79,
      musallas: 59
    },
    {
      name: 'Midlands',
      subRegions: 5,
      masjids: 39,
      musallas: 22
    },
    {
      name: 'North Coast',
      subRegions: 7,
      masjids: 37,
      musallas: 26
    },
    {
      name: 'South Coast',
      subRegions: 6,
      masjids: 19,
      musallas: 15
    },
    {
      name: 'Northern Natal',
      subRegions: 6,
      masjids: 20,
      musallas: 13
    }
  ];
  
  const isMobile = useIsMobile();
  
  return (
    <div className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
      <div className="flex flex-row gap-4 min-w-max">
        {regions.map((region) => {
          const isSelected = selectedRegion === region.name;
          
          return (
            <div key={region.name} className="min-w-[180px] max-w-[220px]">
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

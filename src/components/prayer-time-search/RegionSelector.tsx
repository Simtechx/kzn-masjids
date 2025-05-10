
import React from 'react';
import { prayerTimesData, subRegionsData } from '@/utils/prayerTimeUtils';
import RegionCard from './RegionCard';
import regionBackgroundImages from '@/utils/regionBackgroundImages';

interface RegionSelectorProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onSelectRegion }) => {
  const regions = Object.keys(prayerTimesData).filter(region => region !== 'Transkei');
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {regions.map((region) => {
        const subRegionCount = subRegionsData[region as keyof typeof subRegionsData]?.length || 0;
        const isSelected = selectedRegion === region;
        
        // Calculate counts for masjids and musallas
        const masjidCount = prayerTimesData[region as keyof typeof prayerTimesData]?.length || 0;
        // Mock musalla count - in real app, you'd get this from data
        const musallaCount = Math.floor(masjidCount * 0.6);
        
        return (
          <RegionCard
            key={region}
            region={region}
            isSelected={isSelected}
            backgroundImage={regionBackgroundImages[region as keyof typeof regionBackgroundImages] || "https://images.unsplash.com/photo-1616432043562-3671ea2e5242"}
            subRegionCount={subRegionCount}
            masjidCount={masjidCount}
            musallaCount={musallaCount}
            onSelectRegion={onSelectRegion}
          />
        );
      })}
    </div>
  );
};

export default RegionSelector;

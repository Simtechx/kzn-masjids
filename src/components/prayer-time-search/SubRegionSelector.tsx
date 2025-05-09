
import React from 'react';
import { Button } from '@/components/ui/button';
import { subRegionsData } from '@/utils/prayerTimeUtils';

interface SubRegionSelectorProps {
  selectedRegion: string | null;
  selectedSubRegion: string | null;
  onSelectSubRegion: (subRegion: string) => void;
}

const SubRegionSelector: React.FC<SubRegionSelectorProps> = ({ 
  selectedRegion,
  selectedSubRegion, 
  onSelectSubRegion 
}) => {
  if (!selectedRegion) return null;
  
  const subRegions = subRegionsData[selectedRegion as keyof typeof subRegionsData] || [];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {subRegions.map((subRegion) => (
        <Button
          key={subRegion}
          variant={selectedSubRegion === subRegion ? "default" : "outline"} 
          className={`${selectedSubRegion === subRegion ? "bg-islamic-green text-white" : "text-gray-700"} py-1 px-3`}
          onClick={() => onSelectSubRegion(subRegion)}
          size="sm"
        >
          {subRegion}
        </Button>
      ))}
    </div>
  );
};

export default SubRegionSelector;

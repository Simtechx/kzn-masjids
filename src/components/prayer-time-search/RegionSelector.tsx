
import React from 'react';
import { Button } from '@/components/ui/button';
import { prayerTimesData } from '@/utils/prayerTimeUtils';

interface RegionSelectorProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onSelectRegion }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(prayerTimesData).map((region) => (
        <Button
          key={region}
          variant={selectedRegion === region ? "default" : "outline"} 
          className={`${selectedRegion === region ? "bg-islamic-green text-white" : "text-gray-700"} py-2 px-4`}
          onClick={() => onSelectRegion(region)}
          size="sm"
        >
          {region}
        </Button>
      ))}
    </div>
  );
};

export default RegionSelector;

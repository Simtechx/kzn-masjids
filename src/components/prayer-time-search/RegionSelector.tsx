
import React from 'react';
import { Button } from '@/components/ui/button';
import { prayerTimesData } from '@/utils/prayerTimeUtils';

interface RegionSelectorProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onSelectRegion }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {Object.keys(prayerTimesData).map((region) => (
        <Button
          key={region}
          variant={selectedRegion === region ? "default" : "outline"} 
          className={selectedRegion === region ? "bg-islamic-green text-white" : "text-gray-700"}
          onClick={() => onSelectRegion(region)}
        >
          {region}
        </Button>
      ))}
    </div>
  );
};

export default RegionSelector;

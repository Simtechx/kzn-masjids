
import React from 'react';
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
  const masjidCounts = {
    "North": 15,
    "South": 12,
    "City": 10,
    "Overport": 8,
    "Suburbs": 14,
    // Add others as needed
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl text-islamic-blue font-medium mb-4">{selectedRegion} Sub-Regions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {subRegions.map((subRegion) => (
          <div
            key={subRegion}
            onClick={() => onSelectSubRegion(subRegion)}
            className={`
              cursor-pointer rounded-md p-4 text-center transition-all duration-200
              ${selectedSubRegion === subRegion 
                ? "bg-islamic-blue text-white" 
                : "bg-blue-50 text-islamic-blue hover:bg-blue-100"}
            `}
          >
            <div className="font-medium">{subRegion}</div>
            <div className="text-sm mt-1">
              {masjidCounts[subRegion as keyof typeof masjidCounts] || 5} Masjids
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubRegionSelector;

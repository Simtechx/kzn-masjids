
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
  
  // Add Transkei as a sub-region of South Coast if selected region is South Coast
  let subRegions = subRegionsData[selectedRegion as keyof typeof subRegionsData] || [];
  if (selectedRegion === 'South Coast') {
    subRegions = [...subRegions, 'Transkei'];
  }
  
  // Mock masjid counts for each sub-region
  const masjidCounts = {
    // North Coast
    "Stanger": 5,
    "Ballito": 3,
    "Tongaat": 6,
    "Verulam": 7,
    
    // South Coast
    "Port Shepstone": 4,
    "Margate": 3,
    "Scottburgh": 5,
    "Umkomaas": 3,
    "Transkei": 4,
    
    // Durban
    "North": 15,
    "South": 12,
    "City": 10,
    "Overport": 8,
    "Suburbs": 14,
    
    // Midlands
    "Pietermaritzburg": 6,
    "Richmond": 2,
    "Howick": 3,
    "Other": 4,
    
    // Northern Natal
    "Newcastle": 5,
    "Ladysmith": 4,
    "Dundee": 3,
    "Vryheid": 4,
    "Utrecht": 3,
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl text-islamic-green font-medium mb-4">{selectedRegion} Sub-Regions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {subRegions.map((subRegion) => (
          <div
            key={subRegion}
            onClick={() => onSelectSubRegion(subRegion)}
            className={`
              cursor-pointer rounded-md p-4 text-center transition-all duration-200
              ${selectedSubRegion === subRegion 
                ? "bg-islamic-green text-white" 
                : "bg-blue-50 text-islamic-green hover:bg-blue-100"}
            `}
          >
            <div className="font-medium">{subRegion}</div>
            <div className="text-sm mt-1">
              {masjidCounts[subRegion as keyof typeof masjidCounts] || 3} Masjids
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubRegionSelector;

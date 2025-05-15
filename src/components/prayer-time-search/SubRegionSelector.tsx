
import React, { useEffect, useState } from 'react';
import { prayerTimesData } from '@/utils/prayerTimeUtils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [subRegions, setSubRegions] = useState<string[]>([]);
  
  useEffect(() => {
    if (!selectedRegion) return;
    
    // Dynamically extract unique sub-regions from the prayerTimesData
    const regionData = prayerTimesData[selectedRegion as keyof typeof prayerTimesData] || [];
    const uniqueSubRegions = new Set<string>();
    
    regionData.forEach(masjid => {
      if (masjid.district) {
        uniqueSubRegions.add(masjid.district);
      }
    });
    
    // Convert Set to array and sort alphabetically
    const sortedSubRegions = Array.from(uniqueSubRegions).sort();
    
    // Add Transkei as a sub-region of South Coast if selected region is South Coast
    if (selectedRegion === 'South Coast' && !sortedSubRegions.includes('Transkei')) {
      sortedSubRegions.push('Transkei');
    }
    
    setSubRegions(sortedSubRegions);
  }, [selectedRegion]);
  
  if (!selectedRegion) return null;
  
  // Mock masjid counts for each sub-region
  const getMasjidCount = (subRegion: string): number => {
    if (!selectedRegion) return 0;
    
    const regionData = prayerTimesData[selectedRegion as keyof typeof prayerTimesData] || [];
    return regionData.filter(masjid => masjid.district === subRegion).length || 3;
  };

  return (
    <div className="mb-6">
      <h3 className={`text-xl font-medium mb-4 p-2 rounded text-center ${selectedSubRegion ? "bg-[#062C25] text-white" : "text-[#062C25]"}`}>
        {selectedRegion} Sub-Regions
        {selectedSubRegion && <span className="ml-2">→ {selectedSubRegion}</span>}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {subRegions.map((subRegion) => (
          <div
            key={subRegion}
            onClick={() => onSelectSubRegion(subRegion)}
            className={`
              cursor-pointer rounded-md p-3 text-center transition-all duration-200 shadow-sm
              ${selectedSubRegion === subRegion 
                ? "bg-[#062C25] text-white ring-2 ring-[#062C25] ring-offset-2" 
                : "bg-blue-50 text-[#062C25] hover:bg-blue-100 border border-blue-100"}
            `}
          >
            <div className="font-medium text-md">{subRegion}</div>
            <div className="text-xs mt-1">
              {getMasjidCount(subRegion)} Masjids
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubRegionSelector;

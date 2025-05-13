
import { useState } from 'react';
import { prayerTimesData, PrayerType, SearchType, MasjidData } from '@/utils/prayerTimeUtils';

export function usePrayerTimeSearch() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<SearchType>('earliest');
  const [activePrayer, setActivePrayer] = useState<PrayerType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'block' | 'table'>('block');
  const [regionViewMode, setRegionViewMode] = useState<'icons' | 'grid' | 'tiles'>('icons');
  
  const handleRegionSelection = (region: string) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);
    setActivePrayer(null);
    setSelectedTime(null);
  };
  
  const handleSubRegionSelection = (subRegion: string) => {
    setSelectedSubRegion(subRegion);
    setActivePrayer(null);
    setSelectedTime(null);
  };

  const handlePrayerSelection = (prayer: PrayerType) => {
    setActivePrayer(activePrayer === prayer ? null : prayer);
    setSelectedTime(null);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const getFilteredPrayerTimes = (): MasjidData[] => {
    if (!selectedRegion) return [];
    
    const regionData = prayerTimesData[selectedRegion as keyof typeof prayerTimesData] || [];
    
    let filteredData = [...regionData];
    
    // Filter by sub-region if selected
    if (selectedSubRegion) {
      filteredData = filteredData.filter(masjid => 
        masjid.masjid.includes(selectedSubRegion)
      );
    }
    
    // Filter by selected prayer time
    if (activePrayer && selectedTime) {
      filteredData = filteredData.filter(masjid => 
        masjid[activePrayer] === selectedTime
      );
    }
    
    return filteredData;
  };
  
  return {
    selectedRegion,
    selectedSubRegion,
    searchType,
    activePrayer,
    selectedTime,
    viewMode,
    regionViewMode,
    handleRegionSelection,
    handleSubRegionSelection,
    handlePrayerSelection,
    handleTimeSelection,
    getFilteredPrayerTimes,
    setSearchType,
    setViewMode,
    setRegionViewMode
  };
}

import { useState, useEffect } from 'react';
import { prayerTimesData, PrayerType, SearchType, MasjidData } from '@/utils/prayerTimeUtils';
import { toast } from 'sonner';

const PRAYER_TIMES_API_URL = "https://script.google.com/macros/s/AKfycbwmAGWqC3dXCMhIZVxykWJ84XBpSnbR7GZQ_EWTeMGhp3DH0hrxeG5rGU4BCD-cbHBl/exec";

export function usePrayerTimeSearch() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<SearchType>('earliest');
  const [activePrayer, setActivePrayer] = useState<PrayerType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'block' | 'table'>('block');
  const [regionViewMode, setRegionViewMode] = useState<'icons' | 'grid' | 'tiles'>('icons');
  const [prayerData, setPrayerData] = useState<Record<string, MasjidData[]>>(prayerTimesData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch data from the live API
  useEffect(() => {
    const fetchLivePrayerTimes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(PRAYER_TIMES_API_URL);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        
        // Check if the data has the expected structure
        if (data && typeof data === 'object') {
          console.log('Live prayer times data loaded successfully', data);
          setPrayerData(data);
          toast.success('Live prayer times data loaded successfully');
        } else {
          console.error('Invalid data format received from API');
          toast.error('Could not load live prayer times - invalid data format');
        }
      } catch (error) {
        console.error('Error fetching prayer times data:', error);
        toast.error('Could not load live prayer times - falling back to stored data');
        // Keep using the local data
      } finally {
        setIsLoading(false);
      }
    };

    fetchLivePrayerTimes();
  }, []);
  
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
    
    const regionData = prayerData[selectedRegion as keyof typeof prayerData] || [];
    
    let filteredData = [...regionData];
    
    // Filter by search query if present
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filteredData = filteredData.filter(masjid => 
        masjid.masjid.toLowerCase().includes(query) || 
        (masjid.district && masjid.district.toLowerCase().includes(query)) ||
        (masjid.address && masjid.address.toLowerCase().includes(query))
      );
    }
    
    // Filter by sub-region if selected
    if (selectedSubRegion) {
      filteredData = filteredData.filter(masjid => 
        masjid.district === selectedSubRegion || masjid.masjid.includes(selectedSubRegion)
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
    searchQuery,
    isLoading,
    handleRegionSelection,
    handleSubRegionSelection,
    handlePrayerSelection,
    handleTimeSelection,
    getFilteredPrayerTimes,
    setSearchType,
    setViewMode,
    setRegionViewMode,
    setSearchQuery,
    prayerData
  };
}

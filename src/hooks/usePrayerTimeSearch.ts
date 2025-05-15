
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
        console.log('Raw API response:', data);
        
        // Check if the data has the expected structure
        if (data && data.data && Array.isArray(data.data)) {
          // Transform the API data to match our application's expected structure
          const transformedData: Record<string, MasjidData[]> = {};
          
          data.data.forEach((item: any) => {
            // Convert region name to title case for consistency
            const region = item.REGION ? formatRegionName(item.REGION) : "Unknown Region";
            
            if (!transformedData[region]) {
              transformedData[region] = [];
            }
            
            // Convert API datetime format to time string (HH:MM)
            const formatTimeFromAPI = (dateTime: string | null) => {
              if (!dateTime) return '';
              try {
                const date = new Date(dateTime);
                return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
              } catch (e) {
                console.error('Error parsing time:', dateTime, e);
                return '';
              }
            };
            
            // Map API fields to our data model
            const masjidData: MasjidData = {
              masjid: item.Masjid || 'Unknown',
              address: item.Address || '',
              district: item['Sub-Region'] || '',
              type: item.TYPE || 'MASJID',
              fajr: formatTimeFromAPI(item.Fajr),
              dhuhr: formatTimeFromAPI(item.Zuhr), // Note the field name difference
              asr: formatTimeFromAPI(item.Asr),
              maghrib: '17:45', // Default value as it's not in the API
              isha: formatTimeFromAPI(item.Isha)
            };
            
            transformedData[region].push(masjidData);
          });
          
          console.log('Transformed prayer times data:', transformedData);
          setPrayerData(transformedData);
          toast.success('Live prayer times data loaded successfully');
        } else {
          console.error('Invalid data format received from API', data);
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
  
  // Format region name to title case (e.g., "NORTH COAST" -> "North Coast")
  const formatRegionName = (name: string): string => {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
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

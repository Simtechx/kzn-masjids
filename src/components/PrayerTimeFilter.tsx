
import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, Table2, Blocks } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import RegionSelector from './prayer-time-search/RegionSelector';
import RegionTable from './prayer-time-search/RegionTable';
import RegionTiles from './prayer-time-search/RegionTiles';
import SubRegionSelector from './prayer-time-search/SubRegionSelector';
import ViewToggle from './prayer-time-search/ViewToggle';
import PrayerTimesDisplay from './prayer-time-search/PrayerTimesDisplay';
import { usePrayerTimeSearch } from '@/hooks/usePrayerTimeSearch';
import { prayerTimesData, PrayerType } from '@/utils/prayerTimeUtils';

const PrayerTimeFilter = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [regionViewMode, setRegionViewMode] = useState<'icons' | 'grid' | 'tiles'>('icons');
  const [activePrayer, setActivePrayer] = useState<PrayerType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Use the prayer time search hook for full functionality
  const {
    selectedSubRegion,
    viewMode,
    handleSubRegionSelection,
    getFilteredPrayerTimes,
    setViewMode
  } = usePrayerTimeSearch();

  const handleRegionSelection = (region: string) => {
    setSelectedRegion(region);
    setActivePrayer(null);
    setSelectedTime(null);
  };

  const handlePrayerTimeClick = (prayer: PrayerType, time: string) => {
    setActivePrayer(prayer);
    setSelectedTime(time);
  };

  // Get filtered times based on region and sub-region
  const getFilteredTimes = (prayer: PrayerType) => {
    if (!selectedRegion) return [];
    
    const regionData = prayerTimesData[selectedRegion as keyof typeof prayerTimesData] || [];
    let filteredData = regionData;
    
    if (selectedSubRegion) {
      filteredData = regionData.filter(masjid => masjid.district === selectedSubRegion);
    }
    
    const times = filteredData.map(masjid => masjid[prayer]).filter(time => time);
    return [...new Set(times)].sort();
  };

  // Get filtered masjids for block/table view based on selected prayer and time
  const getFilteredMasjidsForView = () => {
    if (!selectedRegion) return [];
    
    const regionData = prayerTimesData[selectedRegion as keyof typeof prayerTimesData] || [];
    let filteredData = regionData;
    
    // Filter by sub-region if selected
    if (selectedSubRegion) {
      filteredData = regionData.filter(masjid => masjid.district === selectedSubRegion);
    }
    
    // Filter by selected prayer time if both prayer and time are selected
    if (activePrayer && selectedTime) {
      filteredData = filteredData.filter(masjid => masjid[activePrayer] === selectedTime);
    }
    
    return filteredData;
  };

  // Get header title based on selections
  const getDisplayTitle = () => {
    if (activePrayer && selectedTime) {
      const baseLocation = selectedSubRegion ? selectedSubRegion : selectedRegion;
      return `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime} in ${baseLocation}`;
    } else if (selectedSubRegion && selectedRegion) {
      return `All Masjids in ${selectedSubRegion}, ${selectedRegion}`;
    } else if (selectedRegion) {
      return `All Masjids in ${selectedRegion}`;
    }
    return 'All Masjids';
  };

  // Define prayer colors for active states
  const getPrayerActiveColor = (prayer: PrayerType) => {
    const colors = {
      fajr: 'bg-[#DB2777] text-white',
      dhuhr: 'bg-[#D97706] text-white', 
      asr: 'bg-[#059669] text-white',
      isha: 'bg-[#4F46E5] text-white'
    };
    return colors[prayer];
  };

  const getPrayerHoverColor = (prayer: PrayerType) => {
    const colors = {
      fajr: 'hover:bg-[#DB2777] hover:text-white',
      dhuhr: 'hover:bg-[#D97706] hover:text-white',
      asr: 'hover:bg-[#059669] hover:text-white', 
      isha: 'hover:bg-[#4F46E5] hover:text-white'
    };
    return colors[prayer];
  };

  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className={`flex flex-col ${isMobile ? 'items-center text-center' : 'md:flex-row md:justify-between md:items-center'} gap-4 mb-6`}>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#062C25] leading-tight">Salaah Time Filters</h2>
            <p className="text-gray-600 mt-1">Filter salaah times in KwaZulu-Natal</p>
          </div>
          
          <div className="bg-gray-100 p-2 rounded-md self-center md:self-auto overflow-x-auto">
            <ToggleGroup 
              type="single" 
              value={regionViewMode} 
              onValueChange={(value) => value && setRegionViewMode(value as 'icons' | 'grid' | 'tiles')}
              className="bg-white shadow-sm rounded-md flex-nowrap whitespace-nowrap"
              role="group"
              dir="ltr"
            >
              <ToggleGroupItem 
                value="icons" 
                aria-label="Icons" 
                className="data-[state=on]:!bg-yellow-500 data-[state=on]:!text-black data-[state=off]:!text-gray-700"
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="ml-2">Icons</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="grid" 
                aria-label="Grid" 
                className="data-[state=on]:!bg-yellow-500 data-[state=on]:!text-black data-[state=off]:!text-gray-700"
              >
                <Table2 className="h-5 w-5" />
                <span className="ml-2">Grid</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="tiles" 
                aria-label="Tiles" 
                className="data-[state=on]:!bg-yellow-500 data-[state=on]:!text-black data-[state=off]:!text-gray-700"
              >
                <Blocks className="h-5 w-5" />
                <span className="ml-2">Tiles</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Region Selection */}
        {regionViewMode === 'icons' ? (
          <RegionSelector 
            selectedRegion={selectedRegion}
            onSelectRegion={handleRegionSelection}
          />
        ) : regionViewMode === 'grid' ? (
          <RegionTable 
            selectedRegion={selectedRegion}
            onSelectRegion={handleRegionSelection}
          />
        ) : (
          <RegionTiles
            selectedRegion={selectedRegion}
            onSelectRegion={handleRegionSelection}
          />
        )}

        {/* Sub-region Selection */}
        {selectedRegion && (
          <SubRegionSelector
            selectedRegion={selectedRegion}
            selectedSubRegion={selectedSubRegion}
            onSelectSubRegion={handleSubRegionSelection}
          />
        )}

        {/* Vertical Prayer Time Cards - filtered by selected region and sub-region */}
        {selectedRegion && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 text-[#062C25]">
              Salaah Times in {selectedSubRegion ? selectedSubRegion : selectedRegion}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* FAJR */}
              <div className="min-w-0 border border-gray-200 rounded-md md:rounded-lg">
                <div className="bg-[#DB2777] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">FAJR</div>
                <div className="bg-white rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#DB2777] border-2 border-[#DB2777] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  {getFilteredTimes('fajr').map((time, index) => (
                    <button 
                      key={index}
                      onClick={() => handlePrayerTimeClick('fajr', time)}
                      className={`w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 border border-gray-100 ${
                        activePrayer === 'fajr' && selectedTime === time
                          ? getPrayerActiveColor('fajr')
                          : `bg-pink-50 text-[#DB2777] ${getPrayerHoverColor('fajr')}`
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                  <div className="bg-[#8B1E4D] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>

              {/* DHUHR */}
              <div className="min-w-0 border border-gray-200 rounded-md md:rounded-lg">
                <div className="bg-[#D97706] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">DHUHR</div>
                <div className="bg-white rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#D97706] border-2 border-[#D97706] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  {getFilteredTimes('dhuhr').map((time, index) => (
                    <button 
                      key={index}
                      onClick={() => handlePrayerTimeClick('dhuhr', time)}
                      className={`w-full py-1 md:py-2 px-1 md:px-3 rounded font-medium text-base transition-all duration-200 border border-gray-100 ${
                        activePrayer === 'dhuhr' && selectedTime === time
                          ? getPrayerActiveColor('dhuhr')
                          : `bg-amber-50 text-[#D97706] ${getPrayerHoverColor('dhuhr')}`
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                  <div className="bg-[#A05E05] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>

              {/* ASR */}
              <div className="min-w-0 border border-gray-200 rounded-md md:rounded-lg">
                <div className="bg-[#059669] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">ASR</div>
                <div className="bg-white rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#059669] border-2 border-[#059669] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  {getFilteredTimes('asr').map((time, index) => (
                    <button 
                      key={index}
                      onClick={() => handlePrayerTimeClick('asr', time)}
                      className={`w-full py-1 md:py-2 px-1 md:px-3 rounded font-medium text-base transition-all duration-200 border border-gray-100 ${
                        activePrayer === 'asr' && selectedTime === time
                          ? getPrayerActiveColor('asr')
                          : `bg-emerald-50 text-[#059669] ${getPrayerHoverColor('asr')}`
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                  <div className="bg-[#046F4D] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>

              {/* ISHA */}
              <div className="min-w-0 border border-gray-200 rounded-md md:rounded-lg">
                <div className="bg-[#4F46E5] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">ISHA</div>
                <div className="bg-white rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#4F46E5] border-2 border-[#4F46E5] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  {getFilteredTimes('isha').map((time, index) => (
                    <button 
                      key={index}
                      onClick={() => handlePrayerTimeClick('isha', time)}
                      className={`w-full py-1 md:py-2 px-1 md:px-3 rounded font-medium text-base transition-all duration-200 border border-gray-100 ${
                        activePrayer === 'isha' && selectedTime === time
                          ? getPrayerActiveColor('isha')
                          : `bg-indigo-50 text-[#4F46E5] ${getPrayerHoverColor('isha')}`
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                  <div className="bg-[#3C35B8] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Block and Table View System - below the vertical time cards */}
        {selectedRegion && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            {/* View Toggle */}
            <ViewToggle 
              viewMode={viewMode} 
              onViewChange={setViewMode} 
            />
            
            {/* Prayer Times Display */}
            <div className="mt-6">
              <PrayerTimesDisplay
                selectedRegion={selectedRegion}
                selectedSubRegion={selectedSubRegion}
                selectedTime={selectedTime}
                activePrayer={activePrayer}
                searchType="earliest"
                filteredPrayerTimes={getFilteredMasjidsForView()}
                viewMode={viewMode}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrayerTimeFilter;

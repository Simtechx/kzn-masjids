
import React from 'react';
import { usePrayerTimeSearch } from '@/hooks/usePrayerTimeSearch';
import RegionSelector from './prayer-time-search/RegionSelector';
import SubRegionSelector from './prayer-time-search/SubRegionSelector';
import PrayerTimeSelection from './prayer-time-search/PrayerTimeSelection';
import PrayerTimesDisplay from './prayer-time-search/PrayerTimesDisplay';
import RegionTable from './prayer-time-search/RegionTable';
import PrayerTimeHeader from './prayer-time-search/PrayerTimeHeader';
import ViewToggle from './prayer-time-search/ViewToggle';
import LivePrayerTimes from './LivePrayerTimes';
import FindMasjidsHero from './FindMasjidsHero';

const PrayerTimeSearch = () => {
  const {
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
  } = usePrayerTimeSearch();
  
  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        {/* Live Prayer Times Component */}
        <LivePrayerTimes />
        
        {/* Find Masjids Hero - Placed right after LivePrayerTimes */}
        <div className="mt-6">
          <FindMasjidsHero />
        </div>
        
        <div className="mt-10">
          <PrayerTimeHeader 
            selectedRegion={selectedRegion}
            selectedSubRegion={selectedSubRegion}
            regionViewMode={regionViewMode}
            onRegionViewModeChange={setRegionViewMode}
          />
        </div>
        
        <div className="flex flex-col space-y-6">
          {/* Region Selection - Conditionally render based on view mode */}
          {regionViewMode === 'block' ? (
            <RegionSelector 
              selectedRegion={selectedRegion}
              onSelectRegion={handleRegionSelection}
            />
          ) : (
            <RegionTable 
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
          
          {/* Prayer Time Blocks */}
          {selectedRegion && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <PrayerTimeSelection
                selectedRegion={selectedRegion}
                activePrayer={activePrayer}
                selectedTime={selectedTime}
                onSelectPrayer={handlePrayerSelection}
                onSelectTime={handleTimeSelection}
              />
              
              {/* Prayer Time View Toggle */}
              <ViewToggle 
                viewMode={viewMode} 
                onViewChange={setViewMode} 
              />
              
              {/* Prayer Times Display */}
              <PrayerTimesDisplay
                selectedRegion={selectedRegion}
                selectedSubRegion={selectedSubRegion}
                selectedTime={selectedTime}
                activePrayer={activePrayer}
                searchType={searchType}
                filteredPrayerTimes={getFilteredPrayerTimes()}
                viewMode={viewMode}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrayerTimeSearch;

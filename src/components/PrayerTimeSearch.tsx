
import React from 'react';
import { usePrayerTimeSearch } from '@/hooks/usePrayerTimeSearch';
import RegionSelector from './prayer-time-search/RegionSelector';
import SubRegionSelector from './prayer-time-search/SubRegionSelector';
import PrayerTimeSelection from './prayer-time-search/PrayerTimeSelection';
import PrayerTimesDisplay from './prayer-time-search/PrayerTimesDisplay';
import RegionTable from './prayer-time-search/RegionTable';
import RegionTiles from './prayer-time-search/RegionTiles';
import PrayerTimeHeader from './prayer-time-search/PrayerTimeHeader';
import ViewToggle from './prayer-time-search/ViewToggle';
import { useIsMobile } from '@/hooks/use-mobile';

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
    setRegionViewMode,
    searchQuery,
    setSearchQuery
  } = usePrayerTimeSearch();
  
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mt-2">
          <PrayerTimeHeader 
            selectedRegion={selectedRegion}
            selectedSubRegion={selectedSubRegion}
            regionViewMode={regionViewMode}
            onRegionViewModeChange={setRegionViewMode}
          />
        </div>
        
        <div className="flex flex-col space-y-6">
          {/* Region Selection - Conditionally render based on view mode */}
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
          
          {/* Instructional Text */}
          <div className="text-center text-gray-700">
            {isMobile ? (
              <>
                <p className="text-base font-medium">Discover Salaah Times in KwaZulu-Natal</p>
                <p className="text-base font-medium">Select a Region to View Details</p>
              </>
            ) : (
              <p className="text-lg font-medium">Discover Salaah Times in KwaZulu-Natal – Select a Region to View Details</p>
            )}
          </div>
          
          {/* Sub-region Selection */}
          {selectedRegion && (
            <SubRegionSelector
              selectedRegion={selectedRegion}
              selectedSubRegion={selectedSubRegion}
              onSelectSubRegion={handleSubRegionSelection}
            />
          )}
          
          {/* Salaah Time Blocks */}
          {selectedRegion && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <PrayerTimeSelection
                selectedRegion={selectedRegion}
                activePrayer={activePrayer}
                selectedTime={selectedTime}
                onSelectPrayer={handlePrayerSelection}
                onSelectTime={handleTimeSelection}
              />
              
              {/* Salaah Time View Toggle */}
              <ViewToggle 
                viewMode={viewMode} 
                onViewChange={setViewMode} 
              />
              
              {/* Salaah Times Display */}
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

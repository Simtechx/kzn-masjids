
import React, { useState } from 'react';
import { prayerTimesData, PrayerType, SearchType, MasjidData } from '@/utils/prayerTimeUtils';
import RegionSelector from './prayer-time-search/RegionSelector';
import SubRegionSelector from './prayer-time-search/SubRegionSelector';
import PrayerTimeBlocks from './prayer-time-search/PrayerTimeBlocks';
import TimeSelectionGrid from './prayer-time-search/TimeSelectionGrid';
import SearchBar from './prayer-time-search/SearchBar';
import PrayerTimesDisplay from './prayer-time-search/PrayerTimesDisplay';
import MasjidsList from './prayer-time-search/MasjidsList';
import RegionTable from './prayer-time-search/RegionTable';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table2, LayoutGrid } from 'lucide-react';

const PrayerTimeSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<SearchType>('earliest');
  const [activePrayer, setActivePrayer] = useState<PrayerType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'block' | 'table'>('block');
  const [regionViewMode, setRegionViewMode] = useState<'block' | 'table'>('block');
  
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

  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-teal-800">Prayer Time Search</h2>
            <p className="text-gray-600 mt-2">
              {selectedSubRegion && selectedRegion 
                ? `Find prayer times for masjids in ${selectedSubRegion}, ${selectedRegion}`
                : selectedRegion 
                  ? `Find prayer times for masjids in ${selectedRegion}` 
                  : "Find prayer times across different masjids in KwaZulu-Natal regions"}
            </p>
          </div>
          
          <div className="bg-gray-100 p-2 rounded-md">
            <ToggleGroup 
              type="single" 
              value={regionViewMode} 
              onValueChange={(value) => value && setRegionViewMode(value as 'block' | 'table')}
              className="bg-white shadow-sm rounded-md"
            >
              <ToggleGroupItem 
                value="block" 
                aria-label="Block View" 
                className={regionViewMode === 'block' ? 'bg-teal-700 text-white' : ''}
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="ml-2">Block</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="table" 
                aria-label="Table View" 
                className={regionViewMode === 'table' ? 'bg-teal-700 text-white' : ''}
              >
                <Table2 className="h-5 w-5" />
                <span className="ml-2">Table</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
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
              <PrayerTimeBlocks
                selectedRegion={selectedRegion}
                activePrayer={activePrayer}
                onSelectPrayer={handlePrayerSelection}
              />

              {/* Instructions message */}
              <div className="bg-gray-200 p-3 mb-4 rounded text-center text-gray-700">
                Click the blocks above to filter the times.
              </div>

              {/* Prayer Time Filter Options */}
              {activePrayer && (
                <TimeSelectionGrid
                  activePrayer={activePrayer}
                  selectedRegion={selectedRegion}
                  selectedTime={selectedTime}
                  onSelectTime={handleTimeSelection}
                />
              )}
              
              {/* Prayer Time View Toggle */}
              <div className="flex justify-between items-center mb-4 bg-gray-200 p-4 rounded-lg">
                <div>
                  <h3 className="text-xl text-gray-800 font-medium">Prayer Time View</h3>
                  <p className="text-sm text-gray-600">Select how you want to view prayer times</p>
                </div>
                <ToggleGroup 
                  type="single" 
                  value={viewMode} 
                  onValueChange={(value) => value && setViewMode(value as 'block' | 'table')}
                  className="bg-white shadow-sm rounded-md"
                >
                  <ToggleGroupItem 
                    value="table" 
                    aria-label="Table View" 
                    className={`px-4 ${viewMode === 'table' ? 'bg-teal-700 text-white' : ''}`}
                  >
                    <Table2 className="h-5 w-5 mr-2" />
                    Table View
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="block" 
                    aria-label="Block View" 
                    className={`px-4 ${viewMode === 'block' ? 'bg-teal-700 text-white' : ''}`}
                  >
                    <LayoutGrid className="h-5 w-5 mr-2" />
                    Block View
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
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

              {/* Masjids List */}
              <MasjidsList
                selectedRegion={selectedRegion}
                activePrayer={activePrayer}
                selectedTime={selectedTime}
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


import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, Table2, Blocks } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import RegionSelector from './prayer-time-search/RegionSelector';
import RegionTable from './prayer-time-search/RegionTable';
import RegionTiles from './prayer-time-search/RegionTiles';

const PrayerTimeFilter = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [regionViewMode, setRegionViewMode] = useState<'icons' | 'grid' | 'tiles'>('icons');
  const isMobile = useIsMobile();

  const handleRegionSelection = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className={`flex flex-col ${isMobile ? 'items-center text-center' : 'md:flex-row md:justify-between md:items-center'} gap-4 mb-6`}>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#062C25] leading-tight">Prayer Time Filter</h2>
            <p className="text-gray-600 mt-1">
              {selectedRegion 
                ? `Filter prayer times in ${selectedRegion}` 
                : isMobile 
                  ? "Filter Prayer Times\nin KwaZulu-Natal\nSelect a Region to View Times"
                  : "Filter Prayer Times in KwaZulu-Natal – Select a Region to View Times"}
            </p>
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

        {/* Prayer Time Cards */}
        {selectedRegion && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 text-[#062C25]">Prayer Times in {selectedRegion}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* FAJR */}
              <div className="min-w-0">
                <div className="bg-[#DB2777] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">FAJR</div>
                <div className="bg-white border border-gray-200 rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#DB2777] border-2 border-[#DB2777] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">05:25</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">05:31</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">05:35</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">05:40</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">05:45</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">05:50</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">05:55</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">06:00</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">06:05</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded md:rounded-lg font-medium text-base transition-all duration-200 bg-pink-50 text-[#DB2777] hover:bg-[#DB2777] hover:text-white">06:10</button>
                  <div className="bg-[#8B1E4D] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>

              {/* DHUHR */}
              <div className="min-w-0">
                <div className="bg-[#D97706] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">DHUHR</div>
                <div className="bg-white border border-gray-200 rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#D97706] border-2 border-[#D97706] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">12:15</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">12:20</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">12:30</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">12:40</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">12:45</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">13:00</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">13:10</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">13:15</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-amber-50 text-[#D97706] hover:bg-[#D97706] hover:text-white">13:20</button>
                  <div className="bg-[#A05E05] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>

              {/* ASR */}
              <div className="min-w-0">
                <div className="bg-[#059669] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">ASR</div>
                <div className="bg-white border border-gray-200 rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#059669] border-2 border-[#059669] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-emerald-50 text-[#059669] hover:bg-[#059669] hover:text-white">15:15</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-emerald-50 text-[#059669] hover:bg-[#059669] hover:text-white">15:30</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-emerald-50 text-[#059669] hover:bg-[#059669] hover:text-white">15:45</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-emerald-50 text-[#059669] hover:bg-[#059669] hover:text-white">16:00</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-emerald-50 text-[#059669] hover:bg-[#059669] hover:text-white">16:15</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-emerald-50 text-[#059669] hover:bg-[#059669] hover:text-white">16:20</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-emerald-50 text-[#059669] hover:bg-[#059669] hover:text-white">16:25</button>
                  <div className="bg-[#046F4D] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>

              {/* ISHA */}
              <div className="min-w-0">
                <div className="bg-[#4F46E5] text-white py-2 md:py-3 px-1 md:px-4 rounded-t-md md:rounded-t-lg font-semibold text-xs md:text-lg text-center">ISHA</div>
                <div className="bg-white border border-gray-200 rounded-b-md md:rounded-b-lg p-1 md:p-3 space-y-1 md:space-y-2">
                  <div className="bg-white text-[#4F46E5] border-2 border-[#4F46E5] py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">EARLIEST</div>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">18:38</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">18:40</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">18:45</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">18:50</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">18:59</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">19:00</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">19:05</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">19:10</button>
                  <button className="w-full py-1 md:py-2 px-1 md:px-3 rounded bg-indigo-50 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white">19:15</button>
                  <div className="bg-[#3C35B8] text-white py-1 md:py-2 px-1 md:px-3 rounded text-center text-xs md:text-sm font-semibold">LATEST</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrayerTimeFilter;

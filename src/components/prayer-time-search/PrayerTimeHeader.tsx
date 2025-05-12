
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, Table2, Blocks } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PrayerTimeHeaderProps {
  selectedRegion: string | null;
  selectedSubRegion: string | null;
  regionViewMode: 'icons' | 'grid' | 'tiles';
  onRegionViewModeChange: (value: 'icons' | 'grid' | 'tiles') => void;
}

const PrayerTimeHeader: React.FC<PrayerTimeHeaderProps> = ({
  selectedRegion,
  selectedSubRegion,
  regionViewMode,
  onRegionViewModeChange
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col ${isMobile ? 'items-center text-center' : 'md:flex-row md:justify-between md:items-center'} gap-4 mb-6`}>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#062C25] leading-tight">Salaah Time Search</h2>
        <p className="text-gray-600 mt-1">
          {selectedSubRegion && selectedRegion 
            ? `Find salaah times for masjids in ${selectedSubRegion}, ${selectedRegion}`
            : selectedRegion 
              ? `Find salaah times for masjids in ${selectedRegion}` 
              : "Find salaah times across different masjids in KwaZulu-Natal regions"}
        </p>
      </div>
      
      <div className="bg-gray-100 p-2 rounded-md self-center md:self-auto overflow-x-auto">
        <ToggleGroup 
          type="single" 
          value={regionViewMode} 
          onValueChange={(value) => value && onRegionViewModeChange(value as 'icons' | 'grid' | 'tiles')}
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
  );
};

export default PrayerTimeHeader;

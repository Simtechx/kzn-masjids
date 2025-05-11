
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table2, LayoutGrid } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PrayerTimeHeaderProps {
  selectedRegion: string | null;
  selectedSubRegion: string | null;
  regionViewMode: 'block' | 'table';
  onRegionViewModeChange: (value: 'block' | 'table') => void;
}

const PrayerTimeHeader: React.FC<PrayerTimeHeaderProps> = ({
  selectedRegion,
  selectedSubRegion,
  regionViewMode,
  onRegionViewModeChange
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#072c23] leading-tight">Salaah Time Search</h2>
        <p className="text-gray-600 mt-2">
          {selectedSubRegion && selectedRegion 
            ? `Find salaah times for masjids in ${selectedSubRegion}, ${selectedRegion}`
            : selectedRegion 
              ? `Find salaah times for masjids in ${selectedRegion}` 
              : "Find salaah times across different masjids in KwaZulu-Natal regions"}
        </p>
      </div>
      
      <div className="bg-gray-100 p-2 rounded-md self-start md:self-auto">
        <ToggleGroup 
          type="single" 
          value={regionViewMode} 
          onValueChange={(value) => value && onRegionViewModeChange(value as 'block' | 'table')}
          className="bg-white shadow-sm rounded-md"
        >
          <ToggleGroupItem 
            value="block" 
            aria-label="Block View" 
            className="data-[state=on]:!bg-yellow-400 data-[state=on]:!text-black data-[state=off]:!text-gray-700"
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="ml-2">Block</span>
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="table" 
            aria-label="Table View" 
            className="data-[state=on]:!bg-yellow-400 data-[state=on]:!text-black data-[state=off]:!text-gray-700"
          >
            <Table2 className="h-5 w-5" />
            <span className="ml-2">Table</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default PrayerTimeHeader;


import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table2, LayoutGrid } from 'lucide-react';

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
  return (
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
          onValueChange={(value) => value && onRegionViewModeChange(value as 'block' | 'table')}
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
  );
};

export default PrayerTimeHeader;

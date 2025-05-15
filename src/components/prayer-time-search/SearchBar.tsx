
import React from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, LayoutGrid, Search, X } from 'lucide-react';
import { SearchType } from '@/utils/prayerTimeUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';

// Export the SearchInput component
export const SearchInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}> = ({ value, onChange, onClear, placeholder = "Search..." }) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        value={value}
        onChange={onChange}
        className="pl-8 pr-8 bg-gray-50 border-gray-200"
        placeholder={placeholder}
      />
      {value && (
        <button 
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

interface SearchBarProps {
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchType,
  setSearchType,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-[#072C24] text-white rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Salaah Time View</h3>
          <p className="text-sm text-gray-200">Select how you want to view salaah times</p>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <ToggleGroup 
            type="single" 
            value={searchType === 'earliest' ? 'table' : 'block'} 
            onValueChange={(value) => {
              if (value) {
                setSearchType(value === 'table' ? 'earliest' : 'latest')
              }
            }}
            className="bg-white shadow-sm rounded-md flex-nowrap min-w-max"
          >
            <ToggleGroupItem 
              value="table" 
              aria-label="Table" 
              className="px-4 text-black data-[state=on]:!bg-yellow-400 data-[state=on]:!text-black font-medium data-[state=off]:!text-gray-700"
            >
              <Table className="h-5 w-5 mr-2" />
              <span>Table</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="block" 
              aria-label="Block" 
              className="px-4 text-black data-[state=on]:!bg-yellow-400 data-[state=on]:!text-black font-medium data-[state=off]:!text-gray-700"
            >
              <LayoutGrid className="h-5 w-5 mr-2" />
              <span>Block</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

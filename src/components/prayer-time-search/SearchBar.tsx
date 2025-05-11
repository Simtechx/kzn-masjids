
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, Blocks } from 'lucide-react';
import { SearchType } from '@/utils/prayerTimeUtils';

interface SearchBarProps {
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchType,
  setSearchType,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Salaah Time View</h3>
        <p className="text-sm text-gray-600">Select how you want to view salaah times</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant={searchType === 'earliest' ? "default" : "outline"}
          className={searchType === 'earliest' ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""}
          onClick={() => setSearchType('earliest')}
        >
          <Table className="mr-2 h-4 w-4" />
          Table View
        </Button>
        <Button 
          variant={searchType === 'latest' ? "default" : "outline"}
          className={searchType === 'latest' ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""}
          onClick={() => setSearchType('latest')}
        >
          <Blocks className="mr-2 h-4 w-4" />
          Block View
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

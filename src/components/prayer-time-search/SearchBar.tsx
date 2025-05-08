
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SearchType } from '@/utils/prayerTimeUtils';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-grow relative">
        <Input 
          placeholder="Search for masjid..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      <div className="flex gap-2">
        <Button 
          variant={searchType === 'earliest' ? "default" : "outline"}
          className={searchType === 'earliest' ? "bg-islamic-blue" : ""}
          onClick={() => setSearchType('earliest')}
        >
          Earliest Times
        </Button>
        <Button 
          variant={searchType === 'latest' ? "default" : "outline"}
          className={searchType === 'latest' ? "bg-islamic-blue" : ""}
          onClick={() => setSearchType('latest')}
        >
          Latest Times
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

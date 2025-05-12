
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table2 } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'icons' | 'grid';
  onViewChange: (mode: 'icons' | 'grid') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex justify-end mb-4 mt-16">
      <div className="flex space-x-2 bg-white shadow-sm rounded-md overflow-x-auto flex-nowrap whitespace-nowrap" 
           role="group" 
           dir="ltr" 
           tabIndex={0} 
           style={{ outline: "none" }}>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'icons' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('icons')}
          aria-label="Icons"
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          Icons
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'grid' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('grid')}
          aria-label="Grid"
        >
          <Table2 className="h-4 w-4 mr-1" />
          Grid
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;

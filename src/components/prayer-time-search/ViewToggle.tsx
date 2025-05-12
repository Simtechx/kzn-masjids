
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table2, Grid2X2 } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'block' | 'table' | 'tile';
  onViewChange: (mode: 'block' | 'table' | 'tile') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex justify-end mb-4 mt-16">
      <div className="flex space-x-2 bg-white shadow-sm rounded-md">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'table' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('table')}
        >
          <Grid2X2 className="h-4 w-4 mr-1" />
          Grid
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'tile' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('tile')}
        >
          <Table2 className="h-4 w-4 mr-1" />
          Tiles
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'block' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('block')}
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          Icons
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;


import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table2 } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'block' | 'table';
  onViewChange: (mode: 'block' | 'table') => void;
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
            viewMode === 'block' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => onViewChange('block')}
          aria-label="Block"
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          Block
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'table' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => onViewChange('table')}
          aria-label="Table"
        >
          <Table2 className="h-4 w-4 mr-1" />
          Table
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;

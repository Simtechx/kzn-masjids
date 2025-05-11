
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ViewToggleProps {
  viewMode: 'block' | 'table';
  onViewChange: (mode: 'block' | 'table') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex items-center justify-end space-x-2 my-4 ${isMobile ? 'pr-0' : 'pr-2'}`}>
      <span className="text-sm text-gray-500 mr-2">Display:</span>
      <div className="flex border rounded-md overflow-hidden">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`flex items-center px-3 py-2 ${
            viewMode === 'block'
              ? 'bg-gray-200 text-gray-800'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('block')}
        >
          <LayoutGrid size={18} className="mr-1" />
          {!isMobile && <span>Block</span>}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`flex items-center px-3 py-2 ${
            viewMode === 'table'
              ? 'bg-gray-200 text-gray-800'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => onViewChange('table')}
        >
          <Table2 size={18} className="mr-1" />
          {!isMobile && <span>Table</span>}
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;

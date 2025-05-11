
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, Image } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'block' | 'table';
  onViewChange: (mode: 'block' | 'table') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'block' ? 'bg-yellow-400 text-black' : ''
          }`}
          onClick={() => onViewChange('block')}
        >
          <Image className="h-4 w-4 mr-1" />
          Block
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center ${
            viewMode === 'table' ? 'bg-yellow-400 text-black' : ''
          }`}
          onClick={() => onViewChange('table')}
        >
          <Table className="h-4 w-4 mr-1" />
          Table
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;

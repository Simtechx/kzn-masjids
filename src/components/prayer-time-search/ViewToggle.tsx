
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table2, LayoutGrid } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'block' | 'table';
  onViewChange: (value: 'block' | 'table') => void;
  label?: string;
  description?: string;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  viewMode, 
  onViewChange,
  label = "Prayer Time View",
  description = "Select how you want to view prayer times",
  className = ""
}) => {
  return (
    <div className={`flex justify-between items-center mb-4 bg-[#072c23] text-white p-4 rounded-lg ${className}`}>
      <div>
        <h3 className="text-xl text-white font-medium">{label}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
      <ToggleGroup 
        type="single" 
        value={viewMode} 
        onValueChange={(value) => value && onViewChange(value as 'block' | 'table')}
        className="bg-white shadow-sm rounded-md"
      >
        <ToggleGroupItem 
          value="table" 
          aria-label="Table View" 
          className={`px-4 ${viewMode === 'table' ? 'bg-[#FEF7CD] text-[#072c23]' : 'text-[#072c23]'}`}
        >
          <Table2 className="h-5 w-5 mr-2" />
          Table View
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="block" 
          aria-label="Block View" 
          className={`px-4 ${viewMode === 'block' ? 'bg-[#FEF7CD] text-[#072c23]' : 'text-[#072c23]'}`}
        >
          <LayoutGrid className="h-5 w-5 mr-2" />
          Block View
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ViewToggle;

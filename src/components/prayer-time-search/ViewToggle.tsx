
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table2, LayoutGrid } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  label = "Salaah Time View",
  description = "Select how you want to view salaah times",
  className = ""
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 bg-[#072c23] text-white p-4 rounded-lg ${className}`}>
      <div>
        <h3 className="text-xl text-white font-medium">{label}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
      <ToggleGroup 
        type="single" 
        value={viewMode} 
        onValueChange={(value) => value && onViewChange(value as 'block' | 'table')}
        className="bg-white shadow-sm rounded-md self-start md:self-auto"
      >
        <ToggleGroupItem 
          value="table" 
          aria-label="Table View" 
          className="px-4 text-black data-[state=on]:!bg-yellow-400 data-[state=on]:!text-black font-medium data-[state=off]:!text-gray-700"
        >
          <Table2 className="h-5 w-5 mr-2" />
          <span>Table View</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="block" 
          aria-label="Block View" 
          className="px-4 text-black data-[state=on]:!bg-yellow-400 data-[state=on]:!text-black font-medium data-[state=off]:!text-gray-700"
        >
          <LayoutGrid className="h-5 w-5 mr-2" />
          <span>Block View</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ViewToggle;

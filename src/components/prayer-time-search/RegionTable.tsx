
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import regionBackgroundImages from '@/utils/regionBackgroundImages';

interface RegionTableProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionTable: React.FC<RegionTableProps> = ({ selectedRegion, onSelectRegion }) => {
  const isMobile = useIsMobile();
  
  // Updated region data with correct counts
  const regions = [
    {
      name: 'Durban',
      subRegions: 5,
      masjids: 79,
      musallas: 59,
      total: 138,
      backgroundImage: regionBackgroundImages['Durban']
    },
    {
      name: 'Midlands',
      subRegions: 4,
      masjids: 39,
      musallas: 22,
      total: 61,
      backgroundImage: regionBackgroundImages['Midlands']
    },
    {
      name: 'North Coast',
      subRegions: 4,
      masjids: 37,
      musallas: 26,
      total: 63,
      backgroundImage: regionBackgroundImages['North Coast']
    },
    {
      name: 'South Coast',
      subRegions: 4,
      masjids: 19,
      musallas: 15,
      total: 34,
      backgroundImage: regionBackgroundImages['South Coast']
    },
    {
      name: 'Northern Natal',
      subRegions: 5,
      masjids: 20,
      musallas: 13,
      total: 33,
      backgroundImage: regionBackgroundImages['Northern Natal']
    }
  ];

  // For mobile view, we'll show a simplified card-based layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        {regions.map((regionData) => (
          <div 
            key={regionData.name}
            className={`rounded-lg border p-4 cursor-pointer transition-colors ${
              selectedRegion === regionData.name ? "bg-gray-200 border-gray-300" : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelectRegion(regionData.name)}
          >
            <div className="flex items-center">
              <div 
                className="w-16 h-16 rounded-lg mr-3 bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage: `url('${regionData.backgroundImage}')`,
                }}
              >
                <div className="w-full h-full bg-black/30 rounded-lg"></div>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{regionData.name}</h3>
                <Button 
                  variant="link"
                  className="text-teal-700 hover:text-teal-900 font-medium p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRegion(regionData.name);
                  }}
                >
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
              <div className="bg-blue-50 p-2 rounded text-center">
                <span className="block font-medium text-blue-700">{regionData.subRegions}</span>
                <span className="text-xs text-gray-600">Sub-regions</span>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <span className="block font-medium text-green-700">{regionData.masjids}</span>
                <span className="text-xs text-gray-600">Masjids</span>
              </div>
              <div className="bg-amber-50 p-2 rounded text-center">
                <span className="block font-medium text-amber-700">{regionData.musallas}</span>
                <span className="text-xs text-gray-600">Musallas</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop view with enhanced table and image-based regions
  return (
    <div className="grid grid-cols-1 gap-4">
      {regions.map((regionData) => (
        <div 
          key={regionData.name}
          className={`overflow-hidden rounded-lg shadow-sm cursor-pointer border border-gray-200 transition-all hover:shadow-md ${
            selectedRegion === regionData.name ? "bg-gray-100 border-gray-300" : ""
          }`}
          onClick={() => onSelectRegion(regionData.name)}
        >
          <div className="flex items-center h-24">
            {/* Region image background */}
            <div 
              className="w-1/4 h-full relative bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${regionData.backgroundImage})`,
              }}
            >
              {/* Overlay with region name */}
              <div className="absolute inset-0 bg-black/40"></div>
              <span className="relative z-10 text-white font-bold text-xl flex items-center justify-center h-full">
                {regionData.name}
              </span>
            </div>
            
            {/* Region stats */}
            <div className="flex-1 flex items-center px-6">
              <div className="flex space-x-8">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-blue-700">{regionData.subRegions}</span>
                  <span className="text-sm text-gray-500">Sub-regions</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-green-700">{regionData.masjids}</span>
                  <span className="text-sm text-gray-500">Masjids</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-amber-700">{regionData.musallas}</span>
                  <span className="text-sm text-gray-500">Musallas</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-purple-700">{regionData.total}</span>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
              </div>
              
              <div className="ml-auto">
                <Button 
                  variant="outline" 
                  className="bg-teal-600 text-white hover:bg-teal-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRegion(regionData.name);
                  }}
                >
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegionTable;

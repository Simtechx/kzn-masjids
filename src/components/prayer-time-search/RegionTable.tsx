
import React from 'react';
import { prayerTimesData, subRegionsData } from '@/utils/prayerTimeUtils';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RegionTableProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionTable: React.FC<RegionTableProps> = ({ selectedRegion, onSelectRegion }) => {
  const isMobile = useIsMobile();
  
  // Reorder regions according to the new sequence as per footer
  const regions = ['North Coast', 'Northern Natal', 'Midlands', 'Durban', 'South Coast'];
  
  const regionCounts = regions.map(region => {
    const subRegionCount = subRegionsData[region as keyof typeof subRegionsData]?.length || 0;
    const masjidCount = prayerTimesData[region as keyof typeof prayerTimesData]?.length || 0;
    // Mock musalla count - in real app, you'd get this from data
    const musallaCount = Math.floor(masjidCount * 0.6);
    
    return {
      name: region,
      subRegions: subRegionCount,
      masjids: masjidCount,
      musallas: musallaCount,
      total: masjidCount + musallaCount
    };
  });

  // For mobile view, we'll show a simplified card-based layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        {regionCounts.map((regionData) => (
          <div 
            key={regionData.name}
            className={`rounded-lg border p-4 cursor-pointer transition-colors ${
              selectedRegion === regionData.name ? "bg-[#FEF7CD] border-amber-300" : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelectRegion(regionData.name)}
          >
            <div className="flex justify-between items-center">
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

  // Desktop view with enhanced table
  return (
    <div className="overflow-hidden rounded-lg shadow-md border">
      <Table>
        <TableHeader className="bg-[#1A1F2C]">
          <TableRow>
            <TableHead className="text-white font-bold">Region</TableHead>
            <TableHead className="text-white font-bold text-center">Sub-regions</TableHead>
            <TableHead className="text-white font-bold text-center">Masjids</TableHead>
            <TableHead className="text-white font-bold text-center">Musallas</TableHead>
            <TableHead className="text-white font-bold text-center">Total</TableHead>
            <TableHead className="text-white font-bold text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regionCounts.map((regionData) => (
            <TableRow 
              key={regionData.name} 
              className={`
                hover:bg-gray-50 cursor-pointer transition-colors
                ${selectedRegion === regionData.name ? "bg-[#FEF7CD]" : ""}
              `}
              onClick={() => onSelectRegion(regionData.name)}
            >
              <TableCell className="font-medium">{regionData.name}</TableCell>
              <TableCell className="text-center">{regionData.subRegions}</TableCell>
              <TableCell className="text-center">{regionData.masjids}</TableCell>
              <TableCell className="text-center">{regionData.musallas}</TableCell>
              <TableCell className="text-center font-medium">{regionData.total}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="link" 
                  className="text-teal-700 hover:text-teal-900 font-medium gap-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRegion(regionData.name);
                  }}
                >
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegionTable;

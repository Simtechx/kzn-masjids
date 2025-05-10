
import React from 'react';
import { prayerTimesData, subRegionsData } from '@/utils/prayerTimeUtils';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface RegionTableProps {
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionTable: React.FC<RegionTableProps> = ({ selectedRegion, onSelectRegion }) => {
  // Calculate counts for each region
  const regions = Object.keys(prayerTimesData).filter(region => region !== 'Transkei');
  
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

  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader className="bg-gray-800">
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
              className={selectedRegion === regionData.name ? "bg-teal-50" : ""}
              onClick={() => onSelectRegion(regionData.name)}
            >
              <TableCell className="font-medium">{regionData.name}</TableCell>
              <TableCell className="text-center">{regionData.subRegions}</TableCell>
              <TableCell className="text-center">{regionData.masjids}</TableCell>
              <TableCell className="text-center">{regionData.musallas}</TableCell>
              <TableCell className="text-center">{regionData.total}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="link" 
                  className="text-teal-700 hover:text-teal-900"
                  onClick={() => onSelectRegion(regionData.name)}
                >
                  Explore
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

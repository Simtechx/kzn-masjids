
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { 
  PrayerType, 
  SearchType, 
  MasjidData,
} from '@/utils/prayerTimeUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface PrayerTimesDisplayProps {
  selectedRegion: string;
  selectedSubRegion: string | null;
  selectedTime: string | null;
  activePrayer: PrayerType | null;
  searchType: SearchType;
  filteredPrayerTimes: MasjidData[];
  viewMode: 'block' | 'table';
}

const PrayerTimesDisplay: React.FC<PrayerTimesDisplayProps> = ({
  selectedRegion,
  selectedSubRegion,
  selectedTime,
  activePrayer,
  searchType,
  filteredPrayerTimes,
  viewMode
}) => {
  // Get prayer types excluding maghrib
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];
  
  // Define prayer block colors
  const prayerColors = {
    fajr: 'bg-pink-50',
    dhuhr: 'bg-amber-50',
    asr: 'bg-teal-50',
    isha: 'bg-indigo-50',
  };
  
  const prayerTextColors = {
    fajr: 'text-pink-600',
    dhuhr: 'text-amber-600',
    asr: 'text-teal-600',
    isha: 'text-indigo-600',
  };

  const getLatestBadge = (prayer: PrayerType) => {
    if (activePrayer === prayer && searchType === 'latest') {
      return <Badge className="ml-1 bg-teal-600">LATEST</Badge>;
    }
    return null;
  };
  
  // Only render the selected view type (table or block)
  if (viewMode === 'table') {
    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <h3 className="text-2xl font-bold p-4 text-teal-700">
          {selectedTime && activePrayer 
            ? `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}` 
            : selectedSubRegion 
              ? `Prayer Times in ${selectedSubRegion}`
              : `Prayer Times in ${selectedRegion}`}
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1A1F2C] text-white">
              <TableHead className="font-bold text-white">Masjid</TableHead>
              <TableHead className="font-bold text-white">Address</TableHead>
              <TableHead className="font-bold text-white text-center">Fajr</TableHead>
              <TableHead className="font-bold text-white text-center">Dhuhr</TableHead>
              <TableHead className="font-bold text-white text-center">Asr</TableHead>
              <TableHead className="font-bold text-white text-center">Isha</TableHead>
              <TableHead className="font-bold text-white text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrayerTimes.map((masjid, idx) => (
              <TableRow key={idx} className="border-b">
                <TableCell className="font-medium">{masjid.masjid}</TableCell>
                <TableCell className="text-gray-600">{masjid.address || `123 Example St, ${selectedRegion}`}</TableCell>
                {prayerTypes.map((prayer) => (
                  <TableCell key={prayer} className={`${prayerColors[prayer]} text-center`}>
                    <div className="flex items-center justify-center">
                      {masjid[prayer]}
                      {getLatestBadge(prayer)}
                    </div>
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <MapPin className="mr-1 h-4 w-4" />
                    Directions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4 text-teal-700">
          {selectedTime && activePrayer 
            ? `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}` 
            : selectedSubRegion 
              ? `Prayer Times in ${selectedSubRegion}`
              : `Prayer Times in ${selectedRegion}`}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrayerTimes.map((masjid, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg shadow border">
              <div className="font-medium text-lg mb-2">{masjid.masjid}</div>
              <div className="text-sm text-gray-600 mb-3">{masjid.address || `123 Example St, ${selectedRegion}`}</div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {prayerTypes.map((prayer) => (
                  <div key={prayer} className={`flex items-center p-2 rounded ${prayerColors[prayer]}`}>
                    <div className={`${prayerTextColors[prayer]} font-medium capitalize mr-2`}>
                      {prayer}:
                    </div>
                    <div className="font-bold">
                      {masjid[prayer]}
                    </div>
                    {getLatestBadge(prayer)}
                  </div>
                ))}
              </div>
              <Button variant="default" size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                <MapPin className="mr-1 h-4 w-4" />
                Directions
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PrayerTimesDisplay;

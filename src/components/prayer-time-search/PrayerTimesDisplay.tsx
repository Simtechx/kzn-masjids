
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
import { useIsMobile } from '@/hooks/use-mobile';

interface PrayerTimesDisplayProps {
  selectedRegion: string;
  selectedSubRegion: string | null;
  selectedTime: string | null;
  activePrayer: PrayerType | null;
  searchType: SearchType;
  filteredPrayerTimes: MasjidData[];
  viewMode: 'block' | 'table' | 'tile';
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
  const isMobile = useIsMobile();
  
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

  // Generate the header title text
  const getHeaderTitle = () => {
    if (selectedTime && activePrayer) {
      return `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}`;
    } else if (selectedSubRegion) {
      return `Salaah Times in ${selectedSubRegion}`;
    } else {
      return `Salaah Times in ${selectedRegion}`;
    }
  };

  // For the table view
  if (viewMode === 'table') {
    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <h3 className="text-2xl font-bold p-4 text-teal-700 text-center">
          {getHeaderTitle()}
        </h3>
        
        {isMobile ? (
          // Mobile specific table layout - simplified with only masjid and prayer time columns
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#1A1F2C] text-white">
                  <TableHead className="font-bold text-white">Masjid</TableHead>
                  {prayerTypes.map(prayer => (
                    <TableHead key={prayer} className="font-bold text-white text-center whitespace-nowrap">
                      {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrayerTimes.map((masjid, idx) => (
                  <TableRow key={idx} className="border-b hover:bg-gray-100 transition-colors">
                    <TableCell className="font-medium whitespace-nowrap">
                      {masjid.masjid}
                    </TableCell>
                    {prayerTypes.map((prayer) => (
                      <TableCell 
                        key={prayer} 
                        className={`${prayerColors[prayer]} text-center`}
                      >
                        <div className="font-medium">
                          {masjid[prayer]}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          // Desktop table view
          <Table>
            <TableHeader>
              <TableRow className="bg-[#1A1F2C] text-white">
                <TableHead className="font-bold text-white">Masjid</TableHead>
                <TableHead className="font-bold text-white">Address</TableHead>
                <TableHead className="font-bold text-white text-center">Fajr</TableHead>
                <TableHead className="font-bold text-white text-center">Dhuhr</TableHead>
                <TableHead className="font-bold text-white text-center">Asr</TableHead>
                <TableHead className="font-bold text-white text-center">Isha</TableHead>
                <TableHead className="font-bold text-white text-center">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrayerTimes.map((masjid, idx) => (
                <TableRow key={idx} className="border-b hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                  <TableCell className="font-medium">
                    {masjid.masjid}
                  </TableCell>
                  <TableCell className="text-gray-600">{masjid.address || `123 Example St, ${selectedRegion}`}</TableCell>
                  {prayerTypes.map((prayer) => (
                    <TableCell key={prayer} className={`${prayerColors[prayer]} text-center`}>
                      <div className="flex items-center justify-center">
                        {masjid[prayer]}
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
        )}
      </div>
    );
  } 
  // For the tile view - similar to mobile table view but with a card-based layout
  else if (viewMode === 'tile') {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4 text-teal-700 text-center">
          {getHeaderTitle()}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrayerTimes.map((masjid, idx) => (
            <div key={idx} className="bg-white rounded-lg border shadow-sm p-4">
              <div className="mb-3">
                <h3 className="font-bold text-lg">{masjid.masjid}</h3>
                <p className="text-gray-600 text-sm">{masjid.address || `123 Example St, ${selectedRegion}`}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                {prayerTypes.map(prayer => (
                  <div 
                    key={prayer}
                    className={`${prayerColors[prayer]} p-2 rounded flex justify-between items-center`}
                  >
                    <span className={`${prayerTextColors[prayer]} font-medium`}>{prayer.charAt(0).toUpperCase() + prayer.slice(1)}</span>
                    <span className="font-bold">{masjid[prayer]}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-3">
                <Button variant="default" size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                  <MapPin className="mr-1 h-4 w-4" />
                  Directions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // Block view
  else {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4 text-teal-700 text-center">
          {getHeaderTitle()}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrayerTimes.map((masjid, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg shadow border text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="font-medium text-lg">{masjid.masjid}</div>
                  <div className="text-sm text-gray-600">{masjid.address || `123 Example St, ${selectedRegion}`}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {prayerTypes.map((prayer) => (
                  <div key={prayer} className={`flex flex-col items-center justify-center p-2 rounded ${prayerColors[prayer]}`}>
                    <div className={`${prayerTextColors[prayer]} font-medium capitalize text-sm text-center`}>
                      {prayer}
                    </div>
                    <div className="font-bold text-center">
                      {masjid[prayer]}
                    </div>
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


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
    asr: 'bg-emerald-50',
    isha: 'bg-indigo-50',
  };
  
  const prayerTextColors = {
    fajr: 'text-pink-600',
    dhuhr: 'text-amber-600',
    asr: 'text-emerald-600',
    isha: 'text-indigo-600',
  };
  
  // Only render the selected view type (table or block)
  if (viewMode === 'table') {
    return (
      <div className="overflow-x-auto bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-teal-700">
          {selectedTime && activePrayer 
            ? `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}` 
            : selectedSubRegion 
              ? `Prayer Times in ${selectedSubRegion}, ${selectedRegion}`
              : `Prayer Times in ${selectedRegion}`}
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="font-bold text-white">Masjid</TableHead>
              {activePrayer ? (
                <TableHead className="font-bold capitalize text-white">{activePrayer}</TableHead>
              ) : (
                prayerTypes.map((prayer) => (
                  <TableHead key={prayer} className="font-bold capitalize text-white">{prayer}</TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrayerTimes.map((masjid, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{masjid.masjid}</TableCell>
                {activePrayer ? (
                  <TableCell>{masjid[activePrayer]}</TableCell>
                ) : (
                  prayerTypes.map((prayer) => (
                    <TableCell key={prayer}>
                      {masjid[prayer as keyof typeof masjid]}
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-teal-700">
          {selectedTime && activePrayer 
            ? `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}` 
            : selectedSubRegion 
              ? `Prayer Times in ${selectedSubRegion}, ${selectedRegion}`
              : `Prayer Times in ${selectedRegion}`}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrayerTimes.map((masjid, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg shadow">
              <div className="font-medium text-lg mb-2">{masjid.masjid}</div>
              {activePrayer ? (
                <div className="flex items-center">
                  <div className="text-teal-700 font-medium capitalize mr-2">{activePrayer}:</div>
                  <div className="text-lg font-bold">{masjid[activePrayer]}</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {prayerTypes.map((prayer) => (
                    <div key={prayer} className="flex items-center">
                      <div className={`${prayerTextColors[prayer]} font-medium capitalize mr-2`}>
                        {prayer}:
                      </div>
                      <div className="font-bold">
                        {masjid[prayer as keyof typeof masjid]}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PrayerTimesDisplay;

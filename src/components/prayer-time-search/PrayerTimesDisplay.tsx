
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
  
  const prayerTableBgColors = {
    fajr: 'bg-pink-50',
    dhuhr: 'bg-amber-50',
    asr: 'bg-emerald-50',
    isha: 'bg-indigo-50',
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
            <TableRow className="bg-slate-800 text-white">
              <TableHead className="font-bold text-white">Masjid</TableHead>
              <TableHead className="font-bold text-white">Address</TableHead>
              {activePrayer ? (
                <TableHead className="font-bold capitalize text-white">{activePrayer}</TableHead>
              ) : (
                prayerTypes.map((prayer) => (
                  <TableHead key={prayer} className="font-bold capitalize text-white">{prayer}</TableHead>
                ))
              )}
              {!activePrayer && <TableHead className="font-bold text-white">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrayerTimes.map((masjid, idx) => (
              <TableRow key={idx} className="border-b">
                <TableCell className="font-medium">{masjid.masjid}</TableCell>
                <TableCell className="text-gray-600">{masjid.address || `123 Example St, ${selectedRegion}`}</TableCell>
                {activePrayer ? (
                  <TableCell className={prayerTableBgColors[activePrayer]}>
                    <div className="flex items-center">
                      {masjid[activePrayer]}
                      {getLatestBadge(activePrayer)}
                    </div>
                  </TableCell>
                ) : (
                  prayerTypes.map((prayer) => (
                    <TableCell key={prayer} className={prayerTableBgColors[prayer]}>
                      <div className="flex items-center">
                        {masjid[prayer]}
                        {getLatestBadge(prayer)}
                      </div>
                    </TableCell>
                  ))
                )}
                {!activePrayer && (
                  <TableCell>
                    <Button variant="default" size="sm" className="bg-teal-600 hover:bg-teal-700">
                      View Details
                    </Button>
                  </TableCell>
                )}
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
              {activePrayer ? (
                <div className="flex items-center">
                  <div className={`${prayerTextColors[activePrayer]} font-medium capitalize mr-2`}>{activePrayer}:</div>
                  <div className="text-lg font-bold">{masjid[activePrayer]}</div>
                  {getLatestBadge(activePrayer)}
                </div>
              ) : (
                <>
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
                    View Details
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PrayerTimesDisplay;


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
  findExtremeTime
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
  
  const renderTableView = () => {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700 text-white">
              <TableHead className="font-bold">Prayer</TableHead>
              <TableHead className="font-bold">Time</TableHead>
              <TableHead className="font-bold">Masjid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!selectedTime ? (
              prayerTypes.map((prayer) => {
                const extremeTime = findExtremeTime(prayer as PrayerType, searchType, selectedRegion);
                return (
                  <TableRow key={prayer} className={
                    searchType === 'earliest' ? 
                      (prayer === 'fajr' ? 'bg-teal-50' : '') : 
                      (prayer === 'isha' ? 'bg-teal-50' : '')
                  }>
                    <TableCell className="font-medium capitalize">{prayer}</TableCell>
                    <TableCell>{extremeTime?.time}</TableCell>
                    <TableCell>{extremeTime?.masjid}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              filteredPrayerTimes.map((masjid, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium capitalize">{activePrayer}</TableCell>
                  <TableCell>{activePrayer ? masjid[activePrayer] : ''}</TableCell>
                  <TableCell>{masjid.masjid}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  const renderBlockView = () => {
    return !selectedTime ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {prayerTypes.map((prayer) => {
          const extremeTime = findExtremeTime(prayer as PrayerType, searchType, selectedRegion);
          return (
            <div 
              key={prayer} 
              className={`p-4 rounded-lg ${
                searchType === 'earliest' ? 
                  (prayer === 'fajr' ? 'bg-teal-100' : 'bg-white') : 
                  (prayer === 'isha' ? 'bg-teal-100' : 'bg-white')
              } shadow`}
            >
              <div className="text-lg font-medium capitalize text-teal-700 mb-2">{prayer}</div>
              <div className="text-2xl font-bold mb-1">{extremeTime?.time}</div>
              <div className="text-sm text-gray-600">{extremeTime?.masjid}</div>
              <Badge className="mt-2 bg-teal-700">{searchType === 'earliest' ? 'Earliest' : 'Latest'}</Badge>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrayerTimes.map((masjid, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg shadow">
            <div className="font-medium text-lg mb-2">{masjid.masjid}</div>
            <div className="flex items-center">
              <div className="text-teal-700 font-medium capitalize mr-2">{activePrayer}:</div>
              <div className="text-lg font-bold">{activePrayer ? masjid[activePrayer] : ''}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-teal-700">
        {selectedTime && activePrayer 
          ? `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}` 
          : selectedSubRegion 
            ? `${searchType === 'earliest' ? 'Earliest' : 'Latest'} Prayer Times in ${selectedSubRegion}, ${selectedRegion}`
            : `${searchType === 'earliest' ? 'Earliest' : 'Latest'} Prayer Times in ${selectedRegion}`}
      </h3>
      
      {viewMode === 'table' ? renderTableView() : renderBlockView()}
    </div>
  );
};

export default PrayerTimesDisplay;

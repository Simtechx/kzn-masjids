
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

interface PrayerTimesDisplayProps {
  selectedRegion: string;
  selectedSubRegion: string | null;
  selectedTime: string | null;
  activePrayer: PrayerType | null;
  searchType: SearchType;
  filteredPrayerTimes: MasjidData[];
}

const PrayerTimesDisplay: React.FC<PrayerTimesDisplayProps> = ({
  selectedRegion,
  selectedSubRegion,
  selectedTime,
  activePrayer,
  searchType,
  filteredPrayerTimes
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-islamic-blue">
        {selectedTime && activePrayer 
          ? `Masjids with ${activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)} at ${selectedTime}` 
          : selectedSubRegion 
            ? `${searchType === 'earliest' ? 'Earliest' : 'Latest'} Prayer Times in ${selectedSubRegion}, ${selectedRegion}`
            : `${searchType === 'earliest' ? 'Earliest' : 'Latest'} Prayer Times in ${selectedRegion}`}
      </h3>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Prayer</TableHead>
              <TableHead className="font-bold">Time</TableHead>
              <TableHead className="font-bold">Masjid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!selectedTime ? (
              ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((prayer) => {
                const extremeTime = findExtremeTime(prayer as PrayerType, searchType, selectedRegion);
                return (
                  <TableRow key={prayer} className={searchType === 'earliest' ? 
                    (prayer === 'fajr' ? 'bg-blue-50' : '') : 
                    (prayer === 'isha' ? 'bg-blue-50' : '')
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
    </div>
  );
};

export default PrayerTimesDisplay;

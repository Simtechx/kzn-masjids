
import React from 'react';
import { MasjidData, PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface MasjidsListProps {
  selectedRegion: string;
  activePrayer: PrayerType | null;
  selectedTime: string | null;
  filteredPrayerTimes: MasjidData[];
  viewMode: 'block' | 'table';
}

const MasjidsList: React.FC<MasjidsListProps> = ({
  selectedRegion,
  activePrayer,
  selectedTime,
  filteredPrayerTimes,
  viewMode
}) => {
  // Exclude maghrib as per requirements
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];

  // Define prayer block colors - soft colors 
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
  
  // Find the earliest and latest times for each prayer type
  const earliestTimes = prayerTypes.reduce((acc, prayer) => {
    const extreme = findExtremeTime(prayer, 'earliest', selectedRegion);
    acc[prayer] = extreme?.time || '';
    return acc;
  }, {} as Record<PrayerType, string>);

  const latestTimes = prayerTypes.reduce((acc, prayer) => {
    const extreme = findExtremeTime(prayer, 'latest', selectedRegion);
    acc[prayer] = extreme?.time || '';
    return acc;
  }, {} as Record<PrayerType, string>);

  const isExtremeTime = (prayer: PrayerType, time: string): 'earliest' | 'latest' | null => {
    if (time === earliestTimes[prayer]) return 'earliest';
    if (time === latestTimes[prayer]) return 'latest';
    return null;
  };

  const renderTableView = () => {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700 text-white">
              <TableHead className="font-bold">Masjid</TableHead>
              <TableHead className="font-bold">Address</TableHead>
              <TableHead className="font-bold">Fajr</TableHead>
              <TableHead className="font-bold">Dhuhr</TableHead>
              <TableHead className="font-bold">Asr</TableHead>
              <TableHead className="font-bold">Isha</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrayerTimes.map((masjid, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{masjid.masjid}</TableCell>
                <TableCell>123 Example St, {selectedRegion}</TableCell>
                {prayerTypes.map(prayer => {
                  const extremeType = isExtremeTime(prayer, masjid[prayer]);
                  return (
                    <TableCell 
                      key={prayer} 
                      className={
                        activePrayer === prayer && masjid[prayer] === selectedTime
                          ? 'bg-teal-600 text-white font-bold' 
                          : prayerColors[prayer]
                      }
                    >
                      {masjid[prayer]}
                      {extremeType && (
                        <div className="text-xs">
                          {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <Button variant="outline" size="sm" className="bg-teal-600 text-white border-teal-700 hover:bg-teal-700">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderBlockView = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredPrayerTimes.map((masjid, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
            <h4 className="font-semibold text-lg mb-2 text-teal-700">{masjid.masjid}</h4>
            <p className="text-gray-600 text-sm mb-3">123 Example St, {selectedRegion}</p>
            <div className="grid grid-cols-4 gap-1">
              {prayerTypes.map((prayer) => {
                const extremeType = isExtremeTime(prayer, masjid[prayer]);
                return (
                  <div 
                    key={prayer}
                    className={`p-2 rounded text-center ${
                      activePrayer === prayer && masjid[prayer] === selectedTime 
                        ? 'bg-teal-600 text-white' 
                        : prayerColors[prayer]
                    }`}
                  >
                    <div className="text-xs font-medium">{prayer.charAt(0).toUpperCase() + prayer.slice(1)}</div>
                    <div>{masjid[prayer]}</div>
                    {extremeType && (
                      <div className="text-xs mt-1">
                        {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-right">
              <Button variant="outline" size="sm" className="bg-teal-600 text-white border-teal-700 hover:bg-teal-700">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-teal-700">
        {`All Masjids in ${selectedRegion}`}
      </h3>
      {viewMode === 'table' ? renderTableView() : renderBlockView()}
    </div>
  );
};

export default MasjidsList;

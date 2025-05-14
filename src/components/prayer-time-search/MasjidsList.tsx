
import React from 'react';
import { MasjidData, PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin } from 'lucide-react';

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
  const isMobile = useIsMobile();
  
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
    // Updated mobile table view to match desktop view
    if (isMobile) {
      return (
        <div className="overflow-x-auto">
          <div className="rounded-lg shadow-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#1A1F2C] !border-b-0">
                  <TableHead className="font-bold text-white">Masjid</TableHead>
                  {prayerTypes.map(prayer => (
                    <TableHead key={prayer} className="font-bold text-white text-center">
                      {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrayerTimes.map((masjid, index) => (
                  <TableRow 
                    key={index} 
                    className={`hover:bg-gray-100 transition-colors cursor-pointer ${
                      activePrayer && selectedTime && masjid[activePrayer] === selectedTime 
                        ? 'bg-gray-100' 
                        : ''
                    }`}
                  >
                    <TableCell className="font-medium">
                      {masjid.masjid}
                    </TableCell>
                    {prayerTypes.map(prayer => {
                      const extremeType = isExtremeTime(prayer, masjid[prayer]);
                      const isSelected = activePrayer === prayer && masjid[prayer] === selectedTime;
                      
                      return (
                        <TableCell 
                          key={prayer} 
                          className={
                            isSelected
                              ? 'bg-gray-700 text-white font-bold text-center' 
                              : `${prayerColors[prayer]} text-center`
                          }
                        >
                          <div className="flex flex-col items-center justify-center">
                            <span>{masjid[prayer]}</span>
                            {extremeType && !isSelected && (
                              <div className="text-xs mt-1 bg-gray-800 text-white px-1.5 py-0.5 rounded-full">
                                {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                              </div>
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }

    // Desktop table view - Remove images as requested
    return (
      <div className="overflow-x-auto">
        <div className="rounded-lg shadow-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#1A1F2C] !border-b-0">
                <TableHead className="font-bold text-white">Masjid</TableHead>
                <TableHead className="font-bold text-white">Address</TableHead>
                {prayerTypes.map(prayer => (
                  <TableHead key={prayer} className="font-bold text-white text-center">
                    {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                  </TableHead>
                ))}
                <TableHead className="font-bold text-white text-center">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrayerTimes.map((masjid, index) => (
                <TableRow 
                  key={index} 
                  className={`hover:bg-gray-100 transition-colors cursor-pointer ${
                    activePrayer && selectedTime && masjid[activePrayer] === selectedTime 
                      ? 'bg-gray-100' 
                      : ''
                  }`}
                >
                  <TableCell className="font-medium">
                    {masjid.masjid}
                  </TableCell>
                  <TableCell>123 Example St, {selectedRegion}</TableCell>
                  {prayerTypes.map(prayer => {
                    const extremeType = isExtremeTime(prayer, masjid[prayer]);
                    const isSelected = activePrayer === prayer && masjid[prayer] === selectedTime;
                    
                    return (
                      <TableCell 
                        key={prayer} 
                        className={
                          isSelected
                            ? 'bg-gray-700 text-white font-bold text-center' 
                            : `${prayerColors[prayer]} text-center`
                        }
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span>{masjid[prayer]}</span>
                          {extremeType && !isSelected && (
                            <div className="text-xs mt-1 bg-gray-800 text-white px-1.5 py-0.5 rounded-full">
                              {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm" className="bg-teal-600 text-white border-teal-700 hover:bg-teal-700">
                      <MapPin className="mr-1 h-4 w-4" />
                      Directions
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  const renderBlockView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrayerTimes.map((masjid, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div>
                <h4 className="font-semibold text-lg text-teal-700">{masjid.masjid}</h4>
                <p className="text-gray-600 text-sm">123 Example St, {selectedRegion}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {prayerTypes.map((prayer) => {
                const extremeType = isExtremeTime(prayer, masjid[prayer]);
                const isSelected = activePrayer === prayer && masjid[prayer] === selectedTime;
                
                return (
                  <div 
                    key={prayer}
                    className={`p-2 rounded text-center ${
                      isSelected
                        ? 'bg-gray-700 text-white' 
                        : prayerColors[prayer]
                    }`}
                  >
                    <div className={`text-xs font-medium ${isSelected ? 'text-white' : prayerTextColors[prayer]}`}>
                      {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                    </div>
                    <div className="text-center">{masjid[prayer]}</div>
                    {extremeType && !isSelected && (
                      <div className="text-xs mt-1 bg-gray-800 text-white px-1 py-0.5 rounded-full mx-auto inline-block">
                        {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-center">
              <Button variant="outline" size="sm" className="w-full bg-teal-600 text-white border-teal-700 hover:bg-teal-700">
                <MapPin className="mr-1 h-4 w-4" />
                Directions
              </Button>
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


import React from 'react';
import { MasjidData, PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin } from 'lucide-react';

interface MasjidsTableViewProps {
  selectedRegion: string;
  activePrayer: PrayerType | null;
  selectedTime: string | null;
  filteredPrayerTimes: MasjidData[];
}

const MasjidsTableView: React.FC<MasjidsTableViewProps> = ({
  selectedRegion,
  activePrayer,
  selectedTime,
  filteredPrayerTimes
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

  if (filteredPrayerTimes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No masjids found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="rounded-lg shadow-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1A1F2C] !border-b-0">
              <TableHead className={`font-bold text-white ${isMobile ? 'text-xs py-2 px-2' : ''}`}>
                Masjid
              </TableHead>
              {!isMobile && <TableHead className="font-bold text-white">Address</TableHead>}
              
              {/* Prayer times columns - show all for desktop, only selected prayer for mobile */}
              {isMobile && activePrayer ? (
                <TableHead className="font-bold text-white text-center text-xs py-2 px-2">
                  {activePrayer.charAt(0).toUpperCase() + activePrayer.slice(1)}
                </TableHead>
              ) : (
                prayerTypes.map(prayer => (
                  <TableHead 
                    key={prayer} 
                    className={`font-bold text-white text-center ${isMobile ? 'text-xs py-2 px-2' : ''}`}>
                    {prayer.charAt(0).toUpperCase() + (isMobile ? '' : prayer.slice(1))}
                  </TableHead>
                ))
              )}
              
              {!isMobile && (
                <>
                  <TableHead className="font-bold text-white">Region</TableHead>
                  <TableHead className="font-bold text-white">Sub-Region</TableHead>
                  <TableHead className="font-bold text-white">Type</TableHead>
                  <TableHead className="font-bold text-white text-center">Location</TableHead>
                </>
              )}
              {isMobile && (
                <>
                  <TableHead className="font-bold text-white text-xs py-2 px-2">Area</TableHead>
                  <TableHead className="font-bold text-white text-xs py-2 px-2">Type</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrayerTimes.map((masjid, index) => (
              <TableRow 
                key={index} 
                className={`hover:bg-gray-100 transition-colors ${
                  activePrayer && selectedTime && masjid[activePrayer] === selectedTime 
                    ? 'bg-gray-100' 
                    : ''
                }`}
              >
                <TableCell className={`font-medium ${isMobile ? 'text-xs py-2 px-2 max-w-[80px] truncate' : ''}`}>
                  {isMobile ? masjid.masjid.split(' ')[0] : masjid.masjid}
                </TableCell>
                {!isMobile && <TableCell>{masjid.address || `123 Example St, ${selectedRegion}`}</TableCell>}
                
                {/* Prayer times cells - show all for desktop, only selected prayer for mobile */}
                {isMobile && activePrayer ? (
                  <TableCell 
                    className={`bg-gray-700 text-white font-bold text-center text-xs py-2 px-2`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span>{masjid[activePrayer]}</span>
                    </div>
                  </TableCell>
                ) : (
                  prayerTypes.map(prayer => {
                    const extremeType = isExtremeTime(prayer, masjid[prayer]);
                    const isSelected = activePrayer === prayer && masjid[prayer] === selectedTime;
                    
                    return (
                      <TableCell 
                        key={prayer} 
                        className={
                          isSelected
                            ? `bg-gray-700 text-white font-bold text-center ${isMobile ? 'text-xs py-2 px-2' : ''}` 
                            : `${prayerColors[prayer]} text-center ${isMobile ? 'text-xs py-2 px-2' : ''}`
                        }
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span>{masjid[prayer]}</span>
                          {!isMobile && extremeType && !isSelected && (
                            <div className="text-xs mt-1 bg-gray-800 text-white px-1.5 py-0.5 rounded-full">
                              {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    );
                  })
                )}

                {!isMobile && (
                  <>
                    <TableCell className="uppercase text-xs font-medium">{selectedRegion}</TableCell>
                    <TableCell className="text-sm">
                      {masjid.district || masjid.masjid.split(' ').pop() || 'Central'}
                    </TableCell>
                    <TableCell className="text-xs font-medium">
                      {masjid.type || 'MASJID'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" className="bg-teal-600 text-white border-teal-700 hover:bg-teal-700">
                        <MapPin className="mr-1 h-4 w-4" />
                        Directions
                      </Button>
                    </TableCell>
                  </>
                )}
                
                {isMobile && (
                  <>
                    <TableCell className="text-xs py-2 px-2 max-w-[50px] truncate">{masjid.district || 'Central'}</TableCell>
                    <TableCell className="text-xs py-2 px-2">{masjid.type === 'MASJID' ? 'M' : 'MU'}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MasjidsTableView;

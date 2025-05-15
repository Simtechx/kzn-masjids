
import React from 'react';
import { MasjidData, PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
                !isMobile && prayerTypes.map(prayer => (
                  <TableHead 
                    key={prayer} 
                    className="font-bold text-white text-center">
                    {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
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
                <TableCell className={`font-medium ${isMobile ? 'text-xs py-2 px-2' : ''}`}>
                  {masjid.masjid}
                </TableCell>
                {!isMobile && <TableCell>{masjid.address || `123 Example St, ${selectedRegion}`}</TableCell>}
                
                {/* Prayer times cells - show all for desktop, only selected prayer for mobile */}
                {isMobile && activePrayer ? (
                  <TableCell 
                    className={`text-center text-xs py-2 px-2`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="bg-gray-700 text-white font-semibold px-3 py-1 rounded-full">
                        {masjid[activePrayer]}
                      </span>
                    </div>
                  </TableCell>
                ) : (
                  !isMobile && prayerTypes.map(prayer => {
                    const extremeType = isExtremeTime(prayer, masjid[prayer]);
                    const isSelected = activePrayer === prayer && masjid[prayer] === selectedTime;
                    
                    return (
                      <TableCell 
                        key={prayer} 
                        className={
                          isSelected
                            ? `bg-gray-700 text-white font-bold text-center` 
                            : `${prayerColors[prayer]} text-center`
                        }
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span>{masjid[prayer]}</span>
                          {extremeType && !isSelected && (
                            <Badge variant={extremeType === 'earliest' ? 'secondary' : 'default'} className="mt-1 text-[10px] px-2 py-0">
                              {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    );
                  })
                )}

                {!isMobile && (
                  <>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        {selectedRegion}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {masjid.district || masjid.masjid.split(' ').pop() || 'Central'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={masjid.type === 'MASJID' ? 'default' : 'secondary'} className={masjid.type === 'MASJID' ? 'bg-green-600' : 'bg-amber-600'}>
                        {masjid.type || 'MASJID'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" className="bg-teal-600 text-white border-teal-700 hover:bg-teal-700">
                        <MapPin className="mr-1 h-4 w-4" />
                        Directions
                      </Button>
                    </TableCell>
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

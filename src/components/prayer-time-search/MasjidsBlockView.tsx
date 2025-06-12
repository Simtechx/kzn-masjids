
import React from 'react';
import { MasjidData, PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MasjidsBlockViewProps {
  selectedRegion: string;
  activePrayer: PrayerType | null;
  selectedTime: string | null;
  filteredPrayerTimes: MasjidData[];
}

const MasjidsBlockView: React.FC<MasjidsBlockViewProps> = ({
  selectedRegion,
  activePrayer,
  selectedTime,
  filteredPrayerTimes
}) => {
  // Exclude maghrib as per requirements
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];
  
  // Define prayer block colors - soft colors with borders
  const prayerColors = {
    fajr: 'bg-pink-50 border-pink-200',
    dhuhr: 'bg-amber-50 border-amber-200',
    asr: 'bg-emerald-50 border-emerald-200',
    isha: 'bg-indigo-50 border-indigo-200',
  };
  
  const prayerTextColors = {
    fajr: 'text-pink-600',
    dhuhr: 'text-amber-600',
    asr: 'text-emerald-600',
    isha: 'text-indigo-600',
  };

  // Define selected colors using prayer-specific colors instead of yellow
  const selectedColors = {
    fajr: 'bg-pink-600 border-pink-700',
    dhuhr: 'bg-amber-600 border-amber-700',
    asr: 'bg-emerald-600 border-emerald-700',
    isha: 'bg-indigo-600 border-indigo-700',
  };

  // Define darker colors for badges
  const badgeColors = {
    fajr: 'bg-pink-600',
    dhuhr: 'bg-amber-600',
    asr: 'bg-emerald-600',
    isha: 'bg-indigo-600',
  };

  // Define very dark text colors for selected block badges
  const selectedBadgeTextColors = {
    fajr: 'text-pink-900',
    dhuhr: 'text-amber-900',
    asr: 'text-emerald-900',
    isha: 'text-indigo-900',
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPrayerTimes.map((masjid, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-sm border-2 border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div>
              <h4 className="font-semibold text-lg text-teal-700">{masjid.masjid}</h4>
              <p className="text-gray-600 text-sm">{masjid.address || `123 Example St, ${selectedRegion}`}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="outline" className="bg-gray-50 text-black border-gray-300">
                  {selectedRegion}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-black border-blue-300">
                  {masjid.district || 'Central'}
                </Badge>
                <Badge className={masjid.type === 'MASJID' ? 'bg-green-600 text-black' : 'bg-amber-600 text-black'}>
                  {masjid.type || 'MASJID'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {prayerTypes.map((prayer) => {
              const extremeType = isExtremeTime(prayer, masjid[prayer]);
              const isSelected = activePrayer === prayer && masjid[prayer] === selectedTime;
              
              return (
                <div 
                  key={prayer}
                  className={`p-2 rounded text-center border-2 ${
                    isSelected
                      ? `${selectedColors[prayer]} text-white` 
                      : prayerColors[prayer]
                  }`}
                >
                  <div className={`text-xs font-medium ${isSelected ? 'text-white' : prayerTextColors[prayer]}`}>
                    {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                  </div>
                  <div className="text-center font-medium">{masjid[prayer]}</div>
                  {extremeType && (
                    <Badge className={`mt-1 text-[10px] px-2 py-0 mx-auto border ${
                      isSelected 
                        ? `bg-white border-white ${selectedBadgeTextColors[prayer]}`
                        : `text-black border-gray-300 ${badgeColors[prayer]}`
                    }`}>
                      {extremeType === 'earliest' ? 'EARLIEST' : 'LATEST'}
                    </Badge>
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

export default MasjidsBlockView;

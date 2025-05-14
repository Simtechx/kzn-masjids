
import React from 'react';
import { MasjidData, PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPrayerTimes.map((masjid, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div>
              <h4 className="font-semibold text-lg text-teal-700">{masjid.masjid}</h4>
              <p className="text-gray-600 text-sm">{masjid.address || `123 Example St, ${selectedRegion}`}</p>
              <div className="text-xs mt-1">
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full mr-2">{selectedRegion}</span>
                <span className="bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full mr-2">{masjid.district || 'Central'}</span>
                <span className="bg-green-200 text-green-700 px-2 py-0.5 rounded-full">{masjid.type || 'MASJID'}</span>
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

export default MasjidsBlockView;

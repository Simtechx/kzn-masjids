
import React from 'react';
import { PrayerType, findExtremeTime } from '@/utils/prayerTimeUtils';

interface PrayerTimeBlocksProps {
  selectedRegion: string | null;
  activePrayer: PrayerType | null;
  onSelectPrayer: (prayer: PrayerType) => void;
}

const PrayerTimeBlocks: React.FC<PrayerTimeBlocksProps> = ({ 
  selectedRegion, 
  activePrayer, 
  onSelectPrayer 
}) => {
  // Exclude maghrib as per requirements
  const prayerTypes: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'isha'];

  // Define prayer block colors
  const prayerColors = {
    fajr: 'bg-rose-50 hover:bg-rose-100',    // Light red
    dhuhr: 'bg-amber-50 hover:bg-amber-100',  // Light beige/orange
    asr: 'bg-emerald-50 hover:bg-emerald-100', // Light green
    isha: 'bg-indigo-50 hover:bg-indigo-100', // Light purple
  };

  // Define prayer text colors
  const prayerTextColors = {
    fajr: 'text-rose-600',
    dhuhr: 'text-amber-600',
    asr: 'text-emerald-600',
    isha: 'text-indigo-600',
  };

  // Define active block colors
  const activeColors = {
    fajr: 'bg-rose-600 text-white',
    dhuhr: 'bg-amber-600 text-white',
    asr: 'bg-emerald-600 text-white',
    isha: 'bg-indigo-600 text-white',
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {prayerTypes.map((prayer) => {
        const earliestTime = findExtremeTime(prayer, 'earliest', selectedRegion)?.time;
        const isActive = activePrayer === prayer;
        
        return (
          <div 
            key={prayer}
            className={`p-3 rounded cursor-pointer text-center flex-1 shadow-sm ${
              isActive 
                ? activeColors[prayer] 
                : `${prayerColors[prayer]}`
            }`}
            onClick={() => onSelectPrayer(prayer)}
          >
            <div className={`font-medium ${!isActive ? prayerTextColors[prayer] : ''}`}>
              {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
            </div>
            <div className={`text-sm mt-1 ${!isActive ? 'text-gray-600' : ''}`}>
              {earliestTime}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrayerTimeBlocks;
